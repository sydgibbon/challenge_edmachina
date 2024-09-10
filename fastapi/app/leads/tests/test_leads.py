import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db import Base, get_db
from app.leads.models import Lead, Subject


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

career_data = [
  {"name":"Jugador de LoL"},
  {"name":"Leñador de Bonsai"}
]

subject_data = [
  {
    "name": "Griefing 1",
    "course_duration": 20,
    "enrollment_year": 2020,
    "times_taken": 10,
    "career_id": 1,
    "id": 1
  },
  {
    "name": "Flaming Avanzado",
    "course_duration": 30,
    "enrollment_year": 2023,
    "times_taken": 5,
    "career_id": 1,
    "id": 2
  },
  {
    "name": "Micro/Macro para Bronces",
    "course_duration": 25,
    "enrollment_year": 2022,
    "times_taken": 8,
    "career_id": 1,
    "id": 3
  },
  {
    "name": "Zen y el Arte del Bonsai",
    "course_duration": 15,
    "enrollment_year": 2021,
    "times_taken": 2,
    "career_id": 2,
    "id": 4
  },
  {
    "name": "Desramado Extremo",
    "course_duration": 40,
    "enrollment_year": 2024,
    "times_taken": 1,
    "career_id": 2,
    "id": 5
  }
]

lead_data = [
  {
    "full_name": "Sydney Gibbon",
    "email": "sydneygibbon@edmachina.com",
    "address": "9 de julio 832",
    "phone": "2804539160",
    "subject_ids": [
      1, 2
    ]
  },
  {
    "full_name": "Lara Montes",
    "email": "laramontes@edmachina.com",
    "address": "Av. Siempreviva 742",
    "phone": "3414578921",
    "subject_ids": [
      2, 3
    ]
  },
  {
    "full_name": "Juan Bonbonsai",
    "email": "juanbonbonsai@edmachina.com",
    "address": "Calle Bonsai 123",
    "phone": "1156783214",
    "subject_ids": [
      4, 5
    ]
  },
  {
    "full_name": "Diana Splitpusher",
    "email": "diana@edmachina.com",
    "address": "Midlane 99",
    "phone": "1167896543",
    "subject_ids": [
      3
    ]
  }
]

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
