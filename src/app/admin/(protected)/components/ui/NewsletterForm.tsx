'use client'

import React from 'react'
import { useNewsletter } from '@/hooks/useNewsletter'
import { Button } from './Button'
import { Input } from './Input'

export const NewsletterForm: React.FC = () => {
  const { email, setEmail, isLoading, errors, handleSubscribe } = useNewsletter()

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={isLoading}
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Subscribe
      </Button>
    </form>
  )
}