from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse

from datetime import datetime

from sqlalchemy import func
from sqlalchemy import asc, desc
from sqlalchemy.orm import Session, aliased
from api.database.conn import db

from api.database.schema.user.user import User
from api.database.schema.matching.matching_public import MatchingPublic
from api.database.schema.matching.matching_history import MatchingHistory

router = APIRouter(prefix="/agreement")


@router.get('')
async def get_agreement(request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))


    try:
        if user_info.gender is 0:
            matchings = (session.query(MatchingHistory, MatchingPublic, User)
                         .filter(MatchingHistory.female_id == user_info.id)
                         .outerjoin(User, User.id == MatchingHistory.male_id)
                         .order_by(desc(MatchingHistory.phase))
                         )
        else:
            matchings = (session.query(MatchingHistory, MatchingPublic, User)
                         .filter(MatchingHistory.male_id == user_info.id)
                         .outerjoin(User, User.id == MatchingHistory.female_id)
                         .outerjoin(MatchingPublic, MatchingPublic.female_id == MatchingHistory.female_id)
                         .order_by(desc(MatchingHistory.phase))
                         )

        targets = []
        for e in matchings.all():
            print(e.MatchingPublic.deadline.year)
            d = dict(
                date_matching=e.MatchingHistory.date_agreement.isoformat().split('T')[0],
                nickname=e.User.nickname,
                job_type=e.User.residence,
                # education=e.User.education,
                residence=e.User.residence,
                birth_year=e.User.date_birth.year,
            )
            targets.append(d)

        return JSONResponse(status_code=200, content=targets)

    except:
        return []
