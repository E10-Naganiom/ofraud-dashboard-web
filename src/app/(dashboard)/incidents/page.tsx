//app/(dashboard)/incidents/page.tsx - Lista de incidentes
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
import { useDebounce } from "@/hooks/useDebounce";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "sonner";

export default function IncidentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [allIncidents, setAllIncidents] = useState<Incident[]>([]); // Para calcular counts
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

  // Calculate counts from all incidents
  const counts = useMemo(() => ({
    all: allIncidents.length,
    pending: allIncidents.filter(i => i.id_estatus === 1).length,
    approved: allIncidents.filter(i => i.id_estatus === 2).length,
    rejected: allIncidents.filter(i => i.id_estatus === 3).length,
  }), [allIncidents]);

  // Fetch all incidents once for counts
  useEffect(() => {
    const fetchAllIncidents = async () => {
      try {
        const data = await getIncidents();
        setAllIncidents(data);
      } catch (error: any) {
        console.error("Failed to fetch all incidents:", error);
      }
    };

    fetchAllIncidents();
  }, []);

  // Fetch filtered incidents based on active tab
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
      } catch (error: any) {
        console.error("Failed to fetch incidents:", error);
        const errorMessage = error.message || 'Error al cargar incidentes. Intente nuevamente.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSearchTerm(''); // Clear search when changing tabs
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
          counts={counts}
        />
      </div>

      <div className="relative mb-4 mt-6">
        <Input
          placeholder="Buscar por título, descripción o ID..."
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

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Cargando incidentes...</p>
        </div>
      )}
      
      {!loading && error && (
        <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50">
          {error}
        </div>
      )}
      
      {!loading && !error && incidents.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          {activeTab === 'pending' && 'No hay incidentes pendientes.'}
          {activeTab === 'approved' && 'No hay incidentes aprobados.'}
          {activeTab === 'rejected' && 'No hay incidentes rechazados.'}
          {activeTab === 'all' && 'No se encontraron incidentes.'}
        </p>
      )}
      
      {!loading && !error && filteredIncidents.length === 0 && debouncedSearchTerm && (
        <p className="text-center py-8">
          No se encontraron incidentes que coincidan con &apos;{debouncedSearchTerm}&apos;.
        </p>
      )}
      
      {!loading && !error && filteredIncidents.length > 0 && (
        <IncidentList incidents={filteredIncidents} categoryMap={categoryMap} />
      )}
    </div>
  );
}