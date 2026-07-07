# Immediate Action Plan: Getting Ready for Bolt Execution

**Status:** Framework is 50-60% ready. Must complete Phase 1 blockers.  
**Estimated Time to Readiness:** 8-12 hours  
**Next Step:** Begin Phase 1  

---

## Phase 1: Critical Blockers (Do This First)

### Task 1: Create Bootstrap Bolts
**Owner:** Planner Agent (or Human temporarily)  
**Time:** 4-6 hours  
**Priority:** 🔴 BLOCKER

From `/docs/007-development-plan.md`, decompose features into Bolts:

```
BOLT-001: User Authentication
  - Feature: User registration and login with email/password and Google OAuth
  - Scope: Backend JWT auth + frontend login form
  - Type: Feature
  - Complexity: M (Medium)

BOLT-002: Puzzle Engine
  - Feature: Binary puzzle solver and validator
  - Scope: Core puzzle logic, move validation, completion detection
  - Type: Feature
  - Complexity: M

BOLT-003: API Endpoints - Puzzle Service
  - Feature: REST endpoints for daily puzzle, archive, difficulty levels
  - Scope: /api/v1/puzzles endpoints
  - Type: Feature
  - Complexity: S

BOLT-004: API Endpoints - Attempts & Leaderboard
  - Feature: Save attempts, fetch leaderboard, user statistics
  - Scope: /api/v1/attempts, /api/v1/leaderboard
  - Type: Feature
  - Complexity: M

BOLT-005: Database Initialization
  - Feature: PostgreSQL schema, indexes, seed data
  - Scope: Database schema, migrations, seeding
  - Type: Infrastructure
  - Complexity: S

BOLT-006: Frontend - Authentication UI
  - Feature: Login/registration pages and session management
  - Scope: Authentication components, routing
  - Type: Feature
  - Complexity: S

BOLT-007: Frontend - Puzzle UI
  - Feature: Puzzle board, move input, timer, completion screen
  - Scope: Game components, board rendering
  - Type: Feature
  - Complexity: M

BOLT-008: Deployment Pipeline
  - Feature: GitHub Actions CI/CD, production deployment
  - Scope: Build, test, deploy workflow
  - Type: Infrastructure
  - Complexity: S
```

**Deliverable:** `/docs/bols/BOLT-001.md` through `/docs/bols/BOLT-008.md`  
**Format:** Use `/docs/templates/bolt-template.md` exactly  

**Validation:**
- ✅ Each Bolt has single clear objective
- ✅ Acceptance criteria in Given/When/Then format
- ✅ Scope clearly defined (what's in, what's out)
- ✅ Dependencies identified and non-circular
- ✅ Complexity realistic (no XL Bolts)
- ✅ No overlap between Bolts

---

### Task 2: Enhance Agent Prompts
**Owner:** Document maintainer  
**Time:** 2-3 hours  
**Priority:** 🔴 BLOCKER

For each file in `framework/prompts/`, add these sections:

**Template Enhancement:**

```markdown
# [Agent] Agent Prompt

You are the [Agent] in an AI-driven software engineering system.

---

## REQUIRED READING BEFORE EXECUTION

1. /docs/000-project-charter.md (understand project vision and principles)
2. /docs/013-bolt-specification.md (understand Bolt structure and lifecycle)
3. /docs/012-conventions.md (understand coding standards)
4. /docs/011-agent-contract.md (understand your mandatory contract)
5. [Role-specific docs]:
   - Backend: /docs/005-database.md, /docs/006-api-spec.md
   - Frontend: /docs/003-ui-ux.md, /docs/006-api-spec.md
   - Tester: /docs/008-testing-strategy.md
   - Etc.

---

## YOUR ROLE

[Existing role description]

---

## INPUT: WHAT YOU RECEIVE

You will receive:
- An approved Bolt in /docs/bols/BOLT-XXX.md containing:
  - Objective: single-sentence goal
  - Scope: what's included, what's out
  - Acceptance Criteria: Given/When/Then format
  - Technical Notes: implementation hints
  - Dependencies: other Bolts this depends on
  - Deliverables: expected artifacts

---

## OUTPUT: WHAT YOU MUST PRODUCE

Every task produces:
- [Role-specific deliverables]
- Updated /docs/agents-log.md entry with:
  - Timestamp (UTC ISO 8601)
  - Bolt ID and title
  - Files modified (comma-separated)
  - Summary of work completed
  - Related Requirement IDs
  - Next suggested task

---

## ESCALATION RULES

Stop and escalate via /docs/open-questions.md if:
- Requirements are ambiguous (add question with context)
- Architecture seems inconsistent (reference specific ADR)
- Dependencies are blocking you (reference blocking Bolt ID)
- Tool/environment issues prevent work (describe error)

---

## SUCCESS CRITERIA

Your work is complete when:
- Every acceptance criterion is satisfied
- All tests pass locally
- Code follows /docs/012-conventions.md
- Documentation is updated
- /docs/agents-log.md entry is written
- No open questions remain
```

