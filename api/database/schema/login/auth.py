from sqlalchemy import (
    Column,
    Integer,
    String,
    TIMESTAMP,
    ForeignKey,
    func,
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TINYINT
from api.database.conn import Base
from api.database.schema.schema import BaseMixin

class AuthSens(Base, BaseMixin):
    __tablename__ = "auth_sens"

    id = Column(Integer, primary_key=True, autoincrement=True)
    mobile_number = Column(String(length=11), ForeignKey("users.mobile_number"), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=func.now())
    count = Column(TINYINT, nullable=False, default=0)
    code = Column(String(length=6), nullable=False)

    users = relationship("User")