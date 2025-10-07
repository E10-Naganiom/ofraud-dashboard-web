# Technical Assumptions

## Repository Structure: Monorepo

The project will use a **monorepo structure** with separate directories for frontend and backend within the same Git repository:

```
ofraud-dashboard-web/
├── backend/          # Existing NestJS API
├── frontend/         # New Next.js admin dashboard
├── docs/             # Shared documentation (brief, PRD, architecture)
├── .bmad-core/       # Project management tools
└── README.md
```

**Rationale**:
- **Coordination**: Frontend and backend development can be tracked in the same commit history
- **Shared documentation**: Project Brief, PRD, and Architecture docs accessible to both teams
- **Simplified CI/CD**: Single repository for deployment pipelines
- **Version alignment**: Frontend and API versions stay synchronized

**Alternative considered**: Polyrepo (separate repos for frontend/backend) was rejected because the backend is already feature-complete and development is tightly coupled during MVP phase.

## Service Architecture

**Frontend**: Next.js 14+ with App Router (React Server Components + Client Components)
- **Monolithic frontend application** with file-based routing
- **API client layer** (`/frontend/src/lib/api.ts`) centralizing all backend communication
- **No serverless functions in MVP** (all business logic in existing NestJS backend)

**Backend**: Existing NestJS monolith (no changes required for MVP)
- RESTful API with Swagger documentation
- MySQL database
- JWT authentication

**Communication**: Frontend ↔ Backend via REST API over HTTPS
- All API calls through centralized client with error handling
- JWT tokens passed in Authorization header

**Rationale**:
- **Simplicity**: Monolithic architecture minimizes complexity for MVP
- **No backend refactoring**: Leverage existing API as-is
- **Future-proofing**: Architecture allows for future extraction of services (e.g., separate auth service) if needed

## Testing Requirements

**MVP Testing Strategy**:

1. **Manual Testing** (Primary for MVP):
   - Admin user testing of all 8 functional requirements
   - Cross-browser compatibility testing (Chrome, Firefox, Safari, Edge)
   - Exploratory testing of edge cases

2. **Unit Tests** (Selective):
   - Utility functions (e.g., date formatting, validation helpers)
   - API client error handling logic
   - Critical business logic if any exists on frontend (e.g., status badge color selection)
   - **Target**: 30-40% code coverage (focus on high-risk areas)

3. **Integration Tests** (Post-MVP):
   - End-to-end testing with Playwright or Cypress
   - Test critical user journeys (login → evaluate incident → logout)
   - **Target**: 5-10 key workflows covered

4. **Backend API Testing** (Existing):
   - Assume backend has adequate test coverage (NestJS e2e tests)
   - Frontend team should have access to Swagger docs for API contract validation

**Testing Tools**:
- **Unit**: Vitest (faster than Jest, better ESM support)
- **E2E** (Post-MVP): Playwright
- **Linting**: ESLint with TypeScript plugins
- **Type Checking**: TypeScript strict mode

**Rationale**:
- **Speed over coverage**: MVP timeline (8 weeks) prioritizes delivery over exhaustive testing
- **Risk-based approach**: Focus tests on authentication, API integration, and data mutation operations
- **Manual testing first**: Validate UX and workflows with real users before investing in automation
- **Post-MVP automation**: Once MVP is validated, invest in comprehensive E2E test suite

## Additional Technical Assumptions and Requests

**1. State Management**:
- **React Context API** for global auth state (current user, JWT token)
- **Zustand** (optional) if complex state management needs arise (e.g., offline mode, optimistic updates)
- **No Redux**: Overkill for this application size

**2. Form Handling**:
- **React Hook Form** for all form state and validation
- **Zod** for schema validation (integrates with React Hook Form)
- Validation rules mirror backend DTOs to provide immediate feedback

**3. Data Fetching**:
- **Axios** or **native fetch** with custom wrapper for:
  - Automatic JWT token injection
  - Error response transformation
  - Request/response logging (dev mode only)
- **SWR or React Query** (optional) for caching and revalidation (Post-MVP optimization)

**4. Styling**:
- **Tailwind CSS 3.x** with default configuration
- **shadcn/ui components** for buttons, inputs, modals, dropdowns, tables, etc.
- **Framer Motion** for subtle animations (page transitions, modal entrance/exit)
- **CSS Modules** for any custom styles not achievable with Tailwind

**5. Environment Configuration**:
- **Environment variables** for API base URL, authentication settings
  ```
  NEXT_PUBLIC_API_BASE_URL=https://api.ofraud.com
  NEXT_PUBLIC_APP_NAME=oFraud Admin Dashboard
  ```
- Separate `.env.local` (development) and `.env.production` files

**6. Error Handling**:
- **Error boundaries** to catch React rendering errors
- **API error interceptor** to handle common errors (401 Unauthorized → redirect to login, 500 Internal Server Error → user-friendly message)
- **Toast notifications** (shadcn/ui Toast component) for success/error feedback

**7. Build and Deployment**:
- **Vercel** (recommended for Next.js) or AWS Amplify/S3+CloudFront
- **Automatic deployments** from `main` branch (production) and `develop` branch (staging)
- **Environment-specific builds** with appropriate API URLs

**8. Code Quality**:
- **Prettier** for code formatting (auto-format on save)
- **ESLint** with TypeScript, React, and Next.js plugins
- **Husky** + **lint-staged** for pre-commit hooks (format and lint staged files)
- **Conventional Commits** for commit messages (optional but recommended)

**9. Development Workflow**:
- **Feature branches** for all new work (`feature/FR01-admin-registration`, etc.)
- **Pull requests** required before merging to `develop` or `main`
- **Code reviews** (if team size allows, or self-review with checklist)

**10. Logging and Monitoring** (Post-MVP):
- **Console logging** for development debugging
- **Sentry** or similar for production error tracking (free tier)
- **Vercel Analytics** for basic performance monitoring

**11. Internationalization** (Out of Scope for MVP):
- Interface will be Spanish-only for MVP
- Code should avoid hard-coded strings where possible (use constants file)
- Future: Implement i18n library (next-intl or react-i18next) for multi-language support

**12. Backend API Assumptions**:
- API is stable and production-ready
- Swagger documentation is accurate and up-to-date
- CORS is configured to allow frontend domain
- Rate limiting is acceptable for admin use patterns (less concern than public API)
- Backend team available for questions but no code changes required

---
