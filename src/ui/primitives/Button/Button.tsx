// src/ui/primitives/Button/Button.tsx

import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: React.ReactNode; // ✅ THIS FIXES YOUR ERROR
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...rest
}) => {
  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    danger: "bg-danger text-white hover:bg-danger/90",
    outline: "border border-primary text-primary hover:bg-primary/10",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        rounded-md
        font-medium
        transition-all
        duration-200

        ${variantStyles[variant]}
        ${sizeStyles[size]}

        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};