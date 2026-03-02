// app/packages/business-diagnostic/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// =====================================================
// TYPES & INTERFACES
// =====================================================
interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  businessStage: string;
  primaryChallenge: string;
  howDidYouHear: string;
  couponCode?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// =====================================================
// BOOKING MODAL COMPONENT
// =====================================================
const BookingModal = ({
  isOpen,
  onClose,
  serviceId,
}: {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState<number>(0);
  
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    businessStage: '',
    primaryChallenge: '',
    howDidYouHear: '',
    couponCode: ''
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('form');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          businessStage: '',
          primaryChallenge: '',
          howDidYouHear: '',
          couponCode: ''
        });
        setErrors({});
        setCouponApplied(false);
        setCouponError('');
        setDiscount(0);
      }, 300);
    }
  }, [isOpen]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.businessStage) {
      newErrors.businessStage = 'Please select business stage';
    }

    if (!formData.primaryChallenge) {
      newErrors.primaryChallenge = 'Please select primary challenge';
    }

    if (!formData.howDidYouHear) {
      newErrors.howDidYouHear = 'Please tell us how you heard about us';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Apply coupon code
  const handleApplyCoupon = async () => {
    if (!formData.couponCode?.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setLoading(true);
    setCouponError('');

    try {
      // TODO: Replace with actual API call to validate coupon
      const response = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          couponCode: formData.couponCode,
          packageId: 'business-diagnostic'
        })
      });

      const data = await response.json();

      if (data.valid) {
        setDiscount(data.discountAmount || 0);
        setCouponApplied(true);
        setCouponError('');
      } else {
        setCouponError(data.message || 'Invalid coupon code');
        setDiscount(0);
        setCouponApplied(false);
      }
    } catch (error) {
      // Fallback for demo purposes - remove in production
      console.log('Coupon validation error:', error);
      
      // Demo: Accept "SARSEN10" for 10% off
      if (formData.couponCode.toUpperCase() === 'SARSEN10') {
        setDiscount(amount * 0.1);
        setCouponApplied(true);
        setCouponError('');
      } else {
        setCouponError('Invalid coupon code');
        setDiscount(0);
        setCouponApplied(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setFormData(prev => ({ ...prev, couponCode: '' }));
    setCouponApplied(false);
    setDiscount(0);
    setCouponError('');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
        }),
      });

      const data = await response.json();

      if (!data.orderId || !data.amount) {
        alert('Order creation failed');
        return;
      }

      setAmount(data.amount / 100);
      initiateRazorpayPayment(data.orderId);
    } catch (error) {
      console.error('Order creation error:', error);
      
      // Fallback for demo - generate mock order ID
      const mockOrderId = `order_${Date.now()}`;
      initiateRazorpayPayment(mockOrderId);
    } finally {
      setLoading(false);
    }
  };

  // Initiate Razorpay payment
  const initiateRazorpayPayment = (orderId: string) => {
    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxx', // Replace with your Razorpay key
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'Sarsen & Company',
      description: 'Business Diagnostic & Direction Package',
      order_id: orderId,
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: '#0A1E3D'
      }
    };

    const razorpay = new window.Razorpay(options);
    
    razorpay.on('payment.failed', function (response: any) {
      handlePaymentFailure(response);
    });

    razorpay.open();
  };

  // Handle payment success
  const handlePaymentSuccess = async (response: any) => {
    setLoading(true);

    try {
      // TODO: Replace with actual API call to verify payment
      const verifyResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          formData: formData
        })
      });

      const data = await verifyResponse.json();

      if (data.verified) {
        setStep('success');
      } else {
        alert('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      // For demo purposes, show success
      setStep('success');
    } finally {
      setLoading(false);
    }
  };

  // Handle payment failure
  const handlePaymentFailure = (response: any) => {
    alert(`Payment failed: ${response.error.description}`);
    console.error('Payment error:', response.error);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 animate-fadeIn">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            {step === 'form' && 'Book Your Diagnostic'}
            {step === 'payment' && 'Payment'}
            {step === 'success' && 'Booking Confirmed!'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Step */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your company name"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
              )}
            </div>

            {/* Business Stage */}
            <div>
              <label htmlFor="businessStage" className="block text-sm font-medium text-gray-700 mb-2">
                Current Business Stage <span className="text-red-500">*</span>
              </label>
              <select
                id="businessStage"
                name="businessStage"
                value={formData.businessStage}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.businessStage ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select your business stage</option>
                <option value="pre-idea">Pre-idea / Exploring</option>
                <option value="idea-validated">Idea validated, no revenue</option>
                <option value="early-revenue">Early revenue (₹0–50L)</option>
                <option value="scaling">Scaling (₹50L–₹5Cr)</option>
                <option value="growth">Growth stage (₹5Cr+)</option>
                <option value="preparing-fundraise">Preparing to raise capital</option>
                <option value="post-fundraise">Post-fundraise</option>
              </select>
              {errors.businessStage && (
                <p className="mt-1 text-sm text-red-500">{errors.businessStage}</p>
              )}
            </div>

            {/* Primary Challenge */}
            <div>
              <label htmlFor="primaryChallenge" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Challenge Right Now <span className="text-red-500">*</span>
              </label>
              <select
                id="primaryChallenge"
                name="primaryChallenge"
                value={formData.primaryChallenge}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.primaryChallenge ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select your biggest challenge</option>
                <option value="scaling-early">Unsure whether to scale or fix fundamentals</option>
                <option value="right-customers">Are these the right customers?</option>
                <option value="pricing">Does our pricing actually work?</option>
                <option value="fundable">Are we fundable?</option>
                <option value="missing-critical">Are we missing something critical?</option>
                <option value="control">Working harder, feeling less in control</option>
                <option value="other">Something else</option>
              </select>
              {errors.primaryChallenge && (
                <p className="mt-1 text-sm text-red-500">{errors.primaryChallenge}</p>
              )}
            </div>

            {/* How Did You Hear */}
            <div>
              <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700 mb-2">
                How Did You Hear About Us? <span className="text-red-500">*</span>
              </label>
              <select
                id="howDidYouHear"
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.howDidYouHear ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Please select</option>
                <option value="google">Google Search</option>
                <option value="linkedin">LinkedIn</option>
                <option value="referral">Referral from friend/colleague</option>
                <option value="social-media">Social Media</option>
                <option value="blog">Blog/Article</option>
                <option value="event">Event/Conference</option>
                <option value="other">Other</option>
              </select>
              {errors.howDidYouHear && (
                <p className="mt-1 text-sm text-red-500">{errors.howDidYouHear}</p>
              )}
            </div>

            {/* Coupon Code Section */}
            <div className="border-t border-gray-200 pt-6">
              <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code (Optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="couponCode"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleInputChange}
                  disabled={couponApplied}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter coupon code"
                />
                {!couponApplied ? (
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={loading || !formData.couponCode?.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {loading ? 'Checking...' : 'Apply'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              {couponError && (
                <p className="mt-2 text-sm text-red-500">{couponError}</p>
              )}
              
              {couponApplied && (
                <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Coupon applied successfully! You saved ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Package Price:</span>
                <span className="font-medium">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-medium">- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-semibold text-gray-900">
                <span>Total Amount:</span>
                <span>₹{amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A1E3D] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#132B47] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600">
                Payment successful. We've sent a confirmation email to <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Our team will contact you within 24 hours to schedule your Introduction & Context Call</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>You'll receive access to the 314-question diagnostic system</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Check your email for payment receipt and next steps</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#0A1E3D] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#132B47] transition-all duration-300"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

// =====================================================
// PACKAGE HERO SECTION
// =====================================================
const PackageHero = ({ onBookNow }: { onBookNow: () => void }) => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          {/* Package Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-blue-300 text-sm font-medium uppercase tracking-wide">
              Compulsory Entry Package
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Business Diagnostic & Direction Package
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-blue-200 font-light leading-relaxed mb-8 max-w-3xl">
            The foundational package that brings clarity, control, and confidence. Designed for founders overwhelmed by complexity and unclear about priorities.
          </p>

          {/* CTA */}
          <button
            onClick={onBookNow}
            className="inline-block bg-white text-[#0A1E3D] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule Your Diagnostic
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-blue-800/30">
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">314</div>
              <div className="text-blue-300 text-sm sm:text-base">Questions Diagnostic System</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">2 Weeks</div>
              <div className="text-blue-300 text-sm sm:text-base">Typical Delivery Timeline</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">3</div>
              <div className="text-blue-300 text-sm sm:text-base">Core Deliverables</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// TARGETED FOR SECTION
// =====================================================
const TargetedFor = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl p-8 sm:p-10 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4">
            Who Is This For?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founders who are overwhelmed, unclear about how their business actually works, or lack a structured understanding of priorities and control levers. This package is the mandatory starting point for all new clients—it establishes the foundation for everything that follows.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// CORE SERVICES SECTION
// =====================================================
const CoreServices = () => {
  const services = [
    {
      number: "01",
      title: "Full Business Diagnostic",
      description: "Comprehensive 314-question system covering every aspect of your business operations, strategy, and execution."
    },
    {
      number: "02",
      title: "Business Model & Value Chain Mapping",
      description: "Visual representation of how your business creates, delivers, and captures value."
    },
    {
      number: "03",
      title: "Control Lever Identification",
      description: "Pinpoint the key variables that drive disproportionate impact in your business."
    },
    {
      number: "04",
      title: "Bottleneck & Constraint Ranking",
      description: "Systematic identification and prioritization of what's actually limiting your growth."
    },
    {
      number: "05",
      title: "Founder–Business Fit Assessment",
      description: "Honest evaluation of alignment between founder capabilities and business requirements."
    },
    {
      number: "06",
      title: "Metric Hygiene & KPI Baseline Setup",
      description: "Establish the right metrics and baseline measurements for tracking progress."
    },
    {
      number: "07",
      title: "Strategic Direction Selection",
      description: "Clear decision on where to focus effort for the next 12 months."
    },
    {
      number: "08",
      title: "Long-Term Trajectory Framing",
      description: "Define the 3–5 year vision and strategic path forward."
    },
    {
      number: "09",
      title: "Departmentalisation Logic",
      description: "Structure how work should be organized as you scale."
    },
    {
      number: "10",
      title: "High-Level Org Structure Design",
      description: "Blueprint for organizational architecture aligned with strategic direction."
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            What's Included
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            This package includes 10 mandatory core services. No flexibility, no customization—these are the non-negotiable elements that create the foundation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  {service.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// DELIVERABLES SECTION
// =====================================================
const Deliverables = () => {
  const deliverables = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Business Nature & Control Handbook",
      description: "Complete diagnostic results, control lever analysis, bottleneck rankings, and business model visualization. This becomes your operating manual."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Direction & Growth Stages Document",
      description: "Your strategic roadmap: 12-month direction, 3–5 year trajectory, growth stage framework, and organizational evolution plan."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "90-Day Action One-Pager",
      description: "Focused execution plan with prioritized actions, quick wins, foundation builders, and measurement criteria for the next 90 days."
    }
  ];

  return (
    <section className="bg-[#E8EEF2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Final Deliverables
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            What You'll Receive
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Three comprehensive documents delivered via protected Google Sheets with scoring logic, analysis, and actionable insights.
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {deliverables.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// EXPECTED OUTCOME SECTION
// =====================================================
const ExpectedOutcome = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-4">
            Expected Outcome
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
            The founder achieves clarity, control, and confidence.
          </h2>
          <p className="text-xl text-blue-200 font-light leading-relaxed">
            You'll understand how your business works, what matters most, and where to focus your energy.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// CUSTOMER SERVICE ROADMAP
// =====================================================
const CustomerServiceRoadmap = () => {
  const [activeStep, setActiveStep] = useState(0);

  const roadmapSteps = [
    {
      number: "1",
      title: "Introduction & Context Call",
      description: "Initial 30-minute session to establish context, explain the diagnostic process, and set expectations. We'll align on objectives and answer any preliminary questions.",
      timing: "30 minutes"
    },
    {
      number: "2",
      title: "Diagnostic Data Collection & Questioning",
      description: "You'll complete our comprehensive 314-question diagnostic system. This covers business model, operations, metrics, strategy, constraints, and more. Expect 2–4 hours of focused work.",
      timing: "Week 1"
    },
    {
      number: "3",
      title: "Diagnostic Analysis & Scoring",
      description: "Our team analyzes your responses, runs scoring algorithms, maps your business model, identifies control levers, and ranks bottlenecks. This is internal work—no input required from you.",
      timing: "Internal Process"
    },
    {
      number: "4",
      title: "Direction & Control Session",
      description: "90-minute deep-dive session where we present findings, discuss strategic direction, and collaboratively decide on priorities. This is where clarity emerges.",
      timing: "Week 2 • 90 minutes"
    },
    {
      number: "5",
      title: "Delivery of All Documents",
      description: "You receive all three core deliverables via protected Google Sheets: Business Nature & Control Handbook, Direction & Growth Stages Document, and 90-Day Action One-Pager.",
      timing: "End of Week 2"
    },
    {
      number: "6",
      title: "90-Day Post-Delivery Review",
      description: "Follow-up session to review progress against the 90-Day Action Plan, adjust priorities if needed, and determine next steps. This ensures accountability and sustained momentum.",
      timing: "90 days after delivery"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % roadmapSteps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [roadmapSteps.length]);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            The Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Customer Service Roadmap
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            A structured, chronological journey designed for clarity and controlled scope.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block"></div>

          {/* Steps */}
          <div className="space-y-8">
            {roadmapSteps.map((step, index) => (
              <div 
                key={index}
                className={`relative flex gap-6 items-start transition-all duration-500 ${
                  index === activeStep ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {/* Step Number Circle */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-500 relative z-10 ${
                  index === activeStep 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg scale-110' 
                    : 'bg-gray-400'
                }`}>
                  {step.number}
                </div>

                {/* Content */}
                <div className={`flex-1 bg-gray-50 rounded-xl p-6 border-2 transition-all duration-500 ${
                  index === activeStep 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {step.timing}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {roadmapSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeStep 
                    ? 'bg-blue-500 w-12 h-3' 
                    : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// IMPACT MEASUREMENT
// =====================================================
const ImpactMeasurement = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Impact Measurement
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            How Success Is Measured
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            We track the effectiveness of this package through a single, focused metric.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 sm:p-10 border-2 border-blue-500 shadow-xl max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Founder Clarity Index
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Measured before and after engagement to quantify improvement in understanding, confidence, and decision-making capability.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// PRICING SECTION
// =====================================================
const PricingSection = ({ onBookNow }: { onBookNow: () => void }) => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-10 lg:p-12 border-2 border-gray-200">
          
          {/* Badge */}
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Compulsory Entry Package
            </span>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="text-5xl sm:text-6xl font-light text-gray-900 mb-3">
              ₹50,000
            </div>
            <p className="text-gray-600 text-lg">
              One-time investment • No recurring fees
            </p>
          </div>

          {/* Features */}
          <div className="max-w-2xl mx-auto mb-10">
            <ul className="space-y-4">
              {[
                "Complete 314-question diagnostic system",
                "All 10 core services included",
                "3 comprehensive deliverable documents",
                "Protected Google Sheets with full analysis",
                "90-minute strategy session",
                "90-day follow-up review session",
                "Founder Clarity Index measurement",
                "Foundation for all future packages"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onBookNow}
              className="inline-block bg-[#0A1E3D] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#132B47] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now & Pay
            </button>
            <p className="text-gray-600 mt-6">
              Questions? <Link href="/contact#main" className="text-blue-600 hover:underline font-medium">Contact our team</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// FAQ SECTION
// =====================================================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why is this package compulsory?",
      answer: "Every founder needs clarity before execution. Without understanding your business's true nature, control levers, and constraints, any subsequent strategy work would be building on unstable ground. This package establishes the foundation."
    },
    {
      question: "How long does the diagnostic take to complete?",
      answer: "The 314-question diagnostic typically requires 2–4 hours of focused work. We recommend breaking it into multiple sessions rather than rushing through in one sitting."
    },
    {
      question: "What if I don't have all the data the diagnostic asks for?",
      answer: "That's completely normal and actually valuable information. The diagnostic is designed to reveal gaps in your business understanding and metrics—these gaps become part of our analysis and recommendations."
    },
    {
      question: "Can I customize this package?",
      answer: "No. This package is fixed by design. The 10 core services are mandatory and non-negotiable. This ensures every founder gets the complete foundational assessment they need."
    },
    {
      question: "What happens after this package is complete?",
      answer: "Based on your diagnostic results and strategic direction, we'll recommend the most appropriate next package from our suite of 7 specialized offerings. You'll have complete clarity on which path makes sense for your business."
    },
    {
      question: "Is this suitable for established businesses or just startups?",
      answer: "This package works for founders at any stage who lack clarity about their business fundamentals. Whether you're pre-revenue or doing $10M annually, if you're overwhelmed or unclear about priorities, this package will help."
    }
  ];

  return (
    <section className="bg-[#E8EEF2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-blue-500 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <svg 
                  className={`w-6 h-6 text-blue-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// FOOTER CTA
// =====================================================
const FooterCTA = ({ onBookNow }: { onBookNow: () => void }) => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
          Ready to Gain Clarity?
        </h2>
        <p className="text-xl text-blue-200 font-light mb-10">
          Start with the Business Diagnostic & Direction Package
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBookNow}
            className="inline-block bg-white text-[#0A1E3D] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
          >
            Book Now & Pay
          </button>
          <Link
            href="/services"
            className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0A1E3D] transition-all duration-300"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN PAGE COMPONENT
// =====================================================
export default function BusinessDiagnosticPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const SERVICE_ID = "business-diagnostic";

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen">
      <PackageHero onBookNow={handleBookNow} />
      <TargetedFor />
      <CoreServices />
      <Deliverables />
      <ExpectedOutcome />
      <ImpactMeasurement />
      <CustomerServiceRoadmap />
      <PricingSection onBookNow={handleBookNow} />
      <FAQSection />
      <FooterCTA onBookNow={handleBookNow} />
      
      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceId={SERVICE_ID}
      />
    </main>
  );
}