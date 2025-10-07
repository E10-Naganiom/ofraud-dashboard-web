/**
 * Authentication API Functions
 * Handles admin registration and login requests
 */

import { api } from '@/lib/api/client';
import type {
  RegisterAdminRequest,
  RegisterAdminResponse,
  LoginAdminRequest,
  LoginAdminResponse,
} from '@/lib/types/auth.types';

/**
 * Register a new admin user
 * @param data - Registration form data (nombre, correo, contrasena)
 * @returns Promise with registered user data
 * @throws Error if registration fails
 */
export async function registerAdmin(
  data: RegisterAdminRequest
): Promise<RegisterAdminResponse> {
  try {
    const response = await api.post<RegisterAdminResponse>(
      '/auth/register',
      data
    );
    return response.data;
  } catch (error) {
    // Re-throw error after logging for debugging
    console.error('Registration failed:', error);
    throw error;
  }
}

/**
 * Login admin user
 * @param data - Login credentials (correo, contrasena)
 * @returns Promise with JWT token and user data
 * @throws Error if login fails
 */
export async function loginAdmin(
  data: LoginAdminRequest
): Promise<LoginAdminResponse> {
  try {
    const response = await api.post<LoginAdminResponse>('/auth/login', data);
    return response.data;
  } catch (error) {
    // Re-throw error after logging for debugging
    console.error('Login failed:', error);
    throw error;
  }
}

/**
 * Logout admin user (client-side only - clears token)
 * Note: This is a client-side logout. Backend doesn't need to be notified
 * since JWT tokens are stateless.
 */
export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}
