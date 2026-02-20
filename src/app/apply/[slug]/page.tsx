'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCheckout } from '@/hooks/useCheckout'
import { ApplicationForm } from '@/components/checkout/ApplicationForm'

export default function ApplyPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const {
    currentStep,
    formData,
    isLoading,
    isRazorpayReady,
    couponValid,
    couponMessage,
    updateFormData,
    validateCoupon,
    nextStep,
    prevStep,
    processPayment
  } = useCheckout(slug)

  // Redirect to success page when payment is successful
  useEffect(() => {
    if (currentStep === 'success') {
      router.replace('/payment/success')
    }
  }, [currentStep, router])

  if (currentStep === 'success') {
    return null // Will be redirected to success page
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ApplicationForm
          currentStep={currentStep}
          formData={formData}
          isLoading={isLoading}
          isRazorpayReady={isRazorpayReady}
          couponValid={couponValid}
          couponMessage={couponMessage}
          onUpdateForm={updateFormData}
          onValidateCoupon={validateCoupon}
          onNextStep={nextStep}
          onPrevStep={prevStep}
          onProcessPayment={processPayment}
        />
      </div>
    </div>
  )
}