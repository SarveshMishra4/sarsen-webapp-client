// src/ui/primitives/Toast/Toast.tsx

import React, { useEffect } from "react";

export type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  duration?: number; // ms
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  children,
  variant = "info",
  duration = 3000,
  onClose,
  className = "",
  ...rest
}) => {
  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variantStyles: Record<ToastVariant, string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-black",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      {...rest}
      className={`
        fixed bottom-4 right-4
        px-4 py-2 rounded shadow-lg
        text-white
        animate-fade-in

        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};