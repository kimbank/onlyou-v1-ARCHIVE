from fastapi import APIRouter, Depends, Body
from starlette.requests import Request
from api.utils.token_validator import token_control
from starlette.responses import JSONResponse

from datetime import datetime

from api.database.schema.user.user import User
from api.models.user.user import UserSchema
from api.database.schema.mixin import BaseMixin

from sqlalchemy import func
from sqlalchemy.orm import Session, aliased
from api.database.conn import db
from api.database.schema.user.user import User
from api.database.schema.user.users_female_data import UsersFemaleData
from api.database.schema.user.users_male_data import UsersMaleData
from api.database.schema.user.users_female_data_extra import UsersFemaleDataExtra
from api.database.schema.user.users_male_data_extra import UsersMaleDataExtra
from api.database.schema.user.users_female_data_target import UsersFemaleDataTarget
from api.database.schema.user.users_male_data_target import UsersMaleDataTarget
from api.database.schema.matching.matching_score_f2m import ScoreFToM
from api.database.schema.matching.matching_score_m2f import ScoreMToF
from api.models.user.data.data_extra import UpdateValueSchema, UpdateLifeStyleSchema, UpdatePersonalitySchema, \
    UpdateDatingStyleSchema, UpdateAppearanceSchema, UpdateOtherSchema
from api.models.user.data.data_target import UpdateTargetSchema
from api.models.matching.matching_score_f2m import ScoreFToMSchema
from api.models.matching.matching_score_m2f import ScoreMToFSchema
from api.utils.score import get_scores

router = APIRouter(prefix="/application")


async def get_user(request: Request):
    user_info = await token_control(request)
    user = User.filter(id=user_info.id)
    return user


# 사용자의 extra 데이터 반환
async def get_extra_schema(request: Request):
    user_info = await token_control(request)
    ut = None
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))
    if user_info.gender == 0:
        ut = UsersFemaleDataExtra.filter(female_id=user_info.id)
    else:
        ut = UsersMaleDataExtra.filter(male_id=user_info.id)
    return ut


async def get_target_schema(request: Request):
    user_info = await token_control(request)
    ut = None
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))
    if user_info.gender == 0:
        ut = UsersFemaleDataTarget.filter(female_id=user_info.id)
    else:
        ut = UsersMaleDataTarget.filter(male_id=user_info.id)
    return ut


@router.patch("/target/all")
async def patch_target_all(request: Request, values: UpdateTargetSchema = Body(...)):
    try:
        ut = await get_target_schema(request)
        ut.update(auto_commit=True, **values.dict())
        return JSONResponse(status_code=200, content=dict(msg='성공'))
    except Exception as e:
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))


@router.get("/my/values")
async def get_values(request: Request):
    try:
        ut = await get_extra_schema(request)
        ut = ut.first()
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))

    # print(ut.cls_attr('fill_status'))
    return UpdateValueSchema(**ut.__dict__)


# 가치관 정보 페이지에서 '다음으로' 버튼 클릭 시
@router.patch("/my/values")
async def update_values(request: Request, values: UpdateValueSchema = Body(...)):
    try:
        ut = await get_extra_schema(request)
        # values.modified_at = datetime.now()
        ut.update(auto_commit=True, **values.dict())
        return JSONResponse(status_code=200, content=dict(msg='가치관 정보 업데이트 완료'))
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='가치관 정보 업데이트 실패'))


@router.get("/my/lifestyle")
async def get_lifestyle(request: Request):
    try:
        ut = await get_extra_schema(request)
        ut = ut.first()
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))

    return UpdateLifeStyleSchema(**ut.__dict__)


# 생활 정보 페이지
@router.patch("/my/lifestyle")
async def update_lifestyle(request: Request, lifestyles: UpdateLifeStyleSchema = Body(...)):
    try:
        ut = await get_extra_schema(request)
        # lifestyles.modified_at = datetime.now()
        ut.update(auto_commit=True, **lifestyles.dict())
        return JSONResponse(status_code=200, content=dict(msg='생활 정보 업데이트 완료'))
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='생활 정보 업데이트 실패'))


@router.get("/my/personality")
async def get_personality(request: Request):
    try:
        ut = await get_extra_schema(request)
        ut = ut.first()
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))

    return UpdatePersonalitySchema(**ut.__dict__)


# 성격 정보 페이지
@router.patch("/my/personality")
async def update_personality(request: Request, personalities: UpdatePersonalitySchema = Body(...)):
    try:
        ut = await get_extra_schema(request)
        # personalities.modified_at = datetime.now()
        ut.update(auto_commit=True, **personalities.dict())
        return JSONResponse(status_code=200, content=dict(msg='성격 정보 업데이트 완료'))
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='성격 정보 업데이트 실패'))


@router.get("/my/dating_style")
async def get_dating_style(request: Request):
    try:
        ut = await get_extra_schema(request)
        ut = ut.first()
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))

    return UpdateDatingStyleSchema(**ut.__dict__)


# 연애 스타일 페이지
@router.patch("/my/dating_style")
async def update_dating_style(request: Request, dating_styles: UpdateDatingStyleSchema = Body(...)):
    try:
        ut = await get_extra_schema(request)
        # dating_styles.modified_at = datetime.now()
        ut.update(auto_commit=True, **dating_styles.dict())
        return JSONResponse(status_code=200, content=dict(msg='연애 스타일 정보 업데이트 완료'))
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='연애 스타일 정보 업데이트 실패'))


