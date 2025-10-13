export interface DashboardMetrics {
  totalIncidents: number;
  pendingIncidents: number;
  approvedIncidents: number;
  rejectedIncidents: number;
  totalUsers: number;
  totalCategories: number;
}

export interface RecentIncident {
  id: string;
  titulo: string;
  categoria: string;
  fecha_creacion: string;
  id_estatus: number;
}

export const mockDashboardMetrics: DashboardMetrics = {
  totalIncidents: 45,
  pendingIncidents: 12,
  approvedIncidents: 28,
  rejectedIncidents: 5,
  totalUsers: 8,
  totalCategories: 15,
};

export const mockRecentIncidents: RecentIncident[] = [
  {
    id: '1',
    titulo: 'Reporte de phishing en correo corporativo detectado por empleado',
    categoria: 'Phishing',
    fecha_creacion: '2025-10-12T10:30:00Z',
    id_estatus: 1, // Pendiente
  },
  {
    id: '2',
    titulo: 'Intento de acceso no autorizado detectado en servidor de producción',
    categoria: 'Acceso No Autorizado',
    fecha_creacion: '2025-10-12T09:15:00Z',
    id_estatus: 2, // Aprobado
  },
  {
    id: '3',
    titulo: 'Robo de datos personales reportado por cliente externo',
    categoria: 'Robo de Datos',
    fecha_creacion: '2025-10-12T08:45:00Z',
    id_estatus: 1, // Pendiente
  },
  {
    id: '4',
    titulo: 'Software malicioso encontrado en equipo de desarrollo',
    categoria: 'Malware',
    fecha_creacion: '2025-10-11T16:20:00Z',
    id_estatus: 3, // Rechazado
  },
  {
    id: '5',
    titulo: 'Suplantación de identidad en redes sociales corporativas',
    categoria: 'Suplantación de Identidad',
    fecha_creacion: '2025-10-11T14:10:00Z',
    id_estatus: 2, // Aprobado
  },
  {
    id: '6',
    titulo: 'Fraude financiero en transacciones de cuentas por pagar',
    categoria: 'Fraude Financiero',
    fecha_creacion: '2025-10-11T11:30:00Z',
    id_estatus: 1, // Pendiente
  },
  {
    id: '7',
    titulo: 'Vulnerabilidad crítica detectada en sistema de autenticación',
    categoria: 'Vulnerabilidad de Sistema',
    fecha_creacion: '2025-10-11T09:50:00Z',
    id_estatus: 2, // Aprobado
  },
  {
    id: '8',
    titulo: 'Denegación de servicio (DDoS) reportado en portal web',
    categoria: 'DDoS',
    fecha_creacion: '2025-10-10T15:40:00Z',
    id_estatus: 2, // Aprobado
  },
];
