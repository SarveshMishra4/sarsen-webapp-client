import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ServiceConfig } from '@/config/services'

interface ServiceCardProps {
  service: ServiceConfig
  variant?: 'compact' | 'detailed'
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  variant = 'compact'
}) => {
  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <img src={service.icon} alt="" className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-primary-600">
              ${service.price.toLocaleString()}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {service.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {service.duration}
            </span>
            <Link href={`/services/${service.slug}`}>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
            <img src={service.icon} alt="" className="w-8 h-8" />
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary-600">
              ${service.price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm block">
              {service.currency}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {service.title}
        </h2>
        <p className="text-gray-600 mb-6">
          {service.longDescription}
        </p>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <Link href={`/services/${service.slug}/apply`}>
            <Button variant="primary" size="lg" fullWidth>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}