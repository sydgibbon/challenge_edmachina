from pydantic import BaseModel, EmailStr, ConfigDict
from typing import List

class CareerDTO(BaseModel):
    name: str

class CareerResponseDTO(CareerDTO):
    id: int
    model_config = ConfigDict(from_attributes=True)

class SubjectDTO(BaseModel):
    name: str
    course_duration: int
    career_id: int

class SubjectResponseDTO(SubjectDTO):
    id: int
    model_config = ConfigDict(from_attributes=True)

class LeadsSubjectsDTO(BaseModel):
    lead_id: int
    subject_id: int
    times_taken: int
    enrollment_year: int

class LeadDTO(BaseModel):
    full_name: str
    email: EmailStr
    address: str
    phone: str

class LeadCreateDTO(LeadDTO):
    model_config = ConfigDict(from_attributes=True)

class LeadResponseDTO(LeadDTO):
    id: int
    subjects: List[LeadsSubjectsDTO]
    model_config = ConfigDict(from_attributes=True)

