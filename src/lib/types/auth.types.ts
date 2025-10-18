/**
 * Authentication-related type definitions
 * These match the backend API contract for auth endpoints
 */

/**
 * Admin registration request payload
 */
export interface RegisterAdminRequest {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
}

/**
 * Admin registration response from backend
 */
export interface RegisterAdminResponse {
  correo_electronico: any;
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  is_admin: boolean;
}

/**
 * Admin login request payload
 */
export interface LoginAdminRequest {
  correo: string;
  contrasena: string;
}

/**
 * Admin login response from backend (includes JWT token)
 */
export interface LoginAdminResponse {
  access_token: string;
  user: {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    is_admin: boolean;
  };
}

/**
 * Authenticated user data stored in context/state
 */
export interface AuthUser {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  is_admin: boolean;
}

/**
 * Admin user type (alias for AuthUser)
 * Used for type consistency with story requirements
 */
export type AdminUser = AuthUser;

/**
 * Authentication state shape
 */
export interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Authentication context type (extends AuthState with methods)
 */
export interface AuthContextType extends AuthState {
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  register: (userData: RegisterAdminRequest) => Promise<void>;
}
