# Epic 3: User Administration & Profile Management

**Goal**: Provide comprehensive user management capabilities enabling administrators to view all registered users, create new accounts, edit user profiles, activate/deactivate accounts, and manage their own admin profile. This epic ensures full control over the user base and account lifecycle.

## Story 3.1: User List Page with Basic Display

As an **administrator**,
I want **to view a paginated list of all registered users (both admins and regular users)**,
so that **I can monitor the user base and identify accounts needing management**.

### Acceptance Criteria

1. User list page created at `/dashboard/users` route
2. Page layout includes: page title "Gestión de Usuarios", search bar placeholder, user list container, "Crear Usuario" button
3. On page load, fetch all users via `GET /admin/user/list`
4. Display users in table format with columns:
   - ID (numeric)
   - Nombre completo (concatenate `nombre` + `apellido`)
   - Correo electrónico
   - Rol (badge: "Admin" if `is_admin=true`, "Usuario" if `is_admin=false`)
   - Estado (badge: "Activo" if `is_active=true`, "Inactivo" if `is_active=false`)
   - Acciones (edit icon, activate/deactivate toggle)
5. Pagination: default 50 users per page with "Previous" and "Next" buttons
6. Loading state shown while fetching data
7. Empty state: "No hay usuarios registrados"
8. Error state: "Error al cargar usuarios. Intente nuevamente."
9. Each user row clickable navigates to edit page `/dashboard/users/[id]/edit`

## Story 3.2: User Search Functionality

As an **administrator**,
I want **to search users by name or email**,
so that **I can quickly locate specific accounts**.

### Acceptance Criteria

1. Search input field added to user list page (top of page)
2. Placeholder text: "Buscar por nombre o correo electrónico..."
3. Search debounced (500ms delay)
4. Client-side filtering: match query against `nombre`, `apellido`, `email` fields (case-insensitive)
5. Search results update user list in real-time
6. If no matches: "No se encontraron usuarios que coincidan con '[query]'"
7. Clear search button (X icon) resets search
8. Search persists in URL query param for bookmarking (e.g., `?search=john`)

## Story 3.3: Create New User (RF06 - Create)

As an **administrator**,
I want **to manually create new user accounts with specified details**,
so that **I can onboard users or admins without requiring self-registration**.

### Acceptance Criteria

1. "Crear Usuario" button on user list page opens create modal or navigates to `/dashboard/users/new`
2. Create user form displays fields:
   - Nombre (text, required, max 50 chars)
   - Apellido (text, required, max 50 chars)
   - Correo electrónico (email, required, unique, max 190 chars)
   - Contraseña (password, required, min 8, max 20 alphanumeric)
   - Confirmación de contraseña (password, required, must match)
   - Es administrador (checkbox for `is_admin` flag)
   - Cuenta activa (toggle for `is_active` flag, default true)
3. Form validation using React Hook Form + Zod:
   - All required fields validated
   - Email format validated
   - Password strength validated
   - Confirmation matches password
4. Submit button disabled until form valid
5. On submit, call API: `POST /admin/user` (endpoint may need to be created or use existing user creation endpoint)
6. API success response (201):
   - Toast: "Usuario creado exitosamente"
   - Modal closes (if modal) or navigate back to user list
   - User list refreshes to show new user
7. API error responses:
   - 409 Conflict (email exists): "El correo ya está registrado"
   - 400 Bad Request: Display specific validation error
8. Loading state during API call
9. "Cancelar" button closes modal/navigates back without saving

## Story 3.4: Edit User Profile (RF06 - Edit)

As an **administrator**,
I want **to edit user account details including name, email, role, and active status**,
so that **I can update user information and permissions as needed**.

### Acceptance Criteria

1. Clicking edit icon on user list row or user detail page navigates to `/dashboard/users/[id]/edit`
2. Edit user form pre-populated with current user data fetched from `GET /admin/user/[id]`
3. Form displays editable fields:
   - Nombre (text, required, max 50 chars)
   - Apellido (text, required, max 50 chars)
   - Correo electrónico (email, required, unique, max 190 chars)
   - Es administrador (checkbox for `is_admin` flag)
   - Cuenta activa (toggle for `is_active` flag)
4. Password fields NOT shown (password changes handled separately or not in MVP)
5. Form validation same as create user
6. Submit button enabled only if form valid and data changed
7. On submit, call API: `PUT /admin/user/[id]` with updated user data
8. API success response (200):
   - Toast: "Usuario actualizado exitosamente"
   - Navigate back to user list or refresh user detail view
9. API error responses:
   - 404 Not Found: "Usuario no encontrado"
   - 409 Conflict (email exists): "El correo ya está registrado"
10. Loading state during API call
11. "Cancelar" button navigates back without saving

## Story 3.5: Activate/Deactivate User (RF06 - Inactivate)

As an **administrator**,
I want **to activate or deactivate user accounts**,
so that **I can prevent login for suspended accounts without permanently deleting them**.

### Acceptance Criteria

1. User list table includes "Estado" toggle switch or icon button for each user
2. Toggle shows current state: "Activo" (green) or "Inactivo" (gray/red)
3. Clicking toggle prompts confirmation dialog: "¿Está seguro de que desea [activar/inactivar] esta cuenta?"
4. On confirmation, call API: `PATCH /admin/user/[id]/inactivate` (or similar endpoint to update `is_active`)
5. API success response:
   - Toast: "Usuario [activado/inactivado] exitosamente"
   - User list updates toggle state immediately
   - User row may be visually dimmed if inactive
6. API error response:
   - 404 Not Found: "Usuario no encontrado"
   - Display error toast
7. Loading state on toggle during API call (spinner or disabled state)
8. Deactivated users should NOT be able to log in (enforced by backend)

## Story 3.6: Admin Profile View and Edit (RF07)

As an **administrator**,
I want **to view and edit my own profile information**,
so that **I can keep my account details up-to-date**.

### Acceptance Criteria

1. Admin profile page created at `/dashboard/profile` route
2. Navigation link to "Mi Perfil" in sidebar or top menu
3. On page load, display current admin user data from auth context or fetch via `GET /admin/user/[current_user_id]`
4. Profile view displays:
   - Nombre
   - Apellido
   - Correo electrónico
   - Rol: "Administrador" (badge)
   - Cuenta activa: "Sí" (badge)
5. "Editar Perfil" button opens edit mode (inline edit or navigate to `/dashboard/profile/edit`)
6. Edit mode displays form fields (same validation as user edit):
   - Nombre (text, required, max 50 chars)
   - Apellido (text, optional if not in original schema, otherwise required)
   - Correo electrónico (email, required, unique)
7. Optional: "Cambiar Contraseña" section with fields:
   - Contraseña actual (password, required for password change)
   - Nueva contraseña (password, required, min 8 chars)
   - Confirmar nueva contraseña (password, must match)
8. On submit, call API: `PUT /admin/user/[current_user_id]` or `PUT /users/profile` (depending on backend routing)
9. API success response:
   - Toast: "Perfil actualizado exitosamente"
   - Update auth context with new user data
   - Return to profile view mode
10. API error responses handled (409 email conflict, 400 validation errors)
11. "Cancelar" button returns to view mode without saving

---
