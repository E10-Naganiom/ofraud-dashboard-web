'use client';

import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
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

  const handleCardClick = () => {
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
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{category.titulo}</CardTitle>
          <Badge className={cn(getRiskLevelColor(category.nivelRiesgo))}>
            {RISK_LEVEL_LABELS[category.nivelRiesgo]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {truncateText(category.descripcion, 100)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
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
          aria-label={`Eliminar ${category.titulo}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
