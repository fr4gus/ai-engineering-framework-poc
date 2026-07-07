# Bolt Planning Skill - Invocation Guide

## Quick Start

To invoke the bolt-planning skill and start planning Bolts:

```bash
# From the puzzle_game repository root:
copilot /bolt-planning

# Or specify a mode:
copilot /bolt-planning bootstrap    # Plan BOLT-001 through BOLT-008
copilot /bolt-planning next         # Plan the next unplanned Bolt
```

---

## Workflow: How the Skill Works

### Phase 1: Analyze Current State

The skill begins by analyzing what currently exists:

```
ANALYSIS:
├── Check /docs/bols/ for existing Bolts
├── Query /docs/007-development-plan.md for features
├── Review /docs/001-prd.md for requirements
├── Identify dependencies and blockers
└── Determine the next Bolt(s) to plan
```

**Output Example:**
```
📊 CURRENT STATE ANALYSIS
═══════════════════════════════════════════════════════
Existing Bolts:            0 (empty /docs/bols/)
Features in Development Plan: 8
  - User Authentication
  - Puzzle Engine
  - API Endpoints - Puzzle Service
  - API Endpoints - Attempts & Leaderboard
  - Database Initialization
  - Frontend - Authentication UI
  - Frontend - Puzzle UI
  - Deployment Pipeline

Status:                     BOOTSTRAP MODE (planning from scratch)
Next Action:               Create BOLT-001 through BOLT-008
Estimated Complexity:      High (8 Bolts, multiple dependencies)
Recommended Approach:      Sequential bootstrap planning
═══════════════════════════════════════════════════════
```

### Phase 2: Invoke Planner Agent

The Planner Agent receives detailed context and instructions:

**Planner Instructions:**
```
You are the Planner Agent in bootstrap mode.

CONTEXT:
- Project: Binary Logic Challenge
- Development Plan: 8 Features requiring decomposition
- Reference: /docs/007-development-plan.md

YOUR TASK:
1. Read the development plan carefully
2. For each feature, create a comprehensive Bolt specification
3. Include: Objective, Scope, Acceptance Criteria, Complexity, Dependencies
4. Ensure no circular dependencies
5. Verify each Bolt follows /docs/013-bolt-specification.md structure
6. Identify risks and technical notes

OUTPUT FORMAT:
Each Bolt should be a complete markdown file following:
/docs/templates/bolt-template.md

DELIVERABLE:
8 Bolt specifications (BOLT-001 through BOLT-008)
Each with complete metadata and acceptance criteria

CONSTRAINTS:
- No Bolt complexity should exceed "L" (split if needed)
- All acceptance criteria must be testable (Given/When/Then)
- Dependencies must form an acyclic graph
- No ambiguity - if unclear, flag as open question
```

**Planner Output Example:**
```
✅ PLANNER OUTPUT
═══════════════════════════════════════════════════════

Bolt ID:           BOLT-001
Title:             User Authentication System
Type:              Feature
Complexity:        Medium

Objective:
Implement JWT-based authentication for user registration and login
with support for email/password and Google OAuth.

Scope:
- Backend JWT generation and validation
- Frontend login/registration components
- Session management
- Password hashing with bcrypt

Acceptance Criteria:
  AC-1: Given a new user registration request
        When user provides valid email and password
        Then system creates account with hashed password and returns JWT

  AC-2: Given a login request
        When user provides valid credentials
        Then system returns valid JWT with 24-hour expiration

  AC-3: Given an authenticated request
        When Authorization header contains valid JWT
        Then system validates and permits access

Dependencies:
  - Database initialized (required for user table)

Technical Notes:
- Use bcrypt for password hashing
- JWT algorithm: HS256
- Token expiration: 24 hours
- Reference: /docs/006-api-spec.md for /auth endpoints

Risks:
- Password security critical
- JWT secret management important
- Google OAuth integration complexity

Open Questions:
- Should we implement refresh tokens?
- What is max password length?

Related Requirements:
- FR-AUTH-001, FR-AUTH-002, FR-AUTH-003
```

### Phase 3: Invoke Engineering Manager Agent

The EM Agent receives the Planner's work for validation:

