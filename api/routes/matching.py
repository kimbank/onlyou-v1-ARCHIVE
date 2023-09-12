from fastapi import APIRouter, Depends
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse

from sqlalchemy.orm import Session
from api.database.conn import db
from api.database.schema.user.user import User


router = APIRouter(prefix="/matching")

@router.get("/status")
async def get_matching(request: Request, session: Session = Depends(db.session)):
    # Todo: 토큰 적합성 검사 미들웨어 리펙터링 필요함.
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    user = (
        session.query(User)
    )

    return user_info
