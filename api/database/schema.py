from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    func,
    Enum,
    Boolean,
    ForeignKey,

    # 추가된 코드
    Date,
    TIMESTAMP,
    text
)
from sqlalchemy.dialects.mysql import TINYINT  # 추가된 코드

from sqlalchemy.orm import Session, relationship

from api.database.conn import Base, db


class BaseMixin:
    # id = Column(Integer, primary_key=True, index=True)
    # created_at = Column(DateTime, nullable=False, default=func.utc_timestamp())
    # updated_at = Column(DateTime, nullable=False, default=func.utc_timestamp(), onupdate=func.utc_timestamp())

    def __init__(self):
        self._q = None
        self._session = None
        self.served = None

    def all_columns(self):
        return [c for c in self.__table__.columns if c.primary_key is False and c.name != "created_at"]

    def __hash__(self):
        return hash(self.id)

    @classmethod
    def create(cls, session: Session, auto_commit=False, **kwargs):
        """
        테이블 데이터 적재 전용 함수
        :param session:
        :param auto_commit: 자동 커밋 여부
        :param kwargs: 적재 할 데이터
        :return:
        """
        obj = cls()
        for col in obj.all_columns():
            col_name = col.name
            if col_name in kwargs:
                setattr(obj, col_name, kwargs.get(col_name))
        session.add(obj)
        session.flush()
        if auto_commit:
            session.commit()
        return obj

    @classmethod
    def get(cls, session: Session = None, **kwargs):
        """
        Simply get a Row
        :param session:
        :param kwargs:
        :return:
        """
        sess = next(db.session()) if not session else session
        query = sess.query(cls)
        for key, val in kwargs.items():
            col = getattr(cls, key)
            query = query.filter(col == val)

        if query.count() > 1:
            raise Exception("Only one row is supposed to be returned, but got more than one.")
        result = query.first()
        if not session:
            sess.close()
        return result

    @classmethod
    def filter(cls, session: Session = None, **kwargs):
        """
        Simply get a Row
        :param session:
        :param kwargs:
        :return:
        """
        cond = []
        for key, val in kwargs.items():
            key = key.split("__")
            if len(key) > 2:
                raise Exception("No 2 more dunders")
            col = getattr(cls, key[0])
            if len(key) == 1: cond.append((col == val))
            elif len(key) == 2 and key[1] == 'gt': cond.append((col > val))
            elif len(key) == 2 and key[1] == 'gte': cond.append((col >= val))
            elif len(key) == 2 and key[1] == 'lt': cond.append((col < val))
            elif len(key) == 2 and key[1] == 'lte': cond.append((col <= val))
            elif len(key) == 2 and key[1] == 'in': cond.append((col.in_(val)))
        obj = cls()
        if session:
            obj._session = session
            obj.served = True
        else:
            obj._session = next(db.session())
            obj.served = False
        query = obj._session.query(cls)
        query = query.filter(*cond)
        obj._q = query
        return obj

    @classmethod
    def cls_attr(cls, col_name=None):
        if col_name:
            col = getattr(cls, col_name)
            return col
        else:
            return cls

    # def order_by(self, *args: str):
    #     for a in args:
    #         if a.startswith("-"):
    #             col_name = a[1:]
    #             is_asc = False
    #         else:
    #             col_name = a
    #             is_asc = True
    #         col = self.cls_attr(col_name)
    #         self._q = self._q.order_by(col.asc()) if is_asc else self._q.order_by(col.desc())
    #     return self

    def update(self, auto_commit: bool = False, **kwargs):
        qs = self._q.update(kwargs)
        get_id = self.id
        ret = None

        self._session.flush()
        if qs > 0 :
            ret = self._q.first()
        if auto_commit:
            self._session.commit()
        return ret

    def first(self):
        result = self._q.first()
        self.close()
        return result

    def delete(self, auto_commit: bool = False):
        self._q.delete()
        if auto_commit:
            self._session.commit()

    def all(self):
        print(self.served)
        result = self._q.all()
        self.close()
        return result

    def count(self):
        result = self._q.count()
        self.close()
        return result

    def close(self):
        if not self.served:
            self._session.close()
        else:
            self._session.flush()


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
    kakao_id = Column(String(20, collation='ascii_general_ci'), default=None)
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

    auth_sens = relationship("AuthSens")


