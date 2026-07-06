# ADR-004 — Firebase Authentication

Here's one recommendation I'd like to make.

Earlier we discussed Firebase for authentication. I'd refine that decision:

Use Firebase Authentication (Email/Password + Google Sign-In).
Keep application data in PostgreSQL.
Do not use Firestore for the MVP.

That gives us:

Browser
      │
      ▼
Firebase Auth
      │
JWT
      ▼
NestJS
      │
PostgreSQL

This separation keeps authentication simple while allowing us to own our business data and makes it easier to swap authentication providers in the future if needed.