import { MilestoneValue } from './blueprint.types'

export type UpdatedByType = 'admin' | 'system'

export interface ProgressHistoryEntry {
  id: string
  engagementId: string
  updatedBy: string
  updatedByType: UpdatedByType
  fromValue: MilestoneValue
  toValue: MilestoneValue
  timeAtMilestone?: number // time spent at previous milestone in seconds
  note?: string
  isAutomatic: boolean
  previousState?: any // snapshot of engagement before change
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface MilestoneTiming {
  value: MilestoneValue
  label: string
  reachedAt: string
  timeSpent?: number // time spent at this milestone in seconds
}

export interface ProgressAnalytics {
  currentProgress: MilestoneValue
  isCompleted: boolean
  completedAt?: string
  startDate: string
  totalDuration?: number // total duration in seconds (if completed)
  totalUpdates: number
  averageTimePerMilestone?: number // average time per milestone in seconds
  timeline: MilestoneTiming[]
}

export interface ProgressUpdateRequest {
  engagementId: string
  progress: MilestoneValue
  note?: string
}

export interface ProgressUpdateResponse {
  engagement: any // Engagement data
}

export interface ProgressHistoryResponse {
  history: ProgressHistoryEntry[]
  count: number
}

export interface ProgressTimelineResponse {
  timeline: MilestoneTiming[]
}

export interface ProgressAnalyticsResponse {
  analytics: ProgressAnalytics
}

export interface StalledEngagement {
  id: string
  engagementId: string
  serviceName: string
  currentProgress: MilestoneValue
  lastProgressUpdate: string
  daysSinceLastUpdate: number
  stalledSince: string
  clientName?: string
  clientEmail?: string
}

export interface StalledEngagementsResponse {
  stalled: StalledEngagement[]
  count: number
}

export interface ProgressValidationResult {
  isValid: boolean
  message?: string
  allowedTransitions?: MilestoneValue[]
}

export interface ProgressSummary {
  engagementId: string
  currentProgress: MilestoneValue
  lastUpdated: string
  nextMilestone?: MilestoneValue
  daysAtCurrentMilestone: number
}

// For chart data
export interface ChartDataPoint {
  date: string
  value: MilestoneValue
  label: string
}

export interface MilestoneCategory {
  name: 'EARLY' | 'MID' | 'LATE' | 'COMPLETION'
  milestones: MilestoneValue[]
  color: string
}