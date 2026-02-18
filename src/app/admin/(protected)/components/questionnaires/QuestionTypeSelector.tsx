'use client'

import { QuestionType } from '@/types/questionnaire.types'

interface QuestionTypeSelectorProps {
  onSelect: (type: QuestionType) => void
}

const questionTypes: Array<{ type: QuestionType; label: string; icon: string; description: string }> = [
  {
    type: 'text',
    label: 'Short Text',
    icon: '📝',
    description: 'Single line text input'
  },
  {
    type: 'textarea',
    label: 'Long Text',
    icon: '📄',
    description: 'Multi-line text area'
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: '⬇️',
    description: 'Single selection from dropdown'
  },
  {
    type: 'multiselect',
    label: 'Multi-select',
    icon: '🔲',
    description: 'Multiple selections from list'
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: '📎',
    description: 'Upload documents or images'
  },
  {
    type: 'date',
    label: 'Date',
    icon: '📅',
    description: 'Date picker'
  }
]

export const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {questionTypes.map((qt) => (
        <button
          key={qt.type}
          onClick={() => onSelect(qt.type)}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
        >
          <span className="text-3xl mb-2">{qt.icon}</span>
          <span className="text-sm font-medium text-gray-900">{qt.label}</span>
          <span className="text-xs text-gray-500 text-center mt-1">{qt.description}</span>
        </button>
      ))}
    </div>
  )
}