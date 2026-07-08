# Authentication Core Bolt

**Bolt ID:** BOLT-001  
**Title:** Authentication Core  
**Status:** Accepted  
**Priority:** Critical  
**Type:** Feature  
**Created:** 2026-07-07  
**Last Updated:** 2026-07-08  
**Feature:** FEATURE-001 Authentication  
**Requirement IDs:** US-001, US-002, US-003, FR-AUTH-001, FR-AUTH-002, FR-AUTH-003, FR-AUTH-004, FR-AUTH-005, FR-AUTH-006, AC-001, AC-002, AC-003, AC-004, NFR-SEC-001, NFR-SEC-002, NFR-SEC-003, NFR-SEC-004, BR-010  
**Estimated Complexity:** L  
**Dependencies:** Approved documentation baseline, Firebase Authentication, PostgreSQL, Prisma, Angular, NestJS, REST API contract  
**Assigned Agents:** Backend Agent, Frontend Agent  
**Reviewer:** Reviewer Agent  
**Tester:** Tester Agent  
**Target Bolt:** BOLT-001  
**Related ADRs:** ADR-002, ADR-003, ADR-004, ADR-005, ADR-006, ADR-007, ADR-008

---

# Objective

Implement the authentication foundation that allows users to register, sign in, sign out, authenticate with Google, reset passwords, and access backend-protected user context through Firebase ID token validation and application user mapping.

---

# Background

The approved MVP starts with authentication because later gameplay, leaderboard, and statistics Bolts depend on stable user identity. The baseline architecture uses Angular for the frontend, NestJS for the backend, Firebase Authentication for identity, PostgreSQL for application data, Prisma for persistence, REST endpoints under `/api/v1`, and feature-first source organization.

Firebase owns credential authentication. The backend validates Firebase ID tokens, maps Firebase users to the application `User` record, and enforces protected-resource access. Passwords must never be stored in application data.

---

# Scope

- Create only the implementation scaffolding required to support this Bolt because no `frontend/`, `backend/`, or Prisma implementation directories exist yet.
- Configure an Angular authentication feature area for login, registration, logout, password reset, and Google Sign-In UI integration.
- Configure Firebase Authentication client integration for email/password, Google Sign-In, sign-out, password reset, and ID token retrieval.
- Configure a NestJS authentication feature area that validates Firebase ID tokens from `Authorization: Bearer <firebase_id_token>`.
- Implement application user creation or lookup in PostgreSQL through Prisma using Firebase UID, username, and email.
- Implement `GET /api/v1/auth/me` to return the authenticated application user profile using the standard API response envelope.
- Enforce protected-route behavior for `GET /api/v1/auth/me` and return consistent auth errors for missing or invalid tokens.
- Add the minimum shared API/client wiring needed for the frontend to call protected backend endpoints with Firebase ID tokens.
- Add test coverage for Firebase token validation, user mapping, protected route behavior, frontend auth flows, and auth integration boundaries.
- Document environment variables, local setup steps, and validation commands introduced by this Bolt.

---

# Out of Scope

- Gameplay, puzzle retrieval, attempts, completion, statistics, leaderboard, archive, and scoring behavior.
- Guest attempt persistence or guest gameplay implementation.
- User profile editing, preferences, avatars, settings beyond logout, and account deletion.
- Custom password storage, custom JWT issuance, custom session cookies, or Firestore application data.
- Production deployment, CI/CD pipeline creation, observability dashboards, or rate limiting.
- Real production Firebase project provisioning unless already available through environment configuration.
- Assigning implementation, tester, or reviewer agents.

---

# Requirements Covered

- US-001: Register account.
- US-002: Sign in.
- US-003: Sign in with Google.
- FR-AUTH-001: Register with username, email, and password.
- FR-AUTH-002: Enforce unique usernames.
- FR-AUTH-003: Authenticate with email and password.
- FR-AUTH-004: Sign out authenticated users.
- FR-AUTH-005: Support Google Sign-In.
- FR-AUTH-006: Support password reset.
- AC-001: Visitor can create an account.
- AC-002: Registered user can sign in.
- AC-003: Registered user can sign out.
- AC-004: Visitor can authenticate using Google Sign-In.
- NFR-SEC-001: Passwords are never stored in plain text.
- NFR-SEC-002: Only authenticated users may access protected resources.
- NFR-SEC-003: Authentication foundation required before authenticated leaderboard score submission can be enforced.
- NFR-SEC-004: Authenticated requests require a valid access token.
- BR-010: Timestamps use UTC.

