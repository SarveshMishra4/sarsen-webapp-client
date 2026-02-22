'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function AdminProtectedWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']} redirectTo="/admin/login">
      {children}
    </ProtectedRoute>
  )
}