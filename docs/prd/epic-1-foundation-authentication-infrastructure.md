# Epic 1: Foundation & Authentication Infrastructure

**Goal**: Establish the Next.js 14 project with TypeScript, Tailwind CSS, and shadcn/ui components. Implement secure JWT-based authentication for administrators including registration and login flows. Set up the API client layer for backend communication. By the end of this epic, administrators can register accounts, log in securely, and the project is ready for feature development.

## Story 1.1: Project Initialization and Development Environment Setup

As a **developer**,
I want **a fully configured Next.js 14 project with TypeScript, Tailwind CSS, ESLint, and Prettier**,
so that **the team has a consistent, production-ready foundation for building the admin dashboard**.

### Acceptance Criteria

1. Next.js 14+ project initialized using `create-next-app` with TypeScript and App Router enabled
2. Tailwind CSS configured with default theme and working in all pages
3. ESLint configured with TypeScript, React, and Next.js plugins
4. Prettier configured with consistent code style rules and integrated with ESLint
5. Project structure created with directories: `/src/app`, `/src/components`, `/src/lib`, `/src/hooks`, `/src/styles`
6. Environment variables template created (`.env.example`) with `NEXT_PUBLIC_API_BASE_URL`
7. Basic `README.md` with setup instructions and scripts documented
8. Development server runs successfully on `localhost:3000` with a "Hello oFraud" page
9. Git repository initialized (if not already) with initial commit

## Story 1.2: shadcn/ui Component Library Integration

As a **developer**,
I want **shadcn/ui components integrated and a base layout structure created**,
so that **I can rapidly build consistent, accessible UI components throughout the application**.

### Acceptance Criteria

1. shadcn/ui CLI initialized in the project (`npx shadcn-ui@latest init`)
2. Core shadcn/ui components installed: Button, Input, Label, Form, Card, Badge, Dialog, Toast, Dropdown Menu, Table
3. Tailwind configuration updated to include shadcn/ui theme tokens
4. Global styles configured (`/src/styles/globals.css`) with shadcn/ui variables
5. Base layout component created (`/src/components/layout/BaseLayout.tsx`) with consistent spacing and font settings
6. Theme provider configured (if using shadcn/ui theming system)
7. Sample page created demonstrating Button, Input, and Card components rendering correctly
8. All components render with proper Tailwind styling and accessibility attributes

## Story 1.3: API Client Layer and Error Handling

As a **developer**,
I want **a centralized API client with JWT token management and error handling**,
so that **all backend communication is consistent, secure, and provides clear error feedback**.

### Acceptance Criteria

1. API client module created (`/src/lib/api.ts`) with base configuration
2. Axios or fetch wrapper configured with `NEXT_PUBLIC_API_BASE_URL` from environment variables
3. Request interceptor adds JWT token from localStorage/cookies to Authorization header
4. Response interceptor handles common errors:
   - 401 Unauthorized → clear auth state and redirect to login
   - 500 Internal Server Error → return user-friendly error message
   - Network errors → return "Verifique su conexión a Internet" message
5. API client exports typed functions for auth endpoints: `registerAdmin()`, `loginAdmin()`
6. TypeScript interfaces defined for API request/response shapes (`/src/lib/types.ts`)
7. Error response structure matches backend API format (NestJS standard error response)
8. Unit tests written for error interceptor logic (401 redirect, error message transformation)

## Story 1.4: Authentication State Management

As a **developer**,
I want **global authentication state managed with React Context**,
so that **the current user's login status and information are accessible throughout the application**.

### Acceptance Criteria

1. Auth context created (`/src/contexts/AuthContext.tsx`) with state: `user`, `token`, `isAuthenticated`, `isLoading`
2. Auth provider wraps the application in `layout.tsx` or `_app.tsx`
3. Context provides functions: `login(token, user)`, `logout()`, `register(userData)`
4. JWT token persisted to localStorage or httpOnly cookie on login
5. Token validated and user loaded from token on app initialization (page refresh)
6. If token is invalid/expired on load, user is logged out automatically
7. `useAuth()` custom hook created for easy context consumption in components
8. Type safety enforced: `user` object typed with `AdminUser` interface
9. Logout function clears token from storage and resets auth state

