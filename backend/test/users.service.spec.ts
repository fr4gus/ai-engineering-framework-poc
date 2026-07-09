import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../src/common/api-error-code';
import { AppException } from '../src/common/app-exception';
import { UsersService } from '../src/users/users.service';
import { InMemoryUsersRepository } from './in-memory-users.repository';

describe('UsersService', (): void => {
  it('rejects duplicate usernames for a different Firebase UID', async (): Promise<void> => {
    const usersRepository = new InMemoryUsersRepository([
      {
        id: 'existing-user-id',
        firebaseUid: 'firebase-uid-1',
        username: 'player1',
        email: 'player1@example.com',
        createdAt: new Date('2026-07-07T00:00:00.000Z'),
        updatedAt: new Date('2026-07-07T00:00:00.000Z')
      }
    ]);
    const usersService = new UsersService(usersRepository);

    await expect(
      usersService.mapFirebaseUser({
        firebaseUid: 'firebase-uid-2',
        username: 'player1',
        email: 'player2@example.com'
      })
    ).rejects.toMatchObject({
      code: ApiErrorCode.ValidationFailed,
      details: { field: 'username' }
    } satisfies Partial<AppException>);
  });

  it('maps repeated Firebase UID calls to the same application user', async (): Promise<void> => {
    const usersRepository = new InMemoryUsersRepository();
    const usersService = new UsersService(usersRepository);

    const firstProfile = await usersService.mapFirebaseUser({
      firebaseUid: 'firebase-uid-1',
      username: 'player1',
      email: 'player1@example.com'
    });
    const secondProfile = await usersService.mapFirebaseUser({
      firebaseUid: 'firebase-uid-1',
      username: 'renamed-player',
      email: 'renamed@example.com'
    });

    expect(firstProfile).toEqual(secondProfile);
    expect(usersRepository.count()).toBe(1);
  });

  it('exposes duplicate username conflicts as HTTP 409 validation errors', async (): Promise<void> => {
    const usersRepository = new InMemoryUsersRepository([
      {
        id: 'existing-user-id',
        firebaseUid: 'firebase-uid-1',
        username: 'player1',
        email: 'player1@example.com',
        createdAt: new Date('2026-07-07T00:00:00.000Z'),
        updatedAt: new Date('2026-07-07T00:00:00.000Z')
      }
    ]);
    const usersService = new UsersService(usersRepository);

    try {
      await usersService.mapFirebaseUser({
        firebaseUid: 'firebase-uid-2',
        username: 'player1',
        email: 'player2@example.com'
      });
      throw new Error('Expected duplicate username to throw');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(AppException);
      expect((error as AppException).getStatus()).toBe(HttpStatus.CONFLICT);
    }
  });
});
