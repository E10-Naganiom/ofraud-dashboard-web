/**
 * Mock Data for Development
 * Use this data when backend is unavailable
 */

import type { Incident, IncidentDetail, Evidence, UserInfo } from '@/lib/types/incident.types';
import type { Category } from '@/lib/types/category.types';
import { IncidentStatus } from '@/lib/types/incident.types';

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    titulo: 'Phishing',
    descripcion: 'Intentos de robo de información mediante engaño, generalmente a través de correos electrónicos o mensajes fraudulentos que se hacen pasar por entidades legítimas.',
    nivelRiesgo: 4,
    senales: 'Correos con enlaces sospechosos, solicitudes urgentes de información personal, errores gramaticales en mensajes oficiales',
    prevencion: 'Verificar remitentes de correos, no hacer clic en enlaces sospechosos, habilitar autenticación de dos factores',
    acciones: 'Reportar correos sospechosos, no proporcionar información personal, contactar directamente a la entidad por canales oficiales',
    ejemplos: 'Correos falsos de bancos, mensajes de premios falsos, solicitudes urgentes de actualización de datos',
    imagen: 'https://placehold.co/600x400/ef4444/ffffff?text=Phishing',
  },
  {
    id: '2',
    titulo: 'Fraude en línea',
    descripcion: 'Estafas y fraudes cometidos por internet, incluyendo ventas falsas, inversiones fraudulentas y esquemas piramidales digitales.',
    nivelRiesgo: 3,
    senales: 'Ofertas demasiado buenas para ser verdad, pagos por adelantado, vendedores sin reputación verificable',
    prevencion: 'Investigar vendedores antes de comprar, usar métodos de pago seguros, desconfiar de ofertas extraordinarias',
    acciones: 'Verificar la legitimidad del vendedor, usar plataformas de pago con protección al comprador, conservar toda la comunicación',
    ejemplos: 'Ventas falsas en redes sociales, esquemas de inversión en criptomonedas, estafas de trabajo desde casa',
    imagen: 'https://placehold.co/600x400/f97316/ffffff?text=Fraude',
  },
  {
    id: '3',
    titulo: 'Suplantación de identidad',
    descripcion: 'Uso indebido de identidad de terceros para cometer fraudes, acceder a cuentas o dañar la reputación de la víctima.',
    nivelRiesgo: 4,
    senales: 'Cuentas duplicadas en redes sociales, actividad inusual en cuentas personales, contactos reportando mensajes extraños',
    prevencion: 'Configurar privacidad en redes sociales, usar contraseñas fuertes y únicas, monitorear búsquedas del propio nombre',
    acciones: 'Reportar cuentas falsas, notificar a contactos, cambiar contraseñas, contactar plataformas para eliminación',
    ejemplos: 'Perfiles falsos en Instagram, uso de nombre para estafas, cuentas clonadas en Facebook',
  },
  {
    id: '4',
    titulo: 'Ciberacoso',
    descripcion: 'Acoso o intimidación por medios digitales, incluyendo amenazas, difamación y hostigamiento persistente a través de internet o redes sociales.',
    nivelRiesgo: 3,
    senales: 'Mensajes amenazantes repetidos, difusión de información privada, comentarios ofensivos constantes',
    prevencion: 'Ajustar configuraciones de privacidad, bloquear usuarios agresivos, no responder a provocaciones',
    acciones: 'Documentar todo el acoso, reportar a la plataforma, bloquear al acosador, buscar apoyo legal si es grave',
    ejemplos: 'Amenazas por WhatsApp, publicaciones difamatorias, mensajes ofensivos constantes',
    imagen: 'https://placehold.co/600x400/eab308/ffffff?text=Ciberacoso',
  },
  {
    id: '5',
    titulo: 'Extorsión digital',
    descripcion: 'Amenazas para obtener dinero o información mediante el uso de datos personales, imágenes comprometedoras o bloqueo de sistemas (ransomware).',
    nivelRiesgo: 4,
    senales: 'Amenazas de publicar información privada, bloqueo de archivos, demandas de pago en criptomonedas',
    prevencion: 'Mantener respaldos de información, actualizar sistemas de seguridad, no compartir contenido comprometedor',
    acciones: 'No ceder al chantaje, reportar a autoridades, buscar asesoría legal, restaurar desde respaldos',
    ejemplos: 'Ransomware que cifra archivos, amenazas con publicar fotos íntimas, chantaje con información personal',
    imagen: 'https://placehold.co/600x400/dc2626/ffffff?text=Extorsion',
  },
  {
    id: '6',
    titulo: 'Robo de cuentas',
    descripcion: 'Acceso no autorizado a cuentas personales (correo, redes sociales, servicios de streaming) mediante robo de credenciales o explotación de vulnerabilidades.',
    nivelRiesgo: 2,
    senales: 'Actividad no reconocida, cambios de contraseña no autorizados, mensajes enviados sin tu conocimiento',
    prevencion: 'Usar contraseñas únicas y fuertes, habilitar autenticación de dos factores, monitorear actividad de cuenta',
    acciones: 'Cambiar contraseña inmediatamente, revisar dispositivos autorizados, activar verificación en dos pasos',
    ejemplos: 'Hackeo de Gmail, robo de cuenta de Netflix, acceso no autorizado a Facebook',
    imagen: 'https://placehold.co/600x400/84cc16/ffffff?text=Robo+Cuentas',
  },
];

