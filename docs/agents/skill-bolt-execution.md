Title: Skill - bolt-execution
Document ID: AGT-SKILL-001
Version: 1.0
Status: Draft
Owner: Engineering Manager

Summary

Defines the "bolt-execution" skill: a focused execution workflow that takes a single approved Bolt and completes implementation, testing, review, reporting, and closure. No planning or decomposition occurs within this skill — the Bolt must be approved and ready to execute prior to invocation.

Participants

- Engineering Manager (owner/coordinator)
- Backend
- Frontend
- DevOps
- Tester
- Reviewer

Inputs

- One approved Bolt (complete specification, acceptance criteria, and any required assets). The Bolt must include:
  - Bolt ID and title
  - Acceptance criteria
  - Required interfaces/contracts
  - Any non-functional requirements (performance, security)
  - Traceability to requirement/ADR/task

Outputs

- Code (feature branch and PR)
- Tests (unit, integration, e2e where applicable)
- Review (review comments resolved, approval recorded)
- Reports (implementation summary, test results, deployment notes)
- Closed Bolt (Bolt marked closed with links to deliverables and artifacts)

Constraints

- Execute exactly one Bolt at a time per skill instance (no batching or parallel execution in the same skill run).
- No planning or re-scoping occurs inside this skill. If the Bolt needs further planning, it must be returned to the Planner phase or an authorised rework flow.
- All external dependencies must be declared on the Bolt before execution starts.

Workflow / Steps

1. Hand-off & Kickoff (Engineering Manager)
   - Verify Bolt approved and ready (sign-off present, acceptance criteria clear).
   - Assign participants and owners for code, testing, and review tasks.
   - Create an implementation issue/todo referencing the Bolt ID and set status in the tracking system.

2. Implementation (Backend / Frontend / DevOps)
   - Implement code on a feature branch following repo conventions.
   - Add/extend automated tests (unit/integration).
   - DevOps prepares any deployment changes, infra-as-code or configuration needed.
   - Commit and open a PR referencing the Bolt ID and implementation issue.

3. Test & Validation (Tester)
   - Run automated tests and specified manual test cases from the Bolt acceptance criteria.
   - Record test results and raise issues for any failures.

4. Review (Reviewer)
   - Conduct code review focusing on correctness, security, and system impacts.
   - Ensure tests cover acceptance criteria and meaningful edge cases.
   - Reviewer approves PR once issues are resolved.

5. Merge, Deploy, and Report (Engineering Manager / DevOps)
   - Merge changes after approval and ensure CI/CD passes.
   - Deploy to appropriate environment (staging/production) per Bolt instructions.
   - Produce an implementation report summarising changes, test results, and any operational notes.

6. Close Bolt (Engineering Manager)
   - Update Bolt status to Closed and link to PR, commits, test reports, and deployment artifacts.
   - Update docs/agents-log.md with timestamp, participants, files modified, summary, and related IDs.

Definition of Done (DoD)

- Code merged to main (or target branch) with linked PR and commits
- Automated tests pass in CI; required manual tests marked as passed
- Reviewer approval recorded on the PR
- Deployment performed (per Bolt instruction) or a deployment plan exists if deployment is deferred
- Implementation report generated and attached to the Bolt
- Bolt status updated to Closed and tracking artifacts linked

Reporting and Traceability

- Every action must reference the Bolt ID.
- PRs, issues/todos, test reports, and deployment artifacts must include links to the Bolt.
- docs/agents-log.md must be updated when the skill run completes with the required metadata.

Edge Cases & Escalation

- If the Bolt is found under-specified during execution, the Engineering Manager pauses execution and returns the Bolt to the Planner/Product Owner for clarification. This is explicitly a hand-back (not planning inside the skill).
- If external dependencies block progress, log the dependency with expected resolution ETA and mark the todo blocked.

Acceptance Criteria for the Skill

- Skill executes a single approved Bolt end-to-end with clear ownership.
- No planning or requirement elaboration is performed inside the skill.
- Deliverables (code, tests, review, report) are produced and linked to the Bolt.

Notes

- Use existing repo conventions for branches (feature/<bolt-id>), commit messages, and PR templates that include Bolt ID.
- Keep the skill lightweight: focus on execution, quality, and traceability.

Related Documents

- docs/agents-log.md
- docs/009-agent-workflow.md
- docs/011-agent-contract.md

Revision History

- 1.0 Draft — Initial creation
