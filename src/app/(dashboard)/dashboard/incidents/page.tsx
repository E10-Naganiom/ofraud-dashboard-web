'use client';

/**
 * Incidents List Page
 * Displays paginated list of all cybercrime incidents
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getIncidents } from '@/lib/api/incidents';
import type { Incident } from '@/lib/types/incident.types';
import { formatDateTime } from '@/lib/utils/formatters';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import IncidentStatusBadge from '@/components/incidents/IncidentStatusBadge';

export default function IncidentsPage() {
  const router = useRouter();

  // State management
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Fetch incidents on component mount
  useEffect(() => {
    async function fetchIncidents() {
      try {
        setLoading(true);
        setError(null);
        const data = await getIncidents();
        setIncidents(data);
      } catch (err) {
        setError('Error al cargar incidentes. Intente nuevamente.');
        console.error('Failed to fetch incidents:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchIncidents();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(incidents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIncidents = incidents.slice(startIndex, endIndex);

  // Handle incident row click
  const handleRowClick = (incidentId: number) => {
    router.push(`/dashboard/incidents/${incidentId}`);
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-red-600 font-medium">{error}</div>
      </div>
    );
  }

  // Empty state
  if (incidents.length === 0) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Incidentes Reportados</h1>
        <div className="text-gray-500">No se encontraron incidentes</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Incidentes Reportados</h1>

      {/* Search bar and filter placeholders */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Buscar por ID, título, descripción, o palabras clave..."
          disabled
          className="max-w-md"
        />
      </div>

      {/* Incidents table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentIncidents.map((incident) => (
              <TableRow
                key={incident.id}
                onClick={() => handleRowClick(incident.id)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell>{incident.id}</TableCell>
                <TableCell className="truncate max-w-[200px]">
                  {incident.titulo}
                </TableCell>
                <TableCell>{incident.id_categoria}</TableCell>
                <TableCell>{formatDateTime(incident.fecha_creacion)}</TableCell>
                <TableCell>
                  <IncidentStatusBadge status={incident.id_estatus} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className="text-sm text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
