# Ready-to-Bolt Checklist

## Pre-Execution Verification

Use this checklist to confirm the system is ready before running your first Bolt through the complete workflow.

---

## Phase 1: Critical Blockers

### ✅ Bootstrap Bolts Created

```
□ /docs/bols/BOLT-001.md exists and contains:
  □ Objective: Clear, single sentence
  □ Scope: Clearly defined
  □ Out of Scope: Explicitly stated
  □ Acceptance Criteria: In Given/When/Then format (minimum 2)
  □ Dependencies: Listed (may be empty)
  □ Complexity: XS, S, M, L (NOT XL)
  □ Related Requirements: Mapped to PRD

□ /docs/bols/BOLT-002.md through BOLT-008.md (same structure as above)

□ All Bolts follow /docs/templates/bolt-template.md exactly

□ No circular dependencies between Bolts

□ Dependency graph is acyclic
  (Example: BOLT-005 DB → BOLT-003 API → BOLT-007 Frontend is OK)
  (Example: BOLT-001 Auth → BOLT-002 Engine → BOLT-001 Auth is NOT OK)
```

### ✅ Agent Prompts Enhanced

```
□ /framework/prompts/planner.md includes:
  □ "REQUIRED READING" section
  □ "INPUT FORMAT" section
  □ "OUTPUT REQUIREMENTS" section
  □ "ESCALATION RULES" section
  □ References to /docs/013-bolt-specification.md
  □ References to /docs/011-agent-contract.md
  □ References to /docs/012-conventions.md

□ /framework/prompts/architect.md includes (above + architecture-specific)
□ /framework/prompts/backend.md includes (above + backend-specific)
□ /framework/prompts/frontend.md includes (above + frontend-specific)
□ /framework/prompts/tester.md includes (above + testing-specific)
□ /framework/prompts/reviewer.md includes (above + review-specific)
□ /framework/prompts/devops.md includes (above + deployment-specific)
□ /framework/prompts/engineering-manager.md includes (above + orchestration-specific)
```

### ✅ EM Dashboard Operational

```
□ Real-time Bolt state tracking implemented
  
  □ Option A (Structured Logs):
    □ /docs/agents-log.md uses YAML front matter format
    □ Each entry includes: timestamp, agent, bolt_id, action, files_modified, summary
    □ Query script exists: /scripts/query-bolts.sh
    □ Query examples work:
      - ./query-bolts.sh "state=draft"
      - ./query-bolts.sh "bolt=BOLT-001"
      - ./query-bolts.sh "agent=Backend"
  
  □ Option B (JSON State Store):
    □ /var/lib/bolt-state.json exists
    □ API endpoints available (if using)
    □ State queries return current Bolt states
  
  □ Option C (Full Dashboard):
    □ Web interface running (if implemented)
    □ Real-time updates visible
    □ Metrics displayed
```

---

## Phase 2: Workflow Readiness

### ✅ Handoff Protocol Specified

```
□ Planner → Architect handoff:
  □ Location specified (where Planner writes)
  □ Format specified (structure Architect expects)
  □ Trigger specified (what starts review)

□ Architect → EM handoff:
  □ Approval format specified (what "approved" looks like)
  □ Storage location specified (where approved Bolts go)
  □ Assignment trigger specified

□ EM → Backend/Frontend handoff:
  □ Assignment format specified
  □ Repository/workspace specified
  □ Expected output specified

□ Backend/Frontend → Tester handoff:
  □ Code location specified (where code lives)
  □ Submission method specified (commit? PR? artifact?)
  □ Test discovery method specified (how Tester finds code)

□ Tester → Reviewer handoff:
  □ Test report format specified
  □ Test results storage specified
  □ Code location for review specified

□ Reviewer → EM handoff:
  □ Approval/rejection format specified
  □ Review report storage specified
```

### ✅ Execution Environment Specified

```
□ Backend Agent:
  □ Repository access method defined
  □ Workspace location defined
  □ Database connection specified
  □ Build/test tools available (npm, postgres, etc.)
  □ Code submission method defined
  □ How Tester finds code defined

□ Frontend Agent:
  □ Repository access method defined
  □ Workspace location defined
  □ Build tools available (npm, webpack, etc.)
  □ Component location pattern defined
  □ How to run tests locally defined

□ Tester Agent:
  □ Test framework specified (jest, mocha, etc.)
  □ Test discovery path defined
  □ Test environment setup documented
  □ How to verify coverage documented

□ Reviewer Agent:
  □ Code review tool specified (GitHub PR?)
  □ Review criteria documented
  □ Where to submit feedback
```

### ✅ Logging System Operational

```
□ /docs/agents-log.md uses structured format

□ Each entry template defined with fields:
  □ timestamp (ISO 8601 UTC)
  □ agent (role name)
  □ bolt_id (BOLT-XXX reference)
  □ action (creation, approval, assignment, etc.)
  □ files_modified (comma-separated list)
  □ summary (what was done)
  □ related_requirements (requirement IDs)
  □ next_task (suggested next action)

□ Parsing works:
  □ Can extract Bolt status history
  □ Can calculate cycle times
  □ Can identify agent activity
  □ Can find bottlenecks

□ All agents know logging format and location
```

