from flask import Blueprint, render_template, session, request
from flask import current_app as app
from ..models import me, bcrypt, User

# Set up a Blueprint
admin_bp = Blueprint('admin_bp', __name__,
                     template_folder='../../templates',
                     static_folder='static')

# @admin_bp.route("/")
# def home():
#     if "user_type" in session:
#         if session["user_type"] == "vendedor":
#             return 'Inicio de vendedores <a href="/logout">Logout</a>'
#         elif session["user_type"] == "supervisor":
#             return 'Inicio de supervisores <a href="/logout">Logout</a>'
#         else:
#             return render_template('login.html')
#     else:
#         return render_template('login.html')

@admin_bp.route("/register/<user_type>", methods = ["PUT"])
def register(user_type):
    form = UserForm()
    if form.validate_on_submit():
        if user_type == "supervisor":
            supervisor = Supervisor(internal_id = form["internal_id"],
                                    external_id = form["external_id"],
                                    username = form["username"],
                                    password = form["password"],
                                    telefono = form["telefono"],
                                    nombre = form["nombre"],
                                    email = form["email"],
                                    address = form["address"])
            supervisor.save()
        elif user_type == "vendedor":
            vendedor = Vendedor(internal_id = form["internal_id"],
                                    external_id = form["external_id"],
                                    username = form["username"],
                                    password = form["password"],
                                    telefono = form["telefono"],
                                    nombre = form["nombre"],
                                    email = form["email"],
                                    address = form["address"])
            vendedor.save()
        else:
            return "Invalid user type"
    else:
        return home()
