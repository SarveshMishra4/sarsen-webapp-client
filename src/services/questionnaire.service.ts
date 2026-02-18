import { apiClient } from '@/lib/apiClient'
import {
  CreateQuestionnaireRequest,
  UpdateQuestionnaireRequest,
  SubmitQuestionnaireRequest,
  SubmitQuestionnaireResponse,
  QuestionnaireResponse,
  QuestionnairesListResponse,
  QuestionnaireFilters,
  ReminderResponse,
  QuestionnaireStats
} from '@/types/questionnaire.types'

export const questionnaireService = {
  /**
   * POST /api/admin/questionnaires
   * Create a new questionnaire
   */
  createQuestionnaire: async (data: CreateQuestionnaireRequest) => {
    return apiClient.post<QuestionnaireResponse>('/admin/questionnaires', data)
  },

  /**
   * GET /api/admin/engagements/:engagementId/questionnaires
   * Get questionnaires for an engagement (admin)
   */
  getEngagementQuestionnaires: async (engagementId: string, status?: string) => {
    const url = status 
      ? `/admin/engagements/${engagementId}/questionnaires?status=${status}`
      : `/admin/engagements/${engagementId}/questionnaires`
    return apiClient.get<QuestionnairesListResponse>(url)
  },

  /**
   * GET /api/admin/questionnaires/:questionnaireId
   * Get single questionnaire (admin)
   */
  getQuestionnaireById: async (questionnaireId: string) => {
    return apiClient.get<QuestionnaireResponse>(`/admin/questionnaires/${questionnaireId}`)
  },

  /**
   * POST /api/admin/questionnaires/:questionnaireId/remind
   * Send reminder for questionnaire
   */
  sendReminder: async (questionnaireId: string) => {
    return apiClient.post<ReminderResponse>(`/admin/questionnaires/${questionnaireId}/remind`, {})
  },

  /**
   * DELETE /api/admin/questionnaires/:questionnaireId
   * Cancel/delete questionnaire
   */
  cancelQuestionnaire: async (questionnaireId: string) => {
    return apiClient.delete(`/admin/questionnaires/${questionnaireId}`)
  },

  /**
   * GET /api/client/questionnaires
   * Get all questionnaires for current client
   */
  getMyQuestionnaires: async (filters?: QuestionnaireFilters) => {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))
    
    const queryString = params.toString()
    const url = queryString ? `/client/questionnaires?${queryString}` : '/client/questionnaires'
    return apiClient.get<QuestionnairesListResponse>(url)
  },

  /**
   * GET /api/client/questionnaires/:questionnaireId
   * Get questionnaire to fill (client)
   */
  getClientQuestionnaire: async (questionnaireId: string) => {
    return apiClient.get<QuestionnaireResponse>(`/client/questionnaires/${questionnaireId}`)
  },

  /**
   * POST /api/client/questionnaires/:questionnaireId/submit
   * Submit questionnaire answers
   */
  submitQuestionnaire: async (questionnaireId: string, data: SubmitQuestionnaireRequest) => {
    return apiClient.post<SubmitQuestionnaireResponse>(
      `/client/questionnaires/${questionnaireId}/submit`, 
      data
    )
  }
}