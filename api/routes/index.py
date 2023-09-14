from datetime import datetime, timedelta

from fastapi import APIRouter, Query
from starlette.responses import Response, JSONResponse
from starlette.requests import Request
from inspect import currentframe as frame

from api.common import config, consts
import jwt
import sqlalchemy.exc
from jwt.exceptions import ExpiredSignatureError, DecodeError
from api.errors import exceptions as ex
from api.errors.exceptions import APIException, SqlFailureEx

from api.common.consts import JWT_SECRET, JWT_ALGORITHM


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


@router.get("/api/tk")
async def tk(u_id: str, gender: int, mobile_number: str):
    # 디버깅용 토큰 생성
    print(u_id, gender, mobile_number)

    token = f"{create_access_token(data=dict(id=u_id,gender=gender,mobile=mobile_number))}"

    return JSONResponse(status_code=200, content=token)


def create_access_token(*, data: dict = None, expires_delta: int = (7 * 24)):
    to_encode = data.copy()
    if expires_delta:
        to_encode.update({"exp": datetime.utcnow() + timedelta(hours=expires_delta)})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return encoded_jwt


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
