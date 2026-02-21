'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useEngagement } from '@/hooks/useEngagement'
import { EngagementCard } from '../../components/EngagementCard'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'

export default function ClientDashboardPage() {
  const { engagements, isLoading, fetchMyEngagements } = useEngagement()

  useEffect(() => {
    fetchMyEngagements()
  }, [fetchMyEngagements])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (engagements.length === 0) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Engagements Yet
            </h2>
            <p className="text-gray-600 mb-8">
              You haven't purchased any services yet. Browse our services to get started.
            </p>
            <Link href="/services">
              <Button variant="primary">Browse Services</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Engagements</h1>
        <p className="text-gray-600 mt-1">
          You have {engagements.length} active engagement{engagements.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engagements.map((engagement) => (
          <EngagementCard key={engagement.id} engagement={engagement} />
        ))}
      </div>
    </div>
  )
}