'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/ui/Spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: Array<'ADMIN' | 'CLIENT'>
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/',
}) => {
  const { isAuthenticated, isLoading, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo)  // This will now redirect to /admin/auth/login for admin
      } else if (allowedRoles && role && !allowedRoles.includes(role)) {
        if (role === 'ADMIN') {
          router.push('/admin/protected')
        } else {
          router.push('/client/dashboard')
        }
      }
    }
  }, [isLoading, isAuthenticated, role, allowedRoles, router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return null
  }

  return <>{children}</>
}