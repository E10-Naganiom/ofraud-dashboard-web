# Technology Stack

## Overview

The oFraud Web Admin Dashboard is built using modern web technologies optimized for developer experience, performance, and maintainability. This document outlines all core technologies, libraries, and tools used in the project.

---

## Frontend Stack

### Core Framework

**Next.js 15.5.4**
- **Purpose**: React framework with file-based routing, server-side rendering, and API routes
- **Why**: Industry-leading React framework with excellent developer experience, automatic code splitting, and optimal performance
- **Key Features Used**:
  - App Router (React Server Components)
  - File-based routing
  - Built-in optimization (images, fonts, scripts)
  - TypeScript support out of the box

**React 19.2.0**
- **Purpose**: UI component library
- **Why**: De facto standard for building interactive user interfaces
- **Key Features Used**:
  - Hooks (useState, useEffect, useContext, custom hooks)
  - Context API for state management
  - Functional components

**TypeScript 5.9.3**
- **Purpose**: Static type checking for JavaScript
- **Why**: Catch errors at compile time, improved IDE support, better code documentation
- **Configuration**: Strict mode enabled for maximum type safety

---

### Styling & UI Components

**Tailwind CSS 4.1.14**
- **Purpose**: Utility-first CSS framework
- **Why**: Rapid UI development, consistent design system, minimal CSS bundle size
- **PostCSS Integration**: Configured with autoprefixer for browser compatibility

**shadcn/ui**
- **Purpose**: Accessible, customizable component library built on Radix UI primitives
- **Why**:
  - Copy-paste components (not npm dependency bloat)
  - Built with accessibility in mind (WCAG AA compliance)
  - Fully customizable with Tailwind CSS
  - Modern design aesthetic
- **Core Components Used**:
  - Form inputs (Input, Textarea, Select)
  - Buttons
  - Modals/Dialogs
  - Tables/Data Tables
  - Toast notifications
  - Dropdowns
  - Cards
  - Badges

**PostCSS 8.5.6**
- **Purpose**: CSS processing and transformation
- **Why**: Required for Tailwind CSS processing and autoprefixer

**Autoprefixer 10.4.21**
- **Purpose**: Automatically add vendor prefixes to CSS
- **Why**: Cross-browser compatibility without manual vendor prefixes

---

### State Management & Data Fetching

**React Context API**
- **Purpose**: Global state management for authentication
- **Why**: Built-in React solution, sufficient for MVP scope
- **Use Cases**:
  - Current user session
  - JWT token storage
  - Admin authentication state

**React Hook Form** (Planned)
- **Purpose**: Form state management and validation
- **Why**: Minimal re-renders, excellent performance, TypeScript support
- **Integration**: Works seamlessly with Zod for schema validation

**Zod** (Planned)
- **Purpose**: TypeScript-first schema validation
- **Why**: Type-safe validation, integrates with React Hook Form, mirrors backend DTOs

---

### Development Tools

**ESLint 9.37.0**
- **Purpose**: JavaScript/TypeScript linting
- **Plugins**:
  - `eslint-config-next`: Next.js-specific rules
  - `eslint-config-prettier`: Disable ESLint rules that conflict with Prettier
  - `eslint-plugin-prettier`: Run Prettier as ESLint rule
- **Why**: Enforce code quality, catch common errors, maintain consistency

**Prettier 3.6.2**
- **Purpose**: Opinionated code formatter
- **Configuration**: Auto-format on save for consistent code style
- **Why**: Eliminate style debates, ensure consistency across team

**TypeScript ESLint**
- **Purpose**: TypeScript-specific linting rules
- **Why**: Catch TypeScript-specific issues, enforce best practices

---

## Backend Stack (Existing - Reference Only)

The frontend communicates with an existing NestJS backend API. Frontend developers do not modify backend code but should understand the architecture:

**NestJS**
- RESTful API with Swagger documentation
- MySQL database (demo_452)
- JWT token-based authentication
- CORS configured for frontend domain

**Key API Endpoints**:
- `/auth/*` - Registration, login, token management
- `/admin/*` - Admin-specific endpoints (user management, incident evaluation)
- `/categories/*` - Category CRUD operations
- `/incidents/*` - Incident management
- `/files/upload` - Evidence file uploads

---

## Package Management

**npm**
- **Version**: 10+ (bundled with Node.js)
- **Why**: Default Node.js package manager, widely supported
- **Lock File**: `package-lock.json` committed to ensure reproducible builds

---

## Build & Deployment

**Vercel** (Recommended)
- **Purpose**: Hosting and deployment platform optimized for Next.js
- **Why**:
  - Zero-config deployment
  - Automatic HTTPS
  - Edge network CDN
  - Preview deployments for PRs
  - Environment variable management

**Alternative**: AWS Amplify / S3 + CloudFront
- Can be used if Vercel is not available

---

## Development Environment Requirements

### Node.js
- **Version**: 20.x LTS or 22.x
- **Why**: Stable, long-term support, compatible with Next.js 15

