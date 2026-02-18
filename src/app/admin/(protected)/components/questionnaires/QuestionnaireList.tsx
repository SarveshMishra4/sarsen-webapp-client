'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { Questionnaire, QuestionnaireStatus } from '@/types/questionnaire.types'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'

interface QuestionnaireListProps {
  questionnaires: Questionnaire[]
  engagementId?: string
  onRefresh?: () => void
  isLoading?: boolean
}

export const QuestionnaireList: React.FC<QuestionnaireListProps> = ({
  questionnaires,
  engagementId,
  onRefresh,
  isLoading = false
}) => {
  const { sendReminder, getStatusColor } = useQuestionnaire()

  const handleSendReminder = async (id: string) => {
    await sendReminder(id)
    onRefresh?.()
  }

  const getStatusLabel = (status: QuestionnaireStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No deadline'
    return format(new Date(dateString), 'MMM d, yyyy')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (questionnaires.length === 0) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No questionnaires found</p>
            {engagementId && (
              <Link href={`/admin/protected/questionnaires/new?engagementId=${engagementId}`}>
                <Button variant="primary">Create Questionnaire</Button>
              </Link>
            )}
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {questionnaires.map((q) => (
        <Card key={q.id}>
          <CardBody>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{q.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(q.status)}`}>
                    {getStatusLabel(q.status)}
                  </span>
                </div>

                {q.description && (
                  <p className="text-gray-600 text-sm mb-3">{q.description}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Questions</p>
                    <p className="font-medium">{q.totalQuestions}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Answered</p>
                    <p className="font-medium">{q.answeredQuestions}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Sent</p>
                    <p className="font-medium">{format(new Date(q.sentAt), 'MMM d, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Deadline</p>
                    <p className="font-medium">{formatDate(q.deadline)}</p>
                  </div>
                </div>

                {q.reminderCount > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    {q.reminderCount} reminder{q.reminderCount !== 1 ? 's' : ''} sent
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {q.status === 'pending' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendReminder(q.id)}
                  >
                    Remind
                  </Button>
                )}
                <Link href={`/admin/protected/questionnaires/${q.id}`}>
                  <Button variant="outline" size="sm">
                    {q.status === 'submitted' ? 'View Responses' : 'Edit'}
                  </Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}