// src/ui/primitives/Card/Card.tsx

import React from "react";

export type CardVariant = "default" | "highlight";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  variant?: CardVariant;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  variant = "default",
  disabled = false,
  className = "",
  children,
  ...rest
}) => {
  const variantStyles: Record<CardVariant, string> = {
    default: "border border-gray-200",
    highlight: "border-2 border-primary",
  };

  return (
    <div
      {...rest}
      className={`
        rounded-lg p-4 bg-white shadow-sm

        ${variantStyles[variant]}
        ${disabled ? "opacity-50 pointer-events-none" : ""}
        ${className}
      `}
    >
      <h3 className="font-semibold mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-gray-600 mb-3">
          {description}
        </p>
      )}

      {children}
    </div>
  );
};