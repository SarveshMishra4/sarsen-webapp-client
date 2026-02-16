export interface NewsletterSubscriptionData {
  email: string
}

export interface NewsletterSubscriptionResponse {
  success: boolean
  message: string
}

export interface NewsletterSubscriptionErrors {
  email?: string
  general?: string
}