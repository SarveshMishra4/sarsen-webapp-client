import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/config/services'
import { publicService } from '@/services/public.service'
import ServiceClient from '../[slug]/client'

interface ServicePageProps {
  params: {
    slug: string
  }
}

// This is a Server Component - runs on the server
export default async function ServicePage({ params }: ServicePageProps) {
  // 1. Validate slug server-side immediately
  const staticService = getServiceBySlug(params.slug)
  
  if (!staticService) {
    // 2. If invalid, trigger 404 immediately (server-side)
    notFound()
    return null
  }

  try {
    // 3. Validate with backend (server-side)
    const response = await publicService.validateService(params.slug)
    
    const service = {
      ...staticService,
      isValidated: true,
      isActive: response.data?.isActive ?? false,
      backendPrice: response.data?.price
    }

    // 4. Pass validated data to client component
    return <ServiceClient initialService={service} slug={params.slug} />
    
  } catch (error) {
    // 5. Handle backend validation failure gracefully
    const service = {
      ...staticService,
      isValidated: false,
      isActive: false
    }
    return <ServiceClient initialService={service} slug={params.slug} />
  }
}

// Generate static params for build-time rendering (optional but recommended)
export async function generateStaticParams() {
  const { getAllServices } = await import('@/config/services')
  const services = getAllServices()
  
  return services.map((service) => ({
    slug: service.slug,
  }))
}