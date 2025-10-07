'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect after loading completes
    if (!isLoading && !isAuthenticated) {
      // Encode current path as returnTo parameter
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/login?returnTo=${returnUrl}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If not authenticated, show nothing (redirect happens in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // User is authenticated, render protected content
  return <>{children}</>;
}
