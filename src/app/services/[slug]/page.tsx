import { notFound } from 'next/navigation'
import { getServiceBySlug, getAllServices } from '@/config/services'
import ServiceClient from './client'

interface ServicePageProps {
  params: {
    slug: string
  }
}

// Generate all service pages at build time
export async function generateStaticParams() {
  const services = getAllServices()

  return services.map((service) => ({
    slug: service.slug,
  }))
}

// Fully static page
export default function ServicePage({ params }: ServicePageProps) {
  const staticService = getServiceBySlug(params.slug)

  if (!staticService) {
    notFound()
  }

  const service = {
    ...staticService,
    isValidated: true,
    isActive: true
  }

  return (
    <ServiceClient 
      initialService={service} 
      slug={params.slug} 
    />
  )
}

// No revalidation needed for fully static pages
export const dynamic = 'force-static'
