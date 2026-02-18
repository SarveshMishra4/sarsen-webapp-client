'use client'

import { FeedbackData } from '@/types/feedback.types'
import { RatingStars } from '@/components/feedback/RatingStars'
import { format } from 'date-fns'

interface FeedbackCardProps {
  feedback: FeedbackData
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a')
  }

  const getCategoryRating = (rating?: number) => {
    if (!rating) return 'Not rated'
    return (
      <div className="flex items-center">
        <RatingStars rating={rating as any} size="sm" />
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Feedback Details
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Submitted on {formatDate(feedback.submittedAt)}
            </p>
          </div>
          {feedback.isHighlighted && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Featured Testimonial
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-6">
        {/* Overall Rating */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Overall Rating</h4>
          <RatingStars rating={feedback.rating} size="lg" showLabel />
        </div>

        {/* Review */}
        {feedback.review && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Review</h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {feedback.review}
            </p>
          </div>
        )}

        {/* Recommendation */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Would Recommend</p>
            <p className={`text-lg font-semibold ${feedback.wouldRecommend ? 'text-green-600' : 'text-red-600'}`}>
              {feedback.wouldRecommend ? 'Yes' : 'No'}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Would Use Again</p>
            <p className={`text-lg font-semibold ${feedback.wouldUseAgain ? 'text-green-600' : 'text-red-600'}`}>
              {feedback.wouldUseAgain ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {/* Category Ratings */}
        {(feedback.communication || feedback.quality || feedback.timeliness || feedback.value) && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Category Ratings</h4>
            <div className="grid grid-cols-2 gap-4">
              {feedback.communication && (
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-500">Communication</p>
                  {getCategoryRating(feedback.communication)}
                </div>
              )}
              {feedback.quality && (
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-500">Quality</p>
                  {getCategoryRating(feedback.quality)}
                </div>
              )}
              {feedback.timeliness && (
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-500">Timeliness</p>
                  {getCategoryRating(feedback.timeliness)}
                </div>
              )}
              {feedback.value && (
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-500">Value</p>
                  {getCategoryRating(feedback.value)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* What Worked Well */}
        {feedback.whatWorkedWell && feedback.whatWorkedWell.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">What Worked Well</h4>
            <ul className="list-disc list-inside space-y-1">
              {feedback.whatWorkedWell.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* What Could Be Improved */}
        {feedback.whatCouldBeImproved && feedback.whatCouldBeImproved.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">What Could Be Improved</h4>
            <ul className="list-disc list-inside space-y-1">
              {feedback.whatCouldBeImproved.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Comments */}
        {feedback.additionalComments && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Comments</h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {feedback.additionalComments}
            </p>
          </div>
        )}

        {/* Testimonial */}
        {feedback.testimonial && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Testimonial</h4>
            <p className="text-yellow-900 italic">
              "{feedback.testimonial}"
            </p>
            {feedback.allowTestimonial && (
              <p className="text-xs text-yellow-700 mt-2">
                ✓ Client approved for public display
              </p>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <p className="font-medium">Feedback ID</p>
            <p className="font-mono">{feedback.id}</p>
          </div>
          <div>
            <p className="font-medium">Engagement ID</p>
            <p className="font-mono">{feedback.engagementId}</p>
          </div>
          <div>
            <p className="font-medium">User ID</p>
            <p className="font-mono">{feedback.userId}</p>
          </div>
          {feedback.timeSpent && (
            <div>
              <p className="font-medium">Time Spent</p>
              <p>{Math.floor(feedback.timeSpent / 60)}m {feedback.timeSpent % 60}s</p>
            </div>
          )}
          {feedback.ipAddress && (
            <div>
              <p className="font-medium">IP Address</p>
              <p>{feedback.ipAddress}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}