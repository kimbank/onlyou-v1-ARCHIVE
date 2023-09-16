from sqlalchemy import (
    Column,
    String,
)
from sqlalchemy.dialects.mysql import MEDIUMINT, TINYINT
from api.database.conn import Base
from api.database.schema.mixin import BaseMixin


class JobType(Base, BaseMixin):
    __tablename__ = 'job_type'

    id = Column(TINYINT, primary_key=True, default = 0)
    type = Column(String(45, collation='utf8mb4_unicode_ci'), nullable=False)
