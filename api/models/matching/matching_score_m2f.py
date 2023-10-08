from pydantic import BaseModel, Field
from typing import Optional


class ScoreMToFSchema(BaseModel):
    female_id: int
    male_id: int
    score_sum: Optional[int] = None
    score_max: Optional[int] = None
    date_birth: Optional[int] = None
    residence: Optional[int] = None
    job_type: Optional[int] = None
    job_name: Optional[int] = None
    height: Optional[int] = None
    education: Optional[int] = None
    divorce: Optional[int] = None
    smoking_history: Optional[int] = None
    drinking_life: Optional[int] = None
    owned_car: Optional[int] = None
    interests: Optional[int] = None
    number_relationships: Optional[int] = None
    athletic_life: Optional[int] = None
    pet_animal: Optional[int] = None
    religion: Optional[int] = None
    extrovert_or_introvert: Optional[int] = None
    intutive_or_realistic: Optional[int] = None
    emotional_or_rational: Optional[int] = None
    impromptu_or_planned: Optional[int] = None
    selfconfidence_or_careful: Optional[int] = None
    marriage_values: Optional[int] = None
    religious_values: Optional[int] = None
    opposite_friends_values: Optional[int] = None
    political_values: Optional[int] = None
    consumption_values: Optional[int] = None
    career_family_values: Optional[int] = None
    animal_image: Optional[int] = None
    double_eyelid: Optional[int] = None
    face_shape: Optional[int] = None
    body_type: Optional[int] = None
    skin_tone: Optional[int] = None
    tattoo: Optional[int] = None
    fashion_style: Optional[int] = None
    preffered_dating: Optional[int] = None
    preferred_contact_method: Optional[int] = None
    attractiveness_level: Optional[int] = None
    jealousy_level: Optional[int] = None
    love_initiative: Optional[int] = None
    dating_frequency: Optional[int] = None
    contact_style: Optional[int] = None
    skinship: Optional[int] = None
    sns: Optional[int] = None
    conflict_resolution_method: Optional[int] = None
