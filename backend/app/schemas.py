from __future__ import annotations
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, field_validator


# ─── Project ────────────────────────────────────────────────────────────────

class ProjectBase(BaseModel):
    title: str
    description: str
    long_description: Optional[str] = None
    tech_stack: List[str] = []
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: int = 0


class ProjectResponse(ProjectBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


# ─── Skill ───────────────────────────────────────────────────────────────────

class SkillBase(BaseModel):
    name: str
    category: str  # ML_AI | Backend | Frontend | Tools
    level: int = Field(ge=0, le=100)


class SkillResponse(SkillBase):
    id: int

    model_config = {"from_attributes": True}


# ─── Experience ──────────────────────────────────────────────────────────────

class ExperienceBase(BaseModel):
    title: str
    organization: str
    type: str  # hackathon | research | workshop
    start_date: str
    end_date: Optional[str] = None
    description: str
    location: Optional[str] = None


class ExperienceResponse(ExperienceBase):
    id: int

    model_config = {"from_attributes": True}


# ─── Contact ─────────────────────────────────────────────────────────────────

class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(min_length=3, max_length=300)
    message: str = Field(min_length=10, max_length=5000)

    @field_validator("name")
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Name cannot be blank")
        return v.strip()


class ContactResponse(BaseModel):
    message: str
    id: int
