from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.sql import func

from .database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    long_description = Column(Text, nullable=True)
    # MutableList tracks in-place edits (append/remove); a bare JSON column only
    # detects whole-attribute reassignment, so mutations would be dropped.
    tech_stack = Column(MutableList.as_mutable(JSON), nullable=False, default=list)
    github_url = Column(String(500), nullable=True)
    demo_url = Column(String(500), nullable=True)
    image_url = Column(String(500), nullable=True)
    featured = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)  # Languages | Frontend | Backend | Tools
    level = Column(Integer, nullable=False)  # 0–100


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    organization = Column(String(200), nullable=False)
    type = Column(String(50), nullable=False)  # hackathon | research | workshop | project
    start_date = Column(String(20), nullable=False)
    end_date = Column(String(20), nullable=True)
    description = Column(Text, nullable=False)
    location = Column(String(200), nullable=True)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False)
    subject = Column(String(300), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
