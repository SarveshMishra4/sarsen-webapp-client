'use client'

import { EngagementStatus } from '@/types/engagement.types'

interface StatusBadgeProps {
  status: EngagementStatus
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          className: 'bg-green-100 text-green-800'
        }
      case 'completed':
        return {
          label: 'Completed',
          className: 'bg-blue-100 text-blue-800'
        }
      case 'feedback-required':
        return {
          label: 'Feedback Required',
          className: 'bg-yellow-100 text-yellow-800'
        }
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-800'
        }
    }
  }

  const config = getStatusConfig()

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}>
      {config.label}
    </span>
  )
}