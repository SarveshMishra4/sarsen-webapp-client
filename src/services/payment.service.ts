import { apiClient } from '@/lib/apiClient'
import {
  PaymentOrderRequest,
  PaymentOrderResponse,
  PaymentOrderData,
  PaymentVerificationRequest,
  PaymentVerificationResponse,
  CouponValidationRequest,
  CouponValidationResponse
} from '@/types/payment.types'

export const paymentService = {
  /**
   * POST /api/payments/create-order
   * Create a new payment order
   */
  createOrder: async (data: PaymentOrderRequest) => {
  const res = await apiClient.post<PaymentOrderData>(
    '/payments/create-order',
    data
  )

  if (!res.data) {
    throw new Error('Empty response from create order')
  }

  return res.data
},



  /**
   * POST /api/payments/verify
   * Verify payment after Razorpay checkout
   */
  verifyPayment: async (
    data: PaymentVerificationRequest
  ): Promise<PaymentVerificationResponse> => {
    const res = await apiClient.post<PaymentVerificationResponse>(
      '/payments/verify',
      data
    )

    if (!res.data) {
      throw new Error('Empty response from payment verification')
    }

    return res.data
  },

  /**
   * POST /api/payments/validate-coupon
   * Validate coupon code (optional endpoint - implement if backend supports)
   */
  validateCoupon: async (data: CouponValidationRequest) => {
    return apiClient.post<CouponValidationResponse>('/payments/validate-coupon', data)
  },

  /**
   * GET /api/admin/payments/orders
   * Get all orders (admin only)
   */
  getOrders: async (page = 1, limit = 20, status?: string, serviceCode?: string) => {
    const params = new URLSearchParams()
    params.append('page', String(page))
    params.append('limit', String(limit))
    if (status) params.append('status', status)
    if (serviceCode) params.append('serviceCode', serviceCode)

    return apiClient.get<{ orders: any[], total: number, pages: number }>(
      `/admin/payments/orders?${params.toString()}`
    )
  },

  /**
   * GET /api/admin/payments/orders/:orderId
   * Get order by ID (admin only)
   */
  getOrderById: async (orderId: string) => {
    return apiClient.get<{ order: any }>(`/admin/payments/orders/${orderId}`)
  },

  /**
   * GET /api/admin/payments/orders/email/:email
   * Get orders by email (admin only)
   */
  getOrdersByEmail: async (email: string) => {
    return apiClient.get<{ orders: any[], count: number }>(`/admin/payments/orders/email/${email}`)
  }
}