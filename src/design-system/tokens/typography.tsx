/**
 * typography.tsx
 *
 * Centralized typography rules.
 *
 * Controls how text looks everywhere.
 */

export const typography = {
  fontFamily: {
    primary: "Inter, system-ui, sans-serif",
    mono: "monospace",
  },

  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.75",
  },

  heading: {
    h1: "36px",
    h2: "30px",
    h3: "24px",
    h4: "20px",
    h5: "18px",
    h6: "16px",
  },
} as const;