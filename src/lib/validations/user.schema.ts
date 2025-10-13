"use client";

import { z } from "zod";

export const userFormSchema = z
  .object({
    nombre: z
      .string()
      .min(1, { message: "El nombre es requerido." })
      .max(50, { message: "El nombre no puede exceder los 50 caracteres." }),
    apellido: z
      .string()
      .min(1, { message: "El apellido es requerido." })
      .max(50, { message: "El apellido no puede exceder los 50 caracteres." }),
    email: z
      .string()
      .email({ message: "Por favor ingrese un correo electrónico válido." })
      .max(190, {
        message: "El correo no puede exceder los 190 caracteres.",
      }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
      .max(20, {
        message: "La contraseña no puede exceder los 20 caracteres.",
      })
      .regex(
        /^[a-zA-Z0-9]+$/,
        "La contraseña solo puede contener caracteres alfanuméricos."
      ),
    confirmPassword: z.string(),
    is_admin: z.boolean().default(false),
    is_active: z.boolean().default(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof userFormSchema>;

export const editUserSchema = userFormSchema.omit({
  password: true,
  confirmPassword: true,
});

export type EditUserFormData = z.infer<typeof editUserSchema>;
