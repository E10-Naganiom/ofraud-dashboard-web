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
 * @param data - Registration form data (nombre, apellido, correo, contrasena)
 * @returns Promise with registered user data
 * @throws Error if registration fails
 */
export async function registerAdmin(
  data: RegisterAdminRequest
): Promise<RegisterAdminResponse> {
  try {
    // Map frontend fields to backend expected fields
    const payload = {
      email: data.correo,
      name: data.nombre,
      apellido: data.apellido,
      password: data.contrasena,
      is_admin: true, // Always create as admin
      is_active: true,
    };

    const response = await api.post<RegisterAdminResponse>(
      '/users',
      payload
    );

    // Map backend response to frontend expected structure
    return {
      id: String(response.data.id),
      nombre: response.data.nombre,
      apellido: response.data.apellido,
      correo: response.data.correo_electronico || response.data.email,
      is_admin: response.data.is_admin || response.data.es_admin,
    };
  } catch (error: any) {
    console.error('Registration failed:', error);
    
    // Handle specific error cases
    if (error.response?.status === 409) {
      throw new Error('Ya existe una cuenta con este correo');
    }
    
    throw new Error(error.message || 'Error al registrar el usuario');
  }
}

/**
 * Login admin user
 * @param data - Login credentials (correo, contrasena)
 * @returns Promise with JWT token and user data
 * @throws Error if login fails or user is not admin
 */
export async function loginAdmin(
  data: LoginAdminRequest
): Promise<LoginAdminResponse> {
  try {
    // Map frontend fields to backend expected fields
    const payload = {
      email: data.correo,
      password: data.contrasena,
    };

    const response = await api.post<{
      access_token: string;
      refresh_token: string;
    }>('/auth/login', payload);

    // Extract token and decode to get user info
    const token = response.data.access_token;

    // Get user profile using the token
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const profileResponse = await api.get<{ profile: any }>('/auth/profile');
    
    const userProfile = profileResponse.data.profile;

    console.log('User profile received:', userProfile); // Debug log

    // CRITICAL: Verify user is admin
    // Backend uses 'es_admin' (Spanish) instead of 'is_admin' (English)
    const isAdmin = userProfile.is_admin || userProfile.es_admin;
    
    if (!isAdmin) {
      throw new Error('Acceso denegado. Solo administradores pueden acceder al dashboard.');
    }

    // Return formatted response
    return {
      access_token: token,
      user: {
        id: String(userProfile.id),
        nombre: userProfile.nombre,
        apellido: userProfile.apellido,
        correo: userProfile.correo_electronico || userProfile.email,
        is_admin: Boolean(isAdmin), // Convert to boolean and use consistent naming
      },
    };
  } catch (error: any) {
    console.error('Login failed:', error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error('Credenciales inválidas');
    }
    
    if (error.message.includes('Solo administradores')) {
      throw error; // Re-throw admin validation error
    }
    
    throw new Error(error.message || 'Error al iniciar sesión');
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