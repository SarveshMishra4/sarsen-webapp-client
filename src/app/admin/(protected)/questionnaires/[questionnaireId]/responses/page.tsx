'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { ResponseViewer } from '../../../components/questionnaires/ResponseViewer'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { format } from 'date-fns'

export default function QuestionnaireResponsesPage() {
  const params = useParams()
  const router = useRouter()
  const questionnaireId = params.questionnaireId as string
  
  const {
    questionnaire,
    isLoading,
    fetchQuestionnaireById,
    getStatusColor
  } = useQuestionnaire()

  useEffect(() => {
    if (questionnaireId) {
      fetchQuestionnaireById(questionnaireId)
    }
  }, [questionnaireId, fetchQuestionnaireById])

  const handleBack = () => {
    router.back()
  }

  const handleExportCSV = () => {
    if (!questionnaire) return

    // Create CSV content
    const headers = ['Question', 'Type', 'Answer', 'Required']
    const rows = questionnaire.questions.map(q => [
      q.questionText,
      q.questionType,
      Array.isArray(q.answer) ? q.answer.join(', ') : (q.answer || 'No answer'),
      q.required ? 'Yes' : 'No'
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `questionnaire-${questionnaireId}-responses.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
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
            <Link href="/admin/protected/questionnaires">
              <Button variant="primary">Back to Questionnaires</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  if (questionnaire.status !== 'submitted') {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              This questionnaire has not been submitted yet.
            </p>
            <Link href={`/admin/protected/questionnaires/${questionnaireId}`}>
              <Button variant="primary">Back to Questionnaire</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Questionnaire Responses</h1>
          <p className="text-gray-600 mt-1">
            {questionnaire.title}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            variant="outline"
            onClick={handleBack}
          >
            Back
          </Button>
        </div>
      </div>

      {/* Submission Info */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Submitted By</p>
              <p className="font-medium">
                {questionnaire.submittedBy || 'Unknown'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Submitted At</p>
              <p className="font-medium">
                {questionnaire.submittedAt 
                  ? format(new Date(questionnaire.submittedAt), 'MMM d, yyyy h:mm a')
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time Spent</p>
              <p className="font-medium">
                {questionnaire.timeSpent 
                  ? `${Math.floor(questionnaire.timeSpent / 60)}m ${questionnaire.timeSpent % 60}s`
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(questionnaire.status)}`}>
                {getStatusLabel(questionnaire.status)}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Responses */}
      <ResponseViewer questionnaire={questionnaire} />
    </div>
  )
}