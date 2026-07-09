import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent {
  private readonly authState = inject(AuthStateService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly passwordResetForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  protected isSubmitting = false;
  protected errorMessage = '';
  protected successMessage = '';

  protected async submit(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.passwordResetForm.invalid) {
      this.passwordResetForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    try {
      await this.authState.sendPasswordReset(this.passwordResetForm.getRawValue().email);
      this.successMessage = 'Password reset email sent.';
    } catch (error: unknown) {
      this.errorMessage = toUserFacingError(error, 'Unable to send password reset email.');
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
