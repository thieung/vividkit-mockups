/**
 * Design System Styles
 * 
 * Re-export all design tokens for easy importing.
 * 
 * @example
 * import { colors, spacing, typography } from '@/styles';
 * import tokens from '@/styles';
 */

export {
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
  default as tokens,
} from './tokens';

// =============================================================================
// UTILITY CLASSES
// =============================================================================

/**
 * Common component class compositions
 */
export const componentClasses = {
  // Cards
  card: 'bg-card text-card-foreground rounded-lg border border-border shadow-sm',
  cardHover: 'bg-card text-card-foreground rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow',
  glassCard: 'glass-card',
  
  // Buttons
  buttonBase: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  
  // Inputs
  inputBase: 'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  
  // Text styles
  heading: 'scroll-m-20 tracking-tight',
  label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  muted: 'text-sm text-muted-foreground',
  
  // Layout
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 md:py-16 lg:py-20',
  
  // Interactive states
  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  hoverOpacity: 'transition-opacity hover:opacity-80',
  hoverScale: 'transition-transform hover:scale-105',
} as const;

/**
 * Provider badge classes
 */
export const providerClasses = {
  claude: 'provider-claude',
  antigravity: 'provider-antigravity',
  gemini: 'provider-gemini',
  copilot: 'provider-copilot',
  glm: 'provider-glm',
  openrouter: 'provider-openrouter',
} as const;

/**
 * Priority badge classes
 */
export const priorityClasses = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
} as const;

/**
 * Status indicator classes
 */
export const statusClasses = {
  online: 'status-online',
  offline: 'status-offline',
  degraded: 'status-degraded',
} as const;
