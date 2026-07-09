import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from './api-error-code';

export type AppExceptionResponse = {
  code: ApiErrorCode;
  message: string;
  details: Record<string, unknown>;
};

export class AppException extends HttpException {
  constructor(
    readonly code: ApiErrorCode,
    message: string,
    status: HttpStatus,
    readonly details: Record<string, unknown> = {}
  ) {
    super({ code, message, details } satisfies AppExceptionResponse, status);
  }
}
