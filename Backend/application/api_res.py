from flask import Blueprint, request, Response, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt_claims
from dateutil.parser import parse
from dateutil.relativedelta import relativedelta as rd, MO
from .models import me, bcrypt, User, Factura, Producto, getNextId
from . import api, jwt
from .auth import LoginApi
import json

api_bp = Blueprint("api_bp", __name__)

class NotAuthorized(Exception):
    pass

def get_args(args):
    # Función para dar formato de MongoEngine a la consulta de facturas
    d = {}
    attr = ["productos__tp", "productos__brand", "productos__name",
        "productos__price__gte", "productos__price__lte", "total__gte",
        "total__lte", "total"]
    try:
        for arg in args:
            # if not hasattr(Factura, arg):
            #     raise KeyError("Can't find attribute: "+arg)
            if arg == "vendedor" and args[arg] != "":
                d[arg] = User.objects.get(username = args[arg])
            elif arg == "cliente" and args[arg] != "":
                d[arg+"__name"] = args[arg]
            elif arg == "lugar" and arg != "":
                fs = args.getlist(arg)
                if fs[0] != "" and fs[1] != "":
                    d["lugar__near"] = args.getlist(arg)
            elif arg == "fecha":
                l = args.getlist(arg)
                date_st = parse(l[0])
                try:
                    param = l[1]
                except:
                    param = "days"
                p = {param:1}
                if param == "months":
                    date_st = date_st + rd(day=1)
                if param == "years":
                    date_st = date_st + rd(day=1)
                    date_st = date_st + rd(month=1)
                if param == "weeks":
                    date_st = date_st + rd(weekday=MO(-1))
                date_en = date_st + rd(**p)
                d["fecha__gte"] = date_st
                d["fecha__lt"] = date_en
            elif arg in attr and args[arg] != "":
                d[arg] = args[arg]
            else:
                raise KeyError("Can't find attribute: " + arg)
    except TypeError as e:
        print("Error", repr(e))
    print(d)
    return d

def get_products(prods):
    # Crea los objetos de clase producto para ponerlos en la lista de la factura
    print(prods)
    products = []
    total = 0
    for prod in prods:
        product = Producto(ID = prod["ID"],
                            tp = prod["type"],
                            name = prod["name"],
                            price = float(prod["price"]),
                            brand = prod["brand"],
                            amount = int(prod["amount"])
                            )
        products.append(product)
        total += float(prod["price"])*int(prod["amount"])
    print(products)
    return [products, total]

class FacturApi(Resource):
    @jwt_required
    def get(self):
        print(get_jwt_claims().get("role"))
        data = request.args
        try:
            if "recents" in data:
                f = Factura.recents()
            else:
                args = get_args(data)
                rol = get_jwt_claims().get("role")
                if rol == "vendedor":
                    if data.get("vendedor"):
                        if data["vendedor"] != get_jwt_identity():
                            raise NotAuthorized
                    else:
                        args["vendedor"] = User.objects.get(username = get_jwt_identity())
                f = Factura.objects(**args)
        except KeyError as e:
            return make_response(jsonify({"Error":"Probably InvalidQueryError", "message": repr(e)}), 400)
        except User.DoesNotExist as e:
            return make_response(jsonify({"Error":"Not Found", "message": "El usuario no existe"}), 404)
        except NotAuthorized:
            return make_response(jsonify({"Error": "No autorizado", "message": "No tiene paermiso para ver esas facturas"}), 401)
        return make_response(jsonify(f), 200)

    @jwt_required
    def post(self):
        if get_jwt_claims().get("role") != "vendedor":
            return make_response(jsonify({"Error":"Este tipo de usuario no puede crear facturas"}), 401)
        data = json.loads(request.data.decode())
        p = get_products(data["productos"])
        fac = Factura(
            id = getNextId("facturas_id"),
            vendedor = User.objects.get(username = get_jwt_identity()),
            cliente = data["cliente"],
            productos = p[0],
            total = p[1],
            lugar = {
                "type": "Point",
                "coordinates": data["lugar"]
            },
            fecha = parse(data["fecha"])
        )
        id = fac.save()
        return make_response(jsonify({"id" : str(id.id), "vendedor":id.vendedor.username}), 200)

def initialize_routes():
    api.add_resource(FacturApi, '/factura')
    print("Cargando rutas /facturas")

# @user_bp.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   return response
#
# @user_bp.route('/')
# def home():
#     if current_user.is_authenticated:
#         if current_user.type == "vendedor":
#             return """Inicio de vendedores <a href="/logout">Logout</a>
#             <a href="/crear/factura">Crear Factura</a>"""
#         elif current_user.type == "supervisor":
#             a = """Inicio de supervisores <a href="/logout">Logout</a>
#             <a href="/crear/factura">Crear Factura</a>
#             <a href="/obtener/facturas">Buscar Facturas</a>
#             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1
#             d63612.75419887017!2d-75.74886706339565!3d4.804859183371875!2m3!1f
#             0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388748eb56c1fd%3A0
#             x95b39410f9f1dfbc!2sPereira%2C%20Risaralda!5e0!3m2!1ses-419!2sco!4
#             v1585107726160!5m2!1ses-419!2sco" width="600" height="450"
#             frameborder="0" style="border:0;" allowfullscreen=""
#             aria-hidden="false" tabindex="0"></iframe>"""
#             return make_response(a, 200)
#         else:
#             return make_response(render_template('login.html'), 400)
#     else:
#         return make_response(render_template('login.html'), 400)
#
# @user_bp.route('/login', methods=['POST'])
# def login():
#     elif request.method == "POST": # Verifica si el método de acceso es POST
#         password = request.form['password']
#         username = request.form['username']
#         try:
#             user = User.objects(username = username).first() # Solicita a la base de datos vendedor con el nombre dado
#             if user:
#                 if user.check_password(password): # En caso de encontrar dicho vendedor, verifica si la contraseña es correcta
#                     login_user(user, remember = True)
#                     next = request.args.get('next')
#                     return
#                 else:
#                     return
#             else:
#                 return "Usuario invalido"
#         except Exception as e:
#             print("Error al hacer la consulta", repr(e))
#             return "Error"
#
# @user_bp.route("/obtener/facturas", methods=["GET", "POST"])
# @login_required
# def ver_facturas():
#     if request.method == "GET":
#         return render_template("buscar.html")
#     elif request.method == "POST":
#         try:
#             args = get_args(request.form)
#             f = Factura.objects(**args)
#         except KeyError as e:
#             return make_response(jsonify({"Error":"Probably InvalidQueryError", "message": repr(e)}), 400)
#         return make_response(jsonify(f), 200)
#
# @user_bp.route("/crear/factura", methods=["GET", "POST"])
# @login_required
# def facturar():
#     if request.method =="GET":
#         return render_template("facturar.html")
#     elif request.method == "POST":
#         form  = request.form
#         fac = Factura(
#             id = form["id"],
#             vendedor = User.objects.get(username = form["username"]),
#             cliente = {"name" : form["client"], "aporte": "mucho"},
#             productos = ["telefono", "computador", "bolsa de leche"],
#             lugar = {
#                 "type": "Point",
#                 "coordinates": [
#                   -75.69554328918457,
#                   4.81354909567146
#             ]
#           }
#         )
#         fac.save()
#     print(form)
#     return "Guardado con exito"
#
# @user_bp.route("/logout")
# @login_required
# def logout():
#     logout_user()
#     return redirect(url_for("user_bp.home"))
#
# @login_manager.user_loader
# def load_user(user_id):
#     return User.objects(username = user_id).first()
