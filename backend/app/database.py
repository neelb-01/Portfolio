from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy.pool import NullPool
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./portfolio.db")

# Managed Postgres providers hand out URLs SQLAlchemy can't use as-is: Vercel and
# Heroku still emit the legacy `postgres://` scheme, which SQLAlchemy 2 rejects
# outright, and a bare `postgresql://` resolves to psycopg2 — a driver we don't
# install. Normalise both onto psycopg 3 so either form works unedited.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = "postgresql+psycopg://" + DATABASE_URL[len("postgres://"):]
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = "postgresql+psycopg://" + DATABASE_URL[len("postgresql://"):]

IS_SQLITE = DATABASE_URL.startswith("sqlite")

# check_same_thread is a sqlite3-only DBAPI argument (FastAPI runs sync
# endpoints in a threadpool, so the single-thread guard has to be lifted).
# connect_args is forwarded verbatim to the driver, so other backends would
# reject it.
connect_args = {"check_same_thread": False} if IS_SQLITE else {}

# On serverless the container is frozen between invocations, so a pooled
# connection is dead by the time it is reused and just holds a server-side slot
# hostage. NullPool opens and closes per checkout, which is what Postgres
# providers with low connection ceilings expect.
pool_kwargs = {} if IS_SQLITE else {"poolclass": NullPool}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    **pool_kwargs,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
