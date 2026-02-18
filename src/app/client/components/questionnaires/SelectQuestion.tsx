'use client'

import { Question } from '@/types/questionnaire.types'

interface SelectQuestionProps {
  question: Question
  value: string | null
  onChange: (value: string) => void
  error?: string
}

export const SelectQuestion: React.FC<SelectQuestionProps> = ({
  question,
  value = '',
  onChange,
  error
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={`
          block w-full rounded-md shadow-sm sm:text-sm
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
          }
        `}
      >
        <option value="">Select an option</option>
        {question.options?.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {!error && (
        <p className="text-sm text-gray-500">
          {question.required ? 'Required' : 'Optional'}
        </p>
      )}
    </div>
  )
}