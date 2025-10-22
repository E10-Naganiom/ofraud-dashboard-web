/**
 * Incident API Client Functions
 * API calls for incident management operations
 */

import { api } from '@/lib/api/client';
import { getUserById } from '@/lib/api/users';
import type { Incident, IncidentDetail, UserInfo } from '@/lib/types/incident.types';
import { getCategories } from './categories';

/**
 * Fetch all incidents from the backend
 * @returns Promise resolving to array of incidents
 * @throws Error if API call fails
 */
export async function getIncidents(): Promise<Incident[]> {
  try {
    const [incidentsResponse, categories] = await Promise.all([
      api.get<Incident[]>('/admin/incidents/list'),
      getCategories()
    ]);
    
    // Create a map of categories for quick lookup
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    return incidentsResponse.data.map(incident => ({
      ...incident,
      // Map backend fields to frontend expected structure
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo,
      es_anonimo: Boolean(incident.es_anonimo),
      // Add category object if available
      categoria: categoryMap.get(String(incident.id_categoria)) || {
        id: String(incident.id_categoria),
        titulo: 'Categoría desconocida',
        descripcion: '',
        nivelRiesgo: 1,
        prevencion: '',
      },
    }));
  } catch (error) {
    console.error('Failed to fetch incidents:', error);
    throw error;
  }
}

/**
 * Fetch incident statistics from backend
 * @returns Promise resolving to statistics object
 * @throws Error if API call fails
 */
