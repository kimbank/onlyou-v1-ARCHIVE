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

from api.models.models import UserToken


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