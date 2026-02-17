import { CredentialsDisplay } from '@/components/checkout/CredentialsDisplay'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CredentialsDisplay />
      </div>
    </div>
  )
}