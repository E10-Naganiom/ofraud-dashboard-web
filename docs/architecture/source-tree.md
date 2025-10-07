# Source Tree Structure

## Overview

This document describes the directory structure and file organization of the oFraud Web Admin Dashboard frontend application. The project follows Next.js 15 App Router conventions with clear separation of concerns.

---

## Root Directory Structure

```
ofraud-dashboard-web/
├── .bmad-core/              # Project management and development workflow tools
├── .claude/                 # Claude Code configuration
├── .git/                    # Git version control
├── .next/                   # Next.js build output (generated, not in Git)
├── docs/                    # Project documentation
│   ├── architecture/        # Architecture documentation (this file)
│   ├── prd/                 # Product Requirements Documents
│   └── stories/             # User stories and development tasks
├── node_modules/            # npm dependencies (generated, not in Git)
├── public/                  # Static assets (images, fonts, etc.)
├── src/                     # Source code (main application code)
│   ├── app/                 # Next.js App Router pages and layouts
│   ├── components/          # React components (shadcn/ui + custom)
│   ├── lib/                 # Utility functions, API client, types
│   ├── hooks/               # Custom React hooks
│   ├── contexts/            # React Context providers (auth, etc.)
│   └── styles/              # Global styles and CSS modules
├── .env.example             # Example environment variables
├── .env.local               # Local environment variables (not in Git)
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── .prettierignore          # Prettier ignore rules
├── .prettierrc              # Prettier configuration
├── next.config.ts           # Next.js configuration
├── next-env.d.ts            # Next.js TypeScript declarations (generated)
├── package.json             # npm package manifest
├── package-lock.json        # npm dependency lock file
├── postcss.config.js        # PostCSS configuration (for Tailwind)
├── README.md                # Project README
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

---

## `/src` Directory Structure (Detailed)

### `/src/app` - Next.js App Router

The `app` directory contains all routes and pages following Next.js 15 App Router conventions.

```
src/app/
├── (auth)/                  # Route group for authentication pages (no layout)
│   ├── login/
│   │   └── page.tsx         # Admin login page (RF02)
│   └── register/
│       └── page.tsx         # Admin registration page (RF01)
├── (dashboard)/             # Route group for authenticated dashboard pages
│   ├── incidents/
│   │   ├── page.tsx         # Incident list page (RF05)
│   │   ├── [id]/
│   │   │   └── page.tsx     # Incident detail view (RF05)
│   │   ├── approved/
│   │   │   └── page.tsx     # Approved incidents list
│   │   ├── pending/
│   │   │   └── page.tsx     # Pending incidents list
│   │   └── rejected/
│   │       └── page.tsx     # Rejected incidents list
│   ├── users/
│   │   ├── page.tsx         # User list page (RF06)
│   │   ├── new/
│   │   │   └── page.tsx     # Create new user (RF06)
│   │   └── [id]/
│   │       └── page.tsx     # Edit user profile (RF06)
│   ├── categories/
│   │   ├── page.tsx         # Category list page (RF03, RF04)
│   │   ├── new/
│   │   │   └── page.tsx     # Create new category (RF03)
│   │   ├── [id]/
│   │   │   └── page.tsx     # Category detail view (RF04)
│   │   └── [id]/edit/
│   │       └── page.tsx     # Edit category (RF04)
│   ├── profile/
│   │   └── page.tsx         # Admin profile view/edit (RF07)
│   └── layout.tsx           # Dashboard layout with sidebar navigation
├── layout.tsx               # Root layout (global styles, providers)
├── page.tsx                 # Dashboard home page (metrics, overview)
├── globals.css              # Global CSS (Tailwind base/components/utilities)
└── error.tsx                # Global error boundary
```

**Naming Conventions**:
- `page.tsx`: Route entry point (becomes accessible URL)
- `layout.tsx`: Shared layout wrapping child routes
- `loading.tsx`: Loading UI (streaming SSR)
- `error.tsx`: Error boundary for route segment
- `[id]`: Dynamic route parameter
- `(auth)`: Route group (doesn't affect URL, used for layouts)

---

### `/src/components` - React Components

Reusable UI components organized by type and domain.

```
src/components/
├── ui/                      # shadcn/ui components (auto-generated)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── table.tsx
│   ├── badge.tsx
│   ├── toast.tsx
│   ├── select.tsx
│   ├── form.tsx
│   └── ...                  # Other shadcn/ui primitives
├── layout/                  # Layout components
│   ├── Sidebar.tsx          # Main navigation sidebar
│   ├── Header.tsx           # Top header bar
│   ├── Footer.tsx           # Page footer
│   └── DashboardShell.tsx   # Dashboard container wrapper
├── auth/                    # Authentication-related components
│   ├── LoginForm.tsx        # Login form component
│   ├── RegisterForm.tsx     # Registration form component
│   └── ProtectedRoute.tsx   # Client-side route guard
├── incidents/               # Incident management components
│   ├── IncidentCard.tsx     # Single incident card display
│   ├── IncidentList.tsx     # Incident list/table
│   ├── IncidentFilters.tsx  # Search and filter controls
│   ├── IncidentStatusBadge.tsx # Status indicator component
│   └── IncidentEvaluationForm.tsx # Approve/reject incident form
├── users/                   # User management components
│   ├── UserCard.tsx         # User profile card
│   ├── UserList.tsx         # User list/table
│   ├── UserForm.tsx         # Create/edit user form
│   └── UserStatusToggle.tsx # Activate/deactivate user button
├── categories/              # Category management components
│   ├── CategoryCard.tsx     # Category display card
│   ├── CategoryList.tsx     # Category grid/list
│   └── CategoryForm.tsx     # Create/edit category form
└── common/                  # Common/shared components
    ├── LoadingSpinner.tsx   # Loading indicator
    ├── ErrorMessage.tsx     # Error display component
    ├── SearchBar.tsx        # Reusable search input
    └── PageHeader.tsx       # Page title and breadcrumbs
