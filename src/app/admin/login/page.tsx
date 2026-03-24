'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiRequest } from '@/services/api';
import { setAdminToken } from '@/services/cookies';
import { useAuth } from '../../context/AuthContext';

// Add this line right here! It tells Next.js NOT to pre-render this page at build time.
export const dynamic = 'force-dynamic';

interface AdminLoginResponse {
  token: string;
  admin: {
    _id: string;
    email: string;
  };
}

// 1. We moved all the logic and UI into this inner component
function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginAdmin } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiRequest<AdminLoginResponse>('POST', '/admin/login', {
        body: {
          email: formData.email,
          password: formData.password,
        },
      });

      // Store token in cookie (7 days — matches backend admin JWT expiry)
      setAdminToken(data.token);

      // Tell the app the admin is logged in
      loginAdmin(data.admin, data.token);

      // Redirect to wherever they were going, or default to admin dashboard
      const redirect = searchParams?.get('redirect') ?? '/admin/dashboard';
      router.push(redirect);

    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        @media (max-width: 480px) {
          .p-8  { padding: 1.5rem; }
          .p-6  { padding: 1rem; }
          .px-8 { padding-left: 1rem; padding-right: 1rem; }
          .py-6 { padding-top: 1rem; padding-bottom: 1rem; }
          .py-8 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
          .gap-6    { gap: 1rem; }
          .text-4xl { font-size: 2rem; }
          .text-2xl { font-size: 1.5rem; }
          .text-lg  { font-size: 1rem; }
          .max-w-md { max-width: 100%; }
          .w-72, .w-96 { width: 12rem; height: 12rem; }
        }
        button, a { cursor: pointer; -webkit-tap-highlight-color: transparent; }
      `}</style>

      <div className="py-16 min-h-screen bg-gradient-to-br from-[#0A1E3D] to-[#1a3352] flex items-center justify-center px-4 sm:px-6 lg:px-8">

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Login Card */}
        <div className="relative w-full max-w-md">

          {/* Brand */}
          <div className="text-center mb-8">
            <h1 className="text-4xl  text-white mb-2">Sarsen Strategy Partners</h1>
            <p className="text-blue-300 text-lg ">Administrative Access</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-md shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-[#002855] text-center px-8 py-6">
              <h2 className="text-2xl  text-white mb-1">Admin Sign In</h2>
              <p className="text-blue-100 text-md">Restricted access for internal use only</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="admin@sarsen.com"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter admin password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In as Admin</span>
                )}
              </button>

            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-blue-200 text-md mt-8">
            Unauthorized Access is Prohibited and Monitored
          </p>

        </div>
      </div>
    </>
  );
}

// 2. We wrap the form component in a Suspense boundary for the default export
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1E3D] flex items-center justify-center text-white">Loading Admin Portal...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}