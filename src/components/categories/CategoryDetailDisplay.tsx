import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/lib/types/category.types';
import { RISK_LEVEL_LABELS } from '@/lib/types/category.types';
import { cn } from '@/lib/utils/cn';

interface CategoryDetailDisplayProps {
  category: Category;
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

export default function CategoryDetailDisplay({ category }: CategoryDetailDisplayProps) {
  return (
    <div className="space-y-6">
      {/* General Information Section */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl">Información General</CardTitle>
            <Badge className={cn(getRiskLevelColor(category.nivelRiesgo))}>
              Nivel de Riesgo: {RISK_LEVEL_LABELS[category.nivelRiesgo]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{category.titulo}</h3>
            <p className="text-muted-foreground">{category.descripcion}</p>
          </div>

          
        </CardContent>
      </Card>

      {/* Indicators Section */}
      {category.senales && (
        <Card>
          <CardHeader>
            <CardTitle>Señales e Indicadores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">{category.senales}</p>
          </CardContent>
        </Card>
      )}

      {/* Prevention and Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Prevención y Acciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Prevención</h4>
            <p className="text-muted-foreground whitespace-pre-line">{category.prevencion}</p>
          </div>

          {category.acciones && (
            <div>
              <h4 className="font-semibold mb-2">Acciones Recomendadas</h4>
              <p className="text-muted-foreground whitespace-pre-line">{category.acciones}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Examples Section */}
      {category.ejemplos && (
        <Card>
          <CardHeader>
            <CardTitle>Ejemplos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">{category.ejemplos}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
