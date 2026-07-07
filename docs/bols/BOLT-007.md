# Bolt Template

**Bolt ID:** BOLT-007
**Title:** Frontend - Puzzle UI
**Type:** Feature
**Complexity:** M
**Status:** Draft

---

# Objective
Build the frontend puzzle interface to display boards, accept moves, and submit attempts.

---

# Background
Players interact with the game through the puzzle UI which must be responsive and reflect engine rules.

---

# Scope
- Puzzle board rendering and interaction
- Move validation feedback using Puzzle Engine APIs
- Submit attempt flow and result display

---

# Out of Scope
- Leaderboard UI (BOLT-004)

---

# Requirements Covered
- FR-UI-PUZZLE-001

---

# Dependencies
- BOLT-002 (Puzzle Engine)
- BOLT-003 (Puzzle API)

---

# Acceptance Criteria

## AC-1
Given a user opens a puzzle
When the frontend fetches puzzle data
Then the board renders accurately and is interactive

## AC-2
Given a user makes a move
When the move is locally applied
Then the UI reflects the change and optionally shows validation hints from engine

## AC-3
Given a user completes a puzzle and submits an attempt
When the attempt is processed by the Attempts API
Then the UI displays success or validation errors accordingly

---

# Technical Notes
- Use accessible components; keyboard navigation supported
- Debounce validation requests to avoid excessive API calls

---

# Risks
- Performance with large boards

---

# Open Questions
- Should hints be free or limited per puzzle/user?

---

# Estimated Effort
M

---

# Notes
Implement components as standalone reusable pieces
