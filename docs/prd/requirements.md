# Requirements

## Functional Requirements

**FR1: Admin Registration**
- The system shall allow new administrators to register accounts with name, email, and password
- The system shall validate email uniqueness (no duplicate admin emails)
- The system shall enforce password requirements (8-20 alphanumeric characters)
- The system shall display specific error messages for validation failures ("Campo de Nombre/Correo/Contraseña obligatorio", "El correo ya está registrado", etc.)
- The system shall confirm successful registration with message "¡Registro exitoso! Se ha creado la cuenta de administrador."

**FR2: Admin Authentication**
- The system shall provide a login interface accepting email and password
- The system shall validate credentials against the backend authentication endpoint
- The system shall establish a secure session using JWT tokens upon successful login
- The system shall display welcome message "¡Inicio de sesión exitoso! Bienvenido [NOMBRE]" after login
- The system shall handle authentication errors with specific messages ("Usuario no encontrado", "Contraseña incorrecta", "Correo electrónico inválido")

**FR3: Category Management - Create/Register**
- The system shall provide a form to create new cybercrime categories
- The system shall require fields: título (title), descripción (description), medidas preventivas (prevention measures), nivel de riesgo (risk level)
- The system shall support optional image upload for categories
- The system shall validate uniqueness of category titles
- The system shall display confirmation "¡Categoría registrada exitosamente!" on successful creation

**FR4: Category Management - View/Consult**
- The system shall display a list of all existing cybercrime categories
- The system shall show category cards/rows with title, description, and action buttons
- The system shall allow administrators to view full category details including señales (signs), prevención (prevention), acciones (actions), and ejemplos (examples)
- The system shall provide edit and delete options from the category detail view
- The system shall prevent deletion of categories with associated incidents

**FR5: Incident Management - View/Search/Evaluate**
- The system shall display a comprehensive list of all incidents reported by users
- The system shall provide a search bar supporting queries by: incident ID, título, descripción, and keywords
- The system shall offer category-based filtering
- The system shall display incident cards showing: ID, título, categoría, fecha de creación, estado (status)
- The system shall allow administrators to view full incident details including: descripción, evidencia (evidence URLs), usuario information, supervisor assignment
- The system shall enable status evaluation: assign "Pendiente" (1), "Aprobado" (2), or "Rechazado" (3)
- The system shall allow supervisor assignment (selecting from admin user list)
- The system shall provide filtered views: All incidents, Approved only, Pending only, Rejected only

**FR6: User Administration**
- The system shall display a paginated list of all registered users (both admins and regular users)
- The system shall show user information: nombre, apellido, email, is_admin flag, is_active status
- The system shall provide CRUD operations: Create user, Edit user profile, Activate/Deactivate accounts
- The system shall validate email uniqueness during user creation/editing
- The system shall display confirmation messages for successful operations
- The system shall handle errors gracefully ("El correo ya está registrado", "Usuario no encontrado")

**FR7: Admin Profile Management**
- The system shall allow logged-in administrators to view their own profile information
- The system shall enable profile editing (name, email, password change)
- The system shall validate profile updates using same rules as registration
- The system shall display success confirmation after profile updates

**FR8: Logout Functionality**
- The system shall provide a logout button accessible from the main navigation/profile menu
- The system shall terminate the active session and clear JWT tokens
- The system shall redirect to the login page after logout
- The system shall display confirmation message "Su sesión se ha cerrado correctamente"

**FR9: Dashboard/Home Page (Implied)**
- The system shall provide a dashboard home page displaying key metrics: total incidents, pending incidents count, approved incidents count, rejected incidents count, total users, total categories
- The system shall show recent activity or quick access to common tasks

## Non-Functional Requirements

**NFR1: Performance**
- The system shall load the initial dashboard page in under 3 seconds on standard broadband (50+ Mbps)
- The system shall render incident lists (up to 50 items) in under 1 second
- The system shall execute search queries and return results in under 500 milliseconds
- The system shall support at least 20 concurrent administrator sessions without performance degradation

**NFR2: Security**
- The system shall use HTTPS for all communications in production
- The system shall store JWT tokens securely (httpOnly cookies or encrypted localStorage)
- The system shall validate the is_admin flag on all administrative operations
- The system shall sanitize all user inputs to prevent XSS attacks
- The system shall implement CORS restrictions allowing only authorized frontend domains
- The system shall enforce password hashing and salting via the existing backend mechanism

**NFR3: Usability**
- The system shall provide a Spanish-language interface for all UI elements and messages
- The system shall display user-friendly error messages matching the requirements specification
- The system shall follow consistent design patterns using shadcn/ui component library
- The system shall be accessible via keyboard navigation for core workflows
- The system shall provide clear visual feedback for all user actions (loading states, success/error messages)

**NFR4: Maintainability**
- The system shall use TypeScript with strict mode for type safety
- The system shall follow Next.js App Router conventions for file-based routing
- The system shall organize components into reusable, testable modules
- The system shall document API integration points and error handling strategies
- The system shall use consistent code formatting (Prettier) and linting (ESLint)

**NFR5: Compatibility**
- The system shall support modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- The system shall be optimized for desktop/laptop screens (1280x720 minimum resolution)
- The system shall be acceptable (functional but not optimized) on tablets (iPad, Android 10"+)
- The system shall integrate with the existing NestJS backend API without modifications

**NFR6: Scalability**
- The system shall handle incident lists with pagination (default 50 items per page)
- The system shall support database growth to 10,000+ users and 50,000+ incidents without major refactoring
- The system shall use efficient API calls (avoid N+1 queries, batch requests where possible)

**NFR7: Availability**
- The system shall target 99.5% uptime (excluding planned maintenance)
- The system shall gracefully handle backend API failures with informative user messages
- The system shall implement retry logic for transient network errors

---
