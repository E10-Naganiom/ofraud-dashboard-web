import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { AdminUser } from '@/lib/types/user.types';

interface SupervisorDropdownProps {
  users: AdminUser[];
  currentSupervisorId?: string | null;
  onSupervisorChange: (supervisorId: string | null) => void;
  disabled?: boolean;
}

export default function SupervisorDropdown({ users, currentSupervisorId, onSupervisorChange, disabled }: SupervisorDropdownProps) {
  return (
    <Select
      value={currentSupervisorId || 'unassigned'}
      onValueChange={(value) => onSupervisorChange(value === 'unassigned' ? null : value)}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sin asignar" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Sin asignar</SelectItem>
        {users.map(user => (
          <SelectItem key={user.id} value={user.id}>
            {user.nombre} {user.apellido}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
