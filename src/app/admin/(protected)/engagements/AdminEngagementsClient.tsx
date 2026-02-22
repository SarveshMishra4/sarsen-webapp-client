'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useEngagement } from '@/hooks/useEngagement'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardBody } from '@/components/ui/Card'
import { format } from 'date-fns'

export default function AdminEngagementsClient() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'feedback'>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [serviceFilter, setServiceFilter] = useState('')

  const {
    allEngagements = [],
    isLoading,
    totalPages = 0,
    fetchAllEngagements,
  } = useEngagement()

  const { error } = useToast()

  useEffect(() => {
    const load = async () => {
      try {
        await fetchAllEngagements({
          page,
          limit: 20,
          isActive:
            filter === 'active'
              ? true
              : filter === 'completed'
              ? false
              : undefined,
          isCompleted: filter === 'completed' ? true : undefined,
          serviceCode: serviceFilter || undefined,
        })
      } catch (err) {
        error('Failed to load engagements')
      }
    }

    load()
  }, [filter, page, serviceFilter])

  useEffect(() => {
    console.log('UPDATED ENGAGEMENTS:', allEngagements)
  }, [allEngagements])

  const filteredEngagements = allEngagements.filter((eng: any) => {
    if (!search) return true

    const serviceName = eng.serviceName || ''
    const engagementId = eng.engagementId || ''

    return (
      serviceName.toLowerCase().includes(search.toLowerCase()) ||
      engagementId.toLowerCase().includes(search.toLowerCase())
    )
  })

  const getStatusBadge = (engagement: any) => {
    if (engagement.isCompleted) {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          Completed
        </span>
      )
    }
    if (!engagement.messagingAllowed) {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
          Feedback Required
        </span>
      )
    }
    return (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
        Active
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Engagements</h1>
          <p className="text-gray-600 mt-1">Manage all client engagements</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex space-x-2">
              {['all', 'active', 'completed', 'feedback'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    filter === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all'
                    ? 'All'
                    : type === 'active'
                    ? 'Active'
                    : type === 'completed'
                    ? 'Completed'
                    : 'Needs Feedback'}
                </button>
              ))}
            </div>

            <div className="flex-1 flex gap-2">
              <Input
                type="text"
                placeholder="Search by service or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />

              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-48 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">All Services</option>
                <option value="SRV_FUND_001">Fundraising Strategy</option>
                <option value="SRV_PITCH_001">Pitch Deck Design</option>
                <option value="SRV_GTM_001">GTM Strategy</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <Card>
        <CardBody className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
          ) : filteredEngagements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No engagements found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      'Engagement ID',
                      'Service',
                      'Client',
                      'Progress',
                      'Status',
                      'Started',
                      'Actions',
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEngagements.map((eng: any) => (
                    <tr key={eng._id || eng.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono">
                        {eng.engagementId}
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">
                          {eng.serviceName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {eng.serviceCode}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        Client Name
                        <div className="text-xs text-gray-500">
                          client@email.com
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{
                                width: `${eng.currentProgress || 0}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {eng.currentProgress || 0}%
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(eng)}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {eng.startDate
                          ? format(new Date(eng.startDate), 'MMM d, yyyy')
                          : '-'}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/engagements/${eng._id || eng.id}`}
                        >
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing page {page} of {totalPages}
          </p>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}