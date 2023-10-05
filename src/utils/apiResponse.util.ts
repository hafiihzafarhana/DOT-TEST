import { StatusCodes as status } from "http-status-codes";
import { ApiResponseInterface } from "@interfaces/apiResponse.interface";

/**
 * Me-return secara kustom
 */
export function apiResponse(
  code: number,
  responseStatus: string,
  message: string,
  data?: unknown,
  meta?: {
    page: number;
    per_page: number;
    page_size: number;
    total_data: number;
  },
): ApiResponseInterface {
  return {
    code,
    status: responseStatus,
    message,
    data,
    meta,
  };
}

/**
 * Me-return status code 400
 */
export function apiBadRequestResponse(message: string): ApiResponseInterface {
  return {
    code: status.BAD_REQUEST,
    status: "BAD_REQUEST",
    message,
  };
}

/**
 * Me-returns status code 404.
 */
export function apiNotFoundResponse(message: string): ApiResponseInterface {
  return {
    code: status.NOT_FOUND,
    status: "NOT_FOUND",
    message,
  };
}

/**
 * Me-returns status code 429.
 */
export function apiTooManyRequestsResponse(message: string): ApiResponseInterface {
  return {
    code: status.TOO_MANY_REQUESTS,
    status: "TOO_MANY_REQUESTS",
    message,
  };
}

/**
 * Me-returns status code 403.
 */
export function apiForbiddenResponse(message: string): ApiResponseInterface {
  return {
    code: status.FORBIDDEN,
    status: "FORBIDDEN",
    message,
  };
}
