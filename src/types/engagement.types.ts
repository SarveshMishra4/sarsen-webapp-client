import { MilestoneValue } from './blueprint.types'

export interface EngagementMilestone {
  value: MilestoneValue
  label: string
  description?: string
  completedAt?: string
}

export interface EngagementSection {
  id: string
  type: 'milestones' | 'resources' | 'questionnaires' | 'instructions' | 'custom'
  title: string
  description?: string
  order: number
  content?: any
  isVisible: boolean
}

export interface EngagementResource {
  id: string
  type: 'pdf' | 'doc' | 'excel' | 'ppt' | 'link' | 'video' | 'image' | 'other'
  title: string
  description?: string
  url?: string
  fileKey?: string
  fileName?: string
  fileSize?: number
  mimeType?: string
  icon?: string
  thumbnailUrl?: string
  downloadCount: number
  viewCount: number
  createdAt: string
}

export interface EngagementProgress {
  currentProgress: MilestoneValue
  isCompleted: boolean
  startDate: string
  completedAt?: string
  timeline: Array<{
    value: MilestoneValue
    label: string
    reachedAt: string
    timeSpent?: number
  }>
}

export interface EngagementData {
  _id?: string   // 👈 add this
  id: string
  engagementId: string
  serviceCode: string
  serviceName: string
  userId: string
  milestones: EngagementMilestone[]
  sections: EngagementSection[]
  resources: EngagementResource[]
  currentProgress: MilestoneValue
  isActive: boolean
  isCompleted: boolean
  messagingAllowed: boolean
  messageCount: number
  resourceCount: number
  questionnaireCount: number
  startDate: string
  expectedEndDate?: string
  actualEndDate?: string
  createdAt: string
  updatedAt: string
}

export interface EngagementSummary {
  id: string
  engagementId: string
  serviceCode: string
  serviceName: string
  currentProgress: MilestoneValue
  isCompleted: boolean
  isActive: boolean
  messagingAllowed: boolean
  messageCount: number
  resourceCount: number
  questionnaireCount: number
  startDate: string
  updatedAt: string
}

export interface EngagementListResponse {
  engagements: EngagementSummary[]
  count: number
}

export interface EngagementResponse {
  engagement: EngagementData
}

export interface ProgressResponse {
  currentProgress: MilestoneValue
  isCompleted: boolean
  startDate: string
  completedAt?: string
  timeline: Array<{
    value: MilestoneValue
    label: string
    reachedAt: string
    timeSpent?: number
  }>
}

export interface EngagementFilters {
  page?: number
  limit?: number
  isActive?: boolean
  isCompleted?: boolean
  serviceCode?: string
}

export type EngagementStatus = 'active' | 'completed' | 'feedback-required'