// Path: README.md
# School Chatbot (Mekelle University demo)
A minimal production-like embeddable AI chat widget (frontend + backend) preconfigured for *Mekelle University* with demo data.

## What this archive contains
- `backend/` — Fastify + TypeScript API, SQLite via Prisma, RAG-like retrieval, endpoints:
  - `GET /api/info` — school info & FAQs
  - `GET /api/calendar` — academic calendar & events
  - `GET /api/resources` — list resources
  - `GET /resources/:id/download` — download resource file
  - `POST /api/chat` — chat endpoint (RAG + optional OpenAI)
- `frontend/` — React + TypeScript widget (embeddable)
- `config/site.config.json` — change `schoolName`, `logoUrl`, `apiBase`
- `data/` — demo data (faqs, calendar) and sample resource files
- `docker-compose.yml` & Dockerfiles for local containerized run
- `.env.example` — environment variables

## Quick start (local, no Docker)
1. Ensure Node 18+ and npm are installed.
2. Create the directory structure and paste files from the archive.
3. Setup backend:
```bash
cd backend
npm install
cp ../.env.example .env
# OPTIONAL: edit .env to add OPENAI_API_KEY if you have one
npx prisma generate
npm run seed
npm run dev

Backend runs on http://localhost:4000 by default.

4. Setup frontend:

```
```
cd ../frontend
npm install
npm run dev

```

Frontend runs on http://localhost:5173 (Vite dev). The embeddable snippet uses config/site.config.json to know apiBase.

Open http://localhost:5173 and open the widget (floating bubble). Try: When does the semester start?

Quick start (Docker)

```
# from project root
docker-compose up --build
# frontend -> http://localhost:5173
# backend -> http://localhost:4000
```
How to change school name/logo

Edit config/site.config.json schoolName and logoUrl. Restart frontend build.

How to add OpenAI (optional)

Create OpenAI API key at https://platform.openai.com/
.

Put OPENAI_API_KEY=sk-... in backend/.env (or root .env if you run from root).

Restart backend.

How to connect frontend ↔ backend

Edit config/site.config.json apiBase to point to your backend (default http://localhost:4000).

Frontend uses window.__SCHOOL_WIDGET_CONFIG when embedded. See frontend/src/widget.tsx.

Where to paste real PDFs

Replace placeholder files in backend/public/resources/ with your real PDFs; keep filenames. The endpoints will serve them.

Tests

Backend: cd backend && npm test

Frontend: cd frontend && npm test (minimal tests included)

Troubleshooting

If Prisma complains about migrations: delete dev.db and rerun seed during early dev.

If OpenAI rate-limited: remove the key and the system falls back to demo heuristics.
