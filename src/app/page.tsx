import { Hero } from '@/components/public/Hero'
import { Features } from '@/components/public/Features'
import { Testimonials } from '@/components/public/Testimonials'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { services } from '@/config/services'

export default function HomePage() {
  const featureIcons = {
    fundraising: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    strategy: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    pitch: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }

  const features = [
    {
      title: 'Fundraising Strategy',
      description: 'Comprehensive fundraising roadmaps and investor-ready materials.',
      icon: featureIcons.fundraising
    },
    {
      title: 'GTM Strategy',
      description: 'Market entry and growth strategies tailored to your business.',
      icon: featureIcons.strategy
    },
    {
      title: 'Pitch Deck Design',
      description: 'Investor presentations that tell your story effectively.',
      icon: featureIcons.pitch
    }
  ]

  const testimonials = [
    {
      quote: "Sarsen Strategy helped us raise our Series A with their exceptional fundraising strategy. Their insights were invaluable.",
      author: "Sarah Chen",
      title: "CEO",
      company: "TechFlow"
    },
    {
      quote: "The pitch deck they designed for us received immediate praise from investors. We closed our round in 8 weeks.",
      author: "Michael Rodriguez",
      title: "Founder",
      company: "DataViz"
    },
    {
      quote: "Their GTM strategy completely transformed our approach to market. We exceeded our first-year targets by 40%.",
      author: "James Wilson",
      title: "CRO",
      company: "ScaleUp"
    }
  ]

  return (
    <>
      <Hero
        title="Strategic Consulting for Growth-Stage Companies"
        subtitle="Expert guidance in fundraising, go-to-market strategy, and pitch deck design to help you scale successfully."
      />

      <Features
        title="What We Do"
        subtitle="Specialized consulting services designed for growth-stage companies"
        features={features}
      />

      <Section background="white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the service that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <div key={service.slug} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">
                    ${service.price.toLocaleString()}
                  </span>
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="primary" size="lg">
              View All Services
            </Button>
          </Link>
        </div>
      </Section>

      <Testimonials
        title="What Our Clients Say"
        subtitle="Trusted by founders and leadership teams"
        testimonials={testimonials}
      />
    </>
  )
}