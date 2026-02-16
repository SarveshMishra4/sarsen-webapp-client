export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  count?: number
  total?: number
  pages?: number
}

export interface ApiError {
  message: string
  statusCode: number
}

export interface PaginationParams {
  page?: number
  limit?: number
}