### Operating Systems
- **Supported**: Windows 10/11, macOS 11+, Linux (Ubuntu 20.04+)
- **Primary Development Environment**: Modern desktop/laptop

### Browsers (Testing)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Code Quality & Formatting

### Pre-commit Hooks (Planned - Post-MVP)
**Husky + lint-staged**
- Auto-format and lint staged files before commit
- Ensure code quality standards are met

### Conventional Commits (Recommended)
- Structured commit messages for better change tracking
- Example: `feat(auth): add admin login page`

---

## Environment Variables

```env
# .env.local (development)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# .env.production (production)
NEXT_PUBLIC_API_BASE_URL=https://api.ofraud.com
NEXT_PUBLIC_APP_NAME=oFraud Admin Dashboard
```

**Why NEXT_PUBLIC_ Prefix**: Makes variables accessible to browser-side code (required for API calls from client components)

---

## Testing Stack (Post-MVP)

### Unit Testing
**Vitest**
- **Purpose**: Fast unit testing framework
- **Why**: Better ESM support than Jest, faster execution, similar API to Jest

### End-to-End Testing
**Playwright**
- **Purpose**: E2E testing across browsers
- **Why**: Official Microsoft tool, supports Chrome, Firefox, Safari, excellent developer experience

---

## Monitoring & Error Tracking (Post-MVP)

**Sentry** (Free Tier)
- **Purpose**: Error tracking and performance monitoring
- **Why**: Industry standard, excellent React/Next.js integration

**Vercel Analytics**
- **Purpose**: Basic web analytics (Core Web Vitals, page views)
- **Why**: Built-in with Vercel deployment, zero configuration

---

## Version Control

**Git**
- **Remote**: GitHub (`github.com/gaboggawewe/ofraud-dashboard-web`)
- **Branching Strategy**:
  - `main`: Production-ready code
  - `develop`: Integration branch (optional for MVP)
  - `feature/*`: Individual feature branches

---

## Dependencies Summary

### Production Dependencies
```json
{
  "next": "^15.5.4",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

### Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4.1.14",
  "@types/node": "^24.6.2",
  "@types/react": "^19.2.0",
  "@types/react-dom": "^19.2.0",
  "autoprefixer": "^10.4.21",
  "eslint": "^9.37.0",
  "eslint-config-next": "^15.5.4",
  "eslint-config-prettier": "^10.1.8",
  "eslint-plugin-prettier": "^5.5.4",
  "postcss": "^8.5.6",
  "prettier": "^3.6.2",
  "tailwindcss": "^4.1.14",
  "typescript": "^5.9.3"
}
```

---

## Future Considerations

**Libraries to Add (Post-MVP)**:
- **Axios** or **SWR/React Query**: For improved API data fetching and caching
- **Framer Motion**: For smooth animations and transitions
- **Zod + React Hook Form**: For robust form validation
- **date-fns** or **Day.js**: For date manipulation (lightweight alternative to Moment.js)
- **react-i18next** or **next-intl**: For internationalization (multi-language support)

**Services to Integrate (Post-MVP)**:
- **Sentry**: Error tracking
- **LogRocket** or **Hotjar**: User session recording for UX insights
- **Vercel Analytics**: Performance monitoring

---

## Technology Decision Rationale

### Why Next.js over Create React App (CRA)?
- **Better Performance**: Server-side rendering, automatic code splitting
- **Future-Proof**: CRA is deprecated, Next.js is actively maintained by Vercel
- **SEO Benefits**: SSR/SSG capabilities (not critical for admin dashboard but beneficial)
- **Developer Experience**: File-based routing, built-in optimizations

### Why Tailwind CSS over styled-components or CSS Modules?
- **Faster Development**: Utility classes eliminate context switching
- **Smaller Bundle Size**: Purges unused CSS in production
- **Design Consistency**: Enforces design system through utilities
- **Industry Standard**: Widely adopted, extensive community support

### Why shadcn/ui over Material-UI or Ant Design?
- **Customization**: Copy-paste components, not npm dependencies
- **Modern Design**: Cleaner aesthetic than Material-UI
- **Accessibility**: Built on Radix UI (WCAG AA compliant)
- **Bundle Size**: Only include components you use

### Why TypeScript over JavaScript?
- **Type Safety**: Catch errors at compile time, not runtime
- **Better IDE Support**: Autocomplete, inline documentation
- **Code Documentation**: Types serve as inline documentation
- **Refactoring Confidence**: Rename/refactor with confidence

---

## Upgrade Path

**Staying Current**:
- **Next.js**: Monitor Next.js releases for new features (e.g., React Server Components improvements)
- **React**: Stable on React 19, monitor for React 20+
- **Tailwind CSS**: Currently on 4.x, monitor for breaking changes
- **Dependencies**: Run `npm audit` regularly, update security patches promptly

**Long-Term Strategy**:
- Evaluate new state management solutions (e.g., Zustand, Jotai) if Context API becomes limiting
- Consider migrating to Turborepo if monorepo complexity grows
- Monitor performance metrics and optimize bottlenecks (lazy loading, code splitting)

---

*Last Updated: 2025-10-04*
