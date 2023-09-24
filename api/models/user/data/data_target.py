from datetime import date, datetime
from pydantic import BaseModel, Field
from pydantic.schema import Optional


class UpdateTargetSchema(BaseModel):

    date_birth_s: Optional[int] = Field()
    date_birth_e: Optional[int] = Field()
    date_birth_w: Optional[int] = Field()

    residence: Optional[str] = Field()
    residence_w: Optional[int] = Field()

    job_type: Optional[str] = Field()
    job_type_w: Optional[int] = Field()

    # job_name_id: Optional[int] = Field(description="0-12")
    # job_name_w: Optional[int] = Field(description="0 ~ 5")

    height_s: Optional[int] = Field(description="165 ~ 185")
    height_e: Optional[int] = Field(description="165 ~ 185")
    height_w: Optional[int] = Field(description="0 ~ 5")

    education: Optional[str] = Field()
    education_w: Optional[int] = Field(description="0 ~ 5")

    divorce: Optional[int] = Field()
    divorce_w: Optional[int] = Field(description="0 ~ 5")

    smoking_history: Optional[str] = Field()
    smoking_history_w: Optional[int] = Field(description="0 ~ 5")

    drinking_life: Optional[str] = Field()
    drinking_life_w: Optional[int] = Field(description="0 ~ 5")

    owned_car: Optional[str] = Field()
    owned_car_w: Optional[int] = Field(description="0 ~ 5")

    interests: Optional[str] = Field()
    interests_w: Optional[int] = Field(description="0 ~ 5")

    number_relationships: Optional[str] = Field()
    number_relationships_w: Optional[int] = Field(description="0 ~ 5")

    athletic_life: Optional[int] = Field()
    athletic_life_w: Optional[int] = Field(description="0 ~ 5")

    pet_animal: Optional[int] = Field()
    pet_animal_w: Optional[int] = Field(description="0 ~ 5")

    religion: Optional[str] = Field()
    religion_w: Optional[int] = Field(description="0 ~ 5")

    extrovert_or_introvert: Optional[str] = Field()
    extrovert_or_introvert_w: Optional[int] = Field(description="0 ~ 5")

    intutive_or_realistic: Optional[str] = Field()
    intutive_or_realistic_w: Optional[int] = Field(description="0 ~ 5")

    emotional_or_rational: Optional[str] = Field()
    emotional_or_rational_w: Optional[int] = Field(description="0 ~ 5")

    impromptu_or_planned: Optional[str] = Field()
    impromptu_or_planned_w: Optional[int] = Field(description="0 ~ 5")

    selfconfidence_or_careful: Optional[str] = Field()
    selfconfidence_or_careful_w: Optional[int] = Field(description="0 ~ 5")

    marriage_values: Optional[str] = Field()
    marriage_values_w: Optional[int] = Field(description="0 ~ 5")

    religious_values: Optional[str] = Field()
    religious_values_w: Optional[int] = Field(description="0 ~ 5")

    opposite_friends_values: Optional[str] = Field()
    opposite_friends_values_w: Optional[int] = Field(description="0 ~ 5")

    political_values: Optional[str] = Field()
    political_values_w: Optional[int] = Field(description="0 ~ 5")

    consumption_values: Optional[int] = Field()
    consumption_values_w: Optional[int] = Field(description="0 ~ 5")

    career_family_values: Optional[str] = Field()
    career_family_values_w: Optional[int] = Field(description="0 ~ 5")

    animal_image: Optional[str] = Field()
    animal_image_w: Optional[int] = Field(description="0 ~ 5")

    double_eyelid: Optional[str] = Field()
    double_eyelid_w: Optional[int] = Field(description="0 ~ 5")

    face_shape: Optional[str] = Field()
    face_shape_w: Optional[int] = Field(description="0 ~ 5")

    body_type: Optional[str] = Field()
    body_type_w: Optional[int] = Field(description="0 ~ 5")

    skin_tone: Optional[str] = Field()
    skin_tone_w: Optional[int] = Field(description="0 ~ 5")

    tattoo: Optional[str] = Field()
    tattoo_w: Optional[int] = Field(description="0 ~ 5")

    fashion_style: Optional[str] = Field()
    fashion_style_w: Optional[int] = Field(description="0 ~ 5")

    preffered_dating: Optional[int] = Field()
    preffered_dating_w: Optional[int] = Field(description="0 ~ 5")

    preferred_contact_method: Optional[int] = Field()
    preferred_contact_method_w: Optional[int] = Field(description="0 ~ 5")

    attractiveness_level: Optional[str] = Field()
    attractiveness_level_w: Optional[int] = Field(description="0 ~ 5")

    jealousy_level: Optional[str] = Field()
    jealousy_level_w: Optional[int] = Field(description="0 ~ 5")

    love_initiative: Optional[str] = Field()
    love_initiative_w: Optional[int] = Field(description="0 ~ 5")

    dating_frequency: Optional[str] = Field()
    dating_frequency_w: Optional[int] = Field(description="0 ~ 5")

    contact_style: Optional[int] = Field()
    contact_style_w: Optional[int] = Field(description="0 ~ 5")

    skinship: Optional[int] = Field()
    skinship_w: Optional[int] = Field(description="0 ~ 5")

    sns: Optional[int] = Field()
    sns_w: Optional[int] = Field(description="0 ~ 5")

    conflict_resolution_method: Optional[int] = Field()
    conflict_resolution_method_w: Optional[int] = Field(description="0 ~ 5")
