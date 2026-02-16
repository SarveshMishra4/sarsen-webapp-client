'use client'

import { BlueprintData, BlueprintFormData, BlueprintMilestone, BlueprintSection, BlueprintResource } from '@/types/blueprint.types'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

// FIX: Use a union type that accepts either full BlueprintData or BlueprintFormData
interface BlueprintPreviewProps {
  blueprint: (Partial<BlueprintData> & BlueprintFormData) | BlueprintData
}

export const BlueprintPreview: React.FC<BlueprintPreviewProps> = ({
  blueprint
}) => {
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

  const getMilestoneLabel = (value: number): string => {
    const milestoneMap: Record<number, string> = {
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
    return milestoneMap[value] || String(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">{blueprint.serviceName}</h1>
        <p className="text-gray-600 mt-1">Code: {blueprint.serviceCode}</p>
        <p className="text-gray-600">Slug: /services/{blueprint.serviceSlug}</p>
        <div className="mt-4 flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            blueprint.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {blueprint.isActive ? 'Active' : 'Inactive'}
          </span>
          {'version' in blueprint && blueprint.version && (
            <span className="text-sm text-gray-500">Version {blueprint.version}</span>
          )}
          <span className="text-sm text-gray-500">
            Default Progress: {blueprint.defaultProgress}%
          </span>
          <span className="text-sm text-gray-500">
            Messaging: {blueprint.messagingEnabledByDefault ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Milestones</h2>
          <p className="text-sm text-gray-500">
            {blueprint.milestones.length} milestones configured
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {blueprint.milestones.map((milestone: BlueprintMilestone) => (
              <div key={milestone.value} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-16 px-2 py-1 bg-primary-100 text-primary-800 rounded-md text-sm font-mono text-center">
                  {milestone.value}%
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{milestone.label}</h3>
                  {milestone.description && (
                    <p className="text-sm text-gray-500">{milestone.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Dashboard Sections */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Dashboard Sections</h2>
          <p className="text-sm text-gray-500">
            {blueprint.sections.length} sections configured
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {blueprint.sections
              .sort((a: BlueprintSection, b: BlueprintSection) => a.order - b.order)
              .map((section: BlueprintSection) => (
                <div key={section.id || section.order} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">#{section.order}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        {section.type}
                      </span>
                      <h3 className="font-medium text-gray-900">{section.title}</h3>
                    </div>
                    {!section.isVisible && (
                      <span className="text-xs text-gray-400">Hidden</span>
                    )}
                  </div>
                  {section.description && (
                    <p className="text-sm text-gray-600">{section.description}</p>
                  )}
                  {section.type === 'custom' && section.content && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                        {section.content}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </CardBody>
      </Card>

      {/* Resources */}
      {blueprint.resources.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Resources</h2>
            <p className="text-sm text-gray-500">
              {blueprint.resources.length} resources pre-seeded
            </p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blueprint.resources.map((resource: BlueprintResource, index: number) => (
                <div key={resource.id || index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{resourceIcons[resource.type] || '📁'}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{resource.title}</h4>
                    {resource.description && (
                      <p className="text-sm text-gray-500">{resource.description}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                        {resource.type}
                      </span>
                      {resource.isPublic && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                          Public
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}