from flask import Flask, flash, redirect, render_template, request, session, abort
from flask_bcrypt import Bcrypt
from pymongo import TEXT
from pymongo.operations import IndexModel
from pymodm import connect, fields, MongoModel, EmbeddedMongoModel
import os
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField, SubmitField, PasswordField, DateField, SelectField
from wtforms.validators import DataRequired, Email, EqualTo, Length, URL

#User = Francho
#pass = JiI2csBCePW1PnLz
DB_URI = "mongodb+srv://Francho:JiI2csBCePW1PnLz@piquefu-viw6q.mongodb.net/test?retryWrites=true&w=majority"

app = Flask(__name__)
bcrypt = Bcrypt(app)

connect(DB_URI)
#Para la autenticación, usar session["tipo de usuario"] = tipo de usuario para saber qué permisos tiene

class Vendedor(MongoModel): #Modelo de datos para los vendedores
    internal_id = fields.IntegerField(primary_key=True)
    external_id = fields.CharField()
    username = fields.CharField()
    password = fields.CharField()
    telefono = fields.CharField()
    nombre = fields.CharField()
    email = fields.EmailField()
    address = fields.CharField()


class Supervisor(MongoModel): #Modelo de datos para los supervisores
    internal_id = fields.IntegerField(primary_key=True)
    external_id = fields.CharField()
    username = fields.CharField()
    password = fields.CharField()
    telefono = fields.CharField()
    nombre = fields.CharField()
    email = fields.EmailField()
    address = fields.CharField()

class Factura(MongoModel): #Modelo de datos para las facturas
    id = fields.IntegerField(primary_key=True) #Identificador de la factura
    vendedor = fields.ReferenceField(Vendedor) #Referencia a un objeto de tipo vendedor
    #cliente = fields.ReferenceField(Cliente) #Referencia a un objeto de tipo cliente
    productos = fields.EmbeddedDocumentListField("producto") #Lista de Subdocumentos, donde cada uno contiene al información de un producto
    fecha = fields.DateTimeField() #Fecha y hora de la factura
    lugar = fields.PointField() # Lugar geografico de la factura

class UserForm(FlaskForm):
    internal_id = IntegerField("internal_id", [DataRequired()])
    external_id = StringField('external_id', [DataRequired()])
    username = StringField('username', [DataRequired()])
    password = PasswordField('password', [DataRequired()])
    telefono = StringField('telefono', [DataRequired()])
    nombre = StringField('nombre', [DataRequired()])
    email = StringField('email', [DataRequired()])
    address = StringField('address', [DataRequired()])

@app.route('/')
def home():
    if "user_type" in session:
        if session["user_type"] == "vendedor":
            return 'Inicio de vendedores <a href="/logout">Logout</a>'
        elif session["user_type"] == "supervisor":
            return 'Inicio de supervisores <a href="/logout">Logout</a>'
        else:
            return render_template('login.html')
    else:
        return render_template('login.html')


@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == "GET": #Verifica el si método de acceso es GET
        return home()
    elif request.method == "POST": # Verifica si el método de acceso es POST
        password = request.form['password']
        username = request.form['username']
        try:
            u = Vendedor.objects.get({"username": username}) # Solicita a la base de datos vendedor con el nombre dado
            if bcrypt.check_password_hash(u.password,password): # En caso de encontrar dicho vendedor, verifica si la contraseña es correcta
                session["user"] = username
                session["user_type"] = "vendedor"
                return home()
            else:
                return "Invalid password"
        except Vendedor.DoesNotExist: # Exception resultante de buscar un vendedor que no existe
        #De no encontrar dicho vendedor, pasa a verificar si el nombre de usuario es de un supervisor
            print("No encontró usuario")
            try:
                supervisor = Supervisor.objects.get({"username": username}) # Verifica existencia del supervisor
                if bcrypt.check_password_hash(supervisor.password,password): # Verifica la validez de la contraseña
                    session["user"] = username
                    session["user_type"] = "supervisor"
                    return home()
                else:
                    return "Invalid password"
            except Supervisor.DoesNotExist: # Si no se encuentra el usuario suministrado en los vendedores ni en los supervisores, es un usuario inválido
                return "Invalid Username"

@app.route("/register/<user_type>", methods = ["PUT"])
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

@app.route("/logout")
def logout():
    session["user"] = None
    session["user_type"] = None
    return home()

if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(debug=True,host='0.0.0.0', port=4000)
