from dataclasses import dataclass
from os import path, environ
from dotenv import load_dotenv
from typing import List

base_dir = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))
load_dotenv(path.join(base_dir, ".env"))

@dataclass
class Config:
    """
    기본 Configuration
    """
    BASE_DIR: str = base_dir
    DB_POOL_RECYCLE: int = 900
    DB_ECHO: bool = True
    DEBUG: bool = False
    TEST_MODE: bool = False
    DB_URL: str = environ.get("MYSQL_URL")

    SMS: bool = True if environ.get("SMS") is "true" else False


@dataclass
class LocalConfig(Config):
    TRUSTED_HOSTS = ["*"]
    ALLOW_SITE = ["*"]
    DEBUG: bool = True


@dataclass
class ProdConfig(Config):
    DB_ECHO = False

    TRUSTED_HOSTS = ["*"]
    ALLOW_SITE = ["https://only-you.co.kr"]


@dataclass
class TestConfig(Config):
    DB_URL: str = "mysql+pymysql://travis@localhost/notification_test?charset=utf8mb4"
    TRUSTED_HOSTS = ["*"]
    ALLOW_SITE = ["*"]
    TEST_MODE: bool = True


def conf():
    """
    환경 불러오기
    :return:
    """
    config = dict(prod=ProdConfig, local=LocalConfig, test=TestConfig)
    # print('config =',environ.get("API_ENV", "local"))
    return config[environ.get("API_ENV", "local")]()


