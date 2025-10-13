"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { getCategoryById, updateCategory } from "@/lib/api/categories";
import type { CategoryFormData } from "@/lib/validations/category.schema";
import type { Category } from "@/lib/types/category.types";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(id);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Categoría no encontrada");
        router.push("/categories");
      } finally {
        setIsFetching(false);
      }
    };

    fetchCategory();
  }, [id, router]);

  const handleSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      await updateCategory(id, data);
      toast.success("Categoría actualizada exitosamente");
      router.push(`/categories/${id}`);
    } catch (error) {
      console.error("Error updating category:", error);
      const errorMessage = error instanceof Error ? error.message : "Error al actualizar la categoría";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/categories/${id}`);
  };

  if (isFetching) {
    return (
      <div className="container mx-auto py-8">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Editar Categoría"
        description="Actualice la información de la categoría"
      />
      <div className="mt-8 max-w-3xl">
        <CategoryForm
          initialData={category}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
