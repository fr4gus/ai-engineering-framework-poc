import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ApiExceptionFilter } from '../src/common/api-exception.filter';
import { AuthenticationModule } from '../src/authentication/authentication.module';
import { FirebaseDecodedToken } from '../src/authentication/firebase-decoded-token';
import {
  FIREBASE_TOKEN_VERIFIER,
  FirebaseTokenVerifier
} from '../src/authentication/firebase-token-verifier';
import { USERS_REPOSITORY } from '../src/users/users.service';
import { InMemoryUsersRepository } from './in-memory-users.repository';

class MockFirebaseTokenVerifier implements FirebaseTokenVerifier {
  async verifyIdToken(token: string): Promise<FirebaseDecodedToken> {
    if (token !== 'valid-token') {
      throw new Error('Invalid token');
    }

    return {
      uid: 'firebase-uid-1',
      email: 'player1@example.com',
      username: 'player1'
    };
  }
}

describe('AuthenticationController', (): void => {
  let app: INestApplication;
  let usersRepository: InMemoryUsersRepository;

  beforeEach(async (): Promise<void> => {
    usersRepository = new InMemoryUsersRepository();
    const moduleRef = await Test.createTestingModule({
      imports: [AuthenticationModule]
    })
      .overrideProvider(FIREBASE_TOKEN_VERIFIER)
      .useValue(new MockFirebaseTokenVerifier())
      .overrideProvider(USERS_REPOSITORY)
      .useValue(usersRepository)
      .compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new ApiExceptionFilter());
    await app.init();
  });

  afterEach(async (): Promise<void> => {
    await app.close();
  });

  it('returns current user profile for a valid Firebase bearer token', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        id: '00000000-0000-4000-8000-000000000001',
        username: 'player1',
        email: 'player1@example.com'
      },
      meta: {}
    });
  });

  it('returns AUTH_REQUIRED when the bearer token is missing', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .expect(401);

    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Authentication is required',
        details: {}
      }
    });
  });

  it('returns AUTH_INVALID_TOKEN when Firebase verification fails', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: 'AUTH_INVALID_TOKEN',
        message: 'Firebase token is invalid',
        details: {}
      }
    });
  });
});
