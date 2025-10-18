"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { User } from "@/lib/types/user.types";
import { updateUser, inactivateUser } from "@/lib/api/users";

interface UserStatusToggleProps {
  user: User;
  onStatusChange: (userId: string, newStatus: boolean) => void;
}

export default function UserStatusToggle({
  user,
  onStatusChange,
}: UserStatusToggleProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);

  const handleSwitchClick = (checked: boolean) => {
    setPendingStatus(checked);
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (pendingStatus === null) return;

    setIsLoading(true);

    try {
      if (pendingStatus) {
        // Activate user - update is_active to true
        await updateUser(user.id, { is_active: true });
        toast.success("Usuario activado exitosamente");
      } else {
        // Inactivate user - use inactivate endpoint
        await inactivateUser(user.id);
        toast.success("Usuario inactivado exitosamente");
      }
      
      onStatusChange(user.id, pendingStatus);
    } catch (error: any) {
      console.error('Error updating user status:', error);
      const errorMessage = error.message || 'Error al actualizar el estado del usuario';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
      setPendingStatus(null);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setPendingStatus(null);
  };

  const actionText = pendingStatus ? "activar" : "inactivar";

  return (
    <>
      <Switch
        checked={user.is_active}
        onCheckedChange={handleSwitchClick}
        disabled={isLoading}
      />

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar acción</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea {actionText} esta cuenta?
              {!pendingStatus && (
                <span className="block mt-2 text-sm text-yellow-600">
                  Los usuarios inactivos no podrán iniciar sesión.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} disabled={isLoading}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? "Procesando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}