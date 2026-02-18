'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FeedbackRating, SubmitFeedbackRequest } from '@/types/feedback.types'
import { RatingInput } from './RatingInput'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface FeedbackFormProps {
  engagementId: string
  engagementName: string
  onSubmit: (data: SubmitFeedbackRequest) => Promise<void>
  isSubmitting?: boolean
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  engagementId,
  engagementName,
  onSubmit,
  isSubmitting = false
}) => {
  const router = useRouter()
  const [rating, setRating] = useState<FeedbackRating | undefined>()
  const [review, setReview] = useState('')
  const [wouldRecommend, setWouldRecommend] = useState<boolean | undefined>()
  const [wouldUseAgain, setWouldUseAgain] = useState<boolean | undefined>()
  const [communication, setCommunication] = useState<FeedbackRating>()
  const [quality, setQuality] = useState<FeedbackRating>()
  const [timeliness, setTimeliness] = useState<FeedbackRating>()
  const [value, setValue] = useState<FeedbackRating>()
  const [whatWorkedWell, setWhatWorkedWell] = useState<string>('')
  const [whatCouldBeImproved, setWhatCouldBeImproved] = useState<string>('')
  const [additionalComments, setAdditionalComments] = useState('')
  const [allowTestimonial, setAllowTestimonial] = useState(false)
  const [testimonial, setTestimonial] = useState('')
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!rating) {
      newErrors.rating = 'Please provide a rating'
    }
    if (wouldRecommend === undefined) {
      newErrors.wouldRecommend = 'Please answer this question'
    }
    if (wouldUseAgain === undefined) {
      newErrors.wouldUseAgain = 'Please answer this question'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector('.text-red-600')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const data: SubmitFeedbackRequest = {
      engagementId,
      rating: rating!,
      review: review || undefined,
      wouldRecommend: wouldRecommend!,
      wouldUseAgain: wouldUseAgain!,
      communication,
      quality,
      timeliness,
      value,
      whatWorkedWell: whatWorkedWell.split('\n').filter(line => line.trim()),
      whatCouldBeImproved: whatCouldBeImproved.split('\n').filter(line => line.trim()),
      additionalComments: additionalComments || undefined,
      allowTestimonial,
      testimonial: testimonial || undefined
    }

    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Overall Experience</h2>
          <p className="text-sm text-gray-500">
            Please rate your experience with {engagementName}
          </p>
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Overall Rating */}
          <RatingInput
            label="Overall Rating *"
            value={rating}
            onChange={setRating}
            required
          />
          {errors.rating && (
            <p className="text-sm text-red-600 -mt-4">{errors.rating}</p>
          )}

          {/* Review */}
          <Textarea
            label="Review (Optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
          />

          {/* Would Recommend */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Would you recommend our services? *
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="wouldRecommend"
                  checked={wouldRecommend === true}
                  onChange={() => setWouldRecommend(true)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="wouldRecommend"
                  checked={wouldRecommend === false}
                  onChange={() => setWouldRecommend(false)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
            {errors.wouldRecommend && (
              <p className="text-sm text-red-600">{errors.wouldRecommend}</p>
            )}
          </div>

          {/* Would Use Again */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Would you use our services again? *
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="wouldUseAgain"
                  checked={wouldUseAgain === true}
                  onChange={() => setWouldUseAgain(true)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="wouldUseAgain"
                  checked={wouldUseAgain === false}
                  onChange={() => setWouldUseAgain(false)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
            {errors.wouldUseAgain && (
              <p className="text-sm text-red-600">{errors.wouldUseAgain}</p>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Category Ratings (Optional)</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <RatingInput
            label="Communication"
            value={communication}
            onChange={setCommunication}
          />
          <RatingInput
            label="Quality"
            value={quality}
            onChange={setQuality}
          />
          <RatingInput
            label="Timeliness"
            value={timeliness}
            onChange={setTimeliness}
          />
          <RatingInput
            label="Value"
            value={value}
            onChange={setValue}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Detailed Feedback (Optional)</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <Textarea
            label="What worked well? (One per line)"
            value={whatWorkedWell}
            onChange={(e) => setWhatWorkedWell(e.target.value)}
            placeholder="Clear communication&#10;Quick responses&#10;Expert guidance"
            rows={4}
          />

          <Textarea
            label="What could be improved? (One per line)"
            value={whatCouldBeImproved}
            onChange={(e) => setWhatCouldBeImproved(e.target.value)}
            placeholder="Faster delivery&#10;More detailed reports&#10;Better documentation"
            rows={4}
          />

          <Textarea
            label="Additional Comments"
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            rows={4}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Testimonial (Optional)</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowTestimonial"
              checked={allowTestimonial}
              onChange={(e) => setAllowTestimonial(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="allowTestimonial" className="ml-2 text-sm text-gray-700">
              I'm willing to have my feedback featured as a testimonial
            </label>
          </div>

          {allowTestimonial && (
            <Textarea
              label="Testimonial (Optional - leave blank to use your review)"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              placeholder="Share a short quote we can feature..."
              rows={3}
            />
          )}
        </CardBody>
      </Card>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          Submit Feedback
        </Button>
      </div>
    </form>
  )
}