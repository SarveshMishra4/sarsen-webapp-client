'use client'

import { ApplicationFormData } from '@/types/payment.types'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'

interface PaymentSummaryProps {
  formData: ApplicationFormData
  onBack: () => void
  onProcessPayment: () => Promise<void>
  isLoading: boolean
  isRazorpayReady: boolean
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  formData,
  onBack,
  onProcessPayment,
  isLoading,
  isRazorpayReady
}) => {
  const displayAmount = formData.finalAmount || formData.amount
  const hasDiscount = formData.discountAmount && formData.discountAmount > 0

  const handlePayment = async () => {
    await onProcessPayment()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Summary</h2>
      
      <Card>
        <CardBody>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{formData.serviceName}</span>
              </div>
              
              {hasDiscount && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({formData.couponCode}):</span>
                  <span>- {formData.currency} {formData.discountAmount?.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span className="text-primary-600">
                  {formData.currency} {displayAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}</p>
            <p><span className="text-gray-600">Email:</span> {formData.email}</p>
            <p><span className="text-gray-600">Phone:</span> {formData.phone}</p>
            <p><span className="text-gray-600">Company:</span> {formData.company}</p>
          </div>
        </CardBody>
      </Card>

      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium mb-1">Payment Security</p>
        <p>Your payment is securely processed by Razorpay. We do not store your card details.</p>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handlePayment}
          isLoading={isLoading}
          disabled={!isRazorpayReady || isLoading}
        >
          Pay {formData.currency} {displayAmount.toLocaleString()}
        </Button>
      </div>
    </div>
  )
}