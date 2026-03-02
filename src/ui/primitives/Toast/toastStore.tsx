"use client";
import { createContext, useContext } from "react";

/* Toast Types */

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

/* Context Shape */

export interface ToastContextType {
  toasts: ToastItem[];
  showToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

/* Context */

export const ToastContext = createContext<ToastContextType | null>(null);

/* Hook */

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}