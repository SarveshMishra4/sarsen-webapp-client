'use client'

import { useState, useCallback, useEffect } from 'react'
import { dashboardService } from '@/services/dashboard.service'
import { useToast } from './useToast'
import {
  DashboardResponse,
  DashboardMetrics,
  DashboardTrends,
  DashboardTopPerformers,
  DashboardSummary,
  DashboardFilters
} from '@/types/dashboard.types'
import {
  formatCurrency,
  formatCompactNumber,
  calculatePercentChange,
  getTrendDirection,
  getTrendColor
} from '@/utils/dashboard.utils'

export const useDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [trends, setTrends] = useState<DashboardTrends | null>(null)
  const [topPerformers, setTopPerformers] = useState<DashboardTopPerformers | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [snapshotDate, setSnapshotDate] = useState<string | null>(null)
  const [isRealtime, setIsRealtime] = useState(false)

  const { success, error } = useToast()

  // Fetch dashboard summary (lightweight)
  const fetchSummary = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await dashboardService.getDashboardSummary()
      if (response.success && response.data) {
        setSummary(response.data.summary || null)
        setSnapshotDate(response.data.snapshotDate)
        setIsRealtime(response.data.realtime || false)
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch dashboard summary')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Fetch cached dashboard
  const fetchCachedDashboard = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await dashboardService.getCachedDashboard()
      if (response.success && response.data) {
        setMetrics(response.data.metrics || null)
        setTrends(response.data.trends || null)
        setTopPerformers(response.data.topPerformers || null)
        setSnapshotDate(response.data.snapshotDate)
        setIsRealtime(response.data.realtime || false)
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch cached dashboard')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Fetch full dashboard with filters
  const fetchFullDashboard = useCallback(async (filters?: DashboardFilters) => {
    setIsLoading(true)
    try {
      const response = await dashboardService.getFullDashboard(filters)
      if (response.success && response.data) {
        setMetrics(response.data.metrics || null)
        setTrends(response.data.trends || null)
        setTopPerformers(response.data.topPerformers || null)
        setSnapshotDate(response.data.snapshotDate)
        setIsRealtime(response.data.realtime || false)
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch dashboard data')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Refresh dashboard cache
  const refreshDashboard = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const response = await dashboardService.refreshDashboard()
      if (response.success) {
        success('Dashboard refreshed successfully')
        // Refresh data
        await fetchCachedDashboard()
      }
    } catch (err: any) {
      error(err.message || 'Failed to refresh dashboard')
    } finally {
      setIsRefreshing(false)
    }
  }, [success, error, fetchCachedDashboard])

  // Load initial data
  useEffect(() => {
    fetchCachedDashboard()
  }, [fetchCachedDashboard])

  // Helper: Format currency
  const formatCurrencyValue = useCallback((value: number): string => {
    return formatCurrency(value)
  }, [])

  // Helper: Format compact number
  const formatNumber = useCallback((value: number): string => {
    return formatCompactNumber(value)
  }, [])

  // Helper: Calculate percentage change
  const getPercentChange = useCallback((current: number, previous: number): number => {
    return calculatePercentChange(current, previous)
  }, [])

  // Helper: Get trend direction
  const getTrend = useCallback((change: number): 'up' | 'down' | 'stable' => {
    return getTrendDirection(change)
  }, [])

  // Helper: Get trend color
  const getChangeColor = useCallback((change: number, invert: boolean = false): string => {
    return getTrendColor(change, invert)
  }, [])

  return {
    // State
    summary,
    metrics,
    trends,
    topPerformers,
    isLoading,
    isRefreshing,
    snapshotDate,
    isRealtime,

    // Actions
    fetchSummary,
    fetchCachedDashboard,
    fetchFullDashboard,
    refreshDashboard,

    // Helpers
    formatCurrency: formatCurrencyValue,
    formatNumber,
    getPercentChange,
    getTrend,
    getChangeColor
  }
}