'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type {
  AdminUser,
  AuthContextType,
  RegisterAdminRequest,
} from '@/lib/types/auth.types';
import { registerAdmin } from '@/lib/api/auth';
import { setAuthToken, clearAuthToken, getAuthToken } from '@/lib/api/client';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const storedToken = getAuthToken();
    const storedUser = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_user') 
      : null;

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as AdminUser;
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        clearAuthToken();
        localStorage.removeItem('auth_user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = (newToken: string, newUser: AdminUser): void => {
    setToken(newToken);
    setUser(newUser);
    setAuthToken(newToken);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(newUser));
    }
  };

  const logout = (): void => {
    setToken(null);
    setUser(null);
    clearAuthToken();
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
    }

    toast.success('Sesión cerrada exitosamente');
    router.push('/login');
  };

  const register = async (userData: RegisterAdminRequest): Promise<void> => {
    await registerAdmin(userData);
    // Don't auto-login after registration
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}