from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse


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

from api.database.schema.matching.matching_public import MatchigPublic

from api.models.models import UserToken

import math


router = APIRouter(prefix="/matching")

@router.get("/status")
async def get_matching(request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    msg = "error"

    if (user_info.gender == 0):
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


    # [휴면 확인] 데이터가 있다면 날짜가 나오고 비휴면일 경우 NULL에 해당하는 None이 리턴됨
    if user.date_dormant:
        msg = "dormancy"
    # [승급심사 확인]
    elif data.fill_status is not 2:
        # [승급심사 제출 확인 후 대기중]
        if data.fill_status is 1:
            msg = "promotion_waiting"
        # [승급심사 반려]
        elif data.fill_status is -1:
            msg = "promotion_rejected"
        # [승급심사 미제출]
        else:
            msg = "promotion_apply"
    # [매칭신청서: 본인부가정보 제출 확인]
    elif data_extra.fill_status is not 1:
        msg = "application_extra"
    # [매칭신청서: 타겟희망정보 제출 확인]
    elif data_target.fill_status is not 1:
        msg = "application_target"
    # [[[ 매칭 조건 충족 ]]]
    else:
        msg = "matching_before"


    return JSONResponse(status_code=200, content=dict(msg=msg))


@router.get('/competitor_count')
async def get_competitor_count(request: Request):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    if user_info.gender is 0:
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

    d = dict(id=70, gender=0, nickname='상대방닉네임', job_type='상대직장', education='학력', residence='상대거주지', birth_year='2001년생', kakao_id='상대카카오톡아이디')

    print(check_matching_public(70, 1, 1, session))

    return JSONResponse(status_code=200, content=d)

@router.get('/select/{choice}')
async def get_target_profile(request: Request, choice: bool):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    if choice:
        print("Accept")
    else:
        print("Reject")

    return ""


def check_matching_public(user_id, gender, phase, session):

    if gender is 0:
        matching = (session.query(MatchigPublic)
                        .filter(MatchigPublic.female_id == user_id)
                        .filter(MatchigPublic.phase == phase)
                    )
    else:
        matching = (session.query(MatchigPublic)
                        .filter(MatchigPublic.male_id == user_id)
                        .filter(MatchigPublic.phase == phase)
                        .filter(MatchigPublic.status == 1)
                    )

    print(matching.count())


    return None
