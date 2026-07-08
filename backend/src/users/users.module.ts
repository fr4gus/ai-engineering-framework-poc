import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './users.repository';
import { USERS_REPOSITORY, UsersService } from './users.service';

@Module({
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}
