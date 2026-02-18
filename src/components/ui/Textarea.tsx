'use client'

import React, { forwardRef, useId } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helpText, className = '', id: providedId, rows = 4, ...props }, ref) => {
    const generatedId = useId()
    const textareaId = providedId || `textarea-${generatedId}`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`
            block w-full rounded-md shadow-sm sm:text-sm
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
            }
            ${className}
          `}
          {...props}
        />
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

Textarea.displayName = 'Textarea'