'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuestionnaire } from '@/hooks/useQuestionnaire'
import { QuestionnaireList } from '../components/questionnaires/QuestionnaireList'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AdminQuestionnairesPage() {
  const { questionnaires, isLoading, fetchQuestionnaires } = useQuestionnaire()
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'overdue'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchQuestionnaires(filter === 'all' ? undefined : filter)
  }, [fetchQuestionnaires, filter])

  const filteredQuestionnaires = questionnaires.filter(q => {
    if (search) {
      return q.title.toLowerCase().includes(search.toLowerCase()) ||
             q.description?.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Questionnaires</h1>
          <p className="text-gray-600 mt-1">
            Create and manage client questionnaires
          </p>
        </div>
        <Link href="/admin/protected/questionnaires/new">
          <Button variant="primary">Create Questionnaire</Button>
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
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'pending'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'submitted'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Submitted
          </button>
          <button
            onClick={() => setFilter('overdue')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'overdue'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Overdue
          </button>
        </div>

        <div className="w-full sm:w-64">
          <Input
            type="text"
            placeholder="Search questionnaires..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <QuestionnaireList
        questionnaires={filteredQuestionnaires}
        isLoading={isLoading}
        onRefresh={() => fetchQuestionnaires(filter === 'all' ? undefined : filter)}
      />
    </div>
  )
}