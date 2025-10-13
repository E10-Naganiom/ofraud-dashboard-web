export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
}

export type AdminUser = User & { is_admin: true };