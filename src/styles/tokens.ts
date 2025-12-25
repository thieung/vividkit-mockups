/**
 * Design System Tokens
 * 
 * Central source of truth for all design tokens used across the application.
 * Import these tokens in TypeScript/React components for programmatic access.
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Core colors
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  
  // Surface colors
  card: 'hsl(var(--card))',
  cardForeground: 'hsl(var(--card-foreground))',
  popover: 'hsl(var(--popover))',
  popoverForeground: 'hsl(var(--popover-foreground))',
  
  // Brand colors
  primary: 'hsl(var(--primary))',
  primaryForeground: 'hsl(var(--primary-foreground))',
  secondary: 'hsl(var(--secondary))',
  secondaryForeground: 'hsl(var(--secondary-foreground))',
  accent: 'hsl(var(--accent))',
  accentForeground: 'hsl(var(--accent-foreground))',
  
  // Muted/Subtle
  muted: 'hsl(var(--muted))',
  mutedForeground: 'hsl(var(--muted-foreground))',
  
  // Semantic colors
  destructive: 'hsl(var(--destructive))',
  destructiveForeground: 'hsl(var(--destructive-foreground))',
  
  // Border & Input
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  
  // Sidebar
  sidebar: {
    background: 'hsl(var(--sidebar-background))',
    foreground: 'hsl(var(--sidebar-foreground))',
    primary: 'hsl(var(--sidebar-primary))',
    primaryForeground: 'hsl(var(--sidebar-primary-foreground))',
    accent: 'hsl(var(--sidebar-accent))',
    accentForeground: 'hsl(var(--sidebar-accent-foreground))',
    border: 'hsl(var(--sidebar-border))',
    ring: 'hsl(var(--sidebar-ring))',
  },
  
  // Provider colors
  providers: {
    claude: 'hsl(var(--claude))',
    antigravity: 'hsl(var(--antigravity))',
    gemini: 'hsl(var(--gemini))',
    copilot: 'hsl(var(--copilot))',
    glm: 'hsl(var(--glm))',
    openrouter: 'hsl(var(--openrouter))',
  },
  
  // Priority colors
  priority: {
    high: 'hsl(var(--priority-high))',
    medium: 'hsl(var(--priority-medium))',
    low: 'hsl(var(--priority-low))',
  },
  
  // Status colors
  status: {
    online: 'hsl(var(--status-online))',
    offline: 'hsl(var(--status-offline))',
    degraded: 'hsl(var(--status-degraded))',
  },
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  
  // Font sizes (in rem)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// =============================================================================
// SPACING & SIZING
// =============================================================================

export const spacing = {
  // Base spacing scale (in rem)
  0: '0',
  0.5: '0.125rem',    // 2px
  1: '0.25rem',       // 4px
  1.5: '0.375rem',    // 6px
  2: '0.5rem',        // 8px
  2.5: '0.625rem',    // 10px
  3: '0.75rem',       // 12px
  3.5: '0.875rem',    // 14px
  4: '1rem',          // 16px
  5: '1.25rem',       // 20px
  6: '1.5rem',        // 24px
  7: '1.75rem',       // 28px
  8: '2rem',          // 32px
  9: '2.25rem',       // 36px
  10: '2.5rem',       // 40px
  11: '2.75rem',      // 44px
  12: '3rem',         // 48px
  14: '3.5rem',       // 56px
  16: '4rem',         // 64px
  20: '5rem',         // 80px
  24: '6rem',         // 96px
  28: '7rem',         // 112px
  32: '8rem',         // 128px
  36: '9rem',         // 144px
  40: '10rem',        // 160px
  44: '11rem',        // 176px
  48: '12rem',        // 192px
  52: '13rem',        // 208px
  56: '14rem',        // 224px
  60: '15rem',        // 240px
  64: '16rem',        // 256px
  72: '18rem',        // 288px
  80: '20rem',        // 320px
  96: '24rem',        // 384px
} as const;

// Component-specific sizes
export const sizes = {
  // Border radius
  radius: {
    none: '0',
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    xl: 'calc(var(--radius) + 4px)',
    '2xl': 'calc(var(--radius) + 8px)',
    full: '9999px',
  },
  
  // Icon sizes
  icon: {
    xs: '0.75rem',    // 12px
    sm: '1rem',       // 16px
    md: '1.25rem',    // 20px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
  },
  
  // Avatar sizes
  avatar: {
    xs: '1.5rem',     // 24px
    sm: '2rem',       // 32px
    md: '2.5rem',     // 40px
    lg: '3rem',       // 48px
    xl: '4rem',       // 64px
  },
  
  // Button heights
  button: {
    xs: '1.75rem',    // 28px
    sm: '2rem',       // 32px
    md: '2.5rem',     // 40px
    lg: '2.75rem',    // 44px
    xl: '3rem',       // 48px
  },
  
  // Input heights
  input: {
    sm: '2rem',       // 32px
    md: '2.5rem',     // 40px
    lg: '2.75rem',    // 44px
  },
  
  // Sidebar widths
  sidebar: {
    collapsed: '3.5rem',  // 56px
    compact: '4rem',      // 64px
    default: '15rem',     // 240px
    wide: '18rem',        // 288px
  },
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  // Elevation shadows
  none: 'none',
  sm: '0 1px 2px 0 hsl(var(--foreground) / 0.05)',
  base: '0 1px 3px 0 hsl(var(--foreground) / 0.1), 0 1px 2px -1px hsl(var(--foreground) / 0.1)',
  md: '0 4px 6px -1px hsl(var(--foreground) / 0.1), 0 2px 4px -2px hsl(var(--foreground) / 0.1)',
  lg: '0 10px 15px -3px hsl(var(--foreground) / 0.1), 0 4px 6px -4px hsl(var(--foreground) / 0.1)',
  xl: '0 20px 25px -5px hsl(var(--foreground) / 0.1), 0 8px 10px -6px hsl(var(--foreground) / 0.1)',
  '2xl': '0 25px 50px -12px hsl(var(--foreground) / 0.25)',
  inner: 'inset 0 2px 4px 0 hsl(var(--foreground) / 0.05)',
  
  // Semantic shadows
  glow: 'var(--shadow-glow)',
  card: 'var(--shadow-card)',
  
  // Colored glows
  primaryGlow: '0 0 40px hsl(var(--primary) / 0.15)',
  accentGlow: '0 0 40px hsl(var(--accent) / 0.15)',
  destructiveGlow: '0 0 40px hsl(var(--destructive) / 0.15)',
} as const;

// =============================================================================
// ANIMATIONS
// =============================================================================

export const animations = {
  // Timing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Durations
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '700ms',
  },
  
  // Presets (Tailwind class names)
  presets: {
    fadeIn: 'animate-fade-in',
    fadeOut: 'animate-fade-out',
    slideInLeft: 'animate-slide-in-left',
    scaleIn: 'animate-scale-in',
    pulseGlow: 'animate-pulse-glow',
    progress: 'animate-progress',
    typing: 'animate-typing',
    accordionDown: 'animate-accordion-down',
    accordionUp: 'animate-accordion-up',
    shimmer: 'animate-shimmer',
  },
  
  // Keyframe definitions (for programmatic use)
  keyframes: {
    fadeIn: {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    scaleIn: {
      from: { opacity: 0, transform: 'scale(0.95)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    slideInLeft: {
      from: { opacity: 0, transform: 'translateX(-20px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    pulseGlow: {
      '0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' },
      '50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.4)' },
    },
  },
} as const;

// =============================================================================
// GLASSMORPHISM
// =============================================================================

export const glass = {
  background: 'hsl(var(--glass-bg))',
  border: 'hsl(var(--glass-border))',
  blur: 'var(--glass-blur)',
} as const;

// =============================================================================
// GRADIENTS
// =============================================================================

export const gradients = {
  primary: 'var(--gradient-primary)',
  claude: 'var(--gradient-claude)',
  success: 'var(--gradient-success)',
  
  // Programmatic gradients
  radial: {
    primary: 'radial-gradient(circle, hsl(var(--primary)), hsl(var(--accent)))',
    muted: 'radial-gradient(circle, hsl(var(--muted)), transparent)',
  },
  
  conic: {
    primary: 'conic-gradient(from 180deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
  },
} as const;

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  max: 9999,
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
} as const;

// =============================================================================
// TRANSITIONS (composite values)
// =============================================================================

export const transitions = {
  // Quick transitions for micro-interactions
  fast: 'all 100ms cubic-bezier(0, 0, 0.2, 1)',
  
  // Standard transitions
  default: 'all 200ms cubic-bezier(0, 0, 0.2, 1)',
  
  // Smooth transitions for larger animations
  smooth: 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
  
  // Specific property transitions
  colors: 'color, background-color, border-color, text-decoration-color, fill, stroke 200ms cubic-bezier(0, 0, 0.2, 1)',
  opacity: 'opacity 200ms cubic-bezier(0, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0, 0, 0.2, 1)',
  shadow: 'box-shadow 200ms cubic-bezier(0, 0, 0.2, 1)',
} as const;

// =============================================================================
// THEME HELPER
// =============================================================================

/**
 * Get CSS variable value with optional alpha
 * @example getColor('--primary', 0.5) => 'hsl(var(--primary) / 0.5)'
 */
export function getColor(variable: string, alpha?: number): string {
  if (alpha !== undefined) {
    return `hsl(var(${variable}) / ${alpha})`;
  }
  return `hsl(var(${variable}))`;
}

/**
 * Apply alpha to any HSL color token
 * @example withAlpha(colors.primary, 0.5) => 'hsl(var(--primary) / 0.5)'
 */
export function withAlpha(color: string, alpha: number): string {
  // Extract the CSS variable from hsl(var(--name))
  const match = color.match(/var\((--[\w-]+)\)/);
  if (match) {
    return `hsl(var(${match[1]}) / ${alpha})`;
  }
  return color;
}

// Default export for convenience
const tokens = {
  colors,
  typography,
  spacing,
  sizes,
  shadows,
  animations,
  glass,
  gradients,
  zIndex,
  breakpoints,
  transitions,
  getColor,
  withAlpha,
} as const;

export default tokens;
