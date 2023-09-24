from datetime import date, datetime
from pydantic import BaseModel, Field, validator
from pydantic.schema import Optional

from api.database.schema.user.user import User


class UserSchema(BaseModel):
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
    information_before_meeting: Optional[int] = None

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

'''
회원가입 버튼 클릭 시 서버에 전달되는 사용자 계정 정보
와이어프레임: 회원가입 
'''
class UserCreate(BaseModel):
    name: str = Field(max_length=34, regex=r'^[\uac00-\ud7a3]+$', description="한글만 입력 가능")
    mobile_number: str = Field(max_length=11, regex=r'^010\d{8}$', description="010으로 시작하는 숫자 11자리")
    gender: int = Field(ge=0, le=1, description="0: female, 1: male")
    nickname: str = Field(max_length=20, regex=r'^\S+$', description="공백 없어야함")
    date_birth: date = Field(description="YYYY-MM-DD 형태로 요청될 것으로 기대됨")
    # residence? kakao_id?

    @validator('nickname')
    def is_unique_nickname(cls, value):
        # print(f'요청받은 닉네임: ${value}')
        # check = User.filter(nickname=value)
        if User.filter(nickname=value).first():
            raise ValueError('nickname already exists')
        return value

    @validator('mobile_number')
    def is_unique_mobile_number(cls, value):
        if User.filter(mobile_number=value).first():
            raise ValueError('mobile_number already exists')
        return value

    class Config:
        schema_extra = {
            "name": "사용자",
            "mobile_number": "01012345678",
            "gender": 0,
            "nickname": "온리유",
            "date_birth": "2023-08-21"
        }