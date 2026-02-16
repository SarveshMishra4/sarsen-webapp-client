// Token storage strategy - using localStorage for simplicity
// Can be switched to httpOnly cookies by modifying backend response

const ACCESS_TOKEN_KEY = 'sarsen_access_token'
const REFRESH_TOKEN_KEY = 'sarsen_refresh_token'

export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },

  clearTokens: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },

  getAuthHeader: (): { Authorization: string } | {} => {
    const token = tokenManager.getAccessToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  },
}