import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ApiErrorCode } from '../common/api-error-code';
import { AppException } from '../common/app-exception';
import { CreateUserInput } from './create-user-input';
import { UserProfile } from './user-profile';
import { UserRecord } from './user-record';
import { UsersRepository } from './users.repository';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository
  ) {}

  async mapFirebaseUser(input: CreateUserInput): Promise<UserProfile> {
    const normalizedInput = this.normalizeInput(input);
    const existingUser = await this.usersRepository.findByFirebaseUid(
      normalizedInput.firebaseUid
    );

    if (existingUser !== null) {
      return this.toUserProfile(existingUser);
    }

    await this.assertUniqueUsername(normalizedInput.username);
    await this.assertUniqueEmail(normalizedInput.email);

    const createdUser = await this.usersRepository.create(normalizedInput);
    return this.toUserProfile(createdUser);
  }

  private normalizeInput(input: CreateUserInput): CreateUserInput {
    return {
      firebaseUid: input.firebaseUid.trim(),
      username: input.username.trim().toLowerCase(),
      email: input.email.trim().toLowerCase()
    };
  }

  private async assertUniqueUsername(username: string): Promise<void> {
    const existingUser = await this.usersRepository.findByUsername(username);
    if (existingUser !== null) {
      throw new AppException(
        ApiErrorCode.ValidationFailed,
        'Username is already in use',
        HttpStatus.CONFLICT,
        { field: 'username' }
      );
    }
  }

  private async assertUniqueEmail(email: string): Promise<void> {
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser !== null) {
      throw new AppException(
        ApiErrorCode.ValidationFailed,
        'Email is already in use',
        HttpStatus.CONFLICT,
        { field: 'email' }
      );
    }
  }

  private toUserProfile(user: UserRecord): UserProfile {
    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
}