class UsersFemaleData(Base, BaseMixin):
    __tablename__ = 'users_female_data'

    female_id = Column(Integer, ForeignKey(
        User.id, name='fk-users-users_female_data'), primary_key=True, default=func.max(User.id))
    gender = Column(TINYINT, nullable=False, comment='[미공개 정보] 0 = 여성, 1 = 남성')
    job_type = Column(String(45, collation='utf8mb4_unicode_ci'),
                      nullable=False, comment='[선택 공개 정보] 직장 유형')
    job_name = Column(String(45, collation='utf8mb4_unicode_ci'),
                      nullable=False, comment='[선제 반영 미공개 정보] 직장 이름')
    job_group = Column(String(45, collation='utf8mb4_unicode_ci'),
                       nullable=False, comment='[공개 정보] 직업/직무')
    height = Column(TINYINT, nullable=False, comment='[선택 공개 정보] 키 (cm)')
    education = Column(TINYINT, nullable=False, comment='[선택 공개 정보] 학력 0 ~ 4')
    university_name = Column(String(
        45, collation='utf8mb4_unicode_ci'), nullable=False, comment='[미공개 정보] 대학 이름')
    divorce = Column(TINYINT, nullable=False,
                     comment='[미공개 정보] 이혼 여부 (0 = 초혼, 1 = 돌싱)')

    user = relationship("User", uselist=False)


