/**
 * src/services/api.ts
 *
 * The single fetch wrapper for the entire frontend.
 * Every API call in this project goes through this function.
 *
 * Usage:
 *   import { apiRequest } from '@/services/api';
 *
 *   // Public request
 *   const data = await apiRequest('POST', '/auth/login', {
 *     body: { email, password }
 *   });
 *
 *   // Protected request
 *   const data = await apiRequest('GET', '/engagements', {
 *     token: getUserToken()
 *   });
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// All backend errors come back with a message field.
// ApiError carries that message + the HTTP status code.
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest<T = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  options?: {
    body?:  object;
    token?: string;
  }
): Promise<T> {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not set in .env.local');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options?.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  // Handle 401 globally — token expired or invalid
  // Redirects to the appropriate login page automatically
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      const isAdminPath =
        window.location.pathname.startsWith('/admin') ||
        path.includes('/admin/');
      window.location.href = isAdminPath ? '/admin/login' : '/user/login';
    }
    throw new ApiError('Session expired. Please log in again.', 401);
  }

  const result = await response.json();

  if (!result.success) {
    throw new ApiError(result.message ?? 'Something went wrong.', response.status);
  }

  return result.data as T;
}