'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useBlueprint } from '@/hooks/useBlueprint'
import { BlueprintTable } from '../components/BlueprintTable'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function BlueprintsPage() {
  const { blueprints, isLoading, fetchBlueprints, deleteBlueprint } = useBlueprint()
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchBlueprints(filter === 'all' ? undefined : filter === 'active')
  }, [fetchBlueprints, filter])

  const filteredBlueprints = blueprints.filter(blueprint => {
    if (search) {
      const searchLower = search.toLowerCase()
      return (
        blueprint.serviceName.toLowerCase().includes(searchLower) ||
        blueprint.serviceCode.toLowerCase().includes(searchLower) ||
        blueprint.serviceSlug.toLowerCase().includes(searchLower)
      )
    }
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Blueprints</h1>
          <p className="text-gray-600 mt-1">
            Define templates for services - these determine what clients see in their dashboard
          </p>
        </div>
        <Link href="/admin/blueprints/new">
          <Button variant="primary">Create New Blueprint</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'active'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'inactive'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Inactive
          </button>
        </div>

        <div className="w-full sm:w-64">
          <Input
            type="text"
            placeholder="Search blueprints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <BlueprintTable
        blueprints={filteredBlueprints}
        onDelete={deleteBlueprint}
        isLoading={isLoading}
      />
    </div>
  )
}