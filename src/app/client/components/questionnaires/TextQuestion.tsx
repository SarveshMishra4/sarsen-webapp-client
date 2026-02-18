'use client'

import { Question } from '@/types/questionnaire.types'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface TextQuestionProps {
  question: Question
  value: string | null
  onChange: (value: string) => void
  error?: string
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  value = '',
  onChange,
  error
}) => {
  if (question.questionType === 'textarea') {
    return (
      <Textarea
        label={question.questionText}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
        required={question.required}
        error={error}
        helpText={question.required ? 'Required' : 'Optional'}
      />
    )
  }

  return (
    <Input
      label={question.questionText}
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer here..."
      required={question.required}
      error={error}
      helpText={question.required ? 'Required' : 'Optional'}
    />
  )
}