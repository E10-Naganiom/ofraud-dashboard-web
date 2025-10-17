'use client';

import MetricCard from '@/components/dashboard/MetricCard';
import RecentIncidentsList from '@/components/dashboard/RecentIncidentsList';
import IncidentsPieChart from '@/components/dashboard/IncidentsPieChart';
import ReportsCountCard from '@/components/dashboard/ReportsCountCard';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function DashboardPage(): React.JSX.Element {
  const { metrics, loading, error } = useDashboardMetrics();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-brand-text-primary">Dashboard</h1>
        <p className="text-brand-text-secondary mt-2">
          Bienvenid@ a oFraud
        </p>
        <p className="text-sm text-brand-text-tertiary">
          Mantente protegido con las últimas actualizaciones de seguridad
        </p>
      </div>

      {/* Stats Section */}
      <div>
        <h2 className="text-xl font-semibold text-brand-text-primary mb-4">Métricas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Total de Incidentes"
            value={metrics?.totalIncidents ?? 0}
            icon={<TrendingUp size={32} />}
            loading={loading}
            error={error !== null && !loading}
          />
          <MetricCard
            label="Incidentes Pendientes"
            value={metrics?.pendingIncidents ?? 0}
            icon={<Clock size={32} />}
            loading={loading}
            error={error !== null && !loading}
          />
          <MetricCard
            label="Incidentes Aprobados"
            value={metrics?.approvedIncidents ?? 0}
            icon={<CheckCircle size={32} />}
            loading={loading}
            error={error !== null && !loading}
          />
          <MetricCard
            label="Incidentes Rechazados"
            value={metrics?.rejectedIncidents ?? 0}
            icon={<XCircle size={32} />}
            loading={loading}
            error={error !== null && !loading}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncidentsPieChart 
            data={metrics?.incidentsByStatus}
            loading={loading}
          />
        </div>
        <div className="lg:col-span-1">
          <ReportsCountCard 
            totalReports={metrics?.totalIncidents}
            loading={loading}
          />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-xl font-semibold text-brand-text-primary mb-4">
          Actividad Reciente
        </h2>
        <RecentIncidentsList 
          incidents={metrics?.recentIncidents}
          loading={loading}
        />
      </div>
    </div>
  );
}