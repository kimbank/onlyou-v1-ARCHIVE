from fastapi import APIRouter, Depends, Body, HTTPException

from sqlalchemy.orm import Session

from api.database.conn import db
from api.database.schema.user.user import User
from api.database.schema.user.users_female_data import UsersFemaleData
from api.models.user.users_female_data import UserFemaleDataCreate

from starlette.responses import JSONResponse

router = APIRouter(prefix="/promotion")


# 유저가 심사 정보 제출시 DB에 저장
@router.post("/create_promotion/{user_id}")
async def submit_promotion(user_id: int, promotion_data: UserFemaleDataCreate = Body(...),
                           session: Session = Depends(db.session)):
    # 유저가 존재하지 않을 경우
    if not User.filter(id=user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    # 이미 등록된 상태
    if UsersFemaleData.filter(female_id=user_id).first():
        raise HTTPException(status_code=409, detail="User promotion data already exists")
    try:
        # UsersFemaleData.create -> female_id가 ORM default 값으로 설정되어버려 정확한 유저 심사 정보로 저장되지 않음
        session.add(UsersFemaleData(female_id=user_id, gender=0,
                                    job_type=promotion_data.job_type,
                                    job_name=promotion_data.job_name,
                                    job_group=promotion_data.job_group,
                                    height=promotion_data.height,
                                    education=promotion_data.education,
                                    university_name=promotion_data.university_name,
                                    divorce=promotion_data.divorce))
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return JSONResponse(status_code=200, content=dict(msg="user promotion data created"))
