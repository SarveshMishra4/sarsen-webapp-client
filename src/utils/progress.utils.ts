import { MilestoneValue } from '@/types/blueprint.types'
import { 
  ProgressHistoryEntry, 
  MilestoneTiming, 
  ChartDataPoint,
  MilestoneCategory,
  ProgressValidationResult
} from '@/types/progress.types'
import { MILESTONES, ALLOWED_MILESTONES } from './constants'

// Milestone categories for analytics
export const MILESTONE_CATEGORIES: MilestoneCategory[] = [
  {
    name: 'EARLY',
    milestones: [MILESTONES.START, MILESTONES.EARLY_PROGRESS, MILESTONES.QUARTER, MILESTONES.ONE_THIRD],
    color: '#94a3b8' // slate-400
  },
  {
    name: 'MID',
    milestones: [MILESTONES.MID_PROGRESS, MILESTONES.HALF, MILESTONES.ADVANCED],
    color: '#3b82f6' // blue-500
  },
  {
    name: 'LATE',
    milestones: [MILESTONES.NEAR_COMPLETE, MILESTONES.THREE_QUARTER, MILESTONES.ALMOST_DONE, MILESTONES.FINAL_STAGE],
    color: '#f59e0b' // amber-500
  },
  {
    name: 'COMPLETION',
    milestones: [MILESTONES.COMPLETED],
    color: '#10b981' // emerald-500
  }
]

// Get milestone category
export const getMilestoneCategory = (value: MilestoneValue): MilestoneCategory['name'] => {
  const category = MILESTONE_CATEGORIES.find(cat => 
    cat.milestones.includes(value)
  )
  return category?.name || 'EARLY'
}

// Get milestone color
export const getMilestoneColor = (value: MilestoneValue): string => {
  const category = MILESTONE_CATEGORIES.find(cat => 
    cat.milestones.includes(value)
  )
  return category?.color || '#94a3b8'
}

// Get milestone label
export const getMilestoneLabel = (value: MilestoneValue): string => {
  const labels: Record<MilestoneValue, string> = {
    [MILESTONES.START]: 'Start',
    [MILESTONES.EARLY_PROGRESS]: 'Early Progress',
    [MILESTONES.QUARTER]: 'Quarter',
    [MILESTONES.ONE_THIRD]: 'One Third',
    [MILESTONES.MID_PROGRESS]: 'Mid Progress',
    [MILESTONES.HALF]: 'Half',
    [MILESTONES.ADVANCED]: 'Advanced',
    [MILESTONES.NEAR_COMPLETE]: 'Near Complete',
    [MILESTONES.THREE_QUARTER]: 'Three Quarter',
    [MILESTONES.ALMOST_DONE]: 'Almost Done',
    [MILESTONES.FINAL_STAGE]: 'Final Stage',
    [MILESTONES.COMPLETED]: 'Completed'
  }
  return labels[value] || String(value)
}

// Validate progress transition
export const validateProgressTransition = (
  currentProgress: MilestoneValue,
  newProgress: MilestoneValue
): ProgressValidationResult => {
  // Cannot go backwards
  if (newProgress < currentProgress) {
    return {
      isValid: false,
      message: 'Cannot move backwards in progress'
    }
  }

  // Cannot skip directly to 100% unless at 90%
  if (newProgress === MILESTONES.COMPLETED && currentProgress !== MILESTONES.FINAL_STAGE) {
    return {
      isValid: false,
      message: 'Must reach 90% before completing'
    }
  }

  // All other transitions are allowed
  return {
    isValid: true,
    allowedTransitions: ALLOWED_MILESTONES.filter(m => m > currentProgress)
  }
}

// Calculate time spent at milestone
export const calculateTimeAtMilestone = (
  history: ProgressHistoryEntry[],
  milestoneValue: MilestoneValue
): number | undefined => {
  const entry = history.find(h => h.toValue === milestoneValue)
  if (!entry) return undefined

  const nextEntry = history.find(h => 
    h.createdAt > entry.createdAt && h.fromValue === milestoneValue
  )

  if (nextEntry) {
    const timeAt = new Date(nextEntry.createdAt).getTime() - new Date(entry.createdAt).getTime()
    return Math.floor(timeAt / 1000) // convert to seconds
  }

  return undefined // still at this milestone
}

// Build milestone timeline from history
export const buildMilestoneTimeline = (
  history: ProgressHistoryEntry[],
  startDate: string
): MilestoneTiming[] => {
  const sortedHistory = [...history].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  const timeline: MilestoneTiming[] = []
  let lastDate = new Date(startDate)

  sortedHistory.forEach((entry, index) => {
    const reachedAt = entry.createdAt
    const timeSpent = index === 0 
      ? Math.floor((new Date(reachedAt).getTime() - new Date(startDate).getTime()) / 1000)
      : Math.floor((new Date(reachedAt).getTime() - lastDate.getTime()) / 1000)

    timeline.push({
      value: entry.toValue,
      label: getMilestoneLabel(entry.toValue),
      reachedAt,
      timeSpent: timeSpent > 0 ? timeSpent : undefined
    })

    lastDate = new Date(reachedAt)
  })

  return timeline
}

// Calculate average time per milestone
export const calculateAverageTimePerMilestone = (
  timeline: MilestoneTiming[]
): number | undefined => {
  const times = timeline
    .map(t => t.timeSpent)
    .filter((t): t is number => t !== undefined)

  if (times.length === 0) return undefined

  const total = times.reduce((sum, t) => sum + t, 0)
  return Math.floor(total / times.length)
}

// Check if engagement is stalled
export const isStalled = (
  lastUpdateDate: string,
  currentProgress: MilestoneValue,
  daysThreshold: number = 7
): boolean => {
  // Don't mark completed engagements as stalled
  if (currentProgress === MILESTONES.COMPLETED) return false

  const lastUpdate = new Date(lastUpdateDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))
  
  return diffDays >= daysThreshold
}

// Format time duration
export const formatDuration = (seconds?: number): string => {
  if (!seconds) return 'N/A'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}

// Prepare chart data from timeline
export const prepareChartData = (timeline: MilestoneTiming[]): ChartDataPoint[] => {
  return timeline.map(point => ({
    date: new Date(point.reachedAt).toLocaleDateString(),
    value: point.value,
    label: point.label
  }))
}

// Get next recommended milestone
export const getNextRecommendedMilestone = (
  currentProgress: MilestoneValue
): MilestoneValue | undefined => {
  const index = ALLOWED_MILESTONES.indexOf(currentProgress)
  if (index < ALLOWED_MILESTONES.length - 1) {
    return ALLOWED_MILESTONES[index + 1]
  }
  return undefined
}