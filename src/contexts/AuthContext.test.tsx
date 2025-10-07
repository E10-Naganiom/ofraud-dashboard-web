/**
 * Unit tests for AuthContext and AuthProvider
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import type { AdminUser, RegisterAdminRequest } from '@/lib/types/auth.types';
import * as authApi from '@/lib/api/auth';

// Mock the auth API
vi.mock('@/lib/api/auth', () => ({
  registerAdmin: vi.fn(),
}));

// Test component that uses useAuth hook
function TestComponent() {
  const { user, token, isAuthenticated, isLoading, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="user">{user ? user.nombre : 'null'}</div>
      <div data-testid="token">{token || 'null'}</div>
      <div data-testid="isAuthenticated">{isAuthenticated.toString()}</div>
      <div data-testid="isLoading">{isLoading.toString()}</div>
      <button
        data-testid="login-button"
        onClick={() => {
          const testUser: AdminUser = {
            id: '123',
            nombre: 'Test User',
            correo: 'test@example.com',
            is_admin: true,
          };
          login('test-token-123', testUser);
        }}
      >
        Login
      </button>
      <button data-testid="logout-button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

// Component to test useAuth outside provider
function ComponentOutsideProvider() {
  useAuth();
  return <div>Should not render</div>;
}

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('AuthProvider initialization', () => {
    it('should initialize with default state when no token in localStorage', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('isLoading').textContent).toBe('false');
      });

      expect(screen.getByTestId('user').textContent).toBe('null');
      expect(screen.getByTestId('token').textContent).toBe('null');
      expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
    });

    it('should load token from localStorage on mount', async () => {
      localStorage.setItem('auth_token', 'stored-token-456');

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initialization to complete
      await waitFor(() => {
        expect(screen.getByTestId('isLoading').textContent).toBe('false');
      });

      expect(screen.getByTestId('token').textContent).toBe('stored-token-456');
      expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
    });
  });

  describe('login function', () => {
    it('should update state and save token to localStorage', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('isLoading').textContent).toBe('false');
      });

      // Click login button
      act(() => {
        screen.getByTestId('login-button').click();
      });

      // Check state updates
      expect(screen.getByTestId('user').textContent).toBe('Test User');
      expect(screen.getByTestId('token').textContent).toBe('test-token-123');
      expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');

      // Check localStorage
      expect(localStorage.getItem('auth_token')).toBe('test-token-123');
    });
  });

  describe('logout function', () => {
    it('should clear state and remove token from localStorage', async () => {
      // Set initial token
      localStorage.setItem('auth_token', 'initial-token');

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initialization
      await waitFor(() => {
        expect(screen.getByTestId('isLoading').textContent).toBe('false');
      });

      // Verify token is loaded
      expect(screen.getByTestId('token').textContent).toBe('initial-token');
      expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');

      // Click logout button
      act(() => {
        screen.getByTestId('logout-button').click();
      });

      // Check state is cleared
      expect(screen.getByTestId('user').textContent).toBe('null');
      expect(screen.getByTestId('token').textContent).toBe('null');
      expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');

      // Check localStorage is cleared
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

  describe('register function', () => {
    it('should call registerAdmin API', async () => {
      const mockRegisterAdmin = vi.mocked(authApi.registerAdmin);
      mockRegisterAdmin.mockResolvedValue({
        id: '123',
        nombre: 'New User',
        correo: 'newuser@example.com',
        is_admin: true,
      });

      function RegisterTestComponent() {
        const { register } = useAuth();

        const handleRegister = async () => {
          const userData: RegisterAdminRequest = {
            nombre: 'New User',
            correo: 'newuser@example.com',
            contrasena: 'password123',
          };
          await register(userData);
        };

        return (
          <button data-testid="register-button" onClick={handleRegister}>
            Register
          </button>
        );
      }

      render(
        <AuthProvider>
          <RegisterTestComponent />
        </AuthProvider>
      );

      // Click register button
      await act(async () => {
        screen.getByTestId('register-button').click();
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Verify API was called
      expect(mockRegisterAdmin).toHaveBeenCalledWith({
        nombre: 'New User',
        correo: 'newuser@example.com',
        contrasena: 'password123',
      });
    });
  });

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<ComponentOutsideProvider />);
      }).toThrow('useAuth must be used within AuthProvider');

      consoleSpy.mockRestore();
    });
  });
});
