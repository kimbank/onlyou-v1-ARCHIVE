from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse

from sqlalchemy import func
from sqlalchemy import asc, desc
from sqlalchemy.orm import Session, aliased
from api.database.conn import db

from api.database.schema.user.user import User
from api.database.schema.matching.matching_history import MatchingHistory

router = APIRouter(prefix="/agreement")


@router.get('')
async def get_agreement(request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    u = aliased(User)
    ms = aliased(MatchingHistory)
    male_cond = u.id == ms.male_id
    female_cond = u.id == ms.female_id

    try:
        if user_info.gender is 0:
            matchings = (session.query(MatchingHistory, User)
                         .filter(MatchingHistory.female_id == user_info.id)
                         .outerjoin(aliased(User), male_cond)
                         .order_by(desc(MatchingHistory.phase))
                         )
        else:
            matchings = (session.query(MatchingHistory, User)
                         .filter(MatchingHistory.male_id == user_info.id)
                         .outerjoin(User, User.id == MatchingHistory.female_id)
                         .order_by(desc(MatchingHistory.phase))
                         )

        targets = []
        for e in matchings.all():
            d = dict(
                date_matching=e.MatchingHistory.date_agreement.isoformat().split('T')[0],
                nickname=e.User.nickname,
                job_type=e.User.residence,
                # education=e.User.education,
                residence=e.User.residence,
                birth_year=e.User.date_birth.year,
                kakao_id=e.User.kakao_id,
            )
            targets.append(d)

        return JSONResponse(status_code=200, content=targets)

    except:
        return []
