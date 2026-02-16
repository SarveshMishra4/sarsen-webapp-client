import { ServiceConfig } from '@/config/services'

export interface ServiceValidationResponse {
  exists: boolean
  isActive: boolean
  price: number
}

export interface HealthCheckResponse {
  timestamp: string
  uptime: number
  environment: string
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  service?: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  company?: string
  phone?: string
  message?: string
  service?: string
}

export interface ServiceWithValidation extends ServiceConfig {
  isValidated: boolean
  isActive: boolean
  backendPrice?: number
}