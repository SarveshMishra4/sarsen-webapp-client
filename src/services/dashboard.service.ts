import { apiClient } from '@/lib/apiClient'
import {
  DashboardResponse,
  DashboardFilters,
  DashboardSummary,
  RefreshDashboardResponse
} from '@/types/dashboard.types'

export const dashboardService = {
  /**
   * GET /api/admin/dashboard/summary
   * Get lightweight dashboard summary for sidebar/widgets
   */
  getDashboardSummary: async () => {
    return apiClient.get<DashboardResponse>('/admin/dashboard/summary')
  },

  /**
   * GET /api/admin/dashboard/cached
   * Get fast cached dashboard data
   */
  getCachedDashboard: async () => {
    return apiClient.get<DashboardResponse>('/admin/dashboard/cached')
  },

  /**
   * GET /api/admin/dashboard/full
   * Get full real-time metrics with filters
   */
  getFullDashboard: async (filters?: DashboardFilters) => {
    const params = new URLSearchParams()
    if (filters?.startDate) params.append('startDate', filters.startDate)
    if (filters?.endDate) params.append('endDate', filters.endDate)
    if (filters?.serviceCode) params.append('serviceCode', filters.serviceCode)
    
    const queryString = params.toString()
    const url = queryString ? `/admin/dashboard/full?${queryString}` : '/admin/dashboard/full'
    return apiClient.get<DashboardResponse>(url)
  },

  /**
   * POST /api/admin/dashboard/refresh
   * Manually refresh dashboard cache
   */
  refreshDashboard: async () => {
    return apiClient.post<RefreshDashboardResponse>('/admin/dashboard/refresh', {})
  }
}