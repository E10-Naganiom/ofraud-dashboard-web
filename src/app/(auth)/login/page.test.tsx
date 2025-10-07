import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import LoginPage from './page';
import { loginAdmin } from '@/lib/api/auth';

// Mock dependencies
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/lib/api/auth', () => ({
  loginAdmin: vi.fn(),
}));

const mockLogin = vi.fn();
const mockUseAuth = vi.fn(() => ({
  login: mockLogin,
  isAuthenticated: false,
  isLoading: false,
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('renders login form with all required fields', () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/^correo$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('renders page title and description', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByText('Accede a tu cuenta de administrador')).toBeInTheDocument();
  });

  it('renders link to register page', () => {
    render(<LoginPage />);

    const registerLink = screen.getByRole('link', { name: /regístrate/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('disables submit button when form is invalid', async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(submitButton).toBeDisabled();
  });

  it('displays validation error for empty correo', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const correoInput = screen.getByLabelText(/^correo$/i);
    await user.type(correoInput, 'a');
    await user.clear(correoInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Campo de Correo obligatorio')).toBeInTheDocument();
    });
  });

  it('displays validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const correoInput = screen.getByLabelText(/^correo$/i);
    await user.type(correoInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Correo electrónico inválido')).toBeInTheDocument();
    });
  });

  it('displays validation error for short password', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText(/contraseña/i);
    await user.type(passwordInput, 'short');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Campo de Contraseña obligatorio')).toBeInTheDocument();
    });
  });

  it('enables submit button when form is valid', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'Password123');

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('successfully logs in user and redirects to dashboard', async () => {
    const user = userEvent.setup();
    const mockLoginAdmin = vi.mocked(loginAdmin);
    mockLoginAdmin.mockResolvedValue({
      access_token: 'mock-token-123',
      user: {
        id: '1',
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        is_admin: true,
      },
    });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLoginAdmin).toHaveBeenCalledWith({
        correo: 'juan@example.com',
        contrasena: 'Password123',
      });
      expect(mockLogin).toHaveBeenCalledWith('mock-token-123', {
        id: '1',
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        is_admin: true,
      });
      expect(toast.success).toHaveBeenCalledWith(
        '¡Inicio de sesión exitoso! Bienvenido Juan Pérez',
      );
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('displays error toast on 404 not found (user not found)', async () => {
    const user = userEvent.setup();
    const mockLoginAdmin = vi.mocked(loginAdmin);
    mockLoginAdmin.mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 404,
        data: { message: 'User not found' },
      },
    });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/^correo$/i), 'notfound@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Usuario no encontrado');
    });
  });

  it('displays error toast on 401 unauthorized (wrong password)', async () => {
    const user = userEvent.setup();
    const mockLoginAdmin = vi.mocked(loginAdmin);
    mockLoginAdmin.mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 401,
        data: { message: 'Invalid credentials' },
      },
    });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'WrongPassword');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Contraseña incorrecta');
    });
  });

  it('displays error toast on 400 bad request (invalid email)', async () => {
    const user = userEvent.setup();
    const mockLoginAdmin = vi.mocked(loginAdmin);
    mockLoginAdmin.mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 400,
        data: { message: 'Invalid email format' },
      },
    });

    render(<LoginPage />);

    // Use valid format but backend rejects it
    await user.type(screen.getByLabelText(/^correo$/i), 'test@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Correo electrónico inválido');
    });
  });

  it('displays generic error toast on other errors', async () => {
    const user = userEvent.setup();
    const mockLoginAdmin = vi.mocked(loginAdmin);
    mockLoginAdmin.mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 500,
        data: { message: 'Internal server error' },
      },
    });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Error al iniciar sesión. Por favor, intente nuevamente.',
      );
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    const mockLoginAdmin = vi.mocked(loginAdmin);
    mockLoginAdmin.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    expect(screen.getByText(/iniciando sesión/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('disables all form fields during submission', async () => {
    const user = userEvent.setup();
    const mockLoginAdmin = vi.mocked(loginAdmin);
    mockLoginAdmin.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    expect(screen.getByLabelText(/^correo$/i)).toBeDisabled();
    expect(screen.getByLabelText(/contraseña/i)).toBeDisabled();
  });

  it('shows loading spinner while checking auth status', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      isLoading: true,
    });

    render(<LoginPage />);

    // Should show loading spinner, not the form
    expect(screen.queryByLabelText(/^correo$/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/contraseña/i)).not.toBeInTheDocument();
  });

  it('redirects to dashboard if already authenticated', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isAuthenticated: true,
      isLoading: false,
    });

    render(<LoginPage />);

    // Should not render the form
    expect(screen.queryByLabelText(/^correo$/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/contraseña/i)).not.toBeInTheDocument();

    // Should call router.push to redirect
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
