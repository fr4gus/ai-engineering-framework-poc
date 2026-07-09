import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { ApiErrorCode } from '../common/api-error-code';
import { AppException } from '../common/app-exception';
import { AuthenticatedRequest } from './authenticated-request';
import {
  FIREBASE_TOKEN_VERIFIER,
  FirebaseTokenVerifier
} from './firebase-token-verifier';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject(FIREBASE_TOKEN_VERIFIER)
    private readonly firebaseTokenVerifier: FirebaseTokenVerifier
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractBearerToken(request.headers.authorization);

    try {
      request.firebaseUser = await this.firebaseTokenVerifier.verifyIdToken(token);
      return true;
    } catch {
      throw new AppException(
        ApiErrorCode.AuthInvalidToken,
        'Firebase token is invalid',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  private extractBearerToken(authorizationHeader: string | string[] | undefined): string {
    if (authorizationHeader === undefined) {
      throw new AppException(
        ApiErrorCode.AuthRequired,
        'Authentication is required',
        HttpStatus.UNAUTHORIZED
      );
    }

    if (Array.isArray(authorizationHeader)) {
      throw new AppException(
        ApiErrorCode.AuthInvalidToken,
        'Authorization header is malformed',
        HttpStatus.UNAUTHORIZED
      );
    }

    const [scheme, token, extra] = authorizationHeader.split(' ');
    if (scheme !== 'Bearer' || token === undefined || token.length === 0 || extra !== undefined) {
      throw new AppException(
        ApiErrorCode.AuthInvalidToken,
        'Authorization header must use Bearer token format',
        HttpStatus.UNAUTHORIZED
      );
    }

    return token;
  }
}
