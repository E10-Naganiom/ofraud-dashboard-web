/**
 * Unit tests for ProtectedRoute component
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import * as AuthContext from '@/contexts/AuthContext';

// Mock next/navigation
const mockPush = vi.fn();
const mockPathname = '/dashboard';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

// Mock AuthContext
const mockUseAuth = vi.spyOn(AuthContext, 'useAuth');

describe('ProtectedRoute', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should display loading spinner while authentication is loading', () => {
    // Mock auth context in loading state
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Should show loading spinner
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    // Should NOT show protected content
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to /login with returnTo parameter when user is not authenticated', async () => {
    // Mock auth context with user not authenticated
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Wait for redirect to be called
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?returnTo=%2Fdashboard');
    });

    // Should NOT show protected content
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render children when user is authenticated', () => {
    // Mock auth context with user authenticated
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '123',
        nombre: 'Test Admin',
        correo: 'admin@test.com',
        is_admin: true,
      },
      token: 'test-token',
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Should render protected content
    expect(screen.getByText('Protected Content')).toBeInTheDocument();

    // Should NOT redirect
    expect(mockPush).not.toHaveBeenCalled();

    // Should NOT show loading spinner
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).not.toBeInTheDocument();
  });

  it('should not show content flash during loading', () => {
    // Mock auth context in loading state
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Should NOT show protected content during loading
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

    // Should show loading spinner instead
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should not redirect when user is authenticated (even if loading)', () => {
    // Mock auth context with user authenticated but still loading
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: true,
      user: {
        id: '123',
        nombre: 'Test Admin',
        correo: 'admin@test.com',
        is_admin: true,
      },
      token: 'test-token',
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Should show loading spinner
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    // Should NOT redirect (user is authenticated)
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should return null when not authenticated and not loading (during redirect)', () => {
    // Mock auth context with user not authenticated
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Should not render anything (null return)
    expect(container.firstChild).toBeNull();
  });
});
