'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

import { loginAdmin } from '@/lib/api/auth';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth.schema';
import { useAuth } from '@/contexts/AuthContext';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      correo: '',
      contrasena: '',
    },
  });

  // Authentication check - redirect if already logged in
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const returnTo = searchParams.get('returnTo');
      const safeReturnTo = returnTo?.startsWith('/') ? returnTo : '/dashboard';
      router.push(safeReturnTo);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);

      const response = await loginAdmin(data);

      // Store auth state
      login(response.access_token, response.user);

      // Show success message
      toast.success(`¡Inicio de sesión exitoso! Bienvenido ${response.user.nombre}`);

      // Redirect to returnTo URL or default to dashboard
      const returnTo = searchParams.get('returnTo');
      const safeReturnTo = returnTo?.startsWith('/') ? returnTo : '/dashboard';
      router.push(safeReturnTo);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 404) {
          toast.error('Usuario no encontrado');
        } else if (status === 401) {
          toast.error('Contraseña incorrecta');
        } else if (status === 400) {
          toast.error('Correo electrónico inválido');
        } else {
          toast.error('Error al iniciar sesión. Por favor, intente nuevamente.');
        }
      } else {
        toast.error('Error inesperado. Por favor, intente nuevamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }

  // Don't render form if already authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
          <p className="text-center text-gray-600 text-sm">
            Accede a tu cuenta de administrador
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="juan@example.com"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contrasena"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Regístrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
