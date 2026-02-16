'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
import { 
  BlueprintMilestone, 
  BlueprintSection, 
  BlueprintResource, 
  BlueprintFormData,
  UpdateBlueprintInput,
  MilestoneValue
} from '@/types/blueprint.types'
import { MILESTONES, ALLOWED_MILESTONES } from '@/utils/constants'

type Step = 'basics' | 'milestones' | 'sections' | 'resources' | 'preview'

export default function EditBlueprintPage() {
  const params = useParams()
  const serviceCode = params.serviceCode as string
  const router = useRouter()
  
  const [currentStep, setCurrentStep] = useState<Step>('basics')
  
  const [formData, setFormData] = useState<BlueprintFormData>({
  serviceCode: '',
  serviceName: '',
  serviceSlug: '',
  defaultProgress: MILESTONES.START,  // This is already MilestoneValue (10)
  messagingEnabledByDefault: true,
  isActive: true,
  milestones: [],
  sections: [],
  resources: []
})

  const { blueprint, isLoading, fetchBlueprintByCode, updateBlueprint, deleteBlueprint } = useBlueprint()
  const { error, success } = useToast()

  useEffect(() => {
    if (serviceCode) {
      fetchBlueprintByCode(serviceCode)
    }
  }, [serviceCode, fetchBlueprintByCode])

  useEffect(() => {
    if (blueprint) {
      setFormData({
        serviceCode: blueprint.serviceCode,
        serviceName: blueprint.serviceName,
        serviceSlug: blueprint.serviceSlug,
        defaultProgress: blueprint.defaultProgress,
        messagingEnabledByDefault: blueprint.messagingEnabledByDefault,
        isActive: blueprint.isActive,
        milestones: blueprint.milestones,
        sections: blueprint.sections,
        resources: blueprint.resources
      })
    }
  }, [blueprint])

  const steps: { id: Step; label: string }[] = [
    { id: 'basics', label: 'Basic Information' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'sections', label: 'Dashboard Sections' },
    { id: 'resources', label: 'Resources' },
    { id: 'preview', label: 'Preview' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  const handleNext = () => {
    const stepIndex = steps.findIndex(s => s.id === currentStep)
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

  const handleSave = async () => {
    // SIMPLE FIX: Validate and cast in one step
    if (!ALLOWED_MILESTONES.includes(formData.defaultProgress as MilestoneValue)) {
      error('Invalid default progress value')
      return
    }

    // SIMPLE FIX: Direct cast after validation
    const updateData: UpdateBlueprintInput = {
      serviceName: formData.serviceName,
      milestones: formData.milestones,
      sections: formData.sections,
      resources: formData.resources,
      defaultProgress: formData.defaultProgress as MilestoneValue, // Safe cast after validation
      messagingEnabledByDefault: formData.messagingEnabledByDefault,
      isActive: formData.isActive
    }

    await updateBlueprint(serviceCode, updateData)
  }

  const handleToggleActive = async () => {
    await updateBlueprint(serviceCode, {
      isActive: !formData.isActive
    })
    setFormData(prev => ({ ...prev, isActive: !prev.isActive }))
    success(`Blueprint ${!formData.isActive ? 'activated' : 'deactivated'} successfully`)
  }

  const handleDelete = async () => {
    await deleteBlueprint(serviceCode)
  }

  if (isLoading && !blueprint) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (!blueprint) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Blueprint not found</p>
        <Link href="/admin/blueprints">
          <Button variant="primary">Back to Blueprints</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Blueprint</h1>
            <p className="text-gray-600 mt-1">
              {formData.serviceCode} - {formData.serviceName}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant={formData.isActive ? 'danger' : 'secondary'}
              onClick={handleToggleActive}
            >
              {formData.isActive ? 'Deactivate' : 'Activate'}
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep === step.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }
                `}
              >
                {index + 1}
              </button>
              {index < steps.length - 1 && (
                <div className="w-24 h-0.5 mx-2 bg-gray-200" />
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
                label="Service Code"
                value={formData.serviceCode}
                disabled
                helpText="Service code cannot be changed"
              />

              <Input
                label="Service Name"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
              />

              <Input
                label="Service Slug"
                value={formData.serviceSlug}
                disabled
                helpText="Service slug cannot be changed"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Progress
                  </label>
                  <select
                    name="defaultProgress"
                    value={formData.defaultProgress}
                    onChange={handleSelectChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value={MILESTONES.START}>10% - Start</option>
                    <option value={MILESTONES.EARLY_PROGRESS}>20% - Early Progress</option>
                    <option value={MILESTONES.QUARTER}>25% - Quarter</option>
                    <option value={MILESTONES.ONE_THIRD}>30% - One Third</option>
                    <option value={MILESTONES.MID_PROGRESS}>40% - Mid Progress</option>
                    <option value={MILESTONES.HALF}>50% - Half</option>
                    <option value={MILESTONES.ADVANCED}>60% - Advanced</option>
                    <option value={MILESTONES.NEAR_COMPLETE}>70% - Near Complete</option>
                    <option value={MILESTONES.THREE_QUARTER}>75% - Three Quarter</option>
                    <option value={MILESTONES.ALMOST_DONE}>80% - Almost Done</option>
                    <option value={MILESTONES.FINAL_STAGE}>90% - Final Stage</option>
                    <option value={MILESTONES.COMPLETED}>100% - Completed</option>
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
            <BlueprintPreview 
              blueprint={{ 
                ...formData, 
                version: blueprint?.version || 1,
                createdAt: blueprint?.createdAt,
                updatedAt: blueprint?.updatedAt,
                createdBy: blueprint?.createdBy
              }} 
            />
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
          
          <Button
            type="button"
            variant="primary"
            onClick={handleSave}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  )
}