export async function getIncidentStatistics(): Promise<any> {
  try {
    const response = await api.get<any>('/incidents/statistics/summary');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch incident statistics:', error);
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
    const response = await api.get<any>(`/admin/incidents/${id}`);
    
    const incident = response.data;
    
    console.log('Raw incident data from backend:', incident);
    
    // Fetch category info if not included or if it's just an ID
    let categoryInfo;
    if (incident.categoria && typeof incident.categoria === 'object') {
      categoryInfo = incident.categoria;
    } else {
      try {
        const categories = await getCategories();
        categoryInfo = categories.find(cat => cat.id === String(incident.id_categoria)) || {
          id: String(incident.id_categoria),
          titulo: 'Categoría desconocida',
          descripcion: '',
          nivelRiesgo: 1,
          prevencion: '',
        };
      } catch (error) {
        console.error('Failed to fetch category info:', error);
        categoryInfo = {
          id: String(incident.id_categoria),
          titulo: 'Categoría desconocida',
          descripcion: '',
          nivelRiesgo: 1,
          prevencion: '',
        };
      }
    }
    
    // If supervisor is just an ID (number), fetch the full user info
    let supervisorInfo: UserInfo | null = null;
    if (incident.supervisor) {
      if (typeof incident.supervisor === 'number') {
        try {
          const supervisorUser = await getUserById(String(incident.supervisor));
          supervisorInfo = {
            id: supervisorUser.id,
            nombre: supervisorUser.nombre,
            apellido: supervisorUser.apellido,
            correo_electronico: supervisorUser.email,
          };
        } catch (error) {
          console.error('Failed to fetch supervisor info:', error);
        }
      } else {
        supervisorInfo = incident.supervisor;
      }
    }
    
    // If usuario (reporter) is just an ID (number), fetch the full user info
    let reporterInfo: UserInfo;
    if (incident.usuario) {
      if (typeof incident.usuario === 'number') {
        try {
          const reporterUser = await getUserById(String(incident.usuario));
          reporterInfo = {
            id: reporterUser.id,
            nombre: reporterUser.nombre,
            apellido: reporterUser.apellido,
            correo_electronico: reporterUser.email,
          };
        } catch (error) {
          console.error('Failed to fetch reporter info:', error);
          reporterInfo = {
            id: String(incident.id_usuario || incident.usuario),
            nombre: '',
            apellido: '',
            correo_electronico: '',
          };
        }
      } else {
        reporterInfo = incident.usuario;
      }
    } else {
      try {
        const reporterUser = await getUserById(String(incident.id_usuario));
        reporterInfo = {
          id: reporterUser.id,
          nombre: reporterUser.nombre,
          apellido: reporterUser.apellido,
          correo_electronico: reporterUser.email,
        };
      } catch (error) {
        console.error('Failed to fetch reporter info from id_usuario:', error);
        reporterInfo = {
          id: String(incident.id_usuario),
          nombre: '',
          apellido: '',
          correo_electronico: '',
        };
      }
    }
    
    // Map backend response to frontend structure
    const mappedIncident: IncidentDetail = {
      id: incident.id,
      titulo: incident.titulo,
      descripcion: incident.descripcion,
      id_categoria: incident.id_categoria,
      id_estatus: incident.id_estatus,
      nombre_atacante: incident.nombre_atacante || null,
      telefono: incident.telefono || null,
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo || null,
      usuario_red_social: incident.usuario_red_social || incident.user_red || null,
      red_social: incident.red_social || null,
      id_usuario: incident.id_usuario,
      fecha_creacion: incident.fecha_creacion,
      fecha_actualizacion: incident.fecha_actualizacion,
      supervisor: supervisorInfo,
      es_anonimo: Boolean(incident.es_anonimo),
      
      categoria: categoryInfo,
      usuario: reporterInfo,
      evidencia: incident.evidencia || incident.evidencias || [],
    };
    
    console.log('Mapped incident with supervisor, reporter, and category:', mappedIncident);
    
    return mappedIncident;
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
 * @returns Promise resolving to the updated incident.
 * @throws Error if API call fails.
 */
export async function evaluateIncident(
  id: string, 
  statusId: number, 
  supervisorId?: string | null
): Promise<IncidentDetail> {
  try {
    const payload: { id_estatus: number; supervisor?: number | null } = { 
      id_estatus: statusId 
    };
    
    if (supervisorId !== undefined) {
      payload.supervisor = supervisorId ? Number(supervisorId) : null;
    }
    
    console.log('Evaluating incident with payload:', payload);
    
    await api.patch(`/admin/incidents/${id}/evaluate`, payload);
    
    // Fetch updated incident to get the full supervisor object
    const updatedIncident = await getIncidentById(id);
    
    console.log('Updated incident after evaluation:', updatedIncident);
    
    return updatedIncident;
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
    const [incidentsResponse, categories] = await Promise.all([
      api.get<Incident[]>('/admin/incidents/list/pending'),
      getCategories()
    ]);
    
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    return incidentsResponse.data.map(incident => ({
      ...incident,
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo,
      es_anonimo: Boolean(incident.es_anonimo),
      categoria: categoryMap.get(String(incident.id_categoria)) || {
        id: String(incident.id_categoria),
        titulo: 'Categoría desconocida',
        descripcion: '',
        nivelRiesgo: 1,
        prevencion: '',
      },
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
    const [incidentsResponse, categories] = await Promise.all([
      api.get<Incident[]>('/admin/incidents/list/approved'),
      getCategories()
    ]);
    
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    return incidentsResponse.data.map(incident => ({
      ...incident,
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo,
      es_anonimo: Boolean(incident.es_anonimo),
      categoria: categoryMap.get(String(incident.id_categoria)) || {
        id: String(incident.id_categoria),
        titulo: 'Categoría desconocida',
        descripcion: '',
        nivelRiesgo: 1,
        prevencion: '',
      },
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
    const [incidentsResponse, categories] = await Promise.all([
      api.get<Incident[]>('/admin/incidents/list/rejected'),
      getCategories()
    ]);
    
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    return incidentsResponse.data.map(incident => ({
      ...incident,
      correo_electronico_atacante: incident.correo_electronico_atacante || incident.correo,
      es_anonimo: Boolean(incident.es_anonimo),
      categoria: categoryMap.get(String(incident.id_categoria)) || {
        id: String(incident.id_categoria),
        titulo: 'Categoría desconocida',
        descripcion: '',
        nivelRiesgo: 1,
        prevencion: '',
      },
    }));
  } catch (error) {
    console.error('Failed to fetch rejected incidents:', error);
    throw error;
  }
}