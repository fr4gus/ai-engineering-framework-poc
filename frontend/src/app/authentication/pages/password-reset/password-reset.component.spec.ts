import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthStateService } from '../../services/auth-state.service';
import { PasswordResetComponent } from './password-reset.component';

describe('PasswordResetComponent', () => {
  let fixture: ComponentFixture<PasswordResetComponent>;
  let authState: MockAuthStateService;

  beforeEach(async () => {
    authState = new MockAuthStateService();

    await TestBed.configureTestingModule({
      imports: [PasswordResetComponent],
      providers: [{ provide: AuthStateService, useValue: authState }, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetComponent);
    fixture.detectChanges();
  });

  it('sends a password reset request for a valid email', async () => {
    setInputValue(fixture, '#password-reset-email', 'player@example.com');

    submitForm(fixture);
    await fixture.whenStable();

    expect(authState.passwordResetEmail).toBe('player@example.com');
  });
});

class MockAuthStateService {
  public passwordResetEmail = '';

  public async sendPasswordReset(email: string): Promise<void> {
    this.passwordResetEmail = email;
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
