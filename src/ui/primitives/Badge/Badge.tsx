// src/ui/primitives/Badge/Badge.tsx

import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
  ...rest
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-500 text-black",
    danger: "bg-danger text-white",
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-2 py-1 text-xs font-medium rounded

        ${variantStyles[variant]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </span>
  );
};