'use client'

import { useState } from 'react'
import { FeedbackRating } from '@/types/feedback.types'

interface RatingInputProps {
  label: string
  value?: FeedbackRating
  onChange: (value: FeedbackRating) => void
  required?: boolean
}

export const RatingInput: React.FC<RatingInputProps> = ({
  label,
  value,
  onChange,
  required = false
}) => {
  const [hover, setHover] = useState<FeedbackRating | null>(null)

  const labels: Record<FeedbackRating, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating as FeedbackRating)}
              onMouseEnter={() => setHover(rating as FeedbackRating)}
              onMouseLeave={() => setHover(null)}
              className="focus:outline-none"
            >
              <svg
                className={`w-8 h-8 ${
                  (hover !== null ? rating <= hover : rating <= (value || 0))
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 fill-current'
                } transition-colors`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        
        {value && (
          <span className="text-sm font-medium text-gray-700 ml-2">
            {labels[value]}
          </span>
        )}
      </div>
    </div>
  )
}