// app/login/page.tsx
// User login page with exact Reports page design language
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head'; // Added for viewport meta

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes - replace with actual authentication
      if (formData.email && formData.password) {
        // Store session (replace with actual token management)
        localStorage.setItem('userSession', JSON.stringify({
          email: formData.email,
          name: 'Demo User',
          token: 'demo-token-' + Date.now()
        }));
        
        // Redirect to user dashboard
        router.push('/user-dashboard');
      } else {
        setError('Please enter valid credentials');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <Head>
        {/* Viewport meta for proper scaling on mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {/* Optional: ensure touch interactions are optimized */}
        <meta name="format-detection" content="telephone=no" />
      </Head>

      {/* Global style tweaks for ultra-small screens (no changes to component internals) */}
      <style jsx global>{`
        @media (max-width: 480px) {
          /* Reduce excessive padding on cards and sections */
          .p-8 { padding: 1.5rem; }
          .p-6 { padding: 1rem; }
          .px-8 { padding-left: 1rem; padding-right: 1rem; }
          .py-6 { padding-top: 1rem; padding-bottom: 1rem; }
          .py-8 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
          .gap-6 { gap: 1rem; }
          .text-4xl { font-size: 2rem; }
          .text-2xl { font-size: 1.5rem; }
          .text-lg { font-size: 1rem; }
          /* Ensure the card never overflows */
          .max-w-md { max-width: 100%; }
          /* Adjust decorative blurs for small screens */
          .w-72, .w-96 { width: 12rem; height: 12rem; }
        }
        /* Additional touch-friendly adjustments */
        button, a { cursor: pointer; -webkit-tap-highlight-color: transparent; }
      `}</style>

      <div className="min-h-screen py-16 bg-gradient-to-br from-[#0A1E3D] to-[#1a3352] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Login Card */}
        <div className="relative w-full max-w-md">
          
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-white mb-2">Sarsen Strategy Partners</h1>
            <p className="text-blue-300 text-lg font-light">Client Dashboard Access</p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-md shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-[#002855] px-8 py-6">
              <h2 className="text-2xl text-center font-light text-white mb-1">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-blue-100 text-md text-center">
                {isLogin ? 'Sign In to Access Your Dashboard' : 'Get started with your consultation'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    placeholder="Enter your password"
                    required
                  />
                  {/* Show/Hide Password Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      // Eye-off icon (hide)
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      // Eye icon (show)
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password ?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading ? 'opacity-75 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Footer Note */}
          <p className="text-center text-blue-200 text-md mt-8">
            Your Credentials were provided to You on Purchase
          </p>

        </div>
      </div>
    </>
  );
}