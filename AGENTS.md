# Repository Guidelines

## Project Structure & Module Organization

This repository is currently a documentation-first proof of concept for an AI engineering framework. Core project documentation lives in `docs/`, with ADRs in `docs/adr/`, agent role definitions in `docs/agents/`, and reusable artifact formats in `docs/templates/`. Agent prompt sources live in `framework/prompts/`. Evaluation material starts in `evaluation/`, currently with `evaluation/framework.md`. The README mentions future `frontend/`, `backend/`, `tools/`, `scripts/`, and `reference-apps/` directories; add them only when implementation work begins and keep them aligned with `docs/012-conventions.md`.

## Build, Test, and Development Commands

No package manifest, Makefile, or executable build pipeline is present yet. Use repository inspection commands while working on the framework:

- `rg --files` lists tracked project files quickly.
- `rg "BOLT-" docs` finds Bolt references across specifications.
- `git diff -- docs framework evaluation` reviews documentation and prompt changes before submission.

When source applications are added, document their exact install, build, test, and run commands in `README.md` and keep this file updated.

## Coding Style & Naming Conventions

Follow `docs/012-conventions.md`. Use kebab-case for files such as `leaderboard.service.ts`, PascalCase for classes and enums, camelCase for variables, and UPPER_SNAKE_CASE for constants. Planned TypeScript work should use strict mode, avoid `any`, and expose explicit return types for exported functions. Keep documentation headings descriptive and maintain the existing document metadata pattern: Document ID, Version, Status, and Owner where applicable.

## Testing Guidelines

Testing expectations are defined in `docs/008-testing-strategy.md`. Critical game logic should have isolated unit tests, API and persistence behavior should have integration tests, and complete user flows should have E2E coverage when applicable. No Bolt is complete without passing tests and acceptance criteria. Until test tooling exists, include manual validation notes in the relevant Bolt, report, or PR.

## Commit & Pull Request Guidelines

Recent commits use short, direct messages such as `Add MIT License to the project`; no Conventional Commits rule is established. Keep messages concise and action-oriented. Pull requests should summarize scope, reference a Requirement ID, User Story, ADR, or task, list validation performed, and include screenshots only for UI-visible changes.

## Agent-Specific Instructions

All implementation work should flow through the Bolt lifecycle in `docs/009-agent-workflow.md` and `docs/015-bolt-runtime-protocol.md`. Log required state transitions in `docs/agents-log.md`, keep changes within the assigned Bolt scope, and update affected documentation alongside code or prompt changes.
