export type NotificationType = 
  | 'engagement.created'
  | 'engagement.completed'
  | 'questionnaire.submitted'
  | 'feedback.received'
  | 'payment.received'
  | 'message.received'
  | 'stalled.engagement'
  | 'overdue.questionnaire'
  | 'system.alert'

export type NotificationSeverity = 'info' | 'warning' | 'success' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  severity: NotificationSeverity
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: string
  expiresAt?: string
  link?: string
  actionText?: string
}

export interface NotificationFilters {
  unreadOnly?: boolean
  limit?: number
  type?: NotificationType[]
  severity?: NotificationSeverity[]
}

export interface NotificationListResponse {
  notifications: Notification[]
  unreadCount: number
}

export interface UnreadCountResponse {
  unreadCount: number
}

export interface MarkAsReadRequest {
  notificationIds?: string[] // if not provided, mark all as read
}

export interface NotificationEvent {
  type: NotificationType
  data: any
  timestamp: string
}