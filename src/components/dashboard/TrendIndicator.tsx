'use client'

import { getTrendDirection, getTrendColor } from '@/utils/dashboard.utils'

interface TrendIndicatorProps {
  value: number
  previousValue?: number
  percentage?: number
  invert?: boolean
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  showValue?: boolean
  className?: string
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  value,
  previousValue,
  percentage,
  invert = false,
  size = 'md',
  showIcon = true,
  showValue = true,
  className = ''
}) => {
  // Calculate percentage if not provided but previous value is
  const calculatedPercentage = percentage !== undefined 
    ? percentage 
    : previousValue !== undefined
      ? Number(((value - previousValue) / previousValue * 100).toFixed(1))
      : 0

  const direction = getTrendDirection(calculatedPercentage)
  const color = getTrendColor(calculatedPercentage, invert)

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const getIcon = () => {
    if (direction === 'up') {
      return (
        <svg className={iconSizes[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      )
    }
    if (direction === 'down') {
      return (
        <svg className={iconSizes[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      )
    }
    return (
      <svg className={iconSizes[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
      </svg>
    )
  }

  if (!showIcon && !showValue) return null

  return (
    <div className={`flex items-center space-x-1 ${sizeClasses[size]} ${color} ${className}`}>
      {showIcon && getIcon()}
      {showValue && (
        <span className="font-medium">
          {calculatedPercentage > 0 ? '+' : ''}{calculatedPercentage}%
        </span>
      )}
    </div>
  )
}