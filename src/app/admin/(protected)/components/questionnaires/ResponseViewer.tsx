'use client'

import { format } from 'date-fns'
import { Questionnaire } from '@/types/questionnaire.types'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface ResponseViewerProps {
  questionnaire: Questionnaire
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ questionnaire }) => {
  const formatAnswer = (question: any) => {
    if (!question.answer) return <span className="text-gray-400">No answer</span>

    if (question.questionType === 'file' && question.fileUrl) {
      return (
        <a
          href={question.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-800 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download File
        </a>
      )
    }

    if (Array.isArray(question.answer)) {
      return question.answer.join(', ')
    }

    if (question.answer instanceof Date) {
      return format(question.answer, 'PPP')
    }

    return question.answer || <span className="text-gray-400">No answer</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">{questionnaire.title}</h2>
          {questionnaire.description && (
            <p className="text-sm text-gray-500 mt-1">{questionnaire.description}</p>
          )}
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Submitted</p>
              <p className="font-medium">
                {questionnaire.submittedAt 
                  ? format(new Date(questionnaire.submittedAt), 'MMM d, yyyy h:mm a')
                  : 'Not submitted'}
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
              <p className="text-sm text-gray-500">Completion</p>
              <p className="font-medium">
                {questionnaire.answeredQuestions}/{questionnaire.totalQuestions}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Questions and Answers */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Responses</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {questionnaire.questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm text-gray-500 mr-2">#{index + 1}</span>
                    <span className="text-sm font-medium text-gray-900">{question.questionText}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {question.questionType}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </span>
                </div>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  {formatAnswer(question)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}