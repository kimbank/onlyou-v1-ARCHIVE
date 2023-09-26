from sqlalchemy import (
    Column,
    Integer,
    String,
    TEXT,
)

from api.database.conn import Base
from api.database.schema.mixin import BaseMixin


class UserPhoto(Base, BaseMixin):
    __tablename__ = 'users_photo'

    id = Column(Integer, primary_key=True)
    number = Column(Integer, primary_key=True, nullable=False)
    url = Column(TEXT, nullable=False)