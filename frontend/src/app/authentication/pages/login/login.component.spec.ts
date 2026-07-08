import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthStateService } from '../../services/auth-state.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let authState: MockAuthStateService;

  beforeEach(async () => {
    authState = new MockAuthStateService();

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: AuthStateService, useValue: authState }, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('submits email and password login credentials', async () => {
    setInputValue(fixture, '#login-email', 'player@example.com');
    setInputValue(fixture, '#login-password', 'password123');

    submitForm(fixture);
    await fixture.whenStable();

    expect(authState.loginCredentials).toEqual({
      email: 'player@example.com',
      password: 'password123'
    });
  });

  it('starts Google Sign-In from the secondary action', async () => {
    const googleButton = fixture.nativeElement.querySelector('.secondary-button') as HTMLButtonElement;

    googleButton.click();
    await fixture.whenStable();

    expect(authState.googleLoginCount).toBe(1);
  });
});

class MockAuthStateService {
  public loginCredentials: unknown = null;
  public googleLoginCount = 0;

  public async login(credentials: unknown): Promise<void> {
    this.loginCredentials = credentials;
  }

  public async loginWithGoogle(): Promise<void> {
    this.googleLoginCount += 1;
  }
}

function setInputValue<TComponent>(fixture: ComponentFixture<TComponent>, selector: string, value: string): void {
  const input = fixture.nativeElement.querySelector(selector) as HTMLInputElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

function submitForm<TComponent>(fixture: ComponentFixture<TComponent>): void {
  const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
  form.dispatchEvent(new Event('submit'));
  fixture.detectChanges();
}
