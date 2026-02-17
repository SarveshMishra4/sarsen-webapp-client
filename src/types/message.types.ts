export type SenderType = 'admin' | 'client'

export interface MessageAttachment {
  id: string
  type: 'image' | 'pdf' | 'doc' | 'excel' | 'ppt' | 'link' | 'other'
  url: string
  name: string
  size?: number
  mimeType?: string
  thumbnailUrl?: string
}

export interface Message {
  id: string
  engagementId: string
  senderId: string
  senderType: SenderType
  senderName: string
  content: string
  attachments?: MessageAttachment[]
  isRead: boolean
  readBy: Array<{
    userId: string
    readAt: string
  }>
  createdAt: string
  updatedAt: string
}

export interface SendMessageRequest {
  engagementId: string
  content: string
  attachments?: Omit<MessageAttachment, 'id'>[]
}

export interface SendMessageResponse {
  message: Message
}

export interface MessagesResponse {
  messages: Message[]
  total: number
  unreadCount: number
}

export interface MessageFilters {
  page?: number
  limit?: number
  before?: string
  after?: string
}

export interface UnreadCountResponse {
  unreadCount: number
}

export interface MarkAsReadRequest {
  messageIds?: string[] // If not provided, mark all as read
}

export interface RecentMessage {
  id: string
  engagementId: string
  engagementName: string
  senderName: string
  senderType: SenderType
  content: string
  createdAt: string
  isRead: boolean
}

export interface RecentMessagesResponse {
  messages: RecentMessage[]
}

export interface TypingStatus {
  engagementId: string
  userId: string
  userType: SenderType
  isTyping: boolean
}

// For optimistic updates in UI
export interface OptimisticMessage extends Omit<Message, 'id' | 'createdAt' | 'updatedAt'> {
  id: string
  createdAt: string
  updatedAt: string
  isOptimistic: true
}