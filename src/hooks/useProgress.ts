'use client'

import { useState, useCallback } from 'react'
import { progressService } from '@/services/progress.service'
import { useToast } from './useToast'
import {
    ProgressHistoryEntry,
    ProgressAnalytics,
    MilestoneTiming,
    StalledEngagement,
    ProgressUpdateRequest,
} from '@/types/progress.types'
import { MilestoneValue } from '@/types/blueprint.types'  // FIX: Import from correct location
import {
    validateProgressTransition,
    buildMilestoneTimeline,
    calculateAverageTimePerMilestone,
    formatDuration,
    getMilestoneLabel,
    getMilestoneColor,
    getNextRecommendedMilestone,
    isStalled
} from '@/utils/progress.utils'
import { ALLOWED_MILESTONES } from '@/utils/constants'

interface UseProgressProps {
    engagementId?: string
}

export const useProgress = ({ engagementId }: UseProgressProps = {}) => {
    const [history, setHistory] = useState<ProgressHistoryEntry[]>([])
    const [timeline, setTimeline] = useState<MilestoneTiming[]>([])
    const [analytics, setAnalytics] = useState<ProgressAnalytics | null>(null)
    const [stalledEngagements, setStalledEngagements] = useState<StalledEngagement[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(0)

    const { success, error } = useToast()

    // Fetch progress history
    const fetchProgressHistory = useCallback(async (id: string = engagementId || '') => {
        if (!id) return

        setIsLoading(true)
        try {
            const response = await progressService.getProgressHistory(id)
            if (response.success && response.data) {
                setHistory(response.data.history)
                setTotalCount(response.data.count)
            }
        } catch (err: any) {
            error(err.message || 'Failed to fetch progress history')
        } finally {
            setIsLoading(false)
        }
    }, [engagementId, error])

    // Fetch progress timeline
    const fetchProgressTimeline = useCallback(async (id: string = engagementId || '') => {
        if (!id) return

        setIsLoading(true)
        try {
            const response = await progressService.getProgressTimeline(id)
            if (response.success && response.data) {
                setTimeline(response.data.timeline)
            }
        } catch (err: any) {
            error(err.message || 'Failed to fetch progress timeline')
        } finally {
            setIsLoading(false)
        }
    }, [engagementId, error])

    // Fetch progress analytics
    const fetchProgressAnalytics = useCallback(async (id: string = engagementId || '') => {
        if (!id) return

        setIsLoading(true)
        try {
            const response = await progressService.getProgressAnalytics(id)
            if (response.success && response.data) {
                setAnalytics(response.data.analytics)
            }
        } catch (err: any) {
            error(err.message || 'Failed to fetch progress analytics')
        } finally {
            setIsLoading(false)
        }
    }, [engagementId, error])

    // Fetch stalled engagements
    const fetchStalledEngagements = useCallback(async (days: number = 7) => {
        setIsLoading(true)
        try {
            const response = await progressService.getStalledEngagements(days)
            if (response.success && response.data) {
                setStalledEngagements(response.data.stalled)
                setTotalCount(response.data.count)
            }
        } catch (err: any) {
            error(err.message || 'Failed to fetch stalled engagements')
        } finally {
            setIsLoading(false)
        }
    }, [error])

    // Update progress
    const updateProgress = useCallback(async (
        engagementId: string,
        progress: MilestoneValue,
        note?: string
    ) => {
        // Validate transition (if we have current progress)
        if (analytics?.currentProgress) {
            const validation = validateProgressTransition(analytics.currentProgress, progress)
            if (!validation.isValid) {
                error(validation.message || 'Invalid progress transition')
                return
            }
        }

        setIsLoading(true)
        try {
            const request: ProgressUpdateRequest = {
                engagementId,
                progress,
                note
            }

            const response = await progressService.updateProgress(request)
            if (response.success) {
                success('Progress updated successfully')
                // Refresh data
                await fetchProgressHistory(engagementId)
                await fetchProgressTimeline(engagementId)
                await fetchProgressAnalytics(engagementId)
            }
        } catch (err: any) {
            error(err.message || 'Failed to update progress')
        } finally {
            setIsLoading(false)
        }
    }, [analytics, success, error, fetchProgressHistory, fetchProgressTimeline, fetchProgressAnalytics])

    // Load all progress data for an engagement
    const loadAllProgressData = useCallback(async (id: string = engagementId || '') => {
        if (!id) return

        setIsLoading(true)
        try {
            await Promise.all([
                fetchProgressHistory(id),
                fetchProgressTimeline(id),
                fetchProgressAnalytics(id)
            ])
        } catch (err: any) {
            error(err.message || 'Failed to load progress data')
        } finally {
            setIsLoading(false)
        }
    }, [engagementId, fetchProgressHistory, fetchProgressTimeline, fetchProgressAnalytics, error])

    // Helper: Get available milestones for transition
    const getAvailableMilestones = useCallback((currentProgress?: MilestoneValue): MilestoneValue[] => {
        if (!currentProgress) return ALLOWED_MILESTONES

        return ALLOWED_MILESTONES.filter(m => {
            const validation = validateProgressTransition(currentProgress, m)
            return validation.isValid
        })
    }, [])

    // Helper: Format time duration
    const formatTime = useCallback((seconds?: number): string => {
        return formatDuration(seconds)
    }, [])

    // Helper: Get milestone label
    const getLabel = useCallback((value: MilestoneValue): string => {
        return getMilestoneLabel(value)
    }, [])

    // Helper: Get milestone color
    const getColor = useCallback((value: MilestoneValue): string => {
        return getMilestoneColor(value)
    }, [])

    // Helper: Get next recommended milestone
    const getNextMilestone = useCallback((currentProgress: MilestoneValue): MilestoneValue | undefined => {
        return getNextRecommendedMilestone(currentProgress)
    }, [])

    // Helper: Check if stalled
    const checkStalled = useCallback((
        lastUpdateDate: string,
        currentProgress: MilestoneValue,
        daysThreshold: number = 7
    ): boolean => {
        return isStalled(lastUpdateDate, currentProgress, daysThreshold)
    }, [])

    return {
        // State
        history,
        timeline,
        analytics,
        stalledEngagements,
        isLoading,
        totalCount,

        // Data fetching
        fetchProgressHistory,
        fetchProgressTimeline,
        fetchProgressAnalytics,
        fetchStalledEngagements,
        loadAllProgressData,

        // Actions
        updateProgress,

        // Helpers
        getAvailableMilestones,
        formatTime,
        getLabel,
        getColor,
        getNextMilestone,
        checkStalled
    }
}