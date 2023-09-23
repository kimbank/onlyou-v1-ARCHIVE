from sqlalchemy import (
    Column,
    TIMESTAMP,
    func,
)
from sqlalchemy.dialects.mysql import SMALLINT, TINYINT, BIGINT
from sqlalchemy.orm import relationship

from api.database.conn import Base
from api.database.schema.mixin import BaseMixin
from api.database.schema.user.user import User
from api.database.schema.user.users_female_data import UsersFemaleData
from api.database.schema.user.users_male_data import UsersMaleData


class ScoreFToM(Base, BaseMixin):
    __tablename__ = 'matching_score_f2m'
    female_id = Column(BIGINT, primary_key=True, unique=True)
    male_id = Column(BIGINT, primary_key=True, unique=True)
    created_at = Column(TIMESTAMP, nullable=False,
                        default=func.utc_timestamp(), comment='생성 일자')
    modified_at = Column(TIMESTAMP, nullable=False, default=func.utc_timestamp(
    ), onupdate=func.utc_timestamp(), comment='변경 일자')
    score_sum = Column(SMALLINT)
    date_birth = Column(TINYINT)
    residence = Column(TINYINT)
    job_type = Column(TINYINT)
    job_name = Column(TINYINT)
    height = Column(TINYINT)
    education = Column(TINYINT)
    divorce = Column(TINYINT)
    smoking_history = Column(TINYINT)
    drinking_life = Column(TINYINT)
    owned_car = Column(TINYINT)
    interests = Column(TINYINT)
    number_relationships = Column(TINYINT)
    athletic_life = Column(TINYINT)
    pet_animal = Column(TINYINT)
    religion = Column(TINYINT)
    extrovert_or_introvert = Column(TINYINT)
    intutive_or_realistic = Column(TINYINT)
    emotional_or_rational = Column(TINYINT)
    impromptu_or_planned = Column(TINYINT)
    selfconfidence_or_careful = Column(TINYINT)
    marriage_values = Column(TINYINT)
    religious_values = Column(TINYINT)
    opposite_friends_values = Column(TINYINT)
    political_values = Column(TINYINT)
    consumption_values = Column(TINYINT)
    career_family_values = Column(TINYINT)
    animal_image = Column(TINYINT)
    double_eyelid = Column(TINYINT)
    face_shape = Column(TINYINT)
    body_type = Column(TINYINT)
    skin_tone = Column(TINYINT)
    tattoo = Column(TINYINT)
    fashion_style = Column(TINYINT)
    preffered_dating = Column(TINYINT)
    preferred_contact_method = Column(TINYINT)
    attractiveness_level = Column(TINYINT)
    jealousy_level = Column(TINYINT)
    love_initiative = Column(TINYINT)
    dating_frequency = Column(TINYINT)
    contact_style = Column(TINYINT)
    skinship = Column(TINYINT)
    sns = Column(TINYINT)
    conflict_resolution_method = Column(TINYINT)
