

export interface PaymentOrderRequest {
  amount: number
  currency: string
  email: string
  firstName?: string
  lastName?: string
  company?: string
  phone?: string
  serviceCode: string
  serviceName: string
  couponCode?: string
  discountAmount?: number
  metadata?: Record<string, any>
}

export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  created_at: number
}

export interface PaymentOrderResponse {
  success: boolean
  message?: string   // ✅ ADD THIS LINE
  data?: {
    order: any
    razorpayOrder: any
  }
}

export interface PaymentOrder {
  id: string
  orderId: string
  receipt: string
  email: string
  firstName?: string
  lastName?: string
  company?: string
  phone?: string
  serviceCode: string
  serviceName: string
  amount: number
  currency: string
  finalAmount: number
  couponCode?: string
  discountAmount?: number
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  paymentId?: string
  signature?: string
  userId?: string
  engagementId?: string
  createdAt: string
  updatedAt: string
}

export interface PaymentOrderData {
  order: any
  razorpayOrder: any
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export interface PaymentVerificationResponse {
  order: {
    _id: string
    orderId: string
    receipt: string
    email: string
    firstName: string
    lastName: string
    amount: number
    currency: string
    status: string
  }

  engagement?: {
    id: string
    engagementId: string
  }

  credentials?: {
    email: string
    password: string
  }
}

export interface CouponValidationRequest {
  code: string
  serviceCode: string
}

export interface CouponValidationResponse {
  valid: boolean
  discountAmount?: number
  discountPercentage?: number
  message?: string
}

export interface ApplicationFormData {
  // Contact Info
  email: string
  firstName: string
  lastName: string
  phone: string
  
  // Company Details
  company: string
  designation?: string
  website?: string
  companySize?: string
  
  // Service & Payment
  serviceCode: string
  serviceName: string
  amount: number
  currency: string
  
  // Coupon (optional)
  couponCode?: string
  discountAmount?: number
  finalAmount?: number
  
  // Order Reference
  orderId?: string
  razorpayOrderId?: string
}

export type CheckoutStep = 'contact' | 'company' | 'coupon' | 'payment' | 'success'