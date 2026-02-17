'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useMessages } from '@/hooks/useMessages'
import { engagementService } from '@/services/engagement.service'
import { messageService } from '@/services/message.service'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { MessageThread } from '@/components/messages/MessageThread'
import { MessageComposer } from '@/components/messages/MessageComposer'
import { StatusBadge } from '@/app/client/components/StatusBadge'
import { useEngagement } from '@/hooks/useEngagement'

export default function AdminEngagementMessagesPage() {
  const params = useParams()
  const engagementId = params.engagementId as string
  
  const { user } = useAuth()
  const { error } = useToast()
  const { engagement, fetchEngagementById } = useEngagement()
  
  const [isLoading, setIsLoading] = useState(true)
  
  const { 
    messages,
    isLoading: isLoadingMessages,
    hasMore,
    sendMessage,
    loadMore,
    refresh
  } = useMessages({ engagementId })

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await fetchEngagementById(engagementId)
      setIsLoading(false)
    }
    loadData()
  }, [engagementId, fetchEngagementById])

  const handleDeleteMessage = async (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await messageService.deleteMessage(messageId)
        refresh()
      } catch (err: any) {
        error(err.message || 'Failed to delete message')
      }
    }
  }

  if (isLoading || !engagement) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

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
              ID: {engagement.engagementId} • Client: {engagement.userId}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <StatusBadge 
              status={engagement.isCompleted ? 'completed' : 'active'} 
            />
            <Link href={`/admin/protected/engagements`}>
              <Button variant="outline" size="sm">
                Back to Engagements
              </Button>
            </Link>
          </div>
        </div>

        {/* Messaging Status */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Messaging</h3>
              <p className="text-sm text-gray-600">
                {engagement.messagingAllowed 
                  ? 'Messaging is enabled for this engagement'
                  : 'Messaging is disabled (engagement completed)'}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              engagement.messagingAllowed
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {engagement.messagingAllowed ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Message History</h2>
        </CardHeader>
        <CardBody>
          <div className="h-[600px] flex flex-col">
            <MessageThread
              messages={messages}
              currentUserId={user?.id || ''}
              isLoading={isLoadingMessages}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
            {engagement.messagingAllowed ? (
              <MessageComposer
                onSendMessage={sendMessage}
                placeholder="Reply as admin..."
              />
            ) : (
              <div className="p-4 bg-gray-50 text-center text-gray-500 rounded-lg">
                Messaging is disabled for completed engagements
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}