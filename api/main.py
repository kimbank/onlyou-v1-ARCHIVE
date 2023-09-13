from dataclasses import asdict
from typing import Optional

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.security import APIKeyHeader
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.cors import CORSMiddleware

from api.common.consts import EXCEPT_PATH_LIST, EXCEPT_PATH_REGEX
from api.database.conn import db
from api.common.config import conf
# from app.middlewares.token_validator import access_control
# from app.middlewares.trusted_hosts import TrustedHostMiddleware
from api.middlewares.sqltap import sql_tap
from api.routes import index, login, signup, promotion, leave, matching, application, my_info, agreement, user

API_KEY_HEADER = APIKeyHeader(name="Authorization", auto_error=False)


description = """
_Next.js에게 영혼을 넣어줄 FastAPI의 명세입니다._

#### 미션

우리는 모든 사람이 자신에게 꼭 맞는 상대와 사랑을 나눌 수 있도록 합니다.

#### 비전

IT 기술을 활용하여 누구나 저렴한 가격에 서로의 니즈를 충족시키는 상대를 찾을 수 있도록 도와주는 종합연애정보회사

#### 핵심 가치

*타겟 고객 중심*, *감정이 배제된 합리적인 판단*, *팀과 개인의 동반 성장*, *열정과 헌신*

"""


def create_app():
    """
    앱 함수 실행
    :return:
    """
    c = conf()
    app = FastAPI(
        title="ONLYou API",
        description=description,
        version="0.0.0",
    )
    conf_dict = asdict(c)
    db.init_app(app, **conf_dict)
    # 데이터 베이스 이니셜라이즈

    # 레디스 이니셜라이즈

    # 미들웨어 정의
    # app.add_middleware(middleware_class=BaseHTTPMiddleware, dispatch=access_control)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=conf().ALLOW_SITE,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # app.add_middleware(TrustedHostMiddleware, allowed_hosts=conf().TRUSTED_HOSTS, except_path=["/health"])
    # app.add_middleware(middleware_class=BaseHTTPMiddleware, dispatch=sql_tap)

    # 라우터 정의
    app.include_router(index.router, tags=["헬스 체크 (정상 작동 확인)"])
    app.include_router(login.router, tags=["로그인"], prefix="/api", dependencies=[Depends(API_KEY_HEADER)])
    app.include_router(signup.router, tags=["회원가입"], prefix="/api")
    # if conf().DEBUG:
    #     app.include_router(promotion.router, tags=["Services"], prefix="/api", dependencies=[Depends(API_KEY_HEADER)])
    # else:
    #     app.include_router(promotion.router, tags=["Services"], prefix="/api")
    app.include_router(promotion.router, tags=["승급심사"], prefix="/api")
    app.include_router(leave.router, tags=["탈퇴"], prefix="/api")
    app.include_router(matching.router, tags=["매칭"], prefix="/api")
    app.include_router(application.router, tags=["매칭 신청서"], prefix="/api")
    app.include_router(my_info.router, tags=["내 정보"], prefix="/api")
    app.include_router(agreement.router, tags=["성사"], prefix="/api")
    app.include_router(user.router, tags=["유저"], prefix="/api")

    return app


app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
