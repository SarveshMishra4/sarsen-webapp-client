"use client";

import { ReactNode, useState, useCallback } from "react";
import { ToastContext, ToastItem, ToastType } from "./toastStore";
import { v4 as uuidv4 } from "uuid";
import Toast from "./Toast";

interface Props {
  children: ReactNode;
}

export default function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  /* Show Toast */

  const showToast = useCallback(
    (message: string, type: ToastType) => {
      const id = uuidv4();

      const newToast: ToastItem = {
        id,
        message,
        type,
      };

      setToasts((prev) => [...prev, newToast]);

      /* Auto Remove */

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    []
  );

  /* Remove Toast */

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, removeToast }}
    >
      {children}

      {/* Toast Container */}

      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}