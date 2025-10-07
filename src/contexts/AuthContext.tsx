'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  AdminUser,
  AuthContextType,
  RegisterAdminRequest,
} from '@/lib/types/auth.types';
import { registerAdmin } from '@/lib/api/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Token persistence helpers
  const saveToken = (token: string): void => {
    localStorage.setItem('auth_token', token);
  };

  const getToken = (): string | null => {
    return localStorage.getItem('auth_token');
  };

  const removeToken = (): void => {
    localStorage.removeItem('auth_token');
  };

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      const storedToken = getToken();
      if (storedToken) {
        // For MVP: Assume valid, backend will validate on API calls
        // If invalid, 401 interceptor will handle logout
        setToken(storedToken);
        setIsAuthenticated(true);
        // Note: User info will be fetched by calling component or loaded from token
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (token: string, user: AdminUser): void => {
    saveToken(token);
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    removeToken();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
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
        isAuthenticated,
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
