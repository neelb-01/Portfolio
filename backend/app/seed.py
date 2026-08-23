"""Seed portfolio content into the SQLite database.

Projects and skills mirror the public repositories on github.com/neelb-01.
"""
from .database import SessionLocal
from .models import Project, Skill, Experience


GITHUB = "https://github.com/neelb-01"

PROJECTS = [
    {
        "title": "Floodlit xG",
        "description": "Expected Goals (xG) analytics over 3,464 real matches — shot maps, xG race charts, and a fitted fallback model.",
        "long_description": (
            "A full-stack football analytics app built on StatsBomb Open Data, covering 3,464 matches "
            "and 88,023 shots. An Express 5 backend reads the event files directly — no database — and "
            "serves match metadata, shot-level xG breakdowns, and player/team aggregation over a REST API. "
            "Where StatsBomb publishes its own xG the value is used verbatim; every other shot falls back to "
            "an L2-regularised logistic regression I fitted on the full dataset, with separate models per shot "
            "class. Validated on 686 held-out matches: 0.2768 open-play test log-loss against StatsBomb's own "
            "0.2756, calibrated to 1731.8 predicted xG vs 1752 actual goals. Penalty shootouts are excluded, "
            "since counting them inflated the 2016 Champions League final from 5.12 to 12.17 xG. "
            "The frontend is three hand-written files with no build step and no framework: a searchable "
            "combobox over every match, a dual scoreline, a cumulative xG race chart, a shot map scaled by xG, "
            "and a chronological shot log — with a floodlight palette chosen to stay readable under every "
            "common colour-vision deficiency."
        ),
        "tech_stack": ["JavaScript", "Node.js", "Express 5", "HTML / CSS", "Logistic Regression", "StatsBomb Open Data"],
        "github_url": f"{GITHUB}/football-analyzer",
        "demo_url": "https://floodlit-xg.vercel.app",
        "featured": 1,
    },
    {
        "title": "LifeLine — QR Blood Management",
        "description": "A QR-traced blood donation platform: every unit is followed from the donor's arm to the patient's vein.",
        "long_description": (
            "A multi-stakeholder platform that digitises the blood donation lifecycle across five roles — "
            "donor, camp, blood bank, hospital, and admin — each with its own dashboard. Every unit is stamped "
            "with an HMAC-signed QR code at collection and scanned at each checkpoint, appending to an "
            "immutable trace: collected → tested → available → reserved → used. Units only reach the hospital "
            "marketplace after all five NBTC-mandated screening tests pass; any failure auto-discards them. "
            "Built on React 19 and an Express 5 API over PostgreSQL, with JWT access/refresh tokens in httpOnly "
            "cookies, role-based route guards, fully parameterised queries, and an append-only audit log capturing "
            "user, IP, and user agent for every sensitive action. Built as a four-person team project — "
            "I worked as a full-stack developer across the React dashboards and the Express/PostgreSQL API."
        ),
        "tech_stack": ["React 19", "Node.js", "Express 5", "PostgreSQL", "JWT Auth", "Leaflet", "Chart.js", "Stripe"],
        "github_url": f"{GITHUB}/QR-Based-Transparent-Blood-Management-System",
        "demo_url": "https://qr-based-transparent-blood-manageme.vercel.app",
        "featured": 1,
    },
    {
        "title": "ADL Cafe — Android Ordering App",
        "description": "A native Kotlin cafe app: browse the menu, configure a drink, check out, and keep a receipt history that survives restarts.",
        "long_description": (
            "A native Android cafe ordering app covering the full flow across six screens — menu with "
            "search and category filters, item detail with a size selector and live total, cart, checkout, "
            "order confirmation, and order history. State lives in a Room database with four entities, so "
            "the cart and past orders survive an app restart. Each screen is a Fragment with its own "
            "ViewModel observing StateFlow, and the UI only ever talks to a single repository; "
            "dependencies are wired by hand through a ViewModel factory rather than a DI framework, "
            "which the project is too small to justify. Money is stored as integer cents everywhere and "
            "formatted only for display, so no price is ever the result of floating-point arithmetic, and "
            "order lines snapshot the item name and unit price at purchase time — editing the menu later "
            "cannot rewrite an old receipt. The cart enforces de-duplication with a unique index on "
            "item plus size, and enums persist by name so reordering one cannot corrupt saved rows."
        ),
        "tech_stack": ["Kotlin", "Android SDK", "Room", "Coroutines / Flow", "Navigation Component", "Material 3", "ViewBinding", "Gradle"],
        "github_url": f"{GITHUB}/cafe-app",
        "demo_url": None,
        "featured": 1,
    },
    {
        "title": "Portfolio",
        "description": "This site — a React + TypeScript frontend backed by a FastAPI service instead of hardcoded content.",
        "long_description": (
            "The site you're reading. Rather than hardcoding content into components, projects, skills, and "
            "experience are served by a FastAPI backend over SQLAlchemy and SQLite, so each section fetches and "
            "renders its own data with proper loading and error states. The frontend is React 19 with TypeScript, "
            "built by Vite and styled with Tailwind, with Framer Motion driving scroll-triggered reveals and an "
            "animated neural-network canvas behind the page. The contact form posts to a validated Pydantic "
            "endpoint that surfaces field-level errors back into the form. Dark and light themes are resolved "
            "before first paint to avoid a flash of the wrong theme."
        ),
        "tech_stack": ["TypeScript", "React 19", "Vite", "Tailwind CSS", "Framer Motion", "Python", "FastAPI", "SQLAlchemy"],
        "github_url": f"{GITHUB}/Portfolio",
        "demo_url": None,
        "featured": 1,
    },
    {
        "title": "Discord Bot",
        "description": "A discord.js v14 slash-command bot with filesystem-driven command loading and hot reload.",
        "long_description": (
            "A slash-command Discord bot built on discord.js v14. Commands are discovered by scanning "
            "commands/<category>/*.js and events by scanning events/, so adding either is a matter of dropping "
            "in a file — the same shared loader backs both the running bot and the command deployment script. "
            "Each command declares its own per-user cooldown, and /reload hot-swaps a command into the running "
            "process without a restart, gated behind an Administrator check."
        ),
        "tech_stack": ["JavaScript", "Node.js", "discord.js v14", "ESLint"],
        "github_url": f"{GITHUB}/discord-bot",
        "demo_url": None,
        "featured": 0,
    },
]

