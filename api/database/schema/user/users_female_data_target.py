from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    ForeignKey,
    func,
)
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import relationship

from api.database.conn import Base
from api.database.schema.mixin import BaseMixin
from api.database.schema.user.user import User


class UsersFemaleDataTarget(Base, BaseMixin):
    __tablename__ = 'users_female_data_target'
    female_id = Column(Integer, ForeignKey(
        User.id, name='fk-users-users_female_data_target'), primary_key=True,
                       default=func.max(User.id))
    fill_status = Column(TINYINT, nullable=False, default=0)
    weight_standard = Column(TINYINT)
    created_at = Column(DateTime, nullable=False,
                        default=func.utc_timestamp(), comment='생성 일자')
    modified_at = Column(DateTime, nullable=False, default=func.utc_timestamp(
    ), onupdate=func.utc_timestamp(), comment='변경 일자')
    date_birth_s = Column(TINYINT, comment="생년월일 시작")
    date_birth_e = Column(TINYINT, comment="생년월일 끝")
    date_birth_w = Column(TINYINT)
    residence = Column(String(255))
    residence_w = Column(TINYINT)
    job_type = Column(String(25))
    job_type_w = Column(TINYINT)
    job_name_id = Column(TINYINT)
    job_name_w = Column(TINYINT)
    height_s = Column(TINYINT)
    height_e = Column(TINYINT)
    height_w = Column(TINYINT)
    education = Column(String(9))
    education_w = Column(TINYINT)
    divorce = Column(TINYINT)
    divorce_w = Column(TINYINT)
    smoking_history = Column(String(5))
    smoking_history_w = Column(TINYINT)
    drinking_life = Column(String(9))
    drinking_life_w = Column(TINYINT)
    owned_car = Column(String(9))
    owned_car_w = Column(TINYINT)
    interests = Column(String(41))
    interests_w = Column(TINYINT)
    number_relationships = Column(String(7))
    number_relationships_w = Column(TINYINT)
    athletic_life = Column(TINYINT)
    athletic_life_w = Column(TINYINT)
    pet_animal = Column(String(11))
    pet_animal_w = Column(TINYINT)
    religion = Column(String(11))
    religion_w = Column(TINYINT)
    extrovert_or_introvert = Column(String(11))
    extrovert_or_introvert_w = Column(TINYINT)
    intutive_or_realistic = Column(String(11))
    intutive_or_realistic_w = Column(TINYINT)
    emotional_or_rational = Column(String(11))
    emotional_or_rational_w = Column(TINYINT)
    impromptu_or_planned = Column(String(11))
    impromptu_or_planned_w = Column(TINYINT)
    selfconfidence_or_careful = Column(String(11))
    selfconfidence_or_careful_w = Column(TINYINT)
    marriage_values = Column(String(5))
    marriage_values_w = Column(TINYINT)
    religious_values = Column(String(5))
    religious_values_w = Column(TINYINT)
    opposite_friends_values = Column(String(5))
    opposite_friends_values_w = Column(TINYINT)
    political_values = Column(String(7))
    political_values_w = Column(TINYINT)
    consumption_values = Column(TINYINT)
    consumption_values_w = Column(TINYINT)
    career_family_values = Column(String(3))
    career_family_values_w = Column(TINYINT)
    animal_image = Column(String(11))
    animal_image_w = Column(TINYINT)
    double_eyelid = Column(String(5))
    double_eyelid_w = Column(TINYINT)
    face_shape = Column(String(3))
    face_shape_w = Column(TINYINT)
    body_type = Column(String(9))
    body_type_w = Column(TINYINT)
    skin_tone = Column(String(5))
    skin_tone_w = Column(TINYINT)
    tattoo = Column(String(3))
    tattoo_w = Column(TINYINT)
    fashion_style = Column(String(13))
    fashion_style_w = Column(TINYINT)
    preffered_dating = Column(TINYINT)
    preffered_dating_w = Column(TINYINT)
    preferred_contact_method = Column(TINYINT)
    preferred_contact_method_w = Column(TINYINT)
    attractiveness_level = Column(String(11))
    attractiveness_level_w = Column(TINYINT)
    jealousy_level = Column(String(11))
    jealousy_level_w = Column(TINYINT)
    love_initiative = Column(String(7))
    love_initiative_w = Column(TINYINT)
    dating_frequency = Column(String(7))
    dating_frequency_w = Column(TINYINT)
    contact_style = Column(TINYINT)
    contact_style_w = Column(TINYINT)
    skinship = Column(TINYINT)
    skinship_w = Column(TINYINT)
    sns = Column(TINYINT)
    sns_w = Column(TINYINT)
    conflict_resolution_method = Column(TINYINT)
    conflict_resolution_method_w = Column(TINYINT)

    user = relationship("User", uselist=False)
