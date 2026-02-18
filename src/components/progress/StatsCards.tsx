'use client'

import { ProgressAnalytics } from '@/types/progress.types'
import { useProgress } from '@/hooks/useProgress'
import { Card, CardBody } from '@/components/ui/Card'

interface StatsCardsProps {
  analytics: ProgressAnalytics
}

export const StatsCards: React.FC<StatsCardsProps> = ({ analytics }) => {
  const { formatTime, getLabel } = useProgress()

  const stats = [
    {
      label: 'Current Progress',
      value: getLabel(analytics.currentProgress),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Total Updates',
      value: analytics.totalUpdates,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Started',
      value: new Date(analytics.startDate).toLocaleDateString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      label: analytics.isCompleted ? 'Completed' : 'Avg Time/Milestone',
      value: analytics.isCompleted 
        ? (analytics.completedAt ? new Date(analytics.completedAt).toLocaleDateString() : 'N/A')
        : formatTime(analytics.averageTimePerMilestone),
      icon: analytics.isCompleted ? (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: analytics.isCompleted ? 'bg-green-50' : 'bg-orange-50',
      textColor: analytics.isCompleted ? 'text-green-600' : 'text-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardBody>
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-lg ${stat.bgColor} ${stat.textColor}`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}