SKILLS = [
    # Languages
    {"name": "JavaScript", "category": "Languages", "level": 90},
    {"name": "TypeScript", "category": "Languages", "level": 82},
    {"name": "Python", "category": "Languages", "level": 80},
    {"name": "Kotlin", "category": "Languages", "level": 72},
    {"name": "HTML / CSS", "category": "Languages", "level": 88},
    {"name": "SQL", "category": "Languages", "level": 75},
    # Frontend
    {"name": "React", "category": "Frontend", "level": 88},
    {"name": "Vanilla JS / DOM", "category": "Frontend", "level": 86},
    {"name": "Tailwind CSS", "category": "Frontend", "level": 82},
    {"name": "Framer Motion", "category": "Frontend", "level": 76},
    {"name": "Canvas / SVG Charts", "category": "Frontend", "level": 78},
    {"name": "Vite", "category": "Frontend", "level": 80},
    {"name": "Android UI (XML / Material 3)", "category": "Frontend", "level": 70},
    # Backend
    {"name": "Node.js", "category": "Backend", "level": 88},
    {"name": "Express", "category": "Backend", "level": 85},
    {"name": "FastAPI", "category": "Backend", "level": 78},
    {"name": "REST API Design", "category": "Backend", "level": 85},
    {"name": "PostgreSQL", "category": "Backend", "level": 76},
    {"name": "SQLite / SQLAlchemy", "category": "Backend", "level": 75},
    {"name": "JWT / Auth Flows", "category": "Backend", "level": 76},
    {"name": "Room / Coroutines & Flow", "category": "Backend", "level": 70},
    # Tools
    {"name": "Git / GitHub", "category": "Tools", "level": 90},
    {"name": "npm / Node tooling", "category": "Tools", "level": 85},
    {"name": "Data Wrangling (JSON/TSV)", "category": "Tools", "level": 82},
    {"name": "ESLint / oxlint", "category": "Tools", "level": 78},
    {"name": "Vercel", "category": "Tools", "level": 72},
    {"name": "Android Studio / Gradle", "category": "Tools", "level": 68},
    {"name": "VS Code", "category": "Tools", "level": 92},
]

EXPERIENCE = [
    {
        "title": "Full-Stack Developer — LifeLine",
        "organization": "QR-Based Transparent Blood Management System (team project)",
        "type": "project",
        "start_date": "Aug 2025",
        "end_date": "May 2026",
        "description": (
            "Worked as one of four developers on LifeLine, a QR-traced blood donation platform. "
            "Contributed across the React 19 role dashboards and the Express 5 / PostgreSQL API — "
            "QR lifecycle tracking, the five-test screening flow, and the hospital marketplace. "
            "Deployed on Vercel."
        ),
        "location": "Mumbai, India",
    },
]


def _sync(db, model, rows):
    """Replace the table's contents with `rows`. Seed data is the source of truth."""
    db.query(model).delete()
    db.add_all([model(**r) for r in rows])


def seed():
    db = SessionLocal()
    try:
        _sync(db, Project, PROJECTS)
        _sync(db, Skill, SKILLS)
        _sync(db, Experience, EXPERIENCE)
        db.commit()
        print("[OK] Database seeded with portfolio content")
    finally:
        db.close()
