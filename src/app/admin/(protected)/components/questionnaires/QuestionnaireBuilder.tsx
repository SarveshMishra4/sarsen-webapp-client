'use client'

import { useState } from 'react'
import { QuestionType, QuestionnaireFormData } from '@/types/questionnaire.types'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { DatePicker } from '@/components/ui/DatePicker'
import { Button } from '@/components/ui/Button'
import { QuestionTypeSelector } from './QuestionTypeSelector'
import { QuestionEditor } from './QuestionEditor'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface QuestionnaireBuilderProps {
  formData: QuestionnaireFormData
  onUpdate: (data: Partial<QuestionnaireFormData>) => void
  onAddQuestion: (type: QuestionType) => void
  onUpdateQuestion: (index: number, updates: any) => void
  onRemoveQuestion: (index: number) => void
  onReorderQuestions: (startIndex: number, endIndex: number) => void
}

export const QuestionnaireBuilder: React.FC<QuestionnaireBuilderProps> = ({
  formData,
  onUpdate,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion,
  onReorderQuestions
}) => {
  const [showTypeSelector, setShowTypeSelector] = useState(false)

  const handleMoveUp = (index: number) => {
    onReorderQuestions(index, index - 1)
  }

  const handleMoveDown = (index: number) => {
    onReorderQuestions(index, index + 1)
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Basic Information</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Questionnaire Title *"
              value={formData.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="e.g., Fundraising Strategy Intake Form"
            />

            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Brief description of this questionnaire"
              rows={2}
            />

            <Textarea
              label="Instructions"
              value={formData.instructions}
              onChange={(e) => onUpdate({ instructions: e.target.value })}
              placeholder="Instructions for the client on how to fill this form"
              rows={3}
            />

            <DatePicker
              label="Deadline (Optional)"
              value={formData.deadline || ''}
              onChange={(e) => onUpdate({ deadline: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              helpText="Leave empty for no deadline"
            />
          </div>
        </CardBody>
      </Card>

      {/* Questions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Questions</h3>
          <p className="text-sm text-gray-500">
            {formData.questions.length} question{formData.questions.length !== 1 ? 's' : ''} added
          </p>
        </CardHeader>
        <CardBody>
          {formData.questions.length > 0 ? (
            <div className="space-y-4 mb-6">
              {formData.questions.map((question, index) => (
                <QuestionEditor
                  key={question.id || index}
                  question={question as any}
                  index={index}
                  onUpdate={onUpdateQuestion}
                  onRemove={onRemoveQuestion}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  isFirst={index === 0}
                  isLast={index === formData.questions.length - 1}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No questions added yet. Click "Add Question" to get started.
            </p>
          )}

          {showTypeSelector ? (
            <div className="mt-4">
              <QuestionTypeSelector onSelect={(type) => {
                onAddQuestion(type)
                setShowTypeSelector(false)
              }} />
              <div className="mt-3 text-right">
                <Button variant="outline" onClick={() => setShowTypeSelector(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="primary" onClick={() => setShowTypeSelector(true)}>
              Add Question
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  )
}