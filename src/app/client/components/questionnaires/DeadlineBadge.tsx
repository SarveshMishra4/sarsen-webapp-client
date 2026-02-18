'use client'

interface DeadlineBadgeProps {
  deadline?: string
  isOverdue?: boolean
}

export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ deadline, isOverdue }) => {
  if (!deadline) return null

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`
    } else if (diffDays === 0) {
      return 'Due today'
    } else if (diffDays === 1) {
      return 'Due tomorrow'
    } else {
      return `${diffDays} days left`
    }
  }

  const getBadgeColor = () => {
    if (isOverdue) return 'bg-red-100 text-red-800'
    
    const date = new Date(deadline)
    const today = new Date()
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 2) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor()}`}>
      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {formatDeadline(deadline)}
    </span>
  )
}