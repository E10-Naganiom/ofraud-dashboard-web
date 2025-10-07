# Epic 2: Incident Management System

**Goal**: Build the complete incident administration workflow enabling administrators to view, search, filter, and evaluate cybercrime reports. This epic delivers comprehensive incident management including detailed views, status evaluation, supervisor assignment, and filtered list views (all, pending, approved, rejected). This is the highest-value feature for administrators.

## Story 2.1: Incident List Page with Basic Display

As an **administrator**,
I want **to view a paginated list of all cybercrime incidents reported by users**,
so that **I can see at a glance the current incident landscape and identify reports needing attention**.

### Acceptance Criteria

1. Incident list page created at `/dashboard/incidents` route
2. Page layout includes: page title "Incidentes Reportados", search bar placeholder, filter controls area, incident list container
3. On page load, fetch all incidents via API client: `GET /admin/incidents/list`
4. Display incidents in card or table format with columns/fields:
   - ID (numeric)
   - Título (text, max 50 chars displayed, ellipsis if longer)
   - Categoría (display category title from `id_categoria`)
   - Fecha de Creación (formatted as "DD/MM/YYYY HH:mm")
   - Estado (status badge)
5. Status badges color-coded:
   - Pendiente (id_estatus=1): Yellow/Amber badge
   - Aprobado (id_estatus=2): Green badge
   - Rechazado (id_estatus=3): Red badge
6. Pagination implemented: default 50 incidents per page, with "Previous" and "Next" buttons
7. Loading state shown while fetching data (skeleton cards or spinner)
8. Empty state displayed if no incidents exist: "No se encontraron incidentes"
9. Error state handled gracefully: if API call fails, display "Error al cargar incidentes. Intente nuevamente."
10. Each incident card/row is clickable and navigates to detail page `/dashboard/incidents/[id]`

## Story 2.2: Incident Search Functionality

As an **administrator**,
I want **to search incidents by ID, title, description, or keywords**,
so that **I can quickly find specific reports without scrolling through long lists**.

### Acceptance Criteria

1. Search input field added to incident list page (top of page, prominent placement)
2. Search input placeholder text: "Buscar por ID, título, descripción, o palabras clave..."
3. Search debounced to avoid excessive API calls (500ms delay after user stops typing)
4. On search input, filter displayed incidents client-side OR make new API call with search parameter (depending on backend support)
5. If backend supports search parameter: API call includes query param `?search=[query]`
6. If client-side filtering: filter incidents array by matching query against `id`, `titulo`, `descripcion` fields (case-insensitive)
7. Search results update incident list in real-time
8. If no matches found, display: "No se encontraron incidentes que coincidan con '[query]'"
9. Clear search button (X icon) shown when search input has text
10. Clicking clear button resets search and shows all incidents

## Story 2.3: Incident Category Filter

As an **administrator**,
I want **to filter incidents by cybercrime category**,
so that **I can focus on specific types of incidents (e.g., phishing, fraud, etc.)**.

### Acceptance Criteria

1. Category filter dropdown added to incident list page (near search bar)
2. Dropdown populated with all categories fetched from `GET /categories`
3. Dropdown options display category title
4. Default option: "Todas las categorías" (shows all incidents)
5. When category selected, filter incident list to show only incidents with matching `id_categoria`
6. Filtering can be client-side OR via API parameter (e.g., `?id_categoria=[id]`)
7. Filter works in conjunction with search (both filters applied simultaneously)
8. Selected filter persists in UI state (dropdown shows selected category)
9. Clearing filter (selecting "Todas las categorías") shows all incidents again
10. If no incidents match selected category, display: "No se encontraron incidentes en esta categoría"

## Story 2.4: Incident Detail View Page

As an **administrator**,
I want **to view the complete details of an incident including evidence, user information, and evaluation controls**,
so that **I can make informed decisions about approving or rejecting the report**.

### Acceptance Criteria

