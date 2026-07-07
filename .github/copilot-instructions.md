# Copilot Instructions for AI Engineering Framework

This repository contains an **AI Engineering Framework** for building software through specialized AI agents using structured engineering workflows, plus a reference application (Binary Puzzle) being developed as a case study.

## Project Overview

- **Purpose:** Explore deterministic software development through specialized AI agents assigned distinct engineering roles
- **Architecture Style:** Modular Monolith (frontend + backend + database + authentication)
- **Reference App:** Binary Puzzle (MVP in development with authentication, puzzle engine, leaderboard, profile, statistics)
- **Key Innovation:** Structured workflow where work flows exclusively through "Bolts" (standardized work units)

## Build, Test, and Lint Commands

This project is currently in the framework/documentation phase with no production application build yet. When the Binary Puzzle reference application is implemented:

- Expected tech stack: TypeScript, Angular (frontend), NestJS or similar (backend)
- Tests will follow unit/integration/E2E pattern
- Commands will be documented in their respective subdirectories

For now, documentation verification is the primary "build":
- **Verify documentation structure:** All changes require updates to `/docs` with proper traceability

## High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│              AI Engineering Framework            │
├─────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐   │
│  │  Framework Layer                         │   │
│  │  • Agent definitions & contracts         │   │
│  │  • Workflow specification (Bolt cycle)   │   │
│  │  • Runtime protocol & templates          │   │
│  │  • Prompt library                        │   │
│  └──────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐   │
│  │  Reference Application (Binary Puzzle)   │   │
│  │  Frontend → Backend → Database           │   │
│  │  • Authentication (Google OAuth)         │   │
│  │  • Puzzle Engine & Gameplay              │   │
│  │  • Leaderboard & Statistics              │   │
│  └──────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐   │
│  │  Evaluation Framework                    │   │
│  │  • Reproducible AI experiment runs       │   │
│  │  • Success metrics & run manifests       │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Core Concepts

1. **Bolt**: A standardized work unit that contains:
   - Input requirements
   - Specification
   - Owner role
   - Output deliverables
   - Success criteria

2. **Agent Roles**: Each has a specific responsibility within the workflow:
   - **Product Owner**: Defines requirements and features
   - **Planner**: Decomposes work into Bolts
   - **Architect**: Validates technical feasibility and consistency
   - **Backend/Frontend/DevOps Engineers**: Implement the Bolt
   - **Tester**: Validates implementation
   - **Reviewer**: Ensures quality and compliance

3. **Workflow**: Requirements → Planner → Bolt (Draft) → Architect (Approved) → Implementation → Testing → Review → Closure

## Key Conventions

### Repository Organization

```
docs/               # All documentation with proper metadata
├── adr/            # Architectural Decision Records
├── agents/         # Agent role definitions
├── bols/           # Bolt specifications and templates
└── templates/      # Workflow templates

framework/          # Framework-specific code/prompts
├── prompts/        # Prompt library for agents

evaluation/         # Evaluation and metrics

reference-apps/     # (Future) Reference applications will have:
├── frontend/       # Angular, feature-first organization
├── backend/        # NestJS/Node, feature-first organization
└── tools/          # Shared tooling
```

### Naming Conventions

**Files:** `kebab-case`
- Examples: `leaderboard.service.ts`, `daily-puzzle.component.ts`

**Classes:** `PascalCase`
- Examples: `LeaderboardService`, `PuzzleValidator`

**Variables:** `camelCase`
- Example: `moveCount`, `completionTime`

**Constants:** `UPPER_SNAKE_CASE`
- Examples: `MAX_BOARD_SIZE`, `DEFAULT_TIMEOUT`

**Interfaces:** Descriptive `PascalCase` (no `I` prefix)
- Examples: `Puzzle`, `LeaderboardEntry`, `GameAttempt`

**Enums:** `PascalCase`
- Examples: `Difficulty`, `GameState`, `AttemptStatus`

