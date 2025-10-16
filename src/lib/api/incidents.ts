/**
 * Incident API Client Functions
 * API calls for incident management operations
 */

import { api } from '@/lib/api/client';
import type { Incident, IncidentDetail } from '@/lib/types/incident.types';

/**
 * Fetch all incidents from the backend
 * @returns Promise resolving to array of incidents
 * @throws Error if API call fails
 */
export async function getIncidents(): Promise<Incident[]> {
  try {
    const response = await api.get<Incident[]>('/admin/incidents/list');
    return response.data.map(incident => ({
      ...incident,
      // Map backend fields to frontend expected structure
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo,
      es_anonimo: Boolean(incident.es_anonimo),
    }));
  } catch (error) {
    console.error('Failed to fetch incidents:', error);
    throw error;
  }
}

/**
 * Fetch a single incident by its ID
 * @param id The ID of the incident to fetch
 * @returns Promise resolving to the detailed incident object
 * @throws Error if API call fails (e.g., 404 Not Found)
 */
export async function getIncidentById(id: string): Promise<IncidentDetail> {
  try {
    const response = await api.get<IncidentDetail>(`/admin/incidents/${id}`);
    
    // Map backend response to frontend structure
    const incident = response.data;
    
    return {
      ...incident,
      es_anonimo: Boolean(incident.es_anonimo),
      // Ensure nested objects are properly structured
      usuario: incident.usuario || {
        id: String(incident.id_usuario),
        nombre: '',
        apellido: '',
        correo_electronico: '',
      },
      supervisor: incident.supervisor || null,
      evidencia: incident.evidencia || incident.evidencias || [],
    };
  } catch (error) {
    console.error(`Failed to fetch incident with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Evaluates an incident by updating its status.
 * @param id The ID of the incident to evaluate.
 * @param statusId The new status ID for the incident (1=Pendiente, 2=Aprobado, 3=Rechazado).
 * @param supervisorId Optional supervisor ID to assign.
 * @returns Promise resolving to void.
 * @throws Error if API call fails.
 */
export async function evaluateIncident(
  id: string, 
  statusId: number, 
  supervisorId?: string | null
): Promise<void> {
  try {
    const payload: { id_estatus: number; supervisor?: string | null } = { 
      id_estatus: statusId 
    };
    
    if (supervisorId !== undefined) {
      payload.supervisor = supervisorId ? Number(supervisorId) : null;
    }
    
    await api.patch(`/admin/incidents/${id}/evaluate`, payload);
  } catch (error) {
    console.error(`Failed to evaluate incident with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch all pending incidents.
 * @returns Promise resolving to array of pending incidents.
 */
export async function getPendingIncidents(): Promise<Incident[]> {
  try {
    const response = await api.get<Incident[]>('/admin/incidents/list/pending');
    return response.data.map(incident => ({
      ...incident,
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo,
      es_anonimo: Boolean(incident.es_anonimo),
    }));
  } catch (error) {
    console.error('Failed to fetch pending incidents:', error);
    throw error;
  }
}

/**
 * Fetch all approved incidents.
 * @returns Promise resolving to array of approved incidents.
 */
export async function getApprovedIncidents(): Promise<Incident[]> {
  try {
    const response = await api.get<Incident[]>('/admin/incidents/list/approved');
    return response.data.map(incident => ({
      ...incident,
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo,
      es_anonimo: Boolean(incident.es_anonimo),
    }));
  } catch (error) {
    console.error('Failed to fetch approved incidents:', error);
    throw error;
  }
}

/**
 * Fetch all rejected incidents.
 * @returns Promise resolving to array of rejected incidents.
 */
export async function getRejectedIncidents(): Promise<Incident[]> {
  try {
    const response = await api.get<Incident[]>('/admin/incidents/list/rejected');
    return response.data.map(incident => ({
      ...incident,
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo,
      es_anonimo: Boolean(incident.es_anonimo),
    }));
  } catch (error) {
    console.error('Failed to fetch rejected incidents:', error);
    throw error;
  }
}