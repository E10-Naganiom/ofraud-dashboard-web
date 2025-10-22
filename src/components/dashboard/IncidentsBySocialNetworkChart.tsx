'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SocialNetworkData {
  nombre: string;
  total: number;
  porcentaje: number;
}

interface IncidentsBySocialNetworkChartProps {
  data?: SocialNetworkData[];
  loading?: boolean;
}

const SOCIAL_COLORS: Record<string, string> = {
  'facebook': 'bg-blue-600',
  'instagram': 'bg-pink-500',
  'twitter': 'bg-sky-500',
  'x': 'bg-gray-900',
  'tiktok': 'bg-gray-800',
  'whatsapp': 'bg-green-500',
  'telegram': 'bg-blue-400',
  'linkedin': 'bg-blue-700',
  'snapchat': 'bg-yellow-400',
  'youtube': 'bg-red-600',
  'discord': 'bg-indigo-600',
};

const getColor = (networkName: string): string => {
  const name = networkName.toLowerCase().trim();
  return SOCIAL_COLORS[name] || 'bg-purple-500';
};

export default function IncidentsBySocialNetworkChart({ 
  data, 
  loading = false 
}: IncidentsBySocialNetworkChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-56" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Incidentes por Red Social</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No se han reportado incidentes en redes sociales
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort by total descending
  const sortedData = [...data].sort((a, b) => b.total - a.total);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incidentes por Red Social</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedData.map((network) => (
          <div key={network.nombre} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-700 capitalize">
                {network.nombre}
              </span>
              <span className="text-sm text-gray-600">
                {network.total} ({network.porcentaje.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${getColor(network.nombre)} h-3 rounded-full transition-all`}
                style={{ width: `${network.porcentaje}%` }}
              />
            </div>
          </div>
        ))}

        {sortedData.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">
            No se han reportado incidentes en redes sociales
          </p>
        )}
      </CardContent>
    </Card>
  );
}