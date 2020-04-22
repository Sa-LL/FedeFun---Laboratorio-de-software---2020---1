from flask import Flask, Blueprint
from flask_bcrypt import Bcrypt
from flask_mongoengine import MongoEngine
from flask_login import LoginManager
from flask_restful import Api
from flask_jwt_extended import JWTManager

bcrypt = Bcrypt()
me = MongoEngine()
login_manager = LoginManager()
api = Api()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, instance_relative_config = False)
    app.config.from_object('config.DevConfig')

    bcrypt.init_app(app)
    me.init_app(app)
    login_manager.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        # from .admin import admin_routes
        # from .users import user_routes
        from . import api_res, auth, routes, api_adm
        routes.initialize_routes()
        app.register_blueprint(api_res.api_bp)
        app.register_blueprint(auth.auth_bp)
        app.register_blueprint(api_adm.adm_bp)
        api._init_app(app)
        # print(api.app)
        # app.register_blueprint(admin_routes.admin_bp)
        # app.register_blueprint(user_routes.user_bp)

        return app
