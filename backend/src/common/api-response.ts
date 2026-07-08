export type ApiSuccessResponse<TData> = {
  success: true;
  data: TData;
  meta: Record<string, never>;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details: Record<string, unknown>;
  };
};

export function apiSuccess<TData>(data: TData): ApiSuccessResponse<TData> {
  return {
    success: true,
    data,
    meta: {}
  };
}
