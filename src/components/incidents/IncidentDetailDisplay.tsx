/**
 * Component: IncidentDetailDisplay
 * Displays the main fields of an incident in a structured card layout.
 */

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IncidentStatusBadge from '@/components/incidents/IncidentStatusBadge';
import type { IncidentDetail } from '@/lib/types/incident.types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface IncidentDetailDisplayProps {
  incident: IncidentDetail;
}

/**
 * A component to display the detailed properties of an incident.
 */
export default function IncidentDetailDisplay({ incident }: IncidentDetailDisplayProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold mb-2">{incident.titulo}</CardTitle>
            <p className="text-sm text-gray-500">
              Reportado el {formatDate(incident.fecha_creacion)}
            </p>
          </div>
          <IncidentStatusBadge status={incident.id_estatus} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Descripción</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{incident.descripcion}</p>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem 
            label="Categoría" 
            value={incident.categoria?.titulo || `ID: ${incident.id_categoria}`} 
          />
          <InfoItem 
            label="Reporte Anónimo" 
            value={incident.es_anonimo ? 'Sí' : 'No'} 
          />
        </div>

        {/* Attacker Details */}
        {(incident.nombre_atacante || incident.telefono || incident.correo_electronico_atacante || 
          incident.red_social || incident.usuario_red_social) && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Detalles del Atacante</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incident.nombre_atacante && (
                <InfoItem label="Nombre" value={incident.nombre_atacante} />
              )}
              {incident.telefono && (
                <InfoItem label="Teléfono" value={incident.telefono} />
              )}
              {incident.correo_electronico_atacante && (
                <InfoItem label="Correo Electrónico" value={incident.correo_electronico_atacante} />
              )}
              {incident.red_social && (
                <InfoItem label="Red Social" value={incident.red_social} />
              )}
              {incident.usuario_red_social && (
                <InfoItem label="Usuario de Red Social" value={incident.usuario_red_social} />
              )}
            </div>
          </div>
        )}

        {/* Administration Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Administración</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              label="Supervisor"
              value={
                incident.supervisor 
                  ? `${incident.supervisor.nombre} ${incident.supervisor.apellido}` 
                  : 'Sin asignar'
              }
            />
            <InfoItem 
              label="Última Actualización" 
              value={formatDate(incident.fecha_actualizacion)} 
            />
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
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-900">
        {value || 'No especificado'}
      </p>
    </div>
  );
}