---

## Phase 3: First Bolt Readiness

### ✅ BOLT-001 Ready for Execution

```
□ Bolt file exists: /docs/bols/BOLT-001.md

□ Bolt content validated:
  □ Objective is clear (single sentence)
  □ Scope is well-defined (no ambiguity)
  □ Acceptance criteria are testable (Given/When/Then)
  □ Dependencies are satisfied or empty
  □ Complexity is realistic (S or M for first Bolt)
  □ No open questions marked for resolution
  □ All technical notes provided

□ Backend Agent can understand BOLT-001:
  □ Prompt references /docs/006-api-spec.md
  □ Prompt explains Bolt format
  □ Prompt specifies what Backend should implement
  □ Prompt specifies where to submit code
  □ Prompt specifies success criteria

□ Tester can validate BOLT-001:
  □ Acceptance criteria are testable
  □ Test strategy documented for BOLT-001
  □ Expected API behavior clear
  □ Expected code location clear
  □ Test pass/fail criteria defined

□ Reviewer can approve BOLT-001:
  □ Architecture rules documented
  □ Code review criteria documented
  □ Quality standards documented
  □ Convention compliance clear
```

---

## Phase 4: Workflow Validation

### ✅ Full Workflow Testable

```
□ Planner can create a Bolt:
  □ Planner knows Bolt template structure
  □ Planner knows acceptance criteria format
  □ Planner knows where to store Bolt
  □ Prompt instructs Planner correctly

□ Architect can validate Bolt:
  □ Architect knows approval criteria
  □ Architect knows what to check
  □ Architect knows approval format
  □ Prompt instructs Architect correctly

□ EM can assign Bolt:
  □ EM knows how to assign work
  □ EM knows state transition rules
  □ EM knows logging requirements
  □ Dashboard shows state changes

□ Backend can implement Bolt:
  □ Backend knows where to write code
  □ Backend knows success criteria
  □ Backend knows when to submit
  □ Backend can log work completed

□ Tester can validate implementation:
  □ Tester can find code
  □ Tester can run tests
  □ Tester can verify acceptance criteria
  □ Tester can create test report

□ Reviewer can approve:
  □ Reviewer can review code
  □ Reviewer can verify conventions
  □ Reviewer can check tests
  □ Reviewer can approve/reject

□ EM can close cycle:
  □ EM can verify all gates passed
  □ EM can mark Bolt closed
  □ EM can log completion
  □ Dashboard shows closure
```

---

## Quick Pre-Flight Check

Run this before starting first Bolt:

```bash
# 1. Check Bolts exist
ls -la /home/fr4gus/Projects/puzzle_game/docs/bols/ | wc -l
# Should be > 8 (8 Bolts + . + ..)

# 2. Check prompts enhanced
grep -l "REQUIRED READING" /home/fr4gus/Projects/puzzle_game/framework/prompts/*.md | wc -l
# Should be 8

# 3. Check dashboard functional
ls /home/fr4gus/Projects/puzzle_game/scripts/query-bolts.sh 2>/dev/null
# Should exist

# 4. Check logging format
head -20 /home/fr4gus/Projects/puzzle_game/docs/agents-log.md | grep -E "^---$|timestamp:"
# Should show structured format

# 5. Check BOLT-001 exists and is valid
cat /home/fr4gus/Projects/puzzle_game/docs/bols/BOLT-001.md | grep -E "^# Objective|^# Scope|^# Acceptance Criteria"
# Should show all sections
```

---

## Decision Gate

```
If ALL checkboxes ✅ complete:
  → System is READY for first Bolt execution
  → Proceed with workflow end-to-end test

If ANY checkbox ⚠️ or ❌:
  → Complete blocking items first
  → Reference VERIFICATION-REPORT.md for detailed fixes
  → Reference NEXT-STEPS.md for action plan
```

---

## Success Criteria for Phase 1 Completion

After Phase 1 (8-12 hours):

✅ All 3 critical blockers resolved  
✅ Example Bolts created and validated  
✅ Agent prompts enhanced with execution details  
✅ EM Dashboard provides state visibility  
✅ First workflow handoff can be tested  
✅ First Bolt ready for Backend assignment  

→ **System can execute first Bolt end-to-end**

---

## Next Actions After Phase 1

Once Phase 1 complete:

1. **Immediate:** Execute first Bolt (BOLT-001) end-to-end
   - Planner approves it
   - Architect validates it
   - EM assigns to Backend
   - Backend implements
   - Tester validates
   - Reviewer approves
   - EM closes

2. **Monitor:** Collect metrics on workflow
   - Cycle time for first Bolt
   - Number of iterations needed
   - Blockers encountered
   - Prompt effectiveness

3. **Phase 2:** Complete high-priority gaps
   - Better handoff specifications
   - Convention enforcement automation
   - Full logging system
   - Complete EM Dashboard

4. **Scaling:** Execute remaining Bolts
   - BOLT-002 through BOLT-008
   - Parallel execution where dependencies allow
   - Continuous monitoring and refinement

---

**Status: Ready to begin Phase 1 preparation**
