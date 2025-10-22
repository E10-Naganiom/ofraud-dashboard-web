'use client';

import { useState } from 'react';
import MetricCard from '@/components/dashboard/MetricCard';
import RecentIncidentsList from '@/components/dashboard/RecentIncidentsList';
import IncidentsPieChart from '@/components/dashboard/IncidentsPieChart';
import ReportsCountCard from '@/components/dashboard/ReportsCountCard';
import UserStatusChart from '@/components/dashboard/UserStatusChart';
import IncidentsByCategoryChart from '@/components/dashboard/IncidentsByCategoyChart';
import IncidentsByContactMethodChart from '@/components/dashboard/IncidentsByContactMethodChart';
import IncidentsBySocialNetworkChart from '@/components/dashboard/IncidentsBySocialNetworkChart';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { useIncidentStatistics } from '@/hooks/useIncidentStatistics';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const CHART_VIEWS = [
  { id: 'status', label: 'Por Estado' },
  { id: 'users', label: 'Usuarios' },
  { id: 'category', label: 'Por Categoría' },
  { id: 'contact', label: 'Método de Contacto' },
  { id: 'social', label: 'Redes Sociales' },
];

export default function DashboardPage(): React.JSX.Element {
  const { metrics, loading, error } = useDashboardMetrics();
  const { incidentStats, userStats, loading: statsLoading } = useIncidentStatistics();
  const [activeChartView, setActiveChartView] = useState(0);

  const handlePrevChart = () => {
    setActiveChartView((prev) => (prev === 0 ? CHART_VIEWS.length - 1 : prev - 1));
  };

  const handleNextChart = () => {
    setActiveChartView((prev) => (prev === CHART_VIEWS.length - 1 ? 0 : prev + 1));
  };

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

      {/* Charts Section with Carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-brand-text-primary">
            Análisis Estadístico
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevChart}
              aria-label="Gráfica anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 min-w-[200px] text-center">
              {CHART_VIEWS[activeChartView].label}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextChart}
              aria-label="Siguiente gráfica"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chart Navigation Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {CHART_VIEWS.map((view, index) => (
            <button
              key={view.id}
              onClick={() => setActiveChartView(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                activeChartView === index ? 'bg-blue-500 w-8' : 'bg-gray-300'
              )}
              aria-label={`Ver ${view.label}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area - 2 columns */}
          <div className="lg:col-span-2">
            {activeChartView === 0 && (
              <IncidentsPieChart 
                data={metrics?.incidentsByStatus}
                loading={loading}
              />
            )}
            {activeChartView === 1 && (
              <UserStatusChart
                data={userStats || undefined}
                loading={statsLoading}
              />
            )}
            {activeChartView === 2 && (
              <IncidentsByCategoryChart
                data={incidentStats?.por_categoria}
                loading={statsLoading}
              />
            )}
            {activeChartView === 3 && (
              <IncidentsByContactMethodChart
                data={incidentStats?.metodos_contacto}
                loading={statsLoading}
              />
            )}
            {activeChartView === 4 && (
              <IncidentsBySocialNetworkChart
                data={incidentStats?.redes_sociales}
                loading={statsLoading}
              />
            )}
          </div>

          {/* Reports Count Card - 1 column */}
          <div className="lg:col-span-1">
            <ReportsCountCard 
              totalReports={metrics?.totalIncidents}
              loading={loading}
            />
          </div>
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