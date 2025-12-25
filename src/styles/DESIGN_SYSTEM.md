# Design System Documentation

A comprehensive design system for consistent, maintainable UI development.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Sizing](#spacing--sizing)
4. [Shadows](#shadows)
5. [Animations](#animations)
6. [Glass Effects](#glass-effects)
7. [Gradients](#gradients)
8. [Z-Index Scale](#z-index-scale)
9. [Breakpoints](#breakpoints)
10. [Usage Examples](#usage-examples)

---

## Color Palette

### Semantic Colors

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| `background` | `--background` | Main app background |
| `foreground` | `--foreground` | Primary text color |
| `card` | `--card` | Card/surface background |
| `card-foreground` | `--card-foreground` | Text on cards |
| `popover` | `--popover` | Popover background |
| `popover-foreground` | `--popover-foreground` | Text in popovers |
| `primary` | `--primary` | Primary brand color |
| `primary-foreground` | `--primary-foreground` | Text on primary |
| `secondary` | `--secondary` | Secondary UI color |
| `secondary-foreground` | `--secondary-foreground` | Text on secondary |
| `muted` | `--muted` | Muted/subtle background |
| `muted-foreground` | `--muted-foreground` | Muted text |
| `accent` | `--accent` | Accent highlights |
| `accent-foreground` | `--accent-foreground` | Text on accent |
| `destructive` | `--destructive` | Error/danger color |
| `destructive-foreground` | `--destructive-foreground` | Text on destructive |
| `border` | `--border` | Border color |
| `input` | `--input` | Input border color |
| `ring` | `--ring` | Focus ring color |

### Provider Colors

| Provider | CSS Variable | Hex Value |
|----------|--------------|-----------|
| Claude | `--provider-claude` | `#D97706` |
| Antigravity | `--provider-antigravity` | `#8B5CF6` |
| Gemini | `--provider-gemini` | `#3B82F6` |
| Copilot | `--provider-copilot` | `#10B981` |
| GLM | `--provider-glm` | `#EF4444` |
| OpenRouter | `--provider-openrouter` | `#F59E0B` |

### Status Colors

| Status | CSS Variable | Description |
|--------|--------------|-------------|
| Success | `--status-success` | Green - positive state |
| Warning | `--status-warning` | Amber - caution state |
| Error | `--status-error` | Red - error state |
| Info | `--status-info` | Blue - informational |

### Priority Colors

| Priority | CSS Variable | Description |
|----------|--------------|-------------|
| High | `--priority-high` | Red indicator |
| Medium | `--priority-medium` | Amber indicator |
| Low | `--priority-low` | Green indicator |

---

## Typography

### Font Families

```css
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;
```

### Font Sizes

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `xs` | 0.75rem (12px) | 1rem | Fine print, labels |
| `sm` | 0.875rem (14px) | 1.25rem | Secondary text |
| `base` | 1rem (16px) | 1.5rem | Body text |
| `lg` | 1.125rem (18px) | 1.75rem | Emphasized text |
| `xl` | 1.25rem (20px) | 1.75rem | Subheadings |
| `2xl` | 1.5rem (24px) | 2rem | Section headings |
| `3xl` | 1.875rem (30px) | 2.25rem | Page headings |
| `4xl` | 2.25rem (36px) | 2.5rem | Large headings |
| `5xl` | 3rem (48px) | 1 | Hero headings |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `normal` | 400 | Body text |
| `medium` | 500 | Emphasized text |
| `semibold` | 600 | Subheadings |
| `bold` | 700 | Headings |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tighter` | -0.05em | Large headings |
| `tight` | -0.025em | Headings |
| `normal` | 0em | Body text |
| `wide` | 0.025em | Uppercase labels |
| `wider` | 0.05em | Small caps |
| `widest` | 0.1em | All caps labels |

---

## Spacing & Sizing

### Spacing Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `0` | 0 | 0px |
| `px` | 1px | 1px |
| `0.5` | 0.125rem | 2px |
| `1` | 0.25rem | 4px |
| `1.5` | 0.375rem | 6px |
| `2` | 0.5rem | 8px |
| `2.5` | 0.625rem | 10px |
| `3` | 0.75rem | 12px |
| `3.5` | 0.875rem | 14px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `7` | 1.75rem | 28px |
| `8` | 2rem | 32px |
| `9` | 2.25rem | 36px |
| `10` | 2.5rem | 40px |
| `11` | 2.75rem | 44px |
| `12` | 3rem | 48px |
| `14` | 3.5rem | 56px |
| `16` | 4rem | 64px |
| `20` | 5rem | 80px |
| `24` | 6rem | 96px |
| `28` | 7rem | 112px |
| `32` | 8rem | 128px |
| `36` | 9rem | 144px |
| `40` | 10rem | 160px |
| `44` | 11rem | 176px |
| `48` | 12rem | 192px |
| `52` | 13rem | 208px |
| `56` | 14rem | 224px |
| `60` | 15rem | 240px |
| `64` | 16rem | 256px |
| `72` | 18rem | 288px |
| `80` | 20rem | 320px |
| `96` | 24rem | 384px |

### Component Sizes

| Component | Sizes Available |
|-----------|-----------------|
| Icon | `xs` (12px), `sm` (16px), `md` (20px), `lg` (24px), `xl` (32px) |
| Button Height | `sm` (32px), `md` (40px), `lg` (48px) |
| Input Height | `sm` (32px), `md` (40px), `lg` (48px) |
| Avatar | `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (64px) |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | No rounding |
| `sm` | 0.125rem | Subtle rounding |
| `DEFAULT` | 0.375rem | Standard rounding |
| `md` | 0.375rem | Medium rounding |
| `lg` | 0.5rem | Large rounding |
| `xl` | 0.75rem | Extra large |
| `2xl` | 1rem | Cards, modals |
| `3xl` | 1.5rem | Large cards |
| `full` | 9999px | Pills, avatars |

---

## Shadows

### Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `none` | none | No shadow |
| `sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| `DEFAULT` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Standard cards |
| `md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Elevated elements |
| `lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Dropdowns, popovers |
| `xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modals |
| `2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Large modals |
| `inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | Inset elements |
| `glow` | `0 0 20px hsl(var(--primary) / 0.3)` | Glow effect |
| `glow-lg` | `0 0 40px hsl(var(--primary) / 0.4)` | Large glow |

---

## Animations

### Timing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerating |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth |
| `bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful bounce |

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `instant` | 0ms | No animation |
| `fast` | 100ms | Micro-interactions |
| `normal` | 200ms | Standard transitions |
| `slow` | 300ms | Complex animations |
| `slower` | 500ms | Page transitions |

### Animation Presets

| Animation | Description |
|-----------|-------------|
| `accordion-down` | Expand accordion content |
| `accordion-up` | Collapse accordion content |
| `fade-in` | Fade in with upward slide |
| `fade-out` | Fade out with downward slide |
| `scale-in` | Scale up from 95% |
| `scale-out` | Scale down to 95% |
| `slide-in-right` | Slide in from right |
| `slide-out-right` | Slide out to right |
| `enter` | Combined fade + scale in |
| `exit` | Combined fade + scale out |

---

## Glass Effects

### Glass Card

```css
.glass-card {
  background: hsl(var(--card) / 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border) / 0.5);
}
```

### Usage Classes

| Class | Description |
|-------|-------------|
| `.glass-card` | Frosted glass card effect |
| `.glass-surface` | Subtle glass surface |
| `.glass-overlay` | Dark glass overlay |

---

## Gradients

### Predefined Gradients

| Token | Description |
|-------|-------------|
| `primary` | Primary to primary-glow gradient |
| `surface` | Card to background gradient |
| `overlay` | Dark transparent gradient |
| `glow` | Radial primary glow |

### CSS Variables

```css
--gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
--gradient-surface: linear-gradient(180deg, hsl(var(--card)), hsl(var(--background)));
```

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `base` | 0 | Default layer |
| `dropdown` | 50 | Dropdowns |
| `sticky` | 100 | Sticky headers |
| `fixed` | 200 | Fixed elements |
| `overlay` | 300 | Overlays |
| `modal` | 400 | Modals |
| `popover` | 500 | Popovers |
| `tooltip` | 600 | Tooltips |
| `toast` | 700 | Toast notifications |
| `max` | 9999 | Maximum priority |

---

## Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `xs` | 475px | Extra small devices |
| `sm` | 640px | Small devices |
| `md` | 768px | Medium devices |
| `lg` | 1024px | Large devices |
| `xl` | 1280px | Extra large devices |
| `2xl` | 1536px | 2X large devices |

---

## Usage Examples

### Importing Tokens

```typescript
// Import all tokens
import tokens from '@/styles/tokens';

// Import specific tokens
import { colors, typography, spacing } from '@/styles';

// Import utility functions
import { getColor, withAlpha } from '@/styles';
```

### Using Color Utilities

```typescript
import { getColor, withAlpha } from '@/styles';

// Get a color value
const primaryColor = getColor('primary'); // Returns CSS variable reference

// Add alpha to a color
const transparentPrimary = withAlpha('primary', 0.5);
```

### Tailwind Usage

```tsx
// Use semantic colors (RECOMMENDED)
<div className="bg-background text-foreground" />
<div className="bg-card border-border" />
<button className="bg-primary text-primary-foreground" />

// Use spacing
<div className="p-4 m-2 gap-3" />

// Use typography
<h1 className="text-3xl font-bold tracking-tight" />
<p className="text-sm text-muted-foreground" />

// Use shadows
<div className="shadow-md hover:shadow-lg" />

// Use animations
<div className="animate-fade-in" />
<div className="animate-scale-in" />
```

### Component Classes

```tsx
import { componentClasses } from '@/styles';

// Cards
<div className={componentClasses.card} />
<div className={componentClasses.glassCard} />

// Inputs
<input className={componentClasses.inputBase} />

// Focus states
<button className={componentClasses.focusRing} />
```

### Provider Badges

```tsx
import { providerClasses } from '@/styles';

<span className={providerClasses.claude}>Claude</span>
<span className={providerClasses.gemini}>Gemini</span>
```

### Status Indicators

```tsx
import { statusClasses } from '@/styles';

<span className={statusClasses.online}>Online</span>
<span className={statusClasses.offline}>Offline</span>
```

---

## Best Practices

1. **Always use semantic tokens** - Never use raw color values like `text-white` or `bg-black`
2. **Respect the design system** - Use predefined spacing, typography, and color scales
3. **Dark mode compatible** - All semantic tokens automatically adapt to dark mode
4. **Consistent spacing** - Use the spacing scale for all margins and paddings
5. **Accessible contrast** - Semantic foreground/background pairs ensure proper contrast
6. **Animation restraint** - Use animations purposefully, not decoratively

---

## File Structure

```
src/styles/
├── tokens.ts          # TypeScript token definitions
├── index.ts           # Re-exports and utility classes
├── DESIGN_SYSTEM.md   # This documentation
```

---

*Last updated: December 2024*
