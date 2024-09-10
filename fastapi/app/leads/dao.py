from sqlalchemy.orm import Session
from app.core.dao import BaseDAO
from app.leads.models import Lead, Subject, Career, LeadsSubjects
from app.leads.dto import LeadDTO, SubjectDTO, CareerDTO, LeadsSubjectsDTO

class LeadDAO(BaseDAO):
    def create_lead(self, db: Session, lead: LeadDTO):
        db_lead = Lead(
            full_name=lead.full_name,
            email=lead.email,
            address=lead.address,
            phone=lead.phone
        )
        return self.insert(db, db_lead)

    def get_lead_by_id(self, db: Session, lead_id: int):
        return self.select_by_id(Lead, db, lead_id)

    def get_leads(self, db: Session, skip: int = 0, limit: int = 10):
        return self.select_all(Lead, db, skip, limit)
    
class SubjectDAO(BaseDAO):
    def create_subject(self, db: Session, subject: SubjectDTO):
        db_subject = Subject(
            name = subject.name,
            course_duration = subject.course_duration,
            career_id= subject.career_id
        )
        return self.insert(db, db_subject)

    def get_subject_by_id(self, db: Session, subject_id: int):
        return self.select_by_id(Subject, db, subject_id)

    def get_subjects(self, db: Session, skip: int = 0, limit: int = 10):
        return self.select_all(Subject, db, skip, limit)
    
class CareerDAO(BaseDAO):
    def create_career(self, db: Session, career: CareerDTO):
        db_career = Career(
            name=career.name
        )
        return self.insert(db, db_career)

    def get_career_by_id(self, db: Session, career_id: int):
        return self.select_by_id(Career, db, career_id)

    def get_careers(self, db: Session, skip: int = 0, limit: int = 10):
        return self.select_all(Career, db, skip, limit)
    
class LeadsSubjectsDAO(BaseDAO):
    def create_leads_subjects(self, db: Session, lead_subject: LeadsSubjectsDTO):
        db_lead_subject = LeadsSubjects(
            lead_id=lead_subject.lead_id,
            subject_id=lead_subject.subject_id,
            times_taken=lead_subject.times_taken,
            enrollment_year=lead_subject.enrollment_year
        )
        return self.insert(db, db_lead_subject)

    def get_leads_subjects(self, db: Session, skip: int = 0, limit: int = 10):
        return self.select_all(LeadsSubjects, db, skip, limit)
    