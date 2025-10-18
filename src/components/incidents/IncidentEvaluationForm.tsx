import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { evaluateIncident } from '@/lib/api/incidents';
import { getAdminUsers } from '@/lib/api/users';
import type { IncidentDetail } from '@/lib/types/incident.types';
import type { AdminUser } from '@/lib/types/user.types';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import SupervisorDropdown from './SupervisorDropdown';
import { Label } from '@/components/ui/label';

interface IncidentEvaluationFormProps {
  incident: IncidentDetail;
  onUpdate: (updatedIncident: Partial<IncidentDetail>) => void;
}

export default function IncidentEvaluationForm({ incident, onUpdate }: IncidentEvaluationFormProps) {
  const { user } = useAuth();

  const [selectedStatus, setSelectedStatus] = useState<number>(incident.id_estatus);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<string | null>(
    incident.supervisor?.id || null
  );
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch admin users for supervisor dropdown
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setIsUsersLoading(true);
        const users = await getAdminUsers();
        setAdminUsers(users);
      } catch (error: any) {
        console.error('Error loading admin users:', error);
        toast.error('Error al cargar supervisores.');
      } finally {
        setIsUsersLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Update local state when incident prop changes
  useEffect(() => {
    setSelectedStatus(incident.id_estatus);
    setSelectedSupervisorId(incident.supervisor?.id || null);
  }, [incident]);

  const isAdmin = user?.is_admin ?? false;
  const isStatusChanged = selectedStatus !== incident.id_estatus;
  const isSupervisorChanged = selectedSupervisorId !== (incident.supervisor?.id || null);
  const isChanged = isStatusChanged || isSupervisorChanged;

  const handleSubmit = async () => {
    if (!isChanged || !isAdmin) return;

    setIsSubmitting(true);
    try {
      // Call API to evaluate incident and get updated incident back
      const updatedIncident = await evaluateIncident(
        String(incident.id), 
        selectedStatus, 
        selectedSupervisorId
      );
      
      // Update parent component with the full updated incident
      onUpdate(updatedIncident);
      
      toast.success('Incidente evaluado exitosamente.');
    } catch (error: any) {
      console.error('Error evaluating incident:', error);
      toast.error(error.message || 'Error al evaluar incidente. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-sm text-gray-600 text-center">
            Solo administradores pueden evaluar incidentes.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluación de Incidente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Selector */}
        <div className="space-y-2">
          <Label htmlFor="status">Estatus</Label>
          <Select
            value={String(selectedStatus)}
            onValueChange={(value) => setSelectedStatus(Number(value))}
            disabled={isSubmitting}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Seleccionar estatus..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
                  Pendiente
                </span>
              </SelectItem>
              <SelectItem value="2">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  Aprobado
                </span>
              </SelectItem>
              <SelectItem value="3">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                  Rechazado
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Supervisor Selector */}
        <div className="space-y-2">
          <Label htmlFor="supervisor">Supervisor</Label>
          <SupervisorDropdown
            users={adminUsers}
            currentSupervisorId={selectedSupervisorId}
            onSupervisorChange={setSelectedSupervisorId}
            disabled={isUsersLoading || isSubmitting}
          />
          
          {/* Show current supervisor info */}
          {incident.supervisor && (
            <p className="text-xs text-gray-500">
              Actual: {incident.supervisor.nombre} {incident.supervisor.apellido}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isChanged || isSubmitting}
          className="w-full"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Guardando...' : 'Guardar Evaluación'}
        </Button>

        {/* Help Text */}
        {!isChanged && (
          <p className="text-xs text-gray-500 text-center">
            Modifica el estatus o supervisor para guardar cambios
          </p>
        )}
      </CardContent>
    </Card>
  );
}