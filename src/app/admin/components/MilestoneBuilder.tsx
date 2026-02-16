'use client'

import { useState } from 'react'
import { BlueprintMilestone, MilestoneValue } from '@/types/blueprint.types'
import { ALLOWED_MILESTONES } from '@/utils/constants'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface MilestoneBuilderProps {
  milestones: BlueprintMilestone[]
  onChange: (milestones: BlueprintMilestone[]) => void
  onReorder?: (startIndex: number, endIndex: number) => void
}

export const MilestoneBuilder: React.FC<MilestoneBuilderProps> = ({
  milestones,
  onChange,
  onReorder
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const availableMilestones = ALLOWED_MILESTONES.filter(
    value => !milestones.some(m => m.value === value)
  )

  const handleAddMilestone = (value: MilestoneValue) => {
    const label = getMilestoneLabel(value)
    const newMilestones = [...milestones, { value, label }]
      .sort((a, b) => a.value - b.value)
    onChange(newMilestones)
  }

  const handleRemoveMilestone = (value: MilestoneValue) => {
    const newMilestones = milestones.filter(m => m.value !== value)
    onChange(newMilestones)
  }

  const handleUpdateLabel = (value: MilestoneValue, newLabel: string) => {
    const newMilestones = milestones.map(m =>
      m.value === value ? { ...m, label: newLabel } : m
    )
    onChange(newMilestones)
  }

  const handleUpdateDescription = (value: MilestoneValue, description: string) => {
    const newMilestones = milestones.map(m =>
      m.value === value ? { ...m, description } : m
    )
    onChange(newMilestones)
  }

  const getMilestoneLabel = (value: MilestoneValue): string => {
    const defaultLabels: Record<MilestoneValue, string> = {
      10: 'Start',
      20: 'Early Progress',
      25: 'Quarter',
      30: 'One Third',
      40: 'Mid Progress',
      50: 'Half',
      60: 'Advanced',
      70: 'Near Complete',
      75: 'Three Quarter',
      80: 'Almost Done',
      90: 'Final Stage',
      100: 'Completed'
    }
    return defaultLabels[value] || String(value)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newMilestones = [...milestones]
    const [draggedItem] = newMilestones.splice(draggedIndex, 1)
    newMilestones.splice(index, 0, draggedItem)
    
    onChange(newMilestones)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-6">
      {/* Selected Milestones */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Milestones</h3>
          <p className="text-sm text-gray-500">
            Drag to reorder. These represent key progress points in the engagement.
          </p>
        </CardHeader>
        <CardBody>
          {milestones.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No milestones selected. Add milestones from the list below.
            </p>
          ) : (
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.value}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className="bg-gray-50 rounded-lg p-4 cursor-move hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-mono bg-primary-100 text-primary-800 px-2 py-1 rounded">
                          {milestone.value}%
                        </span>
                        <input
                          type="text"
                          value={milestone.label}
                          onChange={(e) => handleUpdateLabel(milestone.value, e.target.value)}
                          className="flex-1 text-sm border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Milestone label"
                        />
                        <button
                          onClick={() => handleRemoveMilestone(milestone.value)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <textarea
                        value={milestone.description || ''}
                        onChange={(e) => handleUpdateDescription(milestone.value, e.target.value)}
                        rows={2}
                        className="w-full text-sm border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Description (optional)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Available Milestones */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Available Milestones</h3>
          <p className="text-sm text-gray-500">
            Click to add milestones to your blueprint.
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {availableMilestones.map((value) => (
              <button
                key={value}
                onClick={() => handleAddMilestone(value as MilestoneValue)}
                className="px-3 py-2 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-md text-sm font-medium transition-colors"
              >
                {value}% - {getMilestoneLabel(value as MilestoneValue)}
              </button>
            ))}
            {availableMilestones.length === 0 && (
              <p className="text-gray-500">All milestones selected</p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}