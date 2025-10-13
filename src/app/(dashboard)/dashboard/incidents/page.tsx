'use client';

/**
 * Incidents List Page
 * Displays paginated list of all cybercrime incidents
 */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { getIncidents } from '@/lib/api/incidents';
import type { Incident } from '@/lib/types/incident.types';
import { formatDateTime } from '@/lib/utils/formatters';
import { useDebounce } from '@/hooks/useDebounce';
import { useCategories } from '@/hooks/useCategories';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import IncidentStatusBadge from '@/components/incidents/IncidentStatusBadge';
import IncidentFilters from '@/components/incidents/IncidentFilters';

export default function IncidentsPage() {
  const router = useRouter();

  // State management
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' or category ID
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { categories, loading: loadingCategories } = useCategories();

  // Create a map of category IDs to names for quick lookup
  const categoryMap = useMemo(() => {
    if (loadingCategories) return new Map();
    return categories.reduce((acc, category) => {
      acc.set(category.id, category.titulo);
      return acc;
    }, new Map<string, string>());
  }, [categories, loadingCategories]);

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

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory]);

  // Filter incidents based on search and category
  const filteredIncidents = useMemo(() => {
    let filtered = incidents;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (incident) => incident.id_categoria === selectedCategory
      );
    }

    // Apply search filter
    if (debouncedSearchTerm) {
      const query = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter((incident) => {
        const idMatch = incident.id.toString().includes(query);
        const titleMatch = incident.titulo.toLowerCase().includes(query);
        const descriptionMatch = incident.descripcion.toLowerCase().includes(query);
        return idMatch || titleMatch || descriptionMatch;
      });
    }

    return filtered;
  }, [incidents, debouncedSearchTerm, selectedCategory]);

  // Calculate pagination values based on filtered incidents
  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIncidents = filteredIncidents.slice(startIndex, endIndex);

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
  
  // Helper to get empty state message
  const getEmptyStateMessage = () => {
    if (incidents.length === 0) {
      return "No se encontraron incidentes";
    }
    if (debouncedSearchTerm && selectedCategory !== 'all') {
      return `No se encontraron incidentes que coincidan con '${debouncedSearchTerm}' en esta categoría.`;
    }
    if (debouncedSearchTerm) {
      return `No se encontraron incidentes que coincidan con '${debouncedSearchTerm}'`;
    }
    if (selectedCategory !== 'all') {
      return "No se encontraron incidentes en esta categoría";
    }
    return "No se encontraron incidentes"; // Fallback
  };


  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Incidentes Reportados</h1>

      <IncidentFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Empty state */}
      {filteredIncidents.length === 0 ? (
        <div className="text-gray-500">{getEmptyStateMessage()}</div>
      ) : (
        <>
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
                    <TableCell>{categoryMap.get(incident.id_categoria) || 'N/A'}</TableCell>
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
              disabled={currentPage >= totalPages}
            >
              Siguiente
            </Button>
          </div>
        </>
      )}
    </div>
  );
}