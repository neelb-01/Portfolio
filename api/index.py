"""Vercel serverless entrypoint.

Vercel's Python runtime imports this module and serves the ASGI callable named
`app`. The FastAPI application itself lives in backend/app, which is not on the
import path in the deployed bundle, so add it here.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.main import app  # noqa: E402,F401
