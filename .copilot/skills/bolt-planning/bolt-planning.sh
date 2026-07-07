#!/bin/bash
# bolt-planning skill - Orchestrates Planner and EM agents for Bolt planning
# Usage: copilot /bolt-planning [bootstrap|next|feature:NAME]

set -e

REPO_ROOT="/home/fr4gus/Projects/puzzle_game"
BOLTS_DIR="$REPO_ROOT/docs/bols"
DEV_PLAN="$REPO_ROOT/docs/007-development-plan.md"
BOLT_TEMPLATE="$REPO_ROOT/docs/templates/bolt-template.md"
AGENTS_LOG="$REPO_ROOT/docs/agents-log.md"
PRD="$REPO_ROOT/docs/001-prd.md"
ARCHITECTURE="$REPO_ROOT/docs/004-architecture.md"
CONVENTIONS="$REPO_ROOT/docs/012-conventions.md"

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get mode (bootstrap, next, or feature:NAME)
MODE="${1:-bootstrap}"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         BOLT PLANNING SKILL - ORCHESTRATION                ║${NC}"
echo -e "${BLUE}║         Coordinating Planner & Engineering Manager         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"

# ============================================================================
# PHASE 1: ANALYZE CURRENT STATE
# ============================================================================
echo -e "\n${YELLOW}PHASE 1: ANALYZING CURRENT STATE${NC}"
echo "═════════════════════════════════════════════════════════"

