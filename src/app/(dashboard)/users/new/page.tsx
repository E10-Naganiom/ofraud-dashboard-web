"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@/components/users/UserForm";
import type { UserFormData, EditUserFormData } from "@/lib/validations/user.schema";
import { toast } from "sonner";

export default function NewUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    router.push("/users");
  };

  const handleSubmit = async (data: UserFormData | EditUserFormData) => {
    setIsLoading(true);
    console.log("Simulating API call with:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.email === "test@exists.com") {
      toast.error("El correo ya está registrado (Simulación).");
    } else {
      toast("Usuario creado exitosamente (Simulación).");
      router.push("/users");
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
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
