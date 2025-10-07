/**
 * User-facing error messages in Spanish
 * Centralized location for all Spanish error messages
 */

export const ERROR_MESSAGES = {
  // Server errors
  INTERNAL_SERVER_ERROR:
    'Error interno del servidor. Por favor, intente nuevamente.',
  NETWORK_ERROR: 'Verifique su conexión a Internet',

  // Auth errors
  UNAUTHORIZED: 'No autorizado. Por favor, inicie sesión nuevamente.',
  FORBIDDEN: 'No tiene permisos para realizar esta acción.',

  // Validation errors
  INVALID_EMAIL: 'El correo electrónico no es válido.',
  INVALID_PASSWORD: 'La contraseña debe tener al menos 8 caracteres.',

  // Generic errors
  SOMETHING_WENT_WRONG: 'Algo salió mal. Por favor, intente nuevamente.',
  NOT_FOUND: 'Recurso no encontrado.',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  REGISTER_SUCCESS: 'Registro exitoso',
  LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
} as const;
