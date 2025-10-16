'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Incident } from '@/lib/types/incident.types';
import { cn } from '@/lib/utils/cn';
import { ArrowRight } from 'lucide-react';

const statusConfig: Record<number, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  1: { label: 'Pendiente', variant: 'secondary' },
  2: { label: 'Aprobado', variant: 'default' },
  3: { label: 'Rechazado', variant: 'destructive' },
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'Hace menos de 1 hora';
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  } else if (diffInHours < 48) {
    return 'Hace 1 día';
  } else {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
};

const truncateTitle = (title: string, maxLength: number = 60): string => {
  if (title.length <= maxLength) return title;
  return `${title.substring(0, maxLength)}...`;
};

interface RecentIncidentsListProps {
  incidents?: Incident[];
  loading?: boolean;
}

export default function RecentIncidentsList({ 
  incidents = [], 
  loading = false 
}: RecentIncidentsListProps): React.JSX.Element {
  
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!incidents || incidents.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">No hay incidentes recientes</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {incidents.map((incident) => {
          const status = statusConfig[incident.id_estatus] || statusConfig[1];

          return (
            <Link
              key={incident.id}
              href={`/incidents/${incident.id}`}
              className="block"
            >
              <Card className="p-4 hover:shadow-md transition-all hover:border-blue-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {truncateTitle(incident.titulo)}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Categoría ID:</span>
                        {incident.id_categoria}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>{formatDate(incident.fecha_creacion)}</span>
                    </div>
                  </div>
                  <Badge variant={status.variant} className={cn(
                    'shrink-0',
                    status.variant === 'secondary' && 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
                    status.variant === 'default' && 'bg-green-100 text-green-800 hover:bg-green-200',
                  )}>
                    {status.label}
                  </Badge>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center pt-2">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/incidents">
            Ver todos los incidentes
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
}