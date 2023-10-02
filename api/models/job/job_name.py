from pydantic import BaseModel, Field, validator
from typing import Optional


class JobNameSchema(BaseModel):
    id: int
    job_type_id: int
    name: Optional[str] = Field(max_length=45)
