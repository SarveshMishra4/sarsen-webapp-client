'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { ResponseViewer } from '../../components/questionnaires/ResponseViewer'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

export default function ViewQuestionnairePage() {
  const params = useParams()
  const router = useRouter()
  const questionnaireId = params.questionnaireId as string
  
  const {
    questionnaire,
    isLoading,
    fetchQuestionnaireById,
    sendReminder,
    cancelQuestionnaire,
    getStatusColor
  } = useQuestionnaire()

  useEffect(() => {
    if (questionnaireId) {
      fetchQuestionnaireById(questionnaireId)
    }
  }, [questionnaireId, fetchQuestionnaireById])

  const handleSendReminder = async () => {
    await sendReminder(questionnaireId)
  }

  const handleCancel = async () => {
    await cancelQuestionnaire(questionnaireId)
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

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{questionnaire.title}</h1>
            <p className="text-gray-600 mt-1">
              {questionnaire.description}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(questionnaire.status)}`}>
              {getStatusLabel(questionnaire.status)}
            </span>
            <Link href={`/admin/protected/questionnaires`}>
              <Button variant="outline">Back</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <Card className="mb-6">
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Engagement</p>
              <p className="font-medium">{questionnaire.engagementId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Sent</p>
              <p className="font-medium">{new Date(questionnaire.sentAt).toLocaleDateString()}</p>
            </div>
            {questionnaire.deadline && (
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">{new Date(questionnaire.deadline).toLocaleDateString()}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Reminders</p>
              <p className="font-medium">{questionnaire.reminderCount} sent</p>
            </div>
          </div>

          {questionnaire.status === 'pending' && (
            <div className="mt-4 flex space-x-3">
              <Button variant="primary" size="sm" onClick={handleSendReminder}>
                Send Reminder
              </Button>
              <Button variant="danger" size="sm" onClick={handleCancel}>
                Cancel Questionnaire
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Responses or Edit Form */}
      {questionnaire.status === 'submitted' ? (
        <ResponseViewer questionnaire={questionnaire} />
      ) : (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Questionnaire Preview</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {questionnaire.questions.map((q, index) => (
                <div key={q.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start mb-2">
                    <span className="text-sm text-gray-500 mr-2">#{index + 1}</span>
                    <span className="text-sm font-medium text-gray-900">{q.questionText}</span>
                    {q.required && <span className="text-red-500 ml-1">*</span>}
                  </div>
                  <p className="text-xs text-gray-500">Type: {q.questionType}</p>
                  {q.options && q.options.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Options:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {q.options.map((opt) => (
                          <li key={opt.id}>{opt.label}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}