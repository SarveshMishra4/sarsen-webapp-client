'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { blueprintService } from '@/services/blueprint.service'
import { useToast } from './useToast'
import { 
  BlueprintData, 
  CreateBlueprintInput, 
  UpdateBlueprintInput,
  BlueprintMilestone,
  BlueprintSection,
  BlueprintResource,
  MilestoneValue
} from '@/types/blueprint.types'
import { ALLOWED_MILESTONES } from '@/utils/constants'

export const useBlueprint = () => {
  const [blueprints, setBlueprints] = useState<BlueprintData[]>([])
  const [blueprint, setBlueprint] = useState<BlueprintData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const { success, error } = useToast()
  const router = useRouter()

  // Fetch all blueprints
  const fetchBlueprints = useCallback(async (active?: boolean) => {
    setIsLoading(true)
    try {
      const response = await blueprintService.getBlueprints(active !== undefined ? { active } : undefined)
      if (response.success && response.data) {
        setBlueprints(response.data.blueprints)
        setTotalCount(response.data.count)
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch blueprints')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Fetch single blueprint by code
  const fetchBlueprintByCode = useCallback(async (serviceCode: string) => {
    setIsLoading(true)
    try {
      const response = await blueprintService.getBlueprintByCode(serviceCode)
      if (response.success && response.data) {
        setBlueprint(response.data.blueprint)
        return response.data.blueprint
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch blueprint')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  // Create new blueprint
  const createBlueprint = useCallback(async (data: CreateBlueprintInput) => {
    setIsLoading(true)
    try {
      const response = await blueprintService.createBlueprint(data)
      if (response.success && response.data) {
        success('Blueprint created successfully')
        router.push('/admin/blueprints')
        return response.data.blueprint
      }
    } catch (err: any) {
      error(err.message || 'Failed to create blueprint')
    } finally {
      setIsLoading(false)
    }
  }, [success, error, router])

  // Update blueprint
  const updateBlueprint = useCallback(async (serviceCode: string, data: UpdateBlueprintInput) => {
    setIsLoading(true)
    try {
      const response = await blueprintService.updateBlueprint(serviceCode, data)
      if (response.success && response.data) {
        success('Blueprint updated successfully')
        setBlueprint(response.data.blueprint)
        return response.data.blueprint
      }
    } catch (err: any) {
      error(err.message || 'Failed to update blueprint')
    } finally {
      setIsLoading(false)
    }
  }, [success, error])

  // Delete (deactivate) blueprint
  const deleteBlueprint = useCallback(async (serviceCode: string) => {
    if (!confirm('Are you sure you want to deactivate this blueprint? This action can be reversed by reactivating.')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await blueprintService.deleteBlueprint(serviceCode)
      if (response.success) {
        success('Blueprint deactivated successfully')
        // Refresh list
        fetchBlueprints()
        router.push('/admin/blueprints')
      }
    } catch (err: any) {
      error(err.message || 'Failed to deactivate blueprint')
    } finally {
      setIsLoading(false)
    }
  }, [success, error, router, fetchBlueprints])

  // Validate milestone value
  const isValidMilestone = (value: number): value is MilestoneValue => {
    return ALLOWED_MILESTONES.includes(value as MilestoneValue)
  }

  // Get milestone label
  const getMilestoneLabel = (value: MilestoneValue): string => {
    const milestoneMap: Record<MilestoneValue, string> = {
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

  // Reorder milestones
  const reorderMilestones = (milestones: BlueprintMilestone[], startIndex: number, endIndex: number) => {
    const result = Array.from(milestones)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  // Reorder sections
  const reorderSections = (sections: BlueprintSection[], startIndex: number, endIndex: number) => {
    const result = Array.from(sections)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    // Update order property
    return result.map((section, index) => ({ ...section, order: index + 1 }))
  }

  // Add milestone
  const addMilestone = (milestones: BlueprintMilestone[], value: MilestoneValue) => {
    if (!isValidMilestone(value)) return milestones
    if (milestones.some(m => m.value === value)) return milestones // No duplicates
    
    const label = getMilestoneLabel(value)
    return [...milestones, { value, label }].sort((a, b) => a.value - b.value)
  }

  // Remove milestone
  const removeMilestone = (milestones: BlueprintMilestone[], value: MilestoneValue) => {
    return milestones.filter(m => m.value !== value)
  }

  // Add section
  const addSection = (sections: BlueprintSection[], type: BlueprintSection['type']) => {
    const newSection: BlueprintSection = {
      type,
      title: `New ${type} Section`,
      description: '',
      order: sections.length + 1,
      isVisible: true
    }
    return [...sections, newSection]
  }

  // Update section
  const updateSection = (sections: BlueprintSection[], index: number, updates: Partial<BlueprintSection>) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], ...updates }
    return newSections
  }

  // Remove section
  const removeSection = (sections: BlueprintSection[], index: number) => {
    return sections.filter((_, i) => i !== index).map((section, idx) => ({
      ...section,
      order: idx + 1
    }))
  }

  // Add resource
  const addResource = (resources: BlueprintResource[], resource: BlueprintResource) => {
    return [...resources, { ...resource, id: crypto.randomUUID() }]
  }

  // Update resource
  const updateResource = (resources: BlueprintResource[], index: number, updates: Partial<BlueprintResource>) => {
    const newResources = [...resources]
    newResources[index] = { ...newResources[index], ...updates }
    return newResources
  }

  // Remove resource
  const removeResource = (resources: BlueprintResource[], index: number) => {
    return resources.filter((_, i) => i !== index)
  }

  return {
    // State
    blueprints,
    blueprint,
    isLoading,
    totalCount,

    // CRUD operations
    fetchBlueprints,
    fetchBlueprintByCode,
    createBlueprint,
    updateBlueprint,
    deleteBlueprint,

    // Milestone helpers
    isValidMilestone,
    getMilestoneLabel,
    reorderMilestones,
    addMilestone,
    removeMilestone,

    // Section helpers
    reorderSections,
    addSection,
    updateSection,
    removeSection,

    // Resource helpers
    addResource,
    updateResource,
    removeResource
  }
}