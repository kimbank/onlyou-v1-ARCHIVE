import base64
import hmac
import time
import typing
import re

import starlette.datastructures
from fastapi import Cookie

import jwt
import sqlalchemy.exc

from jwt.exceptions import ExpiredSignatureError, DecodeError
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.datastructures import URL, URLPath

from api.common.consts import EXCEPT_PATH_LIST, EXCEPT_PATH_REGEX
from api.database.conn import db
# from api.database.schema import User, ApiKeys
# from api.database.schema.user.user import User
from api.errors import exceptions as ex

from api.common import config, consts
from api.errors.exceptions import APIException, SqlFailureEx, APIQueryStringEx
# from api.models import UserToken
from api.models.models import UserToken

from api.utils.date_utils import D
from api.utils.logger import api_logger
from api.utils.query_utils import to_dict


async def access_control(request: Request, call_next):
    request.state.req_time = D.datetime()
    request.state.start = time.time()
    request.state.inspect = None
    request.state.user = None
    request.state.service = None

    ip = request.headers["x-forwarded-for"] if "x-forwarded-for" in request.headers.keys() else request.client.host
    request.state.ip = ip.split(",")[0] if "," in ip else ip
    headers = request.headers
    # cookies = request.cookies

    url = request.url.path
    if len(str(request.url).split(',')) >= 2:
        url = URL("".join(str(request.url).split(',')[1:])).path
    print(request.headers.keys())
    # print(request.headers[])
    print(request.url.path)
    if await url_pattern_check(url, EXCEPT_PATH_REGEX) or url in EXCEPT_PATH_LIST:
        response = await call_next(request)
        if url != "/":
            await api_logger(request=request, response=response)
        return response

    try:
        # if url.startswith("/api"):
        #     if "authorization" in headers.keys():
        #         token_info = await token_decode(access_token=headers.get("Authorization"))
        #         request.state.user = UserToken(**token_info)
        #         print(request.state.user)
        #         # 토큰 없음
        #     elif "Authorization" not in headers.keys():
        #         raise ex.NotAuthorized()
        if request.cookies.get('access_token'):
            print('token', request.cookies.get('access_token'))
            token_info = await token_decode(request.cookies.get('access_token'))
            request.state.user = UserToken(**token_info)
        else:
            raise ex.NotAuthorized()
        response = await call_next(request)
        await api_logger(request=request, response=response)

    except Exception as e:
        error = await exception_handler(e)
        error_dict = dict(status=error.status_code, msg=error.msg, detail=error.detail, code=error.code)
        response = JSONResponse(status_code=error.status_code, content=error_dict)
        # await api_logger(request=request, error=error)

    return response


async def url_pattern_check(path, pattern):
    result = re.match(pattern, path)
    if result:
        return True
    return False


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
