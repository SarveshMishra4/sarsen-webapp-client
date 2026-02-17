'use client'

interface UnreadBadgeProps {
  count: number
  className?: string
}

export const UnreadBadge: React.FC<UnreadBadgeProps> = ({
  count,
  className = ''
}) => {
  if (count === 0) return null

  return (
    <span
      className={`
        inline-flex items-center justify-center
        min-w-[20px] h-5 px-1.5
        bg-red-500 text-white text-xs font-medium
        rounded-full
        ${className}
      `}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}