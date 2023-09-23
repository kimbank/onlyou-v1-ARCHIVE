from datetime import date, datetime
from pydantic import BaseModel, Field
from pydantic.schema import Optional


class UpdateValueSchema(BaseModel):
    # modified_at: Optional[datetime] = Field()
    marriage_values: Optional[int] = Field(description="0 ~ 2")
    religious_values: Optional[int] = Field(description="0 ~ 2")
    opposite_friends_values: Optional[int] = Field(description="0 ~ 2")
    political_values: Optional[int] = Field(description="0 ~ 3")
    consumption_values: Optional[int] = Field(description="0 ~ 1")
    career_family_values: Optional[int] = Field(description="0 ~ 1")

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
    # modified_at: Optional[datetime] = Field()
    smoking_history: Optional[int] = Field(description="0 ~ 2")
    drinking_life: Optional[int] = Field(description="0 ~ 4")
    owned_car: Optional[int] = Field(description="0 ~ 1")
    interests: Optional[str] = Field(description="Choose max 3 options")
    number_relationships: Optional[int] = Field(description="0 ~ 4")
    athletic_life: Optional[int] = Field(description="0 ~ 1")
    pet_animal: Optional[int] = Field(description="0 ~ 3")
    religion: Optional[str] = Field(description="")


class UpdatePersonalitySchema(BaseModel):
    # modified_at: Optional[datetime] = Field()
    extrovert_or_introvert: Optional[int] = Field(description="0 ~ 4")
    intutive_or_realistic: Optional[int] = Field(description="0 ~ 4")
    emotional_or_rational: Optional[int] = Field(description="0 ~ 4")
    impromptu_or_planned: Optional[int] = Field(description="0 ~ 4")
    selfconfidence_or_careful: Optional[int] = Field(description="0 ~ 4")


class UpdateDatingStyleSchema(BaseModel):
    # modified_at: Optional[datetime] = Field()
    preffered_dating: Optional[int] = Field(description="0 ~ 1")
    preferred_contact_method: Optional[int] = Field(description="0 ~ 1")
    attractiveness_level: Optional[int] = Field(description="0 ~ 4")
    jealousy_level: Optional[int] = Field(description="0 ~ 4")
    love_initiative: Optional[int] = Field(description="0 ~ 3")
    dating_frequency: Optional[int] = Field(description="0 ~ 3")
    contact_style: Optional[int] = Field(description="0 ~ 1")
    skinship: Optional[int] = Field(description="0 ~ 1")
    sns: Optional[int] = Field(description="0 ~ 1")
    conflict_resolution_method: Optional[int] = Field(description="0 ~ 1")


class UpdateAppearanceSchema(BaseModel):
    # modified_at: Optional[datetime] = Field()
    animal_image: Optional[int] = Field(description="")
    double_eyelid: Optional[int] = Field(description="0 ~ 2")
    face_shape: Optional[int] = Field(description="0 ~ 1")
    body_type: Optional[int] = Field(description="0 ~ 4")
    skin_tone: Optional[int] = Field(description="0 ~ 2")
    tattoo: Optional[int] = Field(description="0 ~ 1")
    fashion_style: Optional[str] = Field(description="")
