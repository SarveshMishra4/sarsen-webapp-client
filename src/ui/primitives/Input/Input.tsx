// src/ui/primitives/Input/Input.tsx

import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onChangeValue?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  onChangeValue,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <input
        {...rest}
        onChange={(e) => {
          rest.onChange?.(e);
          onChangeValue?.(e.target.value);
        }}
        className={`
          px-3 py-2 rounded-md border
          bg-background
          text-foreground
          outline-none

          ${error ? "border-danger" : "border-gray-300"}
          ${className}
        `}
      />

      {error && (
        <span className="text-sm text-danger">
          {error}
        </span>
      )}
    </div>
  );
};