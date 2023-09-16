from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse

from datetime import datetime

from api.database.schema.user.user import User
from api.models.user.user import UserSchema
from api.database.schema.mixin import BaseMixin

from sqlalchemy import func
from sqlalchemy.orm import Session, aliased
from api.database.conn import db
from api.database.schema.user.user import User
from api.database.schema.user.users_female_data import UsersFemaleData
from api.database.schema.user.users_male_data import UsersMaleData
from api.database.schema.user.users_female_data_extra import UsersFemaleDataExtra
from api.database.schema.user.users_male_data_extra import UsersMaleDataExtra
from api.database.schema.user.users_female_data_target import UsersFemaleDataTarget
from api.database.schema.user.users_male_data_target import UsersMaleDataTarget
from api.utils.score import get_scores

router = APIRouter(prefix="/application")


# 이상형 정보 입력 완료 버튼 클릭 시 점수 계산
# user_data_target: 나의 이상형 정보, target_users: 전체 이성 정보
@router.patch("/calculate")
async def calculate_matching_score(request: Request, session: Session = Depends(db.session)):
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    user = User.get(id=user_info.id)
    if user.gender == 0:
        # 이성 정보 스키마 별칭 -> 이름이 같은 컬럼 구분
        u = aliased(User)
        ud = aliased(UsersMaleData)
        ue = aliased(UsersMaleDataExtra)
        ut = aliased(UsersMaleDataTarget)

        user_data_target = UsersFemaleDataTarget.get(female_id=user_info.id)
        join_cond1 = u.id == ud.male_id
        join_cond2 = u.id == ue.male_id
        join_cond3 = u.id == ut.male_id
        try:
            target_users = (session.query(u, ud, ue, ut).filter(u.gender == 1)
                            .outerjoin(ud, join_cond1)
                            .outerjoin(ue, join_cond2)
                            .outerjoin(ut, join_cond3)).all()
            for u, ud, ue, ut in target_users:
                print(ue.fill_status if ue else None)
        except Exception as e:
            print(e)
            return JSONResponse(status_code=500, content=dict(msg='이성 정보 획득 실패'))
    else:
        u = aliased(User)
        ud = aliased(UsersFemaleData)
        ue = aliased(UsersFemaleDataExtra)
        ut = aliased(UsersFemaleDataTarget)

        user_data_target = UsersMaleDataTarget.get(male_id=user_info.id)
        join_cond1 = u.id == ud.female_id
        join_cond2 = u.id == ue.female_id
        join_cond3 = u.id == ut.female_id
        try:
            target_users = (session.query(u, ud, ue, ut).filter(u.gender == 0)
                            .outerjoin(ud, join_cond1)
                            .outerjoin(ue, join_cond2)
                            .outerjoin(ut, join_cond3)).all()
        except Exception as e:
            print(e)
            return JSONResponse(status_code=500, content=dict(msg='이성 정보 획득 실패'))

    # try:
    #     get_scores(user_data_target, target_users)
    #     return JSONResponse(status_code=200, content=dict(msg='점수 계산 완료'))
    # except Exception as e:
    #     return JSONResponse(status_code=500, content=dict(msg='점수 계산 실패'))
