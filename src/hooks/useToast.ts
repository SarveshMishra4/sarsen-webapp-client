'use client'

import { useState, useCallback } from 'react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    (type: Toast['type'], message: string, duration = 5000) => {
      const id = Math.random().toString(36).substr(2, 9)

      setToasts((prev) => [...prev, { id, type, message, duration }])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }
    },
    [removeToast]
  )

  const success = useCallback(
    (message: string, duration?: number) =>
      addToast('success', message, duration),
    [addToast]
  )

  const error = useCallback(
    (message: string, duration?: number) =>
      addToast('error', message, duration),
    [addToast]
  )

  const info = useCallback(
    (message: string, duration?: number) =>
      addToast('info', message, duration),
    [addToast]
  )

  const warning = useCallback(
    (message: string, duration?: number) =>
      addToast('warning', message, duration),
    [addToast]
  )

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }
}