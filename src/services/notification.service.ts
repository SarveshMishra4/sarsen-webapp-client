import { apiClient } from '@/lib/apiClient'
import {
  NotificationListResponse,
  UnreadCountResponse,
  NotificationFilters,
  MarkAsReadRequest
} from '@/types/notification.types'

export const notificationService = {
  /**
   * GET /api/admin/notifications
   * Get all notifications with filters
   */
  getNotifications: async (filters?: NotificationFilters) => {
    const params = new URLSearchParams()
    if (filters?.unreadOnly) params.append('unreadOnly', 'true')
    if (filters?.limit) params.append('limit', String(filters.limit))
    if (filters?.type) filters.type.forEach(t => params.append('type', t))
    if (filters?.severity) filters.severity.forEach(s => params.append('severity', s))
    
    const queryString = params.toString()
    const url = queryString ? `/admin/notifications?${queryString}` : '/admin/notifications'
    return apiClient.get<NotificationListResponse>(url)
  },

  /**
   * GET /api/admin/notifications/unread-count
   * Get unread count only (for badge)
   */
  getUnreadCount: async () => {
    return apiClient.get<UnreadCountResponse>('/admin/notifications/unread-count')
  },

  /**
   * PATCH /api/admin/notifications/:notificationId/read
   * Mark a single notification as read
   */
  markAsRead: async (notificationId: string) => {
    return apiClient.patch(`/admin/notifications/${notificationId}/read`, {})
  },

  /**
   * POST /api/admin/notifications/read-all
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    return apiClient.post('/admin/notifications/read-all', {})
  }
}