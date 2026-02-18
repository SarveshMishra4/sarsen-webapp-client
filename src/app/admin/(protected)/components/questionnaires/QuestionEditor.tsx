'use client'

import { useState } from 'react'
import { Question, QuestionType } from '@/types/questionnaire.types'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'

interface QuestionEditorProps {
  question: Question
  index: number
  onUpdate: (index: number, updates: Partial<Question>) => void
  onRemove: (index: number) => void
  onMoveUp?: (index: number) => void
  onMoveDown?: (index: number) => void
  isFirst?: boolean
  isLast?: boolean
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  index,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) => {
  const [showOptions, setShowOptions] = useState(!!question.options?.length)

  const handleAddOption = () => {
    const newOption = {
      id: `opt-${Date.now()}`,
      value: `option-${(question.options?.length || 0) + 1}`,
      label: `Option ${(question.options?.length || 0) + 1}`
    }
    const updatedOptions = [...(question.options || []), newOption]
    onUpdate(index, { options: updatedOptions })
  }

  const handleUpdateOption = (optIndex: number, field: 'value' | 'label', value: string) => {
    const updatedOptions = [...(question.options || [])]
    updatedOptions[optIndex] = { ...updatedOptions[optIndex], [field]: value }
    onUpdate(index, { options: updatedOptions })
  }

  const handleRemoveOption = (optIndex: number) => {
    const updatedOptions = question.options?.filter((_, i) => i !== optIndex)
    onUpdate(index, { options: updatedOptions })
  }

  const requiresOptions = question.questionType === 'select' || question.questionType === 'multiselect'

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">#{index + 1}</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
            {question.questionType}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {onMoveUp && !isFirst && (
            <button
              onClick={() => onMoveUp(index)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
          {onMoveDown && !isLast && (
            <button
              onClick={() => onMoveDown(index)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          <button
            onClick={() => onRemove(index)}
            className="p-1 text-red-400 hover:text-red-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <Input
          placeholder="Question text"
          value={question.questionText}
          onChange={(e) => onUpdate(index, { questionText: e.target.value })}
        />

        {question.questionType === 'textarea' && (
          <Textarea
            placeholder="Placeholder text (optional)"
            value={question.answer as string || ''}
            onChange={(e) => onUpdate(index, { answer: e.target.value })}
          />
        )}

        {requiresOptions && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Options</span>
              <Button variant="outline" size="sm" onClick={handleAddOption}>
                Add Option
              </Button>
            </div>
            
            {question.options?.map((option, optIndex) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Input
                  placeholder="Option label"
                  value={option.label}
                  onChange={(e) => handleUpdateOption(optIndex, 'label', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Value"
                  value={option.value}
                  onChange={(e) => handleUpdateOption(optIndex, 'value', e.target.value)}
                  className="flex-1"
                />
                <button
                  onClick={() => handleRemoveOption(optIndex)}
                  className="p-2 text-red-400 hover:text-red-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center">
          <Checkbox
            label="Required"
            checked={question.required}
            onChange={(e) => onUpdate(index, { required: e.target.checked })}
          />
        </div>
      </div>
    </div>
  )
}