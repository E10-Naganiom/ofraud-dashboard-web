# oFraud Admin Dashboard - Design System

## Overview

This design system ensures visual consistency across the oFraud Admin Dashboard, aligning with the oFraud mobile app brand identity while adapting for desktop admin use cases.

---

## Color Palette

### Primary Colors

The oFraud brand uses **green** as the primary color, representing security, trust, and protection.

#### Primary Green
- **Primary**: `#4ADE80` (Tailwind: `bg-brand-primary`)
  - **Usage**: Primary buttons, CTAs, active states, FAB buttons
  - **Example**: "Iniciar sesión" button, "Buscar" button, "+" FAB

- **Primary Hover**: `#22C55E` (Tailwind: `bg-brand-primary-hover`)
  - **Usage**: Hover state for primary buttons

- **Primary Dark**: `#10B981` (Tailwind: `bg-brand-primary-dark`)
  - **Usage**: Darker green for emphasis, pressed states

- **Primary Light**: `#86EFAC` (Tailwind: `bg-brand-primary-light`)
  - **Usage**: Light green accents, subtle highlights

### Accent Colors

#### Blue Accent
- **Accent**: `#2563EB` (Tailwind: `bg-brand-accent`)
  - **Usage**: Links, secondary actions, info icons (shield icon)
  - **Example**: "Registrarse" link, "Inicio" tab active state

- **Accent Hover**: `#1D4ED8` (Tailwind: `bg-brand-accent-hover`)
  - **Usage**: Hover state for links and secondary buttons

- **Accent Light**: `#3B82F6` (Tailwind: `bg-brand-accent-light`)
  - **Usage**: Light blue for info states

### Background Colors

- **Light Green**: `#E8F5E9` (Tailwind: `bg-brand-background-light`)
  - **Usage**: Card backgrounds, section highlights

- **Subtle Green**: `#F1F8F4` (Tailwind: `bg-brand-background-subtle`)
  - **Usage**: Very subtle section backgrounds

- **Card Background**: `#DCFCE7` (Tailwind: `bg-brand-background-card`)
  - **Usage**: Incident cards, content cards

- **White**: `#FFFFFF` (Tailwind: `bg-brand-background-white`)
  - **Usage**: Main page background, modal backgrounds

- **Gray**: `#F9FAFB` (Tailwind: `bg-brand-background-gray`)
  - **Usage**: Subtle gray backgrounds, input fields

### Status Colors

- **Success**: `#10B981` (Tailwind: `bg-brand-success`)
  - **Usage**: Approved incidents, success messages, checkmarks

- **Warning**: `#F59E0B` (Tailwind: `bg-brand-warning`)
  - **Usage**: Pending incidents, warning messages, "Estatus del incidente" badges

- **Danger**: `#EF4444` (Tailwind: `bg-brand-danger`)
  - **Usage**: Rejected incidents, error messages, destructive actions (delete)

- **Info**: `#3B82F6` (Tailwind: `bg-brand-info`)
  - **Usage**: Informational messages, tooltips

### Text Colors

- **Primary**: `#000000` (Tailwind: `text-brand-text-primary`)
  - **Usage**: Page titles, headings, important text
  - **Example**: "Dashboard", "Login", "oFraud"

- **Secondary**: `#374151` (Tailwind: `text-brand-text-secondary`)
  - **Usage**: Body text, descriptions

- **Muted**: `#6B7280` (Tailwind: `text-brand-text-muted`)
  - **Usage**: Secondary text, labels, timestamps
  - **Example**: "Total de sesiones • Por fuente"

- **Light**: `#9CA3AF` (Tailwind: `text-brand-text-light`)
  - **Usage**: Placeholder text, disabled text

---

## Typography

### Font Family

**Primary Font**: Inter (fallback: system-ui, -apple-system, sans-serif)

```css
font-family: Inter, system-ui, -apple-system, sans-serif;
```

### Type Scale

#### Page Titles (H1)
```tsx
<h1 className="text-2xl font-bold text-brand-text-primary">
  Panel de Administración
</h1>
```
- **Size**: `text-2xl` (24px)
- **Weight**: `font-bold` (700)
- **Usage**: Main page titles, hero headings

#### Section Headings (H2)
```tsx
<h2 className="text-xl font-semibold text-brand-text-primary">
  Incidentes más comunes
</h2>
```
- **Size**: `text-xl` (20px)
- **Weight**: `font-semibold` (600)
- **Usage**: Section titles, card headers

#### Subsection Headings (H3)
```tsx
<h3 className="text-lg font-medium text-brand-text-primary">
  Actividad reciente
</h3>
```
- **Size**: `text-lg` (18px)
- **Weight**: `font-medium` (500)
- **Usage**: Subsection titles, component headers