**Document IDs:** Pattern like `FR-GAME-001`, `US-005`, `ARCH-001`, `TASK-021`, `TEST-014`

### TypeScript/Angular Conventions

- Enable `strict` mode
- Avoid `any` types
- Explicit return types for exported functions
- Favor immutable data
- Use **standalone components** (unless justified otherwise)
- **Feature-first folder organization** (one feature per folder)
- Keep components presentation-focused; place reusable logic in services
- Use route-based lazy loading for feature areas
- No business rules in components

### Backend Conventions

- Controllers: HTTP concerns only
- Services: Application logic
- Domain layer: Framework-independent business rules
- Data access: Isolated from business logic
- All external input: Validated

### API Conventions

- RESTful endpoints
- Version using `/api/v1`
- JSON request/response bodies
- Consistent error format
- UTC timestamps in ISO-8601 format

Example: `GET /api/v1/puzzles/today`

### Database Conventions

- Singular table names
- Primary key: `id`
- Foreign keys: `<entity>_id`
- UTC timestamps
- Include `created_at` and `updated_at` in all persistent entities

### Git Conventions

**Branches:** Use feature/bugfix/docs/refactor prefixes
```
feature/authentication
feature/gameplay
bugfix/leaderboard
docs/prd
refactor/statistics
```

**Commit Messages:** Format as `type(scope): summary`
```
feat(gameplay): implement move validation
fix(auth): correct JWT expiration
docs(prd): add business rules
test(api): add leaderboard integration tests
```

Allowed types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`

### Documentation Standards

Every document in `/docs` requires:
- **Title**
- **Document ID** (e.g., `ARCH-001`, `CONV-001`)
- **Version**
- **Status** (Draft, Approved, Active, Superseded)
- **Owner**

All documentation should be traceable to a requirement or task. Use Mermaid diagrams for:
- Workflows → `flowchart`
- State machines → `stateDiagram-v2`
- API interactions → `sequenceDiagram`
- Architecture → `graph TD`
- Database schemas → `erDiagram`
- Deployment → `graph LR`

### Agent Contract Requirements

**Every agent task must:**

1. Follow the **Definition of Done**:
   - Code builds successfully (when applicable)
   - Tests pass
   - Documentation is updated
   - Traceability is maintained (requirement/task ID included)
   - Related ADRs are updated if needed
   - `docs/agents-log.md` is updated with task summary

2. Update `docs/agents-log.md` with:
   - Timestamp (UTC)
   - Agent name
   - Files modified
   - Summary
   - Related Requirement IDs
   - Next suggested task

3. Respect role boundaries:
   - Read only what your role permits
   - Modify only assigned components
   - Escalate open questions to `docs/open-questions.md`
   - Stop work if blocked without escalating

### General Principles

- **Favor simplicity over cleverness**
- **Code should be self-documenting whenever practical**
- **Business rules belong in the backend domain layer**
- **UI components should be as stateless as practical**
- **Avoid duplication (DRY principle)**
- **Prefer composition over inheritance**
- **Every change must be traceable to a requirement, user story, ADR, or task**

## Architecture Decisions

Key architectural choices (see `/docs/adr/` for detailed rationale):

- **Modular Monolith** chosen over microservices for MVP due to lower complexity, easier deployment, and simpler local development
- **Frontend + Backend separation** keeps business rules server-side
- **Google OAuth** for authentication to reduce complexity
- **Feature-first folder organization** to enable independent feature development

## Special Files to Know

- `/docs/012-conventions.md` — Comprehensive development conventions
- `/docs/004-architecture.md` — Software architecture details
- `/docs/011-agent-contract.md` — Mandatory contract all agents must follow
- `/docs/009-agent-workflow.md` — End-to-end Bolt execution workflow
- `/docs/agents-log.md` — Log of all agent tasks (update when completing work)
- `/docs/open-questions.md` — Questions requiring human resolution
- `/evaluation/framework.md` — Framework for evaluating AI runs
- `ROADMAP.md` — Project phases and status
