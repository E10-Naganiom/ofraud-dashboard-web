/**
 * Custom Hook: useIncident
 * Fetches a single incident by its ID and manages loading/error states.
 */

import { useState, useEffect } from 'react';
import { getIncidentById } from '@/lib/api/incidents';
import type { IncidentDetail } from '@/lib/types/incident.types';

/**
 * Fetches and manages state for a single incident.
 *
 * @param id The ID of the incident to fetch.
 * @returns An object containing the incident data, loading state, and error state.
 */
export function useIncident(id: string | null) {
  const [data, setData] = useState<IncidentDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Don't fetch if ID is not provided
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchIncident() {
      try {
        setLoading(true);
        setError(null);
        const incidentData = await getIncidentById(id!);
        setData(incidentData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchIncident();
  }, [id]); // Re-run effect if the ID changes

  return { data, loading, error };
}
