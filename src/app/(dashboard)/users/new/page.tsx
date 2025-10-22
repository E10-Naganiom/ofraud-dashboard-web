"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@/components/users/UserForm";
import type { UserFormData } from "@/lib/validations/user.schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api/client";

export default function NewUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    router.push("/users");
  };

  const handleSubmit = async (data: UserFormData | { nombre: string; apellido: string; email: string; is_admin: boolean; is_active: boolean; }) => {
      setIsLoading(true);
      
      try {
        // Map frontend fields to backend expected structure
        const payload = {
          email: data.email,
          name: data.nombre,
          apellido: data.apellido,
          password: 'password' in data ? data.password : undefined,
          is_admin: data.is_admin,
          is_active: data.is_active,
        };

      await api.post('/users', payload);
      
      toast.success("Usuario creado exitosamente.");
      router.push("/users");
    } catch (error: any) {
      console.error('Error creating user:', error);
      const errorMessage = error.message || 'Error al crear usuario';
      
      if (errorMessage.includes('correo') || errorMessage.includes('email') || error.response?.status === 409) {
        toast.error("El correo ya está registrado.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a lista
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Crear Nuevo Usuario</h1>
        
        <UserForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          mode="create"
        />
      </div>
    </div>
  );
}