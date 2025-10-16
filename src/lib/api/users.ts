import { api } from '@/lib/api/client';
import type { AdminUser, User } from '@/lib/types/user.types';

/**
 * Fetch all admin users from the backend
 * @returns Promise resolving to array of admin users
 */
export async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    const response = await api.get<any[]>('/admin/user/list');
    
    // Map backend fields to frontend structure
    return response.data
      .filter((user: any) => user.is_admin || user.es_admin) // Filter only admins
      .map((user: any) => ({
        id: String(user.id),
        nombre: user.nombre || user.name,
        apellido: user.apellido,
        email: user.email || user.correo_electronico,
        is_admin: Boolean(user.is_admin || user.es_admin),
        is_active: Boolean(user.is_active || user.es_activo),
      }));
  } catch (error) {
    console.error('Failed to fetch admin users:', error);
    throw error;
  }
}

/**
 * Fetch all users (admin and regular) from the backend
 * @returns Promise resolving to array of users
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await api.get<any[]>('/admin/user/list');
    
    // Map backend fields to frontend structure
    return response.data.map((user: any) => ({
      id: String(user.id),
      nombre: user.nombre || user.name,
      apellido: user.apellido,
      email: user.email || user.correo_electronico,
      is_admin: Boolean(user.is_admin || user.es_admin),
      is_active: Boolean(user.is_active || user.es_activo),
    }));
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

/**
 * Fetch a single user by ID
 * @param id - The user ID
 * @returns Promise resolving to user data
 */
export async function getUserById(id: string): Promise<User> {
  try {
    const response = await api.get<any>(`/admin/user/${id}`);
    
    const userData = response.data;
    
    return {
      id: String(userData.id),
      nombre: userData.nombre || userData.name,
      apellido: userData.apellido,
      email: userData.email || userData.correo_electronico,
      is_admin: Boolean(userData.is_admin || userData.es_admin),
      is_active: Boolean(userData.is_active || userData.es_activo),
    };
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error);
    throw error;
  }
}

/**
 * Update a user as admin
 * @param id - The user ID
 * @param data - Updated user data
 * @returns Promise resolving to updated user
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  try {
    // Map frontend fields to backend expected structure
    const payload: any = {};
    
    if (data.nombre !== undefined) payload.name = data.nombre;
    if (data.apellido !== undefined) payload.apellido = data.apellido;
    if (data.email !== undefined) payload.email = data.email;
    if (data.is_admin !== undefined) payload.is_admin = data.is_admin;
    if (data.is_active !== undefined) payload.is_active = data.is_active;

    await api.put(`/admin/user/${id}`, payload);
    
    // Fetch updated user data
    return getUserById(id);
  } catch (error) {
    console.error(`Failed to update user ${id}:`, error);
    throw error;
  }
}

/**
 * Inactivate a user
 * @param id - The user ID
 * @returns Promise resolving to updated user
 */
export async function inactivateUser(id: string): Promise<User> {
  try {
    await api.patch(`/admin/user/${id}/inactivate`);
    
    // Fetch updated user data
    return getUserById(id);
  } catch (error) {
    console.error(`Failed to inactivate user ${id}:`, error);
    throw error;
  }
}