#### Body Text
```tsx
<p className="text-base text-brand-text-secondary">
  Mantente protegido con las últimas actualizaciones de seguridad
</p>
```
- **Size**: `text-base` (16px)
- **Weight**: `font-normal` (400)
- **Usage**: Paragraph text, descriptions

#### Small Text
```tsx
<span className="text-sm text-brand-text-muted">
  Total de sesiones • Por fuente
</span>
```
- **Size**: `text-sm` (14px)
- **Weight**: `font-normal` (400)
- **Usage**: Labels, metadata, secondary info

#### Extra Small Text
```tsx
<span className="text-xs text-brand-text-muted">
  Última actualización: 2024-10-12
</span>
```
- **Size**: `text-xs` (12px)
- **Weight**: `font-normal` (400)
- **Usage**: Timestamps, very small metadata

---

## Spacing Scale

Use Tailwind's spacing scale for consistent padding, margins, and gaps.

### Page Layout
- **Page Padding**: `p-6` (24px) or `p-8` (32px)
  ```tsx
  <main className="p-6">...</main>
  ```

### Cards
- **Card Padding**: `p-4` (16px) or `p-6` (24px)
  ```tsx
  <div className="bg-brand-background-card p-6 rounded-card">...</div>
  ```

- **Card Margin**: `mb-6` (24px) between cards
  ```tsx
  <div className="mb-6">...</div>
  ```

### Sections
- **Section Margin**: `mb-6` (24px) or `mb-8` (32px) between sections
  ```tsx
  <section className="mb-8">...</section>
  ```

### Grids and Lists
- **Grid Gap**: `gap-4` (16px) or `gap-6` (24px)
  ```tsx
  <div className="grid grid-cols-3 gap-6">...</div>
  ```

### Forms
- **Form Field Spacing**: `space-y-4` (16px vertical spacing)
  ```tsx
  <form className="space-y-4">
    <div>...</div>
    <div>...</div>
  </form>
  ```

---

## Components

### Buttons

All buttons should use the shadcn/ui `Button` component with consistent variants.

#### Primary Button (Default)
```tsx
import { Button } from '@/components/ui/button';

<Button className="bg-brand-primary hover:bg-brand-primary-hover">
  Buscar
</Button>
```
- **Usage**: Primary actions, form submissions
- **Color**: Brand green (`bg-brand-primary`)
- **Hover**: Darker green (`hover:bg-brand-primary-hover`)

#### Secondary Button (Outline)
```tsx
<Button variant="outline">
  Cancelar
</Button>
```
- **Usage**: Secondary actions, cancel buttons
- **Color**: Border with transparent background

#### Destructive Button
```tsx
<Button variant="destructive">
  Eliminar
</Button>
```
- **Usage**: Delete, reject actions
- **Color**: Red (`bg-brand-danger`)

#### Ghost Button
```tsx
<Button variant="ghost">
  Ver más
</Button>
```
- **Usage**: Subtle actions, navigation items
- **Color**: Transparent with hover background

#### Button Sizes
```tsx
<Button size="sm">Pequeño</Button>
<Button size="default">Mediano</Button>
<Button size="lg">Grande</Button>
```

### Cards

Cards use light green backgrounds with rounded corners and subtle shadows.

```tsx
<div className="bg-brand-background-card p-6 rounded-card shadow-sm">
  <h3 className="text-lg font-medium mb-2">Título/ID del incidente</h3>
  <p className="text-sm text-brand-text-muted">Categoría</p>
</div>
```

- **Background**: `bg-brand-background-card` or `bg-brand-background-light`
- **Padding**: `p-6` or `p-4`
- **Border Radius**: `rounded-card` (16px)
- **Shadow**: `shadow-sm` or `shadow-md`

### Badges

Status badges use rounded pill shapes with colored backgrounds.

```tsx
// Success badge
<span className="px-3 py-1 bg-brand-success text-white text-sm rounded-badge">
  Aprobado
</span>

// Warning badge
<span className="px-3 py-1 bg-brand-warning text-white text-sm rounded-badge">
  Pendiente
</span>

// Danger badge
<span className="px-3 py-1 bg-brand-danger text-white text-sm rounded-badge">
  Rechazado
</span>
```

- **Border Radius**: `rounded-badge` (full round)
- **Padding**: `px-3 py-1`
- **Text**: `text-sm`

### Forms

All forms should use shadcn/ui Form components for consistency.

```tsx
<div className="space-y-4">
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-brand-text-secondary mb-2">
      Correo electrónico
    </label>
    <input
      id="email"
      type="email"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
      placeholder="sara@tec.mx"
    />
  </div>
</div>
```

- **Label**: `text-sm font-medium text-brand-text-secondary`
- **Input Background**: `bg-white` or `bg-brand-background-gray`
- **Border**: `border border-gray-300`
- **Border Radius**: `rounded-lg`
- **Focus Ring**: `focus:ring-2 focus:ring-brand-primary`

