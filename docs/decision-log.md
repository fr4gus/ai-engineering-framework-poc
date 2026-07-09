# Decision Log

This document records all accepted product decisions.

Only approved decisions belong here.

---

## DEC-001

**Date**

2026-07-04

**Status**

Accepted

**Decision**

The game will be a Binary Puzzle.

**Reason**

The Binary Puzzle offers a good balance between implementation complexity, replayability, and suitability for AI-assisted development.

---

## DEC-002

**Date**

2026-07-04

**Status**

Accepted

**Decision**

Three puzzle difficulty levels shall exist:

- Easy
- Medium
- Hard

---

## DEC-003

**Decision**

Only one official puzzle is available each day.

Difficulty is determined when the daily puzzle is scheduled.

---

## DEC-004

Archived puzzles update only personal statistics.

They never affect historical leaderboards.

---

## DEC-005

Puzzle reset restores the initial puzzle state.

The underlying solution does not change.

---

## DEC-006

Users must register with a unique username.

---

## DEC-007

Anonymous users may play today's puzzle.

Their progress and scores are not stored.

---

## DEC-008

Daily puzzles reset according to UTC.

---

## DEC-009

Hints are excluded from the MVP.

---

## DEC-010

Players may replay puzzles without limit.

Only the best score counts toward leaderboards.

---

## DEC-011

**Date**

2026-07-07

**Status**

Accepted

**Decision**

The canonical Bolt lifecycle is:

Draft → Planned → Approved → Assigned → InProgress → Testing → Review → Accepted → Closed

The Reviewer transitions approved work to Accepted. The Product Owner owns the final Accepted → Closed transition.

---

## DEC-012

**Date**

2026-07-07

**Status**

Accepted

**Decision**

Runnable agent prompts remain in `framework/prompts/*.md`. Each prompt must require the agent to load `docs/011-agent-contract.md` and its matching `docs/agents/*.md` specification before acting.

---

## DEC-013

**Date**

2026-07-07

**Status**

Accepted

**Decision**

Puzzle completion is finalized automatically. The frontend calls `POST /attempts/{id}/complete` when the board is a completion candidate; the backend performs final validation before accepting the score.

---

## DEC-014

**Date**

2026-07-07

**Status**

Accepted

**Decision**

The documentation baseline is approved through `BOLT-DOC-001`. Draft product, architecture, API, data, development, testing, and deployment documents are marked Approved after closure of that Bolt.
