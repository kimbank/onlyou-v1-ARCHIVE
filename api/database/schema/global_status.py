from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    TIMESTAMP,
    text,
)
from sqlalchemy.dialects.mysql import TINYINT

from sqlalchemy.orm import relationship

from api.database.conn import Base
from api.database.schema.mixin import BaseMixin

class GlobalStatus(Base, BaseMixin):
    __tablename__ = 'global_status'

    id = Column(Integer, primary_key=True, autoincrement=True)

    phase = Column(Integer, )
    status = Column(Integer)

    created_at = Column(TIMESTAMP)