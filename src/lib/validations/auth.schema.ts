import { z } from 'zod';

export const registerSchema = z
  .object({
    nombre: z
      .string()
      .min(1, 'Campo de Nombre obligatorio')
      .max(50, 'Nombre debe tener máximo 50 caracteres'),
    correo: z
      .string()
      .min(1, 'Campo de Correo obligatorio')
      .email('Correo electrónico inválido')
      .max(50, 'Correo debe tener máximo 50 caracteres'),
    contrasena: z
      .string()
      .min(8, 'Ingresar una contraseña válida con el formato especificado')
      .max(20, 'Contraseña debe tener máximo 20 caracteres')
      .regex(
        /^[a-zA-Z0-9]+$/,
        'Ingresar una contraseña válida con el formato especificado',
      ),
    confirmacionContrasena: z.string().min(1, 'Campo de Confirmación obligatorio'),
  })
  .refine((data) => data.contrasena === data.confirmacionContrasena, {
    message: 'La confirmación de contraseña no coincide',
    path: ['confirmacionContrasena'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  correo: z
    .string()
    .min(1, 'Campo de Correo obligatorio')
    .email('Correo electrónico inválido'),
  contrasena: z.string().min(8, 'Campo de Contraseña obligatorio'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
