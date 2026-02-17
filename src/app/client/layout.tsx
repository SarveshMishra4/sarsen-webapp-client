'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { ClientHeader } from './components/ClientHeader'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['CLIENT']} redirectTo="/client/login">
      <div className="min-h-screen bg-gray-50">
        <ClientHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}