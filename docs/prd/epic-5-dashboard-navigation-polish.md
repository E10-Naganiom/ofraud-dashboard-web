# Epic 5: Dashboard, Navigation & Polish

**Goal**: Create the admin dashboard home page displaying key metrics and recent activity. Refine overall navigation structure for seamless movement between sections. Implement logout functionality. Polish the UI for consistency, accessibility, and production-readiness. This epic delivers the final cohesive MVP experience.

## Story 5.1: Dashboard Home Page with Metrics (FR09 - Implied)

As an **administrator**,
I want **to see a dashboard home page with key metrics and recent activity**,
so that **I can quickly understand the platform's current state when I log in**.

### Acceptance Criteria

1. Dashboard home page created at `/dashboard` route (default landing after login)
2. Page layout includes: page title "Panel de Administración", metrics widgets section, recent activity section
3. Metrics widgets display:
   - Total de incidentes (fetch from `GET /admin/incidents/list`, count all)
   - Incidentes pendientes (count where `id_estatus=1`)
   - Incidentes aprobados (count where `id_estatus=2`)
   - Incidentes rechazados (count where `id_estatus=3`)
   - Total de usuarios (fetch from `GET /admin/user/list`, count all)
   - Total de categorías (fetch from `GET /categories`, count all)
4. Each metric displayed in card with large number, label, and icon
5. Recent activity section displays:
   - Last 5-10 incidents created (sorted by `fecha_creacion` desc)
   - Show: Título (truncated), Categoría, Fecha, Estado badge
   - Clickable to navigate to incident detail
6. "Ver todos los incidentes" link navigates to `/dashboard/incidents`
7. Loading state shown while fetching metrics
8. Error handling: if metrics fail to load, show partial data with error message for failed widgets

## Story 5.2: Main Navigation Structure

As an **administrator**,
I want **clear navigation between all major sections of the dashboard**,
so that **I can quickly switch between incidents, users, categories, and my profile**.

### Acceptance Criteria

1. Navigation component created (sidebar or top navbar)
2. Navigation links:
   - "Panel" → `/dashboard` (home icon)
   - "Incidentes" → `/dashboard/incidents` (list icon)
   - "Usuarios" → `/dashboard/users` (users icon)
   - "Categorías" → `/dashboard/categories` (tag icon)
   - "Mi Perfil" → `/dashboard/profile` (user icon)
3. Active route highlighted with different background/text color
4. Navigation visible on all dashboard pages (persistent layout)
5. Mobile responsiveness: navigation collapses to hamburger menu on small screens (Post-MVP: acceptable if not perfect for MVP)
6. Icons used from Lucide React or Heroicons (consistent icon set)
7. User info displayed in navigation (name, role badge)
8. "Cerrar sesión" button in navigation (handled in Story 5.3)

## Story 5.3: Logout Functionality (RF08)

As an **administrator**,
I want **to securely log out of the dashboard**,
so that **my session is terminated and no one else can access my account from this device**.

### Acceptance Criteria

1. "Cerrar sesión" button added to navigation (sidebar footer or profile dropdown)
2. Button displays logout icon and text "Cerrar sesión"
3. On button click, call auth context `logout()` function:
   - Clear JWT token from localStorage/cookies
   - Reset auth state (`user=null`, `isAuthenticated=false`)
4. After logout, redirect user to `/login` page
5. Toast notification displayed: "Su sesión se ha cerrado correctamente"
6. If backend requires explicit logout endpoint (e.g., `POST /auth/logout` to invalidate token), call it before clearing client state
7. After logout, user cannot access protected routes (redirected to login if they try)
8. No confirmation dialog needed (logout should be immediate)

## Story 5.4: UI Consistency and Accessibility Audit

As a **developer**,
I want **all pages to follow consistent design patterns and meet accessibility standards**,
so that **the dashboard is professional, usable, and compliant with WCAG AA**.

