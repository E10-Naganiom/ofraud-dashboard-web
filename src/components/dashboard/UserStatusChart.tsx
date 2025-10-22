'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserStatistics } from '@/hooks/useIncidentStatistics';

interface UserStatusChartProps {
  data?: UserStatistics;
  loading?: boolean;
}

export default function UserStatusChart({ data, loading = false }: UserStatusChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Usuarios y Administradores</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
        </CardContent>
      </Card>
    );
  }

  const totalUsers = data.usuarios_activos + data.usuarios_inactivos;
  const totalAdmins = data.admins_activos + data.admins_inactivos;

  const usersActivePercent = totalUsers > 0 
    ? ((data.usuarios_activos / totalUsers) * 100).toFixed(1) 
    : '0';
  const usersInactivePercent = totalUsers > 0 
    ? ((data.usuarios_inactivos / totalUsers) * 100).toFixed(1) 
    : '0';
  
  const adminsActivePercent = totalAdmins > 0 
    ? ((data.admins_activos / totalAdmins) * 100).toFixed(1) 
    : '0';
  const adminsInactivePercent = totalAdmins > 0 
    ? ((data.admins_inactivos / totalAdmins) * 100).toFixed(1) 
    : '0';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios y Administradores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Users Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700">Usuarios Regulares</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Activos</span>
              <span className="font-medium">{data.usuarios_activos} ({usersActivePercent}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${usersActivePercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Inactivos</span>
              <span className="font-medium">{data.usuarios_inactivos} ({usersInactivePercent}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gray-500 h-3 rounded-full transition-all"
                style={{ width: `${usersInactivePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Admins Section */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-semibold text-sm text-gray-700">Administradores</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Activos</span>
              <span className="font-medium">{data.admins_activos} ({adminsActivePercent}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${adminsActivePercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Inactivos</span>
              <span className="font-medium">{data.admins_inactivos} ({adminsInactivePercent}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gray-500 h-3 rounded-full transition-all"
                style={{ width: `${adminsInactivePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t flex justify-between items-center font-semibold">
          <span>Total de Usuarios</span>
          <span className="text-lg">{data.total_usuarios}</span>
        </div>
      </CardContent>
    </Card>
  );
}