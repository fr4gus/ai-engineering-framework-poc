import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { apiSuccess, ApiSuccessResponse } from '../common/api-response';
import { UserProfile } from '../users/user-profile';
import { AuthenticatedRequest } from './authenticated-request';
import { AuthenticationService } from './authentication.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  async me(@Req() request: AuthenticatedRequest): Promise<ApiSuccessResponse<UserProfile>> {
    const profile = await this.authenticationService.getCurrentUser(request.firebaseUser);
    return apiSuccess(profile);
  }
}
