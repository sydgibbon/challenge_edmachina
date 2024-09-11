from fastapi import FastAPI
from app.leads import routers
from app.db import engine, Base
from app.leads.models import *
from sqlalchemy import event
from app.leads.fixtures.data import INITIAL_DATA

#Agregar data inicial de prueba (se puede mejorar)
def initialize_table(target, connection, **kw):
    tablename = str(target)
    if tablename in INITIAL_DATA and len(INITIAL_DATA[tablename]) > 0:
        connection.execute(target.insert(), INITIAL_DATA[tablename])
        
event.listen(Career.__table__, 'after_create', initialize_table)
event.listen(Lead.__table__, 'after_create', initialize_table)
event.listen(Subject.__table__, 'after_create', initialize_table)
event.listen(LeadsSubjects.__table__, 'after_create', initialize_table)

app = FastAPI()

# Crear las tablas
Base.metadata.create_all(bind=engine)

# Incluir el router
app.include_router(routers.router)