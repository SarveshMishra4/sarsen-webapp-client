'use client'

interface TypingIndicatorProps {
  isVisible?: boolean
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  isVisible = true
}) => {
  if (!isVisible) return null

  return (
    <div className="flex items-center space-x-1 px-4 py-2">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
    </div>
  )
}