# Portfolio Frontend

React + TypeScript + Tailwind CSS + Framer Motion portfolio frontend.

## Setup

```bash
cd frontend
npm install
```

## Running

```bash
npm run dev
```

The Vite dev server starts at **http://localhost:5173**

> **Note:** The frontend proxies `/api/*` requests to `http://localhost:8000` automatically. Start the backend first.

## Project Structure

```
src/
├── components/
│   ├── canvas/      # NeuralCanvas generative art background
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, About, Projects, Skills, Experience, Contact
│   └── ui/          # SectionTitle, Tag, ProjectModal
├── hooks/           # useTheme, useInView
├── lib/             # api.ts (axios), motion.ts (Framer Motion variants)
└── types/           # TypeScript interfaces
```

## Environment Variables

See [.env.example](.env.example). No required env vars for the frontend — the API base URL is configured in `vite.config.ts`.

## Design System

| Token | Value |
|-------|-------|
| `--bg` (dark) | `#0d0d0f` |
| `--node` (dark) | `#00e5ff` (cyan) |
| `--synapse` (dark) | `#b8ff57` (lime) |
| Font headings | Playfair Display |
| Font body | Inter |
| Font mono | JetBrains Mono |
