# Backend

NestJS backend scaffold for BOLT-001 authentication.

## Setup

Install dependencies from this directory, then configure `.env` from `.env.example`.

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm test
```

Firebase credentials are read from `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`. If they are absent, Firebase Admin falls back to application default credentials.

The backend serves authenticated routes under `/api/v1`.
