# Coding Standards

## Overview

This document defines the coding standards, conventions, and best practices for the oFraud Web Admin Dashboard project. Following these standards ensures code consistency, maintainability, and quality across the codebase.

---

## Core Principles

1. **Readability First**: Code is read more often than written. Prioritize clarity over cleverness.
2. **Consistency**: Follow established patterns. Don't introduce new patterns without team consensus.
3. **Type Safety**: Leverage TypeScript's type system. Avoid `any` unless absolutely necessary.
4. **DRY (Don't Repeat Yourself)**: Extract reusable logic into utilities, hooks, or components.
5. **KISS (Keep It Simple, Stupid)**: Prefer simple, straightforward solutions over complex abstractions.
6. **Fail Fast**: Validate inputs early, throw meaningful errors, handle edge cases explicitly.

---

## TypeScript Standards

### Type Safety Rules

**1. Strict Mode Enabled**
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**2. Avoid `any` - Use Specific Types**
```typescript
// ❌ Bad
function processData(data: any) {
  return data.map((item: any) => item.id);
}

// ✅ Good
interface DataItem {
  id: string;
  name: string;
}

function processData(data: DataItem[]) {
  return data.map((item) => item.id);
}
```

**3. Use Type Inference When Obvious**
```typescript
// ❌ Bad - Redundant type annotation
const count: number = 5;
const isActive: boolean = true;

// ✅ Good - Type inference
const count = 5;
const isActive = true;
```

**4. Explicit Return Types for Functions**
```typescript
// ❌ Bad - Implicit return type
function getUser(id: string) {
  return api.get(`/users/${id}`);
}

// ✅ Good - Explicit return type
async function getUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}
```

**5. Use `type` vs `interface` Appropriately**
- **`interface`**: For object shapes (can be extended)
- **`type`**: For unions, intersections, primitives

```typescript
// ✅ Good - Interface for object shape
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Good - Type for union
type UserStatus = 'active' | 'inactive' | 'pending';

// ✅ Good - Type for complex combinations
type AdminUser = User & {
  isAdmin: true;
  permissions: string[];
};
```

---

## React Component Standards

### Component Structure

**1. Functional Components Only**
```typescript
// ❌ Bad - Class component
class LoginForm extends React.Component {
  render() {
    return <form>...</form>;
  }
}

// ✅ Good - Functional component with hooks
export default function LoginForm() {
  const [email, setEmail] = useState('');
  return <form>...</form>;
}
```

**2. Component File Template**
```typescript
// src/components/incidents/IncidentCard.tsx

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Incident } from '@/lib/types/incident.types';

// Props interface
interface IncidentCardProps {
  incident: Incident;
  onStatusChange?: (id: string, status: string) => void;
  className?: string;
}

// Main component
export default function IncidentCard({
  incident,
  onStatusChange,
  className
}: IncidentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Card className={className}>
      {/* Component JSX */}
    </Card>
  );
}

// Helper components (if needed)
function IncidentDetails({ incident }: { incident: Incident }) {
  return <div>...</div>;
}
```

**3. Props Destructuring**
```typescript
// ❌ Bad - No destructuring
export default function UserCard(props: UserCardProps) {
  return <div>{props.user.name}</div>;
}

// ✅ Good - Destructure in parameters
export default function UserCard({ user, onEdit }: UserCardProps) {
  return <div>{user.name}</div>;
}
```

**4. Default Props**
```typescript
// ✅ Good - Use default parameters
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md'
}: ButtonProps) {
  return <button className={`btn-${variant} btn-${size}`}>...</button>;
}
```

---

### Hooks Best Practices

**1. Custom Hooks for Reusable Logic**
```typescript
// ✅ Good - Extract logic into custom hook
// src/hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Login logic
  };

  const logout = () => {
    // Logout logic
  };

  return { user, loading, login, logout };
}

// Usage in component
function Dashboard() {
  const { user, loading, logout } = useAuth();

  if (loading) return <LoadingSpinner />;

  return <div>Welcome, {user?.name}</div>;
}
```

**2. Hook Dependencies**
```typescript
// ❌ Bad - Missing dependency
useEffect(() => {
  fetchUser(userId);
}, []); // userId is missing

// ✅ Good - All dependencies listed
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// ✅ Good - Explicitly ignore lint rule if intentional
useEffect(() => {
  // Only run on mount
  initializeApp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

**3. State Updates**
```typescript
// ❌ Bad - Direct state mutation
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane'; // Mutation!

// ✅ Good - Create new object
setUser({ ...user, name: 'Jane' });

// ✅ Better - Functional update if based on previous state
setCount((prevCount) => prevCount + 1);
```

---

## Naming Conventions

### Files and Directories

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `LoginForm.tsx`, `IncidentCard.tsx` |
| Utilities/Helpers | camelCase | `formatDate.ts`, `validateEmail.ts` |
| Hooks | camelCase with `use` | `useAuth.ts`, `useDebounce.ts` |
| Types/Interfaces | PascalCase | `User`, `Incident`, `CategoryFormData` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_FILE_SIZE` |
| Directories | kebab-case or lowercase | `auth`, `incident-management` |

### Variables and Functions

```typescript
// ✅ Good - Descriptive names
const userEmail = user.email;
const isAuthenticated = !!token;
const fetchUserProfile = async (userId: string) => {...};

// ❌ Bad - Vague names
const data = user.email;
const flag = !!token;
const get = async (id: string) => {...};
```

### Boolean Variables

```typescript
// ✅ Good - Prefix with is/has/should/can
const isLoading = true;
const hasPermission = user.isAdmin;
const shouldRender = isActive && !isDeleted;
const canEdit = user.role === 'admin';

// ❌ Bad - No prefix
const loading = true;
const permission = user.isAdmin;
```

### Event Handlers

```typescript
// ✅ Good - Prefix with handle/on
const handleSubmit = (e: FormEvent) => {...};
const handleClick = () => {...};
const onUserUpdate = (user: User) => {...};

// ❌ Bad - Generic names
const submit = (e: FormEvent) => {...};
const click = () => {...};
```

---

## Code Organization

### Import Order

```typescript
// 1. React and Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { z } from 'zod';
import axios from 'axios';

// 3. Internal utilities and types
import { api } from '@/lib/api/client';
import type { User } from '@/lib/types/user.types';
import { ROUTES } from '@/lib/constants/routes';

// 4. Components
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/LoginForm';

// 5. Styles (if any)
import styles from './Dashboard.module.css';
```

### File Structure

```typescript
// 1. Imports
import { ... } from '...';

// 2. Types/Interfaces
interface ComponentProps {
  ...
}

// 3. Constants
const DEFAULT_PAGE_SIZE = 20;

// 4. Main component
export default function Component(props: ComponentProps) {
  // 4a. Hooks
  const [state, setState] = useState();
  const router = useRouter();

  // 4b. Derived state
  const isValid = state !== null;

  // 4c. Event handlers
  const handleSubmit = () => {...};

  // 4d. Effects
  useEffect(() => {...}, []);

  // 4e. Render
  return <div>...</div>;
}

// 5. Helper components (if small and only used here)
function HelperComponent() {
  return <span>...</span>;
}

// 6. Helper functions (if only used in this file)
function formatData(data: string) {
  return data.trim();
}
```

---

## Error Handling

### API Error Handling

```typescript
// ✅ Good - Comprehensive error handling
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle HTTP errors
      if (error.response?.status === 401) {
        // Redirect to login
        router.push('/login');
      } else if (error.response?.status === 404) {
        console.error('Users not found');
      } else {
        console.error('API error:', error.response?.data.message);
      }
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error);
    }
    throw error; // Re-throw for caller to handle
  }
}
```

### Component Error Boundaries

```typescript
// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Algo salió mal</h2>
      <Button onClick={reset}>Intentar nuevamente</Button>
    </div>
  );
}
```

---

## Styling Standards

### Tailwind CSS Usage

```typescript
// ✅ Good - Tailwind utilities
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Submit
</button>

// ✅ Good - Conditional classes with cn() helper
import { cn } from '@/lib/utils/cn';

<button className={cn(
  "px-4 py-2 rounded",
  isPrimary ? "bg-blue-500" : "bg-gray-500",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
  Submit
</button>

// ❌ Bad - Inline styles (avoid unless dynamic)
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Submit
</button>
```

### Component Class Names

```typescript
// ✅ Good - Accept className prop for flexibility
interface CardProps {
  className?: string;
}

export default function Card({ className, children }: CardProps) {
  return (
    <div className={cn("border rounded-lg p-4", className)}>
      {children}
    </div>
  );
}

// Usage
<Card className="shadow-lg">...</Card>
```

---

## Performance Best Practices

### 1. Avoid Unnecessary Re-renders

```typescript
// ✅ Good - Memoize expensive calculations
import { useMemo } from 'react';

function UserList({ users }: { users: User[] }) {
  const sortedUsers = useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  return <div>{sortedUsers.map(...)}</div>;
}
```

### 2. Lazy Loading Components

```typescript
// ✅ Good - Lazy load heavy components
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('@/components/charts/HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
```

### 3. Debounce Search Inputs

```typescript
// ✅ Good - Debounce search to reduce API calls
import { useDebounce } from '@/hooks/useDebounce';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
}
```

---

## Accessibility (a11y) Standards

### 1. Semantic HTML

```typescript
// ✅ Good - Semantic elements
<nav>
  <ul>
    <li><a href="/incidents">Incidents</a></li>
  </ul>
</nav>

<main>
  <h1>Dashboard</h1>
  <section>...</section>
</main>

// ❌ Bad - Div soup
<div>
  <div>
    <div><a href="/incidents">Incidents</a></div>
  </div>
</div>
```

### 2. ARIA Labels

```typescript
// ✅ Good - Accessible buttons
<button aria-label="Close modal" onClick={onClose}>
  <CloseIcon />
</button>

// ✅ Good - Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### 3. Keyboard Navigation

```typescript
// ✅ Good - Keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Click me
</div>
```

---

## Security Best Practices

### 1. Sanitize User Input

```typescript
// ✅ Good - Validate and sanitize
import { z } from 'zod';

const emailSchema = z.string().email();

function validateEmail(email: string) {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}
```

### 2. Avoid XSS

```typescript
// ✅ Good - React escapes by default
<div>{userInput}</div>

// ❌ Dangerous - dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // Avoid!
```

### 3. Secure Token Storage

```typescript
// ✅ Good - HttpOnly cookies (backend sets)
// OR secure localStorage with encryption

// ❌ Bad - Plain text in localStorage
localStorage.setItem('token', token); // Vulnerable to XSS
```

---

## Testing Standards (Post-MVP)

### Unit Test Example

```typescript
// src/components/ui/button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Git Commit Standards

### Commit Message Format (Conventional Commits)

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config)

