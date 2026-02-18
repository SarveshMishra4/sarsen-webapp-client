'use client'

import Link from 'next/link'
import { Notification } from '@/types/notification.types'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useNotifications } from '@/hooks/useNotifications'
import { Button } from '@/components/ui/Button'

interface RecentActivityProps {
  limit?: number
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ limit = 5 }) => {
  const { notifications, getRelativeTime, getIcon, getColor, getLink } = useNotifications()

  const recentNotifications = notifications.slice(0, limit)

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
      info: 'info',
      warning: 'warning',
      success: 'success',
      error: 'danger'
    }
    return variants[severity] || 'default'
  }

  if (notifications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <Link href="/admin/protected/notifications">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {recentNotifications.map((notification) => {
            const link = getLink(notification)
            const content = (
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-2xl">{getIcon(notification.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {notification.title}
                    </p>
                    <Badge variant={getSeverityBadge(notification.severity)} size="sm">
                      {notification.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {getRelativeTime(notification.createdAt)}
                  </p>
                </div>
                {!notification.isRead && (
                  <span className="w-2 h-2 bg-primary-600 rounded-full" />
                )}
              </div>
            )

            if (link) {
              return (
                <Link key={notification.id} href={link}>
                  {content}
                </Link>
              )
            }

            return <div key={notification.id}>{content}</div>
          })}
        </div>
      </CardBody>
    </Card>
  )
}