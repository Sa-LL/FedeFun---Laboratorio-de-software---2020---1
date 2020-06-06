from flask import Blueprint, render_template, session, request, make_response, redirect, url_for, jsonify
from flask_login import login_required, logout_user, login_user, current_user
from flask import current_app as app
from ..models import me, bcrypt, User, Factura
from .. import login_manager
import json

# Set up a Blueprint
user_bp = Blueprint('user_bp', __name__,
                     template_folder='../../templates',
                     static_folder='static')

def get_args(args):
    d = {}
    for arg in args:
        if not hasattr(Factura, arg):
            raise KeyError("Can't find attribute: "+arg)
        if arg == "vendedor":
            d[arg] = User.objects.get(username = args[arg])
        elif arg == "cliente":
            d[arg+"__name"] = args[arg]
        elif arg == "productos" and args[arg] != "":
            d[arg+"__contains"] = args.getlist(arg)
        elif arg == "fecha":
            fs = args.getlist(arg)
            if fs[0] != "" and fs[1] != "":
                d[arg+"__gte"] = fs[0]
                d[arg+"__lte"] = fs[1]
        elif arg == "lugar":
            fs = args.getlist(arg)
            if fs[0] != "" and fs[1] != "":
                d[arg+"__near"] = args.getlist(arg)
    return d

@user_bp.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response

@user_bp.route('/')
def home():
    if current_user.is_authenticated:
        if current_user.type == "vendedor":
            return """Inicio de vendedores <a href="/logout">Logout</a>
            <a href="/crear/factura">Crear Factura</a>"""
        elif current_user.type == "supervisor":
            a = """Inicio de supervisores <a href="/logout">Logout</a>
            <a href="/crear/factura">Crear Factura</a>
            <a href="/obtener/facturas">Buscar Facturas</a>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1
            d63612.75419887017!2d-75.74886706339565!3d4.804859183371875!2m3!1f
            0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388748eb56c1fd%3A0
            x95b39410f9f1dfbc!2sPereira%2C%20Risaralda!5e0!3m2!1ses-419!2sco!4
            v1585107726160!5m2!1ses-419!2sco" width="600" height="450"
            frameborder="0" style="border:0;" allowfullscreen=""
            aria-hidden="false" tabindex="0"></iframe>"""
            return make_response(a, 200)
        else:
            return make_response(render_template('login.html'), 400)
    else:
        return make_response(render_template('login.html'), 400)

@user_bp.route('/login', methods=['GET','POST'])
def login():
    if request.method == "GET": #Verifica el si método de acceso es GET
        return redirect(url_for("user_bp.home"))
    elif request.method == "POST": # Verifica si el método de acceso es POST
        password = request.form['password']
        username = request.form['username']
        try:
            user = User.objects(username = username).first() # Solicita a la base de datos vendedor con el nombre dado
            if user:
                if user.check_password(password): # En caso de encontrar dicho vendedor, verifica si la contraseña es correcta
                    login_user(user, remember = True)
                    next = request.args.get('next')
                    return redirect(next or url_for("user_bp.home"))
                else:
                    return "Wrong password"
            else:
                return "Usuario invalido"
        except Exception as e:
            print("Error al hacer la consulta", repr(e))
            return "Error"

@user_bp.route("/obtener/facturas", methods=["GET", "POST"])
@login_required
def ver_facturas():
    if request.method == "GET":
        return render_template("buscar.html")
    elif request.method == "POST":
        try:
            args = get_args(request.form)
            f = Factura.objects(**args)
        except KeyError as e:
            return make_response(jsonify({"Error":"Probably InvalidQueryError", "message": repr(e)}), 400)
        return make_response(jsonify(f), 200)

@user_bp.route("/crear/factura", methods=["GET", "POST"])
@login_required
def facturar():
    if request.method =="GET":
        return render_template("facturar.html")
    elif request.method == "POST":
        form  = request.form
        fac = Factura(
            id = form["id"],
            vendedor = User.objects.get(username = form["username"]),
            cliente = {"name" : form["client"], "aporte": "mucho"},
            productos = ["telefono", "computador", "bolsa de leche"],
            lugar = {
                "type": "Point",
                "coordinates": [
                  -75.69554328918457,
                  4.81354909567146
            ]
          }
        )
        fac.save()
    print(form)
    return "Guardado con exito"

@user_bp.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("user_bp.home"))

@login_manager.user_loader
def load_user(user_id):
    return User.objects(username = user_id).first()
