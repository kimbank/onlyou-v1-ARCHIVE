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

class MatchigPublic(Base, BaseMixin):
    __tablename__ = 'matching_public'

    female_id = Column(Integer, primary_key=True, autoincrement=True)
    male_id = Column(Integer, primary_key=True, autoincrement=True)

    phase = Column(Integer, )

    f_choice = Column(Integer)
    m_choice = Column(Integer)

    status = Column(Integer)