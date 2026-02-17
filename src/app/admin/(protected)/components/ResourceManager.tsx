'use client'

import { useState } from 'react'
import { BlueprintResource } from '@/types/blueprint.types'
import { RESOURCE_TYPES } from '@/utils/constants'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface ResourceManagerProps {
  resources: BlueprintResource[]
  onChange: (resources: BlueprintResource[]) => void
}

export const ResourceManager: React.FC<ResourceManagerProps> = ({
  resources,
  onChange
}) => {
  const [showForm, setShowForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<BlueprintResource>>({
    type: 'pdf',
    title: '',
    description: '',
    isPublic: false
  })

  const resourceIcons: Record<string, string> = {
    pdf: '📄',
    doc: '📝',
    excel: '📊',
    ppt: '📽️',
    link: '🔗',
    video: '🎥',
    image: '🖼️',
    other: '📁'
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title) return

    if (editingIndex !== null) {
      // Update existing
      const newResources = [...resources]
      newResources[editingIndex] = { ...newResources[editingIndex], ...formData }
      onChange(newResources)
    } else {
      // Add new
      const newResource: BlueprintResource = {
        ...formData as BlueprintResource,
        id: crypto.randomUUID()
      }
      onChange([...resources, newResource])
    }

    // Reset form
    setFormData({
      type: 'pdf',
      title: '',
      description: '',
      isPublic: false
    })
    setShowForm(false)
    setEditingIndex(null)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(resources[index])
    setShowForm(true)
  }

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      const newResources = resources.filter((_, i) => i !== index)
      onChange(newResources)
    }
  }

  const handleDuplicate = (index: number) => {
    const resource = { ...resources[index], id: crypto.randomUUID() }
    onChange([...resources, resource])
  }

  return (
    <div className="space-y-6">
      {/* Resource List */}
      {resources.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <Card key={resource.id || index}>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{resourceIcons[resource.type] || '📁'}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      {resource.description && (
                        <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                          {resource.type}
                        </span>
                        {resource.isPublic && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                            Public
                          </span>
                        )}
                      </div>
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-600 hover:text-primary-800 mt-2 inline-block"
                        >
                          {resource.url}
                        </a>
                      )}
                      {resource.fileName && (
                        <p className="text-xs text-gray-500 mt-1">
                          {resource.fileName} ({Math.round((resource.fileSize || 0) / 1024)} KB)
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-1 text-gray-400 hover:text-primary-600"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDuplicate(index)}
                      className="p-1 text-gray-400 hover:text-primary-600"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {editingIndex !== null ? 'Edit Resource' : 'Add New Resource'}
            </h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resource Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    {RESOURCE_TYPES.map(type => (
                      <option key={type} value={type}>
                        {type.toUpperCase()} {resourceIcons[type]}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Title *"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="URL"
                  name="url"
                  value={formData.url || ''}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />

                <Input
                  label="File Name"
                  name="fileName"
                  value={formData.fileName || ''}
                  onChange={handleInputChange}
                  placeholder="document.pdf"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="File Key (for storage)"
                  name="fileKey"
                  value={formData.fileKey || ''}
                  onChange={handleInputChange}
                />

                <Input
                  label="File Size (bytes)"
                  type="number"
                  name="fileSize"
                  value={formData.fileSize || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={formData.isPublic || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Public (visible to everyone, not just clients)
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingIndex(null)
                    setFormData({
                      type: 'pdf',
                      title: '',
                      description: '',
                      isPublic: false
                    })
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingIndex !== null ? 'Update' : 'Add'} Resource
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Add Button */}
      {!showForm && (
        <Button variant="outline" onClick={() => setShowForm(true)}>
          Add Resource
        </Button>
      )}
    </div>
  )
}