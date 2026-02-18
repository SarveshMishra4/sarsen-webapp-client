'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useNotifications } from '@/hooks/useNotifications'
import { NotificationDropdown } from './NotificationDropdown'

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { unreadCount, fetchUnreadCount, markAsRead, getRelativeTime, getIcon, getColor, getLink } = useNotifications()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    fetchUnreadCount()
    // Poll every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [fetchUnreadCount])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationDropdown
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onMarkAsRead={markAsRead}
          anchorEl={buttonRef.current}
        />
      )}
    </div>
  )
}