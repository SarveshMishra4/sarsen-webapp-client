'use client'

import { Question } from '@/types/questionnaire.types'

interface MultiselectQuestionProps {
  question: Question
  value: string[] | null
  onChange: (value: string[]) => void
  error?: string
}

export const MultiselectQuestion: React.FC<MultiselectQuestionProps> = ({
  question,
  value = [],
  onChange,
  error
}) => {
  const handleToggle = (optionValue: string) => {
    const currentValues = value || []
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter(v => v !== optionValue))
    } else {
      onChange([...currentValues, optionValue])
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="space-y-2 mt-2">
        {question.options?.map((option) => (
          <label key={option.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={(value || []).includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>

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