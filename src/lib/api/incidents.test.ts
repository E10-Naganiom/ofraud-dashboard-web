/**
 * Incident API Client Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getIncidents } from './incidents';
import { api } from './client';
import type { Incident } from '@/lib/types/incident.types';
import { IncidentStatus } from '@/lib/types/incident.types';

// Mock the API client
vi.mock('./client', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('Incident API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getIncidents', () => {
    it('should fetch and return array of incidents', async () => {
      const mockIncidents: Incident[] = [
        {
          id: 1,
          titulo: 'Test Incident 1',
          descripcion: 'Test description 1',
          id_categoria: 1,
          id_estatus: IncidentStatus.Pendiente,
          nombre_atacante: 'John Doe',
          telefono: '555-1234',
          correo_electronico_atacante: 'attacker@example.com',
          usuario_red_social: '@attacker',
          red_social: 'Twitter',
          id_usuario: 1,
          fecha_creacion: '2025-10-06T10:30:00Z',
          fecha_actualizacion: '2025-10-06T10:30:00Z',
          supervisor: null,
          es_anonimo: false,
        },
        {
          id: 2,
          titulo: 'Test Incident 2',
          descripcion: 'Test description 2',
          id_categoria: 2,
          id_estatus: IncidentStatus.Aprobado,
          nombre_atacante: 'Jane Smith',
          telefono: '555-5678',
          correo_electronico_atacante: 'attacker2@example.com',
          usuario_red_social: '@attacker2',
          red_social: 'Facebook',
          id_usuario: 2,
          fecha_creacion: '2025-10-06T11:00:00Z',
          fecha_actualizacion: '2025-10-06T11:00:00Z',
          supervisor: 1,
          es_anonimo: false,
        },
      ];

      vi.mocked(api.get).mockResolvedValue({ data: mockIncidents });

      const result = await getIncidents();

      expect(api.get).toHaveBeenCalledWith('/admin/incidents/list');
      expect(result).toEqual(mockIncidents);
      expect(result).toHaveLength(2);
    });

    it('should handle API errors gracefully', async () => {
      const mockError = new Error('Network error');
      vi.mocked(api.get).mockRejectedValue(mockError);

      await expect(getIncidents()).rejects.toThrow('Network error');
      expect(api.get).toHaveBeenCalledWith('/admin/incidents/list');
    });

    it('should return empty array when no incidents exist', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: [] });

      const result = await getIncidents();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
