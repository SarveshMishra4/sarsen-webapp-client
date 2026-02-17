'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { AttachmentButton } from './AttachmentButton'

interface MessageComposerProps {
  onSendMessage: (content: string, attachments?: any[]) => void
  isDisabled?: boolean
  placeholder?: string
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
  isDisabled = false,
  placeholder = 'Type your message...'
}) => {
  const [message, setMessage] = useState('')
  const [attachments, setAttachments] = useState<any[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments)
      setMessage('')
      setAttachments([])
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleAttachmentSelect = (file: File) => {
    // In a real app, you'd upload the file and get back a URL
    // For now, we'll create a mock attachment
    const attachment = {
      id: `temp-${Date.now()}`,
      type: file.type.startsWith('image/') ? 'image' : 'other',
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      mimeType: file.type
    }
    setAttachments(prev => [...prev, attachment])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={`border-t bg-white p-4 ${isFocused ? 'shadow-lg' : ''}`}>
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm"
            >
              <span className="mr-2 text-lg">
                {attachment.type === 'image' ? '🖼️' : '📎'}
              </span>
              <span className="max-w-[150px] truncate">{attachment.name}</span>
              <button
                onClick={() => removeAttachment(index)}
                className="ml-2 text-gray-500 hover:text-red-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end space-x-2">
        <AttachmentButton onSelect={handleAttachmentSelect} disabled={isDisabled} />
        
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isDisabled}
            rows={1}
            className="w-full border-0 focus:ring-0 resize-none max-h-32 overflow-y-auto p-2 text-gray-900 placeholder-gray-400"
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={isDisabled || (!message.trim() && attachments.length === 0)}
          size="sm"
          variant="primary"
          className="mb-1"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Button>
      </div>
    </div>
  )
}