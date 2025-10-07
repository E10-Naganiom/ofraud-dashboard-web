'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import BaseLayout from '@/components/layout/BaseLayout'

export default function DemoPage() {
  const handleToast = () => {
    toast.success('¡Componente funcionando correctamente!', {
      description: 'Este es un ejemplo de notificación toast.',
    })
  }

  return (
    <BaseLayout>
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Demo de Componentes shadcn/ui
          </h1>
          <p className="text-muted-foreground mt-2">
            Demostración de todos los componentes instalados para el proyecto
            oFraud
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Botones</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Pequeño</Button>
            <Button size="default">Mediano</Button>
            <Button size="lg">Grande</Button>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Inputs y Labels</h2>
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled">Input deshabilitado</Label>
              <Input id="disabled" disabled placeholder="No editable" />
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Cards</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card Simple</CardTitle>
                <CardDescription>
                  Descripción de la tarjeta básica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido de la tarjeta con información relevante.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card con Footer</CardTitle>
                <CardDescription>
                  Tarjeta con botones de acción
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Esta tarjeta incluye un pie con acciones.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancelar</Button>
                <Button>Confirmar</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incidente #1234</CardTitle>
                <CardDescription>
                  <Badge>Pendiente</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Fraude detectado en transacción bancaria.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-green-500">Aprobado</Badge>
            <Badge className="bg-yellow-500">Pendiente</Badge>
            <Badge className="bg-red-500">Rechazado</Badge>
          </div>
        </section>

        {/* Dialog Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Dialogs</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Abrir Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Estás seguro?</DialogTitle>
                <DialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará
                  permanentemente la categoría.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button variant="destructive">Eliminar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Toast Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Toast Notifications</h2>
          <div className="flex gap-4">
            <Button onClick={handleToast}>Mostrar Toast</Button>
            <Button
              onClick={() =>
                toast.error('Error', {
                  description: 'Algo salió mal. Intenta nuevamente.',
                })
              }
              variant="destructive"
            >
              Toast de Error
            </Button>
            <Button
              onClick={() =>
                toast.info('Información', {
                  description: 'Este es un mensaje informativo.',
                })
              }
              variant="secondary"
            >
              Toast Informativo
            </Button>
          </div>
        </section>

        {/* Dropdown Menu Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Dropdown Menu</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Abrir Menú</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* Table Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tables</h2>
          <Table>
            <TableCaption>Lista de incidentes recientes</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INC-001</TableCell>
                <TableCell>Juan Pérez</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-500">Pendiente</Badge>
                </TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INC-002</TableCell>
                <TableCell>María García</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Aprobado</Badge>
                </TableCell>
                <TableCell className="text-right">$450.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INC-003</TableCell>
                <TableCell>Carlos López</TableCell>
                <TableCell>
                  <Badge variant="destructive">Rechazado</Badge>
                </TableCell>
                <TableCell className="text-right">$120.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </div>
    </BaseLayout>
  )
}
