/**
 * API Client Configuration
 * Axios instance with JWT token injection and error handling interceptors
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse } from '@/lib/types/api.types';
import { ERROR_MESSAGES } from '@/lib/constants/messages';

// Get API base URL from environment variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// Token storage key in localStorage
const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Create configured Axios instance
 */
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Request Interceptor: Add JWT token to Authorization header
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Check if we're in browser environment (not SSR)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Handle errors consistently
 */
api.interceptors.response.use(
  // Pass through successful responses (2xx status codes)
  (response) => response,

  // Handle error responses
  (error) => {
    // Check if this is an Axios error with a response
    if (error.response) {
      const { status, data } = error.response;
      const errorData = data as ApiErrorResponse;

      // Handle specific HTTP status codes
      switch (status) {
        case 401: {
          // Unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem(AUTH_TOKEN_KEY);

            // Get current path for redirect after login
            const currentPath = window.location.pathname;
            const returnTo =
              currentPath !== '/login' ? `?returnTo=${currentPath}` : '';

            // Redirect to login page
            window.location.href = `/login${returnTo}`;
          }

          // Override error message
          error.message = ERROR_MESSAGES.UNAUTHORIZED;
          break;
        }

        case 403: {
          // Forbidden
          error.message = ERROR_MESSAGES.FORBIDDEN;
          break;
        }

        case 404: {
          // Not Found - use backend message if available
          error.message = errorData.message || ERROR_MESSAGES.NOT_FOUND;
          break;
        }

        case 500: {
          // Internal Server Error - use friendly Spanish message
          error.message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
          break;
        }

        case 400:
        case 409: {
          // Bad Request or Conflict - pass through backend message
          // Backend may return string or array of validation errors
          if (Array.isArray(errorData.message)) {
            error.message = errorData.message.join(', ');
          } else {
            error.message = errorData.message || error.message;
          }
          break;
        }

        default: {
          // Other errors - use backend message or generic fallback
          error.message =
            errorData.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
        }
      }
    } else if (error.request && !error.response) {
      // Request was made but no response received (network error)
      error.message = ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      // Something else happened (setup error, etc.)
      error.message = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to store auth token
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

/**
 * Helper function to clear auth token
 */
export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

/**
 * Helper function to get auth token
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
}
