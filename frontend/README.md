# Daily Logic Challenge Frontend

Angular standalone scaffold for BOLT-001 authentication.

## Commands

```bash
npm install
npm start
npm test
npm run build
```

Dependency installation is required before running Angular CLI commands.

## Runtime Configuration

Firebase credentials are isolated in `src/environments/environment.ts` and `src/environments/environment.development.ts`.

Production placeholders to replace during build or deployment:

- `__FIREBASE_API_KEY__`
- `__FIREBASE_AUTH_DOMAIN__`
- `__FIREBASE_PROJECT_ID__`
- `__FIREBASE_APP_ID__`

Protected backend requests target `/api/v1` and attach `Authorization: Bearer <firebase_id_token>` when a Firebase user token is available.
