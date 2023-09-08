from datetime import date, datetime

from pydantic import BaseModel
from pydantic.schema import Optional


class User(BaseModel):
    id: Optional[int]
    name: str
    mobile_number: str
    gender: int
    nickname: str
    date_birth: Optional[date]
    residence: Optional[int]
    kakao_id: Optional[str] = None
    date_join: Optional[datetime]
    date_accept_terms: Optional[datetime] = None
    date_accept_marketing: Optional[datetime] = None
    date_dormant: Optional[datetime] = None
    date_suspension: Optional[datetime] = None

    class Config:
        orm_mode = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "홍길동",
                "mobile_number": "01012345678",
                "gender": 0,
                "nickname": "사용자1",
                "date_birth": "1990-01-01",
                "residence": 0,
                "kakao_id": "kakao1",
                "date_join": "2023-09-01 00:00:00",
                "date_accept_terms": "2023-09-01 00:00:00",
                "date_accept_marketing": "2023-09-01 00:00:00",
                "date_dormant": "2023-09-01 00:00:00",
                "date_suspension": "2023-09-01 00:00:00",
            }
        }
