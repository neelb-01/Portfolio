# Portfolio Backend

FastAPI + SQLite backend for the personal portfolio.

## Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Copy env config
copy .env.example .env
# Edit .env if you want SMTP email notifications
```

## Running

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**  
Interactive docs: **http://localhost:8000/docs**

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/{id}` | Get single project |
| GET | `/api/skills` | List all skills |
| GET | `/api/experience` | List all experience |
| POST | `/api/contact` | Submit contact message |

## Database

SQLite file is created automatically at `./portfolio.db` on first run.  
Placeholder data is seeded on startup if tables are empty.

## Environment Variables

See [.env.example](.env.example) for all options.  
SMTP variables are optional — leave blank to skip email and just store messages in the DB.
