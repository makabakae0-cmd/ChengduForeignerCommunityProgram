import type { ApiErrorCode } from "@community-map/shared";

export class ApiAppError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly status: number,
    public readonly details?: unknown
  ) {
    super(message);
  }
}

export const apiError = (
  code: ApiErrorCode,
  message: string,
  status: number,
  details?: unknown
) => new ApiAppError(code, message, status, details);
