# ADR-008 — REST API

I recommend REST instead of GraphQL for the MVP.

Reasons:

Simpler.
Easier to document.
Easier to debug.
Works well with Angular.
Straightforward caching.
Plenty of tooling.

If the application's requirements evolve, we can always add GraphQL later without changing the core domain model.