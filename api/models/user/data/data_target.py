from datetime import date, datetime
from pydantic import BaseModel, Field
from pydantic.schema import Optional


class UpdateValueSchema(BaseModel):
    modified_at: Optional[datetime] = Field()
    marriage_values: Optional[str] = Field()
    marriage_values_w: Optional[int] = Field()
    religious_values: Optional[str] = Field()
    religious_values_w: Optional[int] = Field()
    opposite_friends_values: Optional[str] = Field()
    opposite_friends_values_w: Optional[int] = Field()
    political_values: Optional[str] = Field()
    political_values_w: Optional[int] = Field()
    consumption_values: Optional[int] = Field()
    consumption_values_w: Optional[int] = Field()
    career_family_values: Optional[str] = Field()
    career_family_values_w: Optional[int] = Field()

    class Config:
        json_schema_extra = {
            "modified_at": "2023-09-17T07:34:03.285Z",
            "marriage_values": "string",
            "marriage_values_w": 4,
            "religious_values": "string",
            "religious_values_w": 1,
            "opposite_friends_values": "string",
            "opposite_friends_values_w": 2,
            "political_values": "string",
            "political_values_w": 3,
            "consumption_values": 0,
            "consumption_values_w": 2,
            "career_family_values": "string",
            "career_family_values_w": 2
        }


class UpdateLifeStyleSchema(BaseModel):
    modified_at: Optional[datetime] = Field()
    smoking_history: Optional[str] = Field()
    smoking_history_w: Optional[int] = Field()
    drinking_life: Optional[str] = Field()
    drinking_life_w: Optional[int] = Field()
    owned_car: Optional[str] = Field()
    owned_car_w: Optional[int] = Field()
    interests: Optional[str] = Field()
    interests_w: Optional[int] = Field()
    number_relationships: Optional[str] = Field()
    number_relationships_w: Optional[int] = Field()
    athletic_life: Optional[int] = Field()
    athletic_life_w: Optional[int] = Field()
    pet_animal: Optional[int] = Field()
    pet_animal_w: Optional[int] = Field()
    religion: Optional[str] = Field()
    religion_w: Optional[int] = Field()


class UpdatePersonalitySchema(BaseModel):
    modified_at: Optional[datetime] = Field()
    extrovert_or_introvert: Optional[str] = Field()
    extrovert_or_introvert_w: Optional[int] = Field()
    intutive_or_realistic: Optional[str] = Field()
    intutive_or_realistic_w: Optional[int] = Field()
    emotional_or_rational: Optional[str] = Field()
    emotional_or_rational_w: Optional[int] = Field()
    impromptu_or_planned: Optional[str] = Field()
    impromptu_or_planned_w: Optional[int] = Field()
    selfconfidence_or_careful: Optional[int] = Field()
    selfconfidence_or_careful_w: Optional[int] = Field()


class UpdateDatingStyleSchema(BaseModel):
    modified_at: Optional[datetime] = Field()
    preffered_dating: Optional[int] = Field()
    preffered_dating_w: Optional[int] = Field()
    preferred_contact_method: Optional[str] = Field()
    preferred_contact_method_w: Optional[int] = Field()
    attractiveness_level: Optional[str] = Field()
    attractiveness_level_w: Optional[int] = Field()
    jealousy_level: Optional[str] = Field()
    jealousy_level_w: Optional[int] = Field()
    love_initiative: Optional[str] = Field()
    love_initiative_w: Optional[int] = Field()
    dating_frequency: Optional[str] = Field()
    dating_frequency_w: Optional[int] = Field()
    contact_style: Optional[int] = Field()
    contact_style_w: Optional[int] = Field()
    skinship: Optional[int] = Field()
    skinship_w: Optional[int] = Field()
    sns: Optional[int] = Field()
    sns_w: Optional[int] = Field()
    conflict_resolution_method: Optional[int] = Field()
    conflict_resolution_method_w: Optional[int] = Field()


class UpdateAppearanceSchema(BaseModel):
    modified_at: Optional[datetime] = Field()
    animal_image: Optional[str] = Field()
    animal_image_w: Optional[int] = Field()
    double_eyelid: Optional[str] = Field()
    double_eyelid_w: Optional[int] = Field()
    face_shape: Optional[str] = Field()
    face_shape_w: Optional[int] = Field()
    body_type: Optional[str] = Field()
    body_type_w: Optional[int] = Field()
    skin_tone: Optional[str] = Field()
    skin_tone_w: Optional[int] = Field()
    tattoo: Optional[str] = Field()
    tattoo_w: Optional[int] = Field()
    fashion_style: Optional[str] = Field()
    fashion_style_w: Optional[int] = Field()
