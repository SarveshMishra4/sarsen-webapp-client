// src/ui/primitives/Loader/Loader.tsx

import React from "react";

export type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: LoaderSize;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  className = "",
  ...rest
}) => {
  const sizeStyles: Record<LoaderSize, string> = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div
      {...rest}
      className={`
        animate-spin
        rounded-full
        border-gray-300
        border-t-primary

        ${sizeStyles[size]}
        ${className}
      `}
    />
  );
};