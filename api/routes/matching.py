from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse

from api.common.config import conf

import time
from datetime import datetime
from datetime import timedelta

from sqlalchemy import func
from sqlalchemy.orm import Session
from api.database.conn import db
from api.database.schema.user.user import User
from api.database.schema.user.users_female_data import UsersFemaleData
from api.database.schema.user.users_male_data import UsersMaleData
from api.database.schema.user.users_female_data_extra import UsersFemaleDataExtra
from api.database.schema.user.users_male_data_extra import UsersMaleDataExtra
from api.database.schema.user.users_female_data_target import UsersFemaleDataTarget
from api.database.schema.user.users_male_data_target import UsersMaleDataTarget

from api.database.schema.matching.matching_public import MatchingPublic
from api.database.schema.matching.matching_history import MatchingHistory

from api.models.models import UserToken
from api.utils.matching_slack import slack_chat_post

import api.utils.mapper as mapper

import math


router = APIRouter(prefix="/matching")

@router.get("/status")
async def get_matching(request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    msg = "error"

    try:
        if user_info.gender == 0:
            female_result = (
                session.query(User, UsersFemaleData, UsersFemaleDataExtra, UsersFemaleDataTarget)
                .filter(user_info.id == User.id)
                .filter(user_info.id == UsersFemaleData.female_id)
                .filter(user_info.id == UsersFemaleDataExtra.female_id)
                .filter(user_info.id == UsersFemaleDataTarget.female_id)
                .first()
            )
            user, data, data_extra, data_target = female_result
        else:
            male_result = (
                session.query(User, UsersMaleData, UsersMaleDataExtra, UsersMaleDataTarget)
                .filter(user_info.id == User.id)
                .filter(user_info.id == UsersMaleData.male_id)
                .filter(user_info.id == UsersMaleDataExtra.male_id)
                .filter(user_info.id == UsersMaleDataTarget.male_id)
                .first()
            )
            user, data, data_extra, data_target = male_result
    except:
        return msg


    # [휴면 확인] 데이터가 있다면 날짜가 나오고 비휴면일 경우 NULL에 해당하는 None이 리턴됨
    if user.date_dormant:
        msg = "dormancy"
    # [승급심사 확인]
    elif data.fill_status != 2:
        # [승급심사 제출 확인 후 대기중]
        if data.fill_status == 1:
            msg = "promotion_waiting"
        # [승급심사 반려]
        elif data.fill_status == -1:
            msg = "promotion_rejected"
        # [승급심사 미제출]
        else:
            msg = "promotion_apply"
    # [매칭신청서: 본인부가정보 제출 확인]
    elif data_extra.fill_status != 1:
        msg = "application_extra"
    # [매칭신청서: 타겟희망정보 제출 확인]
    elif data_target.fill_status != 1:
        msg = "application_target"
    # [[[ 매칭 조건 충족 ]]]
    else:
        try:
            if user_info.gender == 0:
                # 현 페이즈의 공개 매칭을 조회
                candidate = MatchingPublic.get(female_id=user_info.id, phase=request.state.phase, status=1)
                due = candidate.deadline
                my_choice = candidate.f_choice
                trgt_choice = candidate.m_choice
            else:
                # 현 페이즈의 공개 매칭을 조회
                candidate = MatchingPublic.get(male_id=user_info.id, phase=request.state.phase, status=1)
                due = candidate.deadline
                my_choice = candidate.m_choice
                trgt_choice = candidate.f_choice

            if datetime.now() > due:
                raise Exception

        except:
            candidate = None

        # [매칭: 매칭 전]
        if not candidate:
            msg = "matching_before"

        # [매칭: 매칭 선택]
        elif my_choice == 0:
            msg = "matching_selection"

        # [매칭: 매칭(상대) 결과 대기]
        elif trgt_choice == 0 and my_choice > 0:
            msg = "matching_waiting"

        # [매칭: 매칭 성사]
        elif my_choice == 1 and trgt_choice == 1:
            msg = "matching_success"

        # [매칭: 매칭 미성사]
        else:
            msg = "matching_failure"

    return JSONResponse(status_code=200, content=dict(msg=msg))


@router.get('/competitor_count')
async def get_competitor_count(request: Request):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    if user_info.gender == 0:
        user = UsersFemaleDataTarget().filter(fill_status=1)
    else:
        user = UsersMaleDataTarget().filter(fill_status=1)

    ret = user.count()
    ret = math.ceil(ret/10)
    ret = int(ret*10)

    return JSONResponse(status_code=200, content=ret)


@router.get('/target_info')
async def get_target_info(request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))


    try:
        if user_info.gender == 0:
            mp = MatchingPublic.get(female_id=user_info.id, phase=request.state.phase, status=1)
            ud = UsersFemaleData.get(female_id=user_info.id)
            due = mp.deadline
            target_id = mp.male_id
        else:
            mp = MatchingPublic.get(male_id=user_info.id, phase=request.state.phase, status=1)
            ud = UsersMaleData.get(male_id=user_info.id)
            due = mp.deadline
            target_id = mp.female_id

        diff = due - datetime.now()
        if diff.days > 0 or datetime.now() > due:
            raise Exception

        u = User.get(id=target_id)
        time_left = diff.seconds

    # 찾을 수 없으면 메인으로 리다이렉트 요청 메시지
    except:
        return JSONResponse(status_code=200, content=dict(msg='exp'))

    d = {
        'id': u.id,
        'gender': u.gender,
        'nickname': u.nickname,
        'date_birth': f"{u.date_birth.year}년생",
        'kakao_id': u.kakao_id,
        'residence': mapper.residence(u.residence),
        'job_type': mapper.job_type(ud.job_type),
        'education': mapper.education(ud.education),
        'time_left': time_left,
    }

    return JSONResponse(status_code=200, content=d)

@router.get('/select/{choice}')
async def get_target_profile(request: Request, choice: bool):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    if user_info.gender == 0:
        pm = MatchingPublic.filter(female_id=user_info.id, phase=request.state.phase, status=1)
        if choice:
            if pm.first().m_choice == 1:
                female = await User.get(id=user_info.id); male = await User.get(id=pm.first().male_id);
                await slack_chat_post(female=female, male=male)
            pm.update(f_choice=1, auto_commit=True)
            pm.close()
        else:
            pm.update(f_choice=-1, auto_commit=True)
            pm.close()
    else:
        pm = MatchingPublic.filter(male_id=user_info.id, phase=request.state.phase, status=1)
        if choice:
            if pm.first().f_choice == 1:
                female = await User.get(id=pm.first().female_id); male = await User.get(id=user_info.id);
                await slack_chat_post(female=female, male=male)
            pm.update(m_choice=1, auto_commit=True)
            pm.close()
        else:
            pm.update(m_choice=-1, auto_commit=True)
            pm.close()

    return ""


def check_matching_public(user_id, gender, phase, session):

    if gender == 0:
        matching = (session.query(MatchingPublic)
                        .filter(MatchingPublic.female_id == user_id)
                        .filter(MatchingPublic.phase == phase)
                    )
    else:
        matching = (session.query(MatchingPublic)
                        .filter(MatchingPublic.male_id == user_id)
                        .filter(MatchingPublic.phase == phase)
                        .filter(MatchingPublic.status == 1)
                    )

    # print(matching.count())


    return None
