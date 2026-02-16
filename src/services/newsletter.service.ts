import { apiClient } from '@/lib/apiClient'
import { NewsletterSubscriptionData, NewsletterSubscriptionResponse } from '@/types/newsletter.types'
import { ApiResponse } from '@/types/api.types'

export const newsletterService = {
  /**
   * POST /api/newsletter/subscribe
   * Subscribe to newsletter
   */
  subscribe: async (email: string) => {
    return apiClient.post<NewsletterSubscriptionResponse>('/newsletter/subscribe', { email })
  },
}