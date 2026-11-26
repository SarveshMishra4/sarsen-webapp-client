'use client';

/**
 * PurchaseModal.tsx
 * ─────────────────────────────────────────────────────────────────
 * SHARED TRANSACTION LAYER — used by every service page, including
 * the independent Raise Capital page.
 *
 * Moved verbatim out of services.tsx. The payment logic (coupon
 * validation, /payments/create-order, Razorpay, verification,
 * account setup) is UNCHANGED. The only additions are:
 *   - this file's own imports / types
 *   - a small <style> block so the modal no longer depends on the
 *     host page's CSS (that is what makes the pages independent).
 *
 * Any page that renders <PurchaseModal /> only needs to pass an
 * object with the fields listed in PurchaseModalService below.
 * ─────────────────────────────────────────────────────────────────
 */

import React, {
  useState,
  useEffect,
  useRef,
  FC,
  MouseEvent,
  ChangeEvent,
} from 'react';
import { apiRequest } from '@/services/api';
import { getUserToken } from '@/services/cookies';
import { useAuth } from '../../context/AuthContext';

// ─── Types (only what the modal needs) ───────────────────────────

interface QuestionOption { value: string; label: string; }
interface ServiceQuestion {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'multiselect' | 'number';
  placeholder?: string;
  options?: QuestionOption[];
  required: boolean;
  helpText?: string;
}
interface FlexibleServiceOption { id: string; label: string; description: string; }

/** Minimal shape the modal reads from a service. */
export interface PurchaseModalService {
  backendId: string;
  packageNumber: string;
  title: string;
  tag: string;
  accentColor: string;
  accentColorRgb: string;
  price: number;
  priceDisplay: string;
  duration: string;
  deliveryFormat: string;
  coreServices: string[];
  deliverables: string[];
  flexibleServices: FlexibleServiceOption[] | null;
  maxFlexibleSelections: number | null;
  questions: ServiceQuestion[];
}

const SUPPORT_EMAIL = 'contact@sarsenpartners.com';

declare global {
  interface Window {
    Razorpay: any | (new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (res: Record<string, unknown>) => void) => void;
    });
  }
}

// ════════════════════════════════════════════════════════════════
// COUPON BADGE
// ════════════════════════════════════════════════════════════════

interface CouponBadgeProps {
  label: string;
  onRemove: () => void;
  accentRgb: string;
}

const CouponBadge: FC<CouponBadgeProps> = ({ label, onRemove, accentRgb }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold"
    style={{
      backgroundColor: `rgba(${accentRgb},0.12)`,
      color: `rgba(${accentRgb},1)`,
      border: `1px solid rgba(${accentRgb},0.25)`,
    }}
  >
    ✦ {label}
    <button
      type="button"
      onClick={onRemove}
      className="opacity-60 hover:opacity-100 transition-opacity ml-0.5"
      aria-label="Remove coupon"
    >
      ×
    </button>
  </span>
);

// ════════════════════════════════════════════════════════════════
// PURCHASE MODAL – LOGIC UNTOUCHED, PADDING MADE RESPONSIVE
// ════════════════════════════════════════════════════════════════

type ModalStep = 'questions' | 'summary' | 'processing' | 'success' | 'failure';

interface PurchaseModalProps {
  service: PurchaseModalService;
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: FC<PurchaseModalProps> = ({ service, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [step, setStep] = useState<ModalStep>('questions');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    label: string;
    finalPrice: number;
    finalPriceDisplay: string;
  } | null>(null);
  const [failureReason, setFailureReason] = useState('');
  const [plainPassword, setPlainPassword] = useState<string | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setEmailError('');
      setAnswers({});
      setStep('questions');
      setErrors({});
      setCouponInput('');
      setCouponLoading(false);
      setCouponError('');
      setAppliedCoupon(null);
      setFailureReason('');
      setPlainPassword(null);
      setVerifyLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [step]);

  if (!isOpen) return null;

  const accentRgb = service.accentColorRgb;

  const setAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const toggleMultiselect = (questionId: string, optionValue: string, max?: number | null) => {
    const current = (answers[questionId] as string[]) ?? [];
    if (current.includes(optionValue)) {
      setAnswer(questionId, current.filter((v) => v !== optionValue));
    } else {
      if (max && current.length >= max) return;
      setAnswer(questionId, [...current, optionValue]);
    }
    if (errors[questionId]) setErrors((prev) => ({ ...prev, [questionId]: '' }));
  };

