# Quick Reference: bolt-planning Skill

## What It Does

The **bolt-planning** skill orchestrates the **Planner** and **Engineering Manager** agents to:
1. ✅ Analyze what Bolts exist and what needs to be planned
2. ✅ Invoke Planner to decompose features into executable Bolts
3. ✅ Invoke Engineering Manager to validate and approve Bolts
4. ✅ Store approved Bolts and track progress

## When to Use

- **Starting development:** Plan BOLT-001 through BOLT-008 for the MVP
- **Continuing development:** Plan the next Bolt after one completes
- **Feature focus:** Plan Bolts for a specific feature

## How to Invoke

```bash
# Bootstrap mode - plan all 8 initial Bolts
copilot /bolt-planning bootstrap

# Next mode - plan the next sequential Bolt
copilot /bolt-planning next

# Feature mode - plan Bolts for a specific feature
copilot /bolt-planning feature:authentication
copilot /bolt-planning feature:leaderboard
```

## What Happens Inside

### 1. Analyze State
- Checks `/docs/bols/` for existing Bolts
- Reads `/docs/007-development-plan.md` for features
- Identifies which features need Bolt decomposition
- Determines execution order (respecting dependencies)

### 2. Planner Agent Works
- Reads feature requirements
- Decomposes into detailed Bolt specifications
- Creates acceptance criteria (Given/When/Then format)
- Identifies dependencies and risks
- Verifies no XL complexity Bolts

### 3. Engineering Manager Agent Works
- Reviews each Bolt specification
- Validates scope clarity
- Checks acceptance criteria testability
- Verifies dependency acyclicity
- Approves or requests rework

### 4. Results Stored
- Saves Bolts to `/docs/bols/BOLT-XXX.md`
- Updates `/docs/agents-log.md` with completion entry
- Marks Bolts ready for execution assignment
- Provides execution order recommendation

## Expected Output

### For Bootstrap Mode

```
8 Bolt Specifications:
✅ BOLT-001: User Authentication
✅ BOLT-002: Puzzle Engine
✅ BOLT-003: API - Puzzles
✅ BOLT-004: API - Attempts & Leaderboard
✅ BOLT-005: Database Initialization
✅ BOLT-006: Frontend - Authentication
✅ BOLT-007: Frontend - Puzzle UI
✅ BOLT-008: Deployment Pipeline

Status: All approved, ready for execution
Location: /docs/bols/BOLT-*.md
Next: Enhance agent prompts (Phase 1, Task 2)
```

### For Next Mode

```
Next Bolt to Plan: BOLT-006
Previous Bolts Complete: 5
Dependencies: BOLT-001, BOLT-005 (both closed)
Status: Ready to plan
Estimated Complexity: M (Medium)
```

## Files Created

**Skill Implementation:**
- `/home/fr4gus/.copilot/skills/bolt-planning/README.md` - Overview
- `/home/fr4gus/.copilot/skills/bolt-planning/bolt-planning-invoke.md` - Detailed guide
- `/home/fr4gus/.copilot/skills/bolt-planning/bolt-planning.sh` - Execution script
- `/home/fr4gus/.copilot/skills/bolt-planning/skill-config.json` - Configuration

**Output (After Execution):**
- `/docs/bols/BOLT-001.md` through `/docs/bols/BOLT-008.md`
- Updated `/docs/agents-log.md` with planning entry
- Project status updated (Phase 1 progress)

## Success Indicators

✅ Bolts exist in `/docs/bols/`
✅ Each Bolt follows `/docs/templates/bolt-template.md`
✅ All Bolts have Given/When/Then acceptance criteria
✅ EM validation shows APPROVED status
✅ Dependencies form valid DAG (no cycles)
✅ Complexity: all XS through L (no XL)
✅ Agents log entry recorded
✅ Next step: Phase 1, Task 2

## Failure Recovery

**If Planner creates unclear Bolt:**
- EM catches it and requests rework
- Process repeats until approval
- No ambiguous Bolts proceed

**If complexity too high:**
- EM asks Planner to split into smaller Bolts
- Planner adjusts and resubmits
- Continues until all realistic

**If circular dependency detected:**
- EM identifies and reports cycle
- Planner re-scopes to break cycle
- Dependency graph verified acyclic

## Next Steps After Skill Completes

1. **Review created Bolts**
   ```bash
   cat /docs/bols/BOLT-001.md    # Review first Bolt
   ls /docs/bols/                 # See all created Bolts
   ```

2. **Enhance Agent Prompts** (Phase 1, Task 2)
   ```bash
   copilot /enhance-prompts       # Use Bolts as examples
   ```

3. **Implement EM Dashboard** (Phase 1, Task 3)
   ```bash
   copilot /setup-dashboard       # Set up state tracking
   ```

4. **Assign & Execute Bolts**
   ```bash
   copilot /assign-bolts BOLT-001     # Assign first Bolt
   copilot /execute-bolt BOLT-001     # Begin execution
   ```

## Skill Status

**Version:** 1.0.0
**Status:** ✅ Ready for invocation
**Location:** `/home/fr4gus/.copilot/skills/bolt-planning/`
**Last Updated:** 2026-07-06

## Integration Points

**Phase 1 Progress:**
- ✅ Create Bootstrap Bolts ← **YOU ARE HERE (this skill)**
- ⏳ Enhance Agent Prompts (next)
- ⏳ Implement EM Dashboard (then)
- ✅ Framework ready (done)

**Related Workflow:**
```
Framework Ready ✅
    ↓
Verify Framework ✅
    ↓
bolt-planning → Create Bolts ← **NEXT**
    ↓
enhance-prompts → Update Prompts
    ↓
setup-dashboard → Dashboard Ready
    ↓
assign-bolts → Assign Work
    ↓
execute-bolt → Begin Execution
```

## Troubleshooting

**Q: How do I know if planning succeeded?**
- Check: `/docs/bols/` has 8+ files
- Check: `/docs/agents-log.md` has bootstrap_planning_complete entry
- Check: EM output shows APPROVED for all Bolts

**Q: What if planning fails?**
- Skill will report specific issue (ambiguity, complexity, etc.)
- EM will request rework from Planner
- Process repeats automatically until approval

**Q: Can I plan incrementally?**
- Yes, use `/bolt-planning next` mode
- Plans one Bolt at a time
- Respects dependencies

**Q: How long does planning take?**
- Bootstrap: 4-6 hours (estimated)
- Next: 1-2 hours per Bolt
- Depends on feature complexity

## Key Concepts

**Bolt:** Smallest independently deliverable unit of work
**Acceptance Criteria:** Testable, objective success measure
**Complexity:** XS (2h), S (half-day), M (1-2 days), L (several days)
**Dependency:** Other Bolts this work depends on
**DAG:** Directed Acyclic Graph (dependencies must not form cycles)

## Documentation

- **Full Guide:** `/home/fr4gus/.copilot/skills/bolt-planning/README.md`
- **Invocation Details:** `/home/fr4gus/.copilot/skills/bolt-planning/bolt-planning-invoke.md`
- **Implementation:** `/home/fr4gus/.copilot/skills/bolt-planning/bolt-planning.sh`
- **Configuration:** `/home/fr4gus/.copilot/skills/bolt-planning/skill-config.json`

---

**Ready?** Invoke with: `copilot /bolt-planning bootstrap`
