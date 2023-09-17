from datetime import datetime
from pydantic import BaseModel, Field
from pydantic.schema import Optional


class UserFemaleDataExtraSchema(BaseModel):
    female_id: int
    created_at: Optional[datetime]
    modified_at: Optional[datetime]
    smoking_history: Optional[int] = Field(description="0 ~ 2")
    drinking_life: Optional[int] = Field(description="0 ~ 4")
    owned_car: Optional[int] = Field(description="0 ~ 1")
    interests: Optional[str] = Field(description="Choose max 3 options")
    number_relationships: Optional[int] = Field(description="0 ~ 4")
    athletic_life: Optional[int] = Field(description="0 ~ 1")
    pet_animal: Optional[int] = Field(description="0 ~ 3")
    religion: Optional[str] = Field(description="")
    extrovert_or_introvert: Optional[int] = Field(description="0 ~ 4")
    intutive_or_realistic: Optional[int] = Field(description="0 ~ 4")
    emotional_or_rational: Optional[int] = Field(description="0 ~ 4")
    impromptu_or_planned: Optional[int] = Field(description="0 ~ 4")
    selfconfidence_or_careful: Optional[int] = Field(description="0 ~ 4")
    marriage_values: Optional[int] = Field(description="0 ~ 2")
    religious_values: Optional[int] = Field(description="0 ~ 2")
    opposite_friends_values: Optional[int] = Field(description="0 ~ 2")
    political_values: Optional[int] = Field(description="0 ~ 3")
    consumption_values: Optional[int] = Field(description="0 ~ 1")
    career_family_values: Optional[int] = Field(description="0 ~ 1")
    animal_image: Optional[int] = Field(description="")
    double_eyelid: Optional[int] = Field(description="0 ~ 2")
    face_shape: Optional[int] = Field(description="0 ~ 1")
    body_type: Optional[int] = Field(description="0 ~ 4")
    skin_tone: Optional[int] = Field(description="0 ~ 2")
    tattoo: Optional[int] = Field(description="0 ~ 1")
    fashion_style: Optional[str] = Field(description="")
    preffered_dating: Optional[int] = Field(description="0 ~ 1")
    preferred_contact_method: Optional[str] = Field(description="0 ~ 1")
    attractiveness_level: Optional[int] = Field(description="0 ~ 4")
    jealousy_level: Optional[int] = Field(description="0 ~ 4")
    love_initiative: Optional[int] = Field(description="0 ~ 3")
    dating_frequency: Optional[int] = Field(description="0 ~ 3")
    contact_style: Optional[int] = Field(description="0 ~ 1")
    skinship: Optional[int] = Field(description="0 ~ 1")
    sns: Optional[int] = Field(description="0 ~ 1")
    conflict_resolution_method: Optional[int] = Field(description="0 ~ 1")

    class Config:
        orm_mode = True
        json_schema_extra = {
            "example": {
                "female_id": 0,
                "created_at": "2023-08-21 18:31:58",
                "modified_at": "2023-08-21 18:31:58",
                "smoking_history": 0,
                "drinking_life": 1,
                "owned_car": 1,
                "interests": "",
                "number_relationships": 2,
                "athletic_life": 1,
                "pet_animal": 2,
                "religion": "무교",
                "extrovert_or_introvert": 2,
                "intutive_or_realistic": 2,
                "emotional_or_rational": 2,
                "impromptu_or_planned": 2,
                "selfconfidence_or_careful": 2,
                "marriage_values": 1,
                "religious_values": 2,
                "opposite_friends_values": 1,
                "political_values": 2,
                "consumption_values": 1,
                "career_family_values": 1,
                "animal_image": "강아지",
                "double_eyelid": 1,
                "face_shape": 0,
                "body_type": 2,
                "skin_tone": 1,
                "tattoo": 1,
                "fashion_style": "",
                "preffered_dating": 1,
                "preferred_contact_method": 1,
                "attractiveness_level": 2,
                "jealousy_level": 2,
                "love_initiative": 2,
                "dating_frequency": 2,
                "contact_style": 1,
                "skinship": 0,
                "sns": 1,
                "conflict_resolution_method": 0,
            }
        }
