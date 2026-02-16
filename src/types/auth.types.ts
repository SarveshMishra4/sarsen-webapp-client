export interface Admin {
  id: string
  email: string
  role: 'ADMIN'
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

export interface ClientUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  company?: string
  phone?: string
  isActive: boolean
  lastLoginAt?: string
  engagements: string[]
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
  engagementId?: string
}

export interface AdminLoginResponse {
  admin: Admin
  accessToken: string
  refreshToken: string
}

export interface ClientLoginResponse {
  user: ClientUser
  engagementId?: string
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
}

export interface AuthState {
  user: Admin | ClientUser | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  role: 'ADMIN' | 'CLIENT' | null
  engagementId?: string | null
}