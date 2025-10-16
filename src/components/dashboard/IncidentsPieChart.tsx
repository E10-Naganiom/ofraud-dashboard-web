'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface IncidentsPieChartProps {
  data?: {
    pending: number;
    approved: number;
    rejected: number;
  };
  loading?: boolean;
}

export default function IncidentsPieChart({ 
  data, 
  loading = false 
}: IncidentsPieChartProps): React.JSX.Element {
  
  if (loading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="flex items-center justify-center h-64">
          <Skeleton className="h-48 w-48 rounded-full" />
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Distribución de Incidentes</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No hay datos disponibles
        </div>
      </Card>
    );
  }

  const total = data.pending + data.approved + data.rejected;
  
  const pendingPercent = total > 0 ? ((data.pending / total) * 100).toFixed(1) : '0';
  const approvedPercent = total > 0 ? ((data.approved / total) * 100).toFixed(1) : '0';
  const rejectedPercent = total > 0 ? ((data.rejected / total) * 100).toFixed(1) : '0';

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Distribución de Incidentes</h3>
      
      <div className="space-y-4">
        {/* Pending */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Pendientes</span>
            <span className="text-sm text-gray-600">{data.pending} ({pendingPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-yellow-500 h-3 rounded-full transition-all"
              style={{ width: `${pendingPercent}%` }}
            />
          </div>
        </div>

        {/* Approved */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Aprobados</span>
            <span className="text-sm text-gray-600">{data.approved} ({approvedPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${approvedPercent}%` }}
            />
          </div>
        </div>

        {/* Rejected */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Rechazados</span>
            <span className="text-sm text-gray-600">{data.rejected} ({rejectedPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-red-500 h-3 rounded-full transition-all"
              style={{ width: `${rejectedPercent}%` }}
            />
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-lg text-gray-900">{total}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}