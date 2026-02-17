'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Sidebar } from './components/Sidebar'

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']} redirectTo="/admin/auth/login">
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}