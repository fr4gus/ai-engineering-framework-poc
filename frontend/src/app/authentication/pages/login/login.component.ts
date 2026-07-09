import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly authState = inject(AuthStateService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  protected isSubmitting = false;
  protected errorMessage = '';

  protected async submit(): Promise<void> {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    try {
      await this.authState.login(this.loginForm.getRawValue());
    } catch (error: unknown) {
      this.errorMessage = toUserFacingError(error, 'Unable to sign in. Check your email and password.');
    } finally {
      this.isSubmitting = false;
    }
  }

  protected async loginWithGoogle(): Promise<void> {
    this.errorMessage = '';
    this.isSubmitting = true;

    try {
      await this.authState.loginWithGoogle();
    } catch (error: unknown) {
      this.errorMessage = toUserFacingError(error, 'Unable to sign in with Google.');
    } finally {
      this.isSubmitting = false;
    }
  }
}

function toUserFacingError(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
}
