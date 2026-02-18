'use client'

import { useEffect, useState } from 'react'
import { useProgress } from '@/hooks/useProgress'
import { useEngagement } from '@/hooks/useEngagement'
import { ProgressStats } from '../components/progress/ProgressStats'
import { ProgressHistory } from '../components/progress/ProgressHistory'
import { MilestoneTimeline } from '../components/progress/MilestoneTimeline'
import { ProgressChart } from '@/components/progress/ProgressChart'
import { StalledIndicator } from '../components/progress/StalledIndicator'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function AnalyticsPage() {
  const [selectedEngagementId, setSelectedEngagementId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  
  const {
    history,
    timeline,
    analytics,
    stalledEngagements,
    isLoading,
    fetchProgressHistory,
    fetchProgressTimeline,
    fetchProgressAnalytics,
    fetchStalledEngagements,
    loadAllProgressData
  } = useProgress({ engagementId: selectedEngagementId })

  const { engagements, fetchMyEngagements } = useEngagement()

  useEffect(() => {
    fetchMyEngagements()
    fetchStalledEngagements()
  }, [fetchMyEngagements, fetchStalledEngagements])

  useEffect(() => {
    if (selectedEngagementId) {
      loadAllProgressData(selectedEngagementId)
    }
  }, [selectedEngagementId, loadAllProgressData])

  const filteredEngagements = engagements.filter(eng =>
    eng.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eng.engagementId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Progress Analytics</h1>
        <p className="text-gray-600 mt-1">
          Track engagement progress, milestone timelines, and stalled engagements
        </p>
      </div>

      {/* Stalled Engagements Alert */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Stalled Engagements</h2>
        </CardHeader>
        <CardBody>
          <StalledIndicator stalled={stalledEngagements} isLoading={isLoading} />
        </CardBody>
      </Card>

      {/* Engagement Selector */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Select Engagement</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              placeholder="Search engagements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
              {filteredEngagements.map((eng) => (
                <button
                  key={eng.id}
                  onClick={() => setSelectedEngagementId(eng.id)}
                  className={`
                    text-left p-4 rounded-lg border transition-all
                    ${selectedEngagementId === eng.id
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <p className="font-medium text-gray-900">{eng.serviceName}</p>
                  <p className="text-sm text-gray-500 mt-1">ID: {eng.engagementId}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Progress: {eng.currentProgress}%
                  </p>
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Analytics Dashboard */}
      {selectedEngagementId && analytics && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <ProgressStats analytics={analytics} />

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Progress Over Time</h2>
            </CardHeader>
            <CardBody>
              <ProgressChart timeline={timeline} height={300} />
            </CardBody>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Milestone Timeline */}
            <MilestoneTimeline
              timeline={timeline}
              currentProgress={analytics.currentProgress}
            />

            {/* Progress History */}
            <ProgressHistory
              history={history}
              onRefresh={() => loadAllProgressData(selectedEngagementId)}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {selectedEngagementId && !analytics && !isLoading && (
        <Card>
          <CardBody>
            <p className="text-gray-500 text-center py-8">
              No progress data available for this engagement
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  )
}