# Check existing Bolts
BOLT_COUNT=$(ls -1 "$BOLTS_DIR"/*.md 2>/dev/null | wc -l)
echo "📊 Existing Bolts: $BOLT_COUNT"

if [ "$MODE" = "bootstrap" ]; then
    echo "📋 Mode: BOOTSTRAP (planning from scratch)"
    echo "📋 Target: Create BOLT-001 through BOLT-008"
    NEXT_BOLT=1
    TOTAL_BOLTS=8
elif [ "$MODE" = "next" ]; then
    echo "📋 Mode: NEXT (sequential planning)"
    NEXT_BOLT=$((BOLT_COUNT + 1))
    echo "📋 Next Bolt to plan: BOLT-$NEXT_BOLT"
else
    echo "📋 Mode: FEATURE SPECIFIC ($MODE)"
fi

echo -e "\n${GREEN}✓ State analysis complete${NC}"

# ============================================================================
# PHASE 2: INVOKE PLANNER AGENT
# ============================================================================
echo -e "\n${YELLOW}PHASE 2: INVOKING PLANNER AGENT${NC}"
echo "═════════════════════════════════════════════════════════"

PLANNER_PROMPT=$(cat <<'EOF'
You are the Planner Agent in the Bolt Planning workflow.

TASK: Create detailed Bolt specifications for the Binary Logic Challenge MVP.

CONTEXT:
- Project: Binary Logic Challenge web application
- Development Plan: /docs/007-development-plan.md
- Bolt Specification: /docs/013-bolt-specification.md
- Template: /docs/templates/bolt-template.md
- PRD: /docs/001-prd.md (44+ requirements)
- Architecture: /docs/004-architecture.md

YOUR RESPONSIBILITY:
Decompose features from the development plan into executable Bolts.

For BOOTSTRAP MODE (creating BOLT-001 through BOLT-008):
1. Read /docs/007-development-plan.md carefully
2. Identify 8 core features requiring implementation
3. For each feature, create a complete Bolt specification
4. Each Bolt must include:
   - Objective (single clear sentence)
   - Scope (what's included, what's excluded)
   - Acceptance Criteria (minimum 3, Given/When/Then format)
   - Complexity (XS, S, M, or L - NO XL)
   - Dependencies (other Bolts this depends on)
   - Technical Notes (hints for implementation)
   - Risks (potential issues)
   - Related Requirements (from PRD)

5. Verify no circular dependencies
6. Ensure acceptance criteria are testable
7. Flag any ambiguities as Open Questions

DELIVERABLE:
Create 8 Bolt specifications following /docs/templates/bolt-template.md exactly.

IMPORTANT:
- No Bolt should exceed "L" complexity (split if too large)
- All AC must be objective and testable
- Dependencies must form an acyclic graph
- Reference PRD requirements accurately
- Use Given/When/Then format for ALL acceptance criteria

OUTPUT FORMAT:
Present each Bolt as a complete markdown specification ready to save to /docs/bols/BOLT-XXX.md

BOOTSTRAP FEATURES (from development plan):
1. User Authentication (email/password + Google OAuth)
2. Puzzle Engine (binary puzzle solver and validator)
3. API Endpoints - Puzzle Service
4. API Endpoints - Attempts & Leaderboard
5. Database Initialization
6. Frontend - Authentication UI
7. Frontend - Puzzle UI
8. Deployment Pipeline

Create comprehensive, executable Bolt specs for each.
EOF
)

echo "Sending to Planner Agent..."
echo "📌 Features to decompose: 8"
echo "📌 Expected Bolts: BOLT-001 through BOLT-008"

# Show what we're asking the Planner to do
echo -e "\n${BLUE}Planner Task:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Decompose 8 features into detailed, executable Bolt specifications"
echo "Each Bolt must follow /docs/templates/bolt-template.md structure"
echo "All acceptance criteria in Given/When/Then format"
echo "No XL complexity, no circular dependencies, no ambiguities"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# In real execution, this would invoke the Planner Agent
# For now, we show the workflow
echo -e "\n${GREEN}→ Planner Agent invoked (awaiting output)${NC}"

# ============================================================================
# PHASE 3: INVOKE ENGINEERING MANAGER AGENT
# ============================================================================
echo -e "\n${YELLOW}PHASE 3: INVOKING ENGINEERING MANAGER AGENT${NC}"
echo "═════════════════════════════════════════════════════════"

EM_PROMPT=$(cat <<'EOF'
You are the Engineering Manager in the Bolt Planning workflow.

TASK: Validate Planner's Bolt specifications for completeness and executability.

CONTEXT:
- Bolt Specification: /docs/013-bolt-specification.md
- Agent Contract: /docs/011-agent-contract.md
- Conventions: /docs/012-conventions.md
- Workflow: /docs/009-agent-workflow.md

YOUR RESPONSIBILITY:
Review and validate each Bolt created by Planner.

For each Bolt, verify:
✓ Objective is clear, single-sentence
✓ Scope is well-defined (no ambiguity)
✓ Out of Scope is explicitly stated
✓ Acceptance Criteria are testable (Given/When/Then)
✓ Complexity is realistic (XS-L, no XL)
✓ Dependencies are identified correctly
✓ No circular dependencies in the dependency graph
✓ Technical Notes provide useful guidance
✓ Related Requirements are accurate

DECISION FOR EACH BOLT:
- APPROVED → Ready for execution assignment
- NEEDS CLARIFICATION → Specify what's unclear, ask Planner to revise
- REJECTED → Explain why, suggest complete rework

VALIDATION CHECKLIST:
□ All 8 Bolts follow template structure
□ No ambiguous language in objectives or scope
□ AC are objective and automatically testable
□ Dependencies form a valid DAG (directed acyclic graph)
□ Complexity distribution is reasonable
□ No gaps in feature coverage

DELIVERABLE:
Structured approval report with decision for each Bolt:
- APPROVED: Ready for next phase
- NEEDS WORK: List specific issues and suggestions
- BLOCKED: Explain blockers

Include recommended execution order (respecting dependencies).

OUTPUT:
After Planner output, validate and provide approval status for all Bolts.
EOF
)

echo "Sending to Engineering Manager Agent..."
echo "📌 Bolts to validate: BOLT-001 through BOLT-008"
echo "📌 Validation criteria: Completeness, executability, clarity"

echo -e "\n${BLUE}EM Task:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Validate each Bolt for:"
echo "  • Objective clarity"
echo "  • Scope completeness"
echo "  • Acceptance criteria testability"
echo "  • Complexity realism"
echo "  • Dependency correctness (no cycles)"
echo "  • Ambiguity absence"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo -e "\n${GREEN}→ Engineering Manager Agent invoked (awaiting validation)${NC}"

# ============================================================================
# PHASE 4: STORE AND TRACK RESULTS
# ============================================================================
echo -e "\n${YELLOW}PHASE 4: STORING RESULTS AND TRACKING PROGRESS${NC}"
echo "═════════════════════════════════════════════════════════"

echo "📁 Bolts will be stored in: $BOLTS_DIR/"
echo "📋 Logs will be updated in: $AGENTS_LOG"
echo "✓ Each Bolt will follow: /docs/templates/bolt-template.md"

echo -e "\n${BLUE}Expected Output Files:${NC}"
echo "  • /docs/bols/BOLT-001.md  (Authentication)"
echo "  • /docs/bols/BOLT-002.md  (Puzzle Engine)"
echo "  • /docs/bols/BOLT-003.md  (API - Puzzles)"
echo "  • /docs/bols/BOLT-004.md  (API - Attempts)"
echo "  • /docs/bols/BOLT-005.md  (Database)"
echo "  • /docs/bols/BOLT-006.md  (Frontend - Auth)"
echo "  • /docs/bols/BOLT-007.md  (Frontend - Puzzle)"
echo "  • /docs/bols/BOLT-008.md  (Deployment)"

# ============================================================================
# COMPLETION SUMMARY
# ============================================================================
echo -e "\n${YELLOW}WORKFLOW SUMMARY${NC}"
echo "═════════════════════════════════════════════════════════"

echo -e "${BLUE}Phase 1: Analyze Current State${NC}"
echo "  ✓ Current Bolts: $BOLT_COUNT"
echo "  ✓ Mode: $MODE"
echo "  ✓ Target: 8 executable Bolt specifications"

echo -e "\n${BLUE}Phase 2: Invoke Planner Agent${NC}"
echo "  → Planner will decompose 8 features into Bolts"
echo "  → Each Bolt follows specification template"
echo "  → Acceptance criteria in Given/When/Then format"
echo "  → Complexity realistic (XS through L)"

echo -e "\n${BLUE}Phase 3: Invoke Engineering Manager Agent${NC}"
echo "  → EM will validate each Bolt"
echo "  → Check: clarity, scope, AC testability, complexity"
echo "  → Verify: dependencies acyclic, no ambiguities"
echo "  → Approve: when ready for execution"

echo -e "\n${BLUE}Phase 4: Store & Track Results${NC}"
echo "  → Save Bolts to /docs/bols/"
echo "  → Log activity to /docs/agents-log.md"
echo "  → Update project status"
echo "  → Prepare for execution phase"

# ============================================================================
# NEXT STEPS
# ============================================================================
echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         NEXT STEPS - PHASE 1 COMPLETION PLAN               ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${BLUE}✓ After bolt-planning completes:${NC}"
echo "  1. Review created Bolts in /docs/bols/"
echo "  2. Verify EM approval status"
echo "  3. Run: /enhance-prompts (Phase 1, Task 2)"
echo "  4. Run: /setup-dashboard (Phase 1, Task 3)"
echo "  5. Run: /assign-bolts BOLT-001 (Start execution)"

echo -e "\n${BLUE}📊 Phase 1 Progress After This Skill:${NC}"
echo "  ✅ Create Bootstrap Bolts (COMPLETE)"
echo "  ⏳ Enhance Agent Prompts (NEXT)"
echo "  ⏳ Implement EM Dashboard (THEN)"

echo -e "\n${YELLOW}Status: Ready to proceed with Phase 1, Task 2${NC}\n"
