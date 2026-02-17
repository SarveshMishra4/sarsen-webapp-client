'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

export default function PaymentFailurePage() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
              <p className="text-gray-600">
                {reason === 'cancelled' 
                  ? 'You cancelled the payment process.'
                  : 'There was an issue processing your payment.'}
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">What could have happened?</h3>
                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                  <li>Insufficient funds in your account</li>
                  <li>Incorrect payment details entered</li>
                  <li>Transaction timeout or cancellation</li>
                  <li>Bank authorization failed</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">What would you like to do?</h3>
                <div className="space-y-3">
                  <Link href="javascript:history.back()">
                    <Button variant="primary" fullWidth>
                      Try Again
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" fullWidth>
                      Browse Other Services
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" fullWidth>
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                If you were charged but didn't receive confirmation, please contact support.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}