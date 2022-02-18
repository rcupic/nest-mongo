export interface ApiResponse<T> {
  status?: number;
  message?: string;
  payload?: T | null;
}

export function createApiResponse<T = null>(
  options?: ApiResponse<T>,
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    status: options.status || 200,
    message: options.message || 'OK',
    payload: options.payload || null,
  };

  return response;
}
