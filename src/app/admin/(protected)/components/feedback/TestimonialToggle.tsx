'use client'

import { useState } from 'react'

interface TestimonialToggleProps {
  isHighlighted: boolean
  onToggle: (isHighlighted: boolean) => Promise<void>
}

export const TestimonialToggle: React.FC<TestimonialToggleProps> = ({
  isHighlighted,
  onToggle
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      await onToggle(!isHighlighted)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${isHighlighted 
          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <svg className={`w-5 h-5 mr-2 ${isHighlighted ? 'text-yellow-600' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {isHighlighted ? 'Featured' : 'Feature as Testimonial'}
    </button>
  )
}