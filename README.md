# oFraud Dashboard - Panel de Administración

Dashboard web para administradores del sistema oFraud. Desarrollado con Next.js 14, React, TypeScript y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Despliegue](#despliegue)
- [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Requisitos Previos

Antes de instalar el dashboard, asegúrese de tener:

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- **Backend de oFraud**: Corriendo y accesible
- **Git**: Para clonar el repositorio

### Verificar instalaciones:

```bash
node --version
npm --version
```

---

## 🛠 Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **UI Library**: React 18
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Gestión de Estado**: React Context API
- **Formularios**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Notificaciones**: Sonner (Toast)
- **Iconos**: Lucide React

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/E10-Naganiom/ofraud-dashboard-web
cd dashboard
```

### 2. Instalar dependencias

```bash
npm install
```

Este proceso puede tomar varios minutos. Instalará todas las dependencias necesarias.

---

## ⚙️ Configuración

### 1. Configurar variables de entorno

Cree un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edite `.env.local` con la URL de su backend:

```env
# URL del Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Opcional: Timeout para peticiones HTTP (en milisegundos)
# NEXT_PUBLIC_API_TIMEOUT=30000
```

⚠️ **IMPORTANTE**: 
- La URL debe apuntar a su backend de oFraud
- Si el backend está en otro servidor, use la IP o dominio correcto
- En producción, use HTTPS: `https://api.ofraud.com`

### 2. Verificar conexión con el backend

Asegúrese de que el backend está corriendo:

```bash
curl http://localhost:3000/docs
```

Debería ver la documentación Swagger del backend.

---

## 🚀 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

El dashboard estará disponible en:
- **URL**: `http://localhost:3000`

### Modo Producción

```bash
# 1. Compilar el proyecto
npm run build

# 2. Ejecutar en producción
npm start
```

### Acceso al Dashboard

1. Abra su navegador en `http://localhost:3000`
2. Será redirigido a `/login`
3. Ingrese credenciales de un usuario **administrador**

⚠️ **NOTA**: Solo usuarios con `is_admin: true` pueden acceder al dashboard.

---

## 📁 Estructura del Proyecto

```
dashboard/
├── src/
│   ├── app/                          # App Router de Next.js
│   │   ├── (auth)/                   # Grupo de rutas de autenticación
│   │   │   └── login/                # Página de login
│   │   ├── (dashboard)/              # Grupo de rutas del dashboard
│   │   │   ├── dashboard/            # Página principal
│   │   │   ├── incidents/            # Gestión de incidentes
│   │   │   ├── categories/           # Gestión de categorías
│   │   │   ├── users/                # Gestión de usuarios
│   │   │   └── profile/              # Perfil del usuario
│   │   ├── layout.tsx                # Layout principal
│   │   └── globals.css               # Estilos globales
│   ├── components/                   # Componentes React
│   │   ├── ui/                       # Componentes base (shadcn/ui)
│   │   ├── common/                   # Componentes comunes
│   │   ├── layout/                   # Sidebar, Header, etc.
│   │   ├── dashboard/                # Componentes del dashboard
│   │   ├── incidents/                # Componentes de incidentes
│   │   ├── categories/               # Componentes de categorías
│   │   └── users/                    # Componentes de usuarios
│   ├── contexts/                     # Context Providers
│   │   └── AuthContext.tsx           # Contexto de autenticación
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useDashboardMetrics.ts
│   │   ├── useIncidentStatistics.ts
│   │   └── useDebounce.ts
│   ├── lib/                          # Librerías y utilidades
│   │   ├── api/                      # Clientes HTTP
│   │   │   ├── client.ts             # Axios configurado
│   │   │   ├── auth.ts               # API de autenticación
│   │   │   ├── incidents.ts          # API de incidentes
│   │   │   ├── categories.ts         # API de categorías
│   │   │   └── users.ts              # API de usuarios
│   │   ├── types/                    # Definiciones TypeScript
│   │   ├── validations/              # Esquemas Zod
│   │   └── utils/                    # Funciones útiles
│   └── public/                       # Archivos estáticos
│       ├── logo.png
│       └── favicon.ico
├── .env.local                        # Variables de entorno
├── .env.example                      # Ejemplo de variables
├── next.config.js                    # Configuración Next.js
├── tailwind.config.ts                # Configuración Tailwind
├── tsconfig.json                     # Configuración TypeScript
└── package.json
```

---

## 🎯 Funcionalidades

### 🔐 Autenticación

- Login con validación de administrador
- Persistencia de sesión (JWT en localStorage)
- Logout funcional
- Redirección automática si no está autenticado

### 📊 Dashboard Principal

- **Métricas en tiempo real**:
  - Total de incidentes
  - Incidentes pendientes
  - Incidentes aprobados
  - Incidentes rechazados
  
- **Gráficas interactivas** (navegables con carrusel):
  - Incidentes por estado
  - Usuarios y administradores activos/inactivos
  - Incidentes por categoría
  - Incidentes por método de contacto
  - Incidentes por red social

- **Actividad reciente**: Últimos 5 incidentes reportados

### 📝 Gestión de Incidentes

- **Listar incidentes**: Con filtros por estado (Todos, Pendientes, Aprobados, Rechazados)
- **Ver detalle**: Información completa del incidente
- **Evaluar**: Aprobar o rechazar incidentes
- **Asignar supervisor**: Asignar administrador responsable
- **Galería de evidencias**: Visualizar imágenes adjuntas
- **Búsqueda**: Por título, descripción o ID

### 📁 Gestión de Categorías

- **Listar categorías**: Grid con tarjetas visuales
- **Crear categoría**: Formulario completo con validación
- **Editar categoría**: Modificar información existente
- **Eliminar categoría**: Con confirmación
- **Ver detalle**: Información completa de la categoría

### 👥 Gestión de Usuarios

- **Listar usuarios**: Tabla con todos los usuarios
- **Ver detalle**: Información completa del usuario
- **Editar usuario**: Modificar nombre, email, rol
- **Activar/Desactivar**: Toggle para cambiar estado
- **Crear usuario**: Formulario para nuevos usuarios
- **Búsqueda**: Por nombre o email

### 👤 Perfil Propio

- **Ver perfil**: Información personal
- **Editar perfil**: Modificar nombre, apellido, email
- **Sin campos de admin**: No puede cambiar su propio rol o estado

---

## 🌐 Despliegue

### Despliegue en Vercel (Recomendado)

Vercel es la plataforma oficial de Next.js:

1. **Conectar repositorio**:
   ```bash
   # Subir código a GitHub
   git push origin main
   ```

2. **Importar en Vercel**:
   - Ir a https://vercel.com
   - Clic en "Import Project"
   - Seleccionar el repositorio del dashboard

3. **Configurar variables de entorno**:
   ```
   NEXT_PUBLIC_API_URL=https://api.ofraud.com
   ```

4. **Deploy**: Vercel compilará y desplegará automáticamente

### Despliegue Manual (Servidor propio)

```bash
# 1. Compilar
npm run build

# 2. Copiar archivos al servidor
scp -r .next package.json package-lock.json user@server:/var/www/dashboard

# 3. En el servidor, instalar dependencias de producción
cd /var/www/dashboard
npm install --production

# 4. Ejecutar con PM2
pm2 start npm --name "ofraud-dashboard" -- start
pm2 save
```

### Configurar Nginx (Opcional)

```nginx
server {
    listen 80;
    server_name dashboard.ofraud.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to API"

**Causa**: El dashboard no puede conectarse al backend.

**Solución**:
1. Verifique que el backend está corriendo
2. Verifique `NEXT_PUBLIC_API_URL` en `.env.local`
3. Verifique CORS en el backend (debe permitir el origen del dashboard)

### Error: "Unauthorized" / "401"

**Causa**: El token JWT expiró o es inválido.

**Solución**:
1. Haga logout y vuelva a iniciar sesión
2. Limpie localStorage:
   ```javascript
   // En la consola del navegador
   localStorage.clear()
   ```

### Error: "Access denied. Only administrators can access"

**Causa**: El usuario no tiene `is_admin: true` en la base de datos.

**Solución**:
Actualice el usuario en la base de datos:
```sql
UPDATE usuario SET is_admin = 1 WHERE correo_electronico = 'admin@example.com';
```

### Error: "Module not found"

**Causa**: Dependencias no instaladas correctamente.

**Solución**:
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "CORS policy" en la consola

**Causa**: El backend no permite peticiones desde el dashboard.

**Solución**: En el backend (`src/main.ts`), configure CORS:
```typescript
app.enableCors({
  origin: ['http://localhost:3000', 'https://dashboard.ofraud.com'],
  credentials: true,
});
```

### Las imágenes de evidencia no cargan

**Causa**: URL incorrecta o el backend no sirve archivos estáticos.

**Solución**:
1. Verifique que `NEXT_PUBLIC_API_URL` es correcta
2. Verifique que el backend tiene configurado `app.useStaticAssets()`
3. Verifique que la carpeta `public/uploads/` existe en el backend

---

## 📱 Responsive Design

El dashboard es completamente responsive:

- ✅ **Desktop**: Vista completa con sidebar
- ✅ **Tablet**: Sidebar colapsable
- ✅ **Móvil**: Menú hamburguesa, tablas adaptativas

---

## 🎨 Personalización

### Cambiar colores del tema

Edite `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'brand-primary': '#your-color',
      'brand-accent': '#your-color',
    }
  }
}
```

### Cambiar logo

Reemplace `public/logo.png` con su logo (formato PNG, fondo transparente recomendado).

---

## 📞 Soporte

Para problemas técnicos o consultas:
- **Email**: a01665906@tec.mx (Santiago Niño).
- **Documentación Backend**: http://localhost:3000/docs

---

## 📝 Notas de Desarrollo

### Scripts disponibles:

```bash
npm run dev          # Desarrollo con hot-reload
npm run build        # Compilar para producción
npm start            # Ejecutar versión de producción
npm run lint         # Verificar código con ESLint
npm run type-check   # Verificar tipos TypeScript
```

### Estructura de rutas:

- `/login` - Página de inicio de sesión
- `/dashboard` - Dashboard principal (requiere auth)
- `/incidents` - Lista de incidentes (requiere auth + admin)
- `/incidents/[id]` - Detalle de incidente
- `/categories` - Gestión de categorías (requiere auth + admin)
- `/users` - Gestión de usuarios (requiere auth + admin)
- `/profile` - Perfil del usuario autenticado

---

**Versión**: 1.0.0  
**Autores**: Santiago Niño, Gabriel Gutiérrez, Omar Llano, Alejandro Vargas  

**Materia**: Integración de Seguridad Informática en Redes y Sistemas de Software. 

**Profesores**: Martín Molina, Alejandra Flores, Irvin Mendiola, Olga Escamilla, Andrés Torres, Diogo Burnay.


**Última actualización**: 2025
