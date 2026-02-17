'use client'

import { useState } from 'react'
import { ApplicationFormData } from '@/types/payment.types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface CompanyDetailsStepProps {
  formData: ApplicationFormData
  onUpdate: (data: Partial<ApplicationFormData>) => void
  onNext: () => void
  onBack: () => void
}

export const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({
  formData,
  onUpdate,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.company) {
      newErrors.company = 'Company name is required'
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

  const companySizeOptions = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Company Details</h2>
      
      <Input
        label="Company Name *"
        value={formData.company}
        onChange={(e) => onUpdate({ company: e.target.value })}
        onBlur={() => handleBlur('company')}
        error={touched.company ? errors.company : undefined}
      />

      <Input
        label="Your Designation (Optional)"
        value={formData.designation || ''}
        onChange={(e) => onUpdate({ designation: e.target.value })}
        placeholder="e.g., CEO, Founder, Head of Product"
      />

      <Input
        label="Company Website (Optional)"
        type="url"
        value={formData.website || ''}
        onChange={(e) => onUpdate({ website: e.target.value })}
        placeholder="https://example.com"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Size (Optional)
        </label>
        <select
          value={formData.companySize || ''}
          onChange={(e) => onUpdate({ companySize: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="">Select company size</option>
          {companySizeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary">
          Continue to Payment
        </Button>
      </div>
    </form>
  )
}