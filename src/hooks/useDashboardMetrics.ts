'use client';

import { useState, useEffect } from 'react';
import { getIncidents } from '@/lib/api/incidents';
import type { Incident } from '@/lib/types/incident.types';

export interface DashboardMetrics {
  totalIncidents: number;
  pendingIncidents: number;
  approvedIncidents: number;
  rejectedIncidents: number;
  recentIncidents: Incident[];
  incidentsByStatus: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

interface UseDashboardMetricsReturn {
  metrics: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
}

export function useDashboardMetrics(): UseDashboardMetricsReturn {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async (): Promise<void> => {
      try {
        setLoading(true);

        // Fetch all incidents from backend
        const incidents = await getIncidents();

        // Calculate metrics
        const totalIncidents = incidents.length;
        const pendingIncidents = incidents.filter(i => i.id_estatus === 1).length;
        const approvedIncidents = incidents.filter(i => i.id_estatus === 2).length;
        const rejectedIncidents = incidents.filter(i => i.id_estatus === 3).length;

        // Get 5 most recent incidents
        const recentIncidents = incidents
          .sort((a, b) => {
            const dateA = new Date(a.fecha_actualizacion).getTime();
            const dateB = new Date(b.fecha_actualizacion).getTime();
            return dateB - dateA;
          })
          .slice(0, 5);

        setMetrics({
          totalIncidents,
          pendingIncidents,
          approvedIncidents,
          rejectedIncidents,
          recentIncidents,
          incidentsByStatus: {
            pending: pendingIncidents,
            approved: approvedIncidents,
            rejected: rejectedIncidents,
          },
        });
        
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error al cargar las métricas');
        console.error('Error fetching dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
}