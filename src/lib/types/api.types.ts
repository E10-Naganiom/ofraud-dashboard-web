/**
 * Common API response type definitions
 * These types match the NestJS standard error response format
 */

/**
 * Standard API error response structure from NestJS backend
 */
export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[]; // Can be single string or array of validation errors
  error: string; // Error type (e.g., "Bad Request", "Unauthorized")
}

/**
 * Generic success response wrapper
 */
export interface ApiSuccessResponse<T = unknown> {
  data: T;
  statusCode?: number;
}
