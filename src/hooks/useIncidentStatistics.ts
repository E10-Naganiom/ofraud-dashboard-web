'use client';

import { useState, useEffect } from 'react';
import { getIncidentStatistics } from '@/lib/api/incidents';
import { getAllUsers } from '@/lib/api/users';

export interface IncidentStatistics {
  total_incidentes: number;
  total_categorias: number;
  por_estatus: Array<{
    estatus: string;
    total: number;
    porcentaje: number;
  }>;
  por_categoria: Array<{
    titulo: string;
    total: number;
    porcentaje: number;
  }>;
  metodos_contacto: Array<{
    metodo: string;
    total: number;
    porcentaje: number;
  }>;
  redes_sociales: Array<{
    nombre: string;
    total: number;
    porcentaje: number;
  }>;
}

export interface UserStatistics {
  total_usuarios: number;
  usuarios_activos: number;
  usuarios_inactivos: number;
  admins_activos: number;
  admins_inactivos: number;
}

interface UseIncidentStatisticsReturn {
  incidentStats: IncidentStatistics | null;
  userStats: UserStatistics | null;
  loading: boolean;
  error: string | null;
}

export function useIncidentStatistics(): UseIncidentStatisticsReturn {
  const [incidentStats, setIncidentStats] = useState<IncidentStatistics | null>(null);
  const [userStats, setUserStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async (): Promise<void> => {
      try {
        setLoading(true);

        // Fetch incident statistics
        const incidentData = await getIncidentStatistics();
        setIncidentStats(incidentData);

        // Fetch user statistics
        const users = await getAllUsers();
        const userStatistics: UserStatistics = {
          total_usuarios: users.length,
          usuarios_activos: users.filter(u => !u.is_admin && u.is_active).length,
          usuarios_inactivos: users.filter(u => !u.is_admin && !u.is_active).length,
          admins_activos: users.filter(u => u.is_admin && u.is_active).length,
          admins_inactivos: users.filter(u => u.is_admin && !u.is_active).length,
        };
        setUserStats(userStatistics);

        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error al cargar estadísticas');
        console.error('Error fetching statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return { incidentStats, userStats, loading, error };
}