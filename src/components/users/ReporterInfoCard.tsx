/**
 * Component: ReporterInfoCard
 * Displays information about the user who reported an incident.
 */

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserInfo } from '@/lib/types/incident.types';

interface ReporterInfoCardProps {
  reporter: UserInfo;
}

/**
 * A card component to display details of the incident reporter.
 */
export default function ReporterInfoCard({ reporter }: ReporterInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Reportante</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoItem label="Nombre Completo" value={`${reporter.nombre} ${reporter.apellido}`} />
        <InfoItem label="Correo Electrónico" value={reporter.correo_electronico} />
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}
