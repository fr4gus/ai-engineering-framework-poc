export interface ApiSuccessResponse<TData> {
  readonly success: true;
  readonly data: TData;
  readonly meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
  };
}

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;

export interface CurrentUserProfile {
  readonly id: string;
  readonly username: string;
  readonly email: string;
}
