import { Notification, NotificationType, NotificationSeverity } from '@/types/notification.types'

// Format relative time (e.g., "5 minutes ago")
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Get notification icon based on type
export const getNotificationIcon = (type: NotificationType): string => {
  const icons: Record<NotificationType, string> = {
    'engagement.created': '🎉',
    'engagement.completed': '✅',
    'questionnaire.submitted': '📝',
    'feedback.received': '⭐',
    'payment.received': '💰',
    'message.received': '💬',
    'stalled.engagement': '⚠️',
    'overdue.questionnaire': '⏰',
    'system.alert': '🔔'
  }
  return icons[type] || '📌'
}

// Get notification color based on severity
export const getNotificationColor = (severity: NotificationSeverity): string => {
  const colors: Record<NotificationSeverity, string> = {
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800'
  }
  return colors[severity]
}

// Get notification border color based on severity
export const getNotificationBorderColor = (severity: NotificationSeverity): string => {
  const colors: Record<NotificationSeverity, string> = {
    info: 'border-blue-500',
    warning: 'border-yellow-500',
    success: 'border-green-500',
    error: 'border-red-500'
  }
  return colors[severity]
}

// Group notifications by date
export const groupNotificationsByDate = (notifications: Notification[]): Record<string, Notification[]> => {
  const grouped: Record<string, Notification[]> = {}
  
  notifications.forEach(notification => {
    const date = new Date(notification.createdAt).toDateString()
    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push(notification)
  })
  
  return grouped
}

// Filter notifications by type
export const filterByType = (notifications: Notification[], types: NotificationType[]): Notification[] => {
  return notifications.filter(n => types.includes(n.type))
}

// Filter notifications by severity
export const filterBySeverity = (notifications: Notification[], severities: NotificationSeverity[]): Notification[] => {
  return notifications.filter(n => severities.includes(n.severity))
}

// Get notification action link
export const getNotificationLink = (notification: Notification): string | undefined => {
  if (notification.link) return notification.link
  
  // Generate default links based on type
  const links: Partial<Record<NotificationType, string>> = {
    'engagement.created': `/admin/protected/engagements/${notification.data?.engagementId}`,
    'engagement.completed': `/admin/protected/engagements/${notification.data?.engagementId}`,
    'questionnaire.submitted': `/admin/protected/questionnaires/${notification.data?.questionnaireId}`,
    'feedback.received': `/admin/protected/feedback/${notification.data?.feedbackId}`,
    'payment.received': `/admin/protected/payments/${notification.data?.orderId}`,
    'message.received': `/admin/protected/engagements/${notification.data?.engagementId}`,
    'stalled.engagement': `/admin/protected/engagements/${notification.data?.engagementId}`,
    'overdue.questionnaire': `/admin/protected/questionnaires/${notification.data?.questionnaireId}`
  }
  
  return links[notification.type]
}