from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Skill
from ..schemas import SkillResponse

router = APIRouter(prefix="/api/skills", tags=["skills"])


@router.get("/", response_model=List[SkillResponse])
def list_skills(db: Session = Depends(get_db)):
    return db.query(Skill).order_by(Skill.category, Skill.level.desc()).all()
