import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'
import { tokenManager } from './tokenManager'
import { ApiError, ApiResponse } from '@/types/api.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

class ApiClient {
  private client: AxiosInstance
  private isRefreshing = false
  private failedQueue: Array<{
    resolve: (value: unknown) => void
    reject: (reason?: any) => void
    config: InternalAxiosRequestConfig
  }> = []

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private getRoleFromToken(token: string): 'client' | 'admin' {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const role = payload.role?.toUpperCase()

      if (role === 'ADMIN') return 'admin'
      return 'client'
    } catch {
      return 'client'
    }
  }

  private setupInterceptors() {
    // ✅ REQUEST INTERCEPTOR
    this.client.interceptors.request.use(
      (config) => {
        const token = tokenManager.getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // ✅ RESPONSE INTERCEPTOR
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean
        }

        if (error.response?.status !== 401 || originalRequest._retry) {
          return Promise.reject(this.normalizeError(error))
        }

        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject, config: originalRequest })
          })
        }

        originalRequest._retry = true
        this.isRefreshing = true

        try {
          const refreshToken = tokenManager.getRefreshToken()
          const accessToken = tokenManager.getAccessToken()

          if (!refreshToken || !accessToken)
            throw new Error('No refresh token')

          // 🔥 Detect role from token
          const rolePrefix = this.getRoleFromToken(accessToken)

          const response = await axios.post<
            ApiResponse<{ accessToken: string }>
          >(`${API_URL}/${rolePrefix}/auth/refresh`, {
            refreshToken,
          })

          const { accessToken: newAccessToken } = response.data.data!

          tokenManager.setTokens(newAccessToken, refreshToken)

          // Retry queued requests
          this.failedQueue.forEach(({ resolve, reject, config }) => {
            this.client(config).then(resolve).catch(reject)
          })
          this.failedQueue = []

          return this.client(originalRequest)
        } catch (refreshError) {
          tokenManager.clearTokens()

          this.failedQueue.forEach(({ reject }) => {
            reject(refreshError)
          })
          this.failedQueue = []

          return Promise.reject(this.normalizeError(refreshError))
        } finally {
          this.isRefreshing = false
        }
      }
    )
  }

  private normalizeError(error: any): ApiError {
    if (axios.isAxiosError(error)) {
      return {
        message: (error.response?.data as any)?.message || error.message,
        statusCode: error.response?.status || 500,
      }
    }

    return {
      message: error?.message || 'Unknown error occurred',
      statusCode: 500,
    }
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config)
    return response.data
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(
      url,
      data,
      config
    )
    return response.data
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(
      url,
      data,
      config
    )
    return response.data
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(
      url,
      data,
      config
    )
    return response.data
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(
      url,
      config
    )
    return response.data
  }
}

export const apiClient = new ApiClient()