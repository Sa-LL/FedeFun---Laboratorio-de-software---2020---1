from flask import Blueprint, request, jsonify, make_response
from flask import current_app as app
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from .models import User
from . import api, jwt
from datetime import timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt_claims
import json

auth_bp = Blueprint("auth_bp", __name__)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    return response

class LoginApi(Resource):
    def post(self):
        body = json.loads(request.data.decode())
        try:
            user = User.objects.get(username=body.get('username'))
        except User.DoesNotExist:
            return make_response(jsonify({"Error":"El usuario no existe"}), 404)
        authorized = user.check_password(body.get('password'))
        if not authorized:
            return make_response(jsonify({"error":"Wrong password"}), 401)
        if user.type != body.get("rol"):
            return make_response(jsonify({"Error":"Wrong type of user"}), 400)
        if hasattr(user,"enabled"):
            if not user.enabled:
                return make_response(jsonify({"Error":"User disabled"}), 400)
        expires = timedelta(days=7)
        access_token = create_access_token(identity=str(user.username), expires_delta=expires)
        return make_response(jsonify({'token': access_token}), 200)

@jwt.user_identity_loader
def load_user(user_id):
    return User.objects(username = user_id).first().username

@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {'role': User.objects(username = user).first().type}

def initialize_routes():
    api.add_resource(LoginApi, '/login')
    print("Cargando rutas /login")
