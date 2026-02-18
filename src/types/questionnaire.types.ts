export type QuestionType = 'text' | 'textarea' | 'select' | 'multiselect' | 'file' | 'date'

export type QuestionnaireStatus = 'pending' | 'submitted' | 'overdue' | 'cancelled'

export interface QuestionOption {
  id: string
  value: string
  label: string
}

export interface Question {
  id: string
  questionText: string
  questionType: QuestionType
  options?: QuestionOption[]
  required: boolean
  order: number
  answer?: string | string[] | File | Date | null
  fileUrl?: string
}

export interface Questionnaire {
  id: string
  engagementId: string
  createdBy: string
  title: string
  description?: string
  instructions?: string
  questions: Question[]
  status: QuestionnaireStatus
  sentAt: string
  deadline?: string
  submittedAt?: string
  submittedBy?: string
  timeSpent?: number
  totalQuestions: number
  answeredQuestions: number
  reminderSentAt?: string
  reminderCount: number
  createdAt: string
  updatedAt: string
}

export interface CreateQuestionnaireRequest {
  engagementId: string
  title: string
  description?: string
  instructions?: string
  questions: Omit<Question, 'id' | 'answer' | 'fileUrl'>[]
  deadline?: string
}

export interface UpdateQuestionnaireRequest {
  title?: string
  description?: string
  instructions?: string
  questions?: Omit<Question, 'id' | 'answer' | 'fileUrl'>[]
  deadline?: string
  status?: QuestionnaireStatus
}

export interface SubmitQuestionnaireRequest {
  answers: Array<{
    questionId: string
    answer: string | string[] | File | Date | null
  }>
  timeSpent?: number
}

export interface SubmitQuestionnaireResponse {
  questionnaire: Questionnaire
}

export interface QuestionnaireResponse {
  questionnaire: Questionnaire
}

export interface QuestionnairesListResponse {
  questionnaires: Questionnaire[]
  count: number
}

export interface QuestionnaireFilters {
  status?: QuestionnaireStatus
  engagementId?: string
  page?: number
  limit?: number
}

export interface ReminderResponse {
  questionnaire: Questionnaire
}

export interface QuestionnaireStats {
  total: number
  pending: number
  submitted: number
  overdue: number
  cancelled: number
  completionRate: number
}

// For form state in builder
export interface QuestionnaireFormData {
  engagementId: string
  title: string
  description: string
  instructions: string
  questions: Array<Omit<Question, 'id'> & { id?: string }>
  deadline?: string
}

// For client answering
export interface AnswerFormData {
  [questionId: string]: string | string[] | File | Date | null
}