from datetime import datetime, timedelta

import bcrypt
import jwt
from fastapi import APIRouter, Depends, Body, HTTPException
from fastapi.responses import Response

# TODO:
from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload, contains_eager
from starlette.responses import JSONResponse
from api.utils.sens_auth import send_auth_code, generate_verification_code, slack_chat_post

from api.models.user.user import UserCreate
from api.common.consts import JWT_SECRET, JWT_ALGORITHM
from api.database.conn import db
# from api.database.schema import User, AuthSens
from api.database.schema.user.user import User
from api.database.schema.login.auth import AuthSens

from api.models.models import UserLoginAuth


router = APIRouter(prefix="/login")


@router.post("", status_code=200)
async def current_code_exist(auth_info: UserLoginAuth, session: Session = Depends(db.session)):
    # 인증 요청 된 mobile_number로 auth_sens 테이블 조회
    auth_code = (
        session.query(AuthSens)
        .outerjoin(User)
        .filter(User.mobile_number == auth_info.mobile_number)
        .filter(AuthSens.created_at >= (datetime.now() - timedelta(minutes=5)))
        .order_by(AuthSens.created_at.desc())
        .first()
    )

    # client의 인증번호 발송 요청
    if auth_info.code == "000000":

        # db에 최근 5분간 인증번호 발송 이력이 있음
        if auth_code:
            return JSONResponse(status_code=200, content=dict(msg=f"TIME_LEFT {((auth_code.created_at) -(datetime.now() - timedelta(minutes=5))).total_seconds():.0f}"))

        # db에 최근 5분간 인증번호 발송 이력이 없음
        else:
            user = User.get(mobile_number=auth_info.mobile_number)

            # Todo: 가입정보가 없더라도 인증번호를 발송해야 개인정보 보호가 될 것으로 예상
            # db에 가입 정보가 있음
            if user:
                # db에 인증 관련 정보 추가
                new_auth_code = AuthSens.create(session, auto_commit=True, mobile_number=auth_info.mobile_number,
                                                code=generate_verification_code())
                if (False): # 실제 문자 전송 안함 (개발 중일 때)
                    sens_result = dict(requestId="DEV_MODE", requestTime=str(new_auth_code.created_at), statusCode="DEV_MODE", statusName="DEV_MODE")
                    slack_chat_post(auth_info.mobile_number, new_auth_code.code, sens_result)
                else: #   실제 문자 전송 (궁금하면 위에 False로 하고 잔행해보세용)
                    sens_result = dict()
                    # Todo: 관련해서 구현 해야함
                    try: # NCP SENS 정상 작동
                        res = send_auth_code(auth_info.mobile_number, new_auth_code.code)
                        sens_result = res
                    except: # NCP SENS 오류 크리티컬함
                        sens_result = dict(requestId="ERROR!", requestTime="ERROR!", statusCode="ERROR!", statusName="ERROR!")

                    slack_chat_post(auth_info.mobile_number, new_auth_code.code, sens_result)
                    

                session.close()
                return JSONResponse(status_code=200, content=dict(msg="NEW_CODE_CREATED"))

            # db에 가입 정보가 없음
            else:
                session.close()
                return JSONResponse(status_code=200, content=dict(msg="NOT_REGISTERED"))


    # client의 인증번호 일치 확인 요청 (이미 인증번호 발송된 상태)
    else:

        # db에 최근 5분간 인증번호 발송 이력이 있음
        if auth_code:

            # 인증번호가 일치함 [[ 로그인 성공 ]]
            if auth_info.code == auth_code.code:
                # Todo: 정지 당했는 지 확인하고 일치해도 정지당했으면 로그인 불가하게
                token = f"{create_access_token(data=dict(id=auth_code.users.id,gender=auth_code.users.gender,mobile=auth_code.mobile_number))}"

                response = Response(status_code=200, content='{"msg": "AUTH_SUCCESS"}')
                response.set_cookie(key="access_token", value=token, expires=60*60*24*7*3, secure=True)

                session.close()
                # return JSONResponse(status_code=200, content=dict(msg="AUTH_SUCCESS")).set_cookie(key="access_token", value=token, httponly=True)
                # response = JSONResponse(response, content=dict(msg="AUTH_SUCCESS"))
                return response

            # 인증번호가 불일치함
            else:
                auth_counter = (
                    session.query(AuthSens)
                    .filter(AuthSens.mobile_number == auth_info.mobile_number)
                    .order_by(AuthSens.created_at.desc())
                    .first()
                )
                auth_counter.count += 1
                session.commit()

                # 인증 실패 5회 이상 시 차단
                if auth_code.count >= 5:
                    user_auth_block = (
                        session.query(User)
                        .filter(User.mobile_number == auth_code.mobile_number)
                        .first()
                    )
                    user_auth_block.date_auth_block = func.now()
                    session.commit()
                    session.close()

                    return JSONResponse(status_code=200, content=dict(msg="AUTH_BLOCKED"))

                # 인증 실패 시 count++ 후 전달
                else:
                    session.close()
                    return JSONResponse(status_code=200, content=dict(msg=f"TRY_LEFT {5 - auth_counter.count}"))

        # db에 최근 5분간 인증번호 발송 이력이 없음
        else:
            session.close()
            return JSONResponse(status_code=200, content=dict(msg="AUTH_EXPIRED"))



# 사용자 계정 정보 등록
@router.post("/new_user")
async def register_user(user_account_info: UserCreate = Body(...), session: Session = Depends(db.session)):
    try:
        User.create(session, auto_commit=True,
                    name=user_account_info.name,
                    mobile_number=user_account_info.mobile_number,
                    gender=user_account_info.gender,
                    nickname=user_account_info.nickname,
                    date_birth=user_account_info.date_birth
                    )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    return JSONResponse(status_code=200, content=dict(msg="USER_CREATED"))


def create_access_token(*, data: dict = None, expires_delta: int = (3 * 7 * 24)):
    to_encode = data.copy()
    if expires_delta:
        to_encode.update({"exp": datetime.utcnow() + timedelta(hours=expires_delta)})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return encoded_jwt