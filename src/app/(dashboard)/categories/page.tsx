'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import CategoryCard from '@/components/categories/CategoryCard';
import { getCategories, deleteCategory } from '@/lib/api/categories';
import type { Category } from '@/lib/types/category.types';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getCategories();

      // Sort by risk level (highest first) then alphabetically
      const sorted = [...data].sort((a, b) => {
        if (a.nivelRiesgo !== b.nivelRiesgo) {
          return b.nivelRiesgo - a.nivelRiesgo;
        }
        return a.titulo.localeCompare(b.titulo);
      });

      setCategories(sorted);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      const errorMessage = err.message || 'Error al cargar categorías';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCreateCategory = () => {
    router.push('/categories/new');
  };

  const handleDeleteClick = (id: string) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setCategoryToDelete(category);
    }
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    try {
      await deleteCategory(categoryToDelete.id);
      toast.success(`Categoría "${categoryToDelete.titulo}" eliminada exitosamente`);
      
      // Remove from local state
      setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id));
      
      setCategoryToDelete(null);
    } catch (error: any) {
      console.error('Error deleting category:', error);
      const errorMessage = error.message || 'Error al eliminar la categoría';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setCategoryToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Gestión de Categorías">
          <Button onClick={handleCreateCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Categoría
          </Button>
        </PageHeader>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Gestión de Categorías">
          <Button onClick={handleCreateCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Categoría
          </Button>
        </PageHeader>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchCategories}>
              Intentar nuevamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title="Gestión de Categorías">
          <Button onClick={handleCreateCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Categoría
          </Button>
        </PageHeader>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No hay categorías registradas</p>
            <Button onClick={handleCreateCategory}>
              <Plus className="mr-2 h-4 w-4" />
              Crear primera categoría
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Gestión de Categorías">
        <Button onClick={handleCreateCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Crear Categoría
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!categoryToDelete} onOpenChange={(open) => !open && cancelDelete()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea eliminar la categoría <strong>&quot;{categoryToDelete?.titulo}&quot;</strong>? 
              Esta acción no se puede deshacer.
              <span className="block mt-2 text-sm text-yellow-600">
                Nota: No se puede eliminar una categoría que tenga incidentes asociados.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}