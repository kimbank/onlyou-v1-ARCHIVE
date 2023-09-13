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


async def token_control(request: Request):

    try:
        if request.cookies.get('access_token'):
            # print('token', request.cookies.get('access_token'))
            token_info = await token_decode(request.cookies.get('access_token'))
            user_info = UserToken(**token_info)
        elif "authorization" in request.headers.keys():
            token_info = await token_decode(access_token=request.headers.get("Authorization"))
            user_info = UserToken(**token_info)
        else:
            raise ex.NotAuthorized()
        # response = await call_next(request)
        # await api_logger(request=request, response=response)

    except Exception as e:
        error = await exception_handler(e)
        error_dict = dict(status=error.status_code, msg=error.msg, detail=error.detail, code=error.code)
        # return error_dict
        return False
        # await api_logger(request=request, error=error)

    return user_info


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
