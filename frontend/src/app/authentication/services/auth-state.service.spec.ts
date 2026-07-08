import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, of } from 'rxjs';

import { ApiResponse, CurrentUserProfile } from '../../core/api/api.types';
import { ApiClientService } from '../../core/api/api-client.service';
import { AuthStateService } from './auth-state.service';
import { FirebaseAuthService } from './firebase-auth.service';

describe('AuthStateService', () => {
  let firebaseAuth: MockFirebaseAuthService;
  let apiClient: MockApiClientService;
  let router: MockRouter;

  beforeEach(() => {
    firebaseAuth = new MockFirebaseAuthService();
    apiClient = new MockApiClientService();
    router = new MockRouter();

    TestBed.configureTestingModule({
      providers: [
        AuthStateService,
        { provide: FirebaseAuthService, useValue: firebaseAuth },
        { provide: ApiClientService, useValue: apiClient },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('maps Firebase auth state into current user state', () => {
    const service = TestBed.inject(AuthStateService);

    firebaseAuth.emitUser(createFirebaseUser('user-1', 'player@example.com', 'player1'));

    expect(service.currentUser).toEqual({
      uid: 'user-1',
      email: 'player@example.com',
      displayName: 'player1'
    });
  });

  it('registers with username, email, and password then routes to dashboard', async () => {
    const service = TestBed.inject(AuthStateService);

    await service.register({
      username: 'player1',
      email: 'player@example.com',
      password: 'password123'
    });

    expect(firebaseAuth.registerCredentials).toEqual({
      username: 'player1',
      email: 'player@example.com',
      password: 'password123'
    });
    expect(apiClient.currentUserProfileCallCount).toBe(1);
    expect(service.currentUser?.displayName).toBe('player1');
    expect(router.lastNavigation).toBe('/dashboard');
  });

  it('logs in with email and password then routes to dashboard', async () => {
    const service = TestBed.inject(AuthStateService);

    await service.login({
      email: 'player@example.com',
      password: 'password123'
    });

    expect(firebaseAuth.loginCredentials).toEqual({
      email: 'player@example.com',
      password: 'password123'
    });
    expect(apiClient.currentUserProfileCallCount).toBe(1);
    expect(router.lastNavigation).toBe('/dashboard');
  });

  it('starts Google Sign-In and routes to dashboard', async () => {
    const service = TestBed.inject(AuthStateService);

    await service.loginWithGoogle();

    expect(firebaseAuth.googleLoginCount).toBe(1);
    expect(apiClient.currentUserProfileCallCount).toBe(1);
    expect(router.lastNavigation).toBe('/dashboard');
  });

  it('sends password reset email without routing', async () => {
    const service = TestBed.inject(AuthStateService);

    await service.sendPasswordReset('player@example.com');

    expect(firebaseAuth.passwordResetEmail).toBe('player@example.com');
    expect(router.lastNavigation).toBe('');
  });

  it('logs out, clears current user, and routes to login', async () => {
    const service = TestBed.inject(AuthStateService);
    firebaseAuth.emitUser(createFirebaseUser('user-1', 'player@example.com', 'player1'));

    await service.logout();

    expect(firebaseAuth.logoutCount).toBe(1);
    expect(service.currentUser).toBeNull();
    expect(router.lastNavigation).toBe('/login');
  });

  it('retrieves the Firebase ID token for protected API calls', async () => {
    const service = TestBed.inject(AuthStateService);

    const token = await service.getIdToken();

    expect(token).toBe('firebase-id-token');
  });
});

class MockFirebaseAuthService {
  public registerCredentials: unknown = null;
  public loginCredentials: unknown = null;
  public googleLoginCount = 0;
  public logoutCount = 0;
  public passwordResetEmail = '';

  private authStateCallback: (user: User | null) => void = () => undefined;

  public onAuthStateChanged(next: (user: User | null) => void): () => void {
    this.authStateCallback = next;
    return () => undefined;
  }

  public emitUser(user: User | null): void {
    this.authStateCallback(user);
  }

  public async register(credentials: unknown): Promise<User> {
    this.registerCredentials = credentials;
    return createFirebaseUser('registered-user', 'player@example.com', 'player1');
  }

  public async login(credentials: unknown): Promise<User> {
    this.loginCredentials = credentials;
    return createFirebaseUser('login-user', 'player@example.com', null);
  }

  public async loginWithGoogle(): Promise<User> {
    this.googleLoginCount += 1;
    return createFirebaseUser('google-user', 'player@gmail.com', 'Google Player');
  }

  public async sendPasswordReset(email: string): Promise<void> {
    this.passwordResetEmail = email;
  }

  public async logout(): Promise<void> {
    this.logoutCount += 1;
  }

  public async getIdToken(): Promise<string> {
    return 'firebase-id-token';
  }
}

class MockApiClientService {
  public currentUserProfileCallCount = 0;

  public getCurrentUserProfile(): Observable<ApiResponse<CurrentUserProfile>> {
    this.currentUserProfileCallCount += 1;
    return of({
      success: true,
      data: {
        id: 'user-id',
        username: 'player1',
        email: 'player@example.com'
      },
      meta: {}
    });
  }
}

class MockRouter {
  public lastNavigation = '';

  public async navigateByUrl(url: string): Promise<boolean> {
    this.lastNavigation = url;
    return true;
  }
}

function createFirebaseUser(uid: string, email: string, displayName: string | null): User {
  return {
    uid,
    email,
    displayName,
    getIdToken: async () => 'firebase-id-token'
  } as User;
}
