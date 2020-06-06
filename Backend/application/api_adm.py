from flask import Blueprint, request, Response, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt_claims
from .models import me, bcrypt, User, getNextId
from . import api, jwt, me
from .auth import LoginApi
import json

adm_bp = Blueprint("adm_bp", __name__)

def get_args(args):
    # Para poner los datos de creación del usuario en formato de mapeo (Diccionario)
    res = {}
    pre = ["username","internal_id","external_id","email","address","telefono","nombre"]
    for arg in args:
        if arg in pre:
            res[arg+"__contains"] = args[arg]
        else:
            res[arg] = args[arg]
    return res

def get_data(args):
    # Para obtener los attributos que deseo cambiar en formato de mongoengine
    d = {}
    for arg in args:
        if not hasattr(User, arg):
            raise KeyError("Invalid Attribute for user:",arg)
        d["set__"+arg] = args[arg]
    return d


class UsersApi(Resource):
    @jwt_required
    def get(self):
        if get_jwt_claims().get("role") != "administrador":
            return make_response(jsonify({"Error":"No autorizado"}), 401)
        req = get_args(request.args)
        try:
            res = User.objects(**req)
        except User.DoesNotExist:
            return make_response(jsonify({"Error": "Not found", "message":"The user does not exist"}), 404)
        return make_response(jsonify(res), 200)

    @jwt_required
    def post(self):
        if get_jwt_claims().get("role") != "administrador":
            return make_response(jsonify({"Error":"No autorizado"}), 401)
        data = json.loads(request.data.decode())
        user = User(
            internal_id = getNextId("users_id"),
            external_id = data["external_id"],
            username = data["username"],
            password = bcrypt.generate_password_hash(data["password"]),
            telefono = data["telefono"],
            nombre = data["nombre"],
            email = data["email"],
            address = data["address"],
            type = data["type"]
        )
        res = user.save()
        return make_response(jsonify({"ID": res.internal_id, "Username": res.username}), 200)

    @jwt_required
    def put(self):
        if get_jwt_claims().get("role") != "administrador":
            return make_response(jsonify({"Error":"No autorizado"}), 401)
        req = request.args
        args = json.loads(request.data.decode())
        try:
            user = User.objects(**req).first()
        except User.DoesNotExist:
            make_response(jsonify({"Error": "Not found", "message":"The user does not exist"}), 404)
        try:
            data = get_data(args)
        except KeyError as e:
            return make_response(jsonify({"Error": "Bad Request", "message": "User has no attribute"+repr(e)}), 400)
        user.update(**data)
        return make_response(jsonify({"OK":"User was updated successfully!"}), 200)
