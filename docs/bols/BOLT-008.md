# Bolt Template

**Bolt ID:** BOLT-008
**Title:** Deployment Pipeline (CI/CD)
**Type:** Infra
**Complexity:** L
**Status:** Draft

---

# Objective
Establish a CI/CD pipeline to build, test, migrate, and deploy the application to staging and production.

---

# Background
A reliable pipeline ensures changes are validated and deployments are repeatable and auditable.

---

# Scope
- CI: build, lint, unit tests
- Run migrations as part of deploy
- Staging deploy and smoke tests
- Production deploy with rollback strategy

---

# Out of Scope
- Advanced canary or blue/green deployment orchestration

---

# Requirements Covered
- FR-CI-001

---

# Dependencies
- BOLT-005 (Database migrations)
- Build/test configuration (repo-level)

---

# Acceptance Criteria

## AC-1
Given a commit to main
When CI runs
Then build, lint, and unit tests complete successfully and return status

## AC-2
Given a successful CI build for main
When deployment pipeline runs to staging
Then migrations are applied and staging app becomes reachable with smoke tests passing

## AC-3
Given a production deploy request
When deployment completes
Then the system runs post-deploy health checks and records deployment metadata

---

# Technical Notes
- Use GitHub Actions for CI/CD; include migration steps and health checks
- Store secrets in GitHub Secrets or a secrets manager

---

# Risks
- Failed migrations during deploy could cause downtime

---

# Open Questions
- Use managed DB (e.g., RDS) or self-hosted for MVP?

---

# Estimated Effort
L

---

# Notes
Include rollback playbook and automated alerting in pipeline
