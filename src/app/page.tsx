import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="oFraud Logo"
              width={150}
              height={150}
              priority
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-center">oFraud Dashboard</h1>
          <p className="text-center text-gray-600 text-sm">
            Sistema de gestión de fraudes
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full" size="lg">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/register" className="block">
            <Button className="w-full" variant="outline" size="lg">
              Registrarse
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
