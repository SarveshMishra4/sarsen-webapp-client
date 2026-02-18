'use client'

import React, { createContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { authService } from '@/services/auth.service'
import { tokenManager } from '@/lib/tokenManager'
import { AuthState, Admin, ClientUser } from '@/types/auth.types'

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'ADMIN' | 'CLIENT', engagementId?: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: true,
  isAuthenticated: false,
  role: null,
  engagementId: null,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = tokenManager.getAccessToken()
      const refreshToken = tokenManager.getRefreshToken()

      if (!accessToken || !refreshToken) {
        setState({ ...initialState, isLoading: false })
        return
      }

      try {
        // Determine role from path or stored user info
        // For simplicity, we'll try admin first, then client
        try {
          const adminResponse = await authService.adminGetMe()
          if (adminResponse.success && adminResponse.data) {
            // FIX: Store data in a variable before using in callback
            const adminData = adminResponse.data.admin
            setState({
              user: adminData,
              accessToken,
              refreshToken,
              isLoading: false,
              isAuthenticated: true,
              role: 'ADMIN',
              engagementId: null,
            })
            return
          }
        } catch (adminError) {
          // Not admin, try client
        }

        try {
          const clientResponse = await authService.clientGetMe()
          if (clientResponse.success && clientResponse.data) {
            // FIX: Store data in a variable before using in callback
            const clientData = clientResponse.data.user
            const engagementId = clientResponse.data.engagementId
            setState({
              user: clientData,
              accessToken,
              refreshToken,
              isLoading: false,
              isAuthenticated: true,
              role: 'CLIENT',
              engagementId,
            })
            return
          }
        } catch (clientError) {
          // Not client either
        }

        // No valid session
        tokenManager.clearTokens()
        setState({ ...initialState, isLoading: false })
      } catch (error) {
        tokenManager.clearTokens()
        setState({ ...initialState, isLoading: false })
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string, role: 'ADMIN' | 'CLIENT', engagementId?: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      if (role === 'ADMIN') {
        const response = await authService.adminLogin(email, password)
        if (response.success && response.data) {
          // FIX: Store data before using in setState
          const { admin, accessToken, refreshToken } = response.data
          tokenManager.setTokens(accessToken, refreshToken)
          setState({
            user: admin,
            accessToken,
            refreshToken,
            isLoading: false,
            isAuthenticated: true,
            role: 'ADMIN',
            engagementId: null,
          })
          router.push('/admin/protected/dashboard')
        }
      } else {
        const response = await authService.clientLogin({ email, password, engagementId })
        if (response.success && response.data) {
          // FIX: Store data before using in setState
          const { user, accessToken, refreshToken, engagementId: respEngagementId } = response.data
          tokenManager.setTokens(accessToken, refreshToken)
          setState({
            user,
            accessToken,
            refreshToken,
            isLoading: false,
            isAuthenticated: true,
            role: 'CLIENT',
            engagementId: respEngagementId,
          })
          router.push('/client/dashboard')
        }
      }
    } catch (err: any) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw err
    }
  }

  const logout = async () => {
    try {
      if (state.role === 'ADMIN') {
        await authService.adminLogout()
      } else {
        await authService.clientLogout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      tokenManager.clearTokens()
      setState({ ...initialState, isLoading: false })
      router.push('/')
    }
  }

  const refreshUser = async () => {
    try {
      if (state.role === 'ADMIN') {
        const response = await authService.adminGetMe()
        if (response.success && response.data) {
          setState((prev) => ({ ...prev, user: response.data!.admin }))
        }
      } else if (state.role === 'CLIENT') {
        const response = await authService.clientGetMe()
        if (response.success && response.data) {
          setState((prev) => ({ ...prev, user: response.data!.user }))
        }
      }
    } catch (error) {
      console.error('Refresh user error:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}