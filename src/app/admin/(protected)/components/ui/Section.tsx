import React from 'react'
import { Container } from './Container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  background?: 'white' | 'gray' | 'primary'
  spacing?: 'sm' | 'md' | 'lg'
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  background = 'white',
  spacing = 'lg'
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50'
  }

  const spacingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24'
  }

  return (
    <section className={`${backgroundClasses[background]} ${spacingClasses[spacing]} ${className}`}>
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}