"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import UserForm from "@/components/users/UserForm";
import type { EditUserFormData } from "@/lib/validations/user.schema";
import type { User } from "@/lib/types/user.types";
import { getUserById, updateUser } from "@/lib/api/users";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadUser = async () => {
      setIsFetching(true);
      try {
        const fetchedUser = await getUserById(id);
        setUser(fetchedUser);
      } catch (error: any) {
        console.error('Error loading user:', error);
        toast.error(error.message || "Usuario no encontrado.");
        router.push("/users");
      } finally {
        setIsFetching(false);
      }
    };

    loadUser();
  }, [id, router]);

  const handleCancel = () => {
    router.push("/users");
  };

  const handleSubmit = async (data: EditUserFormData) => {
    if (!id) return;

    setIsLoading(true);
    try {
      await updateUser(id, data);
      toast.success("Usuario actualizado exitosamente.");
      router.push("/users");
    } catch (error: any) {
      console.error('Error updating user:', error);
      const errorMessage = error.message || 'Error al actualizar usuario';
      
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
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-600 mb-4">Usuario no encontrado.</p>
          <Button onClick={handleCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a lista
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Editar Usuario</h1>
        
        <UserForm
          mode="edit"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          initialData={user}
        />
      </div>
    </div>
  );
}