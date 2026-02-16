'use client'

import { useState } from 'react'
import { newsletterService } from '@/services/newsletter.service'
import { useToast } from './useToast'
import { NewsletterSubscriptionErrors } from '@/types/newsletter.types'

export const useNewsletter = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<NewsletterSubscriptionErrors>({})
  const { success, error } = useToast()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }))
      return false
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      return false
    }
    setErrors(prev => ({ ...prev, email: undefined }))
    return true
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await newsletterService.subscribe(email)
      
      if (response.success) {
        success('Successfully subscribed to newsletter!')
        setEmail('')
      } else {
        error(response.message || 'Subscription failed. Please try again.')
      }
    } catch (err: any) {
      error(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email,
    setEmail,
    isLoading,
    errors,
    handleSubscribe,
  }
}