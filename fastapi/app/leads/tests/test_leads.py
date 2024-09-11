import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db import Base, get_db

# Configuración de la base de datos para pruebas
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crear la base de datos y las tablas antes de las pruebas
Base.metadata.create_all(bind=engine)

# Sobrescribimos la dependencia get_db para usar la base de datos de prueba
def override_get_db():
      db = TestingSessionLocal()
      yield db

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_career():
    response = client.post("/careers/", json=career_data[0])
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Jugador de LoL"

def test_create_subject():
    response = client.post("/subjects/", json=subject_data[0])
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Griefing 1"
    assert data["course_duration"] == 20
    assert data["enrollment_year"] == 2020

def test_create_lead():
    
    response = client.post("/leads/", json=lead_data[0])
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Sydney Gibbon"
    assert data["email"] == "sydneygibbon@edmachina.com"
    assert len(data["subjects"]) == 1

def test_create_leads_subjects():
    
    response = client.post("/leads/", json=lead_data[0])
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Sydney Gibbon"
    assert data["email"] == "sydneygibbon@edmachina.com"
    assert len(data["subjects"]) == 1

def test_get_career_by_id():
    
    response = client.get(f"/careers/{1}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["name"] == "Jugador de LoL"

def test_get_subject_by_id():
    
    # Ahora probamos obtener el subject por su ID
    response = client.get(f"/subjects/{1}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["name"] == "Griefing 1"

def test_get_lead_by_id():
    response = client.get(f"/leads/{1}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["full_name"] == "Sydney Gibbon"

def test_get_careers():
    # Obtener todos los careers
    response = client.get("/careers/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0 

def test_get_subjects():
    # Obtener todos los subjects
    response = client.get("/subjects/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0 

def test_get_leads():
    # Obtener todos los leads
    response = client.get("/leads/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0  # Verificamos que haya al menos un lead

def test_get_leads_subjects():
    # Obtener todos los leads
    response = client.get("/leads_subjects/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0  # Verificamos que haya al menos un lead
