from datetime import datetime

from fastapi import APIRouter
from starlette.responses import Response, JSONResponse
from starlette.requests import Request
from inspect import currentframe as frame

from api.common import config, consts
import jwt
import sqlalchemy.exc
from jwt.exceptions import ExpiredSignatureError, DecodeError
from api.errors import exceptions as ex
from api.errors.exceptions import APIException, SqlFailureEx

router = APIRouter()


@router.get("/")
async def index():
    """
    ELB 상태 체크용 API
    :return:
    """
    current_time = datetime.utcnow()
    return Response(f"Notification API (UTC: {current_time.strftime('%Y.%m.%d %H:%M:%S')})")


@router.get("/test")
async def test(request: Request):
    """
    ELB 상태 체크용 API
    :return:
    """
    print("state.user", request.state.user)
    try:
        a = 1/0
    except Exception as e:
        request.state.inspect = frame()
        raise e
    current_time = datetime.utcnow()
    return Response(f"Notification API (UTC: {current_time.strftime('%Y.%m.%d %H:%M:%S')})")


@router.get("/api/ic")
async def ic(request: Request):
    # 미들웨어가 토큰값 검증
    try:
        if request.cookies.get('access_token'):
            # print('token', request.cookies.get('access_token'))
            token_info = await token_decode(request.cookies.get('access_token'))
            # request.state.user = UserToken(**token_info)
        else:
            raise ex.NotAuthorized()
        response = JSONResponse(status_code=200, content=dict(msg="success"))

    except Exception as e:
        error = await exception_handler(e)
        error_dict = dict(status=error.status_code, msg=error.msg, detail=error.detail, code=error.code)
        response = JSONResponse(status_code=error.status_code, content=error_dict)

    return response

async def token_decode(access_token):
    """
    :param access_token:
    :return:
    """
    try:
        access_token = access_token.replace("Bearer ", "")
        payload = jwt.decode(access_token, key=consts.JWT_SECRET, algorithms=[consts.JWT_ALGORITHM])
    except ExpiredSignatureError:
        raise ex.TokenExpiredEx()
    except DecodeError:
        raise ex.TokenDecodeEx()
    return payload


async def exception_handler(error: Exception):
    # print(error)
    if isinstance(error, sqlalchemy.exc.OperationalError):
        error = SqlFailureEx(ex=error)
    if not isinstance(error, APIException):
        error = APIException(ex=error, detail=str(error))
    return error
