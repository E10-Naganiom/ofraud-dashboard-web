export interface Category {
  id: string;
  titulo: string;
  descripcion: string;
  nivelRiesgo: 1 | 2 | 3 | 4; // 1=Muy Bajo, 2=Bajo, 3=Medio, 4=Alto
  senales?: string;
  prevencion: string;
  acciones?: string;
  ejemplos?: string;
  imagen?: string; // URL to image
}

export const RISK_LEVELS = {
  MUY_BAJO: 1,
  BAJO: 2,
  MEDIO: 3,
  ALTO: 4,
} as const;

export const RISK_LEVEL_LABELS = {
  1: 'Muy Bajo',
  2: 'Bajo',
  3: 'Medio',
  4: 'Alto',
} as const;