'use client'

import { StalledEngagement } from '@/types/progress.types'
import { StalledWarning } from '@/components/progress/StalledWarning'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface StalledIndicatorProps {
  stalled: StalledEngagement[]
  onDismiss?: (id: string) => void
  isLoading?: boolean
}

export const StalledIndicator: React.FC<StalledIndicatorProps> = ({
  stalled,
  onDismiss,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (stalled.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No stalled engagements</h3>
        <p className="mt-1 text-sm text-gray-500">
          All active engagements have been updated recently.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Stalled Engagements ({stalled.length})
        </h3>
        <Link href="/admin/protected/stalled">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {stalled.slice(0, 3).map((engagement) => (
          <StalledWarning
            key={engagement.id}
            engagement={engagement}
            onDismiss={onDismiss ? () => onDismiss(engagement.id) : undefined}
          />
        ))}
      </div>

      {stalled.length > 3 && (
        <p className="text-sm text-gray-500 text-center">
          + {stalled.length - 3} more stalled engagements
        </p>
      )}
    </div>
  )
}