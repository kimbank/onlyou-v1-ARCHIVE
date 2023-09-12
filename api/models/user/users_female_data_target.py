from datetime import datetime
from pydantic import BaseModel, Field
from pydantic.schema import Optional


class UsersFemaleDataTargetSchema(BaseModel):
    # female_id
    # fill_status
    # created_at
    # modified_at
    smoking_history : Optional[int] = Field(description="0: 비흡연 1: 금연 2: 흡연")
    drinking_life : Optional[int] = Field(description="음주 생활 0 ~ 4")
    owned_car : Optional[int] = Field(description="자차 0: 미소유 1: 소유")
    interests : Optional[str] = Field(description="최대 3개")
    number_relationships : Optional[int] = Field(description="연애 횟수 0 ~ 4")
    athletic_life : Optional[int] = Field(description="운동 생활 0 ~ 1")
    pet_animal: Optional[int] = Field(description="반려동물 0 ~ 3")
    religion : Optional[str] = Field(description="종교")
    extrovert_or_introvert : Optional[int] = Field(description="외향/내향 0 ~ 4")
    intutive_or_realistic : Optional[int] = Field(description="직관/현실 0 ~ 4")
    emotional_or_rational : Optional[int] = Field(description="감성/이성 0 ~ 4")
    impromptu_or_planned: Optional[int] = Field(description="즉흥/계획 0 ~ 4")
    selfconfidence_or_careful : Optional[int] = Field(description="자기확신/신중 0 ~ 4")
    marriage_values : Optional[int] = Field(description="결혼 가치관 0 ~ 2")
    religious_values : Optional[int] = Field(description="종교의 중요성 0 ~ 2")
    opposite_friends_values : Optional[int] = Field(description="이성 친구 가치관 0 ~ 2")
    political_values : Optional[int] = Field(description="정치적 성향 0 ~ 3")
    consumption_values : Optional[int] = Field(description="소비 가치관 0: 절약형 1: 투자형")
    career_family_values : Optional[int] = Field(description="커리어와 가정 가치관 0 ~ 1")
    animal_image : Optional[str] = Field(description="동물 이미지")
    double_eyelid : Optional[int] = Field(description="쌍커풀 0 ~ 2")
    face_shape : Optional[int] = Field(description="얼굴상 0: 순함 1: 진함")
    body_type : Optional[int] = Field(description="체형 0 ~ 4")
    skin_tone : Optional[int] = Field(description="피부톤 0 ~ 2")
    tattoo : Optional[int] = Field(description="문신 유무 0: 없음 1: 있음")
    fashion_style : Optional[str] = Field(description="패션 스타일")
    preffered_dating: Optional[int] = Field(description="선호 데이트 0: 정적 1: 활동적")
    preferred_contact_method : Optional[str] = Field(description="선호 연락 수단 0: 전화 1: 문자")
    attractiveness_level : Optional[int] = Field(description="애교 레벨 0 ~ 4")
    jealousy_level: Optional[int] = Field(description="질투 레벨 0 ~ 4")
    love_initiative: Optional[int] = Field(description="연애 주도성 0 ~ 3")
    dating_frequency : Optional[int] = Field(description="데이트 빈도 0 ~ 3")
    contact_style : Optional[int] = Field(description="연락 스타일 0: SOFT 1: HARD")
    skinship : Optional[int] = Field(description="혼전순결 0: SOFT 1: HARD")
    sns : Optional[int] = Field(description="소셜 미디어 0: 비공개 1: 공개")
    conflict_resolution_method : Optional[int] = Field(description="갈등 해결 방식 0: SOFT 1: HARD")
