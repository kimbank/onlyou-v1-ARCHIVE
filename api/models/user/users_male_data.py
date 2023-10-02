from pydantic import BaseModel, Field
from typing import Optional


class UserMaleDataSchema(BaseModel):
    male_id: int
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
                "male_id": 1,
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
