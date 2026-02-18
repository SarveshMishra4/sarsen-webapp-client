'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useNotifications } from '@/hooks/useNotifications'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface NotificationDropdownProps {
  isOpen: boolean
  onClose: () => void
  onMarkAsRead: (id: string) => void
  anchorEl: HTMLElement | null
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  onMarkAsRead,
  anchorEl
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { notifications, getRelativeTime, getIcon, getColor, getLink } = useNotifications()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [anchorEl, onClose])

  if (!isOpen) return null

  const unreadNotifications = notifications.filter(n => !n.isRead).slice(0, 5)

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
      info: 'info',
      warning: 'warning',
      success: 'success',
      error: 'danger'
    }
    return variants[severity] || 'default'
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
      style={{
        top: anchorEl ? anchorEl.offsetHeight + 8 : 0
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
          <Link href="/admin/protected/notifications" onClick={onClose}>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-96 overflow-y-auto">
        {unreadNotifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            <p>No new notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {unreadNotifications.map((notification) => {
              const link = getLink(notification)
              const content = (
                <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">{getIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">
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
                  </div>
                </div>
              )

              if (link) {
                return (
                  <Link
                    key={notification.id}
                    href={link}
                    onClick={() => {
                      onMarkAsRead(notification.id)
                      onClose()
                    }}
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <div
                  key={notification.id}
                  onClick={() => {
                    onMarkAsRead(notification.id)
                    onClose()
                  }}
                  className="cursor-pointer"
                >
                  {content}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {unreadNotifications.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center">
          <Link
            href="/admin/protected/notifications"
            className="text-sm text-primary-600 hover:text-primary-700"
            onClick={onClose}
          >
            View all {unreadNotifications.length} notifications
          </Link>
        </div>
      )}
    </div>
  )
}