# Bolt Template

**Bolt ID:** BOLT-005
**Title:** Database Initialization & Schema
**Type:** Infra
**Complexity:** S
**Status:** Draft

---

# Objective
Provide initial database schema, migrations, and connection management for the application.

---

# Background
All persistent features require a reliable database schema and migrations before implementation.

---

# Scope
- Define schema for users, puzzles, attempts, leaderboard
- Create migration scripts and initial seeds
- Connection pooling and environment-driven config

---

# Out of Scope
- Database scaling & replication strategies

---

# Requirements Covered
- FR-DB-001
- FR-DB-002

---

# Dependencies
- None (foundation for other Bolts)

---

# Acceptance Criteria

## AC-1
Given the project environment variables for DB
When migration scripts are run
Then the database schema is created and migrations exit 0

## AC-2
Given the application starts
When it opens a DB connection
Then connections succeed and health endpoint reports DB healthy

## AC-3
Given initial seed data is applied
When listing required lookup tables
Then expected seeded rows exist (e.g., default admin user optional)

---

# Technical Notes
- Use a migration tool (e.g., TypeORM/NestJS migrations, Prisma, or Flyway)
- Keep migration idempotent and reversible

---

# Risks
- Migration failures can block all other work

---

# Open Questions
- Which DB engine to choose for MVP? (Postgres recommended)

---

# Estimated Effort
S

---

# Notes
Run migrations as part of CI deploy pipeline (BOLT-008)
