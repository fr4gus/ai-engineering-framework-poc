# Daily Logic Challenge

# Deployment Specification

**Document ID:** DEPLOY-001  
**Version:** 1.0.0  
**Status:** Approved  
**Owner:** DevOps + Engineering Systems Team  

---

# 1. Purpose

This document defines how the Daily Logic Challenge system is built, run, deployed, and operated across environments.

It covers:

- Local development setup
- Environment configuration
- Backend deployment
- Frontend deployment
- Database provisioning
- Firebase integration
- CI/CD pipeline
- Production readiness model

---

# 2. Deployment Principles

## DEPLOY-PRINCIPLE-001

Local development must mirror production behavior as closely as possible.

---

## DEPLOY-PRINCIPLE-002

All configuration must be environment-based.

No hardcoded secrets are allowed.

---

## DEPLOY-PRINCIPLE-003

Frontend, backend, and database must be independently deployable.

---

## DEPLOY-PRINCIPLE-004

Every deployment must be reproducible.

---

## DEPLOY-PRINCIPLE-005

Agents must be able to simulate production locally.

---

# 3. System Architecture (Deployment View)

```mermaid
flowchart TD

Browser --> Frontend
Frontend --> Backend
Backend --> PostgreSQL
Backend --> FirebaseAuth
Backend --> Redis[(Optional Cache)]

CI --> Frontend
CI --> Backend
CI --> Tests
```

---

# 4. Environments

---

## 4.1 Local

Used for:

- development
- agent execution
- testing
- debugging

### Services

- Angular dev server
- NestJS server
- Local PostgreSQL (Docker)
- Firebase Emulator (optional)

---

## 4.2 Staging

Used for:

- integration testing
- QA validation
- Bolt verification before production

---

## 4.3 Production

Used for:

- real users
- leaderboard
- daily puzzle scheduling

---

# 5. Local Development Setup

---

## 5.1 Requirements

- Node.js LTS
- Docker + Docker Compose
- PostgreSQL (via Docker)
- Firebase project
- Angular CLI
- NestJS CLI

---

## 5.2 Startup Flow

```mermaid
sequenceDiagram

Developer->>Docker: Start PostgreSQL
Developer->>Backend: npm run start:dev
Developer->>Frontend: ng serve
Frontend->>Backend: API requests
Backend->>PostgreSQL: DB operations
Backend->>Firebase: Auth validation
```

---

## 5.3 Docker Services

```yaml
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: dlc
      POSTGRES_USER: dlc_user
      POSTGRES_PASSWORD: dlc_pass
    ports:
      - "5432:5432"
```

---

# 6. Environment Variables

---

## Backend

```env
DATABASE_URL=postgresql://dlc_user:dlc_pass@localhost:5432/dlc
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_key
FIREBASE_CLIENT_EMAIL=your_email
NODE_ENV=development
```

---

## Frontend

```env
API_URL=http://localhost:3000/api/v1
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
```

---

# 7. Firebase Setup

---

## DEPLOY-FB-001

Firebase is used only for:

- Authentication
  - Google Sign-In
  - Email/Password

---

## DEPLOY-FB-002

Backend is responsible for:

- validating Firebase tokens
- mapping Firebase UID → internal User

---

## DEPLOY-FB-003

No game data is stored in Firebase.

---

# 8. Backend Deployment

---

## Stack

- NestJS
- Node.js
- Prisma
- PostgreSQL

---

## Build Steps

```bash
npm install
npm run build
npm run start:prod
```

---

## Runtime Responsibilities

- API serving
- game logic execution
- database access
- leaderboard updates
- statistics aggregation

---

# 9. Frontend Deployment

---

## Stack

- Angular (standalone components)
- TypeScript

---

## Build Steps

```bash
ng build --configuration production
```

---

## Hosting Options

- Firebase Hosting (recommended for simplicity)
- Nginx static hosting
- Vercel (optional alternative)

---

# 10. Database Deployment

---

## PostgreSQL Strategy

- Single primary database (MVP)
- Docker-based local dev
- Managed DB in production (recommended: Supabase / Neon / RDS)

---

## Migration Strategy

```bash
npx prisma migrate deploy
```

---

## Seeding

Only allowed in:

- local
- staging

Never in production.

---

# 11. CI/CD Pipeline

---

## Pipeline Stages

```mermaid
flowchart TD

Commit --> Lint
Lint --> Test
Test --> Build
Build --> Deploy_Staging
Deploy_Staging --> E2E
E2E --> Deploy_Production
```

---

## Rules

## DEPLOY-CI-001

No deployment without passing tests.

---

## DEPLOY-CI-002

Staging must pass before production deployment.

---

## DEPLOY-CI-003

Failed E2E blocks release.

---

# 12. Build Artifacts

---

## Backend

- compiled JS
- Prisma client
- migration files

---

## Frontend

- static bundle
- assets
- environment config

---

# 13. Release Strategy

---

## Strategy: Continuous Deployment (Controlled)

- Feature merged → staging deploy
- Validated Bolt → production deploy
- Rollback supported per release

---

# 14. Rollback Strategy

---

## DEPLOY-ROLLBACK-001

All deployments must be reversible.

---

## DEPLOY-ROLLBACK-002

Database migrations must be backward compatible where possible.

---

# 15. Observability (Future MVP+)

Planned additions:

- logging system
- error tracking (Sentry)
- performance monitoring
- leaderboard anomaly detection

---

# 16. Security Model

---

## DEPLOY-SEC-001

All secrets must be stored in environment variables.

---

## DEPLOY-SEC-002

Firebase private keys must never be exposed to frontend.

---

## DEPLOY-SEC-003

API must validate all inputs.

---

# 17. Agent Deployment Rules

---

## DEPLOY-AGENT-001

Agents must not assume production behavior differs from local unless explicitly defined.

---

## DEPLOY-AGENT-002

Any deployment-related change must be logged in:

```
docs/agents-log.md
```

---

## DEPLOY-AGENT-003

Agents must validate deployment impact before modifying:

- database schema
- authentication flow
- leaderboard logic

---

# 18. Production Readiness Checklist

A system is considered production-ready when:

- [ ] All Bolts completed
- [ ] All tests passing
- [ ] CI/CD pipeline active
- [ ] Firebase configured
- [ ] Database migrations stable
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] Leaderboard functional
- [ ] Statistics updating correctly

---

# 19. Future Enhancements

- Kubernetes deployment
- autoscaling backend
- Redis caching layer
- real-time leaderboard updates
- feature flag system
- canary deployments

---

# 20. System Philosophy

Deployment is not the end of development.

It is the **transition point between agent execution and real-world validation**.

---

# End of Deployment Specification
