# Bolt Template

**Bolt ID:** BOLT-004
**Title:** API Endpoints - Attempts & Leaderboard
**Type:** Feature
**Complexity:** M
**Status:** Draft

---

# Objective
Implement endpoints to record user attempts, evaluate results, and maintain a leaderboard.

---

# Background
Attempts capture user gameplay; leaderboard aggregates top performers and statistics.

---

# Scope
- Submit attempt endpoint (record moves, validate, score)
- Compute and store attempt result and score
- Leaderboard endpoints: top N, user rank, stats

---

# Out of Scope
- Frontend UI for leaderboard (BOLT-007)

---

# Requirements Covered
- FR-ATTEMPT-001
- FR-LEADERBOARD-001

---

# Dependencies
- BOLT-002 (Puzzle Engine)
- BOLT-003 (Puzzle API)
- BOLT-005 (Database Initialization)

---

# Acceptance Criteria

## AC-1
Given a POST to /api/v1/attempts with a completed puzzle and user id
When the attempt is valid
Then the system records the attempt, computes score, and returns 201 with result

## AC-2
Given a submitted attempt that fails validation
When validator reports errors
Then the API returns 400 with validation details and does not record the attempt

## AC-3
Given a GET to /api/v1/leaderboard?limit=10
When requested
Then the API returns the top 10 scores with user identifiers and timestamps

---

# Technical Notes
- Scoring algorithm must be deterministic and documented
- Consider caching leaderboard results for performance

---

# Risks
- High write load during spikes
- Consistency between attempted scores and leaderboard aggregation

---

# Open Questions
- How to handle anonymous attempts (no user id)?

---

# Estimated Effort
M

---

# Notes
Include metrics emitting for attempts to monitor abuse
