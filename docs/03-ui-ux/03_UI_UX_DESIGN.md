# PrepSpace — UI/UX Design System & Responsive Specification

**Document Identifier**: `DOC-UIUX-003`  
**Version**: `1.0.0`  
**Status**: `AUTHORITATIVE / APPROVED`  
**Last Updated**: `2026-09-08`  
**Author**: UI/UX Architect & Frontend Engineering Group  
**Target Platform**: PrepSpace ([stream-in.app](https://stream-in.app))  

---

## 1. Design Philosophy & Brand Language

PrepSpace is built upon a **High-Focus, Neo-SaaS Aesthetic** combining modern dark-mode glassmorphism with Google Material Design principles. The UI eliminates visual noise, placing paramount emphasis on readability, code comprehension, and high-velocity study workflows.

### Core Tenets:
1. **Zero Distraction / High Contrast**: Deep slate backgrounds (`#0a0f1d`, `#0f172a`) paired with crisp typography (`#f8fafc`) ensure long, fatigue-free study sessions.
2. **Instant Visual Hierarchy**: Vibrant semantic accents (Indigo for primary actions, Emerald for completed problems, Amber for Pro-tier gates, Rose for critical alerts) guide candidate focus.
3. **Tactile Micro-Interactions**: Subtle glass borders (`rgba(255, 255, 255, 0.08)`), backdrop blur filters ($12\text{px}$), and smooth state transitions ($150\text{ms}$) provide a tactile, desktop-grade feel.
4. **Mobile-First Parity**: Every capability available on desktop must be accessible on mobile viewports down to 320px without functional compromise or horizontal overflow.

---

## 2. Color System & Design Tokens

### 2.1 Core Palette Tokens
```css
:root {
  /* Surface & Background */
  --bg-primary: #0a0f1d;
  --bg-secondary: #0f172a;
  --bg-card: rgba(15, 23, 42, 0.75);
  --bg-glass: rgba(30, 41, 59, 0.5);
  --border-glass: rgba(255, 255, 255, 0.08);
  --border-subtle: rgba(255, 255, 255, 0.05);

  /* Typography */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Brand & Accents */
  --accent-primary: #6366f1; /* Indigo */
  --accent-hover: #4f46e5;
  --accent-cyan: #06b6d4;    /* Cyan Tech */
  --accent-success: #10b981; /* Emerald Success */
  --accent-warning: #f59e0b; /* Amber Pro Gating */
  --accent-danger: #ef4444;  /* Rose Danger */

  /* Digital Reader Themes */
  --reader-bg-dark: #0a0f1d;
  --reader-text-dark: #e2e8f0;
  --reader-bg-sepia: #fbf0d9;
  --reader-text-sepia: #5f4b32;
  --reader-bg-paper: #ffffff;
  --reader-text-paper: #1e293b;
  --reader-bg-night: #000000;
  --reader-text-night: #94a3b8;
}
```

---

## 3. Typography & Spacing System

### 3.1 Font Families
- **Display & Headings**: `Outfit`, sans-serif (Font weights: 600, 700, 800).
- **Body Prose**: `Plus Jakarta Sans`, system-ui, sans-serif (Font weights: 400, 500, 600).
- **Monospace Code**: `Fira Code`, `JetBrains Mono`, `Consolas`, monospace.

### 3.2 Type Scale
| Token | Font Size | Line Height | Weight | Primary Usage |
| :--- | :--- | :--- | :--- | :--- |
| `fs-display` | $2.5\text{rem}$ ($40\text{px}$) | $1.2$ | 800 | Hero Titles |
| `fs-h1` | $2.0\text{rem}$ ($32\text{px}$) | $1.25$ | 700 | Primary View Titles |
| `fs-h2` | $1.5\text{rem}$ ($24\text{px}$) | $1.3$ | 700 | Section Headers, Book Titles |
| `fs-h3` | $1.25\text{rem}$ ($20\text{px}$) | $1.4$ | 600 | Card Titles, Chapter Headers |
| `fs-body` | $0.9375\text{rem}$ ($15\text{px}$) | $1.5$ | 400 | General Paragraph Text |
| `fs-sm` | $0.8125\text{rem}$ ($13\text{px}$) | $1.4$ | 500 | Badges, Table Cells, Metadata |
| `fs-xs` | $0.6875\text{rem}$ ($11\text{px}$) | $1.3$ | 600 | Pills, Timestamps, Sub-labels |

### 3.3 8pt Spacing Grid
- `space-1`: $4\text{px}$ (Micro offsets, badge paddings)
- `space-2`: $8\text{px}$ (Gap between icons and labels)
- `space-3`: $12\text{px}$ (Form control vertical padding)
- `space-4`: $16\text{px}$ (Standard card padding, component margins)
- `space-6`: $24\text{px}$ (Section gutters, grid gap)
- `space-8`: $32\text{px}$ (Major module separators)

---

## 4. Comprehensive 15-Breakpoint Responsive Specification

To eliminate responsive defects, layout behavior is defined across **15 exact viewports**:

| Screen Width | Target Device Class | Sidebar / Nav Behavior | Grid Columns | Table Behavior | Touch Target | Overflow Rule |
| :---: | :--- | :--- | :---: | :--- | :---: | :---: |
| **320px** | iPhone SE (1st gen), JioPhone | Collapsed Offcanvas | 1 Col | Card View Transformation | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **360px** | Galaxy S8/S9, Redmi Entry | Collapsed Offcanvas | 1 Col | Card View Transformation | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **375px** | iPhone SE/8/Mini | Collapsed Offcanvas | 1 Col | Card View Transformation | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **390px** | iPhone 12/13/14/15 Pro | Collapsed Offcanvas | 1 Col | Card View Transformation | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **393px** | Google Pixel 7/8 | Collapsed Offcanvas | 1 Col | Card View Transformation | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **414px** | iPhone Plus / Max | Collapsed Offcanvas | 1 Col | Horizontal Scroll Container | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **430px** | iPhone 15/16 Pro Max | Collapsed Offcanvas | 1 Col | Horizontal Scroll Container | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **480px** | Phablet / Small Landscape | Collapsed Offcanvas | 1-2 Col | Horizontal Scroll Container | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **600px** | Small Android Tablet | Collapsed Offcanvas | 2 Col | Internal Responsive Table | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **768px** | iPad Portrait, Android Tablets| Icon Rail or Drawer | 2 Col | Standard Table | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **820px** | iPad Air | Mini-Sidebar | 2-3 Col | Standard Table | $\ge 44\text{px}$ | `scrollWidth <= innerWidth` |
| **1024px** | iPad Pro, Small Ultrabook | Full Fixed Sidebar | 3 Col | Standard Table | Desktop | `scrollWidth <= innerWidth` |
| **1280px** | Standard Laptops | Full Fixed Sidebar | 3 Col | Standard Table | Desktop | `scrollWidth <= innerWidth` |
| **1440px** | MacBook Pro, QHD Monitor | Full Fixed Sidebar | 3-4 Col| Standard Table with Stats | Desktop | `scrollWidth <= innerWidth` |
| **1920px** | Full HD & 4K Workstations | Fixed Sidebar + Max-W | 4 Col | Expanded Table with Trends| Desktop | Max Container $1600\text{px}$ |

### 4.1 Responsive Rules of Engagement
1. **No Fixed Widths on Root Elements**: Container elements must never define fixed pixel widths (`width: 500px`). Always utilize percentage or responsive utility classes (`w-100`, `max-width: 100%`).
2. **Strict Media Query Typography**: On screens $\le 576\text{px}$, headings scale down by $20-30\%$ to prevent header wrapping from pushing action buttons off-screen.
3. **Table to Card Conversion**: On mobile screens $< 600\text{px}$, tabular data (e.g. Question lists, Placement trackers, Admin user tables) must render as vertically stacked cards with key-value pairs rather than generating horizontal viewport scrollbars.
4. **Touch-Safe Form Controls**: Inputs, buttons, and select dropdowns must possess minimum tap heights of $44\text{px}$ with touch cushions.

---

## 5. Component Specifications

### 5.1 Technical Library Book Card (`.library-book-card`)
- **Structure**: Glassmorphic container with 3D gradient cover preview, domain badge, difficulty pill (Beginner/Intermediate/Advanced), title, subtitle, page count, and action button.
- **Pro Gating State**: If `book.isPro === true`, render an Amber Pro badge (`👑 PRO`). If candidate is Free, action button renders `"Explore Syllabus"`. If candidate is Pro, button renders `"Start Reading"`.
- **Hover Micro-interaction**: Card elevates by $-4\text{px}$ with a subtle glow border (`rgba(99, 102, 241, 0.3)`).

### 5.2 Digital Technical Reader (`.technical-reader-wrapper`)
- **Sticky Header**: Fixed at `top: 0`, containing Overview breadcrumb, Table of Contents trigger, bookmark toggle, typography zoom buttons ($A-$, $A+$), and theme dropdown.
- **Scroll Indicator**: $3\text{px}$ high progress bar at top edge tracking reading depth dynamically.
- **Table of Contents Drawer**: Offcanvas panel sliding from left displaying full chapter syllabus with completion checkboxes and 🔒 lock badges.
- **Pro Lockout Card**: When a Free user accesses a Pro chapter:
  - Text prose is replaced with a glassmorphic paywall container.
  - Features gold lock icon, value proposition summary, and direct CTA to `#/billing`.

### 5.3 Multi-Language Coding IDE (`.coding-workspace`)
- **Split Layout**: Two-column layout on desktop ($\ge 1024\text{px}$) with problem description on left and editor/console on right. On mobile ($< 1024\text{px}$), layout stacks vertically with tab switcher (`Problem` vs `Code Editor`).
- **Editor Controls**: Language selector (Java, Python, C++, JavaScript), Run Code button, Submit Solution button, and Reset Code button.

---

## 6. UI/UX Bug Register & Defect Resolution

| Bug ID | Severity | Affected Area | Root Cause | Fix Strategy | Verification Method |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **`UI-BUG-001`** | **CRITICAL** | Mobile Viewports ($< 400\text{px}$) | Unbounded flex titles in top navbar pushing user dropdown off-screen. | Added `.text-truncate`, `min-width: 0`, and flexible flex shrink rules on title containers. | Edge CDP test at $320\text{px}$ verifying `overflowDelta == 0`. |
| **`UI-BUG-002`** | **MAJOR** | DSA Roadmap Diagram | Fixed-width SVG nodes exceeding viewport width on mobile devices. | Replaced fixed SVG canvas widths with `viewBox="0 0 800 600"` and `width="100%"` CSS scaling. | Visual inspection on iPhone and SE screenshots. |
| **`UI-BUG-003`** | **MAJOR** | Admin Data Tables | Wide tabular rows forcing page-level horizontal scrolling on tablet viewports. | Wrapped tables in `.table-responsive` with custom styled internal scrollbars. | Edge CDP test at $768\text{px}$ verifying zero document-level scroll. |
| **`UI-BUG-004`** | **MINOR** | Digital Reader Typography | Prose font remaining static on mobile, making small screens difficult to read. | Added dynamic font resize handler ($14-22\text{px}$) persisting preference in `localStorage`. | Manual button click verification toggling font size. |
| **`UI-BUG-005`** | **MAJOR** | Category Pills Scroller | Multi-line wrapping of category pills breaking vertical visual balance. | Implemented `.library-categories-scroller` with `white-space: nowrap`, `overflow-x: auto`, and hidden scrollbars. | Screenshot verification on mobile catalog view. |
