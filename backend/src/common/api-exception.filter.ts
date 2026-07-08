import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorCode } from './api-error-code';
import { AppExceptionResponse } from './app-exception';

type HttpExceptionShape = {
  code?: string;
  message?: string | string[];
  details?: Record<string, unknown>;
};

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException
        ? this.formatHttpException(exception)
        : {
            code: ApiErrorCode.InternalError,
            message: 'Unexpected error',
            details: {}
          };

    response.status(status).json({
      success: false,
      error: payload
    });
  }

  private formatHttpException(exception: HttpException): AppExceptionResponse {
    const response = exception.getResponse();
    if (typeof response === 'object' && response !== null) {
      const shaped = response as HttpExceptionShape;
      return {
        code: this.resolveCode(shaped.code),
        message: this.resolveMessage(shaped.message),
        details: shaped.details ?? {}
      };
    }

    return {
      code: ApiErrorCode.InternalError,
      message: String(response),
      details: {}
    };
  }

  private resolveCode(code: string | undefined): ApiErrorCode {
    return Object.values(ApiErrorCode).includes(code as ApiErrorCode)
      ? (code as ApiErrorCode)
      : ApiErrorCode.InternalError;
  }

  private resolveMessage(message: string | string[] | undefined): string {
    if (Array.isArray(message)) {
      return message.join('; ');
    }

    return message ?? 'Unexpected error';
  }
}
