import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import ContactMessage
from ..schemas import ContactRequest, ContactResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])


def _send_email(data: ContactRequest) -> None:
    """Send notification email via SMTP if env vars are configured."""
    host = os.getenv("SMTP_HOST")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASSWORD")
    from_addr = os.getenv("SMTP_FROM", user)
    to_addr = os.getenv("SMTP_TO", user)

    if not all([host, user, password, to_addr]):
        return  # SMTP not configured — silently skip

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Portfolio Contact] {data.subject}"
    msg["From"] = from_addr
    msg["To"] = to_addr

    body = (
        f"Name: {data.name}\n"
        f"Email: {data.email}\n"
        f"Subject: {data.subject}\n\n"
        f"Message:\n{data.message}"
    )
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(host, port) as server:
            server.starttls()
            server.login(user, password)
            server.sendmail(from_addr, to_addr, msg.as_string())
    except Exception:
        # Log but don't fail the request — message is already saved to DB
        pass


@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(payload: ContactRequest, db: Session = Depends(get_db)):
    record = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    _send_email(payload)

    return ContactResponse(message="Message received. I'll get back to you soon!", id=record.id)
