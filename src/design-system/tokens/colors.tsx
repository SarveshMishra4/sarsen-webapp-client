/**
 * colors.tsx
 *
 * This file defines ALL colors used in the application.
 *
 * Rule:
 * - Never use raw hex codes in components.
 * - Always import colors from here.
 *
 * This ensures:
 * - Visual consistency
 * - Easy redesign in future
 * - Centralized control
 */

export const colors = {
  // ================================
  // BRAND COLORS
  // ================================
  brand: {
    primary: "#2563EB", // Main brand color (buttons, links, highlights)
    secondary: "#64748B", // Supporting color
    accent: "#22C55E", // Special highlight color
  },

  // ================================
  // BACKGROUND COLORS
  // ================================
  background: {
    main: "#FFFFFF", // Main app background
    secondary: "#F8FAFC", // Cards, panels
    muted: "#F1F5F9", // Subtle sections
    dark: "#020617", // Dark mode base (future)
  },

  // ================================
  // TEXT COLORS
  // ================================
  text: {
    primary: "#0F172A", // Main text
    secondary: "#475569", // Less important text
    muted: "#94A3B8", // Placeholder / hint text
    inverse: "#FFFFFF", // Text on dark background
  },

  // ================================
  // STATUS COLORS
  // ================================
  status: {
    success: "#16A34A", // Success messages
    warning: "#EAB308", // Warning messages
    error: "#DC2626", // Error messages
    info: "#0284C7", // Info messages
  },

  // ================================
  // BORDER COLORS
  // ================================
  border: {
    default: "#CBD5E1",
    focus: "#2563EB",
    error: "#DC2626",
  },
} as const;

/**
 * `as const` means:
 * - Values become readonly
 * - Types become literal
 * - Prevents accidental mutation
 */