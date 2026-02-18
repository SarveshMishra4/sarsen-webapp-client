'use client'

import React, { forwardRef, useId } from 'react'

interface RadioOption {
  value: string
  label: string
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helpText?: string
  options: RadioOption[]
  name: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, helpText, options, name, className = '', id: providedId, ...props }, ref) => {
    const generatedId = useId()
    const groupId = providedId || `radio-${generatedId}`

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="space-y-2">
          {options.map((option, index) => {
            const optionId = `${groupId}-option-${index}`
            return (
              <div key={option.value} className="flex items-center">
                <input
                  ref={ref}
                  id={optionId}
                  type="radio"
                  name={name}
                  value={option.value}
                  className={`
                    h-4 w-4 border-gray-300 text-primary-600 
                    focus:ring-primary-500
                    ${className}
                  `}
                  {...props}
                />
                <label
                  htmlFor={optionId}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            )
          })}
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

Radio.displayName = 'Radio'