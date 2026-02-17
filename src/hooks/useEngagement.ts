'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { engagementService } from '@/services/engagement.service'
import { useToast } from './useToast'
import { 
  EngagementData, 
  EngagementSummary,
  ProgressResponse,
  EngagementStatus 
} from '@/types/engagement.types'
import { MilestoneValue } from '@/types/blueprint.types'

export const useEngagement = () => {
  const [engagements, setEngagements] = useState<EngagementSummary[]>([])
  const [engagement, setEngagement] = useState<EngagementData | null>(null)
  const [progress, setProgress] = useState<ProgressResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const { success, error } = useToast()
  const router = useRouter()

  // Client: Fetch my engagements
  const fetchMyEngagements = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await engagementService.getMyEngagements()
      if (response.success && response.data) {
        setEngagements(response.data.engagements)
        setTotalCount(response.data.count)
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch engagements')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Client: Fetch single engagement
  const fetchEngagementById = useCallback(async (engagementId: string) => {
    setIsLoading(true)
    try {
      const response = await engagementService.getEngagementById(engagementId)
      if (response.success && response.data) {
        setEngagement(response.data.engagement)
        return response.data.engagement
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch engagement')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Client: Fetch engagement progress
  const fetchEngagementProgress = useCallback(async (engagementId: string) => {
    setIsLoading(true)
    try {
      const response = await engagementService.getEngagementProgress(engagementId)
      if (response.success && response.data) {
        setProgress(response.data)
        return response.data
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch progress')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Helper: Get status badge color
  const getStatusColor = (status: EngagementStatus): string => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'feedback-required':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Helper: Get status label
  const getStatusLabel = (engagement: EngagementSummary): EngagementStatus => {
    if (engagement.isCompleted) return 'completed'
    if (!engagement.messagingAllowed) return 'feedback-required'
    return 'active'
  }

  // Helper: Calculate days since start
  const getDaysSinceStart = (startDate: string): number => {
    const start = new Date(startDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Helper: Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return {
    // State
    engagements,
    engagement,
    progress,
    isLoading,
    totalCount,

    // Client operations
    fetchMyEngagements,
    fetchEngagementById,
    fetchEngagementProgress,

    // Helpers
    getStatusColor,
    getStatusLabel,
    getDaysSinceStart,
    formatDate
  }
}