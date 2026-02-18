'use client'

import { useState } from 'react'
import { Question } from '@/types/questionnaire.types'
import { FileUpload } from '@/components/ui/FileUpload'

interface FileQuestionProps {
  question: Question
  value: File | null
  onChange: (file: File | null) => void
  error?: string
}

export const FileQuestion: React.FC<FileQuestionProps> = ({
  question,
  value,
  onChange,
  error
}) => {
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (file: File) => {
    setFileName(file.name)
    onChange(file)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <FileUpload
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
        maxSize={10}
        error={error}
        helpText={question.required ? 'Required. Max 10MB' : 'Optional. Max 10MB'}
      />

      {fileName && (
        <p className="text-sm text-green-600">
          Selected: {fileName}
        </p>
      )}
    </div>
  )
}