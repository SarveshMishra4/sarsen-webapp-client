'use client'

import { FeedbackData } from '@/types/feedback.types'
import { RatingStars } from './RatingStars'
import { formatTestimonial } from '@/utils/feedback.utils'

interface TestimonialCardProps {
  feedback: FeedbackData
  compact?: boolean
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  feedback,
  compact = false
}) => {
  const testimonial = formatTestimonial(feedback, compact ? 100 : 200)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Rating */}
      <div className="mb-3">
        <RatingStars rating={feedback.rating} size="sm" />
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 mb-4">
        "{testimonial}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">
            {feedback.userId ? 'Client' : 'Anonymous'}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(feedback.submittedAt).toLocaleDateString()}
          </p>
        </div>
        {feedback.wouldRecommend && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Recommended
          </span>
        )}
      </div>

      {/* Highlight Badge */}
      {feedback.isHighlighted && !compact && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Featured Testimonial
          </span>
        </div>
      )}
    </div>
  )
}