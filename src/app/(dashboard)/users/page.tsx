"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserList from "@/components/users/UserList";
import { generateMockUsers } from "@/lib/mock/users";
import type { User } from "@/lib/types/user.types";
import { PlusCircle, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

// Helper to simulate a network request
const fetchMockUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockUsers(25)); // Generate 25 users for pagination testing
    }, 1000); // 1-second delay to simulate loading
  });
};

function UserManagementPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const mockUsers = await fetchMockUsers();
        setUsers(mockUsers);
      } catch {
        setError('Error al cargar usuarios. Intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    } else {
      params.delete('search');
    }
    router.replace(`/users?${params.toString()}`);
  }, [debouncedSearchTerm, router, searchParams]);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.nombre.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.apellido.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [users, debouncedSearchTerm]);

  const handleStatusChange = (userId: string, newStatus: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, is_active: newStatus } : user
      )
    );
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <Button asChild>
          <Link href="/users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Usuario
          </Link>
        </Button>
      </div>

      <div className="relative mb-4">
        <Input
          placeholder="Buscar por nombre o correo electrónico..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchTerm('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {loading && <p>Cargando...</p>}
      {!loading && error && <p className="text-red-500">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No hay usuarios registrados.</p>}
      {!loading && !error && filteredUsers.length === 0 && debouncedSearchTerm && (
        <p>No se encontraron usuarios que coincidan con &apos;{debouncedSearchTerm}&apos;.</p>
      )}
      {!loading && !error && filteredUsers.length > 0 && (
        <UserList users={filteredUsers} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}

export default function UserManagementPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <UserManagementPageContent />
    </Suspense>
  );
}