**Examples**:
```
feat(auth): add admin login page
fix(incidents): correct status filter logic
docs(readme): update installation instructions
refactor(api): extract error handling into interceptor
```

---

## Code Review Checklist

Before submitting a pull request, ensure:

- [ ] Code follows TypeScript strict mode (no `any`)
- [ ] All functions have explicit return types
- [ ] Components are typed with interfaces
- [ ] No console.log statements (use proper logging)
- [ ] Error handling is comprehensive
- [ ] Accessibility attributes are present (ARIA labels, semantic HTML)
- [ ] Code is formatted with Prettier
- [ ] No ESLint warnings or errors
- [ ] Tests pass (when testing is implemented)
- [ ] Component is responsive (desktop-first for MVP)
- [ ] User-facing strings are in Spanish
- [ ] No hardcoded values (use constants)

---

## Anti-Patterns to Avoid

### 1. Prop Drilling
```typescript
// ❌ Bad - Passing props through many levels
<Parent>
  <Child1 user={user}>
    <Child2 user={user}>
      <Child3 user={user} />
    </Child2>
  </Child1>
</Parent>

// ✅ Good - Use Context API
const UserContext = createContext<User | null>(null);

<UserContext.Provider value={user}>
  <Parent>
    <Child1>
      <Child2>
        <Child3 /> {/* Access user via useContext */}
      </Child2>
    </Child1>
  </Parent>
</UserContext.Provider>
```

### 2. Magic Numbers
```typescript
// ❌ Bad
if (user.age > 18) {...}
setTimeout(fetchData, 5000);

// ✅ Good
const LEGAL_AGE = 18;
const POLLING_INTERVAL = 5000;

if (user.age > LEGAL_AGE) {...}
setTimeout(fetchData, POLLING_INTERVAL);
```

### 3. Nested Ternaries
```typescript
// ❌ Bad - Hard to read
const status = isActive ? isAdmin ? 'admin' : 'user' : 'inactive';

// ✅ Good - Explicit if-else or function
function getUserStatus(isActive: boolean, isAdmin: boolean) {
  if (!isActive) return 'inactive';
  if (isAdmin) return 'admin';
  return 'user';
}

const status = getUserStatus(isActive, isAdmin);
```

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Last Updated: 2025-10-04*
