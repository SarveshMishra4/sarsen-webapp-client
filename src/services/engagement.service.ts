import { apiClient } from '@/lib/apiClient'
import { 
  EngagementData, 
  EngagementSummary,
  EngagementListResponse,
  EngagementResponse,
  ProgressResponse,
  EngagementFilters 
} from '@/types/engagement.types'

export const engagementService = {
  /**
   * GET /api/client/engagements
   * Get all engagements for authenticated client
   */
  getMyEngagements: async () => {
    return apiClient.get<EngagementListResponse>('/client/engagements')
  },

  /**
   * GET /api/client/engagements/:engagementId
   * Get specific engagement by ID
   */
  getEngagementById: async (engagementId: string) => {
    return apiClient.get<EngagementResponse>(`/client/engagements/${engagementId}`)
  },

  /**
   * GET /api/client/engagements/:engagementId/progress
   * Get progress for specific engagement
   */
  getEngagementProgress: async (engagementId: string) => {
    return apiClient.get<ProgressResponse>(`/client/engagements/${engagementId}/progress`)
  },

  /**
   * GET /api/admin/engagements
   * Get all engagements (admin only)
   */
  getAllEngagements: async (filters?: EngagementFilters) => {
    const params = new URLSearchParams()
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))
    if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive))
    if (filters?.isCompleted !== undefined) params.append('isCompleted', String(filters.isCompleted))
    if (filters?.serviceCode) params.append('serviceCode', filters.serviceCode)
    
    const queryString = params.toString()
    const url = queryString ? `/admin/engagements?${queryString}` : '/admin/engagements'
return apiClient.get<{
  success: boolean
  data: {
    engagements: EngagementData[]
    total: number
    pages: number
  }
}>(url)  },

  /**
   * GET /api/admin/engagements/:engagementId
   * Get specific engagement by ID (admin only)
   */
  getAdminEngagementById: async (engagementId: string) => {
    return apiClient.get<EngagementResponse>(`/admin/engagements/${engagementId}`)
  },

  /**
   * PATCH /api/admin/engagements/:engagementId/progress
   * Update engagement progress (admin only)
   */
  updateProgress: async (engagementId: string, progress: number, note?: string) => {
    return apiClient.patch<EngagementResponse>(`/admin/engagements/${engagementId}/progress`, { progress, note })
  }
}