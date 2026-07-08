import { FirebaseDecodedToken } from './firebase-decoded-token';

export const FIREBASE_TOKEN_VERIFIER = Symbol('FIREBASE_TOKEN_VERIFIER');

export interface FirebaseTokenVerifier {
  verifyIdToken(token: string): Promise<FirebaseDecodedToken>;
}
