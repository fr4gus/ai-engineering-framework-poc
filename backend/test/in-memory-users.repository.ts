import { CreateUserInput } from '../src/users/create-user-input';
import { UserRecord } from '../src/users/user-record';
import { UsersRepository } from '../src/users/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  private readonly users = new Map<string, UserRecord>();
  private sequence = 0;

  constructor(seedUsers: UserRecord[] = []) {
    seedUsers.forEach((user: UserRecord): void => {
      this.users.set(user.id, user);
    });
    this.sequence = seedUsers.length;
  }

  async findByFirebaseUid(firebaseUid: string): Promise<UserRecord | null> {
    return (
      [...this.users.values()].find(
        (user: UserRecord): boolean => user.firebaseUid === firebaseUid
      ) ?? null
    );
  }

  async findByUsername(username: string): Promise<UserRecord | null> {
    return (
      [...this.users.values()].find(
        (user: UserRecord): boolean => user.username === username
      ) ?? null
    );
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    return (
      [...this.users.values()].find((user: UserRecord): boolean => user.email === email) ??
      null
    );
  }

  async create(input: CreateUserInput): Promise<UserRecord> {
    this.sequence += 1;
    const now = new Date('2026-07-07T00:00:00.000Z');
    const user: UserRecord = {
      id: `00000000-0000-4000-8000-${this.sequence.toString().padStart(12, '0')}`,
      firebaseUid: input.firebaseUid,
      username: input.username,
      email: input.email,
      createdAt: now,
      updatedAt: now
    };

    this.users.set(user.id, user);
    return user;
  }

  count(): number {
    return this.users.size;
  }
}
