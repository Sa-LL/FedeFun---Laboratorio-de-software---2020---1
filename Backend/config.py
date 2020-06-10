import os

class Config:
    """Base config vars."""
    SECRET_KEY = os.environ.get('SECRET_KEY')


class ProdConfig(Config):
    DEBUG = False
    TESTING = False
    DATABASE_URI = os.environ.get('PROD_DATABASE_URI')


class DevConfig(Config):
    SECRET_KEY = os.urandom(15)
    DEBUG = True
    TESTING = True
    JWT_SECRET_KEY = os.environ.get("JWT_KEY")
    MONGODB_HOST = os.environ.get("MONGODB_H")
