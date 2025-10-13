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

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Simulate error for user with id '0'
      if (user.id === "0") {
        toast.error("Usuario no encontrado (Simulación)");
        setIsLoading(false);
        setIsDialogOpen(false);
        setPendingStatus(null);
        return;
      }

      // Success case
      const action = pendingStatus ? "activado" : "inactivado";
      toast.success(`Usuario ${action} exitosamente (Simulación)`);
      onStatusChange(user.id, pendingStatus);
      setIsLoading(false);
      setIsDialogOpen(false);
      setPendingStatus(null);
    }, 500);
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
