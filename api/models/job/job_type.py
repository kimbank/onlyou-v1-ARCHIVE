from pydantic import BaseModel, Field, validator
from typing import Optional


class JobType(BaseModel):
    id: int
    type: Optional[str] = Field(max_length=45)
