'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryData {
  titulo: string;
  total: number;
  porcentaje: number;
}

interface IncidentsByCategoryChartProps {
  data?: CategoryData[];
  loading?: boolean;
}

const COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-indigo-500',
];

export default function IncidentsByCategoryChart({ data, loading = false }: IncidentsByCategoryChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Incidentes por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
        </CardContent>
      </Card>
    );
  }

  // Sort by total descending
  const sortedData = [...data].sort((a, b) => b.total - a.total);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incidentes por Categoría</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedData.map((category, index) => (
          <div key={category.titulo} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{category.titulo}</span>
              <span className="text-gray-600">{category.total} ({category.porcentaje.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${COLORS[index % COLORS.length]} h-3 rounded-full transition-all`}
                style={{ width: `${category.porcentaje}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}