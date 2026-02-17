'use client'

import Link from 'next/link'
import { EngagementSummary } from '@/types/engagement.types'
import { useEngagement } from '@/hooks/useEngagement'
import { ProgressBar } from './ProgressBar'
import { StatusBadge } from './StatusBadge'
import { Card, CardBody } from '@/components/ui/Card'

interface EngagementCardProps {
  engagement: EngagementSummary
}

export const EngagementCard: React.FC<EngagementCardProps> = ({ engagement }) => {
  const { getStatusLabel, getDaysSinceStart, formatDate } = useEngagement()
  
  const status = getStatusLabel(engagement)
  const daysActive = getDaysSinceStart(engagement.startDate)

  return (
    <Link href={`/client/dashboard/${engagement.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardBody>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {engagement.serviceName}
              </h3>
              <p className="text-sm text-gray-500">
                ID: {engagement.engagementId}
              </p>
            </div>
            <StatusBadge status={status} />
          </div>

          <ProgressBar 
            progress={engagement.currentProgress} 
            size="sm"
            showLabel={false}
            className="mb-4"
          />

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Messages</p>
              <p className="font-medium text-gray-900">{engagement.messageCount}</p>
            </div>
            <div>
              <p className="text-gray-500">Resources</p>
              <p className="font-medium text-gray-900">{engagement.resourceCount}</p>
            </div>
            <div>
              <p className="text-gray-500">Days Active</p>
              <p className="font-medium text-gray-900">{daysActive}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Last updated: {formatDate(engagement.updatedAt)}
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}