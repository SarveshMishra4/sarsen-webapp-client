'use client'

import { ProgressHistoryEntry } from '@/types/progress.types'
import { HistoryTimeline } from '@/components/progress/HistoryTimeline'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

interface ProgressHistoryProps {
  history: ProgressHistoryEntry[]
  onRefresh?: () => void
  isLoading?: boolean
}

export const ProgressHistory: React.FC<ProgressHistoryProps> = ({
  history,
  onRefresh,
  isLoading = false
}) => {
  const [showAll, setShowAll] = useState(false)

  const displayedHistory = showAll ? history : history.slice(0, 10)

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Progress History</h3>
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh}>
            Refresh
          </Button>
        )}
      </div>

      <HistoryTimeline history={displayedHistory} />

      {history.length > 10 && !showAll && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Show All ({history.length} entries)
          </Button>
        </div>
      )}
    </div>
  )
}