from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse


from sqlalchemy import func
from sqlalchemy.orm import Session
from api.database.conn import db
# from api.database.schema.user.user import User
# from api.database.schema.user.users_female_data import UsersFemaleData
# from api.database.schema.user.users_male_data import UsersMaleData
# from api.database.schema.user.users_female_data_extra import UsersFemaleDataExtra
# from api.database.schema.user.users_male_data_extra import UsersMaleDataExtra
# from api.database.schema.user.users_female_data_target import UsersFemaleDataTarget
# from api.database.schema.user.users_male_data_target import UsersMaleDataTarget

from api.models.models import UserToken


router = APIRouter(prefix="/matching")

@router.get("/status")
async def get_matching(request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    # user = (
    #     session.query(User)
    #     .outerjoin(UsersFemaleData if (user_info.gender == 0) else UsersMaleData)
    #     .outerjoin(UsersFemaleDataExtra if (user_info.gender == 0) else UsersMaleDataExtra)
    #     .outerjoin(UsersFemaleDataTarget if (user_info.gender == 0) else UsersMaleDataTarget)
    #     .filter(User.id == user_info.id)
    # )
    # print(user)

    return user_info
