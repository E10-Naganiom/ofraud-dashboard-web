/**
 * Incident Status Badge Component
 * Displays color-coded status badge for incidents
 */

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { IncidentStatus } from '@/lib/types/incident.types';
import { cn } from '@/lib/utils';

interface IncidentStatusBadgeProps {
  /** Incident status (1=Pendiente, 2=Aprobado, 3=Rechazado) */
  status: IncidentStatus;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Status color mappings
 */
const statusColors: Record<IncidentStatus, string> = {
  [IncidentStatus.Pendiente]: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  [IncidentStatus.Aprobado]: 'bg-green-100 text-green-800 hover:bg-green-100',
  [IncidentStatus.Rechazado]: 'bg-red-100 text-red-800 hover:bg-red-100',
};

/**
 * Status label mappings (Spanish)
 */
const statusLabels: Record<IncidentStatus, string> = {
  [IncidentStatus.Pendiente]: 'Pendiente',
  [IncidentStatus.Aprobado]: 'Aprobado',
  [IncidentStatus.Rechazado]: 'Rechazado',
};

/**
 * Renders a color-coded badge based on incident status
 */
export default function IncidentStatusBadge({
  status,
  className,
}: IncidentStatusBadgeProps) {
  return (
    <Badge className={cn(statusColors[status], className)}>
      {statusLabels[status]}
    </Badge>
  );
}
