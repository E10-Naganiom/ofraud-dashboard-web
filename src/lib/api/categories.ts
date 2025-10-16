import { api } from "./client";
import type { Category } from "@/lib/types/category.types";
import type { CategoryFormData } from "@/lib/validations/category.schema";

/**
 * Fetches all categories from the API.
 * @returns A promise that resolves to an array of categories.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await api.get<Category[]>("/categories");
    
    // Handle different response structures
    const data = Array.isArray(response.data) 
      ? response.data 
      : (response.data as any).data || [];
    
    // Map backend fields to frontend structure
    return data.map(category => ({
      id: String(category.id),
      titulo: category.titulo,
      descripcion: category.descripcion,
      nivelRiesgo: (category.nivelRiesgo || category.id_riesgo) as 1 | 2 | 3 | 4,
      senales: category.senales || undefined,
      prevencion: category.prevencion,
      acciones: category.acciones || undefined,
      ejemplos: category.ejemplos || undefined,
      imagen: category.imagen || undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Could not fetch categories.");
  }
}

/**
 * Fetches a single category by ID from the API.
 * @param id - The category ID
 * @returns A promise that resolves to a category object.
 */
export async function getCategoryById(id: string): Promise<Category> {
  try {
    const response = await api.get<any>(`/categories/${id}`);
    
    // Handle different response structures
    const categoryData = response.data.data || response.data;
    
    return {
      id: String(categoryData.id),
      titulo: categoryData.titulo,
      descripcion: categoryData.descripcion,
      nivelRiesgo: (categoryData.nivelRiesgo || categoryData.id_riesgo) as 1 | 2 | 3 | 4,
      senales: categoryData.senales || undefined,
      prevencion: categoryData.prevencion,
      acciones: categoryData.acciones || undefined,
      ejemplos: categoryData.ejemplos || undefined,
      imagen: categoryData.imagen || undefined,
    };
  } catch (error) {
    console.error(`Failed to fetch category ${id}:`, error);
    throw error;
  }
}

/**
 * Creates a new category.
 * @param data - The category data to create
 * @returns A promise that resolves to the created category.
 */
export async function createCategory(data: CategoryFormData): Promise<Category> {
  try {
    // Map frontend fields to backend expected structure
    const payload = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      id_riesgo: parseInt(data.nivelRiesgo),
      senales: data.senales || undefined,
      prevencion: data.prevencion,
      acciones: data.acciones || undefined,
      ejemplos: data.ejemplos || undefined,
      imagen: data.imagen || undefined,
    };

    const response = await api.post<any>("/admin/categories", payload);
    
    const categoryData = response.data.data || response.data;
    
    return {
      id: String(categoryData.id),
      titulo: categoryData.titulo,
      descripcion: categoryData.descripcion,
      nivelRiesgo: (categoryData.nivelRiesgo || categoryData.id_riesgo) as 1 | 2 | 3 | 4,
      senales: categoryData.senales || undefined,
      prevencion: categoryData.prevencion,
      acciones: categoryData.acciones || undefined,
      ejemplos: categoryData.ejemplos || undefined,
      imagen: categoryData.imagen || undefined,
    };
  } catch (error: any) {
    console.error("Failed to create category:", error);
    
    if (error.response?.status === 409) {
      throw new Error("La categoría ya está registrada");
    }
    
    throw error;
  }
}

/**
 * Updates an existing category.
 * @param id - The category ID
 * @param data - The updated category data
 * @returns A promise that resolves to the updated category.
 */
export async function updateCategory(id: string, data: CategoryFormData): Promise<Category> {
  try {
    // Map frontend fields to backend expected structure
    const payload = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      id_riesgo: parseInt(data.nivelRiesgo),
      senales: data.senales || undefined,
      prevencion: data.prevencion,
      acciones: data.acciones || undefined,
      ejemplos: data.ejemplos || undefined,
      imagen: data.imagen || undefined,
    };

    const response = await api.put<any>(`/admin/categories/${id}`, payload);
    
    // After update, fetch the updated category
    return getCategoryById(id);
  } catch (error: any) {
    console.error(`Failed to update category ${id}:`, error);
    
    if (error.response?.status === 404) {
      throw new Error("Categoría no encontrada");
    }
    if (error.response?.status === 409) {
      throw new Error("El título de categoría ya está registrado");
    }
    
    throw error;
  }
}

/**
 * Deletes a category by ID.
 * @param id - The category ID
 */
export async function deleteCategory(id: string): Promise<void> {
  try {
    await api.delete(`/admin/categories/${id}`);
  } catch (error: any) {
    console.error(`Failed to delete category ${id}:`, error);
    
    if (error.response?.status === 404) {
      throw new Error("Categoría no encontrada");
    }
    if (error.response?.status === 400) {
      throw new Error("No se puede eliminar la categoría (tiene incidentes asociados)");
    }
    
    throw error;
  }
}