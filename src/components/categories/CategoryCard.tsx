'use client';

import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Category } from '@/lib/types/category.types';
import { RISK_LEVEL_LABELS } from '@/lib/types/category.types';
import { cn } from '@/lib/utils/cn';

interface CategoryCardProps {
  category: Category;
  onDelete?: (id: string) => void;
}

/**
 * Get risk level badge color based on risk level
 */
function getRiskLevelColor(nivelRiesgo: 1 | 2 | 3 | 4): string {
  const colors = {
    1: 'bg-green-500 text-white hover:bg-green-600',
    2: 'bg-yellow-500 text-white hover:bg-yellow-600',
    3: 'bg-orange-500 text-white hover:bg-orange-600',
    4: 'bg-red-500 text-white hover:bg-red-600',
  };
  return colors[nivelRiesgo];
}

/**
 * Truncate text to max length with ellipsis
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export default function CategoryCard({ category, onDelete }: CategoryCardProps) {
  const router = useRouter();

  const handleViewDetail = () => {
    router.push(`/categories/${category.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/categories/${category.id}/edit`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(category.id);
  };

  return (
    <Card className="transition-all hover:shadow-lg hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl line-clamp-2">{category.titulo}</CardTitle>
          <Badge className={cn(getRiskLevelColor(category.nivelRiesgo), 'shrink-0')}>
            {RISK_LEVEL_LABELS[category.nivelRiesgo]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {truncateText(category.descripcion, 150)}
        </p>
        
        {/* Additional info */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {category.senales && (
            <span className="inline-flex items-center gap-1">
              ✓ Señales
            </span>
          )}
          {category.acciones && (
            <span className="inline-flex items-center gap-1">
              ✓ Acciones
            </span>
          )}
          {category.ejemplos && (
            <span className="inline-flex items-center gap-1">
              ✓ Ejemplos
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewDetail}
          className="flex-1"
          aria-label={`Ver detalle de ${category.titulo}`}
        >
          <Eye className="mr-2 h-4 w-4" />
          Ver detalle
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          aria-label={`Editar ${category.titulo}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="text-destructive hover:text-destructive"
          aria-label={`Eliminar ${category.titulo}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}