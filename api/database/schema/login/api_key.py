from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    func,
)

from api.database.conn import Base
from api.database.schema.schema import BaseMixin

class ApiKeys(Base, BaseMixin):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False, default=func.utc_timestamp())
    updated_at = Column(DateTime, nullable=False, default=func.utc_timestamp(), onupdate=func.utc_timestamp())

    access_key = Column(String(length=64), nullable=False, index=True)
    secret_key = Column(String(length=64), nullable=False)
    user_memo = Column(String(length=40), nullable=True)
    # status = Column(Enum("active", "stopped", "deleted"), default="active")
    # is_whitelisted = Column(Boolean, default=False)
    # user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    # whitelist = relationship("ApiWhiteLists", backref="api_keys")
    # users = relationship("User", back_populates="keys")