# Epic 4: Category Management System

**Goal**: Implement the cybercrime category taxonomy administration interface with full CRUD operations (create, read, update, delete). Administrators can manage the classification system used by end-users in the mobile app to report incidents. This epic ensures category data remains accurate and comprehensive.

## Story 4.1: Category List Page with Basic Display

As an **administrator**,
I want **to view a list of all cybercrime categories**,
so that **I can review the current taxonomy and identify categories needing updates**.

### Acceptance Criteria

1. Category list page created at `/dashboard/categories` route
2. Page layout includes: page title "Gestión de Categorías", category grid/list container, "Crear Categoría" button
3. On page load, fetch all categories via `GET /categories`
4. Display categories in card grid format (3-4 columns on desktop) with:
   - Título (heading)
   - Descripción (preview, max 100 chars, ellipsis if longer)
   - Nivel de riesgo (badge with color: Alto=red, Medio=orange, Bajo=yellow, Muy Bajo=green)
   - Acciones (edit icon, delete icon)
5. Categories sorted by risk level (highest first) or alphabetically by title
6. Loading state shown while fetching
7. Empty state: "No hay categorías registradas"
8. Error state: "Error al cargar categorías"
9. Clicking category card opens detail view `/dashboard/categories/[id]`

## Story 4.2: Category Detail View

As an **administrator**,
I want **to view the complete information for a cybercrime category including prevention tips and examples**,
so that **I can understand how the category is presented to end-users**.

### Acceptance Criteria

1. Category detail page created at `/dashboard/categories/[id]` route
2. On page load, fetch category details via `GET /categories/[id]`
3. Display full category information:
   - Título
   - Descripción (full text)
   - Nivel de riesgo (badge)
   - Señales (signs/indicators, full text)
   - Prevención (prevention measures, full text)
   - Acciones (recommended actions, full text)
   - Ejemplos (examples, full text)
   - Imagen (display image if URL exists, otherwise placeholder)
4. "Editar" button navigates to edit page `/dashboard/categories/[id]/edit`
5. "Eliminar" button triggers delete confirmation (Story 4.5)
6. "Volver a lista" button navigates back to `/dashboard/categories`
7. Loading state while fetching
8. Error handling: if category not found (404), display "Categoría no encontrada"

## Story 4.3: Create New Category (RF03)

As an **administrator**,
I want **to create new cybercrime categories with all relevant information**,
so that **users have accurate classifications when reporting incidents**.

### Acceptance Criteria

1. "Crear Categoría" button on category list page navigates to `/dashboard/categories/new`
2. Create category form displays fields:
   - Título (text, required, unique, max 255 chars)
   - Descripción (textarea, required, max 500 chars)
   - Nivel de riesgo (dropdown: 1=Muy Bajo, 2=Bajo, 3=Medio, 4=Alto, required)
   - Señales (textarea, optional, max 500 chars)
   - Prevención (textarea, required, max 500 chars)
   - Acciones (textarea, optional, max 500 chars)
   - Ejemplos (textarea, optional, max 500 chars)
   - Imagen (file upload, optional, accept image formats: jpg, png, webp)
3. Form validation using React Hook Form + Zod:
   - Required fields validated
   - Title uniqueness validated (backend enforcement)
   - Character limits enforced
4. Image upload:
   - On file select, upload to backend via `POST /files/upload`
   - Store returned image URL in form state
   - Display image preview
5. Submit button disabled until form valid
6. On submit, call API: `POST /categories` with category data (including image URL if uploaded)
7. API success response (201):
   - Toast: "¡Categoría registrada exitosamente!"
   - Navigate to category detail page or back to category list
8. API error responses:
   - 409 Conflict (title exists): "La categoría ya está registrada"
   - 400 Bad Request: Display specific validation errors
9. Loading state during API call
10. "Cancelar" button navigates back without saving

## Story 4.4: Edit Category (RF04 - Edit from Detail View)

As an **administrator**,
I want **to edit existing category information**,
so that **I can update descriptions, prevention tips, and examples as cybercrime trends evolve**.

### Acceptance Criteria

1. Edit category page created at `/dashboard/categories/[id]/edit`
2. Form pre-populated with current category data fetched from `GET /categories/[id]`
3. Form displays same fields as create category (all editable except ID)
4. Image upload:
   - Display current image if exists
   - Allow replacing image (upload new file via `POST /files/upload`)
   - "Eliminar imagen" button to remove image (set URL to null)
5. Form validation same as create category
6. Submit button enabled only if form valid and data changed
7. On submit, call API: `PUT /categories/[id]` with updated category data
8. API success response (200):
   - Toast: "Categoría actualizada exitosamente"
   - Navigate back to category detail page or list
9. API error responses:
   - 404 Not Found: "Categoría no encontrada"
   - 409 Conflict (title exists): "El título de categoría ya está registrado"
10. Loading state during API call
11. "Cancelar" button navigates back without saving

## Story 4.5: Delete Category (RF04 - Delete from Detail View)

As an **administrator**,
I want **to delete cybercrime categories that are no longer relevant**,
so that **the taxonomy remains focused and up-to-date**.

### Acceptance Criteria

1. "Eliminar" button on category detail page triggers delete action
2. Confirmation dialog displayed: "¿Está seguro de que desea eliminar esta categoría? Esta acción no se puede deshacer."
3. If category has associated incidents (check via `GET /categories/[id]/statistics` or backend validation):
   - Display error: "No se puede eliminar la categoría. Tiene incidentes asociados."
   - Do not proceed with deletion
4. If no associated incidents, on confirmation call API: `DELETE /categories/[id]`
5. API success response (200):
   - Toast: "Categoría eliminada exitosamente"
   - Navigate back to category list
6. API error responses:
   - 404 Not Found: "Categoría no encontrada"
   - 400 Bad Request (has incidents): "No se puede eliminar la categoría (tiene incidentes asociados)"
7. Loading state during API call (dialog remains open with spinner)
8. "Cancelar" in dialog closes dialog without deleting

---