### Acceptance Criteria

1. All pages use consistent color palette (primary, success, warning, danger, neutral from Tailwind config)
2. All buttons use shadcn/ui Button component with consistent variants (default, destructive, outline, ghost)
3. All forms use shadcn/ui Form components with consistent label/input/error styling
4. All modals use shadcn/ui Dialog component
5. All toasts use shadcn/ui Toast component with consistent positioning (top-right)
6. Typography consistent: headings (text-2xl, text-xl, text-lg), body (text-base), small (text-sm)
7. Spacing consistent: use Tailwind spacing scale (p-4, mb-6, gap-2, etc.)
8. Accessibility checks:
   - All interactive elements keyboard accessible (Tab navigation works)
   - All buttons and links have visible focus outlines
   - All form inputs have associated labels (visible or aria-label)
   - All images have alt text
   - Color contrast meets WCAG AA (4.5:1 for text)
9. Responsive checks: test on 1280x720, 1920x1080 resolutions
10. Cross-browser checks: test on Chrome, Firefox, Safari

## Story 5.5: Error Handling and Loading States Standardization

As a **developer**,
I want **consistent error handling and loading states across all API interactions**,
so that **users always receive clear feedback and the application feels polished**.

### Acceptance Criteria

1. All API calls wrapped in try-catch blocks
2. Loading states:
   - Display shadcn/ui Skeleton components or spinner during data fetching
   - Disable form submit buttons during API calls (show spinner in button)
   - Page-level loading: display full-page skeleton or loading overlay
3. Error states:
   - API errors displayed via shadcn/ui Toast (error variant, red background)
   - Error messages match requirements spec (Spanish, user-friendly)
   - Network errors: "No se pudo conectar al servidor. Verifique su conexión a Internet."
   - 401 errors: automatically logout and redirect to login
   - 500 errors: "Ha ocurrido un error en el servidor. Intente más tarde."
4. Empty states:
   - Display friendly message when lists are empty (e.g., "No hay incidentes", "No se encontraron resultados")
   - Include helpful action (e.g., "Crear nueva categoría" button on empty category list)
5. Success feedback:
   - Display success toast for all create/update/delete operations
   - Toasts auto-dismiss after 3-5 seconds
6. Retry mechanisms:
   - "Reintentar" button on error states for failed API calls
   - Refresh page button on critical failures

## Story 5.6: Documentation and Deployment Preparation

As a **developer**,
I want **complete setup documentation and deployment configuration**,
so that **the application can be easily deployed to production and maintained by the team**.

### Acceptance Criteria

1. README.md updated with:
   - Project description and architecture overview
   - Prerequisites (Node.js version, dependencies)
   - Setup instructions (clone, install, configure environment variables)
   - Development scripts: `npm run dev`, `npm run build`, `npm run lint`
   - Deployment instructions (Vercel or chosen platform)
2. Environment variables documented in `.env.example`:
   - `NEXT_PUBLIC_API_BASE_URL` (backend API URL)
   - Any other required variables
3. Production build tested: `npm run build` succeeds without errors
4. Deployment configuration:
   - If Vercel: `vercel.json` or Vercel dashboard settings configured
   - If other platform: deployment scripts or CI/CD pipeline documented
5. Environment-specific configurations:
   - Development: API points to localhost or staging backend
   - Production: API points to production backend URL
6. Security checklist:
   - No API keys or secrets committed to repository
   - HTTPS enforced in production (redirect HTTP to HTTPS)
   - JWT tokens secured (httpOnly cookies or encrypted storage)
   - CORS properly configured on backend
7. Testing checklist:
   - All 8 functional requirements manually tested end-to-end
   - Cross-browser testing completed
   - Performance baseline met (dashboard loads <3s)
8. Handoff documentation:
   - Known issues/limitations documented
   - Post-MVP roadmap items listed (Phase 2 features from Project Brief)

---
