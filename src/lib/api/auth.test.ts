/**
 * Unit tests for authentication API functions
 */

import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { api } from './client';
import { registerAdmin, loginAdmin, logoutAdmin } from './auth';
import type {
  RegisterAdminRequest,
  RegisterAdminResponse,
  LoginAdminRequest,
  LoginAdminResponse,
} from '@/lib/types/auth.types';

// Create mock adapter for axios instance
const mock = new MockAdapter(api);

describe('Authentication API Functions', () => {
  beforeEach(() => {
    // Reset mock and localStorage before each test
    mock.reset();
    localStorage.clear();
  });

  describe('registerAdmin', () => {
    it('should successfully register admin user', async () => {
      const requestData: RegisterAdminRequest = {
        nombre: 'Test Admin',
        correo: 'admin@test.com',
        contrasena: 'SecurePassword123',
      };

      const responseData: RegisterAdminResponse = {
        id: '123',
        nombre: 'Test Admin',
        correo: 'admin@test.com',
        is_admin: true,
      };

      mock.onPost('/auth/register', requestData).reply(201, responseData);

      const result = await registerAdmin(requestData);

      expect(result).toEqual(responseData);
      expect(result.is_admin).toBe(true);
    });

    it('should throw error when registration fails', async () => {
      const requestData: RegisterAdminRequest = {
        nombre: 'Test Admin',
        correo: 'invalid-email',
        contrasena: 'short',
      };

      mock.onPost('/auth/register').reply(400, {
        statusCode: 400,
        message: ['Email must be valid', 'Password is too short'],
        error: 'Bad Request',
      });

      await expect(registerAdmin(requestData)).rejects.toThrow();
    });

    it('should throw error when email already exists', async () => {
      const requestData: RegisterAdminRequest = {
        nombre: 'Test Admin',
        correo: 'existing@test.com',
        contrasena: 'SecurePassword123',
      };

      mock.onPost('/auth/register').reply(409, {
        statusCode: 409,
        message: 'Email already exists',
        error: 'Conflict',
      });

      await expect(registerAdmin(requestData)).rejects.toThrow();
    });
  });

  describe('loginAdmin', () => {
    it('should successfully login admin user', async () => {
      const requestData: LoginAdminRequest = {
        correo: 'admin@test.com',
        contrasena: 'SecurePassword123',
      };

      const responseData: LoginAdminResponse = {
        access_token: 'jwt-token-123',
        user: {
          id: '123',
          nombre: 'Test Admin',
          correo: 'admin@test.com',
          is_admin: true,
        },
      };

      mock.onPost('/auth/login', requestData).reply(200, responseData);

      const result = await loginAdmin(requestData);

      expect(result).toEqual(responseData);
      expect(result.access_token).toBe('jwt-token-123');
      expect(result.user.is_admin).toBe(true);
    });

    it('should throw error with invalid credentials', async () => {
      const requestData: LoginAdminRequest = {
        correo: 'admin@test.com',
        contrasena: 'WrongPassword',
      };

      mock.onPost('/auth/login').reply(401, {
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      });

      await expect(loginAdmin(requestData)).rejects.toThrow();
    });

    it('should throw error when user does not exist', async () => {
      const requestData: LoginAdminRequest = {
        correo: 'nonexistent@test.com',
        contrasena: 'SomePassword123',
      };

      mock.onPost('/auth/login').reply(404, {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      });

      await expect(loginAdmin(requestData)).rejects.toThrow();
    });
  });

  describe('logoutAdmin', () => {
    it('should clear auth token from localStorage', () => {
      // Set a token first
      localStorage.setItem('auth_token', 'test-token');
      expect(localStorage.getItem('auth_token')).toBe('test-token');

      // Logout should clear it
      logoutAdmin();
      expect(localStorage.getItem('auth_token')).toBeNull();
    });

    it('should not throw error when no token exists', () => {
      // Should not throw error even if no token
      expect(() => logoutAdmin()).not.toThrow();
    });
  });
});
