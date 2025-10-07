import { describe, it, expect } from 'vitest';
import { registerSchema } from './auth.schema';

describe('registerSchema', () => {
  it('should validate correct registration data', () => {
    const validData = {
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contrasena: 'Password123',
      confirmacionContrasena: 'Password123',
    };

    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject empty nombre', () => {
    const invalidData = {
      nombre: '',
      correo: 'juan@example.com',
      contrasena: 'Password123',
      confirmacionContrasena: 'Password123',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Campo de Nombre obligatorio');
    }
  });

  it('should reject nombre longer than 50 characters', () => {
    const invalidData = {
      nombre: 'a'.repeat(51),
      correo: 'juan@example.com',
      contrasena: 'Password123',
      confirmacionContrasena: 'Password123',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Nombre debe tener máximo 50 caracteres',
      );
    }
  });

  it('should reject invalid email format', () => {
    const invalidData = {
      nombre: 'Juan Pérez',
      correo: 'invalid-email',
      contrasena: 'Password123',
      confirmacionContrasena: 'Password123',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Correo electrónico inválido');
    }
  });

  it('should reject empty correo', () => {
    const invalidData = {
      nombre: 'Juan Pérez',
      correo: '',
      contrasena: 'Password123',
      confirmacionContrasena: 'Password123',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Campo de Correo obligatorio');
    }
  });

  it('should reject correo longer than 50 characters', () => {
    const invalidData = {
      nombre: 'Juan Pérez',
      correo: 'a'.repeat(40) + '@example.com',
      contrasena: 'Password123',
      confirmacionContrasena: 'Password123',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Correo debe tener máximo 50 caracteres',
      );
    }
  });

  it('should reject password shorter than 8 characters', () => {
    const invalidData = {
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contrasena: 'Pass123',
      confirmacionContrasena: 'Pass123',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Ingresar una contraseña válida con el formato especificado',
      );
    }
  });

  it('should reject password longer than 20 characters', () => {
    const invalidData = {
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contrasena: 'a'.repeat(21),
      confirmacionContrasena: 'a'.repeat(21),
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Contraseña debe tener máximo 20 caracteres',
      );
    }
  });

  it('should reject password with special characters', () => {
    const invalidData = {
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contrasena: 'Password123!',
      confirmacionContrasena: 'Password123!',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Ingresar una contraseña válida con el formato especificado',
      );
    }
  });

  it('should reject when passwords do not match', () => {
    const invalidData = {
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contrasena: 'Password123',
      confirmacionContrasena: 'DifferentPassword',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'La confirmación de contraseña no coincide',
      );
    }
  });

  it('should reject empty confirmacionContrasena', () => {
    const invalidData = {
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contrasena: 'Password123',
      confirmacionContrasena: '',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Campo de Confirmación obligatorio');
    }
  });
});
