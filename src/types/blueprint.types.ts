import { MILESTONES, RESOURCE_TYPES, QUESTION_TYPES } from '@/utils/constants'

export type MilestoneValue = typeof MILESTONES[keyof typeof MILESTONES]

export interface BlueprintMilestone {
  value: MilestoneValue
  label: string
  description?: string
}

export interface BlueprintSection {
  id?: string
  type: 'milestones' | 'resources' | 'questionnaires' | 'instructions' | 'custom'
  title: string
  description?: string
  order: number
  content?: any
  isVisible: boolean
}

export interface BlueprintResource {
  id?: string
  type: typeof RESOURCE_TYPES[number]
  title: string
  description?: string
  url?: string
  fileKey?: string
  fileName?: string
  fileSize?: number
  mimeType?: string
  icon?: string
  thumbnailUrl?: string
  isPublic?: boolean
}

export interface BlueprintQuestion {
  id: string
  questionText: string
  questionType: typeof QUESTION_TYPES[number]
  options?: string[]
  required: boolean
  order: number
}

export interface BlueprintData {
  serviceCode: string
  serviceName: string
  serviceSlug: string
  milestones: BlueprintMilestone[]
  sections: BlueprintSection[]
  resources: BlueprintResource[]
  defaultProgress: MilestoneValue
  messagingEnabledByDefault: boolean
  isActive: boolean
  version: number
  createdAt?: string
  updatedAt?: string
  createdBy?: {
    id: string
    email: string
  }
}

// FIX: Single definition of BlueprintFormData with MilestoneValue
export interface BlueprintFormData {
  serviceCode: string
  serviceName: string
  serviceSlug: string
  defaultProgress: MilestoneValue  // Now using the specific type
  messagingEnabledByDefault: boolean
  isActive: boolean
  milestones: BlueprintMilestone[]
  sections: BlueprintSection[]
  resources: BlueprintResource[]
}

export interface CreateBlueprintInput {
  serviceCode: string
  serviceName: string
  serviceSlug: string
  milestones?: BlueprintMilestone[]
  sections?: BlueprintSection[]
  resources?: BlueprintResource[]
  defaultProgress?: MilestoneValue
  messagingEnabledByDefault?: boolean
}

export interface UpdateBlueprintInput {
  serviceName?: string
  milestones?: BlueprintMilestone[]
  sections?: BlueprintSection[]
  resources?: BlueprintResource[]
  defaultProgress?: MilestoneValue
  messagingEnabledByDefault?: boolean
  isActive?: boolean
}

export interface BlueprintFilters {
  active?: boolean
}

export interface BlueprintResponse {
  blueprint: BlueprintData
}

export interface BlueprintsListResponse {
  blueprints: BlueprintData[]
  count: number
}

export interface MilestoneOption {
  value: MilestoneValue
  label: string
  description: string
}

export interface SectionTypeOption {
  value: BlueprintSection['type']
  label: string
  description: string
  icon: React.ReactNode
}