import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { firstValueFrom } from 'rxjs';

import { ApiClientService } from '../../core/api/api-client.service';
import { AuthenticatedUser, LoginCredentials, RegisterCredentials } from '../models/auth.models';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly apiClient = inject(ApiClientService);
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly router = inject(Router);
  private readonly currentUserSubject = new BehaviorSubject<AuthenticatedUser | null>(null);
  private authStateResolved = false;

  public readonly currentUser$: Observable<AuthenticatedUser | null> = this.currentUserSubject.asObservable();

  public constructor() {
    this.firebaseAuth.onAuthStateChanged((user) => {
      this.authStateResolved = true;
      this.currentUserSubject.next(toAuthenticatedUser(user));
    });
  }

  public get currentUser(): AuthenticatedUser | null {
    return this.currentUserSubject.value;
  }

  public get isAuthStateResolved(): boolean {
    return this.authStateResolved;
  }

  public async register(credentials: RegisterCredentials): Promise<void> {
    const user = await this.firebaseAuth.register(credentials);
    this.currentUserSubject.next(toAuthenticatedUser(user));
    await this.hydrateApplicationUser();
    await this.router.navigateByUrl('/dashboard');
  }

  public async login(credentials: LoginCredentials): Promise<void> {
    const user = await this.firebaseAuth.login(credentials);
    this.currentUserSubject.next(toAuthenticatedUser(user));
    await this.hydrateApplicationUser();
    await this.router.navigateByUrl('/dashboard');
  }

  public async loginWithGoogle(): Promise<void> {
    const user = await this.firebaseAuth.loginWithGoogle();
    this.currentUserSubject.next(toAuthenticatedUser(user));
    await this.hydrateApplicationUser();
    await this.router.navigateByUrl('/dashboard');
  }

  public async sendPasswordReset(email: string): Promise<void> {
    await this.firebaseAuth.sendPasswordReset(email);
  }

  public async logout(): Promise<void> {
    await this.firebaseAuth.logout();
    this.currentUserSubject.next(null);
    await this.router.navigateByUrl('/login');
  }

  public async getIdToken(forceRefresh = false): Promise<string | null> {
    return this.firebaseAuth.getIdToken(forceRefresh);
  }

  private async hydrateApplicationUser(): Promise<void> {
    await firstValueFrom(this.apiClient.getCurrentUserProfile());
  }
}

function toAuthenticatedUser(user: User | null): AuthenticatedUser | null {
  if (user === null) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  };
}
