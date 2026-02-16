'use client'

import { useState } from 'react'
import { BlueprintSection } from '@/types/blueprint.types'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface SectionBuilderProps {
  sections: BlueprintSection[]
  onChange: (sections: BlueprintSection[]) => void
}

const sectionTypes = [
  {
    type: 'milestones' as const,
    label: 'Milestones',
    description: 'Progress tracking section',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    type: 'resources' as const,
    label: 'Resources',
    description: 'Documents and links section',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    type: 'questionnaires' as const,
    label: 'Questionnaires',
    description: 'Form and data collection section',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    type: 'instructions' as const,
    label: 'Instructions',
    description: 'Guidance and information section',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    type: 'custom' as const,
    label: 'Custom',
    description: 'Custom HTML/content section',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  }
]

export const SectionBuilder: React.FC<SectionBuilderProps> = ({
  sections,
  onChange
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [showTypeSelector, setShowTypeSelector] = useState(false)

  const handleAddSection = (type: BlueprintSection['type']) => {
    const newSection: BlueprintSection = {
      type,
      title: `New ${type} Section`,
      description: '',
      order: sections.length + 1,
      isVisible: true
    }
    onChange([...sections, newSection])
    setShowTypeSelector(false)
  }

  const handleUpdateSection = (index: number, updates: Partial<BlueprintSection>) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], ...updates }
    onChange(newSections)
  }

  const handleRemoveSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
      .map((section, idx) => ({ ...section, order: idx + 1 }))
    onChange(newSections)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newSections = [...sections]
    const [draggedItem] = newSections.splice(draggedIndex, 1)
    newSections.splice(index, 0, draggedItem)
    
    // Update order property
    const reordered = newSections.map((section, idx) => ({
      ...section,
      order: idx + 1
    }))
    
    onChange(reordered)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={section.id || index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className="bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:border-primary-300 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">#{section.order}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                {section.type}
              </span>
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleUpdateSection(index, { title: e.target.value })}
                className="text-sm font-medium border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500"
                placeholder="Section title"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={section.isVisible}
                  onChange={(e) => handleUpdateSection(index, { isVisible: e.target.checked })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600">Visible</span>
              </label>
              <button
                onClick={() => handleRemoveSection(index)}
                className="text-red-600 hover:text-red-800"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <textarea
            value={section.description || ''}
            onChange={(e) => handleUpdateSection(index, { description: e.target.value })}
            rows={2}
            className="w-full text-sm border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500"
            placeholder="Section description (optional)"
          />

          {section.type === 'custom' && (
            <textarea
              value={section.content || ''}
              onChange={(e) => handleUpdateSection(index, { content: e.target.value })}
              rows={4}
              className="w-full mt-3 text-sm font-mono border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500"
              placeholder="Custom HTML content..."
            />
          )}
        </div>
      ))}

      {/* Add Section Button */}
      {showTypeSelector ? (
        <Card>
          <CardBody>
            <h4 className="font-medium mb-3">Select Section Type</h4>
            <div className="grid grid-cols-2 gap-3">
              {sectionTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => handleAddSection(type.type)}
                  className="flex items-start p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                >
                  <span className="text-primary-600 mr-3">{type.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs text-gray-500">{type.description}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-3 text-right">
              <Button variant="outline" size="sm" onClick={() => setShowTypeSelector(false)}>
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => setShowTypeSelector(true)}>
          Add Section
        </Button>
      )}
    </div>
  )
}