---

# Dependencies

- Existing approved baseline documentation:
  - `docs/001-prd.md`
  - `docs/003-ui-ux.md`
  - `docs/004-architecture.md`
  - `docs/005-database.md`
  - `docs/006-api-spec.md`
  - `docs/008-testing-strategy.md`
  - `docs/012-conventions.md`
  - `docs/traceability-matrix.md`
- ADRs:
  - `docs/adr/ADR-002-angular.md`
  - `docs/adr/ADR-003-nestjs.md`
  - `docs/adr/ADR-004-firebase-auth.md`
  - `docs/adr/ADR-005-postgresql.md`
  - `docs/adr/ADR-006-prisma.md`
  - `docs/adr/ADR-007-feature-first-structure.md`
  - `docs/adr/ADR-008-rest-api.md`
- External services and libraries:
  - Firebase Authentication with Email/Password and Google Sign-In enabled.
  - PostgreSQL database available for local development or tests.
  - Prisma migrations and generated client.
  - Angular and NestJS project scaffolding.

---

# Deliverables

- Minimal frontend Angular scaffold if absent, organized feature-first with an `authentication` feature.
- Minimal backend NestJS scaffold if absent, organized feature-first with `authentication`, `users`, and shared/common support as needed.
- Prisma schema and migration for the application `User` entity and required indexes.
- Firebase client configuration and Firebase Admin validation integration using environment variables.
- Auth UI for registration, login, logout, password reset initiation, and Google Sign-In.
- Protected backend auth guard or equivalent NestJS mechanism for Firebase ID token validation.
- `GET /api/v1/auth/me` endpoint using the documented response envelope.
- Frontend API client/interceptor or equivalent mechanism that attaches the current Firebase ID token to protected requests.
- Automated tests required by `docs/008-testing-strategy.md`.
- Updated README or setup documentation for commands and environment variables introduced by the new implementation.
- Test report artifact for BOLT-001.
- Agent log entries from implementation, testing, and review agents during later lifecycle states.

---

# Acceptance Criteria

## AC-1 - Registration: FR-AUTH-001, FR-AUTH-002, AC-001, NFR-SEC-001
Given a visitor provides a username, email, password, and matching confirmation password  
When they submit the registration flow  
Then Firebase creates the credential identity, the backend creates or maps exactly one application `User` record with unique `firebase_uid`, unique `username`, and unique `email`, and no plaintext password is stored in PostgreSQL.

## AC-2 - Duplicate Username: FR-AUTH-002
Given an existing application user already owns a username  
When another visitor attempts to register or map an account with the same username  
Then the operation fails with a user-facing validation error and no duplicate `User` row is persisted.

## AC-3 - Email/Password Sign-In: FR-AUTH-003, AC-002
Given a registered user with valid Firebase email/password credentials  
When they sign in from the login screen  
Then the frontend stores Firebase authentication state, retrieves a Firebase ID token, and can successfully call `GET /api/v1/auth/me`.

## AC-4 - Sign-Out: FR-AUTH-004, AC-003
Given an authenticated user is signed in  
When they choose logout  
Then Firebase auth state is cleared on the frontend, protected API calls no longer include a valid token, and protected authenticated screens redirect or block access according to the auth route state.

## AC-5 - Google Sign-In: FR-AUTH-005, AC-004
Given a visitor chooses Google Sign-In  
When Firebase returns a valid Google-authenticated identity  
Then the frontend receives an ID token, the backend validates it, and the application creates or fetches the matching `User` record without requiring email/password credential storage.

## AC-6 - Password Reset: FR-AUTH-006
Given a visitor enters an email address on the password reset flow  
When they request password reset  
Then the frontend invokes Firebase password reset behavior and displays a non-blocking success or error state without sending or storing passwords in the application backend.

## AC-7 - Protected Backend Access: NFR-SEC-002, NFR-SEC-004
Given a request to `GET /api/v1/auth/me` has no `Authorization` header or has a malformed bearer token  
When the backend handles the request  
Then it returns the standard error envelope with `AUTH_REQUIRED` or `AUTH_INVALID_TOKEN` and does not return user profile data.

