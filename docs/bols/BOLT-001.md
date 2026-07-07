# Bolt Template

**Bolt ID:** BOLT-001
**Title:** User Authentication System
**Type:** Feature
**Complexity:** M
**Status:** Draft  

---

# Objective
Implement JWT-based authentication (email/password + Google OAuth) for user registration and login.

---

# Background
Users need secure authentication to create accounts, authenticate requests, and access personalized features.

---

# Scope
- Backend: registration, login, JWT issuance & validation
- Password hashing with bcrypt
- Optional: Google OAuth flow (frontend + backend)
- Token-based auth for API endpoints

---

# Out of Scope
- Refresh token rotation (deferred)
- Advanced account recovery flows

---

# Requirements Covered
- FR-AUTH-001
- FR-AUTH-002
- FR-AUTH-003

---

# Dependencies
- BOLT-005 (Database Initialization)
- External: Google OAuth credentials (optional)

---

# Acceptance Criteria

## AC-1
Given a new user registration request with valid email and password
When the user submits the registration form
Then the system stores the user with a bcrypt-hashed password and returns a 201 with a JWT

## AC-2
Given an existing user with valid credentials
When the user posts to /auth/login with correct email/password
Then the system returns a valid JWT (HS256) and 200 response

## AC-3
Given an API request with Authorization: Bearer <token>
When the token is valid and not expired
Then the API authenticates the user and permits access to protected endpoints

## AC-4
Given a user chooses Google OAuth and provides consent
When the OAuth callback completes successfully
Then the system creates or links a user account and returns a JWT

---

# Technical Notes
- Use bcrypt for password hashing
- JWT algorithm: HS256; secret stored in env
- Token TTL: 24 hours

---

# Risks
- Secret management for JWT
- OAuth credential configuration complexity

---

# Open Questions
- Should refresh tokens be implemented now or later?

---

# Estimated Effort
M

---

# Notes
Store auth routes under /api/v1/auth
