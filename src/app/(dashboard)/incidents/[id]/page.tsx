// app/(dashboard)/incidents/[id]/page.tsx - Página de detalle

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
import { toast } from 'sonner';

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
    setIncident((prev) => {
      if (!prev) return null;
      
      const updated = { ...prev, ...updatedData };
      
      // Show success toast
      toast.success('Incidente actualizado exitosamente');
      
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error al cargar incidente</h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'El incidente que estás buscando no existe o ha sido eliminado.'}
        </p>
        <Button onClick={() => router.push('/incidents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a lista
        </Button>
      </div>
    );
  }

  if (!incident) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start">
        <Button asChild variant="outline">
          <Link href="/incidents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a lista
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <IncidentDetailDisplay incident={incident} />
          
          {/* Evidence Gallery */}
          {incident.evidencia && incident.evidencia.length > 0 && (
            <EvidenceGallery evidence={incident.evidencia} />
          )}
        </div>
        
        <div className="space-y-6">
          {/* Reporter Info */}
          {!incident.es_anonimo && incident.usuario && (
            <ReporterInfoCard reporter={incident.usuario} />
          )}
          
          {incident.es_anonimo && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 text-center">
                Este reporte es anónimo
              </p>
            </div>
          )}
          
          {/* Evaluation Form */}
          <IncidentEvaluationForm incident={incident} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}