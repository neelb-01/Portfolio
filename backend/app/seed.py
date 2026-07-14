"""Seed placeholder data into the SQLite database."""
from .database import SessionLocal
from .models import Project, Skill, Experience


PROJECTS = [
    {
        "title": "NeuralSearch",
        "description": "A semantic search engine over academic papers using FAISS and sentence-transformers.",
        "long_description": (
            "Built a full-stack semantic search tool that indexes 50k+ arXiv abstracts. "
            "The pipeline embeds documents offline with all-MiniLM-L6-v2, stores vectors in FAISS, "
            "and serves sub-50ms nearest-neighbour queries via a FastAPI backend. "
            "A React UI lets users search, filter by category, and inspect embedding similarity scores."
        ),
        "tech_stack": ["Python", "FAISS", "FastAPI", "React", "sentence-transformers", "SQLite"],
        "github_url": "https://github.com/yourusername/neuralsearch",
        "demo_url": None,
        "featured": 1,
    },
    {
        "title": "WorkshopOS",
        "description": "A platform for managing and scheduling technical workshops with live attendance tracking.",
        "long_description": (
            "Designed and launched a workshop management system used by 200+ students at university. "
            "Features include real-time seat booking, QR-code check-in, facilitator dashboards, "
            "and post-session feedback analytics. Built with Next.js, Supabase, and Recharts."
        ),
        "tech_stack": ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Recharts"],
        "github_url": "https://github.com/yourusername/workshopos",
        "demo_url": "https://workshopos.demo.dev",
        "featured": 1,
    },
    {
        "title": "EdgeClassifier",
        "description": "On-device image classification with TFLite and a custom MobileNetV3 fine-tune.",
        "long_description": (
            "Fine-tuned MobileNetV3-Small on a custom 12-class dataset for a campus recycling project. "
            "Converted to TensorFlow Lite with int8 quantization, achieving 92% accuracy at 30ms/frame "
            "on a Raspberry Pi 4. Deployed behind a Flask API for integration with IoT sensors."
        ),
        "tech_stack": ["Python", "TensorFlow", "TFLite", "Flask", "Raspberry Pi", "OpenCV"],
        "github_url": "https://github.com/yourusername/edgeclassifier",
        "demo_url": None,
        "featured": 0,
    },
    {
        "title": "DataLens",
        "description": "Interactive data-exploration dashboard with auto-generated charts from CSV uploads.",
        "long_description": (
            "Drag-and-drop CSV upload triggers automatic EDA: distribution plots, correlation heatmaps, "
            "and outlier flagging. Built with a FastAPI data layer, Pandas for transformations, "
            "and a Vite+React frontend with Plotly for interactive charts."
        ),
        "tech_stack": ["Python", "Pandas", "FastAPI", "React", "Plotly", "Vite"],
        "github_url": "https://github.com/yourusername/datalens",
        "demo_url": None,
        "featured": 0,
    },
]

SKILLS = [
    # ML / AI
    {"name": "PyTorch", "category": "ML_AI", "level": 88},
    {"name": "TensorFlow / TFLite", "category": "ML_AI", "level": 82},
    {"name": "scikit-learn", "category": "ML_AI", "level": 90},
    {"name": "Hugging Face", "category": "ML_AI", "level": 80},
    {"name": "FAISS / Vector DBs", "category": "ML_AI", "level": 75},
    {"name": "LangChain", "category": "ML_AI", "level": 70},
    # Backend
    {"name": "FastAPI", "category": "Backend", "level": 92},
    {"name": "Python", "category": "Backend", "level": 95},
    {"name": "Node.js", "category": "Backend", "level": 78},
    {"name": "PostgreSQL", "category": "Backend", "level": 80},
    {"name": "SQLite / SQLAlchemy", "category": "Backend", "level": 85},
    {"name": "REST API Design", "category": "Backend", "level": 88},
    # Frontend
    {"name": "React / Next.js", "category": "Frontend", "level": 87},
    {"name": "TypeScript", "category": "Frontend", "level": 85},
    {"name": "Tailwind CSS", "category": "Frontend", "level": 90},
    {"name": "Framer Motion", "category": "Frontend", "level": 75},
    {"name": "Vite", "category": "Frontend", "level": 82},
    # Tools
    {"name": "Git / GitHub", "category": "Tools", "level": 93},
    {"name": "Docker", "category": "Tools", "level": 75},
    {"name": "Linux / Bash", "category": "Tools", "level": 85},
    {"name": "Jupyter", "category": "Tools", "level": 88},
    {"name": "VS Code", "category": "Tools", "level": 95},
]

EXPERIENCE = [
    {
        "title": "AI/ML Workshop Facilitator",
        "organization": "University Tech Society",
        "type": "workshop",
        "start_date": "Sep 2023",
        "end_date": "Present",
        "description": (
            "Designed and led 10+ hands-on workshops (50–120 attendees each) covering PyTorch basics, "
            "transformer fine-tuning, and MLOps practices. Created all curriculum, slides, and Colab notebooks."
        ),
        "location": "Pune, India",
    },
    {
        "title": "ML Research Intern",
        "organization": "Centre for Development of Advanced Computing (C-DAC)",
        "type": "research",
        "start_date": "May 2024",
        "end_date": "Aug 2024",
        "description": (
            "Researched document understanding using LayoutLMv3. Implemented a fine-tuning pipeline for "
            "token classification on scanned government forms, achieving 94.2% F1. "
            "Wrote a technical report summarising findings for the NLP team."
        ),
        "location": "Pune, India",
    },
    {
        "title": "Winner — Best ML Hack",
        "organization": "HackIIIT 2024",
        "type": "hackathon",
        "start_date": "Mar 2024",
        "end_date": None,
        "description": (
            "Built a real-time sign-language interpreter using MediaPipe + a lightweight LSTM model "
            "in under 24 hours. Placed 1st in the AI/ML track out of 180 teams."
        ),
        "location": "Hyderabad, India",
    },
    {
        "title": "Finalist — Smart India Hackathon",
        "organization": "Ministry of Education, India",
        "type": "hackathon",
        "start_date": "Dec 2023",
        "end_date": None,
        "description": (
            "Led a 6-member team to develop an AI-powered crop-disease detection app using "
            "transfer learning and a React Native frontend. Reached national finals."
        ),
        "location": "Remote",
    },
    {
        "title": "Full-Stack Developer (Project)",
        "organization": "College Capstone — Computer Engineering",
        "type": "research",
        "start_date": "Jan 2025",
        "end_date": "Apr 2025",
        "description": (
            "Built WorkshopOS as a capstone project — full-stack workshop management platform "
            "adopted by 3 student societies. Mentored two juniors on React and database design."
        ),
        "location": "Pune, India",
    },
]


def seed():
    db = SessionLocal()
    try:
        if db.query(Project).count() == 0:
            db.add_all([Project(**p) for p in PROJECTS])

        if db.query(Skill).count() == 0:
            db.add_all([Skill(**s) for s in SKILLS])

        if db.query(Experience).count() == 0:
            db.add_all([Experience(**e) for e in EXPERIENCE])

        db.commit()
        print("[OK] Database seeded with placeholder data")
    finally:
        db.close()