**EM Instructions:**
```
You are the Engineering Manager.

ROLE: Validate that Planner's Bolts are executable and complete.

CONTEXT:
Planner has created 8 Bolt specifications for bootstrap planning.

YOUR TASK:
1. Review each Bolt specification for:
   ✓ Clarity and completeness
   ✓ Feasibility (can agents actually execute this?)
   ✓ Scope boundaries (nothing ambiguous)
   ✓ Acceptance criteria testability
   ✓ Dependency correctness (no circular, correct order)
   ✓ Complexity realistic (no XL Bolts)

2. For each Bolt, decide: APPROVED or NEEDS CLARIFICATION

3. If NEEDS CLARIFICATION:
   - List specific questions
   - Suggest improvements
   - Request Planner rework

4. If all APPROVED:
   - Confirm ready for implementation assignment
   - Note any special considerations
   - Suggest execution order

OUTPUT FORMAT:
Structured approval report with decision for each Bolt
```

**EM Output Example:**
```
✅ ENGINEERING MANAGER VALIDATION
═══════════════════════════════════════════════════════

BOLT-001 (Authentication): ✅ APPROVED
  - Scope is clear and complete
  - Acceptance criteria are testable
  - Dependencies identified correctly
  - Complexity (M) is realistic
  - Ready for Backend assignment

BOLT-002 (Puzzle Engine): ✅ APPROVED
  - Core logic well-scoped
  - AC covers move validation and completion
  - No blockers
  - Complexity (M) appropriate for feature size

BOLT-003 (API Endpoints - Puzzle): ✅ APPROVED
  - Depends on BOLT-002 (correct)
  - Scope limited to puzzle endpoints only
  - All AC testable
  - Ready after BOLT-002 complete

BOLT-004 (API - Attempts): ✅ NEEDS CLARIFICATION
  - Q1: Should leaderboard updates be in this Bolt or separate?
  - Q2: What is max attempts history per user?
  - Suggest: Split into BOLT-004a (Attempts) and BOLT-004b (Leaderboard)

BOLT-005 (Database): ⚠️  DEPENDENCY NOTE
  - Move this to FIRST position (before BOLT-001)
  - All other Bolts depend on database schema
  - All others: Approved

OVERALL STATUS: 8 BOLTS → READY FOR EXECUTION
Suggested Order:
  1. BOLT-005 (Database)
  2. BOLT-001 (Authentication)
  3. BOLT-002 (Puzzle Engine)
  4. BOLT-003 (API - Puzzles)
  5. BOLT-004 (API - Attempts)
  6. BOLT-006 (Frontend - Auth)
  7. BOLT-007 (Frontend - Puzzle)
  8. BOLT-008 (Deployment)

Next Action: Begin execution phase
═══════════════════════════════════════════════════════
```

### Phase 4: Store and Track Results

The skill saves approved Bolts and updates the project:

**Files Created:**
```
/docs/bols/BOLT-001.md  (Authentication System)
/docs/bols/BOLT-002.md  (Puzzle Engine)
/docs/bols/BOLT-003.md  (API - Puzzles)
/docs/bols/BOLT-004.md  (API - Attempts & Leaderboard)
/docs/bols/BOLT-005.md  (Database Initialization)
/docs/bols/BOLT-006.md  (Frontend - Authentication)
/docs/bols/BOLT-007.md  (Frontend - Puzzle UI)
/docs/bols/BOLT-008.md  (Deployment Pipeline)
```

**Updated Logs:**
```
/docs/agents-log.md - Entry added:
─────────────────────────────────────
timestamp: 2026-07-06T20:30:00Z
agent: Planner + Engineering Manager (bolt-planning skill)
bolt_id: BOLT-001 through BOLT-008
action: bootstrap_planning_complete
files_modified: [docs/bols/BOLT-001.md, ..., docs/bols/BOLT-008.md]
summary: Created and approved bootstrap Bolts for Binary Logic Challenge MVP
related_requirements: [FR-*, NFR-*]
next_task: Enhance agent prompts and begin execution assignment
─────────────────────────────────────
```

**Updated Status:**
```
Phase 1 Progress:
┌─────────────────────────────────────┐
│ Phase 1: Critical Blockers          │
├─────────────────────────────────────┤
│ ✅ Create Bootstrap Bolts           │
│ ⏳ Enhance Agent Prompts            │
│ ⏳ Implement EM Dashboard           │
└─────────────────────────────────────┘

Ready for:
- Task 2: Enhance prompts with Bolt examples
- Task 3: Implement dashboard to track Bolt states
```

---

## Usage Modes

### Mode 1: Bootstrap (Default)

```bash
copilot /bolt-planning bootstrap
```

**Behavior:**
- Analyzes empty /docs/bols/
- Plans BOLT-001 through BOLT-008 from development plan
- Creates all bootstrap Bolts in one workflow
- Produces 8 approved, ready-to-execute Bolts

