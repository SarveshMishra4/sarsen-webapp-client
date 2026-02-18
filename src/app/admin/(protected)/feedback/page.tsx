'use client'

import { useEffect, useState } from 'react'
import { useFeedback } from '@/hooks/useFeedback'
import { FeedbackTable } from '../components/feedback/FeedbackTable'
import { FeedbackStats } from '@/components/feedback/FeedbackStats'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'

export default function AdminFeedbackPage() {
  const [filterRating, setFilterRating] = useState<string>('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showHighlighted, setShowHighlighted] = useState<boolean | undefined>()
  const [page, setPage] = useState(1)

  const {
    feedbackList,
    stats,
    isLoading,
    totalPages,
    fetchAllFeedback,
    fetchFeedbackStats,
    toggleHighlight
  } = useFeedback()

  useEffect(() => {
    fetchAllFeedback({
      rating: filterRating ? Number(filterRating) as any : undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      isHighlighted: showHighlighted,
      page,
      limit: 10
    })
  }, [fetchAllFeedback, filterRating, startDate, endDate, showHighlighted, page])

  useEffect(() => {
    fetchFeedbackStats(startDate || undefined, endDate || undefined)
  }, [fetchFeedbackStats, startDate, endDate])

  const handleToggleHighlight = async (id: string, isHighlighted: boolean) => {
    await toggleHighlight(id, isHighlighted)
  }

  const handleApplyFilters = () => {
    setPage(1)
    // Filters are applied via useEffect
  }

  const handleResetFilters = () => {
    setFilterRating('')
    setStartDate('')
    setEndDate('')
    setShowHighlighted(undefined)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Client Feedback</h1>
        <p className="text-gray-600 mt-1">
          View and manage feedback from completed engagements
        </p>
      </div>

      {/* Stats Section */}
      {stats && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Feedback Analytics</h2>
          </CardHeader>
          <CardBody>
            <FeedbackStats stats={stats} />
          </CardBody>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Filters</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Testimonials
              </label>
              <select
                value={showHighlighted === undefined ? '' : String(showHighlighted)}
                onChange={(e) => {
                  const value = e.target.value
                  setShowHighlighted(value === '' ? undefined : value === 'true')
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">All</option>
                <option value="true">Featured Only</option>
                <option value="false">Not Featured</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Feedback Table */}
      <FeedbackTable
        feedback={feedbackList}
        onToggleHighlight={handleToggleHighlight}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}