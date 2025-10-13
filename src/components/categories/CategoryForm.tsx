"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
} from "@/components/ui/form";
import { api } from "@/lib/api/client";
import { toast } from "sonner";

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
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    initialData?.imagen
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Formato de archivo no válido. Use JPG, PNG o WEBP.");
      return;
    }

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post<{ url: string }>("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.url;
      form.setValue("imagen", imageUrl, { shouldValidate: true });
      setImagePreview(imageUrl);
      toast.success("Imagen cargada exitosamente");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al cargar la imagen");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("imagen", "", { shouldValidate: true });
    setImagePreview(undefined);
  };

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
                <Input placeholder="Ingrese el título" {...field} />
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
                  placeholder="Ingrese la descripción"
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
                  <SelectItem value="1">Muy Bajo</SelectItem>
                  <SelectItem value="2">Bajo</SelectItem>
                  <SelectItem value="3">Medio</SelectItem>
                  <SelectItem value="4">Alto</SelectItem>
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
              <FormLabel>Señales</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingrese las señales (opcional)"
                  {...field}
                  rows={3}
                />
              </FormControl>
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
                  placeholder="Ingrese medidas de prevención"
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acciones</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingrese las acciones (opcional)"
                  {...field}
                  rows={3}
                />
              </FormControl>
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
                  placeholder="Ingrese ejemplos (opcional)"
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Imagen</FormLabel>
          <div className="flex flex-col gap-4">
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-md"
                />
                {initialData && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="mt-2"
                  >
                    Eliminar imagen
                  </Button>
                )}
              </div>
            )}
            <Input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={isUploadingImage || isLoading}
            />
            {isUploadingImage && (
              <p className="text-sm text-muted-foreground">Cargando imagen...</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={
              isLoading ||
              isUploadingImage ||
              !form.formState.isValid ||
              (initialData && !form.formState.isDirty)
            }
          >
            {isLoading ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
