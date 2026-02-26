// src/ui/primitives/Modal/Modal.tsx

import React from "react";

export type ModalSize = "sm" | "md" | "lg";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  size = "md",
  children,
  className = "",
  ...rest
}) => {
  if (!open) return null;

  const sizeStyles: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        {...rest}
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full bg-white rounded-lg p-6 shadow-lg

          ${sizeStyles[size]}
          ${className}
        `}
      >
        {title && (
          <h2 className="text-lg font-semibold mb-4">
            {title}
          </h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};