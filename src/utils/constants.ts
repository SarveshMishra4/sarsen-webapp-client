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

// Add to existing constants.ts

export const SERVICE_SLUGS = [
  'fundraising-strategy',
  'pitch-deck-design',
  'gtm-strategy'
] as const

export type ServiceSlug = typeof SERVICE_SLUGS[number]

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/sarsen-strategy',
  twitter: 'https://twitter.com/sarsenstrategy',
  email: 'info@sarsenstrategy.com',
} as const

export const COMPANY_INFO = {
  name: 'Sarsen Strategy Partners',
  address: '123 Business Ave, Suite 100, San Francisco, CA 94105',
  phone: '+1 (415) 555-0123',
  email: 'info@sarsenstrategy.com',
  founded: '2020',
} as const

export const CONTACT_FORM_FIELDS = {
  name: { maxLength: 100, minLength: 2 },
  message: { maxLength: 2000, minLength: 10 },
  company: { maxLength: 100 },
} as const