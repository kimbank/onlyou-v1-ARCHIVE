from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    TIMESTAMP,
    text,
    TEXT,
)
from sqlalchemy.dialects.mysql import TINYINT

from sqlalchemy.orm import relationship

from api.database.conn import Base
from api.database.schema.mixin import BaseMixin

class User(Base, BaseMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(34, collation='utf8mb4_unicode_ci'),
                  nullable=False, comment='[미공개 정보] 한글만 입력 가능')
    mobile_number = Column(String(11, collation='ascii_general_ci'),
                           nullable=False, comment='[미공개 정보] 하이픈 없이 숫자만 기입')
    gender = Column(TINYINT, nullable=False, comment='[미공개 정보] 0 = 여성, 1 = 남성')
    nickname = Column(String(20, collation='utf8mb4_unicode_ci'),
                      nullable=False, unique=True, comment='[공개 정보] 최대 길이 10글자')
    date_birth = Column(Date, comment='[공개 정보] 생년 월일')
    residence = Column(
        Integer, comment='[공개 정보] 거주지 정보 -> location_emd.id 를 외래키로')
    date_join = Column(TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))
    date_accept_terms = Column(
        TIMESTAMP, comment='서비스 이용 약관 동의 일자', nullable=True)
    date_accept_marketing = Column(
        TIMESTAMP, comment='마케팅 정보 수신 동의 일자', nullable=True)
    date_dormant = Column(
        TIMESTAMP, comment='휴면 전환 일자 [서비스 이용 정책 2.12 근거]', nullable=True)
    date_suspension = Column(
        TIMESTAMP, comment='회원 자격 박탈 일자 [회원 정책 1.6 근거]', nullable=True)
    date_auth_block = Column(
        TIMESTAMP, nullable=True)

    information_before_meeting = Column(TINYINT)
    kakao_id = Column(String(20, collation='ascii_general_ci'), default=None)

    letter = Column(TEXT)

    tmp_job = Column(String(200, collation='utf8mb4_unicode_ci'), default=None)

    # 인증번호 외래키
    # auth_sens = relationship("AuthSens")

    # 여성 외래키
    # female_data = relationship("UsersFemaleData")
    # female_data_extra = relationship("UsersFemaleDataExtra")
    # female_data_target = relationship("UsersFemaleDataTarget")

    # 남성 외래키
    # male_data = relationship("UsersMaleData")
    # male_data_extra = relationship("UsersMaleDataExtra")
    # male_data_target = relationship("UsersMaleDataTarget")

    # matching_history = relationship("MatchingHistory", foreign_keys=[])
