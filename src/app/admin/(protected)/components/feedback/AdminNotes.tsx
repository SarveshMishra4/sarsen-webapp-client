'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'

interface AdminNotesProps {
  notes?: string
  onSave: (notes: string) => Promise<void>
}

export const AdminNotes: React.FC<AdminNotesProps> = ({
  notes,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [currentNotes, setCurrentNotes] = useState(notes || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(currentNotes)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setCurrentNotes(notes || '')
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-700">Admin Notes</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Edit
          </button>
        </div>
        {currentNotes ? (
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{currentNotes}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">No notes added yet</p>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Admin Notes</h3>
      <Textarea
        value={currentNotes}
        onChange={(e) => setCurrentNotes(e.target.value)}
        placeholder="Add internal notes about this feedback..."
        rows={4}
        className="mb-3"
      />
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={handleSave}
          isLoading={isSaving}
        >
          Save Notes
        </Button>
      </div>
    </div>
  )
}