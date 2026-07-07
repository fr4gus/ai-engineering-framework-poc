# Bolt Template

**Bolt ID:** BOLT-003
**Title:** API Endpoints - Puzzle Service
**Type:** Feature
**Complexity:** S
**Status:** Draft

---

# Objective
Provide REST API endpoints to create, fetch, and manage puzzles used by the frontend and game engine.

---

# Background
APIs expose puzzle data and integrate with the Puzzle Engine for validation and solving.

---

# Scope
- Endpoints: create puzzle, get puzzle by id, list puzzles, validate puzzle
- Input validation and error handling
- Pagination for listing

---

# Out of Scope
- Attempt submission and leaderboard updates (BOLT-004)
- Frontend presentation

---

# Requirements Covered
- FR-API-001
- FR-API-002

---

# Dependencies
- BOLT-002 (Puzzle Engine)
- BOLT-005 (Database Initialization)

---

# Acceptance Criteria

## AC-1
Given a POST to /api/v1/puzzles with valid puzzle data
When the request is processed
Then the API stores the puzzle and returns 201 with puzzle id

## AC-2
Given a GET to /api/v1/puzzles/{id}
When the id exists
Then the API returns puzzle payload and 200

## AC-3
Given a GET to /api/v1/puzzles?limit=10&page=1
When multiple puzzles exist
Then the API returns a paginated list and appropriate metadata

---

# Technical Notes
- Use JSON REST conventions
- Validate payloads against schema before persistence

---

# Risks
- Inconsistent puzzle schema across versions

---

# Open Questions
- Do puzzles require versioning for migrations?

---

# Estimated Effort
S

---

# Notes
Ensure endpoints call validator from BOLT-002 before accepting new puzzles