```

**Component Conventions**:
- **PascalCase** file names matching component name
- Each component in its own file
- Export component as default export
- TypeScript interfaces for props defined in same file or separate `.types.ts`

---

### `/src/lib` - Utilities, API Client, Types

Shared utilities, configuration, and type definitions.

```
src/lib/
├── api/                     # API client and endpoints
│   ├── client.ts            # Axios/fetch client configuration
│   ├── auth.ts              # Authentication API calls
│   ├── incidents.ts         # Incident API calls
│   ├── users.ts             # User management API calls
│   ├── categories.ts        # Category API calls
│   └── interceptors.ts      # Request/response interceptors
├── types/                   # TypeScript type definitions
│   ├── auth.types.ts        # Authentication-related types
│   ├── incident.types.ts    # Incident data models
│   ├── user.types.ts        # User data models
│   ├── category.types.ts    # Category data models
│   └── api.types.ts         # API response types
├── validations/             # Zod schemas for validation
│   ├── auth.schema.ts       # Login/register validation
│   ├── incident.schema.ts   # Incident form validation
│   ├── user.schema.ts       # User form validation
│   └── category.schema.ts   # Category form validation
├── constants/               # Application constants
│   ├── routes.ts            # Route paths (centralized)
│   ├── status.ts            # Incident status definitions
│   └── messages.ts          # User-facing messages (Spanish)
├── utils/                   # Utility functions
│   ├── formatters.ts        # Date/number formatting
│   ├── validators.ts        # Custom validation helpers
│   ├── cn.ts                # Tailwind class name merger (shadcn/ui)
│   └── storage.ts           # LocalStorage/SessionStorage helpers
└── config.ts                # App configuration (API URLs, etc.)
```

---

### `/src/hooks` - Custom React Hooks

Reusable React hooks for common patterns.

```
src/hooks/
├── useAuth.ts               # Authentication state and methods
├── useIncidents.ts          # Fetch and manage incidents
├── useUsers.ts              # Fetch and manage users
├── useCategories.ts         # Fetch and manage categories
├── useDebounce.ts           # Debounce input values
├── useLocalStorage.ts       # Persist state to localStorage
└── useToast.ts              # Toast notification helper
```

**Hook Conventions**:
- Prefix with `use` (React convention)
- Return object with state and methods
- Handle loading, error, and success states

---

### `/src/contexts` - React Context Providers

Global state management using React Context API.

```
src/contexts/
├── AuthContext.tsx          # Authentication context provider
│   ├── AuthProvider         # Wraps app in root layout
│   └── useAuthContext       # Hook to access auth state
└── ThemeContext.tsx         # Theme/dark mode context (future)
```

---

### `/src/styles` - Global Styles

CSS files and style-related utilities.

```
src/styles/
├── globals.css              # Global styles (Tailwind imports)
└── custom.css               # Custom CSS (if needed, prefer Tailwind)
```

**Note**: Most styling uses Tailwind CSS utility classes. This directory is minimal for MVP.

---

## `/public` - Static Assets

Static files served directly by Next.js.

```
public/
├── images/
│   ├── logo.svg             # oFraud logo
│   └── placeholder.png      # Placeholder images
├── icons/
│   └── favicon.ico          # Browser favicon
└── fonts/                   # Custom fonts (if not using Google Fonts)
```

**Asset URLs**: Files in `public` are accessible at `/filename.ext` (e.g., `/images/logo.svg`)

---

## `/docs` - Documentation

Project documentation (not source code).

```
docs/
├── architecture/
│   ├── tech-stack.md        # This file - technology choices
│   ├── source-tree.md       # This file - directory structure
│   └── coding-standards.md  # Code style and conventions
├── prd/
│   ├── index.md             # PRD table of contents
│   ├── requirements.md      # Functional requirements
│   ├── epic-*.md            # Epic breakdown documents
│   └── ...
├── stories/
│   ├── 1.1.story.md         # Individual user stories
│   └── ...
└── brief.md                 # Project brief
```

---

## Configuration Files (Root)

### `next.config.ts`
Next.js configuration (e.g., environment variables, redirects, headers).

### `tsconfig.json`
TypeScript compiler options:
```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
**Note**: `@/*` path alias allows `import { Button } from '@/components/ui/button'` instead of relative paths.

