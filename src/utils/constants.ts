export const MILESTONES = {
  START: 10,
  EARLY_PROGRESS: 20,
  QUARTER: 25,
  ONE_THIRD: 30,
  MID_PROGRESS: 40,
  HALF: 50,
  ADVANCED: 60,
  NEAR_COMPLETE: 70,
  THREE_QUARTER: 75,
  ALMOST_DONE: 80,
  FINAL_STAGE: 90,
  COMPLETED: 100,
} as const

export const ALLOWED_MILESTONES = Object.values(MILESTONES)

export const QUESTION_TYPES = [
  'text',
  'textarea',
  'select',
  'multiselect',
  'file',
  'date',
] as const

export const RESOURCE_TYPES = [
  'pdf',
  'doc',
  'excel',
  'ppt',
  'link',
  'video',
  'image',
  'other',
] as const

export const QUESTIONNAIRE_STATUS = [
  'pending',
  'submitted',
  'overdue',
  'cancelled',
] as const

export const ORDER_STATUS = [
  'PENDING',
  'PAID',
  'FAILED',
  'REFUNDED',
] as const