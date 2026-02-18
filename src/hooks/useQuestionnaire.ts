'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { questionnaireService } from '@/services/questionnaire.service'
import { useToast } from './useToast'
import { useAuth } from './useAuth'
import {
  Questionnaire,
  QuestionnaireFormData,
  AnswerFormData,
  Question,
  QuestionType,
  QuestionnaireStatus,
  SubmitQuestionnaireRequest
} from '@/types/questionnaire.types'

interface UseQuestionnaireProps {
  questionnaireId?: string
  engagementId?: string
}

export const useQuestionnaire = ({ questionnaireId, engagementId }: UseQuestionnaireProps = {}) => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  const [answers, setAnswers] = useState<AnswerFormData>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [formData, setFormData] = useState<QuestionnaireFormData>({
    engagementId: '',
    title: '',
    description: '',
    instructions: '',
    questions: [],
    deadline: undefined
  })

  const { user, role } = useAuth()
  const { success, error } = useToast()
  const router = useRouter()

  // Fetch all questionnaires (admin)
  const fetchQuestionnaires = useCallback(async (status?: QuestionnaireStatus) => {
    setIsLoading(true)
    try {
      const response = await questionnaireService.getMyQuestionnaires(
        status ? { status } : undefined
      )
      if (response.success && response.data) {
        setQuestionnaires(response.data.questionnaires)
        setTotalCount(response.data.count)
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch questionnaires')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Fetch engagement questionnaires (admin)
  const fetchEngagementQuestionnaires = useCallback(async (engId: string, status?: string) => {
    if (!engId) return
    
    setIsLoading(true)
    try {
      const response = await questionnaireService.getEngagementQuestionnaires(engId, status)
      if (response.success && response.data) {
        setQuestionnaires(response.data.questionnaires)
        setTotalCount(response.data.count)
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch engagement questionnaires')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Fetch single questionnaire (admin)
  const fetchQuestionnaireById = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      const response = await questionnaireService.getQuestionnaireById(id)
      if (response.success && response.data) {
        setQuestionnaire(response.data.questionnaire)
        return response.data.questionnaire
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch questionnaire')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Fetch client questionnaire (to fill)
  const fetchClientQuestionnaire = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      const response = await questionnaireService.getClientQuestionnaire(id)
      if (response.success && response.data) {
        setQuestionnaire(response.data.questionnaire)
        
        // Initialize answers with existing values if any
        const initialAnswers: AnswerFormData = {}
        response.data.questionnaire.questions.forEach(q => {
          if (q.answer) {
            initialAnswers[q.id] = q.answer
          }
        })
        setAnswers(initialAnswers)
        
        return response.data.questionnaire
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch questionnaire')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Create questionnaire
  const createQuestionnaire = useCallback(async (data: QuestionnaireFormData) => {
    setIsLoading(true)
    try {
      const response = await questionnaireService.createQuestionnaire({
        engagementId: data.engagementId,
        title: data.title,
        description: data.description,
        instructions: data.instructions,
        questions: data.questions.map((q, index) => ({
          questionText: q.questionText,
          questionType: q.questionType,
          options: q.options,
          required: q.required,
          order: index + 1
        })),
        deadline: data.deadline
      })
      
      if (response.success && response.data) {
        success('Questionnaire created successfully')
        router.push(`/admin/protected/questionnaires/${response.data.questionnaire.id}`)
        return response.data.questionnaire
      }
    } catch (err: any) {
      error(err.message || 'Failed to create questionnaire')
    } finally {
      setIsLoading(false)
    }
  }, [success, error, router])

  // Send reminder
  const sendReminder = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      const response = await questionnaireService.sendReminder(id)
      if (response.success) {
        success('Reminder sent successfully')
      }
    } catch (err: any) {
      error(err.message || 'Failed to send reminder')
    } finally {
      setIsLoading(false)
    }
  }, [success, error])

  // Cancel questionnaire
  const cancelQuestionnaire = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to cancel this questionnaire?')) return
    
    setIsLoading(true)
    try {
      const response = await questionnaireService.cancelQuestionnaire(id)
      if (response.success) {
        success('Questionnaire cancelled')
        router.push('/admin/protected/questionnaires')
      }
    } catch (err: any) {
      error(err.message || 'Failed to cancel questionnaire')
    } finally {
      setIsLoading(false)
    }
  }, [success, error, router])

  // Submit questionnaire answers
  const submitAnswers = useCallback(async (id: string, timeSpent?: number) => {
    setIsSubmitting(true)
    try {
      // Format answers for submission
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer: answer instanceof File ? answer.name : answer // In real app, upload file first
      }))

      const request: SubmitQuestionnaireRequest = {
        answers: formattedAnswers,
        timeSpent
      }

      const response = await questionnaireService.submitQuestionnaire(id, request)
      if (response.success) {
        success('Questionnaire submitted successfully')
        router.push('/client/dashboard')
        return response.data
      }
    } catch (err: any) {
      error(err.message || 'Failed to submit questionnaire')
    } finally {
      setIsSubmitting(false)
    }
  }, [answers, success, error, router])

  // Update answer for a question
  const updateAnswer = useCallback((questionId: string, value: string | string[] | File | Date | null) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }, [])

  // Update form data for builder
  const updateFormData = useCallback((data: Partial<QuestionnaireFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }, [])

  // Add question to builder
  const addQuestion = useCallback((type: QuestionType) => {
    const newQuestion = {
      id: `temp-${Date.now()}`,
      questionText: '',
      questionType: type,
      options: type === 'select' || type === 'multiselect' ? [] : undefined,
      required: false,
      order: formData.questions.length + 1
    }
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))
  }, [formData.questions.length])

  // Update question in builder
  const updateQuestion = useCallback((index: number, updates: Partial<Question>) => {
    setFormData(prev => {
      const newQuestions = [...prev.questions]
      newQuestions[index] = { ...newQuestions[index], ...updates }
      return { ...prev, questions: newQuestions }
    })
  }, [])

  // Remove question from builder
  const removeQuestion = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
        .map((q, i) => ({ ...q, order: i + 1 }))
    }))
  }, [])

  // Reorder questions
  const reorderQuestions = useCallback((startIndex: number, endIndex: number) => {
    const result = Array.from(formData.questions)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    
    // Update order
    const reordered = result.map((q, index) => ({ ...q, order: index + 1 }))
    setFormData(prev => ({ ...prev, questions: reordered }))
  }, [formData.questions])

  // Calculate completion percentage
  const getCompletionPercentage = useCallback(() => {
    if (!questionnaire) return 0
    return Math.round((questionnaire.answeredQuestions / questionnaire.totalQuestions) * 100)
  }, [questionnaire])

  // Check if overdue
  const isOverdue = useCallback(() => {
    if (!questionnaire?.deadline) return false
    return new Date(questionnaire.deadline) < new Date() && questionnaire.status === 'pending'
  }, [questionnaire])

  // Get status badge color
  const getStatusColor = useCallback((status: QuestionnaireStatus): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'submitted':
        return 'bg-green-100 text-green-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }, [])

  return {
    // State
    questionnaires,
    questionnaire,
    answers,
    isLoading,
    isSubmitting,
    totalCount,
    formData,

    // Admin operations
    fetchQuestionnaires,
    fetchEngagementQuestionnaires,
    fetchQuestionnaireById,
    createQuestionnaire,
    sendReminder,
    cancelQuestionnaire,

    // Client operations
    fetchClientQuestionnaire,
    submitAnswers,
    updateAnswer,

    // Builder operations
    updateFormData,
    addQuestion,
    updateQuestion,
    removeQuestion,
    reorderQuestions,

    // Helpers
    getCompletionPercentage,
    isOverdue,
    getStatusColor
  }
}