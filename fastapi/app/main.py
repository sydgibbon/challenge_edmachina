from fastapi import FastAPI
from app.leads import routers
from app.db import engine, Base

app = FastAPI()

# Crear las tablas
Base.metadata.create_all(bind=engine)

# Incluir el router
app.include_router(routers.router)