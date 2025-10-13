"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import UserForm from "@/components/users/UserForm";
import type { EditUserFormData } from "@/lib/validations/user.schema";
import type { User } from "@/lib/types/user.types";
import { generateMockUsers } from "@/lib/mock/users";

// Simulate a small user database
const mockUsers = generateMockUsers(5);

// Simulate fetching a single user
const fetchMockUser = (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === '0') {
        resolve(null); // Simulate not found
      }
      const user = mockUsers.find((u) => u.id === id);
      resolve(user || null);
    }, 500);
  });
};

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
      const fetchedUser = await fetchMockUser(id);
      if (!fetchedUser) {
        toast.error("Usuario no encontrado (Simulación).");
        router.push("/users");
      } else {
        setUser(fetchedUser);
      }
      setIsFetching(false);
    };

    loadUser();
  }, [id, router]);

  const handleCancel = () => {
    router.push("/dashboard/users");
  };

  const handleSubmit = async (data: EditUserFormData) => {
    setIsLoading(true);
    console.log("Simulating API update with:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example of a simulated conflict error
    if (data.email === "conflict@test.com") {
      toast.error("El correo ya está en uso por otro usuario (Simulación).");
    } else {
      toast.success("Usuario actualizado exitosamente (Simulación).");
      router.push("/dashboard/users");
    }

    setIsLoading(false);
  };

  if (isFetching) {
    return <div className="container mx-auto py-10">Cargando usuario...</div>;
  }

  if (!user) {
    // This will likely not be seen due to the redirect, but it's good practice
    return <div className="container mx-auto py-10">Usuario no encontrado.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
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
