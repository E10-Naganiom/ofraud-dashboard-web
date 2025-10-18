"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryFormData } from "@/lib/validations/category.schema";
import type { Category } from "@/lib/types/category.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function CategoryForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: CategoryFormProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      titulo: initialData?.titulo || "",
      descripcion: initialData?.descripcion || "",
      nivelRiesgo: initialData?.nivelRiesgo?.toString() as "1" | "2" | "3" | "4" || undefined,
      senales: initialData?.senales || "",
      prevencion: initialData?.prevencion || "",
      acciones: initialData?.acciones || "",
      ejemplos: initialData?.ejemplos || "",
      imagen: initialData?.imagen || "",
    },
  });

  const isFormChanged = form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título *</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Phishing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe brevemente esta categoría de ciberdelito..."
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nivelRiesgo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel de Riesgo *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el nivel de riesgo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                      Muy Bajo
                    </span>
                  </SelectItem>
                  <SelectItem value="2">
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                      Bajo
                    </span>
                  </SelectItem>
                  <SelectItem value="3">
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
                      Medio
                    </span>
                  </SelectItem>
                  <SelectItem value="4">
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                      Alto
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="senales"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Señales e Indicadores</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Señales de alerta para identificar este tipo de incidente (opcional)..."
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                Señales que ayuden a identificar este tipo de ciberdelito
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prevencion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prevención *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Medidas preventivas para evitar este tipo de incidente..."
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                Consejos para prevenir este tipo de ciberdelito
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acciones Recomendadas</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Acciones a tomar si se identifica este incidente (opcional)..."
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                Qué hacer si se detecta este tipo de ciberdelito
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ejemplos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ejemplos</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ejemplos concretos de este tipo de incidente (opcional)..."
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                Casos reales o ejemplos ilustrativos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={
              isLoading ||
              !form.formState.isValid ||
              (initialData && !isFormChanged)
            }
            className="flex-1"
          >
            {isLoading ? "Guardando..." : initialData ? "Actualizar Categoría" : "Crear Categoría"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>

        {initialData && !isFormChanged && (
          <p className="text-sm text-muted-foreground text-center">
            Realiza cambios en el formulario para poder guardar
          </p>
        )}
      </form>
    </Form>
  );
}