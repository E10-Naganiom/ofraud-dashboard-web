"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { createCategory } from "@/lib/api/categories";
import type { CategoryFormData } from "@/lib/validations/category.schema";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";

export default function NewCategoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      const newCategory = await createCategory(data);
      toast.success("¡Categoría registrada exitosamente!");
      router.push(`/categories/${newCategory.id}`);
    } catch (error) {
      console.error("Error creating category:", error);
      const errorMessage = error instanceof Error ? error.message : "Error al crear la categoría";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/categories");
  };

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Crear Categoría"
        description="Registre una nueva categoría de ciberdelito"
      />
      <div className="mt-8 max-w-3xl">
        <CategoryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
