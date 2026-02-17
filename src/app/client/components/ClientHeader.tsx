'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useEngagement } from '@/hooks/useEngagement'
import { Button } from '@/components/ui/Button'
// Import the types if needed
import { ClientUser } from '@/types/auth.types'

export const ClientHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEngagementSwitcherOpen, setIsEngagementSwitcherOpen] = useState(false)
  
  const { user, logout } = useAuth()
  const { engagements, fetchMyEngagements } = useEngagement()
  const pathname = usePathname()

  // FIX: Type guard to check if user is ClientUser
  const isClientUser = (user: any): user is ClientUser => {
    return user && 'firstName' in user && 'lastName' in user
  }

  const handleEngagementSwitcherOpen = async () => {
    setIsEngagementSwitcherOpen(true)
    await fetchMyEngagements()
  }

  const currentEngagementId = pathname?.includes('/client/dashboard/') 
    ? pathname.split('/').pop() 
    : null

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/client/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-primary-600">
                Client Portal
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Engagement Switcher */}
            <div className="relative">
              <button
                onClick={handleEngagementSwitcherOpen}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              >
                <span>Switch Engagement</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isEngagementSwitcherOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsEngagementSwitcherOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20 py-1">
                    {engagements.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-gray-500">No engagements found</p>
                    ) : (
                      engagements.map((eng) => (
                        <Link
                          key={eng.id}
                          href={`/client/dashboard/${eng.id}`}
                          className={`
                            block px-4 py-2 text-sm hover:bg-gray-100
                            ${currentEngagementId === eng.id ? 'bg-primary-50 text-primary-600' : 'text-gray-700'}
                          `}
                          onClick={() => setIsEngagementSwitcherOpen(false)}
                        >
                          <div className="font-medium">{eng.serviceName}</div>
                          <div className="text-xs text-gray-500">ID: {eng.engagementId}</div>
                        </Link>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            {/* User Info - FIX: Use type guard */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  {isClientUser(user) 
                    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() 
                    : user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={async () => {
                await fetchMyEngagements()
                setIsEngagementSwitcherOpen(!isEngagementSwitcherOpen)
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Switch Engagement
            </button>
            
            {isEngagementSwitcherOpen && (
              <div className="pl-6 space-y-1">
                {engagements.map((eng) => (
                  <Link
                    key={eng.id}
                    href={`/client/dashboard/${eng.id}`}
                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsEngagementSwitcherOpen(false)
                    }}
                  >
                    {eng.serviceName}
                  </Link>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-700">
                  {isClientUser(user) 
                    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() 
                    : user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}