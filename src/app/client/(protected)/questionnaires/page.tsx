'use client'

import { useEffect, useState } from 'react'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { QuestionnaireCard } from '../../components/questionnaires/QuestionnaireCard'
import { Card, CardBody } from '@/components/ui/Card'

export default function ClientQuestionnairesPage() {
  const { questionnaires, isLoading, fetchQuestionnaires } = useQuestionnaire()
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('pending')

  useEffect(() => {
    fetchQuestionnaires(filter === 'all' ? undefined : filter)
  }, [fetchQuestionnaires, filter])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  const pendingCount = questionnaires.filter(q => q.status === 'pending' || q.status === 'overdue').length
  const submittedCount = questionnaires.filter(q => q.status === 'submitted').length

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Questionnaires</h1>
        <p className="text-gray-600 mt-1">
          Complete your pending questionnaires
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{questionnaires.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{submittedCount}</p>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'pending'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('submitted')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'submitted'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          All
        </button>
      </div>

      {/* Questionnaire Grid */}
      {questionnaires.length === 0 ? (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <p className="text-gray-500">No questionnaires found</p>
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {questionnaires.map((q) => (
            <QuestionnaireCard key={q.id} questionnaire={q} />
          ))}
        </div>
      )}
    </div>
  )
}