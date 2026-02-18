'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useNotifications } from '@/hooks/useNotifications'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { NotificationType, NotificationSeverity } from '@/types/notification.types'

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all')
  const [severityFilter, setSeverityFilter] = useState<NotificationSeverity | 'all'>('all')

  const {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    getRelativeTime,
    getIcon,
    getColor,
    getLink
  } = useNotifications()

  useEffect(() => {
    fetchNotifications({ limit: 100 })
  }, [fetchNotifications])

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread' && n.isRead) return false
    if (typeFilter !== 'all' && n.type !== typeFilter) return false
    if (severityFilter !== 'all' && n.severity !== severityFilter) return false
    return true
  })

  const getSeverityBadge = (severity: NotificationSeverity) => {
    const variants: Record<NotificationSeverity, 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
      info: 'info',
      warning: 'warning',
      success: 'success',
      error: 'danger'
    }
    return variants[severity]
  }

  const notificationTypes: NotificationType[] = [
    'engagement.created',
    'engagement.completed',
    'questionnaire.submitted',
    'feedback.received',
    'payment.received',
    'message.received',
    'stalled.engagement',
    'overdue.questionnaire',
    'system.alert'
  ]

  const severities: NotificationSeverity[] = ['info', 'success', 'warning', 'error']

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  filter === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  filter === 'unread'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread
              </button>
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="all">All Types</option>
              {notificationTypes.map(type => (
                <option key={type} value={type}>
                  {type.split('.').join(' ')}
                </option>
              ))}
            </select>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="all">All Severities</option>
              {severities.map(severity => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              ))}
            </select>
          </div>
        </CardBody>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            {filter === 'all' ? 'All Notifications' : 'Unread Notifications'}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredNotifications.length})
            </span>
          </h2>
        </CardHeader>
        <CardBody>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'unread'
                  ? 'You have no unread notifications'
                  : 'No notifications match your filters'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => {
                const link = getLink(notification)
                const content = (
                  <div className="py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3 px-4">
                      <span className="text-2xl">{getIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-primary-600 rounded-full" />
                            )}
                          </div>
                          <Badge variant={getSeverityBadge(notification.severity)} size="sm">
                            {notification.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">
                            {getRelativeTime(notification.createdAt)}
                          </p>
                          <div className="flex items-center space-x-2">
                            {notification.actionText && link && (
                              <Link
                                href={link}
                                className="text-xs text-primary-600 hover:text-primary-700"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.actionText}
                              </Link>
                            )}
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-gray-400 hover:text-gray-600"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )

                if (link && !notification.isRead) {
                  return (
                    <Link
                      key={notification.id}
                      href={link}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {content}
                    </Link>
                  )
                }

                return <div key={notification.id}>{content}</div>
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}