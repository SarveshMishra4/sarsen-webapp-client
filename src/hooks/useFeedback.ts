'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { feedbackService } from '@/services/feedback.service'
import { useToast } from './useToast'
import {
  FeedbackData,
  FeedbackFilters,
  FeedbackStats,
  SubmitFeedbackRequest,
  FeedbackRating,
  AccessMode,
  CompletionStatus
} from '@/types/feedback.types'

interface UseFeedbackProps {
  feedbackId?: string
  engagementId?: string
}

export const useFeedback = ({ feedbackId, engagementId }: UseFeedbackProps = {}) => {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [feedbackList, setFeedbackList] = useState<FeedbackData[]>([])
  const [stats, setStats] = useState<FeedbackStats | null>(null)
  const [engagementsNeedingFeedback, setEngagementsNeedingFeedback] = useState<any[]>([])
  const [status, setStatus] = useState<CompletionStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)  // FIX: Add isSubmitting state
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const { success, error } = useToast()
  const router = useRouter()

  // Submit feedback
  const submitFeedback = useCallback(async (data: SubmitFeedbackRequest) => {
    setIsSubmitting(true)  // FIX: Use isSubmitting
    try {
      const response = await feedbackService.submitFeedback(data)
      if (response.success && response.data) {
        success('Feedback submitted successfully')
        return response.data.feedback
      }
    } catch (err: any) {
      error(err.message || 'Failed to submit feedback')
    } finally {
      setIsSubmitting(false)  // FIX: Use isSubmitting
    }
  }, [success, error])

  // Get feedback status
  const fetchFeedbackStatus = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await feedbackService.getFeedbackStatus()
      if (response.success && response.data) {
        // FIX: Map API response to CompletionStatus
        const completionStatus: CompletionStatus = {
          isCompleted: response.data.isCompleted,
          hasFeedback: response.data.hasFeedback,
          canAccess: response.data.accessMode === 'full' || response.data.accessMode === 'read-only',
          accessMode: response.data.accessMode,
          completedAt: undefined, // API doesn't provide this
          feedbackSubmittedAt: undefined // API doesn't provide this
        }
        setStatus(completionStatus)
        return completionStatus
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch feedback status')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Get client's own feedback
  const fetchMyFeedback = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await feedbackService.getMyFeedback()
      if (response.success && response.data) {
        setFeedback(response.data.feedback)
        return response.data.feedback
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch feedback')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Get all feedback (admin)
  const fetchAllFeedback = useCallback(async (filters?: FeedbackFilters) => {
    setIsLoading(true)
    try {
      const response = await feedbackService.getAllFeedback(filters)
      if (response.success && response.data) {
        setFeedbackList(response.data.feedback)
        setTotalCount(response.data.total)
        setTotalPages(response.data.pages || 1)
        if (response.data.stats) {
          setStats(response.data.stats)
        }
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch feedback')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Get feedback stats (admin)
  const fetchFeedbackStats = useCallback(async (
    startDate?: string,
    endDate?: string,
    rating?: number
  ) => {
    setIsLoading(true)
    try {
      const response = await feedbackService.getFeedbackStats(startDate, endDate, rating)
      if (response.success && response.data) {
        setStats(response.data)
        return response.data
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch feedback stats')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Get engagements needing feedback (admin)
  const fetchEngagementsNeedingFeedback = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await feedbackService.getEngagementsNeedingFeedback()
      if (response.success && response.data) {
        setEngagementsNeedingFeedback(response.data.engagements)
        return response.data
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch engagements needing feedback')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Get feedback by ID (admin)
  const fetchFeedbackById = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      const response = await feedbackService.getFeedbackById(id)
      if (response.success && response.data) {
        setFeedback(response.data.feedback)
        return response.data.feedback
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch feedback')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Toggle highlight (admin)
  const toggleHighlight = useCallback(async (id: string, isHighlighted: boolean) => {
    setIsLoading(true)
    try {
      const response = await feedbackService.toggleHighlight(id, isHighlighted)
      if (response.success) {
        success(`Feedback ${isHighlighted ? 'highlighted' : 'unhighlighted'} successfully`)
        // Update local state
        setFeedback(prev => prev ? { ...prev, isHighlighted } : null)
        setFeedbackList(prev => 
          prev.map(f => f.id === id ? { ...f, isHighlighted } : f)
        )
      }
    } catch (err: any) {
      error(err.message || 'Failed to toggle highlight')
    } finally {
      setIsLoading(false)
    }
  }, [success, error])

  // Add admin notes (admin)
  const addAdminNotes = useCallback(async (id: string, notes: string) => {
    setIsLoading(true)
    try {
      const response = await feedbackService.addAdminNotes(id, notes)
      if (response.success) {
        success('Notes added successfully')
        // Update local state
        setFeedback(prev => prev ? { ...prev, adminNotes: notes } : null)
      }
    } catch (err: any) {
      error(err.message || 'Failed to add notes')
    } finally {
      setIsLoading(false)
    }
  }, [success, error])

  // Delete feedback (admin)
  const deleteFeedback = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return

    setIsLoading(true)
    try {
      const response = await feedbackService.deleteFeedback(id)
      if (response.success) {
        success('Feedback deleted successfully')
        router.push('/admin/protected/feedback')
      }
    } catch (err: any) {
      error(err.message || 'Failed to delete feedback')
    } finally {
      setIsLoading(false)
    }
  }, [success, error, router])

  // Helper: Get access mode message
  const getAccessMessage = useCallback((mode: AccessMode): string => {
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
  }, [])

  // Helper: Check if feedback is required
  const isFeedbackRequired = useCallback((status: CompletionStatus): boolean => {
    return status.isCompleted && !status.hasFeedback
  }, [])

  return {
    // State
    feedback,
    feedbackList,
    stats,
    engagementsNeedingFeedback,
    status,
    isLoading,
    isSubmitting,  // FIX: Add isSubmitting to return
    totalCount,
    totalPages,

    // Client operations
    submitFeedback,
    fetchFeedbackStatus,
    fetchMyFeedback,

    // Admin operations
    fetchAllFeedback,
    fetchFeedbackStats,
    fetchEngagementsNeedingFeedback,
    fetchFeedbackById,
    toggleHighlight,
    addAdminNotes,
    deleteFeedback,

    // Helpers
    getAccessMessage,
    isFeedbackRequired
  }
}