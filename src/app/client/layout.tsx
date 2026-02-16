'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['CLIENT']} redirectTo="/client/login">
      <div className="min-h-screen bg-gray-50">
        {/* Client header will be added in Phase F4 */}
        {children}
      </div>
    </ProtectedRoute>
  )
}