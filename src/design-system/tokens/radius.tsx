/**
 * radius.tsx
 *
 * Defines border radius scale.
 *
 * Controls how "rounded" the UI feels.
 */

export const radius = {
  none: "0px",

  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px", // For pills / avatars
} as const;