'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { useEngagement } from '@/hooks/useEngagement'
import { QuestionnaireBuilder } from '../../components/questionnaires/QuestionnaireBuilder'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'

export default function CreateQuestionnairePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const engagementId = searchParams.get('engagementId')
  
  const {
    formData,
    createQuestionnaire,
    updateFormData,
    addQuestion,
    updateQuestion,
    removeQuestion,
    reorderQuestions,
    isLoading
  } = useQuestionnaire()

  const { engagements, fetchMyEngagements } = useEngagement()

  useEffect(() => {
    fetchMyEngagements()
  }, [fetchMyEngagements])

  useEffect(() => {
    if (engagementId) {
      updateFormData({ engagementId })
    }
  }, [engagementId, updateFormData])

  const handleSubmit = async () => {
    if (!formData.title) {
      alert('Please enter a title')
      return
    }
    if (!formData.engagementId) {
      alert('Please select an engagement')
      return
    }
    if (formData.questions.length === 0) {
      alert('Please add at least one question')
      return
    }

    await createQuestionnaire(formData)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Questionnaire</h1>
        <p className="text-gray-600 mt-1">
          Build a questionnaire for your client
        </p>
      </div>

      {/* Engagement Selection (if not pre-selected) */}
      {!engagementId && (
        <Card className="mb-6">
          <CardBody>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Engagement *
            </label>
            <select
              value={formData.engagementId}
              onChange={(e) => updateFormData({ engagementId: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Choose an engagement</option>
              {engagements.map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.serviceName} - {eng.engagementId}
                </option>
              ))}
            </select>
          </CardBody>
        </Card>
      )}

      {/* Questionnaire Builder */}
      <QuestionnaireBuilder
        formData={formData}
        onUpdate={updateFormData}
        onAddQuestion={addQuestion}
        onUpdateQuestion={updateQuestion}
        onRemoveQuestion={removeQuestion}
        onReorderQuestions={reorderQuestions}
      />

      {/* Actions */}
      <div className="mt-6 flex justify-end space-x-3">
        <Link href="/admin/protected/questionnaires">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Create Questionnaire
        </Button>
      </div>
    </div>
  )
}