'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'  // Use useRouter instead of notFound
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ServiceCard } from '@/components/public/ServiceCard'
import { getServiceBySlug, getAllServices } from '@/config/services'
import { publicService } from '@/services/public.service'
import { ServiceWithValidation } from '@/types/public.types'
import { useToast } from '@/hooks/useToast'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const [service, setService] = useState<ServiceWithValidation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)  // Add local notFound state
  const { error } = useToast()
  const router = useRouter()  // Use router for navigation
  
  const relatedServices = getAllServices()
    .filter(s => s.slug !== params.slug)
    .slice(0, 3)

  useEffect(() => {
    const loadService = async () => {
      const staticService = getServiceBySlug(params.slug)
      
      if (!staticService) {
        // FIX: Don't call notFound() directly, set state and let component handle it
        setNotFound(true)
        setIsLoading(false)
        return
      }

      try {
        // Validate with backend
        const response = await publicService.validateService(params.slug)
        
        setService({
          ...staticService,
          isValidated: true,
          isActive: response.data?.isActive ?? false,
          backendPrice: response.data?.price
        })
      } catch (err: any) {
        error('Failed to validate service. Please try again.')
        setService({
          ...staticService,
          isValidated: false,
          isActive: false
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadService()
  }, [params.slug, error])

  // FIX: Handle 404 separately - this runs after render, not during async
  useEffect(() => {
    if (notFound) {
      router.replace('/404')  // Redirect to custom 404 page
    }
  }, [notFound, router])

  if (isLoading) {
    return (
      <Section>
        <Container>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        </Container>
      </Section>
    )
  }

  // Show 404 UI while redirecting (prevents flash of wrong content)
  if (notFound) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The service you're looking for doesn't exist.
            </p>
            <Link href="/services">
              <Button variant="primary">View All Services</Button>
            </Link>
          </div>
        </Container>
      </Section>
    )
  }

  if (!service || !service.isActive) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Service Unavailable
            </h1>
            <p className="text-gray-600 mb-8">
              This service is currently not available. Please check back later or contact us for more information.
            </p>
            <Link href="/services">
              <Button variant="primary">View All Services</Button>
            </Link>
          </div>
        </Container>
      </Section>
    )
  }

  const displayPrice = service.backendPrice || service.price

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
            {/* Main Content */}
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

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Deliverables
                </h2>
                <ul className="space-y-3 mb-8">
                  {service.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-gray-700">{deliverable}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.methodology.title}
                </h2>
                <ol className="list-decimal list-inside space-y-3 mb-8">
                  {service.methodology.steps.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>

                {/* FAQs */}
                {service.faqs && service.faqs.length > 0 && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 mb-8">
                      {service.faqs.map((faq, index) => (
                        <div key={index}>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-700">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
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

                <Link href={`/services/${service.slug}/apply`}>
                  <Button variant="primary" size="lg" fullWidth>
                    Get Started
                  </Button>
                </Link>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">
                    Have questions?
                  </p>
                  <Link href="/contact" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Services */}
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