## AC-8 - Firebase Token Validation: NFR-SEC-004
Given a request to `GET /api/v1/auth/me` includes a valid Firebase ID token  
When the backend validates the token  
Then it returns `success: true` with the current application user profile containing `id`, `username`, and `email`.

## AC-9 - User Mapping Idempotency: FR-AUTH-001, FR-AUTH-003, FR-AUTH-005
Given a Firebase-authenticated user calls a protected backend endpoint multiple times  
When the backend maps the Firebase UID to application data  
Then the same application `User` record is reused and duplicate users are not created.

## AC-10 - UTC Persistence: BR-010
Given a user record or audit-relevant authentication timestamp is persisted by this Bolt  
When the data is written to PostgreSQL  
Then timestamps are stored using UTC-compatible values.

## AC-11 - Frontend Auth Screens: AC-001, AC-002, AC-003, AC-004
Given a visitor opens the application  
When they navigate through login, register, Google Sign-In, password reset, and logout paths  
Then each flow has accessible form controls, visible loading/error states for asynchronous work, and routes according to the UI/UX screen inventory.

## AC-12 - Testability: BOLT-001 Required Validation
Given this Bolt is submitted for testing  
When the test suite runs  
Then backend auth integration tests mock Firebase, protected route tests verify valid/missing/invalid token outcomes, frontend tests cover auth UI behavior, and the test report records all commands and results.

---

# Implementation Notes

- Treat Firebase Authentication as the credential authority. The application must not store passwords or issue replacement auth tokens.
- Use the REST base path `/api/v1` and the documented response envelope.
- Use `Authorization: Bearer <firebase_id_token>` for authenticated backend requests.
- Prefer a NestJS guard or equivalent framework-native mechanism for protected routes.
- Keep controllers focused on HTTP concerns and services focused on application logic.
- Store only application metadata in PostgreSQL: Firebase UID, username, email, and UTC timestamps.
- Use singular table naming conventions where practical and preserve logical field names from `docs/005-database.md`.
- Follow feature-first structure:
  - `frontend/src/app/authentication/`
  - `backend/src/authentication/`
  - `backend/src/users/`
- Use strict TypeScript settings, avoid `any`, and expose explicit return types for exported functions.
- If Firebase or database credentials are unavailable locally, provide deterministic mock/test configuration and document the missing runtime configuration in the BOLT-001 test report.

---

# Testing Notes

- Backend integration tests must mock Firebase token verification.
- Backend tests must cover:
  - valid token returns current user profile,
  - missing token returns `AUTH_REQUIRED`,
  - invalid token returns `AUTH_INVALID_TOKEN`,
  - duplicate username is rejected,
  - repeated valid token mapping is idempotent.
- Prisma/database tests must verify `User` uniqueness for `firebase_uid`, `username`, and `email`.
- Frontend tests must cover:
  - registration form validation and submission behavior,
  - login behavior,
  - Google Sign-In trigger behavior,
  - password reset request behavior,
  - logout behavior,
  - token attachment for protected API calls.
- E2E or acceptance-level validation should cover the minimum happy paths for registration, sign-in, sign-out, and Google auth using the configured test strategy.
- Test results must be recorded in `docs/test-reports/` for BOLT-001 during execution.

---

# Review Notes

## Reviewer Re-Review - 2026-07-08

Decision: APPROVED.

- Rework closes the prior blocker: registration, email/password login, and Google Sign-In now call `GET /api/v1/auth/me` through `ApiClientService.getCurrentUserProfile()` before dashboard navigation, triggering backend application user mapping after Firebase authentication.
- Architecture, code quality, conventions, and deterministic test coverage are sufficient for BOLT-001 acceptance.
- Residual live Firebase/PostgreSQL/E2E validation and npm audit findings remain documented follow-up risks outside BOLT-001 acceptance scope.

## Reviewer Technical Review - 2026-07-08

Decision: REQUIRES REWORK.

- BOLT-001 cannot move to Accepted because the submitted registration and Google Sign-In/frontend authentication flows do not call `GET /api/v1/auth/me` or otherwise trigger backend user mapping after Firebase authentication. As a result, the application `User` row is not created during the submitted registration/auth flow, which does not satisfy AC-1 and AC-5 as written.
- Backend architecture, Firebase token validation, protected endpoint behavior, Prisma user metadata model, response envelopes, and feature-first structure are otherwise aligned with the approved architecture and conventions.
- Required rework: hydrate/map the backend application user profile after successful registration and Google Sign-In, and add frontend test coverage proving the protected backend profile call is made with the Firebase ID token.

