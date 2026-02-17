'use client'

import { useEffect, useRef } from 'react'
import { Message } from '@/types/message.types'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import { Button } from '@/components/ui/Button'

interface MessageThreadProps {
  messages: Message[]
  currentUserId: string
  isLoading?: boolean
  hasMore?: boolean
  onLoadMore?: () => void
  showTyping?: boolean
}

export const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  currentUserId,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  showTyping = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {}
  messages.forEach(message => {
    const date = new Date(message.createdAt).toDateString()
    if (!groupedMessages[date]) {
      groupedMessages[date] = []
    }
    groupedMessages[date].push(message)
  })

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col h-full overflow-y-auto p-4">
      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onLoadMore}
            isLoading={isLoading}
          >
            Load More
          </Button>
        </div>
      )}

      {/* Messages grouped by date */}
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          {/* Date Header */}
          <div className="flex justify-center my-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {formatDateHeader(date)}
            </span>
          </div>

          {/* Messages */}
          {dateMessages.map((message, index) => {
            const isOwnMessage = message.senderId === currentUserId
            const showAvatar = !isOwnMessage && (
              index === 0 || 
              dateMessages[index - 1]?.senderId !== message.senderId
            )

            return (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={isOwnMessage}
                showAvatar={showAvatar}
              />
            )
          })}
        </div>
      ))}

      {/* Typing Indicator */}
      <TypingIndicator isVisible={showTyping} />

      {/* Scroll Anchor */}
      <div ref={messagesEndRef} />
    </div>
  )
}