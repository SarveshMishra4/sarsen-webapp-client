'use client'

import { DashboardTopPerformers } from '@/types/dashboard.types'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/utils/dashboard.utils'

interface TopServicesTableProps {
  topPerformers: DashboardTopPerformers | null
  isLoading?: boolean
}

export const TopServicesTable: React.FC<TopServicesTableProps> = ({
  topPerformers,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardBody>
      </Card>
    )
  }

  if (!topPerformers) {
    return (
      <Card>
        <CardBody>
          <p className="text-gray-500 text-center py-8">No data available</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Services by Engagement Count */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Top Services by Engagement</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {topPerformers.services.map((service, index) => (
              <div key={service.serviceCode} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-6">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{service.serviceName}</p>
                    <p className="text-xs text-gray-500">{service.serviceCode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{service.engagementCount}</p>
                  <p className="text-xs text-gray-500">{formatCurrency(service.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Top Rated Services */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Top Rated Services</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {topPerformers.rated.map((service, index) => (
              <div key={service.serviceCode} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-6">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{service.serviceName}</p>
                    <p className="text-xs text-gray-500">{service.serviceCode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Badge variant="primary" size="sm">
                      {service.averageRating.toFixed(1)} ★
                    </Badge>
                    <span className="text-xs text-gray-500">
                      ({service.feedbackCount})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}