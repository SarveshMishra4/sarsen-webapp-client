/**
 * ============================================================
 * GLOBAL TYPE DECLARATIONS — PROJECT WIDE
 * ============================================================
 *
 * PURPOSE:
 * Tell TypeScript how to handle non-code imports like CSS.
 *
 * This file is automatically picked up by TypeScript.
 * DO NOT import this file anywhere.
 *
 * ============================================================
 */

/* Allow importing global CSS files */
declare module "*.css";

/* (Optional but recommended for future scaling) */
declare module "*.scss";
declare module "*.sass";
declare module "*.module.css";