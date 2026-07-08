import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthStateService } from '../../authentication/services/auth-state.service';
import { ApiClientService } from './api-client.service';
import { authTokenInterceptor } from './auth-token.interceptor';

describe('authTokenInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let authState: MockAuthStateService;
  let apiClient: ApiClientService;

  beforeEach(() => {
    authState = new MockAuthStateService();

    TestBed.configureTestingModule({
      providers: [
        ApiClientService,
        { provide: AuthStateService, useValue: authState },
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    apiClient = TestBed.inject(ApiClientService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('attaches a bearer Firebase ID token to protected API calls', fakeAsync(() => {
    apiClient.getCurrentUserProfile().subscribe();
    tick();

    const request = httpTestingController.expectOne('/api/v1/auth/me');
    expect(request.request.headers.get('Authorization')).toBe('Bearer firebase-id-token');
    request.flush({
      success: true,
      data: {
        id: 'user-id',
        username: 'player1',
        email: 'player@example.com'
      }
    });
  }));

  it('does not attach Authorization when no Firebase ID token exists', fakeAsync(() => {
    authState.token = null;

    apiClient.getCurrentUserProfile().subscribe();
    tick();

    const request = httpTestingController.expectOne('/api/v1/auth/me');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    request.flush({
      success: false,
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Authentication required'
      }
    });
  }));
});

class MockAuthStateService {
  public token: string | null = 'firebase-id-token';

  public async getIdToken(): Promise<string | null> {
    return this.token;
  }
}
