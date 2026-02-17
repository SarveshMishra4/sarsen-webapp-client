'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/hooks/useToast'
import { validators } from '@/utils/validators'
import { ContactFormData, ContactFormErrors } from '@/types/public.types'
import { getAllServices } from '@/config/services'

interface ContactFormProps {
  onSuccess?: () => void
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: ''
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const { success, error } = useToast()
  
  const services = getAllServices()

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {}
    
    const nameError = validators.name(formData.name)
    if (nameError) newErrors.name = nameError

    const emailError = validators.email(formData.email)
    if (emailError) newErrors.email = emailError

    const messageError = validators.contactMessage(formData.message)
    if (messageError) newErrors.message = messageError

    if (formData.company) {
      const companyError = validators.company(formData.company)
      if (companyError) newErrors.company = companyError
    }

    if (formData.phone) {
      const phoneError = validators.phone(formData.phone)
      if (phoneError) newErrors.phone = phoneError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    setIsLoading(true)
    
    // TODO: Replace with actual API call when backend endpoint is available
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        service: ''
      })
      onSuccess?.()
    } catch (err: any) {
      error(err.message || 'Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isLoading}
        />

        <Input
          label="Email *"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
        />

        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          error={errors.company}
          disabled={isLoading}
        />

        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service of Interest
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          disabled={isLoading}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="">Select a service (optional)</option>
          {services.map(service => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message *
        </label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
          className={`
            block w-full rounded-md shadow-sm sm:text-sm
            ${errors.message
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
            }
          `}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Send Message
      </Button>
    </form>
  )
}