class UsersFemaleDataExtra(Base, BaseMixin):
    __tablename__ = 'users_female_data_extra'

    female_id = Column(Integer, ForeignKey(
        User.id, name='fk-users-users_female_data_extra'), primary_key=True, default=func.max(User.id))
    created_at = Column(DateTime, nullable=False,
                        default=func.utc_timestamp(), comment='생성 일자')
    modified_at = Column(DateTime, nullable=False, default=func.utc_timestamp(
    ), onupdate=func.utc_timestamp(), comment='변경 일자')
    smoking_history = Column(
        TINYINT, comment='[미공개 정보] 흡연 경력 0: 비흡연 1: 금연 2: 흡연', nullable=True)
    drinking_life = Column(
        TINYINT, comment='[미공개 정보] 음주 생활 0 ~ 4', nullable=True)
    owned_car = Column(
        TINYINT, comment='[미공개 정보] 자차 0: 미소유 1: 소유', nullable=True)
    interests = Column(
        String(45, collation='utf8mb4_unicode_ci'), comment='[미공개 정보] 관심사 (최대 3개)', nullable=True)
    number_relationships = Column(
        TINYINT, comment='[미공개 정보] 연애 횟수 0 ~ 4', nullable=True)
    athletic_life = Column(
        TINYINT, comment='[미공개 정보] 운동 생활 0 ~ 1', nullable=True)
    pet_animal = Column(TINYINT, comment='[미공개 정보] 반려동물 0 ~ 3', nullable=True)
    religion = Column(String(10), comment='[미공개 정보] 종교', nullable=True)
    extrovert_or_introvert = Column(
        TINYINT, comment='[미공개 정보] 외향/내향 0 ~ 4', nullable=True)
    intutive_or_realistic = Column(
        TINYINT, comment='[미공개 정보] 직관/현실 0 ~ 4', nullable=True)
    emotional_or_rational = Column(
        TINYINT, comment='[미공개 정보] 감성/이성 0 ~ 4', nullable=True)
    impromptu_or_planned = Column(
        TINYINT, comment='[미공개 정보] 즉흥/계획 0 ~ 4', nullable=True)
    selfconfidence_or_careful = Column(
        TINYINT, comment='[미공개 정보] 자기확신/신중 0 ~ 4', nullable=True)
    marriage_values = Column(
        TINYINT, comment='[미공개 정보] 결혼 가치관 0 ~ 2', nullable=True)
    religious_values = Column(
        TINYINT, comment='[미공개 정보] 종교의 중요성 0 ~ 2', nullable=True)
    opposite_friends_values = Column(
        TINYINT, comment='[미공개 정보] 이성 친구 가치관 0 ~ 2', nullable=True)
    political_values = Column(
        TINYINT, comment='[미공개 정보] 정치적 성향 0 ~ 3', nullable=True)
    consumption_values = Column(
        TINYINT, comment='[미공개 정보] 소비 가치관 0: 절약형 1: 투자형', nullable=True)
    career_family_values = Column(
        TINYINT, comment='[미공개 정보] 커리어와 가정 가치관 0 ~ 1', nullable=True)
    animal_image = Column(String(6), comment='[미공개 정보] 동물 이미지', nullable=True)
    double_eyelid = Column(
        TINYINT, comment='[미공개 정보] 쌍커풀 0 ~ 2', nullable=True)
    face_shape = Column(
        TINYINT, comment='[미공개 정보] 얼굴상 0: 순함 1: 진함', nullable=True)
    body_type = Column(TINYINT, comment='[미공개 정보] 체형 0 ~ 4', nullable=True)
    skin_tone = Column(TINYINT, comment='[미공개 정보] 피부톤 0 ~ 2', nullable=True)
    tattoo = Column(
        TINYINT, comment='[미공개 정보] 문신 유무 0: 없음 1: 있음', nullable=True)
    fashion_style = Column(
        String(12), comment='[미공개 정보] 패션 스타일', nullable=True)
    preffered_dating = Column(
        TINYINT, comment='선호 데이트 0: 정적 1: 활동적', nullable=True)
    preferred_contact_method = Column(
        String(5), comment='선호 연락 수단 0: 전화 1: 문자', nullable=True)
    attractiveness_level = Column(
        TINYINT, comment='애교 레벨 0 ~ 4', nullable=True)
    jealousy_level = Column(TINYINT, comment='질투 레벨 0 ~ 4', nullable=True)
    love_initiative = Column(TINYINT, comment='연애 주도성 0 ~ 3', nullable=True)
    dating_frequency = Column(TINYINT, comment='데이트 빈도 0 ~ 3', nullable=True)
    contact_style = Column(
        TINYINT, comment='연락 스타일 0: SOFT 1: HARD', nullable=True)
    skinship = Column(TINYINT, comment='혼전순결 0: SOFT 1: HARD', nullable=True)
    sns = Column(TINYINT, comment='소셜 미디어 0: 비공개 1: 공개', nullable=True)
    conflict_resolution_method = Column(
        TINYINT, comment='갈등 해결 방식 0: SOFT 1: HARD', nullable=True)


class ApiKeys(Base, BaseMixin):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False, default=func.utc_timestamp())
    updated_at = Column(DateTime, nullable=False, default=func.utc_timestamp(), onupdate=func.utc_timestamp())

    access_key = Column(String(length=64), nullable=False, index=True)
    secret_key = Column(String(length=64), nullable=False)
    user_memo = Column(String(length=40), nullable=True)
    # status = Column(Enum("active", "stopped", "deleted"), default="active")
    # is_whitelisted = Column(Boolean, default=False)
    # user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    # whitelist = relationship("ApiWhiteLists", backref="api_keys")
    # users = relationship("User", back_populates="keys")


class ApiWhiteLists(Base, BaseMixin):
    __tablename__ = "api_whitelists"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False, default=func.utc_timestamp())
    updated_at = Column(DateTime, nullable=False, default=func.utc_timestamp(), onupdate=func.utc_timestamp())

    ip_addr = Column(String(length=64), nullable=False)
    # api_key_id = Column(Integer, ForeignKey("api_keys.id"), nullable=False)


class AuthSens(Base, BaseMixin):
    __tablename__ = "auth_sens"

    id = Column(Integer, primary_key=True, autoincrement=True)
    mobile_number = Column(String(length=11), ForeignKey("users.mobile_number"), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=func.now())
    count = Column(TINYINT, nullable=False, default=0)
    code = Column(String(length=6), nullable=False)

    users = relationship("User")
