import { z } from "zod";

export const categorySchema = z.object({
  titulo: z
    .string()
    .min(1, "El título es requerido")
    .max(255, "Máximo 255 caracteres"),
  descripcion: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "Máximo 500 caracteres"),
  nivelRiesgo: z.enum(["1", "2", "3", "4"], {
    message: "El nivel de riesgo es requerido",
  }),
  senales: z.string().max(500, "Máximo 500 caracteres").optional(),
  prevencion: z
    .string()
    .min(1, "La prevención es requerida")
    .max(500, "Máximo 500 caracteres"),
  acciones: z.string().max(500, "Máximo 500 caracteres").optional(),
  ejemplos: z.string().max(500, "Máximo 500 caracteres").optional(),
  imagen: z.string().url().optional().or(z.literal("")),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
