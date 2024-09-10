from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.leads.dao import LeadDAO, SubjectDAO, CareerDAO, LeadsSubjectsDAO
from app.leads.dto import *
from app.db import get_db

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hi there! This is my attempt for applying to EdMachina. I Hope you like it!. You can go to /docs to see the available endpoints."}

@router.post("/leads/", tags=["Leads"], response_model=LeadResponseDTO)
def create_lead(lead: LeadCreateDTO, db: Session = Depends(get_db)):
    dao = LeadDAO()
    db_lead = dao.create_lead(db, lead)
    return db_lead

@router.get("/leads/{lead_id}", tags=["Leads"], response_model=LeadResponseDTO)
def get_lead_by_id(lead_id: int, db: Session = Depends(get_db)):
    dao = LeadDAO()
    db_lead = dao.get_lead_by_id(db, lead_id)
    if db_lead is None:
        raise HTTPException(status_code=404, detail="Lead not found")
    return db_lead

@router.get("/leads/", tags=["Leads"], response_model=List[LeadResponseDTO])
def list_leads(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    dao = LeadDAO()
    return dao.get_leads(db, skip=skip, limit=limit)

@router.post("/subjects/", tags=["Subjects"], response_model=SubjectResponseDTO)
def create_subject(subject: SubjectDTO, db: Session = Depends(get_db)):
    dao = SubjectDAO()
    db_subject = dao.create_subject(db, subject)
    return db_subject

@router.get("/subjects/{subject_id}", tags=["Subjects"], response_model=SubjectResponseDTO)
def get_subject_by_id(subject_id: int, db: Session = Depends(get_db)):
    dao = SubjectDAO()
    db_subject = dao.get_subject_by_id(db, subject_id)
    if db_subject is None:
        raise HTTPException(status_code=404, detail="subject not found")
    return db_subject

@router.get("/subjects/", tags=["Subjects"], response_model=List[SubjectResponseDTO])
def list_subjects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    dao = SubjectDAO()
    return dao.get_subjects(db, skip=skip, limit=limit)

@router.post("/careers/", tags=["Careers"], response_model=CareerResponseDTO)
def create_career(career: CareerDTO, db: Session = Depends(get_db)):
    dao = CareerDAO()
    db_career = dao.create_career(db, career)
    return db_career

@router.get("/careers/{career_id}", tags=["Careers"], response_model=CareerResponseDTO)
def get_career_by_id(career_id: int, db: Session = Depends(get_db)):
    dao = CareerDAO()
    db_career = dao.get_career_by_id(db, career_id)
    if db_career is None:
        raise HTTPException(status_code=404, detail="Career not found")
    return db_career

@router.get("/careers/", tags=["Careers"], response_model=List[CareerResponseDTO])
def list_careers(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    dao = CareerDAO()
    return dao.get_careers(db, skip=skip, limit=limit)

@router.post("/leads_subjects/", tags=["LeadsSubjects"], response_model=LeadsSubjectsDTO)
def create_leads_subjects(leads_subjects: LeadsSubjectsDTO, db: Session = Depends(get_db)):
    dao = LeadsSubjectsDAO()
    db_leads_subjects = dao.create_leads_subjects(db, leads_subjects)
    return db_leads_subjects

@router.get("/leads_subjects/", tags=["LeadsSubjects"], response_model=List[LeadsSubjectsDTO])
def list_leads_subjects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    dao = LeadsSubjectsDAO()
    return dao.get_leads_subjects(db, skip=skip, limit=limit)
