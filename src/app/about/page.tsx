import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { COMPANY_INFO } from '@/utils/constants'

export default function AboutPage() {
  return (
    <>
      <Section background="primary" spacing="md">
        <Container>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl text-center">
            About Sarsen Strategy
          </h1>
          <p className="mt-4 text-xl text-gray-600 text-center max-w-3xl mx-auto">
            We help growth-stage companies navigate their most critical challenges
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in {COMPANY_INFO.founded}, Sarsen Strategy Partners emerged from a simple observation: 
                growth-stage companies face unique challenges that require specialized expertise. Traditional 
                consulting firms are either too expensive or not equipped to handle the specific needs of 
                scaling businesses.
              </p>
              <p className="text-gray-600 mb-4">
                We built Sarsen Strategy to bridge this gap. Our team brings decades of experience from 
                venture capital, investment banking, and operational leadership roles at high-growth startups. 
                We understand the journey because we've been there ourselves.
              </p>
              <p className="text-gray-600">
                Today, we work with founders and leadership teams across the globe, helping them raise capital, 
                refine their pitch, and execute successful go-to-market strategies. Our approach is hands-on, 
                practical, and always focused on measurable results.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <img 
                src="/images/about.jpg" 
                alt="Sarsen Strategy Team"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="gray">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrity First</h3>
              <p className="text-gray-600">
                We always put our clients' interests first and provide honest, unbiased advice.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Results-Driven</h3>
              <p className="text-gray-600">
                We measure our success by the tangible outcomes we deliver for our clients.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaborative</h3>
              <p className="text-gray-600">
                We work alongside your team, not in a silo, ensuring knowledge transfer and alignment.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}