// Mock Users
export const mockUsers: UserInfo[] = [
  { id: '1', nombre: 'Juan', apellido: 'Pérez', correo_electronico: 'juan.perez@example.com' },
  { id: '2', nombre: 'María', apellido: 'González', correo_electronico: 'maria.gonzalez@example.com' },
  { id: '3', nombre: 'Carlos', apellido: 'Rodríguez', correo_electronico: 'carlos.rodriguez@example.com' },
  { id: '4', nombre: 'Ana', apellido: 'Martínez', correo_electronico: 'ana.martinez@example.com' },
  { id: '5', nombre: 'Luis', apellido: 'Fernández', correo_electronico: 'luis.fernandez@example.com' },
];

// Mock Admin (Supervisor)
export const mockAdmin: UserInfo = {
  id: '100',
  nombre: 'Admin',
  apellido: 'Sistema',
  correo_electronico: 'admin@ofraud.com',
};

// Mock Evidence
export const mockEvidence: Evidence[] = [
  { id: 1, url: 'https://placehold.co/800x600/e74c3c/ffffff?text=Evidence+1', id_incidente: 1 },
  { id: 2, url: 'https://placehold.co/800x600/3498db/ffffff?text=Evidence+2', id_incidente: 1 },
  { id: 3, url: 'https://placehold.co/800x600/2ecc71/ffffff?text=Evidence+3', id_incidente: 1 },
  { id: 4, url: 'https://placehold.co/800x600/f39c12/ffffff?text=Evidence+1', id_incidente: 2 },
  { id: 5, url: 'https://placehold.co/800x600/9b59b6/ffffff?text=Evidence+2', id_incidente: 2 },
  { id: 6, url: 'https://placehold.co/800x600/1abc9c/ffffff?text=Evidence+1', id_incidente: 3 },
  { id: 7, url: 'https://placehold.co/800x600/34495e/ffffff?text=Evidence+1', id_incidente: 4 },
  { id: 8, url: 'https://placehold.co/800x600/e67e22/ffffff?text=Evidence+2', id_incidente: 4 },
  { id: 9, url: 'https://placehold.co/800x600/95a5a6/ffffff?text=Evidence+3', id_incidente: 4 },
  { id: 10, url: 'https://placehold.co/800x600/16a085/ffffff?text=Evidence+4', id_incidente: 4 },
];

