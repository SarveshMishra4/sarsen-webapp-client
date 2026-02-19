import { notFound } from 'next/navigation'
import { getServiceBySlug, getAllServices } from '@/config/services'
import { publicService } from '@/services/public.service'
import ServiceClient from './client'

interface ServicePageProps {
  params: {
    slug: string
  }
}

// THIS RUNS AT BUILD TIME - generates all possible service pages
export async function generateStaticParams() {
  const services = getAllServices()
  
  return services.map((service) => ({
    slug: service.slug,
  }))
}

// THIS RUNS ON THE SERVER when a user visits the page
export default async function ServicePage({ params }: ServicePageProps) {
  // 1. Check if service exists in our static config
  const staticService = getServiceBySlug(params.slug)
  
  // 2. If not found, return 404 immediately (no page will be generated)
  if (!staticService) {
    notFound()
    return null
  }

  try {
    // 3. Validate with backend to get latest price/availability
    const response = await publicService.validateService(params.slug)
    
    const service = {
      ...staticService,
      isValidated: true,
      isActive: response.data?.isActive ?? false,
      backendPrice: response.data?.price
    }

    // 4. Pass data to client component for interactive parts
    return <ServiceClient initialService={service} slug={params.slug} />
    
  } catch (error) {
    // 5. If backend fails, still show service but mark as not validated
    const service = {
      ...staticService,
      isValidated: false,
      isActive: false
    }
    return <ServiceClient initialService={service} slug={params.slug} />
  }
}

// OPTIONAL: Set revalidation time (if you want to update prices periodically)
export const revalidate = 3600 // Revalidate every hour