'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// =====================================================
// SUCCESS STATE
// =====================================================
const PaymentSuccess = ({ email, password }: { email: string; password: string }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E5A8E] to-[#2B7AB8] px-8 py-8 text-white text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-light mb-2">Payment Successful!</h1>
          <p className="text-blue-100">Welcome to Sarsen Strategy Partners</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Your Login Credentials</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Username (Email)</p>
                <p className="text-lg font-mono bg-white p-3 rounded-lg border border-gray-200">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Temporary Password</p>
                <p className="text-lg font-mono bg-white p-3 rounded-lg border border-gray-200 font-bold text-blue-700">
                  {password}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Important</h3>
                <p className="text-sm text-gray-700">
                  This is the only time your password will be shown. Please print this page or take a screenshot and store it securely. You will need these credentials to log in to your dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/login"
              className="flex-1 bg-[#0A1E3D] hover:bg-[#132B47] text-white px-6 py-4 rounded-lg font-medium text-center transition-colors"
            >
              Go to Login
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-4 rounded-lg font-medium transition-colors"
            >
              Print This Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// FAILURE STATE
// =====================================================
const PaymentFailure = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-8 text-white text-center">
          <div className="w-20 h-20 bg-red-300 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-light mb-2">Payment Failed</h1>
          <p className="text-red-100">We couldn't process your payment</p>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-gray-700">
            Unfortunately, your payment could not be completed. This could be due to insufficient funds, incorrect payment details, or a temporary issue with your bank.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">What would you like to do?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
              <li>Check your payment details and try again</li>
              <li>Use a different payment method</li>
              <li>Contact our support team for assistance</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/checkout"
              className="flex-1 bg-[#0A1E3D] hover:bg-[#132B47] text-white px-6 py-4 rounded-lg font-medium text-center transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/contact"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-4 rounded-lg font-medium text-center transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MAIN COMPONENT WITH SEARCH PARAMS
// =====================================================
function PaymentResultContent() {
  const searchParams = useSearchParams();

  // Safely extract values with fallbacks
  const status = searchParams?.get('status') || null;
  const email = searchParams?.get('email') || 'your-email@example.com';
  const password = searchParams?.get('password') || 'TempPass123!';

  // If status is null (still loading or missing), show loading or default to failure?
  // We'll show a loading state briefly, but if it remains null, maybe show failure.
  if (!status) {
    return (
      <div className="min-h-screen bg-[#d4dce5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0A1E3D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment result...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#d4dce5] py-16 px-4 sm:px-6 lg:px-8">
      {status === 'success' ? (
        <PaymentSuccess email={email} password={password} />
      ) : (
        <PaymentFailure />
      )}
    </main>
  );
}

// =====================================================
// WRAPPER WITH SUSPENSE (for useSearchParams)
// =====================================================
export default function PaymentResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#d4dce5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0A1E3D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentResultContent />
    </Suspense>
  );
}