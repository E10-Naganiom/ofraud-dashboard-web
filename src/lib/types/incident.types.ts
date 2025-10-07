/**
 * Incident Type Definitions
 * Data models for incident management system
 */

/**
 * Incident status enum matching backend database values
 */
export enum IncidentStatus {
  /** Incident is pending review by admin */
  Pendiente = 1,
  /** Incident has been approved by admin */
  Aprobado = 2,
  /** Incident has been rejected by admin */
  Rechazado = 3,
}

/**
 * Incident interface matching backend API response structure
 */
export interface Incident {
  /** Unique incident identifier */
  id: number;

  /** Incident title (max 255 characters) */
  titulo: string;

  /** Detailed incident description */
  descripcion: string;

  /** Category ID reference (links to categorias table) */
  id_categoria: number;

  /** Current incident status (1=Pendiente, 2=Aprobado, 3=Rechazado) */
  id_estatus: IncidentStatus;

  /** Name of the attacker/perpetrator (nullable) */
  nombre_atacante: string | null;

  /** Attacker's phone number (nullable) */
  telefono: string | null;

  /** Attacker's email address (nullable) */
  correo_electronico_atacante: string | null;

  /** Attacker's social media username (nullable) */
  usuario_red_social: string | null;

  /** Social media platform name (nullable) */
  red_social: string | null;

  /** User ID who reported the incident */
  id_usuario: number;

  /** Incident creation timestamp (ISO 8601 format) */
  fecha_creacion: string;

  /** Last update timestamp (ISO 8601 format) */
  fecha_actualizacion: string;

  /** Admin user ID who supervised/reviewed the incident (nullable) */
  supervisor: number | null;

  /** Whether the incident was reported anonymously */
  es_anonimo: boolean;
}
