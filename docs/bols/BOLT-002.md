# Bolt Template

**Bolt ID:** BOLT-002
**Title:** Puzzle Engine (Solver & Validator)
**Type:** Feature
**Complexity:** M
**Status:** Draft

---

# Objective
Implement the core binary puzzle engine: puzzle generation/validation and solver utilities.

---

# Background
The engine enforces puzzle rules and powers move validation, solution checking, and optional automated solving.

---

# Scope
- Puzzle rules enforcement (row/column counts, no three consecutive same)
- Validator API and core library
- Optional solver for hints/validation

---

# Out of Scope
- Puzzle UI rendering (frontend)
- Persistent leaderboard logic

---

# Requirements Covered
- FR-PUZZLE-001
- FR-PUZZLE-002

---

# Dependencies
- BOLT-005 (Database Initialization) for persistence if needed

---

# Acceptance Criteria

## AC-1
Given a puzzle board state
When the validator runs
Then it returns whether the board is valid and a list of rule violations (if any)

## AC-2
Given a completed board submitted by a user
When the system validates it
Then the validator confirms correctness if rules are satisfied and marks puzzle complete

## AC-3
Given a request for a solver/hint for a solvable puzzle
When solver is invoked
Then it returns a valid next move or solution steps within resource limits

---

# Technical Notes
- Implement core logic in a language-agnostic module for reuse by backend and tests
- Optimize solver to avoid exponential blowup; cap solver time

---

# Risks
- Solver complexity for large boards
- Edge-case rule enforcement

---

# Open Questions
- What max puzzle size should be supported initially?

---

# Estimated Effort
M

---

# Notes
Expose validator as /api/v1/puzzles/validate and solver as /api/v1/puzzles/solve
