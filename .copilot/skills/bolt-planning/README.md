# Bolt Planning Skill

## Overview

The **bolt-planning** skill orchestrates collaborative planning between the Engineering Manager and Planner agents to create executable Bolts from features and requirements.

## Purpose

This skill:
1. **Determines the next Bolt to plan** based on dependencies and priorities
2. **Invokes the Planner** to decompose features into detailed Bolts
3. **Invokes the Engineering Manager** to validate and approve Bolts
4. **Tracks planning progress** through the workflow
5. **Coordinates handoffs** between planning and execution phases

## When to Use

Use this skill when:
- Starting a new phase of development (Bootstrap Bolts, Feature decomposition)
- Needing to plan the next set of Bolts
- Coordinating between Planner and Engineering Manager
- Transitioning from requirements to executable work

## How It Works

### Step 1: Analyze Current State
- Query which Bolts exist and their current status
- Query development plan features that need decomposition
- Identify dependencies and blockers
- Determine the next Bolt(s) to plan

### Step 2: Invoke Planner
- Provide feature requirements and scope
- Ask Planner to decompose into Bolts
- Request acceptance criteria in Given/When/Then format
- Validate against Bolt specification

### Step 3: Invoke Engineering Manager
- Present Planner's Bolt specifications
- Request EM validation and approval
- Ask EM to identify any gaps or concerns
- Confirm readiness for assignment to implementation agents

### Step 4: Store and Track
- Save Bolt specifications to `/docs/bols/BOLT-XXX.md`
- Update planning status in logs
- Mark Bolts as ready for next phase
- Prepare for implementation assignment

## Usage

### Invoke the Skill

```bash
# Start bolt-planning workflow
/bolt-planning

# Or specify the next phase
/bolt-planning bootstrap
/bolt-planning next
/bolt-planning feature:authentication
```

### Input Requirements

The skill expects:
- Current Bolt status (stored in `/docs/bols/`)
- Feature descriptions (from `/docs/007-development-plan.md`)
- Architecture constraints (from `/docs/004-architecture.md`)
- PRD requirements (from `/docs/001-prd.md`)

### Output Deliverables

The skill produces:
- **Bolt Specifications** - Saved to `/docs/bols/BOLT-XXX.md`
- **Planning Report** - Logged to `/docs/agents-log.md`
- **Ready State** - Bolts marked for assignment
- **Metrics** - Planning duration, complexity estimates, dependencies

## Implementation Details

### Agent Orchestration

The skill runs a two-agent workflow:

```
PLANNING WORKFLOW
├── Determine Next Bolt(s)
├── Invoke Planner
│   ├── Read requirements
│   ├── Decompose into Bolts
│   ├── Generate acceptance criteria
│   └── Identify dependencies
├── Invoke Engineering Manager
│   ├── Validate completeness
│   ├── Check for ambiguities
│   ├── Verify dependencies
│   └── Approve for execution
└── Store & Track Results
```

### Decision Logic

The skill determines "next Bolt" using:

1. **Bootstrap Phase** - Create BOLT-001 through BOLT-008 from development plan
2. **Dependency Resolution** - Plan Bolts in order of dependencies
3. **Priority** - Features marked as high-priority first
4. **Readiness** - Dependencies must be Closed before downstream Bolts planned
5. **Parallelization** - Independent Bolts can be planned simultaneously

### State Machine

```
Start
  ↓
Analyze Current State
  ↓
Identify Next Bolt(s)
  ↓
Invoke Planner (Decomposition)
  ↓
Invoke EM (Validation)
  ↓
Approved?
  ├─ YES → Store Bolt & Track
  │         ↓
  │       Ready for Execution
  │
  └─ NO → Request Changes
          ↓
          Loop back to Planner
```

## Configuration

The skill respects:
- `/docs/000-project-charter.md` (principles and vision)
- `/docs/013-bolt-specification.md` (Bolt format and structure)
- `/docs/009-agent-workflow.md` (workflow phases)
- `/docs/007-development-plan.md` (feature decomposition)
- `/framework/prompts/planner.md` (Planner instructions)
- `/framework/prompts/engineering-manager.md` (EM instructions)

## Examples

### Example 1: Bootstrap Planning

```
User: /bolt-planning bootstrap
Skill: Analyzing development plan...
Skill: Found 8 features requiring decomposition
Skill: Invoking Planner to create BOLT-001 through BOLT-008
[Planner Agent outputs Bolts]
Skill: Invoking EM to validate and approve
[EM Agent validates]
Skill: ✅ Bootstrap Bolts created and approved
Skill: Next step: Enhance agent prompts for execution
```

### Example 2: Next Bolt Planning

```
User: /bolt-planning next
Skill: Analyzing current Bolt status...
Skill: BOLT-001 (Auth) - Approved, ready for execution
Skill: BOLT-002 (Puzzle Engine) - No blockers detected
Skill: Planning next: BOLT-002
Skill: Invoking Planner for Puzzle Engine decomposition...
[Planner outputs BOLT-002 spec]
Skill: Invoking EM for validation...
[EM approves]
Skill: ✅ BOLT-002 ready for execution assignment
```

### Example 3: Feature-Specific Planning

```
User: /bolt-planning feature:leaderboard
Skill: Extracting leaderboard requirements from PRD...
Skill: Found 3 related features: Ranking, Statistics, Persistence
Skill: Invoking Planner to decompose Leaderboard features...
[Planner outputs multiple Bolts]
Skill: Invoking EM for validation...
[EM approves with notes]
Skill: ✅ Leaderboard Bolts ready for execution
```

## Failure Handling

If the skill encounters issues:

**Ambiguous Requirements**
- Planner identifies ambiguity
- Skill escalates to `/docs/open-questions.md`
- Requests human clarification before proceeding

**Dependency Blocking**
- EM identifies unresolved dependency
- Skill reports blocker
- Suggests alternative planning order

**Complexity Concern**
- Planner estimates Bolt as XL (too large)
- Skill requests splitting into smaller Bolts
- Loops back to decomposition

## Metrics & Tracking

The skill tracks:
- **Planning Duration** - Time to plan each Bolt
- **Complexity Distribution** - Count of XS/S/M/L/XL Bolts
- **Dependency Depth** - Maximum dependency chain length
- **Rework Rate** - How many iterations before approval
- **Agent Effectiveness** - Planner accuracy, EM validation rigor

## Related Skills

- `bolt-execution` - Assigns and executes Bolts
- `bolt-testing` - Validates completed Bolts
- `bolt-review` - Reviews and approves implementations
- `bolt-metrics` - Analyzes planning and execution metrics

## Next Steps After Planning

Once planning is complete:

1. **Enhance Agent Prompts** (Phase 1, Task 2)
   - Use created Bolts as reference
   - Update prompts with Bolt examples

2. **Implement EM Dashboard** (Phase 1, Task 3)
   - Track state transitions
   - Monitor Bolt progress

3. **Assign & Execute** (Next Skill)
   - EM assigns Bolts to implementation agents
   - Agents execute according to Bolt scope

## Invocation

See `bolt-planning-invoke.md` for actual invocation and usage examples.
