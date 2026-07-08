import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { FirebaseAdminTokenVerifierService } from './firebase-admin-token-verifier.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FIREBASE_TOKEN_VERIFIER } from './firebase-token-verifier';

@Module({
  imports: [UsersModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    FirebaseAuthGuard,
    {
      provide: FIREBASE_TOKEN_VERIFIER,
      useClass: FirebaseAdminTokenVerifierService
    }
  ]
})
export class AuthenticationModule {}
