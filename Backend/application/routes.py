from .api_res import FacturApi
from .auth import LoginApi
from .api_adm import UsersApi
from . import api

def initialize_routes():
    api.add_resource(FacturApi, '/factura')
    api.add_resource(LoginApi, '/login')
    api.add_resource(UsersApi, '/users')
