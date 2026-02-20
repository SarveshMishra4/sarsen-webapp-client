'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface EngagementInfo {
  id: string
  engagementId: string
  serviceCode: string
}

export const CredentialsDisplay: React.FC = () => {
  const [engagement, setEngagement] = useState<EngagementInfo | null>(null)
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

useEffect(() => {
  // Load engagement
  const storedEngagement = sessionStorage.getItem('newEngagement')
  if (storedEngagement) {
    setEngagement(JSON.parse(storedEngagement))
  }

  // Load credentials (if created)
  const storedCredentials = sessionStorage.getItem('newCredentials')
  if (storedCredentials) {
    setCredentials(JSON.parse(storedCredentials))
    return
  }

  // Fallback: use checkout email
  const checkoutEmail = sessionStorage.getItem('checkoutEmail')
  if (checkoutEmail) {
    setCredentials({
      email: checkoutEmail,
      password: '********'
    })
  }
}, [])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const handleGoToDashboard = () => {
    if (engagement) {
      router.push(`/client/dashboard/${engagement.id}`)
    } else {
      router.push('/client/dashboard')
    }
  }

  if (!engagement || !credentials) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600">
          Your engagement has been created. Your login credentials are below.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Engagement Details</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Engagement ID</p>
              <p className="font-mono text-lg">{engagement.engagementId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium">{engagement.serviceCode}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Your Login Credentials</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-mono">{credentials.email}</span>
                <button
                  onClick={() => handleCopy(credentials.email)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Password</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-mono">
                  {showPassword ? credentials.password : '••••••••••'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleCopy(credentials.password)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Please save these credentials. You'll need them to log in to your engagement dashboard. For security reasons, we cannot show them again.
            </p>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={() => window.print()}>
          Print / Save
        </Button>
        <Button variant="primary" onClick={handleGoToDashboard}>
          Go to My Dashboard
        </Button>
      </div>
    </div>
  )
}