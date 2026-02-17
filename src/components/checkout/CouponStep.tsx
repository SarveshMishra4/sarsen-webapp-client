'use client'

import { useState } from 'react'
import { ApplicationFormData } from '@/types/payment.types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface CouponStepProps {
    formData: ApplicationFormData
    onUpdate: (data: Partial<ApplicationFormData>) => void
    onNext: () => void
    onBack: () => void
    onValidateCoupon: (code: string) => Promise<void>
    couponValid: boolean | null
    couponMessage: string
    isLoading: boolean
}

export const CouponStep: React.FC<CouponStepProps> = ({
    formData,
    onUpdate,
    onNext,
    onBack,
    onValidateCoupon,
    couponValid,
    couponMessage,
    isLoading
}) => {
    const [code, setCode] = useState(formData.couponCode || '')
    const [isApplying, setIsApplying] = useState(false)

    const handleApplyCoupon = async () => {
        if (!code.trim()) return

        setIsApplying(true)
        await onValidateCoupon(code)
        setIsApplying(false)
    }

    const handleSkip = () => {
        onNext()
    }

    const handleContinue = () => {
        onNext()
    }

    const displayAmount = formData.finalAmount || formData.amount
    const originalAmount = formData.amount
    const hasDiscount = formData.discountAmount && formData.discountAmount > 0
    // FIX: Create boolean variable for disabled state
    const isInputDisabled = !!(isApplying || hasDiscount)

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Apply Coupon</h2>

            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{formData.serviceName}</span>
                </div>

                {hasDiscount ? (
                    <>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Original Amount:</span>
                            <span className="text-gray-500 line-through">
                                {formData.currency} {originalAmount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2 text-green-600">
                            <span>Discount Applied:</span>
                            <span>- {formData.currency} {formData.discountAmount?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Final Amount:</span>
                            <span className="text-primary-600">
                                {formData.currency} {displayAmount.toLocaleString()}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Amount:</span>
                        <span className="text-primary-600">
                            {formData.currency} {displayAmount.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            placeholder="Enter coupon code"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            // FIX: Convert to boolean using !!
                            disabled={!!(isApplying || hasDiscount)}
                        />
                    </div>
                    {!hasDiscount ? (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleApplyCoupon}
                            disabled={!code.trim() || isApplying || isLoading}
                            isLoading={isApplying}
                        >
                            Apply
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setCode('')
                                onUpdate({ couponCode: '', discountAmount: 0, finalAmount: formData.amount })
                            }}
                        >
                            Remove
                        </Button>
                    )}
                </div>

                {couponMessage && (
                    <p className={`text-sm ${couponValid ? 'text-green-600' : 'text-red-600'}`}>
                        {couponMessage}
                    </p>
                )}

                <p className="text-xs text-gray-500">
                    * Coupon codes are case-insensitive. Try "SAVE10" for 10% off or "SAVE20" for 20% off.
                </p>
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>
                    Back
                </Button>
                <div className="space-x-3">
                    <Button type="button" variant="outline" onClick={handleSkip}>
                        Skip
                    </Button>
                    <Button type="button" variant="primary" onClick={handleContinue}>
                        Continue to Payment
                    </Button>
                </div>
            </div>
        </div>
    )
}