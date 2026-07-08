# Daily Logic Challenge

# Development Conventions

**Document ID:** CONV-001

**Version:** 1.0.0

**Status:** Approved

**Owner:** Architecture Team

---

# 1. Purpose

This document defines the conventions used throughout the Daily Logic Challenge project.

Its objectives are to:

* Maintain consistency across the codebase.
* Reduce ambiguity for contributors.
* Enable effective collaboration between human developers and AI agents.
* Ensure documentation and source code evolve together.

All contributors should read this document before modifying the repository.

---

# 2. General Principles

## CONV-GEN-001

Favor simplicity over cleverness.

---

## CONV-GEN-002

Code should be self-documenting whenever practical.

---

## CONV-GEN-003

Business rules belong in the backend domain layer.

---

## CONV-GEN-004

UI components should remain as stateless as practical.

---

## CONV-GEN-005

Avoid duplication.

Follow the DRY (Don't Repeat Yourself) principle.

---

## CONV-GEN-006

Prefer composition over inheritance.

---

## CONV-GEN-007

Every change should be traceable to at least one Requirement ID, User Story, ADR, or task.

---

# 3. Repository Structure

```text
/docs
/frontend
/backend
/tools
```

Each top-level directory has a single responsibility.

---

# 4. Folder Organization

## Frontend

Feature-first organization.

Example:

```text
frontend/src/app/

authentication/
play/
leaderboard/
statistics/
archive/
profile/
shared/
core/
```

---

## Backend

Feature-first organization.

Example:

```text
backend/src/

authentication/
users/
puzzles/
gameplay/
attempts/
leaderboard/
statistics/
archive/
common/
```

---

# 5. Naming Conventions

## Files

Use **kebab-case**.

Example:

```
leaderboard.service.ts
daily-puzzle.component.ts
```

---

## Classes

Use **PascalCase**.

Example:

```
LeaderboardService
PuzzleValidator
```

---

## Variables

Use **camelCase**.

Example:

```
moveCount
completionTime
```

---

## Constants

Use **UPPER_SNAKE_CASE**.

Example:

```
MAX_BOARD_SIZE
DEFAULT_TIMEOUT
```

---

## Interfaces

Prefix with `I` only if the project explicitly adopts that style. Otherwise, use descriptive PascalCase names.

Preferred:

```
Puzzle
LeaderboardEntry
GameAttempt
```

---

## Enums

Use PascalCase.

Example:

```
Difficulty
GameState
AttemptStatus
```

---

# 6. TypeScript Guidelines

* Enable `strict` mode.
* Avoid `any`.
* Prefer explicit return types for exported functions.
* Favor immutable data where practical.
* Keep functions focused on a single responsibility.

---

# 7. Angular Conventions

* Use standalone components (unless a strong reason exists not to).
* One feature per folder.
* Keep components focused on presentation.
* Place reusable logic in services.
* Avoid business rules inside components.
* Use route-based lazy loading for feature areas.

---

# 8. Backend Conventions

* Controllers handle HTTP concerns only.
* Services contain application logic.
* Domain logic remains framework-independent where practical.
* Data access is isolated from business logic.
* Validate all external input.

---

# 9. API Conventions

* RESTful endpoints.
* Version endpoints using `/api/v1`.
* JSON request and response bodies.
* Consistent error format.
* UTC timestamps using ISO-8601.

Example:

```
GET /api/v1/puzzles/today
```

---

# 10. Database Conventions

* Singular table names.
* Primary key: `id`.
* Foreign keys: `<entity>_id`.
* UTC timestamps.
* Include `created_at` and `updated_at` in all persistent entities.

Soft deletes are not part of the MVP unless explicitly required.

---

# 11. Git Conventions

## Branches

Implementation work for a Bolt must use the Bolt Branch recorded in the Bolt specification.

The Bolt Branch name must match the Bolt Name.

The Bolt Name must be safe for use as a git branch. Use the human-readable Title for prose.

Examples:

```
BOLT-001-game-shell
BOLT-002-authentication-flow
BOLT-003-leaderboard-api
```

Generic branch prefixes such as `feature/`, `bugfix/`, `docs/`, and `refactor/` are reserved for non-Bolt repository maintenance only.

All code, tests, prompts, documentation, and configuration changes for a Bolt must remain on its Bolt Branch until the Engineering Manager creates the pull request after acceptance.

---

## Commit Messages

Format:

```
type(scope): summary
```

Examples:

```
feat(gameplay): implement move validation

fix(auth): correct JWT expiration

docs(prd): add business rules

test(api): add leaderboard integration tests
```

Allowed types:

* feat
* fix
* docs
* refactor
* test
* chore
* ci

---

# 12. Documentation Conventions

All documentation resides under `/docs`.

Each document shall include:

* Title
* Document ID
* Version
* Status
* Owner
* References (when applicable)

---

## Requirement IDs

Examples:

```
US-001
FR-GAME-001
BR-004
NFR-SEC-001
ADR-002
TASK-017
TEST-014
```

---

# 13. Mermaid Conventions

Use Mermaid whenever diagrams improve understanding.

Preferred diagram types:

| Purpose        | Mermaid         |
| -------------- | --------------- |
| Navigation     | flowchart       |
| State Machines | stateDiagram-v2 |
| API Calls      | sequenceDiagram |
| Architecture   | graph TD        |
| Database       | erDiagram       |
| Deployment     | graph LR        |

Small diagrams should be embedded directly in Markdown.

Large or shared diagrams should be stored under:

```
docs/diagrams/
```

using the `.mmd` extension.

---

# 14. Logging Conventions

Every completed agent task shall append an entry to:

```
docs/agents-log.md
```

Each entry includes:

* Timestamp (UTC)
* Agent Name
* Files Modified
* Summary
* Related Requirement IDs
* Next Suggested Task

---

# 15. Open Questions

When an agent cannot resolve an issue without human input, it shall:

1. Stop work on the affected task.
2. Record the question in `docs/open-questions.md`.
3. Continue unrelated work where possible.

---

# 16. Decision Records

Architectural decisions shall be recorded as ADRs under:

```
docs/adr/
```

The architecture document references ADRs but does not duplicate their rationale.

---

# 17. Testing Conventions

Every functional requirement should be traceable to one or more test cases.

Tests should be organized as:

* Unit
* Integration
* End-to-End

---

# 18. Traceability

Requirements, user stories, ADRs, implementation tasks, commits, and test cases should remain traceable.

Example flow:

```
US-005
   ↓
FR-GAME-003
   ↓
TASK-021
   ↓
Commit
   ↓
TEST-014
```

---

# 19. Definition of Done

A task is complete only when:

* Code builds successfully.
* Tests pass.
* Documentation is updated.
* Traceability is maintained.
* Bolt changes are contained on the recorded Bolt Branch.
* Relevant ADRs are updated if needed.
* `agents-log.md` has been updated.

---

# 20. Future Updates

This document is expected to evolve.

Changes shall be reviewed before adoption to ensure consistency across the repository.

---

# End of Development Conventions
