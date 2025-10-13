'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/cn';
import { AlertCircle } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  className?: string;
}

export default function MetricCard({
  label,
  value,
  icon,
  loading = false,
  error = false,
  className,
}: MetricCardProps): React.JSX.Element {
  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-10 w-16" />
          </div>
          <Skeleton className="h-10 w-10 rounded" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('p-6 border-red-200 bg-red-50', className)}>
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle size={20} />
          <span className="text-sm">Error al cargar</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-6 hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-blue-500">{icon}</div>
      </div>
    </Card>
  );
}