1. Incident detail page created at `/dashboard/incidents/[id]` dynamic route
2. On page load, fetch incident details via `GET /admin/incidents/[id]`
3. Display full incident information:
   - Título
   - Descripción (full text, not truncated)
   - Categoría (display full category name and description)
   - Nombre del atacante (if provided, otherwise "No especificado")
   - Teléfono (if provided)
   - Correo electrónico del atacante (if provided)
   - Usuario de red social (if provided)
   - Red social (if provided)
   - Fecha de creación (formatted "DD/MM/YYYY HH:mm")
   - Fecha de actualización (formatted)
   - Estado actual (badge with color)
   - Supervisor asignado (display supervisor name if assigned, otherwise "Sin asignar")
   - Es anónimo (display "Sí" or "No")
4. Display reporter information:
   - Fetch user details via `id_usuario` (may require separate API call to `/admin/user/[id_usuario]`)
   - Show: Nombre, Apellido, Correo electrónico
5. Display evidence images:
   - Fetch evidence via `evidencia` table (URLs)
   - Display images in gallery or list (clickable to open full-size in modal or new tab)
   - If no evidence, display "Sin evidencia adjunta"
6. Loading state while fetching data
7. Error handling: if incident not found (404), display "Incidente no encontrado" and back button
8. "Volver a lista" button navigates back to `/dashboard/incidents`

## Story 2.5: Incident Status Evaluation (RF05 - Assign Status)

As an **administrator**,
I want **to evaluate incidents and assign status (Pendiente, Aprobado, Rechazado)**,
so that **I can approve legitimate reports and reject spam or invalid submissions**.

### Acceptance Criteria

1. Incident detail page includes evaluation controls section
2. Status dropdown displays current status and allows selection:
   - Pendiente (1)
   - Aprobado (2)
   - Rechazado (3)
3. Status dropdown only enabled if user is admin (check `is_admin` flag)
4. "Guardar Evaluación" button enabled when status is changed from original value
5. On button click, call API: `PATCH /admin/incidents/[id]/evaluate` with body `{ id_estatus: [selected_status], supervisor: [current_supervisor] }`
6. API success response:
   - Toast notification: "Incidente evaluado exitosamente"
   - Incident detail view updates with new status badge
7. API error response:
   - Display error message: "Error al evaluar incidente. Intente nuevamente."
8. Loading state during API call (button shows spinner, form disabled)
9. Status change logged (backend should handle audit trail, not frontend responsibility)

## Story 2.6: Supervisor Assignment

As an **administrator**,
I want **to assign a supervisor (admin user) to an incident**,
so that **accountability is clear and workload can be distributed among admins**.

### Acceptance Criteria

1. Incident detail page includes supervisor assignment dropdown
2. Dropdown populated with all admin users fetched from `GET /admin/user/list` filtered by `is_admin=true`
3. Dropdown options display: "Nombre Apellido" of each admin
4. Default option: "Sin asignar" (supervisor=null)
5. Current supervisor pre-selected in dropdown (if incident already has supervisor assigned)
6. When supervisor changed, update state but do not immediately save (save on "Guardar Evaluación" button click)
7. "Guardar Evaluación" button saves both status and supervisor changes via `PATCH /admin/incidents/[id]/evaluate` with body `{ id_estatus: [status], supervisor: [selected_admin_id] }`
8. API success response updates incident view with new supervisor name
9. If API returns error, display: "Error al asignar supervisor"

## Story 2.7: Filtered Incident Views (Approved, Pending, Rejected)

As an **administrator**,
I want **quick access to incidents filtered by status (Approved, Pending, Rejected)**,
so that **I can efficiently triage new reports and review evaluation history**.

### Acceptance Criteria

1. Navigation tabs or buttons added to incident list page: "Todos", "Pendientes", "Aprobados", "Rechazados"
2. Clicking "Todos" shows all incidents (default view)
3. Clicking "Pendientes" filters to incidents with `id_estatus=1` via `GET /admin/incidents/list/pending`
4. Clicking "Aprobados" filters to incidents with `id_estatus=2` via `GET /admin/incidents/list/approved`
5. Clicking "Rechazados" filters to incidents with `id_estatus=3` via `GET /admin/incidents/list/rejected`
6. Active tab/button highlighted with different background color
7. Search and category filters work in conjunction with status filter
8. Each filtered view shows appropriate empty state:
   - "No hay incidentes pendientes"
   - "No hay incidentes aprobados"
   - "No hay incidentes rechazados"
9. Incident count badge shown on each tab (e.g., "Pendientes (12)")

---
