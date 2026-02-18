'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { notificationService } from '@/services/notification.service'
import { useToast } from './useToast'
import {
  Notification,
  NotificationFilters,
  NotificationType,
  NotificationSeverity
} from '@/types/notification.types'
import {
  formatRelativeTime,
  getNotificationIcon,
  getNotificationColor,
  getNotificationLink
} from '@/utils/notification.utils'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isPolling, setIsPolling] = useState(true)
  
  const pollingInterval = useRef<NodeJS.Timeout | null>(null)
  const { success, error } = useToast()

  // Fetch notifications
  const fetchNotifications = useCallback(async (filters?: NotificationFilters) => {
    setIsLoading(true)
    try {
      const response = await notificationService.getNotifications(filters)
      if (response.success && response.data) {
        setNotifications(response.data.notifications)
        setUnreadCount(response.data.unreadCount)
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch notifications')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Fetch unread count only
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await notificationService.getUnreadCount()
      if (response.success && response.data) {
        setUnreadCount(response.data.unreadCount)
      }
    } catch (err) {
      // Silently fail for count
    }
  }, [])

  // Mark single notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await notificationService.markAsRead(notificationId)
      if (response.success) {
        setNotifications(prev =>
          prev.map(n =>
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (err: any) {
      error(err.message || 'Failed to mark as read')
    }
  }, [error])

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      const response = await notificationService.markAllAsRead()
      if (response.success) {
        setNotifications(prev =>
          prev.map(n => ({ ...n, isRead: true }))
        )
        setUnreadCount(0)
        success('All notifications marked as read')
      }
    } catch (err: any) {
      error(err.message || 'Failed to mark all as read')
    }
  }, [success, error])

  // Start polling for new notifications
  const startPolling = useCallback((intervalMs: number = 30000) => {
    setIsPolling(true)
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
    }
    pollingInterval.current = setInterval(() => {
      fetchUnreadCount()
    }, intervalMs)
  }, [fetchUnreadCount])

  // Stop polling
  const stopPolling = useCallback(() => {
    setIsPolling(false)
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
      pollingInterval.current = null
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchNotifications({ limit: 50 })
    startPolling()

    return () => {
      stopPolling()
    }
  }, [fetchNotifications, startPolling, stopPolling])

  // Helpers
  const getRelativeTime = useCallback((dateString: string): string => {
    return formatRelativeTime(dateString)
  }, [])

  const getIcon = useCallback((type: NotificationType): string => {
    return getNotificationIcon(type)
  }, [])

  const getColor = useCallback((severity: NotificationSeverity): string => {
    return getNotificationColor(severity)
  }, [])

  const getLink = useCallback((notification: Notification): string | undefined => {
    return getNotificationLink(notification)
  }, [])

  return {
    // State
    notifications,
    unreadCount,
    isLoading,
    isPolling,

    // Actions
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    startPolling,
    stopPolling,

    // Helpers
    getRelativeTime,
    getIcon,
    getColor,
    getLink
  }
}