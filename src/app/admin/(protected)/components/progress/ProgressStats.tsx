'use client'

import { ProgressAnalytics } from '@/types/progress.types'
import { StatsCards } from '@/components/progress/StatsCards'
import { useProgress } from '@/hooks/useProgress'

interface ProgressStatsProps {
  analytics: ProgressAnalytics
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({ analytics }) => {
  const { getNextMilestone } = useProgress()

  const nextMilestone = getNextMilestone(analytics.currentProgress)

  return (
    <div className="space-y-6">
      <StatsCards analytics={analytics} />

      {/* Next Milestone Suggestion */}
      {!analytics.isCompleted && nextMilestone && (
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-primary-800">
                Suggested Next Milestone
              </h3>
              <p className="text-sm text-primary-700 mt-1">
                Consider moving to {nextMilestone}% - {useProgress().getLabel(nextMilestone)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}