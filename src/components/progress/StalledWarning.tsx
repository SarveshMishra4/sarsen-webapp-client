'use client'

import Link from 'next/link'
import { StalledEngagement } from '@/types/progress.types'
import { Button } from '@/components/ui/Button'

interface StalledWarningProps {
  engagement: StalledEngagement
  onDismiss?: () => void
}

export const StalledWarning: React.FC<StalledWarningProps> = ({
  engagement,
  onDismiss
}) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-sm font-medium text-yellow-800">
              Stalled Engagement Alert
            </h3>
          </div>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              <span className="font-medium">{engagement.serviceName}</span> has had no progress updates for{' '}
              <span className="font-medium">{engagement.daysSinceLastUpdate} days</span>.
              Current progress: {engagement.currentProgress}%
            </p>
            {engagement.clientName && (
              <p className="mt-1">
                Client: {engagement.clientName} ({engagement.clientEmail})
              </p>
            )}
            <p className="mt-1 text-xs">
              Stalled since: {new Date(engagement.stalledSince).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 flex space-x-2">
          <Link href={`/admin/protected/engagements/${engagement.id}`}>
            <Button variant="outline" size="sm">
              View Engagement
            </Button>
          </Link>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}