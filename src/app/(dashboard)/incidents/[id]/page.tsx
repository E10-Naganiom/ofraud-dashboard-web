'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIncident } from '@/hooks/useIncident';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import IncidentDetailDisplay from '@/components/incidents/IncidentDetailDisplay';
import EvidenceGallery from '@/components/incidents/EvidenceGallery';
import ReporterInfoCard from '@/components/users/ReporterInfoCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import IncidentEvaluationForm from '@/components/incidents/IncidentEvaluationForm';
import type { IncidentDetail } from '@/lib/types/incident.types';

/**
 * Page to display the full details of a single incident.
 */
export default function IncidentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : null;

  const { data: initialIncident, loading, error } = useIncident(id);
  const [incident, setIncident] = React.useState<IncidentDetail | null>(initialIncident);

  React.useEffect(() => {
    if (initialIncident) {
      setIncident(initialIncident);
    }
  }, [initialIncident]);

  const handleUpdate = (updatedData: Partial<IncidentDetail>) => {
    setIncident((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Incidente no encontrado</h2>
        <p className="text-gray-600 mb-6">
          El incidente que estás buscando no existe o ha sido eliminado.
        </p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </div>
    );
  }

  if (!incident) {
    return null; // Should be covered by loading/error states
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start">
        <Button asChild variant="outline">
          <Link href="/dashboard/incidents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a lista
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <IncidentDetailDisplay incident={incident} />
        </div>
        <div className="space-y-6">
          {!incident.es_anonimo && <ReporterInfoCard reporter={incident.usuario} />}
          <IncidentEvaluationForm incident={incident} onUpdate={handleUpdate} />
        </div>
      </div>

      <EvidenceGallery evidence={incident.evidencia} />
    </div>
  );
}
