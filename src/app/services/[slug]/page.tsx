import { notFound } from 'next/navigation'
import { getServiceBySlug, getAllServices } from '@/config/services'
import ServiceClient from './client'

export async function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }))
}

export const dynamicParams = false

export default function ServicePage({
  params,
}: {
  params: { slug: string }
}) {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <ServiceClient
      initialService={{
        ...service,
        isValidated: true,
        isActive: true,
      }}
      slug={params.slug}
    />
  )
}
