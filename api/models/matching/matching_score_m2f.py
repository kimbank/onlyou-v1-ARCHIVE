from pydantic import BaseModel
from pydantic.schema import Optional


class ScoreMToFSchema(BaseModel):
    female_id: int
    male_id: int
    score_sum: Optional[int]
    score_max: Optional[int]
    date_birth: Optional[int]
    residence: Optional[int]
    job_type: Optional[int]
    job_name: Optional[int]
    height: Optional[int]
    education: Optional[int]
    divorce: Optional[int]
    smoking_history: Optional[int]
    drinking_life: Optional[int]
    owned_car: Optional[int]
    interests: Optional[int]
    number_relationships: Optional[int]
    athletic_life: Optional[int]
    pet_animal: Optional[int]
    religion: Optional[int]
    extrovert_or_introvert: Optional[int]
    intutive_or_realistic: Optional[int]
    emotional_or_rational: Optional[int]
    impromptu_or_planned: Optional[int]
    selfconfidence_or_careful: Optional[int]
    marriage_values: Optional[int]
    religious_values: Optional[int]
    opposite_friends_values: Optional[int]
    political_values: Optional[int]
    consumption_values: Optional[int]
    career_family_values: Optional[int]
    animal_image: Optional[int]
    double_eyelid: Optional[int]
    face_shape: Optional[int]
    body_type: Optional[int]
    skin_tone: Optional[int]
    tattoo: Optional[int]
    fashion_style: Optional[int]
    preffered_dating: Optional[int]
    preferred_contact_method: Optional[int]
    attractiveness_level: Optional[int]
    jealousy_level: Optional[int]
    love_initiative: Optional[int]
    dating_frequency: Optional[int]
    contact_style: Optional[int]
    skinship: Optional[int]
    sns: Optional[int]
    conflict_resolution_method: Optional[int]