### Modals/Dialogs

Use shadcn/ui Dialog component for all modals.

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog>
  <DialogContent className="bg-white rounded-xl shadow-lg">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold">Título del Modal</DialogTitle>
    </DialogHeader>
    <div className="py-4">
      {/* Content */}
    </div>
  </DialogContent>
</Dialog>
```

- **Background**: `bg-white`
- **Border Radius**: `rounded-xl`
- **Shadow**: `shadow-lg`
- **Backdrop**: Semi-transparent dark overlay

### Toast Notifications

Use shadcn/ui Toast (or Sonner) for notifications.

```tsx
// Success toast
toast.success('Incidente aprobado exitosamente');

// Error toast
toast.error('Error al procesar la solicitud');

// Info toast
toast.info('Cambios guardados');
```

- **Position**: Top-right corner
- **Auto-dismiss**: 3-5 seconds
- **Colors**: Green (success), Red (error), Blue (info)

---

## Border Radius Patterns

- **Cards**: `rounded-card` (16px / `rounded-xl`)
- **Buttons**: `rounded-button` (12px / `rounded-lg`)
- **Badges**: `rounded-badge` (9999px / full round)
- **Inputs**: `rounded-lg` (8px)
- **Modals**: `rounded-xl` (12px)

---

## Shadow Patterns

- **Cards**: `shadow-sm` (subtle elevation)
- **Elevated Cards**: `shadow-md` (moderate elevation)
- **Modals**: `shadow-lg` (strong elevation)
- **Floating Action Button**: `shadow-lg`

---

## Iconography

Use **Lucide React** icons (compatible with shadcn/ui).

```tsx
import { Home, FileText, Users, Settings, Plus } from 'lucide-react';

<Home className="w-5 h-5 text-brand-accent" />
```

- **Size**: `w-5 h-5` (20px) for nav icons, `w-4 h-4` (16px) for inline icons
- **Color**: Match context (primary, accent, muted)

---

## Accessibility Guidelines

### WCAG AA Compliance

#### Color Contrast
- All text must meet **4.5:1 contrast ratio** for normal text
- Large text (18px+) must meet **3:1 contrast ratio**
- Check status badges: ensure yellow/orange text readable on light backgrounds

#### Keyboard Navigation
- All interactive elements must be keyboard accessible (Tab, Enter, Space, Escape)
- Visible focus outlines on all focusable elements: `focus:ring-2 focus:ring-brand-primary`
- Logical tab order (top to bottom, left to right)

#### Form Labels
- All inputs must have associated labels (`htmlFor` matching `id`)
- Icon-only buttons must have `aria-label`:
  ```tsx
  <button aria-label="Cerrar modal">
    <X className="w-4 h-4" />
  </button>
  ```

#### Images and Icons
- All `<img>` tags must have `alt` text (empty `alt=""` for decorative images)
- SVG icons: add `aria-hidden="true"` if decorative

---

## Responsive Design

Desktop-first approach with minimum resolution support.

### Breakpoints
- **Minimum**: 1280x720 (HD)
- **Standard**: 1920x1080 (Full HD)
- **Intermediate**: 1440x900, 1600x900

### Responsive Patterns
- Use `max-w-7xl` for content containers to prevent excessive stretching
- Stack grids on smaller screens: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Ensure no horizontal scrolling at 1280px width

---

## Cross-Browser Support

- **Primary**: Chrome 90+
- **Secondary**: Firefox 88+, Edge 90+
- **Testing**: Safari 14+ (if macOS available)

---

## Code Examples

### Complete Page Example
```tsx
import { Button } from '@/components/ui/button';

export default function ExamplePage() {
  return (
    <main className="p-6 bg-brand-background-white">
      <h1 className="text-2xl font-bold text-brand-text-primary mb-6">
        Panel de Administración
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-brand-text-primary mb-4">
          Actividad reciente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-brand-background-card p-6 rounded-card shadow-sm">
            <h3 className="text-lg font-medium text-brand-text-primary mb-2">
              Título del Incidente
            </h3>
            <p className="text-sm text-brand-text-muted mb-4">Categoría: Phishing</p>
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-brand-warning text-white text-sm rounded-badge">
                Pendiente
              </span>
              <Button size="sm" className="bg-brand-primary hover:bg-brand-primary-hover">
                Ver detalles
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## Design Principles

1. **Consistency**: Use the same patterns across all pages
2. **Clarity**: Information hierarchy should be immediately clear
3. **Accessibility**: Design for all users, including keyboard and screen reader users
4. **Brand Alignment**: Follow oFraud mobile app visual identity
5. **Performance**: Optimize for fast loading and smooth interactions

---

*Last Updated: 2025-10-12*
*Version: 1.0*
