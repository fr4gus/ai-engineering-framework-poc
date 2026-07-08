import { Request } from 'express';
import { FirebaseDecodedToken } from './firebase-decoded-token';

export type AuthenticatedRequest = Request & {
  firebaseUser?: FirebaseDecodedToken;
};
