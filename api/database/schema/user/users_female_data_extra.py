from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    func,
)
from sqlalchemy.dialects.mysql import TINYINT

from api.database.conn import Base
from api.database.schema.schema import BaseMixin
from api.database.schema.user.user import User

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