from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.db import Base

class LeadsSubjects(Base):
    __tablename__ = "leads_subjects"

    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id"), primary_key=True)
    subject_id: Mapped[int] = mapped_column(
        ForeignKey("subjects.id"), primary_key=True
    )
    times_taken: Mapped[int]
    enrollment_year: Mapped[int]
    subject: Mapped["Subject"] = relationship()

class Career(Base):
    __tablename__ = 'careers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

class Subject(Base):
    __tablename__ = 'subjects'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    course_duration = Column(Integer)
    career_id: Mapped[int] = mapped_column(ForeignKey("careers.id"))
    career: Mapped["Career"] = relationship()

class Lead(Base):
    __tablename__ = 'leads'
    
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    address = Column(String)
    phone = Column(String)
    subjects: Mapped[List["LeadsSubjects"]] = relationship()