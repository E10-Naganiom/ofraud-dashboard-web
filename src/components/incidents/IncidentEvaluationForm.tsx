import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { evaluateIncident } from '@/lib/api/incidents';
import { getAdminUsers } from '@/lib/api/users';
import type { IncidentDetail, UserInfo } from '@/lib/types/incident.types';
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
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<string | null>(incident.supervisor?.id || null);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const users = await getAdminUsers();
        setAdminUsers(users);
      } catch (_error) {
        toast.error('Error al cargar supervisores.');
      }
      setIsUsersLoading(false);
    };
    fetchAdmins();
  }, []);

  const isAdmin = user?.is_admin ?? false;
  const isStatusChanged = selectedStatus !== incident.id_estatus;
  const isSupervisorChanged = selectedSupervisorId !== (incident.supervisor?.id || null);
  const isChanged = isStatusChanged || isSupervisorChanged;

  const handleSubmit = async () => {
    if (!isChanged || !isAdmin) return;

    setIsSubmitting(true);
    try {
      await evaluateIncident(String(incident.id), selectedStatus, selectedSupervisorId);
      const updatedSupervisor = adminUsers.find(u => u.id === selectedSupervisorId);
      const supervisorUserInfo: UserInfo | null = updatedSupervisor
        ? {
            id: updatedSupervisor.id,
            nombre: updatedSupervisor.nombre,
            apellido: updatedSupervisor.apellido,
            correo_electronico: updatedSupervisor.email
          }
        : null;
      onUpdate({ id_estatus: selectedStatus, supervisor: supervisorUserInfo });
      toast.success('Incidente evaluado exitosamente.');
    } catch {
      toast.error('Error al evaluar incidente. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluación de Incidente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status">Estatus</Label>
          <Select
            value={String(selectedStatus)}
            onValueChange={(value) => setSelectedStatus(Number(value))}
            disabled={!isAdmin || isSubmitting}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Seleccionar estatus..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Pendiente</SelectItem>
              <SelectItem value="2">Aprobado</SelectItem>
              <SelectItem value="3">Rechazado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supervisor">Supervisor</Label>
          <SupervisorDropdown
            users={adminUsers}
            currentSupervisorId={selectedSupervisorId}
            onSupervisorChange={setSelectedSupervisorId}
            disabled={!isAdmin || isUsersLoading || isSubmitting}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isChanged || !isAdmin || isSubmitting}
          className="w-full"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar Evaluación
        </Button>
      </CardContent>
    </Card>
  );
}
