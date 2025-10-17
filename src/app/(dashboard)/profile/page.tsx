"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserForm from "@/components/users/UserForm";
import type { EditUserFormData } from "@/lib/validations/user.schema";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getUserById, updateUser } from "@/lib/api/users";
import type { User } from "@/lib/types/user.types";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ProfilePage() {
  const { user: authUser, login } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!authUser?.id) return;

    const loadUserProfile = async () => {
      setIsFetching(true);
      try {
        const fetchedUser = await getUserById(authUser.id);
        setUser(fetchedUser);
      } catch (error: any) {
        console.error('Error loading profile:', error);
        toast.error(error.message || "Error al cargar el perfil.");
      } finally {
        setIsFetching(false);
      }
    };

    loadUserProfile();
  }, [authUser?.id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (data: EditUserFormData) => {
    if (!authUser?.id || !user) return;

    setIsLoading(true);

    try {
      const updatedUser = await updateUser(authUser.id, data);
      
      // Update local state
      setUser(updatedUser);
      
      // Update auth context with new user data
      login(localStorage.getItem('auth_token') || '', {
        id: updatedUser.id,
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        correo: updatedUser.email,
        is_admin: updatedUser.is_admin,
      });
      
      toast.success("Perfil actualizado exitosamente");
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      const errorMessage = error.message || 'Error al actualizar perfil';
      
      if (errorMessage.includes('correo') || errorMessage.includes('email')) {
        toast.error("El correo ya está en uso por otro usuario.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-600">No se pudo cargar el perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

      {!isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nombre Completo</p>
              <p className="text-lg font-medium">
                {user.nombre} {user.apellido}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Correo electrónico</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rol</p>
              <Badge variant={user.is_admin ? "default" : "secondary"}>
                {user.is_admin ? "Administrador" : "Usuario"}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <Badge variant={user.is_active ? "default" : "destructive"}>
                {user.is_active ? "Activo" : "Inactivo"}
              </Badge>
            </div>

            <Button onClick={handleEditClick} className="mt-4">
              Editar Perfil
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Editar Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <UserForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
              initialData={user}
              mode="edit"
              hideAdminFields={true} // ← NUEVO: Oculta campos de admin en perfil propio
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}