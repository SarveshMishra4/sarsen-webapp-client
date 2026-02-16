'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

interface HeroProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  imageUrl?: string
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Explore Services',
  ctaLink = '/services',
  secondaryCtaText = 'Contact Us',
  secondaryCtaLink = '/contact',
  imageUrl = '/images/hero-bg.jpg'
}) => {
  return (
    <Section background="primary" spacing="lg" className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          opacity: 0.1
        }}
      />
      
      <div className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaLink}>
              <Button size="lg" variant="primary">
                {ctaText}
              </Button>
            </Link>
            <Link href={secondaryCtaLink}>
              <Button size="lg" variant="outline">
                {secondaryCtaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}