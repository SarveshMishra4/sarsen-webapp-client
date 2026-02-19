'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ServiceCard } from '@/components/public/ServiceCard'
import { getAllServices } from '@/config/services'
import { ServiceWithValidation } from '@/types/public.types'

interface ServiceClientProps {
  initialService: ServiceWithValidation
  slug: string
}

export default function ServiceClient({ initialService, slug }: ServiceClientProps) {
  const [service] = useState<ServiceWithValidation>({
    ...initialService,
    isValidated: true,
    isActive: true
  })

  const relatedServices = getAllServices()
    .filter(s => s.slug !== slug)
    .slice(0, 3)

  const displayPrice = service.price

  return (
    <>
      <Section background="primary" spacing="md">
        <Container>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary-600">Services</Link>
            <span>/</span>
            <span className="text-gray-900">{service.title}</span>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <img src={service.icon} alt="" className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {service.title}
                </h1>
              </div>

              <div className="prose max-w-none">
                <p className="text-xl text-gray-600 mb-6">
                  {service.subtitle}
                </p>

                <p className="text-gray-700 mb-8">
                  {service.longDescription}
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-primary-600">
                    ${displayPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-500 block text-sm">
                    {service.currency}
                  </span>
                  <span className="text-gray-500 text-sm block mt-1">
                    {service.duration}
                  </span>
                </div>

                <Link href={`/apply/${slug}`}>
                  <Button variant="primary" size="lg" fullWidth>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {relatedServices.length > 0 && (
        <Section background="gray">
          <Container>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((service) => (
                <ServiceCard key={service.slug} service={service} variant="compact" />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
