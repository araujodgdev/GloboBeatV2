# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GloboBeat is a Porto Digital residency project for Globo focused on soundtrack identification ("trilhas sonoras"). The system uses a microservices architecture with a Next.js frontend and a Dockerized backend consisting of a Node.js API and Python workers for audio processing.

## Architecture

### Backend (Microservices)

The backend uses Docker Compose to orchestrate multiple services:

- **API Service** (`backend/api/`): Node.js service running on port 3000, handles HTTP requests and database operations using PostgreSQL client (pg)
- **worker-pre** (`backend/workers/worker-pre/`): Python preprocessing worker for audio data
- **worker-rec** (`backend/workers/worker-rec/`): Python recognition/identification worker
- **Database**: PostgreSQL 16 (container: `trilhas_db`, port 5432)

Workers communicate via message queue (pika/RabbitMQ) and connect to the shared PostgreSQL database. All services are defined in `backend/infra/docker-compose.yml`.

### Frontend

Next.js 15 application with App Router, React 19, TypeScript, and Tailwind CSS v4. Uses Chakra UI and Radix UI component libraries. Form validation with React Hook Form + Zod.

Key pages: home, cadastro (registration), login, page_upload (audio upload), trilha-identificada (identified tracks), validacao (validation workflow).

## Development Commands

### Frontend Development

```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Development

**Start all backend services:**
```bash
cd backend/infra
docker-compose up -d              # Start all services in background
docker-compose logs -f            # Follow logs for all services
docker-compose logs -f api        # Follow logs for specific service
docker-compose ps                 # Check service status
docker-compose down               # Stop all services
```

**Test database connection:**
```bash
cd backend/api
npm install
npm run dev         # Runs test-db.js to verify PostgreSQL connection
```

**Rebuild services after code changes:**
```bash
cd backend/infra
docker-compose up -d --build
```

## Environment Configuration

Backend services use environment variables defined in `backend/infra/.env` (see `.env.example` for template):

- `POSTGRES_HOST`: Database host (default: `db` for Docker network)
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name (default: `trilhas`)

## Key Technical Details

- The API service uses ES modules (`"type": "module"` in package.json)
- Workers use `psycopg2-binary` for database connections and `pika` for message queue operations
- Frontend uses Next.js App Router (not Pages Router)
- Docker services depend on `db` service, ensuring database starts first

## Port Allocations

- Frontend dev server: 3000 (when run outside Docker)
- API service: 3000 (Docker container)
- PostgreSQL: 5432 (exposed from Docker)
