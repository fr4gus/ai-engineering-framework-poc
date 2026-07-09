# Traceability Matrix

**Document ID:** TRACE-001  
**Version:** 1.0.0  
**Status:** Approved  
**Owner:** Engineering Manager  

---

# 1. Purpose

This matrix connects product intent, user stories, functional requirements, business rules, acceptance criteria, supporting specifications, and planned Bolts.

It is the baseline traceability artifact for the first Bolt execution run.

---

# 2. MVP Feature Traceability

| Area | User Stories | Functional Requirements | Business Rules | Acceptance Criteria | Supporting Specs | Planned Feature / Bolt |
|------|--------------|-------------------------|----------------|---------------------|------------------|------------------------|
| Authentication | US-001, US-002, US-003 | FR-AUTH-001 through FR-AUTH-006 | BR-010 | AC-001 through AC-004 | PRD, API, Data, Deployment, UI/UX | FEATURE-001 / BOLT-001 |
| Guest Play & Daily Puzzle | US-004, US-005 | FR-GAME-001 through FR-GAME-005, FR-GAME-007 through FR-GAME-009 | BR-001 through BR-004, BR-008, BR-010 | AC-005 through AC-008 | PRD, Game Design, API, Data, Architecture | FEATURE-002, FEATURE-003 / BOLT-002, BOLT-003 |
| Replay & Archive | US-006, US-009 | FR-GAME-006, FR-GAME-010, FR-ARCHIVE-001, FR-ARCHIVE-002 | BR-006, BR-009, BR-010 | AC-009, AC-013, AC-014 | PRD, Game Design, API, Data, UI/UX | FEATURE-002, FEATURE-003, FEATURE-006 / BOLT-002, BOLT-003, BOLT-006 |
| Leaderboard | US-007 | FR-LEADERBOARD-001 through FR-LEADERBOARD-004 | BR-007, BR-008, BR-009, BR-010 | AC-010 through AC-012 | PRD, Game Design, API, Data | FEATURE-005 / BOLT-005 |
| Statistics & Streaks | US-008, US-010 | FR-STATS-001 through FR-STATS-003 | BR-006, BR-010 | AC-015, AC-016 | PRD, API, Data, Game Design | FEATURE-004 / BOLT-004 |
| Frontend Experience | US-001 through US-010 | NFR-UX-001 through NFR-UX-004, NFR-A11Y-001 through NFR-A11Y-003 | BR-005 | AC-001 through AC-016 | UI/UX, Game Design, API | FEATURE-006 / BOLT-006 |
| Deployment & Operations | G-001, G-003 | NFR-PERF-001 through NFR-PERF-004, NFR-REL-001 through NFR-REL-003, NFR-SEC-001 through NFR-SEC-004, NFR-MNT-001 through NFR-MNT-003, NFR-SCL-001, NFR-SCL-002 | BR-010 | MVP Deliverables | Deployment, Architecture, Testing Strategy | FEATURE-007 / BOLT-007 |

---

# 3. Bolt Coverage

| Bolt | Scope | Primary Requirements Covered | Required Validation |
|------|-------|------------------------------|---------------------|
| BOLT-001 | Authentication Core | FR-AUTH-001 through FR-AUTH-006, NFR-SEC-001 through NFR-SEC-004 | Auth unit/integration tests, Firebase token validation, protected route checks |
| BOLT-002 | Puzzle Infrastructure | FR-GAME-003, FR-GAME-004, FR-GAME-008, FR-GAME-009, BR-001 through BR-004 | Puzzle retrieval tests, DailyPuzzle uniqueness tests, archive retrieval tests |
| BOLT-003 | Gameplay Engine Core | FR-GAME-001, FR-GAME-002, FR-GAME-005 through FR-GAME-010, BR-008, BR-010 | Puzzle rule unit tests, attempt lifecycle integration tests, deterministic completion tests |
| BOLT-004 | Statistics Engine | FR-STATS-001 through FR-STATS-003, BR-006, BR-010 | Statistics update tests, streak calculation tests, archive statistics tests |
| BOLT-005 | Leaderboard System | FR-LEADERBOARD-001 through FR-LEADERBOARD-004, BR-007 through BR-009 | Ranking tests, best-score tests, guest exclusion tests |
| BOLT-006 | Frontend Game UI | NFR-UX-001 through NFR-UX-004, NFR-A11Y-001 through NFR-A11Y-003, AC-001 through AC-016 | Component tests, API integration tests, keyboard/accessibility checks, E2E user flow |
| BOLT-007 | Deployment & Operational Readiness | NFR-PERF-001 through NFR-PERF-004, NFR-REL-001 through NFR-REL-003, NFR-MNT-001, MVP production deployment | Build validation, CI checks, deployment report, environment verification |

---

# 4. Documentation Coverage

| Document | Covers |
|----------|--------|
| docs/001-prd.md | Product goals, stories, requirements, business rules, acceptance criteria |
| docs/002-game-design.md | Gameplay rules, scoring, replay, archive, completion behavior |
| docs/003-ui-ux.md | Screens, navigation, responsive behavior, accessibility expectations |
| docs/004-architecture.md | System structure, module ownership, layering, security boundaries |
| docs/005-database.md | Domain entities, persistence rules, aggregation strategy |
| docs/006-api-spec.md | REST contract, authentication model, attempt lifecycle, leaderboard and stats endpoints |
| docs/007-development-plan.md | Feature slices, Bolt plan, dependencies, execution strategy |
| docs/008-testing-strategy.md | Test pyramid, required test types, acceptance validation |
| docs/010-deployment.md | Local setup, CI/CD, deployment, environment, security, production readiness |

---

# 5. Traceability Rules

- Every implementation Bolt must reference at least one requirement ID or business rule.
- Every requirement must map to at least one supporting document and one planned Bolt before implementation starts.
- Any requirement without test coverage must be documented as a test gap in the relevant test report.
- Any change to product, API, data, architecture, or deployment behavior must update this matrix.
