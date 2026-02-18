import { MilestoneValue } from './blueprint.types'

export type FeedbackRating = 1 | 2 | 3 | 4 | 5

export interface FeedbackData {
  id: string
  engagementId: string
  userId: string
  rating: FeedbackRating
  review?: string
  wouldRecommend: boolean
  wouldUseAgain: boolean
  communication?: FeedbackRating
  quality?: FeedbackRating
  timeliness?: FeedbackRating
  value?: FeedbackRating
  whatWorkedWell?: string[]
  whatCouldBeImproved?: string[]
  additionalComments?: string
  allowTestimonial: boolean
  testimonial?: string
  ipAddress?: string
  userAgent?: string
  timeSpent?: number // time spent on feedback form in seconds
  adminNotes?: string
  isHighlighted: boolean
  submittedAt: string
  createdAt: string
  updatedAt: string
}

export interface SubmitFeedbackRequest {
  engagementId: string
  rating: FeedbackRating
  review?: string
  wouldRecommend: boolean
  wouldUseAgain: boolean
  communication?: FeedbackRating
  quality?: FeedbackRating
  timeliness?: FeedbackRating
  value?: FeedbackRating
  whatWorkedWell?: string[]
  whatCouldBeImproved?: string[]
  additionalComments?: string
  allowTestimonial?: boolean
  testimonial?: string
  timeSpent?: number
}

export interface SubmitFeedbackResponse {
  feedback: FeedbackData
}

export interface FeedbackStatusResponse {
  hasFeedback: boolean
  isCompleted: boolean
  requiresFeedback: boolean
  accessMode: 'full' | 'feedback-required' | 'read-only'
}

export interface FeedbackFilters {
  rating?: FeedbackRating
  startDate?: string
  endDate?: string
  isHighlighted?: boolean
  page?: number
  limit?: number
}

export interface FeedbackListResponse {
  feedback: FeedbackData[]
  total: number
  pages: number
  stats?: FeedbackStats
}

export interface FeedbackStats {
  totalCount: number
  averageRating: number
  ratingDistribution: Record<FeedbackRating, number>
  recommendRate: number // percentage
  wouldUseAgainRate: number // percentage
  averageCommunication?: number
  averageQuality?: number
  averageTimeliness?: number
  averageValue?: number
  commonPraises: Array<{ text: string; count: number }>
  commonImprovements: Array<{ text: string; count: number }>
}

export interface FeedbackResponse {
  feedback: FeedbackData
}

export interface ToggleHighlightRequest {
  isHighlighted: boolean
}

export interface AddNotesRequest {
  notes: string
}

export interface EngagementsNeedingFeedbackResponse {
  engagements: Array<{
    id: string
    engagementId: string
    serviceName: string
    completedAt: string
    clientName?: string
    clientEmail: string
  }>
  count: number
}

export type AccessMode = 'full' | 'feedback-required' | 'read-only'

export interface CompletionStatus {
  isCompleted: boolean
  hasFeedback: boolean
  canAccess: boolean
  accessMode: AccessMode
  completedAt?: string
  feedbackSubmittedAt?: string
}