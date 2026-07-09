import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './create-user-input';
import { UserRecord } from './user-record';

export interface UsersRepository {
  findByFirebaseUid(firebaseUid: string): Promise<UserRecord | null>;
  findByUsername(username: string): Promise<UserRecord | null>;
  findByEmail(email: string): Promise<UserRecord | null>;
  create(input: CreateUserInput): Promise<UserRecord>;
}

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByFirebaseUid(firebaseUid: string): Promise<UserRecord | null> {
    const user = await this.prisma.user.findUnique({
      where: { firebaseUid }
    });

    return user === null ? null : this.toUserRecord(user);
  }

  async findByUsername(username: string): Promise<UserRecord | null> {
    const user = await this.prisma.user.findUnique({
      where: { username }
    });

    return user === null ? null : this.toUserRecord(user);
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    return user === null ? null : this.toUserRecord(user);
  }

  async create(input: CreateUserInput): Promise<UserRecord> {
    const user = await this.prisma.user.create({
      data: {
        firebaseUid: input.firebaseUid,
        username: input.username,
        email: input.email
      }
    });

    return this.toUserRecord(user);
  }

  private toUserRecord(user: UserRecord): UserRecord {
    return user;
  }
}
