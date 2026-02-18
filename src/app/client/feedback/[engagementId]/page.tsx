'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFeedback } from '@/hooks/useFeedback'
import { useEngagement } from '@/hooks/useEngagement'
import { FeedbackForm } from '../../components/feedback/FeedbackForm'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ClientFeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const engagementId = params.engagementId as string

  const [startTime] = useState(Date.now())

  const {
    submitFeedback,
    fetchFeedbackStatus,
    isSubmitting,
    status
  } = useFeedback()

  const { engagement, fetchEngagementById, isLoading } = useEngagement()

  useEffect(() => {
    if (engagementId) {
      fetchEngagementById(engagementId)
      fetchFeedbackStatus()
    }
  }, [engagementId, fetchEngagementById, fetchFeedbackStatus])

  const handleSubmit = async (data: any) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    await submitFeedback({ ...data, timeSpent })
    router.push(`/client/dashboard/${engagementId}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (!engagement) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Engagement Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The engagement you're looking for doesn't exist.
            </p>
            <Link href="/client/dashboard">
              <Button variant="primary">Back to Dashboard</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  if (status?.hasFeedback) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Feedback Already Submitted
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you! You have already submitted feedback for this engagement.
            </p>
            <Link href={`/client/dashboard/${engagementId}`}>
              <Button variant="primary">Return to Dashboard</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Share Your Feedback</h1>
        <p className="text-gray-600 mt-1">
          Your feedback helps us improve our services
        </p>
      </div>

      <FeedbackForm
        engagementId={engagementId}
        engagementName={engagement.serviceName}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}