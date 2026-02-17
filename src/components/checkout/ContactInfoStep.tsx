'use client'

import { useState, useEffect } from 'react'
import { ApplicationFormData } from '@/types/payment.types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { validators } from '@/utils/validators'

interface ContactInfoStepProps {
  formData: ApplicationFormData
  onUpdate: (data: Partial<ApplicationFormData>) => void
  onNext: () => void
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  formData,
  onUpdate,
  onNext
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else {
      const emailError = validators.email(formData.email)
      if (emailError) newErrors.email = emailError
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else {
      const phoneError = validators.phone(formData.phone)
      if (phoneError) newErrors.phone = phoneError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name *"
          value={formData.firstName}
          onChange={(e) => onUpdate({ firstName: e.target.value })}
          onBlur={() => handleBlur('firstName')}
          error={touched.firstName ? errors.firstName : undefined}
          disabled={false}
        />

        <Input
          label="Last Name *"
          value={formData.lastName}
          onChange={(e) => onUpdate({ lastName: e.target.value })}
          onBlur={() => handleBlur('lastName')}
          error={touched.lastName ? errors.lastName : undefined}
          disabled={false}
        />
      </div>

      <Input
        label="Email Address *"
        type="email"
        value={formData.email}
        onChange={(e) => onUpdate({ email: e.target.value })}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : undefined}
        disabled={false}
        helpText="We'll send your login credentials to this email"
      />

      <Input
        label="Phone Number *"
        type="tel"
        value={formData.phone}
        onChange={(e) => onUpdate({ phone: e.target.value })}
        onBlur={() => handleBlur('phone')}
        error={touched.phone ? errors.phone : undefined}
        disabled={false}
        helpText="For payment verification and updates"
      />

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Continue to Company Details
        </Button>
      </div>
    </form>
  )
}