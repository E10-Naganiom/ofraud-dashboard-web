'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Home, FileText, Users, Tag, User, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { mockCurrentUser } from '@/lib/mock/userData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface NavLink {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { label: 'Panel', path: '/dashboard', icon: <Home size={20} /> },
  { label: 'Incidentes', path: '/incidents', icon: <FileText size={20} /> },
  { label: 'Usuarios', path: '/users', icon: <Users size={20} /> },
  { label: 'Categorías', path: '/categories', icon: <Tag size={20} /> },
  { label: 'Mi Perfil', path: '/profile', icon: <User size={20} /> },
];

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void;
}

export default function Sidebar({ className, onLinkClick }: SidebarProps): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const isActive = (path: string): boolean => {
    if (path === '/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const handleLogout = (): void => {
    logout();
    toast.success('Su sesión se ha cerrado correctamente');
    console.log('User logged out (mock implementation)');
    router.push('/login');
  };

  return (
    <aside className={cn('flex flex-col h-full bg-sidebar border-r border-sidebar-border', className)}>
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={180}
          height={180}
          priority
          className="object-contain"
        />
      </div>

      {/* User Info Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center font-semibold text-lg text-black">
            {mockCurrentUser.initials}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-brand-text-primary">{mockCurrentUser.name}</p>
            <p className="text-xs text-brand-text-muted mb-2">{mockCurrentUser.email}</p>
            <Badge variant="secondary" className="text-xs">
              {mockCurrentUser.role}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200',
                  'text-black hover:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-brand-primary',
                  isActive(link.path)
                    ? 'bg-brand-primary hover:bg-brand-primary-hover'
                    : ''
                )}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-brand-text-secondary hover:text-brand-text-primary hover:bg-sidebar-accent"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </Button>
      </div>
    </aside>
  );
}
