from fastapi import APIRouter, Depends, Response
from starlette.responses import JSONResponse
# from api.utils.user_photo import presigned_url

from datetime import datetime

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
from api.database.schema.user.users_photo import UserPhoto

from api.models.user.data.data_extra import UpdateValueSchema, UpdateLifeStyleSchema, UpdatePersonalitySchema, \
    UpdateDatingStyleSchema, UpdateAppearanceSchema, UpdateOtherSchema

import api.utils.mapper as mapper
from api.database.schema.matching.matching_public import MatchingPublic

from starlette.requests import Request
from api.utils.token_validator import token_control

router = APIRouter(prefix="/user")


@router.get('/matching/{u_id}')
async def matching(u_id: int, request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    target_id = await public_validation(user_info, request.state.phase)
    if target_id != u_id:
        return JSONResponse(status_code=401, content=dict(msg='exp'))
    u = User.get(id=target_id)

    return { 'nickname': u.nickname, }


@router.get('/letter/{u_id}')
async def letter(u_id: int,
                 request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    target_id = await public_validation(user_info, request.state.phase)
    # print(target_id, type(target_id), u_id, type(u_id))
    if target_id != u_id:
        return JSONResponse(status_code=401, content=dict(msg='exp'))

    u = User.get(id=target_id)
    selectable = is_selectable(user_info.id, target_id, request.state.phase, user_info.gender)

    return JSONResponse(status_code=200, content=dict(letter=u.letter, nickname=u.nickname, selectable=selectable))


@router.get('/detail/{u_id}')
async def detail(u_id: int,
                 request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    target_id = await public_validation(user_info, request.state.phase)
    selectable = is_selectable(user_info.id, target_id, request.state.phase, user_info.gender)

    if target_id != u_id:
        return JSONResponse(status_code=401, content=dict(msg='exp'))


    # Todo: 이상형 정보를 수정하면서 모든 정보를 보는 취약점이 있음
    if user_info.gender == 0:
        me = UsersFemaleDataTarget.get(female_id=user_info.id)
        u = User.get(id=target_id)
        ud = UsersMaleData.get(male_id=target_id)
        ue = UsersMaleDataExtra.get(male_id=target_id)
    else:
        me = UsersMaleDataTarget.get(male_id=user_info.id)
        u = User.get(id=target_id)
        ud = UsersFemaleData.get(female_id=target_id)
        ue = UsersFemaleDataExtra.get(female_id=target_id)

    sel_info = []
    ret = {}
    for key, val in me.__dict__.items():
        if val is not None and key.endswith('_w'):
            sel_info.append(key[:-2])
    print(sel_info)
    for key in sel_info:
        if key in u.__dict__.keys():
            ret[key] = u.__dict__[key]
            ret[key] = mapper.decode_value_with_key(key, ret[key])
        if key in ud.__dict__.keys():
            ret[key] = ud.__dict__[key]
            if key == 'height':
                ret[key] = str(ret[key]) + 'cm'
            else:
                ret[key] = mapper.decode_value_with_key(key, ret[key])
        elif key in ue.__dict__.keys():
            ret[key] = ue.__dict__[key]
            ret[key] = mapper.decode_value_with_key(key, ret[key])
    print(ret)


    return {'nickname': u.nickname, 'selectable': selectable, 'data': ret}


@router.get('/photo/{u_id}')
async def photo(request: Request, u_id: int):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    target_id = await public_validation(user_info, request.state.phase)
    # print(target_id, type(target_id), u_id, type(u_id))
    if target_id != u_id:
        return JSONResponse(status_code=401, content=dict(msg='exp'))

    u = UserPhoto.filter(id=target_id).all()
    un = User.get(id=target_id)
    print(target_id, u, type(u))

    if len(u) < 1:
        return JSONResponse(status_code=404, content=dict(msg='사진이 없습니다.', nickname=un))

    selectable = is_selectable(user_info.id, target_id, request.state.phase, user_info.gender)

    return {'photos': u, 'nickname': un.nickname, 'selectable': selectable}


async def user_result(user_info, session):
    if (user_info.gender == 0):
        female_result = (
            session.query(User, UsersFemaleData, UsersFemaleDataExtra, UsersFemaleDataTarget)
            .filter(user_info.id == User.id)
            .filter(user_info.id == UsersFemaleData.female_id)
            .filter(user_info.id == UsersFemaleDataExtra.female_id)
            .filter(user_info.id == UsersFemaleDataTarget.female_id)
            .first()
        )
        return female_result
    else:
        male_result = (
            session.query(User, UsersMaleData, UsersMaleDataExtra, UsersMaleDataTarget)
            .filter(user_info.id == User.id)
            .filter(user_info.id == UsersMaleData.male_id)
            .filter(user_info.id == UsersMaleDataExtra.male_id)
            .filter(user_info.id == UsersMaleDataTarget.male_id)
            .first()
        )
        return male_result


async def public_validation(user_info, phase):
    try:
        if user_info.gender == 0:
            mp = MatchingPublic.get(female_id=user_info.id, phase=phase, status=1)
            due = mp.deadline
            target_id = mp.male_id
        else:
            mp = MatchingPublic.get(male_id=user_info.id, phase=phase, status=1)
            due = mp.deadline
            target_id = mp.female_id

        # Todo: 공개 시간 및 권한 관리 필요해 보임
        # diff = due - datetime.now()
        # if diff.days > 0 or datetime.now() > due:
        #     raise Exception

    # 찾을 수 없으면 메인으로 리다이렉트 요청 메시지
    except:
        return None

    return target_id


def is_selectable(female, male, phase, my_gender):
    pm = MatchingPublic.get(female_id=female, male_id=male, phase=phase, status=1)

    if not pm or pm.deadline < datetime.now():
        return False

    if my_gender == 0:
        if pm.f_choice != 0:
            return False
    else:
        if pm.m_choice != 0:
            return False


    return True
