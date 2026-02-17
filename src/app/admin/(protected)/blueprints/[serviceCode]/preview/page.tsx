'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useBlueprint } from '@/hooks/useBlueprint'
import { Button } from '@/components/ui/Button'
import { BlueprintPreview } from '../../../components/BlueprintPreview'

export default function PreviewBlueprintPage() {
  const params = useParams()
  const serviceCode = params.serviceCode as string
  const { blueprint, isLoading, fetchBlueprintByCode } = useBlueprint()

  useEffect(() => {
    if (serviceCode) {
      fetchBlueprintByCode(serviceCode)
    }
  }, [serviceCode, fetchBlueprintByCode])

  if (isLoading) {
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
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Blueprint Preview</h1>
        <div className="flex space-x-3">
          <Link href={`/admin/blueprints/${serviceCode}`}>
            <Button variant="outline">Edit Blueprint</Button>
          </Link>
          <Link href="/admin/blueprints">
            <Button variant="outline">Back to List</Button>
          </Link>
        </div>
      </div>

      <BlueprintPreview blueprint={blueprint} />
    </div>
  )
}