from fastapi import Depends

from starlette.requests import Request
from api.database.schema.global_status import GlobalStatus
from api.database.conn import db

from sqlalchemy.orm import Session


async def status_control(request: Request, call_next):
    request.state.phase = None
    request.state.status = None

    # Todo: 메모리 DB로 부하를 줄여줘야함
    STATE = GlobalStatus.get_max()

    request.state.phase = STATE.phase
    request.state.status = STATE.status

    response = await call_next(request)

    return response
