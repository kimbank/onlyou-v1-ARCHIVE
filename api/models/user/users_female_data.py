from pydantic import BaseModel, Field, validator
from typing import Optional

from api.database.schema.user.users_female_data import UsersFemaleData


class UserFemaleDataSchema(BaseModel):
    female_id: int
    gender: Optional[int] = Field(description="0: female, 1: male")
    job_type: Optional[int]
    job_name: Optional[str]
    job_group: Optional[str]
    height: Optional[int]
    education: Optional[int] = Field(description="0 ~ 4")
    university_name: Optional[str]
    divorce: Optional[int] = Field(description="0 ~ 1")

    class Config:
        orm_mode = True
        json_schema_extra = {
            "example": {
                "female_id": 0,
                "gender": 1,
                "job_type": "스타트업",
                "job_name": "개발자",
                "job_group": "IT",
                "height": 160,
                "education": 2,
                "university_name": "○○대학교",
                "divorce": 0
            }
        }


class UserFemaleDataCreate(BaseModel):
    job_type: str = Field(max_length=45)
    job_name: str = Field(max_length=45)
    job_group: str = Field(max_length=45)
    height: Optional[int]
    education: Optional[int] = Field(description="0 ~ 4")
    university_name: Optional[str] = Field(max_length=45)
    divorce: Optional[int] = Field(description="0:초혼, 1:돌싱")

    class Config:
        json_schema_extra = {
            "example": {
                "job_type": "스타트업",
                "job_name": "개발자",
                "job_group": "IT",
                "height": 160,
                "education": 2,
                "university_name": "○○대학교",
                "divorce": 0
            }
        }
