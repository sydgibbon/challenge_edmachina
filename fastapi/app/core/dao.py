from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

class BaseDAO:
    def insert(self, db: Session, model: BaseModel):
        db.add(model)
        db.commit()
        return model

    def insert_all(self, db: Session, model_list: List[BaseModel]):
        for model in model_list:
            db.add(model)
        db.commit()
    
    def select_by_id(self, model: BaseModel, db: Session, model_id: int):
        return db.query(model).filter(model.id == model_id).first()
    
    def select_all(self, model: BaseModel, db: Session, skip: int = 0, limit: int = 10):
        return db.query(model).offset(skip).limit(limit).all()
    