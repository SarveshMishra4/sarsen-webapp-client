'use client'

import { EngagementMilestone } from '@/types/engagement.types'

interface MilestoneTimelineProps {
  milestones: EngagementMilestone[]
  currentProgress: number
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
  currentProgress
}) => {
  const sortedMilestones = [...milestones].sort((a, b) => a.value - b.value)

  const getMilestoneStatus = (value: number) => {
    if (value <= currentProgress) return 'completed'
    return 'pending'
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not yet'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedMilestones.map((milestone, index) => {
          const status = getMilestoneStatus(milestone.value)
          const isLast = index === sortedMilestones.length - 1

          return (
            <li key={milestone.value}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`
                      h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                      ${status === 'completed' 
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                      }
                    `}>
                      {status === 'completed' ? (
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="h-2 w-2 bg-white rounded-full" />
                      )}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {milestone.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {milestone.value}%
                      </p>
                    </div>
                    {milestone.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {milestone.description}
                      </p>
                    )}
                    {milestone.completedAt && (
                      <p className="mt-1 text-xs text-gray-400">
                        Completed on {formatDate(milestone.completedAt)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}