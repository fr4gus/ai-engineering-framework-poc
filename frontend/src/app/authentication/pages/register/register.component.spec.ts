import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthStateService } from '../../services/auth-state.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let authState: MockAuthStateService;

  beforeEach(async () => {
    authState = new MockAuthStateService();

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [{ provide: AuthStateService, useValue: authState }, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
  });

  it('submits username, email, and password when confirmation matches', async () => {
    setInputValue(fixture, '#register-username', 'player1');
    setInputValue(fixture, '#register-email', 'player@example.com');
    setInputValue(fixture, '#register-password', 'password123');
    setInputValue(fixture, '#register-confirm-password', 'password123');

    submitForm(fixture);
    await fixture.whenStable();

    expect(authState.registerCredentials).toEqual({
      username: 'player1',
      email: 'player@example.com',
      password: 'password123'
    });
  });

  it('blocks registration when passwords do not match', async () => {
    setInputValue(fixture, '#register-username', 'player1');
    setInputValue(fixture, '#register-email', 'player@example.com');
    setInputValue(fixture, '#register-password', 'password123');
    setInputValue(fixture, '#register-confirm-password', 'different123');

    submitForm(fixture);
    await fixture.whenStable();

    expect(authState.registerCredentials).toBeNull();
  });
});

class MockAuthStateService {
  public registerCredentials: unknown = null;

  public async register(credentials: unknown): Promise<void> {
    this.registerCredentials = credentials;
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