**For Each Agent, Customize:**
- Backend: Add database schema, API endpoint references
- Frontend: Add component structure, UI/UX guidelines
- Tester: Add test strategy, coverage requirements
- Reviewer: Add code review checklist, architecture rules
- EM: Add Bolt lifecycle states, assignment rules
- Planner: Add decomposition criteria, dependency rules
- Architect: Add approval criteria, constraint rules
- DevOps: Add deployment steps, infrastructure rules

**Files to Update:**
- `/framework/prompts/backend.md`
- `/framework/prompts/frontend.md`
- `/framework/prompts/tester.md`
- `/framework/prompts/reviewer.md`
- `/framework/prompts/engineering-manager.md`
- `/framework/prompts/planner.md`
- `/framework/prompts/architect.md`
- `/framework/prompts/devops.md`

---

### Task 3: Implement Minimal EM Dashboard
**Owner:** DevOps or Backend Agent (or Human)  
**Time:** 2-3 hours for minimal option  
**Priority:** 🔴 BLOCKER

**Option A: Structured Log Format (RECOMMENDED - Fastest)**

Update `/docs/agents-log.md` with YAML front matter:

```markdown
# Agents Log

## Format

Each entry is a YAML block followed by optional commentary.

---
timestamp: 2026-07-04T00:00:00Z
agent: Planning
bolt_id: null
action: initialization
files_modified: []
summary: Initialized repository documentation structure
related_requirements: []
next_task: Create BOLT-001 through BOLT-008
---

Initial framework setup complete.

---
timestamp: 2026-07-06T10:00:00Z
agent: Planner
bolt_id: BOLT-001
action: creation
files_modified: ["docs/bols/BOLT-001.md"]
summary: Created authentication system Bolt spec
related_requirements: ["FR-AUTH-001", "FR-AUTH-002"]
next_task: Architect review and approval of BOLT-001
---
```

**Tools to Create:**
1. YAML parser script to extract Bolt states from log
2. Simple query script: `query-bolts.sh "status=approved"` → returns matching Bolts
3. Status dashboard script that shows:
   - Total Bolts (count by state)
   - Recent activity (last 10 entries)
   - Current blockers (stalled Bolts)
   - Metrics (average cycle time, iterations)

**Location:** `/scripts/bolt-dashboard.sh` or `/scripts/log-parser.py`

**Benefit:** Immediate state visibility with minimal implementation

---

**Option B: JSON State Store (If A isn't sufficient)**

Create `/var/lib/bolt-state.json`:

```json
{
  "bolts": {
    "BOLT-001": {
      "title": "User Authentication",
      "state": "approved",
      "assigned_to": null,
      "created_at": "2026-07-06T10:00:00Z",
      "updated_at": "2026-07-06T10:15:00Z",
      "history": [
        {"state": "draft", "timestamp": "2026-07-06T10:00:00Z", "actor": "Planner"},
        {"state": "approved", "timestamp": "2026-07-06T10:15:00Z", "actor": "Architect"}
      ]
    }
  }
}
```

Plus API endpoints to query/update state.

---

## Phase 1 Summary

**Deliverables:**
✅ 8 Bootstrap Bolts created in `/docs/bols/`  
✅ 8 Enhanced prompts in `/framework/prompts/`  
✅ EM Dashboard operational (minimal structured logs)  

**Total Effort:** 8-12 hours  
**Blocker Status:** All 3 resolved  

---

## Proceed to Phase 1.5: Validation

Once Phase 1 complete, verify:

```
□ BOLT-001 ready for assignment to Backend Agent
□ Backend prompt references /docs/006-api-spec.md
□ Tester knows acceptance criteria for BOLT-001
□ Reviewer has approval criteria for BOLT-001
□ EM Dashboard shows all Bolts and their states
□ First handoff (Planner → Architect) tested
```

---

## Then Phase 2: High-Priority Gaps

After Phase 1 and validation, complete:

4. Document Handoff Protocol (2-3 hours)
5. First Bolt Bootstrap Guide (1-2 hours)
6. Execution Environment Specification (1-2 hours)
7. Structured Logging Format (2-3 hours)

---

## Decision: Ready to Begin?

**Recommendation:**

🟢 **YES, proceed with Phase 1 immediately**

The framework design is solid. The gaps are operational, not conceptual. Completing Phase 1 will unlock full Bolt execution capability.

Start with: **Create BOLT-001 through BOLT-008**
