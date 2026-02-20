import { apiClient } from '@/lib/apiClient'
import { HealthCheckResponse, ServiceValidationResponse } from '@/types/public.types'
import { ApiResponse } from '@/types/api.types'

export const publicService = {
  /**
   * GET /health
   * Check API health
   */
  healthCheck: async () => {
    return apiClient.get<HealthCheckResponse>('/health')
  },

  /**
   * GET /services/validate/:slug
   * Validate service existence and get current price
   */
  validateService: async (slug: string) => {
    // Changed from '/api/services/validate/${slug}' to '/api/public/validate/${slug}'
    return apiClient.get(`/api/public/validate/${slug}`)
  },
}