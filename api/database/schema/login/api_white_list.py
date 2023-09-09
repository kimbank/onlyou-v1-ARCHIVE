from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    func,
)

from api.database.conn import Base
from api.database.schema.mixin import BaseMixin

class ApiWhiteLists(Base, BaseMixin):
    __tablename__ = "api_whitelists"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False, default=func.utc_timestamp())
    updated_at = Column(DateTime, nullable=False, default=func.utc_timestamp(), onupdate=func.utc_timestamp())

    ip_addr = Column(String(length=64), nullable=False)
    # api_key_id = Column(Integer, ForeignKey("api_keys.id"), nullable=False)