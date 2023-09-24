from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    func,
)
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import relationship

from api.database.conn import Base
from api.database.schema.mixin import BaseMixin
from api.database.schema.user.user import User

class UsersMaleData(Base, BaseMixin):
    __tablename__ = 'users_male_data'

    male_id = Column(Integer, ForeignKey(
        User.id, name='fk-users-users_male_data'), primary_key=True, default=func.max(User.id))
    fill_status = Column(Integer, nullable=False, default=0)
    # gender = Column(TINYINT, nullable=False, comment='[미공개 정보] 0 = 여성, 1 = 남성')
    job_type = Column(TINYINT)
    job_name = Column(String(45, collation='utf8mb4_unicode_ci'),
                      nullable=False, comment='[선제 반영 미공개 정보] 직장 이름')
    job_group = Column(String(45, collation='utf8mb4_unicode_ci'),
                       nullable=False, comment='[공개 정보] 직업/직무')
    height = Column(TINYINT, nullable=False, comment='[선택 공개 정보] 키 (cm)')
    education = Column(TINYINT, nullable=False, comment='[선택 공개 정보] 학력 0 ~ 4')
    university_name = Column(String(
        45, collation='utf8mb4_unicode_ci'), nullable=False, comment='[미공개 정보] 대학 이름')
    divorce = Column(TINYINT, nullable=False,
                     comment='[미공개 정보] 이혼 여부 (0 = 초혼, 1 = 돌싱)')

    user = relationship("User", uselist=False)