import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Sarsen Strategy Partners
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Strategic consulting for growth-stage companies
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Button variant="primary" size="lg">
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin/Client Login Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8">
            <Link href="/admin/login" className="text-primary-600 hover:text-primary-700">
              Admin Login
            </Link>
            <Link href="/client/login" className="text-primary-600 hover:text-primary-700">
              Client Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}