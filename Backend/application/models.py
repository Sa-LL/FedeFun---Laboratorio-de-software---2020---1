from . import me, bcrypt
from mongoengine import queryset_manager
from datetime import datetime

class Sequence(me.Document):
    # Clase de secuencia de identificadores para usuarios y facturas
    meta = {"collection": "sequence"}
    id = me.StringField(primary_key = True)
    last_id = me.IntField(required = True)

def getNextId(name):
    # Función incremento automático al ID de usuario o factura
    Sequence.objects(id = name).update_one(inc__last_id = 1)
    new_id = Sequence.objects(id = name).first()
    return new_id.last_id

class User(me.Document): #Modelo de datos para los vendedores
    meta = {"collection": "users"}
    internal_id = me.IntField(primary_key=True)
    external_id = me.StringField(required=True, unique = True)
    username = me.StringField(required=True, unique = True)
    password = me.StringField(required=True)
    telefono = me.StringField(required=True)
    nombre = me.StringField(required=True)
    email = me.EmailField(required=True, unique = True)
    address = me.StringField(required=True)
    type = me.StringField(required = True) #Vendedor o Supervisor
    enabled = me.BooleanField(default = True)

    @queryset_manager
    def alive(doc_cls, queryset):
        return queryset.filter(enabled=True)

    @queryset_manager
    def disabled(doc_cls, queryset):
        return queryset.filter(enabled=False)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return "User {}".format(self.username)

types = ["Celular", "Tablet", "Televisor", "Laptop", "PC"]

class Producto(me.EmbeddedDocument):
    ID = me.StringField(primary_key = True, required = True) #ID del producto
    tp = me.StringField(required = True, choices = types) #Tipo del producto
    name = me.StringField(required = True) #Nombre del producto
    price = me.FloatField(required = True) #Precio unnitario
    brand = me.StringField(required = True) #Marca
    amount = me.IntField(required = True) #Cantidad

class Factura(me.Document): #Modelo de datos para las facturas
    id = me.IntField(primary_key=True, required = True) #Identificador de la factura
    vendedor = me.ReferenceField(User) #Referencia a un objeto de tipo vendedor
    cliente = me.DictField(required=True) #Referencia a un objeto de tipo cliente
    productos = me.EmbeddedDocumentListField(Producto,required=True) #Lista de Subdocumentos, donde cada uno contiene al información de un producto
    fecha = me.DateTimeField(required=True, default=str(datetime.now())) #Fecha y hora de la factura
    lugar = me.PointField(required=True) # Lugar geografico de la factura
    total = me.FloatField() # Total de la factura

    @queryset_manager
    def recents(doc_cls, queryset):
        return queryset.order_by("-fecha")[0:4]
