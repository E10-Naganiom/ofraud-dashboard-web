"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  userFormSchema,
  editUserSchema,
  type UserFormData,
  type EditUserFormData,
} from "@/lib/validations/user.schema";
import type { User } from "@/lib/types/user.types";

interface UserFormProps {
  onSubmit: (data: UserFormData | EditUserFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Partial<User>;
  mode: "create" | "edit";
  hideAdminFields?: boolean; // ← NUEVO: Ocultar campos de admin
}

export default function UserForm({
  onSubmit,
  onCancel,
  isLoading,
  initialData,
  mode,
  hideAdminFields = false, // ← NUEVO: Por defecto false
}: UserFormProps) {
  const isEditMode = mode === "edit";
  const schema = isEditMode ? editUserSchema : userFormSchema;

  const form = useForm<UserFormData | EditUserFormData>({
    resolver: zodResolver(schema),
    defaultValues: isEditMode
      ? {
          nombre: initialData?.nombre || "",
          apellido: initialData?.apellido || "",
          email: initialData?.email || "",
          is_admin: initialData?.is_admin || false,
          is_active: initialData?.is_active ?? true,
        }
      : {
          nombre: "",
          apellido: "",
          email: "",
          password: "",
          confirmPassword: "",
          is_admin: false,
          is_active: true,
        },
  });

  const isFormChanged = form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre *</FormLabel>
              <FormControl>
                <Input placeholder="Juan" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Apellido */}
        <FormField
          control={form.control}
          name="apellido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido *</FormLabel>
              <FormControl>
                <Input placeholder="Pérez" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="juan.perez@example.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password fields - Only in create mode */}
        {!isEditMode && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Mínimo 8 caracteres, solo alfanuméricos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Admin fields - Only show if hideAdminFields is false */}
        {!hideAdminFields && (
          <>
            <FormField
              control={form.control}
              name="is_admin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Administrador</FormLabel>
                    <FormDescription>
                      Este usuario tendrá permisos de administrador
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Cuenta Activa</FormLabel>
                    <FormDescription>
                      Los usuarios inactivos no pueden iniciar sesión
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={
              isLoading ||
              !form.formState.isValid ||
              (isEditMode && !isFormChanged)
            }
            className="flex-1"
          >
            {isLoading
              ? "Guardando..."
              : isEditMode
              ? "Actualizar Usuario"
              : "Crear Usuario"}
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

        {isEditMode && !isFormChanged && (
          <p className="text-sm text-muted-foreground text-center">
            Realiza cambios en el formulario para poder guardar
          </p>
        )}
      </form>
    </Form>
  );
}