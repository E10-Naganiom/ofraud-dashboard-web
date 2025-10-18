'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Phone, Mail, Share2 } from 'lucide-react';

interface ContactMethodData {
  metodo: string;
  total: number;
  porcentaje: number;
}

interface IncidentsByContactMethodChartProps {
  data?: ContactMethodData[];
  loading?: boolean;
}

const getIcon = (method: string) => {
  const methodLower = method.toLowerCase();
  if (methodLower.includes('telefono') || methodLower.includes('phone')) {
    return <Phone className="w-5 h-5" />;
  }
  if (methodLower.includes('email') || methodLower.includes('correo')) {
    return <Mail className="w-5 h-5" />;
  }
  if (methodLower.includes('red') || methodLower.includes('social')) {
    return <Share2 className="w-5 h-5" />;
  }
  return <Share2 className="w-5 h-5" />;
};

const getColor = (method: string) => {
  const methodLower = method.toLowerCase();
  if (methodLower.includes('telefono') || methodLower.includes('phone')) {
    return 'bg-green-500';
  }
  if (methodLower.includes('email') || methodLower.includes('correo')) {
    return 'bg-blue-500';
  }
  if (methodLower.includes('red') || methodLower.includes('social')) {
    return 'bg-purple-500';
  }
  return 'bg-gray-500';
};

const getLabel = (method: string): string => {
  const methodLower = method.toLowerCase();
  if (methodLower.includes('telefono') || methodLower.includes('phone')) {
    return 'Teléfono';
  }
  if (methodLower.includes('email') || methodLower.includes('correo')) {
    return 'Email';
  }
  if (methodLower.includes('red') || methodLower.includes('social')) {
    return 'Redes Sociales';
  }
  // Return original if no match
  return method.charAt(0).toUpperCase() + method.slice(1);
};

export default function IncidentsByContactMethodChart({ 
  data, 
  loading = false 
}: IncidentsByContactMethodChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-56" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Incidentes por Método de Contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incidentes por Método de Contacto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((method) => (
          <div key={method.metodo} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {getIcon(method.metodo)}
                <span className="font-medium text-sm text-gray-700">
                  {getLabel(method.metodo)}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {method.total} ({method.porcentaje.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${getColor(method.metodo)} h-3 rounded-full transition-all`}
                style={{ width: `${method.porcentaje}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}