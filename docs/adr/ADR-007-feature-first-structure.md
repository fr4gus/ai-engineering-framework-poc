# ADR-007 — Feature-First Organization

Instead of:

components/
services/
controllers/

We use:

play/
leaderboard/
statistics/
authentication/

Each feature owns its UI, services, tests, and models.

This organization scales better and allows multiple agents to work in parallel with fewer conflicts.