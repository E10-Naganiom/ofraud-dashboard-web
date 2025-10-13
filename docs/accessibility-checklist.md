# Accessibility Testing Checklist - oFraud Admin Dashboard

## Overview

This checklist ensures the oFraud Admin Dashboard meets **WCAG 2.1 Level AA** accessibility standards. All pages and features should pass these tests before being marked as production-ready.

---

## Quick Reference: WCAG AA Requirements

- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold)
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Focus Indicators**: Visible focus outlines on all interactive elements
- **Screen Reader Support**: Proper semantic HTML and ARIA labels
- **Form Labels**: All inputs have associated labels
- **Alt Text**: All images have descriptive alt text

---

## Testing Tools

### Automated Testing
- **axe DevTools** (Browser Extension): https://www.deque.com/axe/devtools/
- **Lighthouse** (Chrome DevTools): Accessibility audit in Performance tab
- **WAVE** (Browser Extension): https://wave.webaim.org/extension/

### Manual Testing
- **Keyboard Only**: Navigate without mouse (Tab, Enter, Space, Escape, Arrow keys)
- **Screen Readers**:
  - **NVDA** (Windows - Free): https://www.nvaccess.org/
  - **JAWS** (Windows - Paid): https://www.freedomscientific.com/products/software/jaws/
  - **VoiceOver** (macOS - Built-in): Cmd+F5 to activate
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Browser Zoom**: Test at 200% zoom level

---

## Checklist by Category

### 1. Keyboard Navigation (WCAG 2.1.1, 2.1.2)

- [ ] **Tab Navigation Works**
  - All interactive elements (buttons, links, inputs, selects) are focusable
  - Tab order is logical (top to bottom, left to right)
  - No keyboard traps (can Tab out of all components)

- [ ] **Visible Focus Indicators**
  - All focusable elements have visible focus outlines
  - Focus ring uses brand color (`focus:ring-2 focus:ring-brand-primary`)
  - Focus indicator contrast ratio meets 3:1 minimum

- [ ] **Keyboard Shortcuts**
  - **Enter**: Activates buttons and submits forms
  - **Space**: Toggles checkboxes and activates buttons
  - **Escape**: Closes modals and dialogs
  - **Arrow Keys**: Navigate within dropdowns and select menus

- [ ] **Skip Links** (Optional for Admin Dashboard)
  - "Skip to main content" link for faster navigation

**How to Test**:
1. Disconnect mouse or don't use it
2. Press Tab repeatedly through each page
3. Verify you can reach all interactive elements
4. Ensure focus indicator is always visible
5. Try Enter, Space, and Escape keys on various components

---

### 2. Color Contrast (WCAG 1.4.3)

- [ ] **Text on Backgrounds**
  - Primary text (`#000000` on `#FFFFFF`): **21:1** ✅ (Excellent)
  - Secondary text (`#374151` on `#FFFFFF`): **12.6:1** ✅
  - Muted text (`#6B7280` on `#FFFFFF`): **4.5:1** ✅ (Minimum AA)
  - White text on green buttons (`#FFFFFF` on `#4ADE80`): **1.7:1** ⚠️ (Check if needs adjustment)

- [ ] **Status Badges**
  - Success (green background): Text contrast >= 4.5:1
  - Warning (orange/yellow background): Text contrast >= 4.5:1
  - Danger (red background): Text contrast >= 4.5:1

- [ ] **Links**
  - Blue accent links (`#2563EB` on `#FFFFFF`): **8.6:1** ✅
  - Hover states maintain sufficient contrast

- [ ] **Active Navigation**
  - Active sidebar items (white text on green): Verify readability

**How to Test**:
1. Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
2. Test foreground color vs. background color
3. Ensure all text combinations meet 4.5:1 (or 3:1 for large text)
4. Check badge text on colored backgrounds

---

### 3. Form Labels (WCAG 1.3.1, 3.3.2)

- [ ] **All Inputs Have Labels**
  - Every `<input>`, `<select>`, `<textarea>` has an associated `<label>`
  - Label `htmlFor` attribute matches input `id`
  - Labels are visible (not hidden with CSS)

