// /src/components/incidents/IncidentFilters.tsx
'use client';

import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories } from '@/hooks/useCategories';
import type { Category } from '@/lib/types/category.types';

interface IncidentFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function IncidentFilters({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onCategoryChange,
}: IncidentFiltersProps) {
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Search bar */}
      <div className="relative max-w-md flex-grow">
        <Input
          type="text"
          placeholder="Buscar por ID, título, descripción..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="pr-10"
          aria-label="Buscar incidentes"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchTermChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="w-[200px]">
        <Select
          value={selectedCategory}
          onValueChange={onCategoryChange}
          disabled={loadingCategories || !!errorCategories}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category: Category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.titulo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorCategories && <p className="text-xs text-red-500 mt-1">{errorCategories.message}</p>}
      </div>
    </div>
  );
}
