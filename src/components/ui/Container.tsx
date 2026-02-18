'use client'

import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'  // FIX: Union type of allowed values
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl'  // Default to 'xl'
}) => {
  // Object with specific keys - TypeScript knows these exact keys exist
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    'full': 'max-w-full'
  } as const

  // FIX: Type-safe access - maxWidth is guaranteed to be one of the keys
  const maxWidthClass = maxWidthClasses[maxWidth]

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClass} ${className}`}>
      {children}
    </div>
  )
}