- [ ] **Accessible Names for Controls**
  - Icon-only buttons have `aria-label`:
    ```tsx
    <button aria-label="Cerrar modal">
      <X className="w-4 h-4" />
    </button>
    ```
  - Checkboxes and radio buttons have visible labels
  - Select dropdowns have labels

- [ ] **Error Messages**
  - Error messages appear below inputs
  - Errors are announced to screen readers (`aria-live="polite"` or `role="alert"`)
  - Errors are associated with inputs (`aria-describedby`)

- [ ] **Required Fields**
  - Required inputs marked with `required` attribute
  - Required indicator visible (e.g., asterisk `*`)
  - Instructions provided before form (not just asterisks)

**How to Test**:
1. Inspect each form field in DevTools
2. Verify `<label for="field-id">` matches `<input id="field-id">`
3. Check all icon buttons for `aria-label` or `aria-labelledby`
4. Use screen reader to navigate forms and hear labels

---

### 4. Images and Icons (WCAG 1.1.1)

- [ ] **Alt Text for Images**
  - All `<img>` tags have `alt` attribute
  - Descriptive alt text for meaningful images (e.g., `alt="oFraud logo"`)
  - Empty alt text for decorative images (`alt=""`)

- [ ] **Icon Accessibility**
  - Decorative icons: `aria-hidden="true"` (no screen reader announcement)
  - Meaningful icons: Include text label or `aria-label`
  - Icon-only buttons: Always include `aria-label`

- [ ] **SVG Accessibility**
  - Decorative SVGs: Add `aria-hidden="true"`
  - Informative SVGs: Add `<title>` and `role="img"`

**Examples**:
```tsx
// Decorative icon
<Home className="w-5 h-5" aria-hidden="true" />
<span>Panel</span>

// Icon-only button
<button aria-label="Eliminar usuario">
  <Trash2 className="w-4 h-4" aria-hidden="true" />
</button>

// Decorative image
<img src="/images/bg-pattern.svg" alt="" />

// Meaningful image
<img src="/images/ofraud-logo.svg" alt="oFraud - Protección digital" />
```

**How to Test**:
1. Inspect images and icons in DevTools
2. Verify all have `alt` attributes (even if empty)
3. Use screen reader to navigate page - decorative icons should be skipped

---

### 5. Semantic HTML (WCAG 1.3.1)

- [ ] **Proper Heading Hierarchy**
  - Page has one `<h1>` (main title)
  - Headings nest logically: `<h1>` → `<h2>` → `<h3>` (no skipping levels)
  - Headings describe content structure

- [ ] **Landmark Regions**
  - Use `<nav>` for navigation
  - Use `<main>` for main content
  - Use `<section>` for content sections
  - Use `<article>` for independent content (e.g., incident cards)
  - Use `<footer>` for page footer

- [ ] **Lists**
  - Navigation menus use `<ul>` and `<li>`
  - Ordered lists use `<ol>` when sequence matters
  - Definition lists use `<dl>`, `<dt>`, `<dd>` for key-value pairs

- [ ] **Buttons vs. Links**
  - Buttons (`<button>`) for actions (e.g., "Guardar", "Eliminar")
  - Links (`<a>`) for navigation (e.g., "Ver detalles", "Ir a página")

**How to Test**:
1. Use browser DevTools to inspect HTML structure
2. Run axe DevTools and check for "Heading order" and "Landmark" issues
3. Use screen reader to navigate by headings (H key in NVDA/JAWS)

---

### 6. ARIA Attributes (WCAG 4.1.2)

- [ ] **Modals and Dialogs**
  - `role="dialog"` or `role="alertdialog"`
  - `aria-modal="true"` to indicate modal behavior
  - `aria-labelledby` points to dialog title
  - Focus trapped within modal when open
  - Focus returned to trigger element when closed

- [ ] **Dropdowns and Menus**
  - `role="menu"` and `role="menuitem"` for menus
  - `aria-haspopup="true"` on trigger buttons
  - `aria-expanded="true/false"` to indicate state

