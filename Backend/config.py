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
    JWT_SECRET_KEY = "JWT_SECRET_KEY_FOR_DEVELOPMENT"
    GOOGLE_API_KEY= "AIzaSyA-mQc9Jg47dLHCXBnpvmkxhbE6PaGvipY"
    MONGODB_HOST = "mongodb://Francho:JiI2csBCePW1PnLz@piquefu-shard-00-00-viw6q.mongodb.net:27017,piquefu-shard-00-01-viw6q.mongodb.net:27017,piquefu-shard-00-02-viw6q.mongodb.net:27017/test?ssl=true&replicaSet=PiQueFu-shard-0&authSource=admin&w=majority"
