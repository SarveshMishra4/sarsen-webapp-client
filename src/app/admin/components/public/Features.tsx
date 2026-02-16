import React from 'react'
import { Section } from '@/components/ui/Section'

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

interface FeaturesProps {
  title: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}

export const Features: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  features,
  columns = 3
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }

  return (
    <Section background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-xl text-gray-600">
            {subtitle}
          </p>
        )}
      </div>

      <div className={`grid grid-cols-1 gap-8 ${gridCols[columns]}`}>
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}