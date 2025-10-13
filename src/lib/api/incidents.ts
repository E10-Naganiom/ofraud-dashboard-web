/**
 * Incident API Client Functions
 * API calls for incident management operations
 */

import { api } from '@/lib/api/client';
import type { Incident, IncidentDetail } from '@/lib/types/incident.types';
import { mockIncidents, getMockIncidentById } from '@/lib/mock/data';

// Enable mock mode (set to false to use real backend)
const USE_MOCK_DATA = true;

/**
 * Fetch all incidents from the backend
 * @returns Promise resolving to array of incidents
 * @throws Error if API call fails
 */
export async function getIncidents(): Promise<Incident[]> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockIncidents;
  }

  try {
    const response = await api.get<Incident[]>('/admin/incidents/list');
    return response.data;
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
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const incident = getMockIncidentById(id);
    if (!incident) {
      throw new Error(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  try {
    const response = await api.get<IncidentDetail>(`/admin/incidents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch incident with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Evaluates an incident by updating its status.
 * @param id The ID of the incident to evaluate.
 * @param statusId The new status ID for the incident.
 * @returns Promise resolving to void.
 * @throws Error if API call fails.
 */
export async function evaluateIncident(id: string, statusId: number, supervisorId?: string | null): Promise<void> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Mock: Evaluating incident ${id} with status ${statusId} and supervisor ${supervisorId}`);
    return;
  }

  try {
    const payload: { id_estatus: number; supervisor?: string | null } = { id_estatus: statusId };
    if (supervisorId !== undefined) {
      payload.supervisor = supervisorId;
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
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockIncidents.filter(
      (incident) => incident.id_estatus === 1 // IncidentStatus.Pendiente
    );
  }
  try {
    const response = await api.get<Incident[]>('/admin/incidents/list/pending');
    return response.data;
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
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockIncidents.filter(
      (incident) => incident.id_estatus === 2 // IncidentStatus.Aprobado
    );
  }
  try {
    const response = await api.get<Incident[]>('/admin/incidents/list/approved');
    return response.data;
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
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockIncidents.filter(
      (incident) => incident.id_estatus === 3 // IncidentStatus.Rechazado
    );
  }
  try {
    const response = await api.get<Incident[]>('/admin/incidents/list/rejected');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch rejected incidents:', error);
    throw error;
  }
}
