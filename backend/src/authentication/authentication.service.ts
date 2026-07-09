import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiErrorCode } from '../common/api-error-code';
import { AppException } from '../common/app-exception';
import { UserProfile } from '../users/user-profile';
import { UsersService } from '../users/users.service';
import { FirebaseDecodedToken } from './firebase-decoded-token';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async getCurrentUser(firebaseUser: FirebaseDecodedToken | undefined): Promise<UserProfile> {
    if (firebaseUser === undefined) {
      throw new AppException(
        ApiErrorCode.AuthRequired,
        'Authentication is required',
        HttpStatus.UNAUTHORIZED
      );
    }

    return this.usersService.mapFirebaseUser({
      firebaseUid: firebaseUser.uid,
      email: this.requireEmail(firebaseUser.email),
      username: this.resolveUsername(firebaseUser)
    });
  }

  private requireEmail(email: string | undefined): string {
    if (email === undefined || email.trim().length === 0) {
      throw new AppException(
        ApiErrorCode.ValidationFailed,
        'Firebase token must include an email address',
        HttpStatus.BAD_REQUEST
      );
    }

    return email.trim().toLowerCase();
  }

  private resolveUsername(firebaseUser: FirebaseDecodedToken): string {
    const preferredUsername = firebaseUser.username ?? firebaseUser.name;
    if (preferredUsername !== undefined && preferredUsername.trim().length > 0) {
      return this.normalizeUsername(preferredUsername);
    }

    const [emailLocalPart] = this.requireEmail(firebaseUser.email).split('@');
    return this.normalizeUsername(`${emailLocalPart}-${firebaseUser.uid.slice(0, 8)}`);
  }

  private normalizeUsername(username: string): string {
    const normalized = username
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (normalized.length === 0) {
      throw new AppException(
        ApiErrorCode.ValidationFailed,
        'Username is required',
        HttpStatus.BAD_REQUEST
      );
    }

    return normalized;
  }
}
