'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useBlueprint } from '@/hooks/useBlueprint'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { MilestoneBuilder } from '../../components/MilestoneBuilder'
import { SectionBuilder } from '../../components/SectionBuilder'
import { ResourceManager } from '../../components/ResourceManager'
import { BlueprintPreview } from '../../components/BlueprintPreview'
import { BlueprintMilestone, BlueprintSection, BlueprintResource } from '@/types/blueprint.types'
import { MILESTONES } from '@/utils/constants'

type Step = 'basics' | 'milestones' | 'sections' | 'resources' | 'preview'

export default function NewBlueprintPage() {
  const [currentStep, setCurrentStep] = useState<Step>('basics')
  const [formData, setFormData] = useState({
    serviceCode: '',
    serviceName: '',
    serviceSlug: '',
    defaultProgress: MILESTONES.START,
    messagingEnabledByDefault: true,
    milestones: [] as BlueprintMilestone[],
    sections: [] as BlueprintSection[],
    resources: [] as BlueprintResource[]
  })

  const { createBlueprint, isLoading } = useBlueprint()
  const { error } = useToast()
  const router = useRouter()

  const steps: { id: Step; label: string }[] = [
    { id: 'basics', label: 'Basic Information' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'sections', label: 'Dashboard Sections' },
    { id: 'resources', label: 'Resources' },
    { id: 'preview', label: 'Preview & Save' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const validateBasics = (): boolean => {
    if (!formData.serviceCode) {
      error('Service code is required')
      return false
    }
    if (!formData.serviceCode.match(/^[A-Z0-9_]+$/)) {
      error('Service code must contain only uppercase letters, numbers, and underscores')
      return false
    }
    if (!formData.serviceName) {
      error('Service name is required')
      return false
    }
    if (!formData.serviceSlug) {
      error('Service slug is required')
      return false
    }
    if (!formData.serviceSlug.match(/^[a-z0-9-]+$/)) {
      error('Service slug must contain only lowercase letters, numbers, and hyphens')
      return false
    }
    return true
  }

  const handleNext = () => {
    const stepIndex = steps.findIndex(s => s.id === currentStep)
    
    if (currentStep === 'basics' && !validateBasics()) {
      return
    }

    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id)
    }
  }

  const handleBack = () => {
    const stepIndex = steps.findIndex(s => s.id === currentStep)
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id)
    }
  }

  const handleSubmit = async () => {
    if (formData.milestones.length === 0) {
      error('At least one milestone is required')
      setCurrentStep('milestones')
      return
    }

    await createBlueprint(formData)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Blueprint</h1>
        <p className="text-gray-600 mt-1">
          Define a template for a new service. This determines what clients see in their dashboard.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep === step.id
                  ? 'bg-primary-600 text-white'
                  : steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-600'
                }
              `}>
                {steps.findIndex(s => s.id === currentStep) > index ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-24 h-0.5 mx-2
                  ${steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                  }
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map(step => (
            <span key={step.id} className="text-xs text-gray-500">{step.label}</span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardBody>
          {currentStep === 'basics' && (
            <div className="space-y-4">
              <Input
                label="Service Code *"
                name="serviceCode"
                value={formData.serviceCode}
                onChange={handleInputChange}
                placeholder="e.g., SRV_FUND_001"
                helpText="Uppercase letters, numbers, and underscores only"
              />

              <Input
                label="Service Name *"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                placeholder="e.g., Fundraising Strategy"
              />

              <Input
                label="Service Slug *"
                name="serviceSlug"
                value={formData.serviceSlug}
                onChange={handleInputChange}
                placeholder="e.g., fundraising-strategy"
                helpText="Lowercase letters, numbers, and hyphens only. Used in URL."
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Progress
                  </label>
                  <select
                    name="defaultProgress"
                    value={formData.defaultProgress}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      defaultProgress: Number(e.target.value)
                    }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value={MILESTONES.START}>10% - Start</option>
                    <option value={MILESTONES.EARLY_PROGRESS}>20% - Early Progress</option>
                    <option value={MILESTONES.QUARTER}>25% - Quarter</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="messagingEnabledByDefault"
                    checked={formData.messagingEnabledByDefault}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Enable messaging by default
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'milestones' && (
            <MilestoneBuilder
              milestones={formData.milestones}
              onChange={(milestones) => setFormData(prev => ({ ...prev, milestones }))}
            />
          )}

          {currentStep === 'sections' && (
            <SectionBuilder
              sections={formData.sections}
              onChange={(sections) => setFormData(prev => ({ ...prev, sections }))}
            />
          )}

          {currentStep === 'resources' && (
            <ResourceManager
              resources={formData.resources}
              onChange={(resources) => setFormData(prev => ({ ...prev, resources }))}
            />
          )}

          {currentStep === 'preview' && (
            <BlueprintPreview blueprint={formData as any} />
          )}
        </CardBody>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 'basics'}
          >
            Back
          </Button>
          
          {currentStep === 'preview' ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Create Blueprint
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}