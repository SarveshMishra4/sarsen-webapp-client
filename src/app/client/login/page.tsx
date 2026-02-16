'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

export default function ClientLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [engagementId, setEngagementId] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; engagementId?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const { error: showError } = useToast()
  const router = useRouter()

  const validate = () => {
    const newErrors: typeof errors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    setIsLoading(true)
    try {
      await login(email, password, 'CLIENT', engagementId || undefined)
      router.push('/client/dashboard')
    } catch (err: any) {
      showError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Client Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your engagement dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                disabled={isLoading}
                autoComplete="email"
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                disabled={isLoading}
                autoComplete="current-password"
              />

              <Input
                label="Engagement ID (optional)"
                value={engagementId}
                onChange={(e) => setEngagementId(e.target.value)}
                error={errors.engagementId}
                disabled={isLoading}
                placeholder="e.g., ENG-2024-00001"
              />

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6">
              <Link
                href="/"
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                ← Back to home
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}