- [ ] **Status Messages**
  - `role="status"` or `aria-live="polite"` for non-urgent updates (e.g., "Guardado")
  - `role="alert"` or `aria-live="assertive"` for urgent messages (e.g., errors)

- [ ] **Loading States**
  - `aria-busy="true"` while loading
  - `aria-live="polite"` to announce when loading completes
  - Loading spinners have `aria-label="Cargando"`

**How to Test**:
1. Use axe DevTools to check for ARIA issues
2. Use screen reader to interact with modals, dropdowns, and dynamic content
3. Verify announcements for status messages and loading states

---

### 7. Responsive and Zoom (WCAG 1.4.4, 1.4.10)

- [ ] **Zoom to 200%**
  - Page remains functional at 200% browser zoom
  - No horizontal scrolling at 200% zoom (at 1280px width)
  - Text remains readable
  - No content is cut off or overlapping

- [ ] **Responsive Breakpoints**
  - Test at 1280x720 (minimum supported resolution)
  - Test at 1920x1080 (standard desktop)
  - Verify grids stack properly (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
  - Tables scroll horizontally if too wide (with visible scrollbar)

**How to Test**:
1. Open page in Chrome DevTools
2. Set device toolbar to 1280x720
3. Use browser zoom (Cmd/Ctrl + Plus) to zoom to 200%
4. Verify no horizontal scroll and all content is accessible

---

### 8. Cross-Browser Testing (WCAG 4.1.1)

- [ ] **Chrome** (Primary Browser)
  - All functionality works
  - Visual consistency matches design
  - No console errors

- [ ] **Firefox**
  - All functionality works
  - CSS renders consistently
  - Focus indicators visible
  - No JavaScript errors

- [ ] **Safari** (if macOS available)
  - All functionality works
  - Webkit-specific rendering correct
  - Date inputs work properly

- [ ] **Edge**
  - All functionality works (Chromium-based, should match Chrome)

**How to Test**:
1. Open dashboard in each browser
2. Navigate through key pages (Login, Dashboard, Incidents, Users, Categories)
3. Test form submissions
4. Check for visual inconsistencies

---

## Page-by-Page Checklist

### Login Page (`/login`)

- [ ] Keyboard navigation works (Tab through email, password, submit button)
- [ ] Focus indicators visible on all fields
- [ ] Email and password inputs have labels
- [ ] Error messages announced to screen readers
- [ ] "Regístrate" link has sufficient contrast
- [ ] Page title is `<h1>`

### Register Page (`/register`)

- [ ] Keyboard navigation works
- [ ] All 5 inputs have visible labels
- [ ] Password requirements explained
- [ ] Error messages accessible
- [ ] "Inicia sesión" link has sufficient contrast

### Dashboard Home (`/dashboard`)

- [ ] Heading hierarchy: `<h1>` for "Panel de Administración", `<h2>` for sections
- [ ] Metric cards accessible (screen reader announces value and label)
- [ ] Navigation sidebar keyboard accessible
- [ ] Active nav item has sufficient contrast
- [ ] Logout button has visible focus indicator

### Incidents List (`/dashboard/incidents`)

- [ ] Table headers use `<th scope="col">`
- [ ] Status badges have sufficient contrast
- [ ] Filter controls have labels
- [ ] "Ver detalles" buttons keyboard accessible
- [ ] Pagination controls keyboard accessible

### Incident Detail (`/dashboard/incidents/[id]`)

- [ ] Heading hierarchy logical
- [ ] Evidence images have alt text
- [ ] Approve/Reject buttons keyboard accessible
- [ ] Supervisor dropdown has label
- [ ] Modal (if used) traps focus and closes with Escape

### Users Management (`/dashboard/users`)

- [ ] Table accessible
- [ ] "Crear usuario" button keyboard accessible
- [ ] Active/inactive toggles keyboard accessible (Space to toggle)
- [ ] Edit/delete buttons have aria-labels if icon-only

### Categories Management (`/dashboard/categories`)

- [ ] Category cards keyboard accessible
- [ ] "Nueva categoría" button accessible
- [ ] Category icons have decorative `aria-hidden="true"`
- [ ] Edit/delete modals accessible

### Profile Page (`/dashboard/profile`)

- [ ] Form inputs have labels
- [ ] Save button keyboard accessible
- [ ] Success/error toasts announced to screen readers

---

## Automated Audit Procedure

### Using axe DevTools

1. Install axe DevTools extension: https://www.deque.com/axe/devtools/
2. Open browser DevTools (F12)
3. Navigate to "axe DevTools" tab
4. Click "Scan ALL of my page"
5. Review results:
   - **Critical**: Must fix before production
   - **Serious**: Should fix before production
   - **Moderate**: Fix if time permits
   - **Minor**: Enhancements for better accessibility
6. Click on each issue for remediation guidance

### Using Lighthouse

1. Open Chrome DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. Review score (aim for 90+)
6. Expand failed audits for details

### Pages to Audit

Run axe DevTools and Lighthouse on these pages:
- [ ] `/login`
- [ ] `/register`
- [ ] `/dashboard`
- [ ] `/dashboard/incidents`
- [ ] `/dashboard/incidents/[id]` (pick a real incident)
- [ ] `/dashboard/users`
- [ ] `/dashboard/users/new`
- [ ] `/dashboard/categories`
- [ ] `/dashboard/categories/new`
- [ ] `/dashboard/profile`

---

## Manual Keyboard Navigation Test

### Test Procedure

1. **Disconnect Mouse** (or don't use it)
2. **Tab Through Entire Page**:
   - Press Tab repeatedly
   - Verify you can reach every interactive element
   - Check focus indicator is always visible
3. **Test Interactions**:
   - **Enter**: Submit forms, activate buttons
   - **Space**: Toggle checkboxes, activate buttons
   - **Escape**: Close modals/dialogs
   - **Arrow Keys**: Navigate dropdowns, select options
4. **Reverse Tab (Shift+Tab)**:
   - Verify you can tab backwards through elements
5. **Tab Order**:
   - Verify tab order is logical (left to right, top to bottom)

### Pages to Test

- [ ] Login page
- [ ] Register page
- [ ] Dashboard home
- [ ] Incidents list
- [ ] Incident detail page with evaluation form
- [ ] Users management
- [ ] Categories management

---

## Screen Reader Test (Optional but Recommended)

### NVDA (Windows)

1. Download NVDA: https://www.nvaccess.org/download/
2. Install and launch NVDA (it will start speaking immediately)
3. Navigate dashboard:
   - **H**: Jump between headings
   - **Tab**: Move through interactive elements
   - **Insert+Down Arrow**: Read next line
   - **Insert+Space**: Toggle browse mode / focus mode
4. Listen for:
   - Page titles announced
   - Form labels read before inputs
   - Button purposes clear
   - Error messages announced
   - Status updates announced (toasts)

### VoiceOver (macOS)

1. Press **Cmd+F5** to activate VoiceOver
2. Navigate dashboard:
   - **VO+Right Arrow**: Next element
   - **VO+Command+H**: Next heading
   - **Tab**: Interactive elements
3. Press **Cmd+F5** again to deactivate

---

## Known Limitations & Future Improvements

### Current Limitations (MVP)

- **Mobile Responsive**: Desktop-first, mobile support limited
- **Screen Magnification**: Not optimized for screen magnifiers (ZoomText)
- **Voice Control**: Not tested with Dragon NaturallySpeaking or Voice Control
- **Dark Mode**: Not implemented (light mode only)

### Post-MVP Enhancements

- [ ] Add skip navigation links
- [ ] Implement dark mode with accessible contrast ratios
- [ ] Add keyboard shortcuts documentation page
- [ ] Support reduced motion preferences (`prefers-reduced-motion`)
- [ ] Add focus visible polyfill for older browsers
- [ ] Implement live region announcements for dynamic content updates

---

## Resources

- **WCAG 2.1 Quick Reference**: https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM Accessibility Checklist**: https://webaim.org/standards/wcag/checklist
- **Deque University**: https://dequeuniversity.com/ (free accessibility courses)
- **A11y Project Checklist**: https://www.a11yproject.com/checklist/
- **MDN Accessibility Guide**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

*Last Updated: 2025-10-12*
*Version: 1.0*
