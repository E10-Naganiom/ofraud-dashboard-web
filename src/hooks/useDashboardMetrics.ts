'use client';

import { useState, useEffect } from 'react';
import { mockDashboardMetrics, type DashboardMetrics } from '@/lib/mock/dashboardData';

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

        // Simulate API delay for realistic loading state
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Use mock data
        setMetrics(mockDashboardMetrics);
        setError(null);
      } catch (err) {
        setError('Error al cargar las métricas');
        console.error('Error fetching dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
}
