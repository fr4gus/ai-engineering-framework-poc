import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  Unsubscribe,
  updateProfile,
  User
} from 'firebase/auth';

import { environment } from '../../../environments/environment';
import { LoginCredentials, RegisterCredentials } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private readonly app: FirebaseApp;
  private readonly auth: Auth;
  private readonly googleProvider = new GoogleAuthProvider();
  private readonly persistenceReady: Promise<void>;

  public constructor() {
    this.app = initializeFirebase(environment.firebase);
    this.auth = getAuth(this.app);
    this.persistenceReady = setPersistence(this.auth, browserLocalPersistence);
  }

  public onAuthStateChanged(next: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(this.auth, next);
  }

  public async register(credentials: RegisterCredentials): Promise<User> {
    await this.persistenceReady;
    const credential = await createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password);
    await updateProfile(credential.user, { displayName: credentials.username });
    await credential.user.getIdToken(true);
    return credential.user;
  }

  public async login(credentials: LoginCredentials): Promise<User> {
    await this.persistenceReady;
    const credential = await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);
    await credential.user.getIdToken();
    return credential.user;
  }

  public async loginWithGoogle(): Promise<User> {
    await this.persistenceReady;
    const credential = await signInWithPopup(this.auth, this.googleProvider);
    await credential.user.getIdToken();
    return credential.user;
  }

  public async sendPasswordReset(email: string): Promise<void> {
    await this.persistenceReady;
    await sendPasswordResetEmail(this.auth, email);
  }

  public async logout(): Promise<void> {
    await this.persistenceReady;
    await signOut(this.auth);
  }

  public async getIdToken(forceRefresh = false): Promise<string | null> {
    await this.persistenceReady;
    const currentUser = this.auth.currentUser;

    if (currentUser === null) {
      return null;
    }

    return currentUser.getIdToken(forceRefresh);
  }
}

function initializeFirebase(options: FirebaseOptions): FirebaseApp {
  const existingApp = getApps()[0];
  return existingApp ?? initializeApp(options);
}
