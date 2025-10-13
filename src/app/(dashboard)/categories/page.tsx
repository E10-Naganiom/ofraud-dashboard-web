'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/categories/CategoryCard';
import { getCategories } from '@/lib/api/categories';
import type { Category } from '@/lib/types/category.types';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error al cargar categorías');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleCreateCategory = () => {
    router.push('/categories/new');
  };

  const handleDeleteCategory = (id: string) => {
    // TODO: Implement delete functionality in Story 4.5
    console.log('Delete category:', id);
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
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando categorías...</p>
          </div>
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
            <Button onClick={() => window.location.reload()}>
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
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>
    </div>
  );
}
