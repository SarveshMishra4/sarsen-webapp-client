import { apiClient } from '@/lib/apiClient'
import { AdminLoginResponse, ClientLoginResponse, LoginCredentials, RefreshTokenResponse } from '@/types/auth.types'
import { ApiResponse } from '@/types/api.types'

export const authService = {
  // Admin Auth
  adminLogin: async (email: string, password: string) => {
    return apiClient.post<AdminLoginResponse>('/admin/auth/login', { email, password })
  },

  adminRefresh: async (refreshToken: string) => {
    return apiClient.post<RefreshTokenResponse>('/admin/auth/refresh', { refreshToken })
  },

  adminLogout: async () => {
    return apiClient.post('/admin/auth/logout')
  },

  adminGetMe: async () => {
    return apiClient.get<{ admin: any }>('/admin/auth/me')
  },

  // Client Auth
  clientLogin: async (credentials: LoginCredentials) => {
    return apiClient.post<ClientLoginResponse>('/client/auth/login', credentials)
  },

  clientRefresh: async (refreshToken: string) => {
    return apiClient.post<RefreshTokenResponse>('/client/auth/refresh', { refreshToken })
  },

  clientLogout: async () => {
    return apiClient.post('/client/auth/logout')
  },

  clientGetMe: async () => {
    return apiClient.get<{ user: any; engagementId?: string }>('/client/auth/me')
  },

  clientGetEngagements: async () => {
    return apiClient.get<{ engagements: any[] }>('/client/auth/engagements')
  },
}