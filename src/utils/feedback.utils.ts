import { FeedbackRating, FeedbackStats } from '@/types/feedback.types'

// Get star display (for UI)
export const getStarDisplay = (rating: FeedbackRating): string => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

// Get rating label
export const getRatingLabel = (rating: FeedbackRating): string => {
  const labels: Record<FeedbackRating, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  }
  return labels[rating]
}

// Get rating color
export const getRatingColor = (rating: FeedbackRating): string => {
  const colors: Record<FeedbackRating, string> = {
    1: 'text-red-600',
    2: 'text-orange-500',
    3: 'text-yellow-500',
    4: 'text-blue-500',
    5: 'text-green-600'
  }
  return colors[rating]
}

// Get rating background color
export const getRatingBgColor = (rating: FeedbackRating): string => {
  const colors: Record<FeedbackRating, string> = {
    1: 'bg-red-100',
    2: 'bg-orange-100',
    3: 'bg-yellow-100',
    4: 'bg-blue-100',
    5: 'bg-green-100'
  }
  return colors[rating]
}

// Calculate average rating
export const calculateAverageRating = (ratings: FeedbackRating[]): number => {
  if (ratings.length === 0) return 0
  const sum = ratings.reduce((acc, r) => acc + r, 0)
  return Number((sum / ratings.length).toFixed(1))
}

// Calculate rating distribution
export const calculateRatingDistribution = (
  ratings: FeedbackRating[]
): Record<FeedbackRating, number> => {
  const distribution: Record<FeedbackRating, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }
  
  ratings.forEach(rating => {
    distribution[rating]++
  })
  
  return distribution
}

// Calculate percentage
export const calculatePercentage = (count: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((count / total) * 100)
}

// Format feedback for testimonial
export const formatTestimonial = (
  feedback: any,
  maxLength: number = 200
): string => {
  if (feedback.testimonial) {
    return feedback.testimonial.length > maxLength
      ? `${feedback.testimonial.substring(0, maxLength)}...`
      : feedback.testimonial
  }
  
  if (feedback.review) {
    return feedback.review.length > maxLength
      ? `${feedback.review.substring(0, maxLength)}...`
      : feedback.review
  }
  
  return ''
}

// Extract common themes from feedback
export const extractCommonThemes = (
  items: string[],
  minCount: number = 2
): Array<{ text: string; count: number }> => {
  const counts: Record<string, number> = {}
  
  items.forEach(item => {
    const normalized = item.toLowerCase().trim()
    counts[normalized] = (counts[normalized] || 0) + 1
  })
  
  return Object.entries(counts)
    .filter(([_, count]) => count >= minCount)
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count)
}

// Get access mode message
export const getAccessModeMessage = (mode: string): string => {
  switch (mode) {
    case 'full':
      return 'You have full access to this engagement'
    case 'feedback-required':
      return 'Please submit your feedback to continue accessing this engagement'
    case 'read-only':
      return 'This engagement is in read-only mode'
    default:
      return ''
  }
}

// Check if feedback is positive (4-5 stars)
export const isPositiveFeedback = (rating: FeedbackRating): boolean => {
  return rating >= 4
}

// Check if feedback is negative (1-2 stars)
export const isNegativeFeedback = (rating: FeedbackRating): boolean => {
  return rating <= 2
}