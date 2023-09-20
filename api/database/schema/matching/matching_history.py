from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    String,
    Date,
    TIMESTAMP,
    text,
)
from sqlalchemy.dialects.mysql import TINYINT

from sqlalchemy.orm import relationship

from api.database.conn import Base
from api.database.schema.mixin import BaseMixin
from api.database.schema.user.user import User

class MatchingHistory(Base, BaseMixin):
    __tablename__ = 'matching_history'

    female_id = Column(Integer, ForeignKey(User.id, name='fk-users-matching_history_female'), primary_key=True, autoincrement=True)
    male_id = Column(Integer, ForeignKey(User.id, name='fk-users-matching_history_male'), primary_key=True, autoincrement=True)

    phase = Column(Integer, )

    manner_f2m = Column(Integer)
    reason_f2m = Column(Integer)
    detail_f2m = Column(Integer)

    manner_m2f = Column(Integer)
    reason_m2f = Column(Integer)
    detail_m2f = Column(Integer)

    date_agreement = Column(TIMESTAMP)

    female_user = relationship('User', foreign_keys=[female_id])
    male_user = relationship('User', foreign_keys=[male_id])

    # status = Column(Integer)