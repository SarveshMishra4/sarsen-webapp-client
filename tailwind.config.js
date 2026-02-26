/**
 * ============================================================
 * TAILWIND CONFIGURATION FILE — DESIGN SYSTEM BRIDGE
 * ============================================================
 *
 * PURPOSE OF THIS FILE:
 *
 * This file connects our custom design system
 * (colors, spacing, fonts, shadows, etc.)
 * with Tailwind utility classes.
 *
 * It DOES NOT define values directly.
 * It only maps Tailwind → CSS variables.
 *
 * Architecture:
 *
 * Design Tokens (TS/TSX)
 *        ↓
 * globals.css (CSS variables)
 *        ↓
 * tailwind.config.js (mapping layer)
 *        ↓
 * React Components (usage)
 *
 * So this file is the TRANSLATOR.
 *
 * ============================================================
 */

module.exports = {
  /**
   * ------------------------------------------------------------
   * CONTENT CONFIGURATION
   * ------------------------------------------------------------
   *
   * This tells Tailwind:
   * "Scan these files to find class names"
   *
   * If a file is not here,
   * Tailwind will NOT generate CSS for it.
   *
   * So we include:
   * - app directory (Next.js app router)
   * - pages (if used later)
   * - components
   * - features
   * - ui
   */

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],

  /**
   * ------------------------------------------------------------
   * THEME CONFIGURATION
   * ------------------------------------------------------------
   *
   * This is where we extend Tailwind
   * using OUR design tokens.
   *
   * IMPORTANT:
   * We DO NOT hardcode colors here.
   * We always reference CSS variables.
   */

  theme: {
    extend: {
      /**
       * ----------------------------------------------------------
       * COLORS
       * ----------------------------------------------------------
       *
       * These map Tailwind classes like:
       *
       * bg-primary
       * text-secondary
       * border-muted
       *
       * → to CSS variables.
       */

      colors: {
        primary: "var(--color-primary)",
        primaryForeground: "var(--color-primary-foreground)",

        secondary: "var(--color-secondary)",
        secondaryForeground: "var(--color-secondary-foreground)",

        surface: "var(--color-surface)",
        surfaceForeground: "var(--color-surface-foreground)",

        muted: "var(--color-muted)",
        mutedForeground: "var(--color-muted-foreground)",

        danger: "var(--color-danger)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },

      /**
       * ----------------------------------------------------------
       * SPACING
       * ----------------------------------------------------------
       *
       * Used for:
       *
       * p-sm
       * m-lg
       * gap-md
       */

      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
      },

      /**
       * ----------------------------------------------------------
       * BORDER RADIUS
       * ----------------------------------------------------------
       *
       * rounded-sm
       * rounded-md
       * rounded-lg
       */

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },

      /**
       * ----------------------------------------------------------
       * SHADOWS
       * ----------------------------------------------------------
       *
       * shadow-soft
       * shadow-medium
       * shadow-strong
       */

      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        strong: "var(--shadow-strong)",
      },

      /**
       * ----------------------------------------------------------
       * TYPOGRAPHY
       * ----------------------------------------------------------
       *
       * font-primary
       * font-secondary
       */

      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
        secondary: ["var(--font-secondary)", "sans-serif"],
      },

      /**
       * ----------------------------------------------------------
       * FONT SIZES
       * ----------------------------------------------------------
       */

      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        md: "var(--text-md)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
      },
    },
  },

  /**
   * ------------------------------------------------------------
   * PLUGINS
   * ------------------------------------------------------------
   *
   * Empty for now.
   * Later we may add:
   * - typography
   * - forms
   * - animations
   */

  plugins: [],
};