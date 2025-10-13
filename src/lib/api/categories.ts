import { api } from "./client";
import type { Category } from "@/lib/types/category.types";
import type { CategoryFormData } from "@/lib/validations/category.schema";
import { mockCategories } from "@/lib/mock/data";

// Enable mock mode (set to false to use real backend)
const USE_MOCK_DATA = true;

/**
 * Fetches all categories from the API.
 * @returns A promise that resolves to an array of categories.
 */
export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCategories;
  }

  try {
    const response = await api.get<{ data: Category[] }>("/categories");
    return response.data.data;
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
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    const category = mockCategories.find((c) => c.id === id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  try {
    const response = await api.get<{ data: Category }>(`/categories/${id}`);
    return response.data.data;
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
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check for duplicate title
    if (mockCategories.some((c) => c.titulo.toLowerCase() === data.titulo.toLowerCase())) {
      throw new Error("La categoría ya está registrada");
    }

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      titulo: data.titulo,
      descripcion: data.descripcion,
      nivelRiesgo: parseInt(data.nivelRiesgo) as 1 | 2 | 3 | 4,
      senales: data.senales || undefined,
      prevencion: data.prevencion,
      acciones: data.acciones || undefined,
      ejemplos: data.ejemplos || undefined,
      imagen: data.imagen || undefined,
    };

    mockCategories.push(newCategory);
    return newCategory;
  }

  try {
    const response = await api.post<{ data: Category }>("/categories", data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to create category:", error);
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 409) {
        throw new Error("La categoría ya está registrada");
      }
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
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = mockCategories.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Categoría no encontrada");
    }

    // Check for duplicate title (excluding current category)
    if (
      mockCategories.some(
        (c) => c.id !== id && c.titulo.toLowerCase() === data.titulo.toLowerCase()
      )
    ) {
      throw new Error("El título de categoría ya está registrado");
    }

    const updatedCategory: Category = {
      id,
      titulo: data.titulo,
      descripcion: data.descripcion,
      nivelRiesgo: parseInt(data.nivelRiesgo) as 1 | 2 | 3 | 4,
      senales: data.senales || undefined,
      prevencion: data.prevencion,
      acciones: data.acciones || undefined,
      ejemplos: data.ejemplos || undefined,
      imagen: data.imagen || undefined,
    };

    mockCategories[index] = updatedCategory;
    return updatedCategory;
  }

  try {
    const response = await api.put<{ data: Category }>(`/categories/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to update category ${id}:`, error);
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 404) {
        throw new Error("Categoría no encontrada");
      }
      if (axiosError.response?.status === 409) {
        throw new Error("El título de categoría ya está registrado");
      }
    }
    throw error;
  }
}

/**
 * Deletes a category by ID.
 * @param id - The category ID
 */
export async function deleteCategory(id: string): Promise<void> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = mockCategories.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Categoría no encontrada");
    }

    // Remove from mock array
    mockCategories.splice(index, 1);
    return;
  }

  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    console.error(`Failed to delete category ${id}:`, error);
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 404) {
        throw new Error("Categoría no encontrada");
      }
      if (axiosError.response?.status === 400) {
        throw new Error("No se puede eliminar la categoría (tiene incidentes asociados)");
      }
    }
    throw error;
  }
}