## Story 1.5: Admin Registration Page (RF01)

As an **administrator**,
I want **to register a new admin account with my name, email, and password**,
so that **I can access the admin dashboard**.

### Acceptance Criteria

1. Registration page created at `/register` route
2. Form displays fields: Nombre (text), Correo (email), Contraseña (password), Confirmación de Contraseña (password)
3. Form validation using React Hook Form + Zod:
   - Nombre: required, max 50 characters
   - Correo: required, valid email format, max 50 characters
   - Contraseña: required, min 8, max 20 alphanumeric characters
   - Confirmación: required, must match Contraseña
4. Client-side validation displays inline error messages below fields:
   - "Campo de Nombre obligatorio"
   - "Correo electrónico inválido"
   - "Ingresar una contraseña válida con el formato especificado"
   - "La confirmación de contraseña no coincide"
5. Submit button disabled until form is valid
6. On submit, calls API client `registerAdmin()` function
7. API success response (201) displays toast: "¡Registro exitoso! Se ha creado la cuenta de administrador."
8. API error responses handled:
   - 409 Conflict (email exists): "El correo ya está registrado con un usuario existente"
   - 400 Bad Request: Display specific error message from backend
9. After successful registration, user redirected to `/login` page
10. Loading state shown during API call (button shows spinner, form disabled)
11. Link to "¿Ya tienes cuenta? Inicia sesión" navigates to `/login`

## Story 1.6: Admin Login Page (RF02)

As an **administrator**,
I want **to log in with my email and password**,
so that **I can access the admin dashboard and manage the platform**.

### Acceptance Criteria

1. Login page created at `/login` route
2. Form displays fields: Correo (email), Contraseña (password)
3. Form validation using React Hook Form + Zod:
   - Correo: required, valid email format
   - Contraseña: required, min 8 characters
4. Client-side validation displays inline error messages:
   - "Campo de Correo/Contraseña obligatorio"
   - "Correo electrónico inválido"
5. Submit button disabled until form is valid
6. On submit, calls API client `loginAdmin()` function (`POST /auth/login`)
7. API success response:
   - JWT token and user object stored in auth context via `login()` function
   - Toast displayed: "¡Inicio de sesión exitoso! Bienvenido [NOMBRE]"
   - User redirected to `/dashboard` (home page)
8. API error responses handled:
   - 404 Not Found: "Usuario no encontrado"
   - 401 Unauthorized: "Contraseña incorrecta"
   - 400 Bad Request: "Correo electrónico inválido"
9. Loading state shown during API call
10. Link to "¿No tienes cuenta? Regístrate" navigates to `/register`
11. If user is already authenticated (token exists), redirect to `/dashboard` immediately

## Story 1.7: Protected Route Guard

As a **developer**,
I want **all admin routes protected by authentication checks**,
so that **unauthenticated users cannot access the dashboard**.

### Acceptance Criteria

1. Higher-order component or middleware created to protect routes (`/src/components/guards/ProtectedRoute.tsx`)
2. Protected route checks `isAuthenticated` from auth context
3. If not authenticated, user is redirected to `/login` with return URL parameter (e.g., `/login?returnTo=/dashboard`)
4. After successful login, user redirected to original return URL if present
5. Loading state shown while authentication status is being determined (avoid flash of login page)
6. All routes under `/dashboard/*`, `/incidents/*`, `/users/*`, `/categories/*`, `/profile/*` are protected
7. Public routes (`/login`, `/register`) remain accessible without authentication
8. If authenticated user navigates to `/login` or `/register`, redirect to `/dashboard`

---