**Best for:** Starting fresh, initial MVP planning

---

### Mode 2: Next (Sequential)

```bash
copilot /bolt-planning next
```

**Behavior:**
- Checks which Bolts are already Closed
- Identifies next unplanned dependencies
- Plans the next set of Bolts only
- Updates existing Bolts without recreating

**Best for:** Continuing after bootstrap, iterative planning

---

### Mode 3: Feature-Specific

```bash
copilot /bolt-planning feature:leaderboard
```

**Behavior:**
- Searches PRD for feature by name
- Plans only Bolts related to that feature
- Identifies dependencies on other features
- Creates subset of Bolts

**Best for:** Feature-focused planning, refactoring

---

## Expected Outcomes

### After Successful Execution

✅ **Bolts Created:**
- 8 complete, approved Bolt specifications
- Stored in `/docs/bols/BOLT-XXX.md`
- Each follows template exactly
- All dependencies verified (acyclic)

✅ **Planners Validated:**
- EM reviewed all Bolts for completeness
- Complexity realistic (XS through L)
- Acceptance criteria are testable (Given/When/Then)
- No ambiguities or open questions

✅ **Project Advanced:**
- Phase 1, Task 1 complete: ✅
- Phase 1 readiness: 33% → 50% (1 of 3 blockers resolved)
- Ready to proceed: Task 2 (Enhance Prompts)

✅ **Tracking Updated:**
- Agents log entry recorded
- EM status visible for next phase
- Metrics collected (planning duration, complexity)

### Failure Scenarios

❌ **Ambiguity Found:**
- Planner flags unclear requirements
- EM escalates to `/docs/open-questions.md`
- Requests human clarification
- Awaits guidance before continuing

❌ **Complexity Too High:**
- Planner proposes Bolt as XL
- EM rejects, asks to split
- Planner creates smaller Bolts (2x S instead of 1x L)
- Cycle repeats until all are appropriate size

❌ **Circular Dependency:**
- EM detects cycle in Bolt dependencies
- Requests Planner re-scope to break cycle
- Planner adjusts dependencies
- EM re-validates

---

## Integration with Other Skills

### Before bolt-planning
- Framework verification complete ✅
- Documentation in place ✅
- Agent roles defined ✅

### After bolt-planning
- Run: `copilot /enhance-prompts` → Use Bolts as reference
- Run: `copilot /setup-dashboard` → Track Bolt state changes
- Run: `copilot /assign-bolts` → Assign BOLT-001 to Backend
- Run: `copilot /execute-bolt` → Begin implementation

---

## Troubleshooting

### Q: How do I know if planning was successful?

**A:** Check these signals:
- [ ] `/docs/bols/` contains 8+ BOLT-XXX.md files
- [ ] Each Bolt has required sections (Objective, Scope, AC)
- [ ] `/docs/agents-log.md` shows bootstrap_planning_complete entry
- [ ] EM validation shows APPROVED for all Bolts
- [ ] No open questions added for bootstrap Bolts

### Q: What if the Planner creates unclear Bolts?

**A:** The EM will catch it:
- EM rejects ambiguous Bolts
- Requests Planner clarification
- Planner reworks until EM approves
- Process continues iteratively

### Q: Can I plan Bolts incrementally instead of all at once?

**A:** Yes, use `next` mode:
```bash
copilot /bolt-planning next    # Plans only the next unplanned Bolt
```

### Q: How do I know the execution order?

**A:** EM provides recommended order in validation output:
- Dependency-aware (respects Bolt dependencies)
- Parallel-safe (independent Bolts can run in parallel)
- Risk-managed (higher-risk Bolts early for learning)

---

## Next Steps

After planning completes:

1. **Review Bolts**
   - Read generated `/docs/bols/BOLT-*.md` files
   - Verify scope and acceptance criteria make sense
   - Confirm you're ready for implementation

2. **Enhance Agent Prompts** (Phase 1, Task 2)
   - Use Bolts as concrete examples
   - Update `/framework/prompts/*.md`
   - Run: `copilot /enhance-prompts`

3. **Implement EM Dashboard** (Phase 1, Task 3)
   - Set up real-time Bolt state tracking
   - Run: `copilot /setup-dashboard`

4. **Begin Execution**
   - Assign first Bolt to Backend Agent
   - Run: `copilot /assign-bolts`
   - Run: `copilot /execute-bolt BOLT-001`

---

## Skill Status

**Version:** 1.0.0  
**Status:** Ready for invocation  
**Last Updated:** 2026-07-06  
**Next Skill:** bolt-execution (coming soon)
