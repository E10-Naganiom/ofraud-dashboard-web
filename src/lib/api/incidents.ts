/**
 * Incident API Client Functions
 * API calls for incident management operations
 */

import { api } from '@/lib/api/client';
import type { Incident } from '@/lib/types/incident.types';

/**
 * Fetch all incidents from the backend
 * @returns Promise resolving to array of incidents
 * @throws Error if API call fails
 */
export async function getIncidents(): Promise<Incident[]> {
  try {
    const response = await api.get<Incident[]>('/admin/incidents/list');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch incidents:', error);
    throw error;
  }
}
