'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFeedback } from '@/hooks/useFeedback'
import { FeedbackCard } from '../../components/feedback/FeedbackCard'
import { TestimonialToggle } from '../../components/feedback/TestimonialToggle'
import { AdminNotes } from '../../components/feedback/AdminNotes'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'

export default function FeedbackDetailPage() {
  const params = useParams()
  const router = useRouter()
  const feedbackId = params.feedbackId as string

  const {
    feedback,
    isLoading,
    fetchFeedbackById,
    toggleHighlight,
    addAdminNotes,
    deleteFeedback
  } = useFeedback({ feedbackId })

  useEffect(() => {
    if (feedbackId) {
      fetchFeedbackById(feedbackId)
    }
  }, [feedbackId, fetchFeedbackById])

  const handleToggleHighlight = async (isHighlighted: boolean) => {
    await toggleHighlight(feedbackId, isHighlighted)
  }

  const handleSaveNotes = async (notes: string) => {
    await addAdminNotes(feedbackId, notes)
  }

  const handleDelete = async () => {
    await deleteFeedback(feedbackId)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (!feedback) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Feedback not found</p>
            <Link href="/admin/protected/feedback">
              <Button variant="primary">Back to Feedback</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feedback Details</h1>
          <p className="text-gray-600 mt-1">
            View and manage client feedback
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/protected/feedback">
            <Button variant="outline">Back to List</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete Feedback
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Feedback Details */}
        <div className="lg:col-span-2">
          <FeedbackCard feedback={feedback} />
        </div>

        {/* Right Column - Actions & Notes */}
        <div className="lg:col-span-1 space-y-6">
          {/* Testimonial Toggle */}
          <Card>
            <CardBody>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Testimonial Status</h3>
              <TestimonialToggle
                isHighlighted={feedback.isHighlighted}
                onToggle={handleToggleHighlight}
              />
              <p className="text-xs text-gray-500 mt-3">
                Featured testimonials may appear on the public website.
              </p>
            </CardBody>
          </Card>

          {/* Admin Notes */}
          <AdminNotes
            notes={feedback.adminNotes}
            onSave={handleSaveNotes}
          />

          {/* Quick Actions */}
          <Card>
            <CardBody>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href={`/admin/protected/engagements/${feedback.engagementId}`}
                  className="block w-full"
                >
                  <Button variant="outline" fullWidth>
                    View Engagement
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    const text = feedback.testimonial || feedback.review || ''
                    navigator.clipboard.writeText(text)
                    alert('Copied to clipboard!')
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Copy Testimonial
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}