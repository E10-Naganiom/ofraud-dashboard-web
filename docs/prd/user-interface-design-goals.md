# User Interface Design Goals

## Overall UX Vision

The oFraud Admin Dashboard will provide a **clean, efficient, data-dense interface** optimized for rapid task completion. The design philosophy emphasizes **speed and clarity** over visual embellishment—administrators need to evaluate dozens of incidents per day, so every interaction should minimize cognitive load and clicks. The interface will feel **modern and professional** leveraging shadcn/ui's polished components, while maintaining a **serious, trustworthy aesthetic** appropriate for cybersecurity work.

Key UX principles:
- **Information hierarchy**: Most important data visible at a glance (incident status, user flags, category risk levels)
- **Progressive disclosure**: Details revealed on-demand to avoid overwhelming users
- **Consistent patterns**: Repeatable interaction models across all CRUD operations
- **Forgiving interactions**: Clear undo paths and confirmation dialogs for destructive actions
- **Responsive feedback**: Immediate visual acknowledgment of all actions (toasts, loading states)

## Key Interaction Paradigms

**1. List → Detail → Action Pattern**
- Primary workflow for incidents, users, and categories
- List view shows summary cards with key metadata
- Click/tap opens detail view (modal or dedicated page)
- Actions available in context (edit, delete, evaluate)

**2. Inline Search & Filter**
- Persistent search bar at top of list views
- Real-time filtering as user types (debounced to avoid excessive API calls)
- Category/status filters as dropdown or chip-based selectors

**3. Form-Based CRUD**
- Modal dialogs for quick creates/edits (categories, user profiles)
- Full-page forms for complex multi-step operations (if needed in future)
- Validation messages inline next to fields
- Submit buttons disabled until form valid

**4. Status Badges & Visual Indicators**
- Color-coded status badges: Pending (yellow/orange), Approved (green), Rejected (red)
- Admin flag indicator (crown icon or "ADMIN" badge on user cards)
- Risk level visualization for categories (icons or color bars)

**5. Context-Aware Navigation**
- Sidebar or top navigation with clear section labels (Dashboard, Incidents, Users, Categories, Profile)
- Active route highlighted
- Logout accessible from profile dropdown or sidebar

## Core Screens and Views

1. **Login Screen** - Clean, centered form with email/password fields, "Registrarse" link
2. **Dashboard Home** - Metrics widgets (total incidents, pending count), recent activity list, quick action buttons
3. **Incident List View** - Searchable, filterable table/grid of all incidents with status badges
4. **Incident Detail View** - Full incident information including evidence images, user details, evaluation controls (status dropdown, supervisor selector, save button)
5. **User Management View** - Paginated table of all users with inline activate/deactivate toggles, edit/delete actions
6. **User Create/Edit Form** - Modal or page with fields for nombre, apellido, email, password (create only), is_admin checkbox, is_active toggle
7. **Category List View** - Grid of category cards with title, description preview, edit/delete icons
8. **Category Detail/Edit View** - Full category information with editable fields (título, descripción, señales, prevención, acciones, ejemplos, imagen upload)
9. **Category Create Form** - Modal or page for new category with all required fields
10. **Admin Profile View** - Current admin's information with edit option
11. **Logout Confirmation** - Simple modal or immediate action with success toast

## Accessibility: WCAG AA

The admin dashboard will target **WCAG 2.1 AA compliance** to ensure usability for administrators with disabilities:

- **Color contrast**: All text must meet 4.5:1 contrast ratio (7:1 for large text)
- **Keyboard navigation**: All interactive elements accessible via Tab, Enter, Escape
- **Focus indicators**: Visible focus outlines on all focusable elements
- **Screen reader support**: Proper semantic HTML, ARIA labels where needed
- **Form labels**: All inputs have associated labels (visible or aria-label)
- **Error identification**: Validation errors announced to screen readers
- **Resizable text**: Interface remains functional at 200% zoom

**Rationale**: While the primary users (admin staff) may not require accessibility features, WCAG AA compliance is best practice and may be required for institutional compliance (educational institutions often have accessibility mandates).

## Branding

**Visual Style**: Clean, professional, modern without being playful
- **Color Palette**:
  - Primary: Deep blue or teal (trust, security) - suggestion: Tailwind `blue-600` or `cyan-600`
  - Success: Green (`green-600`) for approved incidents
  - Warning: Yellow/Orange (`amber-500`) for pending incidents
  - Danger: Red (`red-600`) for rejected incidents, delete actions
  - Neutral: Grays (`slate-50` to `slate-900`) for backgrounds, borders, text
- **Typography**:
  - Primary font: Inter or system font stack (already included in Tailwind)
  - Headings: Semi-bold (font-weight 600)
  - Body text: Regular (font-weight 400)
  - Monospace: For IDs, emails, technical data
- **Iconography**: Lucide React icons (compatible with shadcn/ui) or Heroicons
- **Spacing**: Consistent use of Tailwind spacing scale (multiples of 4px)
- **Borders & Shadows**: Subtle borders (`border-slate-200`), minimal shadows (`shadow-sm`, `shadow-md` for elevation)

**Logo/Branding Elements**:
- oFraud logo in sidebar or top navigation (if logo asset provided)
- No overly playful or cartoonish elements—this is a serious cybersecurity tool
- Optional: Dark mode toggle for administrator preference (post-MVP)

## Target Device and Platforms: Desktop Only (MVP), Web Responsive (Post-MVP)

**MVP Scope**:
- **Desktop-first design** optimized for 1280x720 minimum resolution up to 1920x1080 and beyond
- **Acceptable on tablets** (iPad, Android 10"+ in landscape) but not optimized
- **Not supported on mobile phones** (too small for data-dense admin interface)

**Post-MVP**:
- **Responsive breakpoints** for mobile/tablet administration (e.g., simplified incident triage on mobile)
- **Progressive web app (PWA)** capabilities for offline access (future consideration)

**Browser Support**:
- Chrome 90+ (primary testing target)
- Firefox 88+
- Safari 14+ (macOS and iOS tablets)
- Edge 90+

**Rationale**: Administrators primarily work from desktops/laptops in office environments. Mobile responsiveness is a nice-to-have for future phases but not essential for MVP delivery.

---
