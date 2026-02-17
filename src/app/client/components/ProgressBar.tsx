'use client'

import { MilestoneValue } from '@/types/blueprint.types'

interface ProgressBarProps {
  progress: MilestoneValue
  milestones?: MilestoneValue[]
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  milestones = [],
  showLabel = true,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const getMilestonePosition = (value: MilestoneValue): string => {
    return `${value}%`
  }

  const getMilestoneColor = (value: MilestoneValue): string => {
    return value <= progress ? 'bg-primary-600' : 'bg-gray-300'
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-primary-600">{progress}%</span>
        </div>
      )}
      
      <div className="relative">
        <div className={`w-full ${sizeClasses[size]} bg-gray-200 rounded-full overflow-hidden`}>
          <div
            className="h-full bg-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {milestones.length > 0 && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {milestones.map((milestone) => (
              <div
                key={milestone}
                className={`absolute top-0 w-0.5 h-full ${getMilestoneColor(milestone)}`}
                style={{ left: getMilestonePosition(milestone) }}
              />
            ))}
          </div>
        )}
      </div>

      {milestones.length > 0 && (
        <div className="flex justify-between mt-1">
          {milestones.map((milestone) => (
            <div
              key={milestone}
              className="text-xs text-gray-500"
              style={{ marginLeft: milestone === 10 ? '0' : undefined }}
            >
              {milestone}%
            </div>
          ))}
        </div>
      )}
    </div>
  )
}