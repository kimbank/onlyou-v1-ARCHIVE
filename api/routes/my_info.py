from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse

from api.database.schema.user.user import User
from api.models.user.user import UserSchema

from sqlalchemy import func
from sqlalchemy.orm import Session
from api.database.conn import db

from api.database.schema.user.user import User
from api.database.schema.user.users_female_data import UsersFemaleData
from api.database.schema.user.users_male_data import UsersMaleData


router = APIRouter(prefix="/my_info")


@router.get("")
async def get_user_info(request: Request):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    user = User.get(id=user_info.id)
    if user.gender is 0:
        user_data = UsersFemaleData.get(female_id=user_info.id)
    else:
        user_data = UsersMaleData.get(male_id=user_info.id)

    res = {
        'nickname': user.nickname,
        'job_type': user_data.job_type,
        'residence': user.residence,
        'date_birth': user.date_birth.year,
        'education': user_data.education,
    }


    return JSONResponse(status_code=200, content=res)