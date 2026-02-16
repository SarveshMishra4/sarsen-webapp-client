import { apiClient } from '@/lib/apiClient'
import { 
  BlueprintData, 
  CreateBlueprintInput, 
  UpdateBlueprintInput,
  BlueprintFilters,
  BlueprintResponse,
  BlueprintsListResponse 
} from '@/types/blueprint.types'
import { ApiResponse } from '@/types/api.types'

export const blueprintService = {
  /**
   * POST /api/admin/blueprints
   * Create new blueprint
   */
  createBlueprint: async (data: CreateBlueprintInput) => {
    return apiClient.post<BlueprintResponse>('/admin/blueprints', data)
  },

  /**
   * GET /api/admin/blueprints
   * Get all blueprints with optional filters
   */
  getBlueprints: async (filters?: BlueprintFilters) => {
    const params = new URLSearchParams()
    if (filters?.active !== undefined) {
      params.append('active', String(filters.active))
    }
    const queryString = params.toString()
    const url = queryString ? `/admin/blueprints?${queryString}` : '/admin/blueprints'
    return apiClient.get<BlueprintsListResponse>(url)
  },

  /**
   * GET /api/admin/blueprints/code/:serviceCode
   * Get blueprint by service code
   */
  getBlueprintByCode: async (serviceCode: string) => {
    return apiClient.get<BlueprintResponse>(`/admin/blueprints/code/${serviceCode}`)
  },

  /**
   * GET /api/admin/blueprints/slug/:slug
   * Get blueprint by slug
   */
  getBlueprintBySlug: async (slug: string) => {
    return apiClient.get<BlueprintResponse>(`/admin/blueprints/slug/${slug}`)
  },

  /**
   * PUT /api/admin/blueprints/:serviceCode
   * Update blueprint
   */
  updateBlueprint: async (serviceCode: string, data: UpdateBlueprintInput) => {
    return apiClient.put<BlueprintResponse>(`/admin/blueprints/${serviceCode}`, data)
  },

  /**
   * DELETE /api/admin/blueprints/:serviceCode
   * Deactivate blueprint (soft delete)
   */
  deleteBlueprint: async (serviceCode: string) => {
    return apiClient.delete(`/admin/blueprints/${serviceCode}`)
  }
}