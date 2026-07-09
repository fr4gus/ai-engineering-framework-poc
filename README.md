# AI Engineering Framework (Working Title)

> A framework for building software through specialized AI agents using structured engineering workflows.

## Vision

This project explores whether software engineering can be organized as a deterministic workflow executed by specialized AI agents instead of a single general-purpose assistant.

Rather than asking one model to "build an application", the framework separates responsibilities into distinct engineering roles such as:

- Product Owner
- Engineering Manager
- Planner
- Architect
- Backend Engineer
- Frontend Engineer
- DevOps Engineer
- Tester
- Reviewer

Each role operates within clearly defined boundaries and communicates through standardized artifacts called **Bolts**.

## Why?

Large Language Models are excellent at many software engineering tasks, but they often struggle with:

- Maintaining architectural consistency
- Preserving long-term context
- Separating concerns
- Following repeatable engineering processes

This framework investigates whether assigning specialized responsibilities to individual agents can produce more reliable software development.

## Repository Structure

```text
docs/
framework/
evaluation/
backend/
frontend/
```

## Reference Applications

Current reference applications:

- Binary Puzzle (in development)

Future examples may include:

- Todo Application
- Inventory Management
- E-commerce
- IoT Dashboard

## Current Status

Framework Development

- ✅ Documentation
- ✅ Agent definitions
- ✅ Runtime protocol
- ✅ Prompt library
- ⏳ First execution run

Reference Application

- ⏳ Binary Puzzle MVP
- ✅ BOLT-001 Authentication Core scaffold

## Running the Current App

The repository currently contains the first reference-app implementation slice: the BOLT-001 authentication scaffold.

The backend and frontend can be started locally, but the full browser authentication flow is not completely plug-and-play yet. Manual end-to-end login checks require real Firebase configuration, a running PostgreSQL database, and either a frontend API proxy or backend CORS/API URL configuration.

What is checkable today:

- Backend NestJS app starts and exposes authenticated API routes under `/api/v1`.
- Backend Prisma migration creates the `User` table.
- Frontend Angular app starts and shows the authentication UI scaffold.
- Backend and frontend tests/builds can be run independently.

What is not fully checkable without additional local configuration:

- Complete browser login/register/Google Sign-In flow against the backend.
- Real Firebase ID token validation.
- Full frontend-to-backend API calls from the Angular dev server, because the frontend currently uses `/api/v1` and no Angular proxy or backend CORS setup is configured yet.

### Prerequisites

- Node.js and npm
- PostgreSQL
- Firebase project credentials for real authentication checks

If you do not already have PostgreSQL running, one local option is:

```bash
docker run --name daily-logic-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=daily_logic_challenge \
  -p 5432:5432 \
  -d postgres:16
```

### Backend

From a terminal:

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

The default backend URL is:

```text
http://localhost:3000/api/v1
```

`backend/.env` must contain a valid `DATABASE_URL`. For real Firebase validation, also configure:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Frontend

From a second terminal:

```bash
cd frontend
npm install
npm start
```

The default frontend URL is:

```text
http://localhost:4200
```

Firebase web configuration currently lives in:

```text
frontend/src/environments/environment.development.ts
```

The checked-in values are local placeholders. Replace them locally with real Firebase web app values if you want to manually exercise auth screens.

### Validation Commands

Backend:

```bash
cd backend
npm test
npm run build
```

Frontend:

```bash
cd frontend
npm test
npm run build
```

## Goals

- Deterministic software development
- Reproducible AI experiments
- Model comparison
- Agent specialization
- Educational material
- Research platform

## License

MIT
