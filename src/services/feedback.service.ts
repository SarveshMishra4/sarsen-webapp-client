import { apiClient } from '@/lib/apiClient'
import {
  SubmitFeedbackRequest,
  SubmitFeedbackResponse,
  FeedbackStatusResponse,
  FeedbackListResponse,
  FeedbackResponse,
  FeedbackFilters,
  ToggleHighlightRequest,
  AddNotesRequest,
  EngagementsNeedingFeedbackResponse,
  FeedbackStats
} from '@/types/feedback.types'

export const feedbackService = {
  /**
   * POST /api/client/feedback
   * Submit feedback for completed engagement
   */
  submitFeedback: async (data: SubmitFeedbackRequest) => {
    return apiClient.post<SubmitFeedbackResponse>('/client/feedback', data)
  },

  /**
   * GET /api/client/feedback/status
   * Get feedback status for current engagement
   */
  getFeedbackStatus: async () => {
    return apiClient.get<FeedbackStatusResponse>('/client/feedback/status')
  },

  /**
   * GET /api/client/feedback
   * Get client's own feedback
   */
  getMyFeedback: async () => {
    return apiClient.get<{ feedback: any }>('/client/feedback')
  },

  /**
   * GET /api/admin/feedback
   * Get all feedback with filters (admin only)
   */
  getAllFeedback: async (filters?: FeedbackFilters) => {
    const params = new URLSearchParams()
    if (filters?.rating) params.append('rating', String(filters.rating))
    if (filters?.startDate) params.append('startDate', filters.startDate)
    if (filters?.endDate) params.append('endDate', filters.endDate)
    if (filters?.isHighlighted !== undefined) params.append('isHighlighted', String(filters.isHighlighted))
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))
    
    const queryString = params.toString()
    const url = queryString ? `/admin/feedback?${queryString}` : '/admin/feedback'
    return apiClient.get<FeedbackListResponse>(url)
  },

  /**
   * GET /api/admin/feedback/stats
   * Get feedback statistics (admin only)
   */
  getFeedbackStats: async (startDate?: string, endDate?: string, rating?: number) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    if (rating) params.append('rating', String(rating))
    
    const queryString = params.toString()
    const url = queryString ? `/admin/feedback/stats?${queryString}` : '/admin/feedback/stats'
    return apiClient.get<FeedbackStats>(url)
  },

  /**
   * GET /api/admin/feedback/needed
   * Get engagements needing feedback (admin only)
   */
  getEngagementsNeedingFeedback: async () => {
    return apiClient.get<EngagementsNeedingFeedbackResponse>('/admin/feedback/needed')
  },

  /**
   * GET /api/admin/feedback/:feedbackId
   * Get feedback by ID (admin only)
   */
  getFeedbackById: async (feedbackId: string) => {
    return apiClient.get<FeedbackResponse>(`/admin/feedback/${feedbackId}`)
  },

  /**
   * PATCH /api/admin/feedback/:feedbackId/highlight
   * Toggle testimonial highlight (admin only)
   */
  toggleHighlight: async (feedbackId: string, isHighlighted: boolean) => {
    return apiClient.patch(`/admin/feedback/${feedbackId}/highlight`, { isHighlighted })
  },

  /**
   * POST /api/admin/feedback/:feedbackId/notes
   * Add admin notes to feedback (admin only)
   */
  addAdminNotes: async (feedbackId: string, notes: string) => {
    return apiClient.post(`/admin/feedback/${feedbackId}/notes`, { notes })
  },

  /**
   * DELETE /api/admin/feedback/:feedbackId
   * Delete feedback (admin only)
   */
  deleteFeedback: async (feedbackId: string) => {
    return apiClient.delete(`/admin/feedback/${feedbackId}`)
  }
}