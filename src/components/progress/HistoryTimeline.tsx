'use client'

import { ProgressHistoryEntry } from '@/types/progress.types'
import { format } from 'date-fns'
import { useProgress } from '@/hooks/useProgress'
import { Avatar } from '@/components/ui/Avatar'

interface HistoryTimelineProps {
  history: ProgressHistoryEntry[]
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ history }) => {
  const { formatTime, getLabel } = useProgress()

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a')
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No progress history available
      </div>
    )
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {history.map((entry, index) => {
          const isLast = index === history.length - 1
          const isSystem = entry.updatedByType === 'system'

          return (
            <li key={entry.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  {/* Icon/Avatar */}
                  <div>
                    {isSystem ? (
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </span>
                    ) : (
                      <Avatar name="Admin" size="sm" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        Progress updated: {getLabel(entry.toValue)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(entry.createdAt)}
                      </p>
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                      <span className="font-medium">From:</span> {getLabel(entry.fromValue)} 
                      <span className="mx-2">→</span>
                      <span className="font-medium">To:</span> {getLabel(entry.toValue)}
                    </div>

                    {entry.timeAtMilestone && (
                      <p className="mt-1 text-xs text-gray-400">
                        Time spent at previous milestone: {formatTime(entry.timeAtMilestone)}
                      </p>
                    )}

                    {entry.note && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                        <span className="font-medium">Note:</span> {entry.note}
                      </div>
                    )}

                    {isSystem && (
                      <p className="mt-1 text-xs text-gray-400">
                        Automatic update
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