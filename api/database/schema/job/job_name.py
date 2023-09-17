from sqlalchemy import (
    Column,
    Integer,
    String,
)
from sqlalchemy.dialects.mysql import MEDIUMINT
from api.database.conn import Base
from api.database.schema.mixin import BaseMixin


class JobName(Base, BaseMixin):
    __tablename__ = 'job_name'

    id = Column(MEDIUMINT, primary_key=True, autoincrement=True)
    job_type_id = Column(Integer)
    name = Column(String(45, collation='utf8mb4_unicode_ci'), nullable=False)
