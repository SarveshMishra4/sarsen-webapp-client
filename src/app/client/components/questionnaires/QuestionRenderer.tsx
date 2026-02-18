'use client'

import { Question } from '@/types/questionnaire.types'
import { TextQuestion } from './TextQuestion'
import { SelectQuestion } from './SelectQuestion'
import { MultiselectQuestion } from './MultiselectQuestion'
import { FileQuestion } from './FileQuestion'
import { DateQuestion } from './DateQuestion'

interface QuestionRendererProps {
  question: Question
  value: any
  onChange: (value: any) => void
  error?: string
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  value,
  onChange,
  error
}) => {
  switch (question.questionType) {
    case 'text':
    case 'textarea':
      return (
        <TextQuestion
          question={question}
          value={value as string | null}
          onChange={onChange}
          error={error}
        />
      )

    case 'select':
      return (
        <SelectQuestion
          question={question}
          value={value as string | null}
          onChange={onChange}
          error={error}
        />
      )

    case 'multiselect':
      return (
        <MultiselectQuestion
          question={question}
          value={value as string[] | null}
          onChange={onChange}
          error={error}
        />
      )

    case 'file':
      return (
        <FileQuestion
          question={question}
          value={value as File | null}
          onChange={onChange}
          error={error}
        />
      )

    case 'date':
      return (
        <DateQuestion
          question={question}
          value={value as string | null}
          onChange={onChange}
          error={error}
        />
      )

    default:
      return null
  }
}