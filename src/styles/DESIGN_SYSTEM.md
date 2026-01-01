# 🎨 Design System Documentation

> **Version**: 2.0  
> **Last Updated**: January 2026  
> **Framework**: React + Tailwind CSS + shadcn/ui

---

## Table of Contents

1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Sizing](#spacing--sizing)
5. [Shadows & Elevation](#shadows--elevation)
6. [Animations & Transitions](#animations--transitions)
7. [Glassmorphism Effects](#glassmorphism-effects)
8. [Gradients](#gradients)
9. [Component Styles](#component-styles)
10. [Z-Index Scale](#z-index-scale)
11. [Breakpoints](#breakpoints)
12. [Usage Examples](#usage-examples)
13. [Best Practices](#best-practices)

---

## Overview

This design system provides a consistent, scalable foundation for building modern web interfaces. It uses CSS custom properties (variables) for theming, ensuring both light and dark mode support with minimal effort.

### Architecture

```
src/
├── index.css           # CSS custom properties (source of truth)
├── styles/
│   ├── tokens.ts       # TypeScript token exports
│   ├── index.ts        # Barrel export
│   └── DESIGN_SYSTEM.md # This documentation
└── tailwind.config.ts  # Tailwind integration
```

### Key Principles

- **Semantic Tokens**: Use meaningful names (`--primary`, `--destructive`) instead of literal values
- **HSL Colors**: All colors use HSL format for easy opacity manipulation
- **Theme-First**: Design with both light and dark modes in mind
- **Consistency**: Reuse tokens instead of creating one-off values

---

## Color Palette

### Core Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `210 20% 98%` | `220 16% 8%` | Page background |
| `--foreground` | `220 16% 12%` | `210 20% 95%` | Primary text |

**Tailwind Classes**: `bg-background`, `text-foreground`

### Surface Colors

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `--card` | Card/panel backgrounds | `bg-card` |
| `--card-foreground` | Text on cards | `text-card-foreground` |
| `--popover` | Popover backgrounds | `bg-popover` |
| `--popover-foreground` | Text on popovers | `text-popover-foreground` |

### Brand Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--primary` | `187 85% 43%` (Cyan) | `187 92% 55%` | Primary actions, links |
| `--secondary` | `210 20% 93%` | `220 16% 16%` | Secondary actions |
| `--accent` | `267 75% 58%` (Purple) | `267 84% 68%` | Highlights, accents |

**Tailwind Classes**: 
- `bg-primary`, `text-primary`, `bg-primary/50` (with opacity)
- `bg-secondary`, `text-secondary-foreground`
- `bg-accent`, `text-accent-foreground`

### Semantic Colors

| Token | HSL Value | Usage | Tailwind |
|-------|-----------|-------|----------|
| `--destructive` | `0 72% 51%` | Errors, danger | `bg-destructive`, `text-destructive` |
| `--success` | `140 60% 38%` | Success states | `bg-success`, `text-success` |
| `--warning` | `40 90% 45%` | Warnings | `bg-warning`, `text-warning` |
| `--info` | `210 90% 50%` | Informational | `bg-info`, `text-info` |

### Muted Colors

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| `--muted` | Muted backgrounds | `bg-muted` |
| `--muted-foreground` | Secondary text, placeholders | `text-muted-foreground` |

### Border & Input

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| `--border` | Default borders | `border-border` |
| `--input` | Input backgrounds | `bg-input` |
| `--ring` | Focus rings | `ring-ring` |

### Provider Colors

Special colors for AI provider branding:

| Provider | Token | Light Mode | Tailwind |
|----------|-------|------------|----------|
| Claude | `--claude` | `270 80% 55%` | `text-claude`, `bg-claude` |
| Antigravity | `--antigravity` | `210 90% 50%` | `text-antigravity` |
| Gemini | `--gemini` | `280 60% 55%` | `text-gemini` |
| Copilot | `--copilot` | `24 90% 45%` | `text-copilot` |
| GLM | `--glm` | `0 70% 50%` | `text-glm` |
| OpenRouter | `--openrouter` | `160 80% 38%` | `text-openrouter` |

### Priority Colors

| Priority | Token | Color | Tailwind |
|----------|-------|-------|----------|
| High | `--priority-high` | Red | `text-priority-high` |
| Medium | `--priority-medium` | Amber | `text-priority-medium` |
| Low | `--priority-low` | Green | `text-priority-low` |

### Status Colors

| Status | Token | Color | Tailwind |
|--------|-------|-------|----------|
| Online | `--status-online` | Green | `bg-status-online` |
| Offline | `--status-offline` | Red | `bg-status-offline` |
| Degraded | `--status-degraded` | Amber | `bg-status-degraded` |

---

## Typography

### Font Families

| Family | Token | Stack | Usage |
|--------|-------|-------|-------|
| Sans | `--font-sans` | `'Inter', system-ui, sans-serif` | Body text, UI |
| Mono | `--font-mono` | `'JetBrains Mono', monospace` | Code, technical |

**Tailwind Classes**: `font-sans`, `font-mono`

### Font Sizes

| Token | Size | Line Height | Tailwind |
|-------|------|-------------|----------|
| `2xs` | 0.625rem (10px) | 0.875rem | `text-2xs` |
| `xs` | 0.75rem (12px) | 1rem | `text-xs` |
| `sm` | 0.875rem (14px) | 1.25rem | `text-sm` |
| `base` | 1rem (16px) | 1.5rem | `text-base` |
| `lg` | 1.125rem (18px) | 1.75rem | `text-lg` |
| `xl` | 1.25rem (20px) | 1.75rem | `text-xl` |
| `2xl` | 1.5rem (24px) | 2rem | `text-2xl` |
| `3xl` | 1.875rem (30px) | 2.25rem | `text-3xl` |
| `4xl` | 2.25rem (36px) | 2.5rem | `text-4xl` |
| `5xl` | 3rem (48px) | 1 | `text-5xl` |

### Font Weights

| Weight | Value | Tailwind |
|--------|-------|----------|
| Light | 300 | `font-light` |
| Normal | 400 | `font-normal` |
| Medium | 500 | `font-medium` |
| Semibold | 600 | `font-semibold` |
| Bold | 700 | `font-bold` |

### Letter Spacing

| Token | Value | Tailwind |
|-------|-------|----------|
| Tighter | -0.05em | `tracking-tighter` |
| Tight | -0.025em | `tracking-tight` |
| Normal | 0em | `tracking-normal` |
| Wide | 0.025em | `tracking-wide` |
| Wider | 0.05em | `tracking-wider` |
| Widest | 0.1em | `tracking-widest` |

---

## Spacing & Sizing

### Spacing Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `0` | 0 | 0px | No spacing |
| `0.5` | 0.125rem | 2px | Micro spacing |
| `1` | 0.25rem | 4px | Tight spacing |
| `1.5` | 0.375rem | 6px | |
| `2` | 0.5rem | 8px | Small spacing |
| `3` | 0.75rem | 12px | |
| `4` | 1rem | 16px | Default spacing |
| `5` | 1.25rem | 20px | |
| `6` | 1.5rem | 24px | Medium spacing |
| `8` | 2rem | 32px | Large spacing |
| `10` | 2.5rem | 40px | |
| `12` | 3rem | 48px | Section spacing |
| `16` | 4rem | 64px | |
| `20` | 5rem | 80px | Large sections |
| `24` | 6rem | 96px | |

### Border Radius

| Token | Value | Tailwind |
|-------|-------|----------|
| `--radius` | 0.75rem (12px) | `rounded-lg` |
| `--radius-sm` | 0.5rem (8px) | `rounded-sm` |
| `--radius-lg` | 1rem (16px) | `rounded-xl` |
| `--radius-xl` | 1.5rem (24px) | `rounded-xl` |

### Component Sizes

#### Icons

| Size | Value | Pixels |
|------|-------|--------|
| xs | 0.75rem | 12px |
| sm | 1rem | 16px |
| md | 1.25rem | 20px |
| lg | 1.5rem | 24px |
| xl | 2rem | 32px |

#### Buttons

| Size | Height | Usage |
|------|--------|-------|
| xs | 1.75rem (28px) | Compact UI |
| sm | 2rem (32px) | Small buttons |
| md | 2.5rem (40px) | Default |
| lg | 2.75rem (44px) | Primary actions |
| xl | 3rem (48px) | Hero CTAs |

#### Avatars

| Size | Value | Pixels |
|------|-------|--------|
| xs | 1.5rem | 24px |
| sm | 2rem | 32px |
| md | 2.5rem | 40px |
| lg | 3rem | 48px |
| xl | 4rem | 64px |

#### Sidebar

| State | Width |
|-------|-------|
| Collapsed | 3.5rem (56px) |
| Compact | 4rem (64px) |
| Default | 15rem (240px) |
| Wide | 18rem (288px) |

---

## Shadows & Elevation

### Shadow Scale

| Token | Value | Tailwind |
|-------|-------|----------|
| `--shadow-sm` | `0 1px 2px 0 hsl(220 16% 12% / 0.05)` | `shadow-sm` |
| `--shadow-md` | `0 4px 6px -1px hsl(220 16% 12% / 0.1)` | `shadow-md` |
| `--shadow-lg` | `0 10px 15px -3px hsl(220 16% 12% / 0.1)` | `shadow-lg` |
| `--shadow-xl` | `0 20px 25px -5px hsl(220 16% 12% / 0.1)` | `shadow-xl` |
| `--shadow-inset` | `inset 0 2px 4px 0 hsl(220 16% 12% / 0.05)` | `shadow-inset` |

### Special Shadows

| Token | Description | Tailwind |
|-------|-------------|----------|
| `--shadow-glow` | Primary color glow | `shadow-glow` |
| `--shadow-card` | Card elevation | `shadow-card` |
| Primary Glow | `0 0 40px hsl(var(--primary) / 0.15)` | `shadow-primary-glow` |
| Accent Glow | `0 0 40px hsl(var(--accent) / 0.15)` | `shadow-accent-glow` |

---

## Animations & Transitions

### Timing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-linear` | `linear` | Constant speed |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerate |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerate |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Bouncy |
| `--ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful |

**Tailwind**: `ease-spring`, `ease-bounce`

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 0ms | Immediate |
| `--duration-fast` | 100ms | Micro-interactions |
| `--duration-normal` | 200ms | Default transitions |
| `--duration-slow` | 300ms | Complex animations |
| `--duration-slower` | 500ms | Large movements |

**Tailwind**: `duration-fast`, `duration-normal`, `duration-slow`, `duration-slower`

### Animation Presets

| Animation | Tailwind Class | Description |
|-----------|----------------|-------------|
| Fade In | `animate-fade-in` | Fade + slide up |
| Fade Out | `animate-fade-out` | Fade + slide down |
| Scale In | `animate-scale-in` | Scale from 95% |
| Scale Out | `animate-scale-out` | Scale to 95% |
| Slide In Left | `animate-slide-in-left` | Slide from left |
| Slide In Right | `animate-slide-in-right` | Slide from right |
| Pulse Glow | `animate-pulse-glow` | Glowing pulse effect |
| Shimmer | `animate-shimmer` | Loading shimmer |
| Spin Slow | `animate-spin-slow` | Slow rotation |
| Accordion Down | `animate-accordion-down` | Expand content |
| Accordion Up | `animate-accordion-up` | Collapse content |

### Typing Indicator

```css
.animate-typing        /* Base typing animation */
.animate-typing-delay-1  /* 0.2s delay */
.animate-typing-delay-2  /* 0.4s delay */
```

### Utility Class

```css
.transition-smooth  /* all 0.3s ease-out */
```

---

## Glassmorphism Effects

### CSS Variables

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--glass-bg` | `0 0% 100% / 0.9` | `220 16% 12% / 0.8` |
| `--glass-border` | `214 20% 85% / 0.6` | `220 16% 25% / 0.5` |
| `--glass-blur` | `12px` | `12px` |

### Usage

```html
<div class="glass-card">
  <!-- Content -->
</div>
```

**CSS Output**:
```css
.glass-card {
  @apply bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl;
}
```

---

## Gradients

### Predefined Gradients

| Token | Definition | Usage |
|-------|------------|-------|
| `--gradient-primary` | Cyan → Purple (135deg) | Primary CTAs |
| `--gradient-claude` | Purple variations | Claude branding |
| `--gradient-success` | Green variations | Success states |
| `--gradient-warning` | Amber variations | Warning states |
| `--gradient-destructive` | Red variations | Error states |

### Tailwind Classes

```html
<div class="bg-gradient-primary">Primary gradient</div>
<div class="bg-gradient-success">Success gradient</div>
```

### Gradient Text

```html
<span class="gradient-text">Gradient text effect</span>
```

---

## Component Styles

### Provider Badges

```html
<span class="provider-claude">Claude</span>
<span class="provider-gemini">Gemini</span>
<span class="provider-copilot">Copilot</span>
<span class="provider-antigravity">Antigravity</span>
```

### Priority Badges

```html
<span class="priority-high">High</span>
<span class="priority-medium">Medium</span>
<span class="priority-low">Low</span>
```

### Status Indicators

```html
<span class="status-online w-2 h-2 rounded-full"></span>
<span class="status-offline w-2 h-2 rounded-full"></span>
<span class="status-degraded w-2 h-2 rounded-full"></span>
```

### Tab Active State

```html
<button class="tab-active">Active Tab</button>
```

### Glow Effects

```html
<div class="glow-primary">Glowing element</div>
```

---

## Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Hide | -1 | Hidden elements |
| Base | 0 | Default stacking |
| Dropdown | 10 | Dropdown menus |
| Sticky | 20 | Sticky headers |
| Fixed | 30 | Fixed elements |
| Overlay | 40 | Backdrop overlays |
| Modal | 50 | Modal dialogs |
| Popover | 60 | Popovers |
| Tooltip | 70 | Tooltips |
| Toast | 80 | Toast notifications |
| Max | 9999 | Maximum priority |

---

## Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1400px | Large screens |

**Usage**:
```html
<div class="p-4 md:p-6 lg:p-8">Responsive padding</div>
```

---

## Usage Examples

### Importing Tokens in TypeScript

```typescript
import { colors, typography, spacing } from '@/styles/tokens';
import tokens from '@/styles/tokens';

// Access color values
const primaryColor = colors.primary; // 'hsl(var(--primary))'

// Use helper functions
import { getColor, withAlpha } from '@/styles/tokens';

const primaryHalf = getColor('--primary', 0.5); // 'hsl(var(--primary) / 0.5)'
const mutedBg = withAlpha(colors.muted, 0.3);
```

### Tailwind Usage

```html
<!-- Colors -->
<div class="bg-background text-foreground">Base text</div>
<div class="bg-primary text-primary-foreground">Primary button</div>
<div class="bg-card border-border">Card component</div>

<!-- With opacity -->
<div class="bg-primary/50">50% primary background</div>
<div class="text-muted-foreground/80">80% muted text</div>

<!-- Semantic colors -->
<div class="bg-success text-success-foreground">Success message</div>
<div class="bg-destructive text-destructive-foreground">Error message</div>

<!-- Shadows -->
<div class="shadow-card">Card with shadow</div>
<div class="shadow-glow">Glowing element</div>

<!-- Animations -->
<div class="animate-fade-in">Fading in</div>
<div class="animate-pulse-glow">Pulsing glow</div>

<!-- Transitions -->
<button class="transition-smooth hover:bg-primary/80">Smooth button</button>
<div class="duration-fast ease-out">Fast transition</div>
```

### Sidebar Theming

```html
<aside class="bg-sidebar text-sidebar-foreground border-sidebar-border">
  <button class="bg-sidebar-accent text-sidebar-accent-foreground">
    Menu Item
  </button>
</aside>
```

---

## Best Practices

### ✅ DO

1. **Use semantic tokens** instead of literal colors
   ```html
   <!-- Good -->
   <div class="text-foreground bg-card">
   
   <!-- Bad -->
   <div class="text-gray-900 bg-white">
   ```

2. **Leverage opacity modifiers** for variations
   ```html
   <div class="bg-primary/10 text-primary">Subtle primary background</div>
   ```

3. **Use the transition utilities** for consistent animations
   ```html
   <button class="transition-smooth hover:bg-primary/80">Hover me</button>
   ```

4. **Reference the z-index scale** for stacking
   ```typescript
   import { zIndex } from '@/styles/tokens';
   // Use zIndex.modal for modal dialogs
   ```

5. **Import tokens for programmatic access**
   ```typescript
   import { colors, getColor } from '@/styles/tokens';
   ```

### ❌ DON'T

1. **Don't hardcode colors**
   ```html
   <!-- Avoid -->
   <div style="color: #0ea5e9">
   ```

2. **Don't create arbitrary values**
   ```html
   <!-- Avoid -->
   <div class="p-[13px] mt-[7px]">
   ```

3. **Don't mix design systems**
   ```html
   <!-- Avoid mixing tokens with hardcoded values -->
   <div class="bg-primary" style="border-color: #e5e7eb">
   ```

4. **Don't ignore dark mode**
   - Always test components in both light and dark themes
   - Use semantic tokens that adapt automatically

---

## File Structure

```
src/styles/
├── tokens.ts           # TypeScript token exports
├── index.ts            # Barrel exports
└── DESIGN_SYSTEM.md    # This documentation

src/index.css           # CSS custom properties (source of truth)
tailwind.config.ts      # Tailwind configuration
```

---

## Quick Reference Card

### Essential Tailwind Classes

```
Background:  bg-background, bg-card, bg-muted, bg-primary, bg-secondary
Text:        text-foreground, text-muted-foreground, text-primary
Border:      border-border, border-primary, border-input
Shadow:      shadow-sm, shadow-md, shadow-lg, shadow-card, shadow-glow
Radius:      rounded-sm, rounded-md, rounded-lg, rounded-xl
Animation:   animate-fade-in, animate-scale-in, animate-pulse-glow
Transition:  transition-smooth, duration-fast, duration-normal
```

### Color Opacity Pattern

```
bg-primary/10  - Subtle background
bg-primary/20  - Light background  
bg-primary/50  - Medium background
bg-primary/80  - Strong background
bg-primary     - Full color
```

---

*This design system is the single source of truth for all visual design decisions. When in doubt, reference this document and the associated token files.*
