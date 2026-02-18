'use client'

import { MilestoneTiming } from '@/types/progress.types'
import { useProgress } from '@/hooks/useProgress'
import { ALLOWED_MILESTONES } from '@/utils/constants'

interface MilestoneTimelineProps {
  timeline: MilestoneTiming[]
  currentProgress?: number
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  timeline,
  currentProgress
}) => {
  const { formatTime, getLabel, getColor } = useProgress()

  // Create a map of reached milestones
  const reachedMap = new Map(
    timeline.map(item => [item.value, item])
  )

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-6">Milestone Timeline</h3>

      <div className="space-y-4">
        {ALLOWED_MILESTONES.map((value) => {
          const reached = reachedMap.get(value)
          const isReached = !!reached
          const isCurrent = currentProgress === value

          return (
            <div key={value} className="relative">
              <div className="flex items-center">
                {/* Milestone marker */}
                <div className="relative flex items-center justify-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isReached 
                      ? getColor(value) 
                      : 'bg-gray-200'
                    }
                    ${isCurrent ? 'ring-4 ring-primary-200' : ''}
                  `}>
                    {isReached ? (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-xs font-medium text-gray-600">{value}%</span>
                    )}
                  </div>

                  {/* Connecting line */}
                  {value < 100 && (
                    <div className={`
                      w-12 h-0.5 ml-2
                      ${isReached ? 'bg-primary-600' : 'bg-gray-200'}
                    `} />
                  )}
                </div>

                {/* Milestone info */}
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">
                      {getLabel(value)}
                    </span>
                    {reached && (
                      <span className="text-sm text-gray-500">
                        {new Date(reached.reachedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {reached?.timeSpent && (
                    <p className="text-sm text-gray-500">
                      Time spent: {formatTime(reached.timeSpent)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}