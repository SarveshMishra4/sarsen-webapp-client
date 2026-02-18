'use client'

import { Tooltip } from '@/components/ui/Tooltip'
import { Badge } from '@/components/ui/Badge'

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    direction: 'up' | 'down' | 'stable'
    color: string
  }
  footer?: string
  loading?: boolean
  onClick?: () => void
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  footer,
  loading = false,
  onClick
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    )
  }

  return (
    <div
      className={`
        bg-white rounded-lg shadow-sm p-6
        ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {description && (
            <Tooltip content={description}>
              <span className="text-gray-300 cursor-help">ⓘ</span>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {trend && (
            <div className={`flex items-center mt-1 text-sm ${trend.color}`}>
              <span>
                {trend.direction === 'up' && '↑'}
                {trend.direction === 'down' && '↓'}
                {trend.direction === 'stable' && '→'}
              </span>
              <span className="ml-1 font-medium">{Math.abs(trend.value)}%</span>
              <span className="ml-1 text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
        {footer && (
          <Badge variant="default" size="sm">
            {footer}
          </Badge>
        )}
      </div>
    </div>
  )
}