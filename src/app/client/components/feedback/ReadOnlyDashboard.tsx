'use client'

import { ReactNode } from 'react'

interface ReadOnlyDashboardProps {
  children: ReactNode
}

export const ReadOnlyDashboard: React.FC<ReadOnlyDashboardProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Read-only overlay */}
      <div className="absolute inset-0 bg-gray-50 bg-opacity-75 z-10 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center pointer-events-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Read-Only Mode</h3>
          <p className="text-sm text-gray-500 mb-4">
            This engagement is complete and in read-only mode. You can view all content but cannot make changes.
          </p>
          <div className="text-xs text-gray-400">
            Thank you for your feedback!
          </div>
        </div>
      </div>

      {/* Original content (dimmed) */}
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  )
}