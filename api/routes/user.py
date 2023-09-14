from fastapi import APIRouter, Depends, Response
from starlette.responses import JSONResponse
# from api.utils.user_photo import presigned_url

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

from starlette.requests import Request
from api.utils.token_validator import token_control

router = APIRouter(prefix="/user")


@router.get('/letter/{u_id}')
async def letter(u_id: str,
                 request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    return JSONResponse(status_code=200, content=dict(msg=u_id))


@router.get('/detail/{u_id}')
async def detail(u_id: str,
                 request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    user, data, data_extra, data_target = await user_result(user_info, session)

    print(user.id)

    return JSONResponse(status_code=200, content=dict(msg=u_id))


@router.get('/photo/{u_id}')
async def photo(request: Request, u_id: str):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    return JSONResponse(status_code=200, content=dict(msg=u_id))


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
