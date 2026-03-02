// app/packages/turnaround-stabilisation/page.tsx
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
  const basePrice = 25000; // ₹25,000 as example - adjust based on your pricing
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
          packageId: 'turnaround-stabilisation'
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
          packageId: 'turnaround-stabilisation',
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
      description: 'Turnaround & Stabilisation Package',
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
            {step === 'form' && 'Book Emergency Turnaround Support'}
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
                <option value="survival-risk">Facing survival risk</option>
                <option value="cash-crisis">Cash crisis / runway under 3 months</option>
                <option value="revenue-decline">Revenue declining</option>
                <option value="burn-rate-high">Burn rate unsustainable</option>
                <option value="team-reduction">Considering team reduction</option>
                <option value="strategic-pivot">Need emergency strategic pivot</option>
                <option value="stabilisation">Need immediate stabilisation</option>
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
                <option value="cash-runway">Cash runway critical (under 3 months)</option>
                <option value="burn-rate">Burn rate unsustainable</option>
                <option value="revenue-declining">Revenue declining or stalled</option>
                <option value="product-market-fit">Lost product-market fit</option>
                <option value="team-morale">Team morale crisis</option>
                <option value="investor-pressure">Investor pressure or default risk</option>
                <option value="survival-uncertainty">Survival uncertain</option>
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
                  <span>Our emergency response team will contact you within 2 hours for your Emergency Intake & Context Call</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>You'll receive immediate access to our survival diagnostic and cash flow stress testing tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Check your email for payment receipt and emergency contact information</span>
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
          <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-red-300 text-sm font-medium uppercase tracking-wide">
              Emergency Turnaround Package
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Turnaround & Stabilisation Package
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-blue-200 font-light leading-relaxed mb-8 max-w-3xl">
            Emergency support for startups facing survival risk. Designed for immediate crisis intervention and stabilisation.
          </p>

          {/* Emergency Notice */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Emergency Response Protocol</h3>
                <p className="text-red-200 text-sm">
                  This package includes rapid response with initial contact within 2 hours. If you're in immediate crisis, call our emergency line at +91-XXXXXXXXXX after booking.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onBookNow}
            className="inline-block bg-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Emergency Support Now
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-blue-800/30">
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">5</div>
              <div className="text-blue-300 text-sm sm:text-base">Core Services</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">72 Hours</div>
              <div className="text-blue-300 text-sm sm:text-base">Initial Response</div>
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
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-8 sm:p-10 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4">
            Who Is This For?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Startups facing survival risk. If you have less than 3 months of cash runway, unsustainable burn rate, declining revenue, or immediate existential threats, this package provides emergency intervention to stabilise your business and create a path to survival.
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
      title: "Survival Viability Assessment",
      description: "Immediate assessment of business viability, survival odds, and critical success factors for turnaround."
    },
    {
      number: "02",
      title: "Cash Runway Stress Testing",
      description: "Emergency cash flow analysis, runway extension scenarios, and immediate cash preservation measures."
    },
    {
      number: "03",
      title: "Cost Compression Strategy",
      description: "Rapid identification and implementation of cost reduction opportunities across all business areas."
    },
    {
      number: "04",
      title: "Focus & Activity Pruning",
      description: "Elimination of non-essential activities, projects, and distractions to focus on survival-critical work."
    },
    {
      number: "05",
      title: "Emergency Priority Reset",
      description: "Immediate reprioritization of all activities based on survival impact and resource constraints."
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            What's Included
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            This package includes 5 mandatory emergency services focused exclusively on survival and stabilisation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-lg group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                  {service.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
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

        {/* No Flexible Services Notice */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Emergency Protocol</h4>
              <p className="text-red-800 text-sm">
                This package has no flexible services. All 5 core services are mandatory and delivered immediately. During survival crises, customization is not an option—we focus exclusively on proven survival interventions.
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
      title: "Survival Decision Memo",
      description: "Clear assessment of survival viability with go/no-go decision, critical success factors, and immediate action imperatives."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "30-90 Day Turnaround Plan",
      description: "Detailed emergency action plan with week-by-week priorities, cash preservation measures, and survival milestones."
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Final Deliverables
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            What You'll Receive
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Two critical documents focused exclusively on survival and stabilisation.
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {deliverables.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white mb-6">
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
          <div className="text-red-300 text-sm font-semibold uppercase tracking-wider mb-4">
            Expected Outcome
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
            Immediate control over cash and priorities.
          </h2>
          <p className="text-xl text-blue-200 font-light leading-relaxed">
            You'll gain clarity on survival viability, immediate actions to extend runway, and a structured plan to stabilise your business.
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
      name: "Runway Extension Metric",
      description: "Measurement of cash runway extension achieved through cost compression and revenue stabilisation."
    },
    {
      name: "Focus Compression Score",
      description: "Assessment of activity pruning and focus improvement on survival-critical initiatives."
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Impact Measurement
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            How Success Is Measured
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            We track the effectiveness of this package through two critical survival metrics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-8 border-2 border-red-100 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
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
      title: "Emergency Intake & Context Call",
      description: "Immediate 30-minute crisis assessment call to understand survival situation, cash position, and immediate threats.",
      timing: "Within 2 hours • 30 minutes"
    },
    {
      number: "2",
      title: "Survival Diagnostic",
      description: "Rapid assessment of cash flow, burn rate, viability, and critical success factors for survival.",
      timing: "Immediate (24-48 hours)"
    },
    {
      number: "3",
      title: "Turnaround Strategy Design",
      description: "Development of emergency turnaround strategy with cost compression, focus pruning, and priority reset.",
      timing: "Internal Process (48 hours)"
    },
    {
      number: "4",
      title: "Survival Plan Delivery Session",
      description: "60-minute emergency session to deliver survival decision and immediate action plan.",
      timing: "Within 72 hours • 60 minutes"
    },
    {
      number: "5",
      title: "30-Day Stability Review",
      description: "Follow-up review to assess stabilisation progress, adjust priorities, and plan next phase.",
      timing: "30 days after delivery • 60 minutes"
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
          <div className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Emergency Response Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Customer Service Roadmap
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            A rapid 72-hour emergency response process designed for immediate crisis intervention.
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
                    ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg scale-110' 
                    : 'bg-gray-400'
                }`}>
                  {step.number}
                </div>

                {/* Content */}
                <div className={`flex-1 bg-gray-50 rounded-xl p-6 border-2 transition-all duration-500 ${
                  index === activeStep 
                    ? 'border-red-500 shadow-lg' 
                    : 'border-gray-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
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
                    ? 'bg-red-500 w-12 h-3' 
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
        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 sm:p-10 border-2 border-red-200">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white mb-6 mx-auto md:mx-0">
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
                All emergency deliverables are provided via protected Google Sheets with real-time cash flow stress models, survival scenarios, and runway tracking. This allows for immediate scenario analysis, rapid decision-making, and continuous monitoring during the crisis.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Real-time cash flow stress testing models</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Survival scenario modeling with different cost reduction options</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Daily runway tracking and burn rate monitoring</span>
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
            <span className="inline-block bg-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Emergency Turnaround Package
            </span>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="text-5xl sm:text-6xl font-light text-gray-900 mb-3">
              ₹25,000
            </div>
            <p className="text-gray-600 text-lg">
              Emergency intervention • No flexible services • Rapid response included
            </p>
          </div>

          {/* Features */}
          <div className="max-w-2xl mx-auto mb-10">
            <ul className="space-y-4">
              {[
                "5 core emergency turnaround services",
                "No flexible services (emergency protocol)",
                "2 critical survival deliverable documents",
                "Survival Decision Memo with viability assessment",
                "30-90 Day Turnaround Plan with weekly actions",
                "Cash Runway Stress Testing analysis",
                "Cost Compression Strategy implementation",
                "Runway Extension Metric tracking",
                "Focus Compression Score assessment",
                "Google Sheets delivery with emergency models",
                "Initial contact within 2 hours",
                "72-hour complete emergency response"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-10">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Emergency Protocol Activated</h4>
                <p className="text-red-800 text-sm">
                  This package triggers our emergency response protocol. After booking, our team will contact you within 2 hours. If you need immediate assistance, call +91-XXXXXXXXXX.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onBookNow}
              className="inline-block bg-red-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Emergency Support Now
            </button>
            <p className="text-gray-600 mt-6">
              Emergency questions? <Link href="/contact#emergency" className="text-red-600 hover:underline font-medium">Contact our emergency team</Link>
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
      question: "How quickly do you respond after booking?",
      answer: "We guarantee initial contact within 2 hours of booking. Our emergency response team operates 24/7 for this package. The complete diagnostic and survival plan is delivered within 72 hours."
    },
    {
      question: "What if the assessment shows our business is not viable?",
      answer: "We provide honest, data-driven assessment. If survival is not viable, we'll help you understand why, explore alternatives (pivot, acquisition, wind-down), and provide guidance on responsible closure with maximum value preservation for stakeholders."
    },
    {
      question: "How do you help with immediate cash preservation?",
      answer: "We identify and implement immediate cash preservation measures: 1) Vendor payment renegotiation, 2) Subscription/cost elimination, 3) Team restructuring if needed, 4) Revenue acceleration opportunities, 5) Asset monetization options. We focus on actions that extend runway within days."
    },
    {
      question: "Can this package help with investor communications during crisis?",
      answer: "While not a core service, we provide guidance on crisis communications with investors, including how to present the turnaround plan, manage expectations, and maintain trust during difficult times."
    },
    {
      question: "What happens after the 30-day stability review?",
      answer: "Depending on stabilisation progress, we recommend next steps: 1) If stabilised, transition to Package 4 (Operations) for rebuilding, 2) If still in crisis, extended emergency support, 3) If not viable, responsible wind-down planning."
    },
    {
      question: "How is this different from other packages?",
      answer: "This is our only emergency package. While other packages focus on growth, optimisation, or preparation, this package focuses exclusively on survival. It has faster response times, no flexible services, and focuses on immediate crisis intervention rather than long-term strategy."
    }
  ];

  return (
    <section className="bg-[#E8EEF2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Emergency Questions
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
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-red-500 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <svg 
                  className={`w-6 h-6 text-red-500 flex-shrink-0 transition-transform duration-300 ${
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
          Need Emergency Turnaround Support?
        </h2>
        <p className="text-xl text-blue-200 font-light mb-10">
          Don't wait until it's too late. Get immediate crisis intervention.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBookNow}
            className="inline-block bg-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            Get Emergency Support Now
          </button>
          <Link
            href="/services"
            className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0A1E3D] transition-all duration-300"
          >
            View All Packages
          </Link>
        </div>
        <div className="mt-10 pt-10 border-t border-blue-800/30">
          <p className="text-red-300 text-sm">
            <span className="font-semibold">Emergency Hotline:</span> +91-XXXXXXXXXX • Available 24/7 for this package
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN PAGE COMPONENT
// =====================================================
export default function TurnaroundStabilisationPage() {
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