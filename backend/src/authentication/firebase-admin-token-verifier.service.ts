import { Injectable } from '@nestjs/common';
import {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
  App,
  Credential
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FirebaseDecodedToken } from './firebase-decoded-token';
import { FirebaseTokenVerifier } from './firebase-token-verifier';

@Injectable()
export class FirebaseAdminTokenVerifierService implements FirebaseTokenVerifier {
  private readonly app: App;

  constructor() {
    const [existingApp] = getApps();
    this.app = existingApp ?? initializeApp({ credential: this.resolveCredential() });
  }

  async verifyIdToken(token: string): Promise<FirebaseDecodedToken> {
    const decodedToken = await getAuth(this.app).verifyIdToken(token);
    const claims = decodedToken as Record<string, unknown>;
    const username = typeof claims.username === 'string' ? claims.username : undefined;
    const name = typeof claims.name === 'string' ? claims.name : undefined;

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      username,
      name
    };
  }

  private resolveCredential(): Credential {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (projectId !== undefined && clientEmail !== undefined && privateKey !== undefined) {
      return cert({
        projectId,
        clientEmail,
        privateKey
      });
    }

    return applicationDefault();
  }
}
