/**
 * spacing.tsx
 *
 * Defines spacing scale for margins, paddings, gaps.
 *
 * All spacing must use these values.
 */

export const spacing = {
  none: "0px",

  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "48px",

  layout: {
    pagePadding: "24px",
    sectionGap: "48px",
    cardPadding: "16px",
  },
} as const;