## Engineering Manager Assignment - 2026-07-07

Decision: APPROVED and ASSIGNED for implementation.

- Backend Agent is assigned to backend authentication scaffolding, Firebase ID token validation, user mapping, Prisma persistence, protected auth endpoint behavior, and backend test coverage within BOLT-001 scope.
- Frontend Agent is assigned to Angular authentication scaffolding, Firebase client auth flows, protected API token attachment, auth route behavior, and frontend test coverage within BOLT-001 scope.
- Tester Agent is assigned to execute BOLT-001 acceptance validation and produce the required test report after implementation.
- Reviewer Agent is assigned to perform final technical review after testing passes.
- No blockers were found in dependencies, acceptance criteria, traceability, or Architect validation.

## Architecture Validation - 2026-07-07

Decision: APPROVED for architecture readiness; pending Engineering Manager approval before implementation.

- Domain boundaries are valid: authentication and user identity mapping stay within the Identity/Auth and Users domains, with gameplay, attempts, statistics, leaderboard, archive, scoring, and puzzle behavior explicitly out of scope.
- API alignment is valid: protected user context uses `GET /api/v1/auth/me`, Firebase ID token bearer authentication, and the standard success/error response envelope from `docs/006-api-spec.md`.
- Data model alignment is valid: PostgreSQL stores only application `User` metadata defined in `docs/005-database.md` (`firebase_uid`, `username`, `email`, UTC timestamps) with required uniqueness constraints; Firebase remains the credential authority.
- Frontend/backend separation is valid: Angular owns presentation, Firebase client auth state, ID token retrieval, and API calls; NestJS owns token validation, protected access, user mapping, and application logic.
- Firebase/PostgreSQL responsibility split is valid: no custom password storage, no custom application JWT/session replacement, and no Firestore application data are allowed.
- Feature-first structure is valid: planned paths align with ADR-007 and `docs/012-conventions.md` for `frontend/src/app/authentication/`, `backend/src/authentication/`, and `backend/src/users/`.

- Reject implementations that create custom password storage or bypass Firebase Authentication.
- Reject implementations that use Firestore for MVP application data.
- Reject implementations that expose protected user profile data without a validated Firebase ID token.
- Reject implementations that place business rules in Angular components or mix unrelated gameplay functionality into this Bolt.
- Verify documentation updates include exact install, build, test, and run commands once implementation scaffolding exists.

---

# Risks

- Firebase project configuration may be unavailable during local execution.
  - Impact: Real provider validation and Google Sign-In may be limited outside test mocks.
  - Mitigation: Use mocked Firebase in automated tests and document required environment variables for real provider runs.
- Combining initial frontend and backend scaffolding with auth may increase first Bolt size.
  - Impact: More setup and integration work than later feature Bolts.
  - Mitigation: Keep scaffolding minimal and limited to authentication execution needs.
- Username uniqueness spans Firebase and application data only partially.
  - Impact: Firebase does not own application username uniqueness.
  - Mitigation: Enforce username uniqueness in PostgreSQL and backend application logic.
- Google Sign-In browser behavior can be hard to automate consistently.
  - Impact: E2E coverage may require provider mocks or emulator-supported flows.
  - Mitigation: Require deterministic tests for token handling and document any real-provider validation gaps in the test report.

---

# Open Questions

No blocking open questions for Planner completion. Runtime Firebase project credentials and provider settings are implementation setup inputs, not product or architecture ambiguities.

---

# Completion Summary

BOLT-001 completed implementation, rework, Tester Agent revalidation PASS, and Reviewer Agent approval on 2026-07-08. The accepted authentication foundation supports Firebase registration, email/password login, Google Sign-In, logout, password reset, protected `/api/v1/auth/me` access, and backend application user mapping through PostgreSQL/Prisma.

---

# Notes

This Bolt is the first implementation Bolt from the approved baseline and is intentionally foundational. Later Bolts should consume authenticated user identity but must not expand this Bolt into gameplay, statistics, leaderboard, or deployment work.
