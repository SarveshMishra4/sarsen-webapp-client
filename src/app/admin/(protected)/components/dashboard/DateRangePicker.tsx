'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface DateRangePickerProps {
  startDate?: string
  endDate?: string
  onApply: (startDate?: string, endDate?: string) => void
  onReset: () => void
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onApply,
  onReset
}) => {
  const [startDate, setStartDate] = useState(initialStartDate || '')
  const [endDate, setEndDate] = useState(initialEndDate || '')
  const [isOpen, setIsOpen] = useState(false)

  const handleApply = () => {
    onApply(startDate || undefined, endDate || undefined)
    setIsOpen(false)
  }

  const handleReset = () => {
    setStartDate('')
    setEndDate('')
    onReset()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>
          {startDate && endDate
            ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
            : 'Select Date Range'}
        </span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20 p-4">
            <div className="space-y-4">
              <Input
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                type="date"
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Reset
                </Button>
                <Button variant="primary" size="sm" onClick={handleApply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}