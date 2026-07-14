from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Experience
from ..schemas import ExperienceResponse

router = APIRouter(prefix="/api/experience", tags=["experience"])


@router.get("/", response_model=List[ExperienceResponse])
def list_experience(db: Session = Depends(get_db)):
    return db.query(Experience).order_by(Experience.id.desc()).all()
