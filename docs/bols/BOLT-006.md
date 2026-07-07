# Bolt Template

**Bolt ID:** BOLT-006
**Title:** Frontend - Authentication UI
**Type:** Feature
**Complexity:** S
**Status:** Draft

---

# Objective
Implement frontend components for user registration, login, and OAuth flows.

---

# Background
Users require a simple, accessible UI to sign up, sign in, and manage sessions.

---

# Scope
- Login and registration pages/components
- Google OAuth button & redirect handling
- Persist JWT in secure storage (e.g., HttpOnly cookie or secure storage)

---

# Out of Scope
- Account recovery and settings pages

---

# Requirements Covered
- FR-UI-AUTH-001

---

# Dependencies
- BOLT-001 (User Authentication)

---

# Acceptance Criteria

## AC-1
Given the login page
When a user provides valid credentials and submits
Then the frontend stores the returned JWT securely and navigates to the dashboard

## AC-2
Given the registration page
When a user submits valid registration data
Then the frontend shows success and prompts for login or auto-authenticates if API returns token

## AC-3
Given a user selects Google OAuth
When the OAuth flow completes successfully
Then the frontend receives the JWT and logs the user in

---

# Technical Notes
- Use ngx-auth or similar for token handling if Angular used
- Prefer HttpOnly cookie for token storage to mitigate XSS

---

# Risks
- Incorrect token storage may introduce vulnerabilities

---

# Open Questions
- Use localStorage + secure patterns or HttpOnly cookies?

---

# Estimated Effort
S

---

# Notes
Coordinate with backend auth endpoints (/api/v1/auth)
