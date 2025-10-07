'use client';

import ProtectedRoute from '@/components/guards/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Future: Add Sidebar, Header, etc. */}
        <main className="container mx-auto py-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
