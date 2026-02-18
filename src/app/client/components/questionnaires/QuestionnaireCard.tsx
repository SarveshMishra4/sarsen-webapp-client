'use client'

import Link from 'next/link'
import { Questionnaire } from '@/types/questionnaire.types'
import { DeadlineBadge } from './DeadlineBadge'

interface QuestionnaireCardProps {
  questionnaire: Questionnaire
}

export const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({ questionnaire }) => {
  const completionPercentage = Math.round((questionnaire.answeredQuestions / questionnaire.totalQuestions) * 100)
  const isOverdue = questionnaire.status === 'overdue'

  const getStatusColor = (status: string) => {
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
  }

  return (
    <Link href={`/client/questionnaires/${questionnaire.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{questionnaire.title}</h3>
            {questionnaire.description && (
              <p className="text-sm text-gray-600 mt-1">{questionnaire.description}</p>
            )}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(questionnaire.status)}`}>
            {questionnaire.status}
          </span>
        </div>

        {questionnaire.instructions && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{questionnaire.instructions}</p>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-primary-600">{completionPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">
              {questionnaire.answeredQuestions}/{questionnaire.totalQuestions} questions
            </span>
            {questionnaire.deadline && (
              <DeadlineBadge deadline={questionnaire.deadline} isOverdue={isOverdue} />
            )}
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}