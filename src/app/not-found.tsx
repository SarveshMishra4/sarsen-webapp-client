import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function Custom404Page() {
  return (
    <Section background="white" spacing="lg">
      <Container maxWidth="sm">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                Go Home
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}