// Mock Incidents
export const mockIncidents: Incident[] = [
  {
    id: 1,
    titulo: 'Intento de phishing por correo electrónico bancario',
    descripcion: 'Recibí un correo electrónico que parecía ser de mi banco solicitando actualizar mis datos. El enlace llevaba a una página falsa que intentaba robar mis credenciales.',
    id_categoria: '1',
    id_estatus: IncidentStatus.Pendiente,
    nombre_atacante: 'Desconocido',
    telefono: null,
    correo_electronico_atacante: 'fake-support@banco-falso.com',
    usuario_red_social: null,
    red_social: null,
    id_usuario: '1',
    fecha_creacion: '2025-10-01T08:30:00Z',
    fecha_actualizacion: '2025-10-01T08:30:00Z',
    supervisor: null,
    es_anonimo: false,
  },
  {
    id: 2,
    titulo: 'Fraude en compra de artículos por Facebook Marketplace',
    descripcion: 'Compré un iPhone en Facebook Marketplace. Pagué por adelantado pero nunca recibí el producto. El vendedor bloqueó mi cuenta después de recibir el pago.',
    id_categoria: '2',
    id_estatus: IncidentStatus.Aprobado,
    nombre_atacante: 'Pedro Sánchez (posible alias)',
    telefono: '+506 8888-9999',
    correo_electronico_atacante: null,
    usuario_red_social: 'pedro.deals',
    red_social: 'Facebook',
    id_usuario: '2',
    fecha_creacion: '2025-09-28T14:15:00Z',
    fecha_actualizacion: '2025-10-02T10:20:00Z',
    supervisor: '100',
    es_anonimo: false,
  },
  {
    id: 3,
    titulo: 'Suplantación de identidad en Instagram',
    descripcion: 'Alguien creó una cuenta de Instagram con mi nombre y fotos, haciéndose pasar por mí y pidiendo dinero a mis contactos.',
    id_categoria: '3',
    id_estatus: IncidentStatus.Rechazado,
    nombre_atacante: null,
    telefono: null,
    correo_electronico_atacante: null,
    usuario_red_social: 'maria.gonzalez.fake',
    red_social: 'Instagram',
    id_usuario: '2',
    fecha_creacion: '2025-09-25T11:00:00Z',
    fecha_actualizacion: '2025-09-26T09:15:00Z',
    supervisor: '100',
    es_anonimo: false,
  },
  {
    id: 4,
    titulo: 'Amenazas y ciberacoso por WhatsApp',
    descripcion: 'Un número desconocido me ha estado enviando mensajes amenazantes durante varios días. Las amenazas incluyen publicar información personal y fotos privadas.',
    id_categoria: '4',
    id_estatus: IncidentStatus.Pendiente,
    nombre_atacante: null,
    telefono: '+506 7777-6666',
    correo_electronico_atacante: null,
    usuario_red_social: null,
    red_social: 'WhatsApp',
    id_usuario: '3',
    fecha_creacion: '2025-10-10T16:45:00Z',
    fecha_actualizacion: '2025-10-10T16:45:00Z',
    supervisor: null,
    es_anonimo: true,
  },
  {
    id: 5,
    titulo: 'Extorsión mediante ransomware',
    descripcion: 'Mi computadora fue infectada con un ransomware que cifró todos mis archivos. Los atacantes exigen un pago en Bitcoin para recuperar el acceso.',
    id_categoria: '5',
    id_estatus: IncidentStatus.Aprobado,
    nombre_atacante: 'Dark Encrypto Group',
    telefono: null,
    correo_electronico_atacante: 'darkencrypto@protonmail.com',
    usuario_red_social: null,
    red_social: null,
    id_usuario: '4',
    fecha_creacion: '2025-10-05T20:00:00Z',
    fecha_actualizacion: '2025-10-06T12:30:00Z',
    supervisor: '100',
    es_anonimo: false,
  },
  {
    id: 6,
    titulo: 'Robo de cuenta de correo electrónico',
    descripcion: 'Mi cuenta de Gmail fue hackeada. El atacante cambió la contraseña y está enviando correos de spam a mis contactos.',
    id_categoria: '6',
    id_estatus: IncidentStatus.Pendiente,
    nombre_atacante: null,
    telefono: null,
    correo_electronico_atacante: null,
    usuario_red_social: null,
    red_social: null,
    id_usuario: '5',
    fecha_creacion: '2025-10-08T09:20:00Z',
    fecha_actualizacion: '2025-10-08T09:20:00Z',
    supervisor: null,
    es_anonimo: false,
  },
  {
    id: 7,
    titulo: 'Estafa de inversión en criptomonedas por Telegram',
    descripcion: 'Me agregaron a un grupo de Telegram prometiendo ganancias increíbles invirtiendo en criptomonedas. Invertí $500 y la cuenta desapareció.',
    id_categoria: '2',
    id_estatus: IncidentStatus.Aprobado,
    nombre_atacante: 'Crypto Expert Team',
    telefono: null,
    correo_electronico_atacante: null,
    usuario_red_social: '@cryptoexpert_team',
    red_social: 'Telegram',
    id_usuario: '1',
    fecha_creacion: '2025-10-03T13:10:00Z',
    fecha_actualizacion: '2025-10-04T15:45:00Z',
    supervisor: '100',
    es_anonimo: false,
  },
  {
    id: 8,
    titulo: 'Phishing mediante SMS del banco',
    descripcion: 'Recibí un SMS que parecía ser de mi banco indicando que mi cuenta sería bloqueada. El enlace llevaba a una página falsa.',
    id_categoria: '1',
    id_estatus: IncidentStatus.Pendiente,
    nombre_atacante: null,
    telefono: '+506 6000-5555',
    correo_electronico_atacante: null,
    usuario_red_social: null,
    red_social: null,
    id_usuario: '3',
    fecha_creacion: '2025-10-11T07:30:00Z',
    fecha_actualizacion: '2025-10-11T07:30:00Z',
    supervisor: null,
    es_anonimo: false,
  },
  {
    id: 9,
    titulo: 'Suplantación de soporte técnico de Microsoft',
    descripcion: 'Recibí una llamada de alguien diciendo ser de Microsoft y que mi computadora tenía virus. Solicitaron acceso remoto y pago por el servicio.',
    id_categoria: '2',
    id_estatus: IncidentStatus.Rechazado,
    nombre_atacante: 'John Smith (probable alias)',
    telefono: '+1-800-555-0199',
    correo_electronico_atacante: 'support@microsoftt.com',
    usuario_red_social: null,
    red_social: null,
    id_usuario: '4',
    fecha_creacion: '2025-09-30T10:00:00Z',
    fecha_actualizacion: '2025-10-01T11:30:00Z',
    supervisor: '100',
    es_anonimo: false,
  },
  {
    id: 10,
    titulo: 'Robo de cuenta de Netflix',
    descripcion: 'Mi cuenta de Netflix fue hackeada. Cambiaron el correo y la contraseña. Vi que se estaba usando desde otro país.',
    id_categoria: '6',
    id_estatus: IncidentStatus.Pendiente,
    nombre_atacante: null,
    telefono: null,
    correo_electronico_atacante: null,
    usuario_red_social: null,
    red_social: null,
    id_usuario: '5',
    fecha_creacion: '2025-10-09T18:00:00Z',
    fecha_actualizacion: '2025-10-09T18:00:00Z',
    supervisor: null,
    es_anonimo: true,
  },
];

// Mock Incident Details (for detail page)
export const mockIncidentDetails: IncidentDetail[] = mockIncidents.map((incident) => {
  const usuario = mockUsers.find((u) => u.id === incident.id_usuario) || mockUsers[0];
  const categoria = mockCategories.find((c) => c.id === incident.id_categoria) || mockCategories[0];
  const supervisor = incident.supervisor ? mockAdmin : null;
  const evidencia = mockEvidence.filter((e) => e.id_incidente === incident.id);

  return {
    ...incident,
    categoria,
    usuario,
    supervisor,
    evidencia,
  };
});

// Helper function to get incident detail by ID
export function getMockIncidentById(id: string | number): IncidentDetail | undefined {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return mockIncidentDetails.find((incident) => incident.id === numId);
}
