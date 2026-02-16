'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']} redirectTo="/admin/login">
      <div className="min-h-screen bg-gray-100">
        {/* Admin sidebar will be added in Phase F3 */}
        {children}
      </div>
    </ProtectedRoute>
  )
}