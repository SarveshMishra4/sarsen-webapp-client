'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEngagement } from '@/hooks/useEngagement'
import { useToast } from '@/hooks/useToast'
import { DashboardMetrics } from '../../components/DashboardMetrics'
import { ProgressBar } from '../../components/ProgressBar'
import { MilestoneTimeline } from '../../components/MilestoneTimeline'
import { StatusBadge } from '../../components/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import EngagementDetailLoading from './loading'


export default function EngagementDetailPage() {
  const params = useParams()
  const engagementId = params.engagementId as string
  
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'questionnaires'>('overview')
  
  const { 
    engagement, 
    progress,
    isLoading, 
    fetchEngagementById,
    fetchEngagementProgress,
    getStatusLabel,
    formatDate 
  } = useEngagement()
  
  const { error } = useToast()

  useEffect(() => {
    if (engagementId) {
      Promise.all([
        fetchEngagementById(engagementId),
        fetchEngagementProgress(engagementId)
      ]).catch((err) => {
        error('Failed to load engagement details')
      })
    }
  }, [engagementId, fetchEngagementById, fetchEngagementProgress, error])

  if (isLoading) {
    return <EngagementDetailLoading />
  }

  if (!engagement) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Engagement Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The engagement you're looking for doesn't exist or you don't have access.
            </p>
            <Link href="/client/dashboard">
              <Button variant="primary">Back to Dashboard</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  const status = getStatusLabel(engagement)
  const showFeedbackRequired = status === 'feedback-required'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {engagement.serviceName}
            </h1>
            <p className="text-gray-600 mt-1">
              ID: {engagement.engagementId} • Started {formatDate(engagement.startDate)}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>

        {showFeedbackRequired && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Feedback Required
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This engagement is completed. Please provide your feedback to continue.
                </p>
              </div>
              <Link href={`/client/dashboard/${engagementId}/feedback`}>
                <Button variant="primary" size="sm">
                  Give Feedback
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Metrics Dashboard */}
      <DashboardMetrics engagement={engagement} />

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Progress</h2>
        </CardHeader>
        <CardBody>
          <ProgressBar 
            progress={engagement.currentProgress} 
            milestones={engagement.milestones.map(m => m.value)}
            size="lg"
            className="mb-6"
          />
          
          {progress && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Current Progress</p>
                <p className="font-medium text-gray-900">{progress.currentProgress}%</p>
              </div>
              <div>
                <p className="text-gray-500">Started</p>
                <p className="font-medium text-gray-900">{formatDate(progress.startDate)}</p>
              </div>
              {progress.completedAt && (
                <div>
                  <p className="text-gray-500">Completed</p>
                  <p className="font-medium text-gray-900">{formatDate(progress.completedAt)}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Total Updates</p>
                <p className="font-medium text-gray-900">{progress.timeline.length}</p>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'overview'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'resources'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Resources ({engagement.resourceCount})
          </button>
          <button
            onClick={() => setActiveTab('questionnaires')}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'questionnaires'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Questionnaires ({engagement.questionnaireCount})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {engagement.sections
              .filter(section => section.isVisible)
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    {section.description && (
                      <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                    )}
                  </CardHeader>
                  <CardBody>
                    {section.type === 'milestones' && (
                      <MilestoneTimeline 
                        milestones={engagement.milestones} 
                        currentProgress={engagement.currentProgress}
                      />
                    )}
                    {section.type === 'instructions' && section.content && (
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                    )}
                    {section.type === 'custom' && section.content && (
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                    )}
                  </CardBody>
                </Card>
              ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Resources</h3>
            </CardHeader>
            <CardBody>
              {engagement.resources.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No resources available yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {engagement.resources.map((resource) => {
                    const resourceIcons: Record<string, string> = {
                      pdf: '📄',
                      doc: '📝',
                      excel: '📊',
                      ppt: '📽️',
                      link: '🔗',
                      video: '🎥',
                      image: '🖼️',
                      other: '📁'
                    }

                    return (
                      <a
                        key={resource.id}
                        href={resource.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-2xl mr-3">{resourceIcons[resource.type] || '📁'}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                          {resource.description && (
                            <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                          )}
                          <div className="flex items-center space-x-3 mt-2 text-xs text-gray-400">
                            <span>{resource.type.toUpperCase()}</span>
                            <span>•</span>
                            <span>{resource.downloadCount} downloads</span>
                            <span>•</span>
                            <span>{resource.viewCount} views</span>
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              )}
            </CardBody>
          </Card>
        )}

        {activeTab === 'questionnaires' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Questionnaires</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-500 text-center py-8">
                Questionnaires feature coming in Phase F7
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
}