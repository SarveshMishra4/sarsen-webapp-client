import { apiClient } from '@/lib/apiClient'
import { 
  SendMessageRequest,
  SendMessageResponse,
  MessagesResponse,
  MessageFilters,
  UnreadCountResponse,
  MarkAsReadRequest,
  RecentMessagesResponse,
  Message
} from '@/types/message.types'

export const messageService = {
  /**
   * POST /api/messages
   * Send a new message
   */
  sendMessage: async (data: SendMessageRequest) => {
    return apiClient.post<SendMessageResponse>('/messages', data)
  },

  /**
   * GET /api/messages/:engagementId
   * Get messages for an engagement with pagination
   */
  getMessages: async (engagementId: string, filters?: MessageFilters) => {
    const params = new URLSearchParams()
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))
    if (filters?.before) params.append('before', filters.before)
    if (filters?.after) params.append('after', filters.after)
    
    const queryString = params.toString()
    const url = queryString 
      ? `/messages/${engagementId}?${queryString}`
      : `/messages/${engagementId}`
    
    return apiClient.get<MessagesResponse>(url)
  },

  /**
   * PATCH /api/messages/:engagementId/read
   * Mark messages as read
   */
  markAsRead: async (engagementId: string, messageIds?: string[]) => {
    return apiClient.patch(`/messages/${engagementId}/read`, { messageIds })
  },

  /**
   * GET /api/messages/:engagementId/unread
   * Get unread count for an engagement
   */
  getUnreadCount: async (engagementId: string) => {
    return apiClient.get<UnreadCountResponse>(`/messages/${engagementId}/unread`)
  },

  /**
   * GET /api/admin/messages/recent
   * Get recent messages across all engagements (admin only)
   */
  getRecentMessages: async (limit: number = 10) => {
    return apiClient.get<RecentMessagesResponse>(`/admin/messages/recent?limit=${limit}`)
  },

  /**
   * DELETE /api/admin/messages/:messageId
   * Delete a message (admin only)
   */
  deleteMessage: async (messageId: string) => {
    return apiClient.delete(`/admin/messages/${messageId}`)
  },

  /**
   * GET /api/admin/engagements/:engagementId/messages
   * Get messages for admin view
   */
  getAdminMessages: async (engagementId: string, page: number = 1, limit: number = 50) => {
    return apiClient.get<MessagesResponse>(
      `/admin/engagements/${engagementId}/messages?page=${page}&limit=${limit}`
    )
  }
}