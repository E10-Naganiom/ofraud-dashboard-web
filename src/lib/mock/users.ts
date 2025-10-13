import type { User } from '@/lib/types/user.types';

const firstNames = ['Juan', 'Maria', 'Pedro', 'Ana', 'Luis', 'Laura', 'Carlos', 'Sofia', 'Miguel', 'Elena'];
const lastNames = ['García', 'Rodríguez', 'Martínez', 'Hernández', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres'];

const generateRandomUser = (id: number): User => {
  const nombre = firstNames[Math.floor(Math.random() * firstNames.length)];
  const apellido = lastNames[Math.floor(Math.random() * lastNames.length)];
  const email = `${nombre.toLowerCase()}.${apellido.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
  const is_admin = Math.random() > 0.8; // 20% chance of being an admin
  const is_active = Math.random() > 0.1; // 90% chance of being active

  return {
    id: String(id),
    nombre,
    apellido,
    email,
    is_admin,
    is_active,
  };
};

export const generateMockUsers = (count: number = 20): User[] => {
  const users: User[] = [];
  for (let i = 1; i <= count; i++) {
    users.push(generateRandomUser(i));
  }
  return users;
};

export const mockUsers = generateMockUsers();
