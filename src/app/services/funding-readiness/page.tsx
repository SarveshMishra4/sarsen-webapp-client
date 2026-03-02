// app/packages/fundraising-readiness/page.tsx
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
const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  
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

  // Base price (update this with your actual pricing)
  const basePrice = 50000; // ₹50,000 as example - adjust based on your pricing
  const finalPrice = basePrice - discount;

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
          packageId: 'fundraising-readiness'
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
        setDiscount(basePrice * 0.1);
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
      // TODO: Replace with actual API call to create order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageId: 'fundraising-readiness',
          amount: finalPrice,
          couponCode: couponApplied ? formData.couponCode : undefined
        })
      });

      const data = await response.json();

      if (data.orderId) {
        // Proceed to payment
        initiateRazorpayPayment(data.orderId);
      } else {
        alert('Error creating order. Please try again.');
      }
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
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxx',
      amount: finalPrice * 100,
      currency: 'INR',
      name: 'Sarsen & Company',
      description: 'Fundraising Readiness Package',
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
            {step === 'form' && 'Book Your Fundraising Readiness Assessment'}
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
                <option value="pre-seed">Pre-seed / Idea stage</option>
                <option value="seed">Seed stage (₹0–5Cr revenue)</option>
                <option value="series-a">Series A ready (₹5–20Cr revenue)</option>
                <option value="growth">Growth stage (₹20Cr+ revenue)</option>
                <option value="planning-fundraise">Planning to raise in 3-6 months</option>
                <option value="active-fundraise">Actively fundraising</option>
                <option value="post-fundraise">Post-fundraise, preparing next round</option>
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
                <option value="readiness-assessment">Unsure if we're ready to raise</option>
                <option value="valuation-clarity">What valuation should we target?</option>
                <option value="investor-metrics">Which metrics matter to investors?</option>
                <option value="narrative-story">How to craft our equity story?</option>
                <option value="timing-stage">When is the right time to raise?</option>
                <option value="documentation-prep">Preparing pitch deck and data room</option>
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
                <span className="font-medium">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-medium">- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-semibold text-gray-900">
                <span>Total Amount:</span>
                <span>₹{finalPrice.toLocaleString('en-IN')}</span>
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
                  <span>Our team will contact you within 24 hours to schedule your Fundraising Goal & Timing Session</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>You'll receive access to our fundraising readiness diagnostic tools and templates</span>
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
              Fundraising Readiness Package
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Fundraising Readiness Package
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-blue-200 font-light leading-relaxed mb-8 max-w-3xl">
            Get investor-ready with confidence. Designed for founders planning to raise capital in 3-6 months.
          </p>

          {/* CTA */}
          <button
            onClick={onBookNow}
            className="inline-block bg-white text-[#0A1E3D] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Fundraising Assessment
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-blue-800/30">
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">5</div>
              <div className="text-blue-300 text-sm sm:text-base">Core Services</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">2 Weeks</div>
              <div className="text-blue-300 text-sm sm:text-base">Typical Timeline</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">2</div>
              <div className="text-blue-300 text-sm sm:text-base">Final Deliverables</div>
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
            Founders planning to raise capital in 3-6 months. If you're preparing for fundraising but unsure about your readiness, valuation, investor metrics, or equity story, this package provides the comprehensive assessment and preparation you need to approach investors with confidence.
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
      title: "Fundraising Readiness Diagnostic",
      description: "Comprehensive assessment of your fundraising readiness across metrics, narrative, timing, and investor fit."
    },
    {
      number: "02",
      title: "Investor Metric Hygiene Check",
      description: "Analysis of key metrics investors care about, with benchmarks and improvement recommendations."
    },
    {
      number: "03",
      title: "Equity Story & Narrative Structuring",
      description: "Development of compelling equity story that communicates vision, traction, and opportunity."
    },
    {
      number: "04",
      title: "Fundraise Timing & Stage Fit Logic",
      description: "Assessment of optimal fundraising timing and alignment with investor expectations for your stage."
    },
    {
      number: "05",
      title: "Valuation Reality Check",
      description: "Realistic valuation assessment based on market comparables, traction, and growth projections."
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
            This package includes 5 mandatory core services that form the foundation of fundraising readiness.
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
// FLEXIBLE SERVICES SECTION
// =====================================================
const FlexibleServices = () => {
  const services = [
    {
      number: "F1",
      title: "Pitch Deck Logic Review",
      description: "Critical review and restructuring of pitch deck narrative, flow, and investor psychology."
    },
    {
      number: "F2",
      title: "Data Room Structure Design",
      description: "Design of organized, professional data room structure with all required investor documents."
    },
    {
      number: "F3",
      title: "Term Sheet Risk Education",
      description: "Education on term sheet terms, negotiation strategies, and risk assessment."
    },
    {
      number: "F4",
      title: "Investor Q&A Preparation",
      description: "Preparation for investor meetings with anticipated questions and compelling answers."
    },
    {
      number: "F5",
      title: "Dilution Scenario Modelling",
      description: "Financial modeling of dilution scenarios across different fundraising outcomes."
    }
  ];

  return (
    <section className="bg-[#E8EEF2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Flexible Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Choose Up to 3 Customizations
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Select 3 additional services to tailor the package to your specific fundraising needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
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

        {/* Note */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Selection Instructions</h4>
              <p className="text-blue-800 text-sm">
                You can choose up to 3 flexible services. These will be customized based on your specific fundraising stage, investor targets, and preparation needs. Our team will help you select the most relevant options during the goal session.
              </p>
            </div>
          </div>
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Fundraising Readiness Report",
      description: "Comprehensive assessment of fundraising readiness with specific recommendations, timeline, and action plan."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Investor Metrics Dashboard",
      description: "Interactive dashboard tracking key investor metrics with benchmarks, trends, and improvement tracking."
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
            Two comprehensive documents that provide complete fundraising readiness assessment and preparation.
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {deliverables.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
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
            Prepared, confident, and realistic fundraising posture.
          </h2>
          <p className="text-xl text-blue-200 font-light leading-relaxed">
            You'll know exactly where you stand with investors, what needs improvement, and how to approach fundraising with clarity and confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// IMPACT MEASUREMENT
// =====================================================
const ImpactMeasurement = () => {
  const metrics = [
    {
      name: "Investor Readiness Score",
      description: "Quantified assessment of fundraising readiness across metrics, narrative, timing, and investor alignment."
    },
    {
      name: "Narrative Clarity Index",
      description: "Measurement of equity story clarity, consistency, and investor resonance."
    }
  ];

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
            We track the effectiveness of this package through two key fundraising metrics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-8 border-2 border-blue-100 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {metric.name}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {metric.description}
              </p>
            </div>
          ))}
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
      title: "Fundraising Goal & Timing Session",
      description: "Initial session to understand your fundraising goals, target investors, timeline, and specific preparation needs.",
      timing: "Week 1 • 60 minutes"
    },
    {
      number: "2",
      title: "Metrics & Narrative Diagnostic",
      description: "Comprehensive analysis of current metrics, financials, traction, and equity story effectiveness.",
      timing: "Week 1"
    },
    {
      number: "3",
      title: "Readiness & Valuation Analysis",
      description: "Deep analysis of fundraising readiness, valuation assessment, investor fit, and competitive positioning.",
      timing: "Internal Process"
    },
    {
      number: "4",
      title: "Fundraising Readiness Delivery Session",
      description: "90-minute session where we present comprehensive fundraising readiness assessment and recommendations.",
      timing: "Week 2 • 90 minutes"
    },
    {
      number: "5",
      title: "Final Q&A & Handover",
      description: "Delivery of all deliverables and detailed Q&A session to ensure complete understanding and next steps.",
      timing: "End of Week 2"
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
            A structured 2-week journey designed to prepare you for successful fundraising.
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
// GOOGLE SHEETS DELIVERY SECTION
// =====================================================
const GoogleSheetsDelivery = () => {
  return (
    <section className="bg-[#E8EEF2] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 sm:p-10 border-2 border-blue-200">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6 mx-auto md:mx-0">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Google Sheets Delivery Mechanism
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                All deliverables are provided via protected Google Sheets with interactive dashboards, valuation models, dilution scenarios, and metric tracking. This allows for real-time updates, scenario analysis, and easy sharing with potential investors.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Interactive investor metrics dashboard with benchmarks</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Valuation models with market comparables</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Dilution scenario modeling for different fundraising outcomes</span>
                </div>
              </div>
            </div>
          </div>
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
              Fundraising Readiness Package
            </span>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="text-5xl sm:text-6xl font-light text-gray-900 mb-3">
              ₹50,000
            </div>
            <p className="text-gray-600 text-lg">
              One-time investment • Includes 3 flexible services
            </p>
          </div>

          {/* Features */}
          <div className="max-w-2xl mx-auto mb-10">
            <ul className="space-y-4">
              {[
                "5 core fundraising readiness services",
                "3 customizable flexible services (choose from 5 options)",
                "2 comprehensive deliverable documents",
                "Fundraising Readiness Report with action plan",
                "Investor Metrics Dashboard with benchmarks",
                "Valuation Reality Check analysis",
                "Equity Story & Narrative Structuring",
                "Investor Readiness Score measurement",
                "Narrative Clarity Index assessment",
                "Google Sheets delivery with interactive models"
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do you determine the right valuation for our company?",
      answer: "We use multiple methods: 1) Market comparables (similar companies at similar stages), 2) Revenue/ARR multiples (industry standards), 3) Growth-adjusted valuation, 4) Scorecard method (benchmarking against seed/series A companies), and 5) Discounted cash flow for later stages. We provide a realistic range rather than a single number."
    },
    {
      question: "What if we're not actually ready to fundraise?",
      answer: "That's a valuable outcome! We'll provide a clear roadmap of what needs to be fixed before fundraising, with specific metrics to hit, timeline, and milestones. This prevents wasted time pitching to investors prematurely and increases your chances of success when you do raise."
    },
    {
      question: "How do you help with investor targeting and outreach?",
      answer: "While this package focuses on readiness, we help you identify the right investor profile (stage, sector, geography) and develop your outreach strategy. For actual investor introductions, we offer additional services or can recommend partners."
    },
    {
      question: "Can this package help with SAFE notes vs priced rounds?",
      answer: "Yes, we provide education on different fundraising instruments (SAFE, convertible notes, priced rounds), their pros and cons, and which makes sense for your stage and situation. We also help with term sheet understanding and negotiation preparation."
    },
    {
      question: "How long before we should start fundraising should we use this package?",
      answer: "Ideal timing is 3-6 months before you plan to start active fundraising. This gives you time to implement improvements based on our recommendations. If you're already fundraising, we offer accelerated versions with focus on immediate fixes."
    },
    {
      question: "What's the difference between this and Package 0 (Diagnostic)?",
      answer: "Package 0 is foundational business diagnostic for all founders. Package 5 is specifically for founders planning to raise capital. It focuses on investor expectations, fundraising metrics, valuation, and equity story - all tailored to the fundraising context."
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
          Ready to Get Investor-Ready?
        </h2>
        <p className="text-xl text-blue-200 font-light mb-10">
          Start with the Fundraising Readiness Package
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
export default function FundraisingReadinessPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <FlexibleServices />
      <Deliverables />
      <ExpectedOutcome />
      <ImpactMeasurement />
      <CustomerServiceRoadmap />
      <GoogleSheetsDelivery />
      <PricingSection onBookNow={handleBookNow} />
      <FAQSection />
      <FooterCTA onBookNow={handleBookNow} />
      
      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}