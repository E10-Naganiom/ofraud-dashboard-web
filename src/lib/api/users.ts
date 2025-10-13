
import { api } from '@/lib/api/client';
import type { AdminUser } from '@/lib/types/user.types';

const USE_MOCK_DATA = true;

const mockAdminUsers: AdminUser[] = [
  { id: '1', nombre: 'Admin', apellido: 'User1', email: 'admin1@test.com', is_admin: true, is_active: true },
  { id: '2', nombre: 'Admin', apellido: 'User2', email: 'admin2@test.com', is_admin: true, is_active: true },
];

export async function getAdminUsers(): Promise<AdminUser[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAdminUsers;
  }
  try {
    const response = await api.get<AdminUser[]>('/admin/user/list?is_admin=true');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin users:', error);
    throw error;
  }
}
