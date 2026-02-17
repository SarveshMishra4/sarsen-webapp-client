'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { paymentService } from '@/services/payment.service'
import { publicService } from '@/services/public.service'
import { useToast } from './useToast'
import { ApplicationFormData, CheckoutStep, PaymentOrderResponse } from '@/types/payment.types'
import { loadRazorpayScript, openRazorpayCheckout, RAZORPAY_KEY } from '@/lib/razorpay'
import { getServiceBySlug } from '@/config/services'

const initialFormData: ApplicationFormData = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  company: '',
  designation: '',
  website: '',
  companySize: '',
  serviceCode: '',
  serviceName: '',
  amount: 0,
  currency: 'INR',
  couponCode: '',
  discountAmount: 0,
  finalAmount: 0
}

export const useCheckout = (serviceSlug: string) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('contact')
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [isRazorpayReady, setIsRazorpayReady] = useState(false)
  const [orderResponse, setOrderResponse] = useState<PaymentOrderResponse | null>(null)
  const [couponValid, setCouponValid] = useState<boolean | null>(null)
  const [couponMessage, setCouponMessage] = useState<string>('')
  
  const { success, error } = useToast()
  const router = useRouter()

  // Load service data on mount
  useEffect(() => {
    const loadService = async () => {
      const service = getServiceBySlug(serviceSlug)
      if (!service) {
        error('Service not found')
        router.push('/services')
        return
      }

      // Validate service with backend
      try {
        const validation = await publicService.validateService(serviceSlug)
        if (!validation.data?.isActive) {
          error('This service is currently unavailable')
          router.push('/services')
          return
        }

        setFormData(prev => ({
          ...prev,
          serviceCode: service.serviceCode,
          serviceName: service.title,
          amount: validation.data?.price || service.price,
          finalAmount: validation.data?.price || service.price,
          currency: service.currency
        }))
      } catch (err) {
        error('Failed to validate service')
      }
    }

    loadService()
  }, [serviceSlug, router, error])

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = async () => {
      const ready = await loadRazorpayScript()
      setIsRazorpayReady(ready)
      if (!ready) {
        error('Failed to load payment gateway. Please try again.')
      }
    }
    loadRazorpay()
  }, [error])

  // Update form data
  const updateFormData = (data: Partial<ApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  // Validate coupon
  const validateCoupon = useCallback(async (code: string) => {
    if (!code.trim()) {
      setCouponValid(null)
      setCouponMessage('')
      return
    }

    setIsLoading(true)
    try {
      // Mock validation - replace with actual API call when backend is ready
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simulate coupon validation
      if (code.toUpperCase() === 'SAVE10') {
        const discount = Math.round(formData.amount * 0.1)
        setCouponValid(true)
        setCouponMessage(`10% discount applied! You save ₹${discount}`)
        updateFormData({ 
          couponCode: code, 
          discountAmount: discount,
          finalAmount: formData.amount - discount
        })
      } else if (code.toUpperCase() === 'SAVE20') {
        const discount = Math.round(formData.amount * 0.2)
        setCouponValid(true)
        setCouponMessage(`20% discount applied! You save ₹${discount}`)
        updateFormData({ 
          couponCode: code, 
          discountAmount: discount,
          finalAmount: formData.amount - discount
        })
      } else {
        setCouponValid(false)
        setCouponMessage('Invalid coupon code')
        updateFormData({ 
          couponCode: '', 
          discountAmount: 0,
          finalAmount: formData.amount
        })
      }
    } catch (err: any) {
      setCouponValid(false)
      setCouponMessage(err.message || 'Failed to validate coupon')
    } finally {
      setIsLoading(false)
    }
  }, [formData.amount])

  // Navigate between steps
  const goToStep = (step: CheckoutStep) => {
    setCurrentStep(step)
  }

  const nextStep = () => {
    const steps: CheckoutStep[] = ['contact', 'company', 'coupon', 'payment']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const steps: CheckoutStep[] = ['contact', 'company', 'coupon', 'payment']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  // Create payment order
  const createOrder = useCallback(async () => {
    if (!isRazorpayReady) {
      error('Payment gateway not ready')
      return
    }

    setIsLoading(true)
    try {
      const response = await paymentService.createOrder({
        amount: formData.finalAmount || formData.amount,
        currency: formData.currency,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        phone: formData.phone,
        serviceCode: formData.serviceCode,
        serviceName: formData.serviceName,
        couponCode: formData.couponCode,
        discountAmount: formData.discountAmount
      })

      if (response.success && response.data) {
        setOrderResponse(response.data)
        return response.data
      } else {
        error(response.message || 'Failed to create order')
      }
    } catch (err: any) {
      error(err.message || 'Failed to create order')
    } finally {
      setIsLoading(false)
    }
  }, [formData, isRazorpayReady, error])

  // Process payment
  const processPayment = useCallback(async () => {
    const order = await createOrder()
    if (!order) return

    openRazorpayCheckout({
      key: RAZORPAY_KEY,
      amount: order.razorpayOrder.amount,
      currency: order.razorpayOrder.currency,
      name: 'Sarsen Strategy Partners',
      description: formData.serviceName,
      order_id: order.razorpayOrder.id,
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        contact: formData.phone
      },
      handler: async (response: any) => {
        try {
          setIsLoading(true)
          const verifyResponse = await paymentService.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })

          if (verifyResponse.success && verifyResponse.data) {
            success('Payment successful! Your engagement has been created.')
            setCurrentStep('success')
            // Store engagement info for credentials display
            if (verifyResponse.data.engagement) {
              sessionStorage.setItem('newEngagement', JSON.stringify(verifyResponse.data.engagement))
            }
          } else {
            error(verifyResponse.message || 'Payment verification failed')
            router.push('/payment/failure')
          }
        } catch (err: any) {
          error(err.message || 'Payment verification failed')
          router.push('/payment/failure')
        } finally {
          setIsLoading(false)
        }
      },
      modal: {
        ondismiss: () => {
          // User closed the modal without paying
          console.log('Payment modal dismissed')
        }
      }
    })
  }, [createOrder, formData, success, error, router])

  // Reset form
  const resetCheckout = () => {
    setFormData(initialFormData)
    setCurrentStep('contact')
    setOrderResponse(null)
    setCouponValid(null)
    setCouponMessage('')
  }

  return {
    // State
    currentStep,
    formData,
    isLoading,
    isRazorpayReady,
    orderResponse,
    couponValid,
    couponMessage,

    // Actions
    updateFormData,
    validateCoupon,
    goToStep,
    nextStep,
    prevStep,
    processPayment,
    resetCheckout
  }
}