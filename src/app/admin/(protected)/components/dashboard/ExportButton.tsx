'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface ExportButtonProps {
  onExport: (format: 'csv' | 'pdf' | 'excel') => Promise<void>
  disabled?: boolean
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  onExport,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    setIsExporting(true)
    try {
      await onExport(format)
    } finally {
      setIsExporting(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isExporting}
        className="flex items-center space-x-2"
      >
        {isExporting ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export</span>
          </>
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-1">
            <button
              onClick={() => handleExport('csv')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as CSV
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as PDF
            </button>
          </div>
        </>
      )}
    </div>
  )
}