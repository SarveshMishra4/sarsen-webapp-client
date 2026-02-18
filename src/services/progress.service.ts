import { apiClient } from '@/lib/apiClient'
import {
  ProgressUpdateRequest,
  ProgressUpdateResponse,
  ProgressHistoryResponse,
  ProgressTimelineResponse,
  ProgressAnalyticsResponse,
  StalledEngagementsResponse,
} from '@/types/progress.types'
import { MilestoneValue } from '@/types/blueprint.types'  // FIX: Import from correct location

export const progressService = {
  /**
   * POST /api/admin/progress
   * Update engagement progress
   */
  updateProgress: async (data: ProgressUpdateRequest) => {
    return apiClient.post<ProgressUpdateResponse>('/admin/progress', data)
  },

  /**
   * GET /api/admin/engagements/:engagementId/progress/history
   * Get progress history for an engagement
   */
  getProgressHistory: async (engagementId: string, limit: number = 50) => {
    return apiClient.get<ProgressHistoryResponse>(
      `/admin/engagements/${engagementId}/progress/history?limit=${limit}`
    )
  },

  /**
   * GET /api/admin/engagements/:engagementId/progress/timeline
   * Get milestone timeline for an engagement
   */
  getProgressTimeline: async (engagementId: string) => {
    return apiClient.get<ProgressTimelineResponse>(
      `/admin/engagements/${engagementId}/progress/timeline`
    )
  },

  /**
   * GET /api/admin/engagements/:engagementId/progress/analytics
   * Get progress analytics for an engagement
   */
  getProgressAnalytics: async (engagementId: string) => {
    return apiClient.get<ProgressAnalyticsResponse>(
      `/admin/engagements/${engagementId}/progress/analytics`
    )
  },

  /**
   * GET /api/admin/progress/stalled
   * Get stalled engagements
   */
  getStalledEngagements: async (days: number = 7) => {
    return apiClient.get<StalledEngagementsResponse>(
      `/admin/progress/stalled?days=${days}`
    )
  },

  /**
   * GET /api/client/engagements/:engagementId/progress
   * Get progress for client view
   */
  getClientProgress: async (engagementId: string) => {
    return apiClient.get<{
      currentProgress: MilestoneValue
      isCompleted: boolean
      startDate: string
      completedAt?: string
      timeline: Array<{
        value: MilestoneValue
        label: string
        reachedAt: string
      }>
    }>(`/client/engagements/${engagementId}/progress`)
  }
}