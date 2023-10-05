from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse

from datetime import datetime

from api.database.schema.user.user import User
from api.models.user.user import UserSchema

from sqlalchemy import func
from sqlalchemy.orm import Session
from api.database.conn import db

from api.database.schema.user.user import User
from api.database.schema.user.users_female_data import UsersFemaleData
from api.database.schema.user.users_male_data import UsersMaleData

import api.utils.mapper as mapper

from api.utils.dormant_slack import slack_chat_post


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
        # 'job_type': mapper.job_type(user_data.job_type),
        'job_type': user.tmp_job,
        'residence': mapper.residence(user.residence),
        'date_birth': user.date_birth.year,
        'education': mapper.education(user_data.education),
        'dormant': str(user.date_dormant) if user.date_dormant else None,
    }


    return JSONResponse(status_code=200, content=res)

@router.get("/dormant/{status}")
async def get_user_info(request: Request, status: bool):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    user = User.filter(id=user_info.id)

    if status:
        user.update(auto_commit=True, date_dormant=datetime.now())
    else:
        user.update(auto_commit=True, date_dormant=None)

    user = user.first()
    slack_chat_post(user.mobile_number, user.id, user.gender, user.nickname, status)

    return JSONResponse(status_code=200, content="success")