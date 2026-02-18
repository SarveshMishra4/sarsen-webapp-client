'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { QuestionRenderer } from '../../components/questionnaires/QuestionRenderer'
import { DeadlineBadge } from '../../components/questionnaires/DeadlineBadge'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

export default function FillQuestionnairePage() {
  const params = useParams()
  const router = useRouter()
  const questionnaireId = params.questionnaireId as string
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [startTime] = useState(Date.now())
  
  const {
    questionnaire,
    answers,
    isLoading,
    isSubmitting,
    fetchClientQuestionnaire,
    submitAnswers,
    updateAnswer
  } = useQuestionnaire()

  useEffect(() => {
    if (questionnaireId) {
      fetchClientQuestionnaire(questionnaireId)
    }
  }, [questionnaireId, fetchClientQuestionnaire])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    questionnaire?.questions.forEach((q) => {
      if (q.required) {
        const answer = answers[q.id]
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
          newErrors[q.id] = 'This question is required'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector('.text-red-600')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const timeSpent = Math.floor((Date.now() - startTime) / 1000) // in seconds
    await submitAnswers(questionnaireId, timeSpent)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (!questionnaire) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Questionnaire not found</p>
            <Link href="/client/questionnaires">
              <Button variant="primary">Back to Questionnaires</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  if (questionnaire.status === 'submitted') {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Already Submitted</h2>
            <p className="text-gray-600 mb-8">
              You have already submitted this questionnaire.
            </p>
            <Link href="/client/questionnaires">
              <Button variant="primary">Back to Questionnaires</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  const isOverdue = questionnaire.status === 'overdue'

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <Card className="mb-6">
        <CardBody>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{questionnaire.title}</h1>
          {questionnaire.description && (
            <p className="text-gray-600 mb-4">{questionnaire.description}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                {questionnaire.answeredQuestions}/{questionnaire.totalQuestions} questions answered
              </p>
              {questionnaire.instructions && (
                <p className="text-sm text-gray-500 italic">{questionnaire.instructions}</p>
              )}
            </div>
            {questionnaire.deadline && (
              <DeadlineBadge deadline={questionnaire.deadline} isOverdue={isOverdue} />
            )}
          </div>

          {isOverdue && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">
                This questionnaire is overdue. Please submit as soon as possible.
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Questions */}
      <Card className="mb-6">
        <CardBody>
          <div className="space-y-8">
            {questionnaire.questions.map((question, index) => (
              <div key={question.id}>
                <div className="flex items-start mb-2">
                  <span className="text-sm text-gray-500 mr-2">#{index + 1}</span>
                  <QuestionRenderer
                    question={question}
                    value={answers[question.id]}
                    onChange={(value) => updateAnswer(question.id, value)}
                    error={errors[question.id]}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Link href="/client/questionnaires">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
        >
          Submit Questionnaire
        </Button>
      </div>
    </div>
  )
}