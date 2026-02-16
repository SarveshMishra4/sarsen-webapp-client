import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { ServiceCard } from '@/components/public/ServiceCard'
import { services } from '@/config/services'

export default function ServicesPage() {
  return (
    <>
      <Section background="primary" spacing="md">
        <Container>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl text-center">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Specialized consulting services designed for growth-stage companies
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Not sure which service is right for you?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Schedule a free consultation to discuss your needs and goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Contact Us
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}