### `tailwind.config.ts`
Tailwind CSS configuration (theme colors, fonts, spacing).

### `.eslintrc.json`
ESLint rules (extends `next/core-web-vitals`, `prettier`).

### `.prettierrc`
Code formatting rules (semi-colons, quote style, line width).

### `.env.local` (not in Git)
Local environment variables:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

---

## File Naming Conventions

### React Components
- **PascalCase**: `LoginForm.tsx`, `IncidentCard.tsx`
- Matches exported component name

### Utilities/Helpers
- **camelCase**: `formatDate.ts`, `validateEmail.ts`

### Types/Interfaces
- **PascalCase** for types: `User`, `Incident`, `Category`
- Files: `user.types.ts`, `incident.types.ts`

### Constants
- **UPPER_SNAKE_CASE** for constant values: `API_BASE_URL`, `STATUS_PENDING`
- Files: `camelCase` (e.g., `routes.ts`)

### Hooks
- **camelCase** with `use` prefix: `useAuth.ts`, `useDebounce.ts`

---

## Import Order Convention

Standard import order for all files:

```typescript
// 1. External dependencies
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Internal utilities/types
import { api } from '@/lib/api/client';
import type { User } from '@/lib/types/user.types';

// 3. Components
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/LoginForm';

// 4. Styles
import styles from './styles.module.css';
```

---

## Path Aliases

TypeScript path aliases configured in `tsconfig.json`:

```json
{
  "@/*": ["./src/*"]
}
```

**Usage**:
```typescript
// Good - absolute path alias
import { Button } from '@/components/ui/button';

// Avoid - relative paths
import { Button } from '../../../components/ui/button';
```

---

## Generated Directories (Not in Git)

These directories are auto-generated and excluded from version control:

- `.next/` - Next.js build output
- `node_modules/` - npm dependencies
- `.env.local` - Local environment variables (contains secrets)

**Gitignore**:
```
.next/
node_modules/
.env.local
```

---

## Adding New Features

When adding new features, follow this structure:

1. **API Endpoints**: Add to `/src/lib/api/[domain].ts`
2. **Types**: Define in `/src/lib/types/[domain].types.ts`
3. **Validation**: Create Zod schema in `/src/lib/validations/[domain].schema.ts`
4. **Components**: Create in `/src/components/[domain]/ComponentName.tsx`
5. **Hooks**: Add custom hook in `/src/hooks/useDomain.ts`
6. **Page**: Create route in `/src/app/[route]/page.tsx`

**Example** - Adding "Reports" feature:
```
src/lib/api/reports.ts
src/lib/types/report.types.ts
src/lib/validations/report.schema.ts
src/components/reports/ReportCard.tsx
src/hooks/useReports.ts
src/app/(dashboard)/reports/page.tsx
```

---

## Testing Directory Structure (Post-MVP)

When tests are added, follow this structure:

```
src/
├── __tests__/               # Global test utilities
│   ├── setup.ts
│   └── utils.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── button.test.tsx  # Co-located tests
```

**Alternative**: Separate `tests/` directory at root (mirrors `src/` structure).

---

*Last Updated: 2025-10-04*
