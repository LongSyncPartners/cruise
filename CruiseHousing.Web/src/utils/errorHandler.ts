// src/utils/errorHandler.ts

export type AppError = {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
};

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function toAppError(error: unknown): AppError {
  // Axios-like error
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (error as {
      response?: {
        status?: number;
        data?: unknown;
      };
      message?: string;
    }).response;

    const message =
      typeof (response?.data as { message?: unknown })?.message === "string"
        ? (response?.data as { message?: string }).message!
        : (error as { message?: string }).message || "Unexpected API error";

    return {
      message,
      status: response?.status,
      details: response?.data,
    };
  }

  if (isError(error)) {
    return {
      message: error.message,
      details: error.stack,
    };
  }

  if (typeof error === "string") {
    return {
      message: error,
    };
  }

  return {
    message: "An unexpected error occurred.",
    details: error,
  };
}

export function getErrorMessage(error: unknown): string {
  return toAppError(error).message;
}

export function logError(error: unknown, context?: string): void {
  const appError = toAppError(error);

  console.error("[Error]", {
    context,
    message: appError.message,
    code: appError.code,
    status: appError.status,
    details: appError.details,
  });
}

/**
 * Use this when you want:
 * 1. convert unknown error
 * 2. log it
 * 3. return safe message for UI
 */
export function handleError(error: unknown, context?: string): AppError {
  const appError = toAppError(error);
  logError(error, context);
  return appError;
}