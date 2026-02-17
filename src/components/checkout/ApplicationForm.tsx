'use client'

import { ApplicationFormData, CheckoutStep } from '@/types/payment.types'
import { ContactInfoStep } from './ContactInfoStep'
import { CompanyDetailsStep } from './CompanyDetailsStep'
import { CouponStep } from './CouponStep'
import { PaymentSummary } from './PaymentSummary'

interface ApplicationFormProps {
  currentStep: CheckoutStep
  formData: ApplicationFormData
  isLoading: boolean
  isRazorpayReady: boolean
  couponValid: boolean | null
  couponMessage: string
  onUpdateForm: (data: Partial<ApplicationFormData>) => void
  onValidateCoupon: (code: string) => Promise<void>
  onNextStep: () => void
  onPrevStep: () => void
  onProcessPayment: () => Promise<void>
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  currentStep,
  formData,
  isLoading,
  isRazorpayReady,
  couponValid,
  couponMessage,
  onUpdateForm,
  onValidateCoupon,
  onNextStep,
  onPrevStep,
  onProcessPayment
}) => {
  const renderStep = () => {
    switch (currentStep) {
      case 'contact':
        return (
          <ContactInfoStep
            formData={formData}
            onUpdate={onUpdateForm}
            onNext={onNextStep}
          />
        )

      case 'company':
        return (
          <CompanyDetailsStep
            formData={formData}
            onUpdate={onUpdateForm}
            onNext={onNextStep}
            onBack={onPrevStep}
          />
        )

      case 'coupon':
        return (
          <CouponStep
            formData={formData}
            onUpdate={onUpdateForm}
            onNext={onNextStep}
            onBack={onPrevStep}
            onValidateCoupon={onValidateCoupon}
            couponValid={couponValid}
            couponMessage={couponMessage}
            isLoading={isLoading}
          />
        )

      case 'payment':
        return (
          <PaymentSummary
            formData={formData}
            onBack={onPrevStep}
            onProcessPayment={onProcessPayment}
            isLoading={isLoading}
            isRazorpayReady={isRazorpayReady}
          />
        )

      default:
        return null
    }
  }

  const steps = [
    { id: 'contact', label: 'Contact', completed: currentStep !== 'contact' },
    { id: 'company', label: 'Company', completed: ['coupon', 'payment', 'success'].includes(currentStep) },
    { id: 'coupon', label: 'Coupon', completed: ['payment', 'success'].includes(currentStep) },
    { id: 'payment', label: 'Payment', completed: currentStep === 'success' }
  ]

  if (currentStep === 'success') {
    return null // Success is handled by separate page
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step.completed
                  ? 'bg-green-100 text-green-800'
                  : step.id === currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }
              `}>
                {step.completed ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-24 h-0.5 mx-2
                  ${step.completed ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map(step => (
            <span key={step.id} className="text-xs text-gray-500">{step.label}</span>
          ))}
        </div>
      </div>

      {/* Current Step Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {renderStep()}
      </div>
    </div>
  )
}