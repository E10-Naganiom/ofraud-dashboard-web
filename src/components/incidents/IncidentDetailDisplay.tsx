/**
 * Component: IncidentDetailDisplay
 * Displays the main fields of an incident in a structured card layout.
 */

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IncidentStatusBadge from '@/components/incidents/IncidentStatusBadge';
import type { IncidentDetail } from '@/lib/types/incident.types';
import { format } from 'date-fns';

interface IncidentDetailDisplayProps {
  incident: IncidentDetail;
}

/**
 * A component to display the detailed properties of an incident.
 */
export default function IncidentDetailDisplay({ incident }: IncidentDetailDisplayProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-bold">{incident.titulo}</CardTitle>
          <IncidentStatusBadge status={incident.id_estatus} />
        </div>
        <p className="text-sm text-gray-500">
          Reportado el {formatDate(incident.fecha_creacion)}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Descripción</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{incident.descripcion}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Categoría" value={incident.categoria.titulo} />
          <InfoItem label="Anónimo" value={incident.es_anonimo ? 'Sí' : 'No'} />
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Detalles del Atacante</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Nombre" value={incident.nombre_atacante} />
            <InfoItem label="Teléfono" value={incident.telefono} />
            <InfoItem label="Correo Electrónico" value={incident.correo_electronico_atacante} />
            <InfoItem label="Red Social" value={incident.red_social} />
            <InfoItem label="Usuario de Red Social" value={incident.usuario_red_social} />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Administración</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              label="Supervisor"
              value={incident.supervisor ? `${incident.supervisor.nombre} ${incident.supervisor.apellido}` : 'Sin asignar'}
            />
            <InfoItem label="Última Actualización" value={formatDate(incident.fecha_actualizacion)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Helper component to render a label and value pair, handling null/empty values.
 */
function InfoItem({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold">{value || 'No especificado'}</p>
    </div>
  );
}
