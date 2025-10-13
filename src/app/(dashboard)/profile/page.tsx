"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserForm from "@/components/users/UserForm";
import type { User } from "@/lib/types/user.types";
import type { EditUserFormData } from "@/lib/validations/user.schema";
import { toast } from "sonner";

// Mock user data for profile
const mockUser: User = {
  id: "admin-1",
  nombre: "Juan",
  apellido: "Pérez",
  email: "juan.perez@ofraud.com",
  is_admin: true,
  is_active: true,
};

export default function ProfilePage() {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (data: EditUserFormData) => {
    setIsLoading(true);

    // Simulate API call with setTimeout
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock success response
    toast.success("Perfil actualizado exitosamente (Simulación)");

    // Update local state with new data
    setUser({
      ...user,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      is_admin: data.is_admin,
      is_active: data.is_active,
    });

    setIsEditing(false);
    setIsLoading(false);
  };

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
              <p className="text-sm text-gray-500">Nombre</p>
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
              initialData={{
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                is_admin: user.is_admin,
                is_active: user.is_active,
              }}
              mode="edit"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
