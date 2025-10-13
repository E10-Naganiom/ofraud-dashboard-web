"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Edit } from "lucide-react";
import type { Incident } from "@/lib/types/incident.types";
import IncidentStatusBadge from "./IncidentStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IncidentListProps {
  incidents: Incident[];
  categoryMap?: Map<string, string>;
}

const INCIDENTS_PER_PAGE = 10;

export default function IncidentList({ incidents, categoryMap = new Map() }: IncidentListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(incidents.length / INCIDENTS_PER_PAGE);
  const paginatedIncidents = incidents.slice(
    (currentPage - 1) * INCIDENTS_PER_PAGE,
    currentPage * INCIDENTS_PER_PAGE
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.id}</TableCell>
                <TableCell className="truncate max-w-[250px]">
                  {incident.titulo}
                </TableCell>
                <TableCell>
                  {categoryMap.get(incident.id_categoria) || 'N/A'}
                </TableCell>
                <TableCell>{formatDate(incident.fecha_creacion)}</TableCell>
                <TableCell>
                  <IncidentStatusBadge status={incident.id_estatus} />
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Link href={`/incidents/${incident.id}`}>
                    <Button variant="ghost" size="icon" aria-label="Ver detalles del incidente">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {incident.id_estatus === 1 && (
                    <Link href={`/incidents/${incident.id}/evaluate`}>
                      <Button variant="ghost" size="icon" aria-label="Evaluar incidente">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className="text-sm text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
