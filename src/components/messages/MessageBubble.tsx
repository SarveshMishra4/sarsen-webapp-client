'use client'

import { Message } from '@/types/message.types'
import { Avatar } from '@/components/ui/Avatar'
import { format } from 'date-fns'

interface MessageBubbleProps {
  message: Message
  isOwnMessage: boolean
  showAvatar?: boolean
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  showAvatar = true
}) => {
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return format(date, 'MMM d, yyyy')
    }
  }

  const getAttachmentIcon = (type: string) => {
    const icons: Record<string, string> = {
      image: '🖼️',
      pdf: '📄',
      doc: '📝',
      excel: '📊',
      ppt: '📽️',
      link: '🔗',
      other: '📎'
    }
    return icons[type] || '📎'
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[70%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {showAvatar && !isOwnMessage && (
          <div className="flex-shrink-0 mr-3">
            <Avatar name={message.senderName} size="sm" />
          </div>
        )}

        {/* Message Content */}
        <div>
          {/* Sender Name & Time */}
          <div className={`flex items-center mb-1 text-xs text-gray-500 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            {!isOwnMessage && <span className="mr-2">{message.senderName}</span>}
            <span>{formatTime(message.createdAt)}</span>
          </div>

          {/* Message Bubble */}
          <div
            className={`
              rounded-lg px-4 py-2
              ${isOwnMessage 
                ? 'bg-primary-600 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }
            `}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center p-2 rounded text-sm
                      ${isOwnMessage 
                        ? 'bg-primary-700 hover:bg-primary-800' 
                        : 'bg-gray-200 hover:bg-gray-300'
                      }
                    `}
                  >
                    <span className="mr-2 text-lg">{getAttachmentIcon(attachment.type)}</span>
                    <span className="flex-1 truncate">{attachment.name}</span>
                    {attachment.size && (
                      <span className="text-xs ml-2 opacity-75">
                        {Math.round(attachment.size / 1024)} KB
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Read Receipt */}
          {isOwnMessage && message.isRead && message.readBy.length > 0 && (
            <div className="flex justify-end mt-1 text-xs text-gray-400">
              <span>Read</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}