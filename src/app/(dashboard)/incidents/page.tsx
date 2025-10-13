"use client";

import { useState, useEffect, useMemo } from "react";
import IncidentStatusTabs from "@/components/incidents/IncidentStatusTabs";
import IncidentList from "@/components/incidents/IncidentList";
import { PageHeader } from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  getIncidents,
  getPendingIncidents,
  getApprovedIncidents,
  getRejectedIncidents,
} from "@/lib/api/incidents";
import type { Incident } from "@/lib/types/incident.types";
import { mockIncidents } from "@/lib/mock/data";
import { useDebounce } from "@/hooks/useDebounce";
import { useCategories } from "@/hooks/useCategories";

// Calculate mock counts from the full mock data
const mockCounts = {
  all: mockIncidents.length,
  pending: mockIncidents.filter(i => i.id_estatus === 1).length,
  approved: mockIncidents.filter(i => i.id_estatus === 2).length,
  rejected: mockIncidents.filter(i => i.id_estatus === 3).length,
};

export default function IncidentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      try {
        let data: Incident[] = [];
        switch (activeTab) {
          case "pending":
            data = await getPendingIncidents();
            break;
          case "approved":
            data = await getApprovedIncidents();
            break;
          case "rejected":
            data = await getRejectedIncidents();
            break;
          default:
            data = await getIncidents();
            break;
        }
        setIncidents(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
        setError('Error al cargar incidentes. Intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident =>
      incident.titulo.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      incident.descripcion.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      incident.id.toString().includes(debouncedSearchTerm)
    );
  }, [incidents, debouncedSearchTerm]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <PageHeader
            title="Gestión de Incidentes"
            description="Evalúa, aprueba o rechaza los incidentes reportados."
          />
        </div>
      </div>

      <div className="mt-8">
        <IncidentStatusTabs
          activeTab={activeTab}
          onTabClick={handleTabClick}
          counts={mockCounts}
        />
      </div>

      <div className="relative mb-4 mt-6">
        <Input
          placeholder="Buscar por título o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchTerm('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {loading && <p>Cargando incidentes...</p>}
      {!loading && error && <p className="text-red-500">{error}</p>}
      {!loading && !error && incidents.length === 0 && (
        <p className="text-gray-500">
          {activeTab === 'pending' && 'No hay incidentes pendientes.'}
          {activeTab === 'approved' && 'No hay incidentes aprobados.'}
          {activeTab === 'rejected' && 'No hay incidentes rechazados.'}
          {activeTab === 'all' && 'No se encontraron incidentes.'}
        </p>
      )}
      {!loading && !error && filteredIncidents.length === 0 && debouncedSearchTerm && (
        <p>No se encontraron incidentes que coincidan con &apos;{debouncedSearchTerm}&apos;.</p>
      )}
      {!loading && !error && filteredIncidents.length > 0 && (
        <IncidentList incidents={filteredIncidents} categoryMap={categoryMap} />
      )}
    </div>
  );
}
