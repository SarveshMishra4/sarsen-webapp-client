'use client'

import React, { forwardRef, useId } from 'react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helpText?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helpText, className = '', id: providedId, ...props }, ref) => {
    const generatedId = useId()
    const checkboxId = providedId || `checkbox-${generatedId}`

    return (
      <div className="w-full">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={`
                h-4 w-4 rounded border-gray-300 text-primary-600 
                focus:ring-primary-500
                ${className}
              `}
              {...props}
            />
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
          )}
        </div>
        {helpText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helpText}</p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'