@router.get("/my/appearance")
async def get_appearance(request: Request):
    try:
        ut = await get_extra_schema(request)
        ut = ut.first()
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))

    return UpdateAppearanceSchema(**ut.__dict__)


# 외모 정보 페이지
@router.patch("/my/appearance")
async def update_appearance(request: Request, appearances: UpdateAppearanceSchema = Body(...)):
    try:
        ut = await get_extra_schema(request)
        # appearances.modified_at = datetime.now()
        ut.update(auto_commit=True, **appearances.dict())
        return JSONResponse(status_code=200, content=dict(msg='외모 정보 업데이트 완료'))
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='외모 정보 업데이트 실패'))


@router.get("/my/other")
async def get_other(request: Request):
    try:
        ut = await get_user(request)
        ut = ut.first()
    except:
        return JSONResponse(status_code=500, content=dict(msg='실패'))

    return UpdateOtherSchema(**ut.__dict__)


@router.patch("/my/other")
async def update_other(request: Request, other: UpdateOtherSchema = Body(...)):
    try:
        uu = await get_user(request)
        uu.update(auto_commit=True, kakao_id=other.kakao_id, information_before_meeting=other.information_before_meeting)
        return JSONResponse(status_code=200, content=dict(msg='기타 정보 업데이트 완료'))
    except:
        uu.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))


# 이상형 정보 입력 완료 버튼 클릭 시 점수 계산
# user_data_target: 나의 이상형 정보, target_users: 전체 이성 정보
@router.patch("/my/calculate")
async def calculate_matching_score(request: Request, session: Session = Depends(db.session)):
    user_info = await token_control(request)
    if not user_info:
        return JSONResponse(status_code=401, content=dict(msg='권한이 없습니다.'))

    user = User.get(id=user_info.id)
    # 조인
    if user.gender == 0:
        # 이성 정보 스키마 별칭 -> 이름이 같은 컬럼 구분
        u = aliased(User)
        ud = aliased(UsersMaleData)
        ue = aliased(UsersMaleDataExtra)

        user_data_target = UsersFemaleDataTarget.get(female_id=user_info.id)
        join_cond1 = u.id == ud.male_id
        join_cond2 = u.id == ue.male_id
        try:
            # TODO: 같은 회사 필터링 해야함
            target_users = (session.query(u, ud, ue).filter(u.gender == 1)
                            .outerjoin(ud, join_cond1)
                            .outerjoin(ue, join_cond2)).all()
        except Exception as e:
            print(e)
            return JSONResponse(status_code=500, content=dict(msg='이성 정보 획득 실패'))
    else:
        u = aliased(User)
        ud = aliased(UsersFemaleData)
        ue = aliased(UsersFemaleDataExtra)

        user_data_target = UsersMaleDataTarget.get(male_id=user_info.id)
        join_cond1 = u.id == ud.female_id
        join_cond2 = u.id == ue.female_id
        try:
            target_users = (session.query(u, ud, ue).filter(u.gender == 0)
                            .outerjoin(ud, join_cond1)
                            .outerjoin(ue, join_cond2)).all()
        except Exception as e:
            print(e)
            return JSONResponse(status_code=500, content=dict(msg='이성 정보 획득 실패'))

    # 점수 계산 및 DB 저장
    if user.gender == 0:
        for score in get_scores(user.gender, user_data_target.__dict__, target_users):
            score = score.dict()
            record = ScoreFToM.filter(female_id=score['female_id'], male_id=score['male_id'])
            # (f_id, m_id) 존재시 update, 없으면 insert
            try:
                if record.first():
                    record.update(auto_commit=True, **score)
                else:
                    session.add(ScoreFToM(**score))
                    session.commit()
                    # ScoreFToM.create(session, auto_commit=True, **score)
            except Exception as e:
                print(e)
                return JSONResponse(status_code=500, content=dict(msg='점수 반영 실패'))
    else:
        for score in get_scores(user.gender, user_data_target.__dict__, target_users):
            score = score.dict()
            record = ScoreMToF.filter(female_id=score['female_id'], male_id=score['male_id'])
            try:
                if record.first():
                    record.update(auto_commit=True, **score)
                else:
                    session.add(ScoreMToF(**score))
                    session.commit()
            except Exception as e:
                print(e)
                return JSONResponse(status_code=500, content=dict(msg='점수 반영 실패'))
    return JSONResponse(status_code=200, content=dict(msg='점수 계산 완료'))
    # except Exception as e:
    #     print(e)
    #     return JSONResponse(status_code=500, content=dict(msg='점수 계산 실패'))


@router.get("/target/height")
async def get_target_height(request: Request):
    try:
        ut = await get_target_schema(request)
        ut = ut.first()
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))

    return JSONResponse(status_code=200, content=dict(height_s=ut.height_s, height_e=ut.height_e, height_w=ut.height_w))


@router.get("/target/education")
async def get_target_education(request: Request):
    try:
        ut = await get_target_schema(request)
        ut = ut.first()
    except Exception as e:
        print(e)
        ut.close()
        return JSONResponse(status_code=500, content=dict(msg='실패'))

    return JSONResponse(status_code=200, content=dict(education=ut.education, education_w=ut.education_w))


@router.post("/admin/calculate-all")
async def calculate_all_scores(request: Request, session: Session = Depends(db.session)):
    pass
