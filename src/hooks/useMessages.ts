'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { messageService } from '@/services/message.service'
import { useToast } from './useToast'
import { useAuth } from './useAuth'
import {
  Message,
  MessageFilters,
  SendMessageRequest,
  OptimisticMessage,
  SenderType
} from '@/types/message.types'

interface UseMessagesProps {
  engagementId: string
  pageSize?: number
}

export const useMessages = ({ engagementId, pageSize = 50 }: UseMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const [page, setPage] = useState(1)

  const { user, role } = useAuth()
  const { success, error } = useToast()

  // FIX: Add proper initial values for refs
  const pollingInterval = useRef<NodeJS.Timeout | null>(null)
  const lastMessageTime = useRef<string | undefined>(undefined)

  // Helper to get sender name safely
  const getSenderName = useCallback((): string => {
    if (!user) return 'Unknown'
    if (role === 'ADMIN') return 'Admin'

    // Type guard for client user
    if ('firstName' in user || 'lastName' in user) {
      const clientUser = user as any // Type assertion after check
      return `${clientUser.firstName || ''} ${clientUser.lastName || ''}`.trim() || user.email
    }

    return user.email
  }, [user, role])

  // Fetch messages
  // Fetch messages
  const fetchMessages = useCallback(async (filters?: MessageFilters) => {
    if (!engagementId) return

    setIsLoading(true)
    try {
      const response = await messageService.getMessages(engagementId, filters)
      // FIX: Add safety check for response.data
      if (response.success && response.data) {
        const fetchedMessages = response.data.messages || []

        // If polling (after filter exists), append new messages
        // If this is initial load or manual refresh → replace everything
if (!filters?.after) {
  setMessages(fetchedMessages)
} else {
  // Polling → merge only new messages
  setMessages(prev => {
    const existingIds = new Set(prev.map(m => m.id))
    const newMessages = fetchedMessages.filter(
      m => !existingIds.has(m.id)
    )
    return newMessages.length === 0 ? prev : [...prev, ...newMessages]
  })
}

        setTotalCount(response.data.total || 0)
        setUnreadCount(response.data.unreadCount || 0)

        if (fetchedMessages.length > 0) {
          lastMessageTime.current =
            fetchedMessages[fetchedMessages.length - 1].createdAt
        }
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch messages')
    } finally {
      setIsLoading(false)
    }
  }, [engagementId, error])

  // Load more messages (pagination)
  // Load more messages (pagination)
  const loadMore = useCallback(async () => {
    if (!engagementId || !hasMore || isLoadingMore) return

    setIsLoadingMore(true)
    try {
      const nextPage = page + 1
      const response = await messageService.getMessages(engagementId, {
        page: nextPage,
        limit: pageSize
      })

      // FIX: Proper type checking for messages array
      if (response.success && response.data) {
        // Ensure messages is an array before spreading
        const newMessages = response.data.messages || []

        if (newMessages.length === 0) {
          setHasMore(false)
        } else {
          // Type-safe spread - newMessages is confirmed to be an array
          setMessages(prev => [...prev, ...newMessages])
          setPage(nextPage)
          setTotalCount(response.data.total || 0)
        }
      }
    } catch (err: any) {
      error(err.message || 'Failed to load more messages')
    } finally {
      setIsLoadingMore(false)
    }
  }, [engagementId, page, pageSize, hasMore, isLoadingMore, error])

  // Send a message
  const sendMessage = useCallback(async (content: string, attachments?: any[]) => {
    if (!engagementId || !content.trim() || !user) return

    const senderName = getSenderName()

    // Create optimistic message
    const optimisticId = `temp-${Date.now()}`
    const optimisticMessage: OptimisticMessage = {
      id: optimisticId,
      engagementId,
      senderId: user.id,
      senderType: role?.toLowerCase() as SenderType,
      senderName,
      content: content.trim(),
      attachments,
      isRead: false,
      readBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isOptimistic: true
    }

    // Add optimistic message to UI
    setMessages(prev => [...prev, optimisticMessage as Message])

    try {
      const request: SendMessageRequest = {
        engagementId,
        content: content.trim(),
        attachments
      }

      const response = await messageService.sendMessage(request)

      // FIX: Add safety check for response.data
      if (response.success && response.data) {
        // Replace optimistic message with real one
        setMessages(prev =>
          prev.map(msg =>
            msg.id === optimisticId ? response.data!.message : msg
          )
        )

        // Update last message time
        lastMessageTime.current = response.data.message.createdAt
      } else {
        // Remove optimistic message on failure
        setMessages(prev => prev.filter(msg => msg.id !== optimisticId))
        error(response.message || 'Failed to send message')
      }
    } catch (err: any) {
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== optimisticId))
      error(err.message || 'Failed to send message')
    }
  }, [engagementId, user, role, error, getSenderName])

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!engagementId) return

    try {
      const response = await messageService.getUnreadCount(engagementId)
      // FIX: Add safety check for response.data
      if (response.success && response.data) {
        setUnreadCount(response.data.unreadCount)
      }
    } catch (err) {
      // Silently fail for unread count
    }
  }, [engagementId])

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!engagementId) return

    try {
      await messageService.markAsRead(engagementId)

      // Refresh messages from backend to sync readBy state
      await fetchMessages()

      setUnreadCount(0)
    } catch (err: any) {
      error(err.message || 'Failed to mark messages as read')
    }
  }, [engagementId, fetchMessages, error])

  // Set up polling for new messages
  useEffect(() => {
    if (!engagementId) return

    const init = async () => {
      // 1️⃣ Fetch messages first (auto-marks read in backend)
      await fetchMessages()

      // 2️⃣ Then fetch unread count (now it will be correct)
      await fetchUnreadCount()
    }

    init()

    // 3️⃣ Polling (messages first, then unread)
    const interval = setInterval(async () => {
      await fetchMessages()
      await fetchUnreadCount()
    }, 30000)

    return () => clearInterval(interval)
  }, [engagementId, fetchMessages, fetchUnreadCount])

  // Update unread count periodically
  useEffect(() => {
    if (!engagementId) return

    const unreadInterval = setInterval(() => {
      fetchUnreadCount()
    }, 10000)

    return () => {
      clearInterval(unreadInterval)
    }
  }, [engagementId, fetchUnreadCount])

  return {
    // State
    messages,
    isLoading,
    isLoadingMore,
    hasMore,
    totalCount,
    unreadCount,

    // Actions
    sendMessage,
    loadMore,
    markAllAsRead,
    refresh: () => fetchMessages(),
  }
}