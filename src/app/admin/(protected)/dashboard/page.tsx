'use client'

import { useState, useEffect } from 'react'
import { useDashboard } from '@/hooks/useDashboard'
import { useNotifications } from '@/hooks/useNotifications'
import { KpiCards } from '../components/dashboard/KpiCards'
import { EngagementChart } from '../components/dashboard/EngagementChart'
import { RevenueChart } from '../components/dashboard/RevenueChart'
import { TopServicesTable } from '../components/dashboard/TopServicesTable'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { DateRangePicker } from '../components/dashboard/DateRangePicker'
import { ExportButton } from '../components/dashboard/ExportButton'
import { NotificationBell } from '../components/dashboard/NotificationBell'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'
import { format } from 'date-fns'

export default function DashboardPage() {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [serviceCode, setServiceCode] = useState<string>()

  const {
    summary,
    metrics,
    trends,
    topPerformers,
    isLoading,
    isRefreshing,
    snapshotDate,
    isRealtime,
    fetchSummary,
    fetchFullDashboard,
    refreshDashboard
  } = useDashboard()

  const { unreadCount } = useNotifications()

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  const handleDateRangeApply = (newStartDate?: string, newEndDate?: string) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
    fetchFullDashboard({
      startDate: newStartDate,
      endDate: newEndDate,
      serviceCode
    })
  }

  const handleDateRangeReset = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    fetchFullDashboard({ serviceCode })
  }

  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    // In a real app, this would call an API to generate and download the file
    console.log(`Exporting as ${format}...`)
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {snapshotDate && (
            <span className="text-xs text-gray-400">
              Last updated: {format(new Date(snapshotDate), 'MMM d, h:mm a')}
              {!isRealtime && ' (cached)'}
            </span>
          )}
          <NotificationBell />
          <Button
            variant="outline"
            size="sm"
            onClick={refreshDashboard}
            isLoading={isRefreshing}
          >
            Refresh
          </Button>
          <ExportButton onExport={handleExport} disabled={isLoading} />
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-wrap items-center gap-4">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onApply={handleDateRangeApply}
              onReset={handleDateRangeReset}
            />
            <select
              value={serviceCode || ''}
              onChange={(e) => {
                const code = e.target.value || undefined
                setServiceCode(code)
                fetchFullDashboard({ startDate, endDate, serviceCode: code })
              }}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">All Services</option>
              <option value="SRV_FUND_001">Fundraising Strategy</option>
              <option value="SRV_PITCH_001">Pitch Deck Design</option>
              <option value="SRV_GTM_001">GTM Strategy</option>
            </select>
          </div>
        </CardBody>
      </Card>

      {/* KPI Cards */}
      <KpiCards
        summary={summary}
        metrics={metrics}
        isLoading={isLoading}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart trends={trends} isLoading={isLoading} />
        <RevenueChart trends={trends} isLoading={isLoading} />
      </div>

      {/* Top Performers */}
      <TopServicesTable
        topPerformers={topPerformers}
        isLoading={isLoading}
      />

      {/* Recent Activity */}
      <RecentActivity limit={5} />
    </div>
  )
}