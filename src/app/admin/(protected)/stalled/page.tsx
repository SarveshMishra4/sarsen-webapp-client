'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import { StalledEngagement } from '@/types/progress.types'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function StalledEngagementsPage() {
  const [daysThreshold, setDaysThreshold] = useState(7)
  const [searchTerm, setSearchTerm] = useState('')
  
  const {
    stalledEngagements,
    isLoading,
    fetchStalledEngagements
  } = useProgress()

  useEffect(() => {
    fetchStalledEngagements(daysThreshold)
  }, [fetchStalledEngagements, daysThreshold])

  const filteredStalled = stalledEngagements.filter(eng =>
    eng.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eng.engagementId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eng.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDismiss = (id: string) => {
    // In a real app, you might mark it as reviewed or ignore
    console.log('Dismissed:', id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stalled Engagements</h1>
        <p className="text-gray-600 mt-1">
          Engagements with no progress updates for the specified period
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Days Threshold
              </label>
              <select
                value={daysThreshold}
                onChange={(e) => setDaysThreshold(Number(e.target.value))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <Input
                placeholder="Search by service, ID, or client email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Stats Summary */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Stalled</p>
              <p className="text-2xl font-bold text-gray-900">{stalledEngagements.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Days Stalled</p>
              <p className="text-2xl font-bold text-gray-900">
                {stalledEngagements.length > 0
                  ? Math.round(stalledEngagements.reduce((sum, e) => sum + e.daysSinceLastUpdate, 0) / stalledEngagements.length)
                  : 0
                } days
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Threshold</p>
              <p className="text-2xl font-bold text-gray-900">{daysThreshold} days</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Stalled Engagements List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      ) : filteredStalled.length === 0 ? (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No stalled engagements</h3>
              <p className="mt-1 text-sm text-gray-500">
                All engagements have been updated within the last {daysThreshold} days.
              </p>
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredStalled.map((engagement) => (
            <Card key={engagement.id}>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {engagement.serviceName}
                      </h3>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Stalled
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      ID: {engagement.engagementId}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Current Progress</p>
                        <p className="font-medium">{engagement.currentProgress}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Update</p>
                        <p className="font-medium">
                          {new Date(engagement.lastProgressUpdate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Days Since</p>
                        <p className="font-medium text-red-600">{engagement.daysSinceLastUpdate} days</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Stalled Since</p>
                        <p className="font-medium">
                          {new Date(engagement.stalledSince).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {engagement.clientName && (
                      <p className="mt-3 text-sm text-gray-500">
                        Client: {engagement.clientName} ({engagement.clientEmail})
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Link href={`/admin/protected/engagements/${engagement.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <button
                      onClick={() => handleDismiss(engagement.id)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}