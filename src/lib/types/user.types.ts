/**
 * User Type Definitions
 * Aligned with backend structure
 */

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  correo_electronico?: string; // Backend might use this field
  is_admin: boolean;
  is_active: boolean;
}

export type AdminUser = User & { is_admin: true };

/**
 * User info embedded in incident details
 */
export interface UserInfo {
  id: string;
  nombre: string;
  apellido: string;
  correo_electronico: string;
}