  const validateQuestions = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('A valid email address is required.');
      isValid = false;
    } else {
      setEmailError('');
    }

    service.questions.forEach((q) => {
      if (!q.required) return;
      const val = answers[q.id];
      if (!val || (Array.isArray(val) ? val.length === 0 : val.trim() === '')) {
        newErrors[q.id] = 'This field is required.';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const data = await apiRequest<{
        finalPrice: number;
        couponId: string;
      }>('POST', '/coupons/validate', {
        body: {
          code: couponInput.trim().toUpperCase(),
          serviceId: service.backendId,
        },
      });

      const finalPriceRupees = data.finalPrice / 100;
      const originalRupees = service.price / 100;
      const savedRupees = originalRupees - finalPriceRupees;
      const finalPriceDisplay = `₹${finalPriceRupees.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
      const discountLabel = `Save ₹${savedRupees.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;

      setAppliedCoupon({
        code: couponInput.trim().toUpperCase(),
        label: discountLabel,
        finalPrice: data.finalPrice,
        finalPriceDisplay: finalPriceDisplay,
      });
      setCouponInput('');

    } catch (err: any) {
      setCouponError(err.message ?? 'Could not verify coupon. Please check your connection and try again.');
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const initiatePayment = async () => {
    setStep('processing');

    const purchaseAnswers = service.questions.map((q) => ({
      questionId: q.id || 'unknown_id',
      questionText: q.label || 'Unknown Question',
      answer: Array.isArray(answers[q.id])
        ? (answers[q.id] as string[]).join(', ')
        : (answers[q.id] as string) || '',
    }));

    try {
      const orderData = await apiRequest<{
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
      }>('POST', '/payments/create-order', {
        body: {
          serviceId: service.backendId,
          userEmail: email,
          couponCode: appliedCoupon?.code ?? undefined,
          purchaseAnswers,
        },
        token: getUserToken() ?? undefined,
      });

      if (!orderData.orderId) throw new Error('Order creation failed.');

      const rzp = new window.Razorpay({
        key: orderData.keyId ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency ?? 'INR',
        name: 'Sarsen Strategy Partners',
        description: service.title,
        order_id: orderData.orderId,
        theme: { color: service.accentColor },
        modal: {
          ondismiss: () => {
            setFailureReason('Payment was cancelled. No amount has been charged.');
            setStep('failure');
          },
        },
        handler: async (paymentResponse: Record<string, string>) => {
          setVerifyLoading(true);
          try {
            const verifyData = await apiRequest<{
              engagementId: string;
              isNewUser: boolean;
              plainPassword: string | null;
            }>('POST', '/payments/verify', {
              body: {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
            });
            setPlainPassword(verifyData.plainPassword);
            setStep('success');
          } catch (verifyErr: any) {
            setFailureReason(
              verifyErr.message ??
              'Payment was received but we could not confirm your account setup. Please contact support.'
            );
            setStep('failure');
          } finally {
            setVerifyLoading(false);
          }
        },
      });

      rzp.on('payment.failed', (response: Record<string, Record<string, string>>) => {
        const reason = response?.error?.description ?? 'Payment was declined by your bank or card provider.';
        setFailureReason(reason);
        setStep('failure');
      });

      rzp.open();

    } catch (err: any) {
      setFailureReason(err.message ?? 'We could not initiate the payment. Please try again or contact support.');
      setStep('failure');
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (step === 'processing') return;
    if (e.target === e.currentTarget) onClose();
  };

  const displayPrice = appliedCoupon ? appliedCoupon.finalPriceDisplay : service.priceDisplay;
  const isDiscounted = !!appliedCoupon;
  const originalPrice = service.priceDisplay;

  const getFlexMax = (questionId: string): number | null => {
    if (questionId === 'flexible_services') return service.maxFlexibleSelections ?? null;
    return null;
  };

  const renderQuestion = (q: ServiceQuestion) => {
    const error = errors[q.id];
    const val = answers[q.id];
    const flexMax = getFlexMax(q.id);

    const labelStyle: React.CSSProperties = {
      color: '#0A1E3D',
      fontSize: '0.95rem',
      fontWeight: 500,
      marginBottom: '6px',
      display: 'block',
    };

    const inputStyle: React.CSSProperties = {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: error ? '1px solid #EF4444' : '1px solid #CBD5E1',
      fontSize: '0.95rem',
      color: '#0A1E3D',
      outline: 'none',
      background: '#F8FAFC',
      transition: 'border-color 0.15s',
      boxSizing: 'border-box',
    };

    const renderInput = () => {
      switch (q.type) {
        case 'text':
        case 'number':
          return (
            <input
              type={q.type}
              value={(val as string) ?? ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(q.id, e.target.value)}
              placeholder={q.placeholder}
              style={inputStyle}
            />
          );

        case 'textarea':
          return (
            <textarea
              value={(val as string) ?? ''}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAnswer(q.id, e.target.value)}
              placeholder={q.placeholder}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
            />
          );

        case 'select':
          return (
            <select
              value={(val as string) ?? ''}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setAnswer(q.id, e.target.value)}
              style={inputStyle}
            >
              <option value="">— Select —</option>
              {q.options?.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          );

        case 'radio':
          return (
            <div className="space-y-2 mt-1">
              {q.options?.map((o) => {
                const checked = val === o.value;
                return (
                  <label
                    key={o.value}
                    className="flex items-center gap-3 cursor-pointer group"
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: checked ? `1px solid #0A1E3D` : '1px solid #E2E8F0',
                      background: checked ? `rgba(${accentRgb},0.06)` : '#F8FAFC',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: checked ? '#0A1E3D' : '#CBD5E1',
                        background: checked ? '#0A1E3D' : 'transparent',
                        transition: 'all 0.15s',
                      }}
                    >
                      {checked && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#0A1E3D' }}>{o.label}</span>
                    <input
                      type="radio"
                      className="sr-only"
                      checked={checked}
                      onChange={() => setAnswer(q.id, o.value)}
                    />
                  </label>
                );
              })}
            </div>
          );

        case 'multiselect': {
          const selected = (val as string[]) ?? [];
          const atMax = flexMax !== null && selected.length >= flexMax;
          return (
            <div className="space-y-2 mt-1">
              {flexMax && (
                <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>
                  {selected.length} / {flexMax} selected
                </p>
              )}
              {q.options?.map((o) => {
                const checked = selected.includes(o.value);
                const disabled = !checked && (atMax ?? false);
                return (
                  <label
                    key={o.value}
                    className="flex items-center gap-3 cursor-pointer"
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: checked ? `1px solid #0A1E3D` : '1px solid #E2E8F0',
                      background: checked ? `rgba(${accentRgb},0.06)` : '#F8FAFC',
                      opacity: disabled ? 0.4 : 1,
                      transition: 'all 0.15s',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border-2"
                      style={{
                        borderColor: checked ? '#0A1E3D' : '#CBD5E1',
                        background: checked ? '#0A1E3D' : 'transparent',
                        transition: 'all 0.15s',
                      }}
                    >
                      {checked && (
                        <svg className="w-2.5 h-2.5" fill="none" stroke="white" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#0A1E3D' }}>{o.label}</span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleMultiselect(q.id, o.value, flexMax)}
                    />
                  </label>
                );
              })}
            </div>
          );
        }

        default:
          return null;
      }
    };

    return (
      <div key={q.id} style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>
          {q.label}
          {q.required && <span style={{ color: '#EF4444', marginLeft: '3px' }}>*</span>}
        </label>
        {renderInput()}
        {q.helpText && !error && (
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>{q.helpText}</p>
        )}
        {error && (
          <p style={{ fontSize: '0.8rem', color: '#EF4444', marginTop: '4px' }}>{error}</p>
        )}
      </div>
    );
  };

  const renderQuestionsStep = () => (
    <>
      <div
        className="svc-modal-pad-h"
        style={{
          background: `linear-gradient(135deg, #002855 0%, #0A1628 100%)`,
          paddingTop: '28px',
          paddingBottom: '24px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2.5 py-0.5 rounded-md text-xs font-semibold"
            style={{ backgroundColor: `rgba(${accentRgb},0.15)`, color: service.accentColor }}
          >
            {service.tag}
          </span>
          <span className="text-xs text-blue-300 opacity-70">{service.packageNumber}</span>
        </div>

        <h2 style={{ color: '#EEF2FF', fontWeight: 300, fontSize: '1.35rem', lineHeight: 1.3, marginBottom: '6px' }}>
          {service.title}
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
          Before we proceed — a few questions to make your engagement as precise as possible.
        </p>
      </div>

      <div ref={scrollRef} className="svc-modal-pad-h svc-modal-body" style={{ paddingTop: '28px', paddingBottom: '28px' }}>
        <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
          <label style={{ color: '#0A1E3D', fontSize: '0.95rem', fontWeight: 500, marginBottom: '6px', display: 'block' }}>
            Email Address <span style={{ color: '#EF4444', marginLeft: '3px' }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            placeholder="you@company.com"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: emailError ? '1px solid #EF4444' : '1px solid #CBD5E1',
              fontSize: '0.95rem',
              color: '#0A1E3D',
              outline: 'none',
              background: '#F8FAFC',
              transition: 'border-color 0.15s',
              boxSizing: 'border-box',
            }}
          />
          {emailError && (
            <p style={{ fontSize: '0.8rem', color: '#EF4444', marginTop: '4px' }}>{emailError}</p>
          )}
        </div>

        {service.questions.map(renderQuestion)}
      </div>

      <div
        className="svc-modal-pad-h svc-modal-footer"
        style={{
          paddingTop: '16px',
          paddingBottom: '24px',
          borderTop: '1px solid #F1F5F9',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          background: '#FFFFFF',
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '0.85rem',
            color: '#64748B',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (validateQuestions()) setStep('summary');
          }}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            background: '#0F172A',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          Continue to Summary
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </>
  );

  const renderSummaryStep = () => {
    const selectedFlexIds = (answers['flexible_services'] as string[]) ?? [];
    const selectedFlexItems = service.flexibleServices?.filter((f) =>
      selectedFlexIds.includes(f.id)
    ) ?? [];

    return (
      <>
        <div
          className="svc-modal-pad-h"
          style={{
            background: `linear-gradient(135deg, #002855 0%, #0A1628 100%)`,
            paddingTop: '28px',
            paddingBottom: '24px',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '6px' }}>
            Order Summary
          </p>
          <h2 style={{ color: '#EEF2FF', fontWeight: 300, fontSize: '1.35rem', lineHeight: 1.3 }}>
            {service.title}
          </h2>
        </div>

        <div ref={scrollRef} className="svc-modal-pad-h svc-modal-body" style={{ paddingTop: '28px', paddingBottom: '28px' }}>
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '6px',
              padding: '16px 18px',
              marginBottom: '20px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div className="svc-summary-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#0A1E3D', marginBottom: '2px' }}>{service.packageNumber}</p>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0A1E3D' }}>
                  {service.title}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                {isDiscounted && (
                  <p style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'line-through', marginBottom: '1px' }}>
                    {originalPrice}
                  </p>
                )}
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0A1E3D' }}>
                  {displayPrice}
                </p>
                {isDiscounted && appliedCoupon && (
                  <CouponBadge
                    label={appliedCoupon.label}
                    onRemove={removeCoupon}
                    accentRgb={accentRgb}
                  />
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              {[
                { label: service.duration },
                { label: service.deliveryFormat },
                { label: `${service.coreServices.length} core services` },
              ].map((item) => (
                <span
                  key={item.label}
                  style={{
                    fontSize: '0.85rem',
                    color: '#0A1E3D',
                    background: '#EFF6FF',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {selectedFlexItems.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '0.85rem', color: '#0A1E3D', marginBottom: '8px', fontWeight: 500 }}>
                Additional Services Selected
              </p>
              <div className="space-y-1.5">
                {selectedFlexItems.map((f) => (
                  <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke='#0A1E3D' viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p style={{ fontSize: '0.85rem', color: '#0A1E3D' }}>{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '0.85rem', color: '#0A1E3D', fontWeight: 500, marginBottom: '8px' }}>
              You will receive
            </p>
            <div className="space-y-1.5">
              {service.deliverables.map((d) => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke='#0A1E3D' viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p style={{ fontSize: '0.85rem', color: '#0A1E3D' }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '6px',
              padding: '16px 18px',
              border: '1px solid #E2E8F0',
              marginBottom: '20px',
            }}
          >
            <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0A1E3D', marginBottom: '10px' }}>
              Have a coupon code?
            </p>
            {appliedCoupon ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '0.88rem', color: '#16A34A', fontWeight: 500 }}>
                  {appliedCoupon.code} applied — {appliedCoupon.label}
                </span>
                <button
                  onClick={removeCoupon}
                  style={{ fontSize: '0.82rem', color: '#64748B', marginLeft: 'auto', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                    placeholder="SARSEN20"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      padding: '9px 12px',
                      borderRadius: '7px',
                      border: couponError ? '1px solid #EF4444' : '1px solid #CBD5E1',
                      fontSize: '0.93rem',
                      color: '#0A1E3D',
                      background: '#fff',
                      outline: 'none',
                      letterSpacing: '0.05em',
                    }}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    style={{
                      flexShrink: 0,
                      padding: '9px 16px',
                      borderRadius: '7px',
                      background: couponLoading || !couponInput.trim() ? '#E2E8F0' : '#0F172A',
                      color: couponLoading || !couponInput.trim() ? '#94A3B8' : '#fff',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: couponLoading || !couponInput.trim() ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s',
                    }}
                  >
                    {couponLoading ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : 'Apply'}
                  </button>
                </div>
                {couponError && (
                  <p style={{ fontSize: '0.8rem', color: '#EF4444', marginTop: '6px' }}>{couponError}</p>
                )}
              </>
            )}
          </div>

          <div style={{ marginTop: '16px', marginBottom: '8px', textAlign: 'center' }}>
            <p style={{ color: '#0A1E3D', fontSize: '0.85rem' }}>
              By proceeding ahead in the process you agree to the{' '}
              <a
                href="/legal-and-regulatory/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0A1E3D', textDecoration: 'underline', fontWeight: 500 }}
              >
                standard terms and conditions
              </a>{' '}
              of Sarsen Strategy Partners.
            </p>
          </div>
        </div>

        <div className="svc-modal-pad-h" style={{ paddingTop: '16px', paddingBottom: '24px', borderTop: '1px solid #F1F5F9', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <p style={{ fontSize: '0.82rem', color: '#0A1E3D', marginBottom: '2px', fontWeight: 500 }}>Total amount</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0A1E3D' }}>
                  {displayPrice}
                </p>
                {isDiscounted && (
                  <p style={{ fontSize: '0.82rem', color: '#64748B', textDecoration: 'line-through' }}>
                    {originalPrice}
                  </p>
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#0A1E3D' }}>Inclusive of all taxes.</p>
            </div>
          </div>

          <div className="svc-modal-actions" style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setStep('questions')}
              style={{
                padding: '11px 18px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '0.85rem',
                color: '#64748B',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back
            </button>
            <button
              onClick={initiatePayment}
              style={{
                flex: 1,
                padding: '11px 24px',
                borderRadius: '8px',
                background: '#0F172A',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pay {displayPrice} · Buy Now
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderProcessingStep = () => (
    <div className="svc-modal-pad-h" style={{ paddingTop: '64px', paddingBottom: '64px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <svg className="w-10 h-10 animate-spin mx-auto" fill="none" viewBox="0 0 24 24" style={{ color: service.accentColor }}>
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
      <p style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>
        {verifyLoading ? 'Setting up your account…' : 'Opening Razorpay…'}
      </p>
      <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
        {verifyLoading
          ? 'Payment received. Creating your account and engagement — just a moment.'
          : 'Please do not close this window. Complete the payment in the Razorpay window.'}
      </p>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="svc-modal-pad-h" style={{ paddingTop: '48px', paddingBottom: '48px', textAlign: 'center' }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: `rgba(${accentRgb},0.10)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        border: `1.5px solid rgba(${accentRgb},0.25)`,
      }}>
        <svg className="w-7 h-7" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
        Payment Confirmed
      </h3>

      <p style={{ fontSize: '0.85rem', color: '#475569', maxWidth: '340px', margin: '0 auto 16px' }}>
        Your purchase of <strong>{service.title}</strong> is confirmed.
      </p>

      {plainPassword && (
        <div style={{
          background: '#F0FDF4',
          border: '1.5px solid #86EFAC',
          borderRadius: '6px',
          padding: '16px 20px',
          maxWidth: '340px',
          margin: '0 auto 20px',
          textAlign: 'left',
        }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: '#16A34A',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '6px',
          }}>
            Your Account Password
          </p>
          <p style={{ fontSize: '0.72rem', color: '#15803D', marginBottom: '10px' }}>
            Your account has been created with the email below. Save this password — it will <strong>not</strong> be shown again.
          </p>

          <div style={{
            background: '#DCFCE7',
            borderRadius: '7px',
            padding: '10px 14px',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#14532D',
            letterSpacing: '0.12em',
            textAlign: 'center',
            border: '1px solid #86EFAC',
            userSelect: 'all',
            wordBreak: 'break-all',
          }}>
            {plainPassword}
          </div>

          <p style={{ fontSize: '0.68rem', color: '#16A34A', marginTop: '8px', textAlign: 'center' }}>
            Account email: <strong>{email}</strong>
          </p>
        </div>
      )}

      {!plainPassword && (
        <p style={{ fontSize: '0.82rem', color: '#64748B', maxWidth: '340px', margin: '0 auto 20px' }}>
          Welcome back. Your new engagement has been added to your existing account.
        </p>
      )}

      <p style={{ fontSize: '0.78rem', color: '#94A3B8', maxWidth: '320px', margin: '0 auto 24px' }}>
        Our team will reach out within 24 hours to schedule your first session.
      </p>

      <button
        onClick={onClose}
        style={{
          padding: '10px 28px',
          borderRadius: '8px',
          background: `rgba(${accentRgb},1)`,
          color: '#fff',
          fontSize: '0.85rem',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Done
      </button>
    </div>
  );

  const renderFailureStep = () => (
    <div className="svc-modal-pad-h" style={{ paddingTop: '52px', paddingBottom: '52px', textAlign: 'center' }}>
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(239,68,68,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: '1.5px solid rgba(239,68,68,0.20)',
        }}
      >
        <svg className="w-7 h-7" fill="none" stroke="#EF4444" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
        Payment Failed
      </h3>
      <p style={{ fontSize: '0.83rem', color: '#475569', maxWidth: '340px', margin: '0 auto 6px' }}>
        {failureReason}
      </p>
      <p style={{ fontSize: '0.82rem', color: '#64748B', maxWidth: '340px', margin: '0 auto 24px' }}>
        Please contact our customer support team at{' '}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          style={{ color: '#3B82F6', textDecoration: 'underline' }}
        >
          {SUPPORT_EMAIL}
        </a>
        {' '}and we will resolve this immediately.
      </p>
      <div className="svc-modal-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setStep('summary')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '0.85rem',
            color: '#475569',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=Payment Failed — ${service.title}`}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            background: '#EF4444',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Contact Support
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Self-contained modal styles (copied from the page-level style
          block so this modal looks identical on ANY page). */}
      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .purchase-modal input::placeholder,
        .purchase-modal textarea::placeholder { color: #475569; }
        .purchase-modal select { color: #0A1E3D; }
        .svc-modal-pad-h { padding-left: 32px; padding-right: 32px; }
        @media (max-width: 640px) {
          .svc-modal-pad-h { padding-left: 20px; padding-right: 20px; }
          .svc-modal-footer { flex-wrap: wrap; }
          .svc-modal-actions { flex-direction: column-reverse; }
          .svc-modal-actions > button,
          .svc-modal-actions > a {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    <div
      className="fixed inset-0 z-50 overflow-y-auto purchase-modal"
      style={{
        backgroundColor: 'rgba(2, 8, 22, 0.80)',
        backdropFilter: 'blur(10px)',   // increased blur
        WebkitBackdropFilter: 'blur(10px)', // Safari support
      }}
      onClick={handleBackdropClick}
    >
      <div className="flex items-end sm:items-center justify-center min-h-full sm:px-4 sm:py-8">
        <div
          className="relative w-full sm:max-w-lg"
          style={{ animation: 'modalSlideIn 0.32s cubic-bezier(0.22,1,0.36,1) both' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
            }}
          >
            {step === 'questions' && renderQuestionsStep()}
            {step === 'summary' && renderSummaryStep()}
            {step === 'processing' && renderProcessingStep()}
            {step === 'success' && renderSuccessStep()}
            {step === 'failure' && renderFailureStep()}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PurchaseModal;
