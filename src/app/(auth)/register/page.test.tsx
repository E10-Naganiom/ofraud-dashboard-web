import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import RegisterPage from './page';
import { registerAdmin } from '@/lib/api/auth';

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
  registerAdmin: vi.fn(),
}));

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders registration form with all required fields', () => {
    render(<RegisterPage />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^correo$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmación de contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  it('renders page title and description', () => {
    render(<RegisterPage />);

    expect(screen.getByText('Registro de Administrador')).toBeInTheDocument();
    expect(screen.getByText('Crea tu cuenta de administrador')).toBeInTheDocument();
  });

  it('renders link to login page', () => {
    render(<RegisterPage />);

    const loginLink = screen.getByRole('link', { name: /inicia sesión/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('disables submit button when form is invalid', async () => {
    render(<RegisterPage />);

    const submitButton = screen.getByRole('button', { name: /registrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('displays validation error for empty nombre', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const nombreInput = screen.getByLabelText(/nombre/i);
    await user.type(nombreInput, 'a');
    await user.clear(nombreInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Campo de Nombre obligatorio')).toBeInTheDocument();
    });
  });

  it('displays validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const correoInput = screen.getByLabelText(/^correo$/i);
    await user.type(correoInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Correo electrónico inválido')).toBeInTheDocument();
    });
  });

  it('displays validation error for short password', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    await user.type(passwordInput, 'short');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('Ingresar una contraseña válida con el formato especificado'),
      ).toBeInTheDocument();
    });
  });

  it('displays validation error for password with special characters', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    await user.type(passwordInput, 'Password123!');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('Ingresar una contraseña válida con el formato especificado'),
      ).toBeInTheDocument();
    });
  });

  it('displays validation error when passwords do not match', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const confirmInput = screen.getByLabelText(/confirmación de contraseña/i);

    await user.type(passwordInput, 'Password123');
    await user.type(confirmInput, 'DifferentPassword');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('La confirmación de contraseña no coincide'),
      ).toBeInTheDocument();
    });
  });

  it('enables submit button when form is valid', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'Password123');
    await user.type(screen.getByLabelText(/confirmación de contraseña/i), 'Password123');

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('successfully registers user and redirects to login', async () => {
    const user = userEvent.setup();
    const mockRegisterAdmin = vi.mocked(registerAdmin);
    mockRegisterAdmin.mockResolvedValue({
      id: '1',
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      is_admin: true,
    });

    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'Password123');
    await user.type(screen.getByLabelText(/confirmación de contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /registrar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRegisterAdmin).toHaveBeenCalledWith({
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        contrasena: 'Password123',
      });
      expect(toast.success).toHaveBeenCalledWith(
        '¡Registro exitoso! Se ha creado la cuenta de administrador.',
      );
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('displays error toast on 409 conflict (duplicate email)', async () => {
    const user = userEvent.setup();
    const mockRegisterAdmin = vi.mocked(registerAdmin);
    mockRegisterAdmin.mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 409,
        data: { message: 'Email already exists' },
      },
    });

    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'Password123');
    await user.type(screen.getByLabelText(/confirmación de contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /registrar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'El correo ya está registrado con un usuario existente',
      );
    });
  });

  it('displays error toast on 400 bad request', async () => {
    const user = userEvent.setup();
    const mockRegisterAdmin = vi.mocked(registerAdmin);
    mockRegisterAdmin.mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 400,
        data: { message: ['Email is invalid', 'Password is too short'] },
      },
    });

    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'Password123');
    await user.type(screen.getByLabelText(/confirmación de contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /registrar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Email is invalid, Password is too short',
      );
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    const mockRegisterAdmin = vi.mocked(registerAdmin);
    mockRegisterAdmin.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'Password123');
    await user.type(screen.getByLabelText(/confirmación de contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /registrar/i });
    await user.click(submitButton);

    expect(screen.getByText(/registrando/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('disables all form fields during submission', async () => {
    const user = userEvent.setup();
    const mockRegisterAdmin = vi.mocked(registerAdmin);
    mockRegisterAdmin.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/^correo$/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'Password123');
    await user.type(screen.getByLabelText(/confirmación de contraseña/i), 'Password123');

    const submitButton = screen.getByRole('button', { name: /registrar/i });
    await user.click(submitButton);

    expect(screen.getByLabelText(/nombre/i)).toBeDisabled();
    expect(screen.getByLabelText(/^correo$/i)).toBeDisabled();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeDisabled();
    expect(screen.getByLabelText(/confirmación de contraseña/i)).toBeDisabled();
  });
});
