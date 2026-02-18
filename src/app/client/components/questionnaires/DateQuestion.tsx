'use client'

import { Question } from '@/types/questionnaire.types'
import { DatePicker } from '@/components/ui/DatePicker'

interface DateQuestionProps {
  question: Question
  value: string | null
  onChange: (value: string) => void
  error?: string
}

export const DateQuestion: React.FC<DateQuestionProps> = ({
  question,
  value = '',
  onChange,
  error
}) => {
  return (
    <DatePicker
      label={question.questionText}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      required={question.required}
      error={error}
      helpText={question.required ? 'Required' : 'Optional'}
    />
  )
}