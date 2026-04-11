'use client';

/**
 * ServicePage.tsx
 * ─────────────────────────────────────────────────────────────────
 * THE MOULD — individual service page layout.
 * Reads one ServiceData object (resolved by slug before render)
 * and renders the full page + purchase modal.
 *
 * USAGE (Next.js App Router example):
 * // app/services/[slug]/page.tsx
 * import { getServiceBySlug } from '@/data/services.data';
 * import ServicePage from '@/components/ServicePage';
 * export default function Page({ params }) {
 * const service = getServiceBySlug(params.slug);
 * if (!service) notFound();
 * return <ServicePage service={service} />;
 * }
 *
 * RAZORPAY NOTE:
 * Add the Razorpay script to your layout:
 * <Script src="https://checkout.razorpay.com/v1/checkout.js" />
 *
 * COUPON NOTE:
 * Coupon validation hits POST /coupons/validate
 * Request:  { code: string, serviceId: string (MongoDB _id) }
 * Response: { valid: boolean, finalPrice: number,
 * discountLabel: string, message?: string }
 * Discount % is NEVER in the frontend — only the final price.
 *
 * PAYMENT FLOW:
 * 1. User fills form → clicks Buy
 * 2. POST /payments/create-order → { orderId, amount, currency, keyId }
 *    Sends: { serviceId (backendId), userEmail, couponCode?, purchaseAnswers }
 * 3. Razorpay modal opens with those values
 * 4. User pays → Razorpay handler fires with:
 *    { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 * 5. POST /payments/verify → { engagementId, isNewUser, plainPassword }
 *    Backend verifies HMAC signature, creates user account (if new),
 *    generates password, creates Engagement, stores PurchaseQuestionnaire.
 * 6. Success screen shows — new users see their generated password ONCE.
 *    Password is never stored in plain text after this moment.
 * 7. On payment failure → show failure message with support email
 *
 * NOTE: The Razorpay webhook (POST /payments/webhook) also runs in production
 * as a server-side backup. fulfillAfterPayment has idempotency protection
 * so the user/engagement is never created twice even if both paths fire.
 * ─────────────────────────────────────────────────────────────────
 */

'use client';

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  FC,
  MouseEvent,
  ChangeEvent,
} from 'react';
import { apiRequest } from '@/services/api';
import { getUserToken } from '@/services/cookies';
import { useAuth } from '../../context/AuthContext';

// ─── Types ───────────────────────────────────────────────────────

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
interface CustomerServiceStep { step: number; title: string; description: string; }

export interface ServiceData {
  id: number;
  backendId: string;
  slug: string;
  packageNumber: string;
  title: string;
  tagline: string;
  tag: string;
  accentColor: string;
  accentColorRgb: string;
  targetedFor: string;
  problemStatement: string;
  excerpt: string;
  price: number;
  priceDisplay: string;
  duration: string;
  deliveryFormat: string;
  coreServices: string[];
  flexibleServices: FlexibleServiceOption[] | null;
  maxFlexibleSelections: number | null;
  deliverables: string[];
  outcome: string;
  impactIndices: string[];
  customerServiceRoadmap: CustomerServiceStep[];
  googleSheetsNote: string;
  questions: ServiceQuestion[];
}

const SUPPORT_EMAIL = 'contact@sarsenandcompany.com';

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
// PURCHASE MODAL – COMPLETELY UNTOUCHED
// ════════════════════════════════════════════════════════════════

type ModalStep = 'questions' | 'summary' | 'processing' | 'success' | 'failure';

interface PurchaseModalProps {
  service: ServiceData;
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
        couponId:   string;
      }>('POST', '/coupons/validate', {
        body: {
          code:      couponInput.trim().toUpperCase(),
          serviceId: service.backendId,
        },
      });

      const finalPriceRupees  = data.finalPrice / 100;
      const originalRupees    = service.price / 100;
      const savedRupees       = originalRupees - finalPriceRupees;
      const finalPriceDisplay = `₹${finalPriceRupees.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
      const discountLabel     = `Save ₹${savedRupees.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;

      setAppliedCoupon({
        code:              couponInput.trim().toUpperCase(),
        label:             discountLabel,
        finalPrice:        data.finalPrice,
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
      questionId:   q.id    || 'unknown_id',
      questionText: q.label || 'Unknown Question',
      answer: Array.isArray(answers[q.id])
        ? (answers[q.id] as string[]).join(', ')
        : (answers[q.id] as string) || '',
    }));

    try {
      const orderData = await apiRequest<{
        orderId: string;
        amount:  number;
        currency: string;
        keyId:   string;
      }>('POST', '/payments/create-order', {
        body: {
          serviceId:       service.backendId,
          userEmail:       email,
          couponCode:      appliedCoupon?.code ?? undefined,
          purchaseAnswers,
        },
        token: getUserToken() ?? undefined,
      });

      if (!orderData.orderId) throw new Error('Order creation failed.');

      const rzp = new window.Razorpay({
        key:         orderData.keyId ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      orderData.amount,
        currency:    orderData.currency ?? 'INR',
        name:        'Sarsen Strategy Partners',
        description: service.title,
        order_id:    orderData.orderId,
        theme:       { color: service.accentColor },
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
              engagementId:  string;
              isNewUser:     boolean;
              plainPassword: string | null;
            }>('POST', '/payments/verify', {
              body: {
                razorpay_order_id:   paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature:  paymentResponse.razorpay_signature,
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
      color: '#1E293B',
      fontSize: '0.85rem',
      fontWeight: 500,
      marginBottom: '6px',
      display: 'block',
    };

    const inputStyle: React.CSSProperties = {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: error ? '1px solid #EF4444' : '1px solid #CBD5E1',
      fontSize: '0.85rem',
      color: '#0F172A',
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
                    <span style={{ fontSize: '0.83rem', color: '#334155' }}>{o.label}</span>
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
                <p style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '4px' }}>
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
                    <span style={{ fontSize: '0.83rem', color: '#334155' }}>{o.label}</span>
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
          <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>{q.helpText}</p>
        )}
        {error && (
          <p style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: '4px' }}>{error}</p>
        )}
      </div>
    );
  };

  const renderQuestionsStep = () => (
    <>
      <div
        style={{
          background: `linear-gradient(135deg, #002855 0%, #0A1628 100%)`,
          padding: '28px 32px 24px',
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

      <div ref={scrollRef} style={{ padding: '28px 32px' }}>
        <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
          <label style={{ color: '#1E293B', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', display: 'block' }}>
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
              fontSize: '0.85rem',
              color: '#0F172A',
              outline: 'none',
              background: '#F8FAFC',
              transition: 'border-color 0.15s',
              boxSizing: 'border-box',
            }}
          />
          {emailError && (
            <p style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: '4px' }}>{emailError}</p>
          )}
        </div>

        {service.questions.map(renderQuestion)}
      </div>

      <div
        style={{
          padding: '16px 32px 24px',
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
          style={{
            background: `linear-gradient(135deg, #002855 0%, #0A1628 100%)`,
            padding: '28px 32px 24px',
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

          <p style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '6px' }}>
            Order Summary
          </p>
          <h2 style={{ color: '#EEF2FF', fontWeight: 300, fontSize: '1.35rem', lineHeight: 1.3 }}>
            {service.title}
          </h2>
        </div>

        <div ref={scrollRef} style={{ padding: '28px 32px' }}>
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '6px',
              padding: '16px 18px',
              marginBottom: '20px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '2px' }}>{service.packageNumber}</p>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A' }}>
                  {service.title}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                {isDiscounted && (
                  <p style={{ fontSize: '0.78rem', color: '#94A3B8', textDecoration: 'line-through', marginBottom: '1px' }}>
                    {originalPrice}
                  </p>
                )}
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>
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
                    fontSize: '0.75rem',
                    color: '#64748B',
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
              <p style={{ fontSize: '.75rem', color: '#64748B', marginBottom: '8px' }}>
                Additional Services Selected
              </p>
              <div className="space-y-1.5">
                {selectedFlexItems.map((f) => (
                  <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke='#0A1E3D' viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                    <p style={{ fontSize: '.75rem', color: '#475569' }}>{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '.75rem', color: '#64748B',  marginBottom: '8px' }}>
              You will receive
            </p>
            <div className="space-y-1.5">
              {service.deliverables.map((d) => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke='#0A1E3D' viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p style={{ fontSize: '.75rem', color: '#475569' }}>{d}</p>
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
            <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '10px' }}>
              Have a coupon code?
            </p>
            {appliedCoupon ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '0.82rem', color: '#16A34A', fontWeight: 500 }}>
                  {appliedCoupon.code} applied — {appliedCoupon.label}
                </span>
                <button
                  onClick={removeCoupon}
                  style={{ fontSize: '0.72rem', color: '#94A3B8', marginLeft: 'auto', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
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
                      padding: '9px 12px',
                      borderRadius: '7px',
                      border: couponError ? '1px solid #EF4444' : '1px solid #CBD5E1',
                      fontSize: '0.83rem',
                      color: '#0F172A',
                      background: '#fff',
                      outline: 'none',
                      letterSpacing: '0.05em',
                    }}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    style={{
                      padding: '9px 16px',
                      borderRadius: '7px',
                      background: couponLoading || !couponInput.trim() ? '#E2E8F0' : '#0F172A',
                      color: couponLoading || !couponInput.trim() ? '#94A3B8' : '#fff',
                      fontSize: '0.82rem',
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
                  <p style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: '6px' }}>{couponError}</p>
                )}
              </>
            )}
          </div>

          <div style={{ marginTop: '16px', marginBottom: '8px', textAlign: 'center' }}>
            <p style={{ color: '#64748B' }}>
              By proceeding ahead in the process you agree to the{' '}
              <a
                href="/legal-and-regulatory/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textTransform:'0.75rem', color: '#0A1E3D', textDecoration: 'underline', fontWeight: 500 }}
              >
                standard terms and conditions
              </a>{' '}
              of Sarsen Strategy Partners.
            </p>
          </div>
        </div>

        <div style={{ padding: '16px 32px 24px', borderTop: '1px solid #F1F5F9', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '2px' }}>Total amount</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A'}}>
                  {displayPrice}
                </p>
                {isDiscounted && (
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                    {originalPrice}
                  </p>
                )}
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94A3B8' }}>+ GST as applicable · Secure payment via Razorpay</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
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
    <div style={{ padding: '64px 32px', textAlign: 'center' }}>
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
    <div style={{ padding: '48px 32px', textAlign: 'center' }}>
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
    <div style={{ padding: '52px 32px', textAlign: 'center' }}>
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
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: 'rgba(2, 8, 22, 0.80)', backdropFilter: 'blur(4px)' }}
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
  );
};

// ════════════════════════════════════════════════════════════════
// PAGE HERO – UNTOUCHED
// ════════════════════════════════════════════════════════════════

interface PageHeroProps {
  service: ServiceData;
  onBuy: () => void;
}

const PageHero: FC<PageHeroProps> = ({ service, onBuy }) => {
  const rgb = service.accentColorRgb;

  return (
    <section
      className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-0"
      style={{ backgroundColor: '#0A1E3D', minHeight: '480px' }}
    >
      <div className="max-w-7xl mx-auto relative">
        

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                
               
              </div>

              <p className="text-xs text-blue-300/70">
                {service.tagline}
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
                {service.title}
              </h1>

              <p className="text-base max-w-lg text-gray-400">
                {service.problemStatement}
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                { label: 'Duration', value: service.duration },
                { label: 'Format', value: service.deliveryFormat },
                { label: 'Outcome', value: service.outcome },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-xs mb-0.5 text-gray-500">{m.label}</p>
                  <p className="text-sm text-blue-300">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={onBuy}
                className="group bg-white text-[#002855] hover:shadow-md transition-shadow"
                style={{
                  padding: '14px 32px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Get Started
                
              </button>
            </div>
          </div>

          <div
            className="relative hidden lg:flex items-center justify-end"
            style={{ height: '420px' }}
            aria-hidden="true"
          >
            <img src="/assets/resources/Strategy Head.svg" alt="" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// CHALLENGE WE SOLVE – 80/20 SPLIT, NO LINES, NO NUMBERING
// ════════════════════════════════════════════════════════════════

const ExcerptSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      style={{
        backgroundColor: '#061528',
        padding: '72px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: `rgba(${rgb},0.6)`,
          }}>
            The challenge we solve
          </span>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '48px',
        }}>
          {/* Left 80% excerpt */}
          <div style={{ flex: '1 1 70%', minWidth: '280px' }}>
            <p style={{
fontSize: 'clamp(1.25rem, 1.25vw, 1rem)',
              fontWeight: 300,
              lineHeight: 1,
              color: '#C8D8EA',
              margin: 0,
            }}>
              {service.excerpt}
            </p>
          </div>

          {/* Right 20% indices – no numbers, just bullet style */}
          <div style={{ flex: '0 0 240px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: ac,
              }}>
                Impact indices
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.impactIndices.map((idx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: ac,
                    marginTop: '8px',
                    flexShrink: 0,
                  }} />
                  <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#7A9ABE', margin: 0 }}>{idx}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// CORE SERVICES – NO NUMBERING, REDUCED GAP, NO LINES
// ════════════════════════════════════════════════════════════════

const CoreServicesSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;
  const services = service.coreServices;

  const cellBase: React.CSSProperties = {
    background: '#0F2647',
    borderRadius: '8px',
    padding: '28px',
    transition: 'background 0.2s, transform 0.2s',
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const cellMuted: React.CSSProperties = {
    ...cellBase,
    background: '#0C2040',
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = '#143256';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = (e.currentTarget as HTMLDivElement).dataset.originalBg || '#0F2647';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const SvcText = ({ children }: { children: string }) => (
    <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#C8DAEA', fontWeight: 400, margin: 0 }}>
      {children}
    </p>
  );

  return (
    <section style={{ backgroundColor: '#0A1E3D', padding: '72px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div style={{ marginBottom: '48px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: `rgba(${rgb},0.6)`,
          }}>
            Core services — always included
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
          className="lg:gap-6"
        >
          {/* Hero cell */}
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: '20px' }} className="lg:gap-6">
            <div
              style={{
                ...cellBase,
                gridRow: 'span 2',
                justifyContent: 'space-between',
                gap: 0,
                background: '#0F2647',
              }}
              data-original-bg="#0F2647"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  background: `rgba(${rgb},0.1)`,
                  fontSize: '11px',
                  fontWeight: 500,
                  color: ac,
                  marginBottom: '20px',
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: ac }} />
                  Mandatory
                </div>

                <h2 style={{
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: '#E8EEF5',
                  marginBottom: '16px',
                }}>
                  What we do<br />
                  <span style={{ color: ac, fontWeight: 300 }}>in every engagement.</span>
                </h2>

                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: '#5A7EA0',
                }}>
                  Every client receives these services in full, in the defined sequence — without exception.
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                paddingTop: '28px',
                marginTop: '28px',
              }}>
                <span style={{ fontSize: '40px', fontWeight: 300, color: ac, lineHeight: 1 }}>
                  {services.length}
                </span>
                <span style={{ fontSize: '16px', color: `rgba(${rgb},0.6)`, lineHeight: 1.5 }}>
                  Engagement Outcomes
                </span>
              </div>
            </div>
          </div>

          {/* Right 2x2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
            className="lg:gap-6"
          >
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                style={idx % 2 === 1 ? { ...cellMuted } : { ...cellBase }}
                data-original-bg={idx % 2 === 1 ? '#0C2040' : '#0F2647'}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <SvcText>{services[idx]}</SvcText>
              </div>
            ))}
          </div>

          {/* Bottom row 3 items */}
          <div
            style={{
              gridColumn: '1 / -1',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
            className="lg:gap-6"
          >
            {[4, 5, 6].map((idx, i) => (
              <div
                key={idx}
                style={i % 2 === 1 ? { ...cellMuted } : { ...cellBase }}
                data-original-bg={i % 2 === 1 ? '#0C2040' : '#0F2647'}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <SvcText>{services[idx]}</SvcText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// DELIVERABLES – 80/20 PROPORTION, SINGLE‑LINE COUNT
// ════════════════════════════════════════════════════════════════

const DeliverablesSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      style={{
        backgroundColor: '#061528',
        padding: '72px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: `rgba(${rgb},0.6)`,
          }}>
            Deliverables
          </span>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '48px',
        }}>
          {/* Left 80% – heading + count in single line */}
          <div style={{ flex: '1 1 70%', minWidth: '280px' }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#E2EBF5',
              marginBottom: '24px',
            }}>
              Tangible outputs.<br />
              <span style={{ color: ac }}>Not conversations.</span>
            </h2>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#4E6F8E',
              maxWidth: '480px',
              marginBottom: '32px',
            }}>
              Every engagement produces structured artefacts you own — documents, frameworks, and strategic assets that outlast the engagement.
            </p>

            {/* Single‑line count with label */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
            }}>
              <span style={{
                fontSize: '3.5rem',
                fontWeight: 300,
                color: ac,
                lineHeight: 1,
              }}>
                {service.deliverables.length}
              </span>
              <span style={{
                fontSize: '16px',
                fontWeight: 400,
                color: `rgba(${rgb},0.7)`,
                lineHeight: 1.4,
              }}>
                Non‑negotiable deliverables
              </span>
            </div>
          </div>

          {/* Right 20% – deliverable list */}
          <div style={{ flex: '0 0 260px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: ac,
              }}>
                What you receive
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {service.deliverables.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '3px',
                    background: `rgba(${rgb},0.12)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    <img src="/assets/about/Tick.svg" alt="" />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#8BAAC8',
                    margin: 0,
                  }}>
                    {d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// FLEXIBLE SERVICES – NO LINES
// ════════════════════════════════════════════════════════════════

const FlexibleServicesSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  if (!service.flexibleServices) return null;

  return (
    <section
      className="px-4 sm:px-6 lg:px-0 py-16"
      style={{ backgroundColor: '#0A1E3D' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-sm mb-3 text-blue-300/70">
          Flexible services — choose up to {service.maxFlexibleSelections}
        </p>
        <h2
          className="leading-tight mb-2 text-white"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          Customise your<br />
          <span style={{ color: service.accentColor }}>engagement.</span>
        </h2>
        <p className="text-sm mb-10 max-w-lg text-gray-400">
          Select up to {service.maxFlexibleSelections} of the following services when you complete your intake form.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {service.flexibleServices.map((fs, i) => (
            <div
              key={fs.id}
              className="group cursor-default rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#0F2744',
                animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 50}ms both`,
              }}
            >
              <div className="px-5 py-5">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center mb-4"
                  style={{ backgroundColor: `rgba(${rgb},0.10)` }}
                >
                  <svg className="w-4 h-4" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-sm font-medium mb-1 text-blue-300">{fs.label}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{fs.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// ROADMAP – HORIZONTAL SCROLLABLE, NO LINES, NO NUMBERS
// ════════════════════════════════════════════════════════════════

const RoadmapSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      className="px-4 sm:px-6 lg:px-0 py-16"
      style={{ backgroundColor: '#0A1E3D' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-sm mb-3 text-blue-300/70">
          How we work together
        </p>
        <h2
          className="leading-tight mb-10 text-white"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          Customer service<br />
          <span style={{ color: ac }}>roadmap.</span>
        </h2>

        {/* Horizontal scroll container – no scrollbar visible */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="roadmap-scroll"
        >
          {service.customerServiceRoadmap.map((step, i) => (
            <div
              key={step.step}
              style={{
                flex: '0 0 280px',
                background: '#0F2647',
                borderRadius: '6px',
                padding: '24px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Progress indicator – using a colored bar instead of numbers */}
              <div style={{
                width: '40px',
                height: '4px',
                background: ac,
                borderRadius: '2px',
                marginBottom: '20px',
                opacity: 0.7 + (i * 0.1),
              }} />
              <p style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#C8DAEA',
                marginBottom: '12px',
              }}>
                {step.title}
              </p>
              <p style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#7A9ABE',
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .roadmap-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// TRUST STRIP – NO DIVIDING LINES
// ════════════════════════════════════════════════════════════════

const FIRM_PILLARS = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Structured methodology',
    detail: 'Proven frameworks, applied with rigour',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: 'Focused execution',
    detail: 'Defined scope, no scope creep, clear timelines',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: 'Outcome orientation',
    detail: 'Measured by decisions enabled, not hours billed',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Senior‑only teams',
    detail: 'No junior analysts on client‑facing work',
  },
];

const TrustStrip: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      style={{
        backgroundColor: '#071829',
        padding: '64px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: `rgba(${rgb},0.6)`,
          }}>
            Why Sarsen Strategy Partners
          </span>
        </div>

        {/* No lines – each pillar stands independently with subtle rounded corners */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }}>
          {FIRM_PILLARS.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#0F2647',
                borderRadius: '8px',
                padding: '28px 24px',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#143256';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#0F2647';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                color: ac,
                marginBottom: '14px',
                opacity: 0.8,
              }}>
                {p.icon}
              </div>
              <p style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#C8D8EA',
                marginBottom: '6px',
              }}>
                {p.label}
              </p>
              <p style={{
                fontSize: '12px',
                lineHeight: 1.6,
                color: '#4E6F8E',
              }}>
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// TARGET BANNER
// ════════════════════════════════════════════════════════════════

const TargetBanner: FC<{ service: ServiceData; onBuy: () => void }> = ({ service, onBuy }) => {
  const rgb = service.accentColorRgb;

  return (
    <section
      className="px-4 sm:px-6 lg:px-0 py-16"
      style={{ backgroundColor: '#0A1E3D' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          <div
            className="sm:col-span-2 rounded-md p-8"
            style={{ backgroundColor: '#132B47' }}
          >
            <p className="text-sm mb-3 text-blue-300/70">
              Targeted for
            </p>
            <p className="text-lg text-white">
              {service.targetedFor}
            </p>

            {service.googleSheetsNote && (
              <div style={{
                marginTop: '20px',
                padding: '12px 16px',
                borderRadius: '6px',
                background: `rgba(${rgb},0.05)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}>
                <svg width="14" height="14" fill="none" stroke={service.accentColor} viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.7 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: '#5A7EA0', margin: 0 }}>
                  {service.googleSheetsNote}
                </p>
              </div>
            )}
          </div>

          <div
            className="rounded-md p-8 flex flex-col justify-between"
            style={{
              background: `linear-gradient(145deg, rgba(${rgb},0.12) 0%, rgba(${rgb},0.04) 100%)`,
            }}
          >
            <div>
              <p className="text-sm mb-2 text-blue-300/70">
                Investment
              </p>
              <p className="text-3xl mb-1 text-white">
                {service.priceDisplay}
              </p>
              <p className="text-xs mb-2 text-gray-400">
                Taxes Included
              </p>

            </div>
            <button
              onClick={onBuy}
              className="bg-white text-[#002855] hover:shadow-md transition-shadow w-full flex items-center justify-center gap-1.5"
              style={{
                padding: '12px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Get Started
             
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// FINAL CTA
// ════════════════════════════════════════════════════════════════

const FinalCTA: FC<{ service: ServiceData; onBuy: () => void }> = ({ service, onBuy }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      style={{
        backgroundColor: '#061528',
        padding: '80px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '48px',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: `rgba(${rgb},0.6)`,
              }}>
                Begin your engagement
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#E2EBF5',
              marginBottom: '16px',
              maxWidth: '560px',
            }}>
              Clarity is a strategic asset.<br />
              <span style={{ color: ac }}>Start building it today.</span>
            </h2>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#4E6F8E',
              maxWidth: '480px',
            }}>
              Secure your engagement in under five minutes. Our team will reach out within 24 hours to schedule your first working session.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '28px',
            }}>
              {[
                'Secure payment via Razorpay',
                '24-hour response guarantee',
                'Structured engagement from day one',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `rgba(${rgb},0.15)`,
                  }}>
                    <img src="/assets/about/Tick.svg" alt="" />
                  </div>
                  <span style={{ fontSize: '12px', color: '#4E6F8E' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            flexShrink: 0,
            padding: '36px',
            borderRadius: '6px',
            background: `rgba(${rgb},0.06)`,
            textAlign: 'center',
            minWidth: '240px',
          }}>
            <p style={{ fontSize: '11px', color: `rgba(${rgb},0.5)`, marginBottom: '8px' }}>
              Total investment
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 300, color: '#E2EBF5', marginBottom: '4px' }}>
              {service.priceDisplay}
            </p>

            <button
              onClick={onBuy}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: '6px',
                background: '#FFFFFF',
                color: '#002855',
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
              Begin
             
            </button>
            <p style={{ fontSize: '11px', color: '#2E4A63', marginTop: '12px' }}>
              Response within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// PAGE ROOT
// ════════════════════════════════════════════════════════════════

interface ServicePageProps {
  service: ServiceData;
}

export default function ServicePage({ service }: ServicePageProps): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        *::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
      `}</style>

      <main style={{ backgroundColor: "#0A1E3D", minHeight: "100vh" }}>
        {service && (
          <>
            <PageHero service={service} onBuy={openModal} />
            <ExcerptSection service={service} />
            <CoreServicesSection service={service} />
            <DeliverablesSection service={service} />
            {service.flexibleServices && <FlexibleServicesSection service={service} />}
            <RoadmapSection service={service} />
            <TrustStrip service={service} />
            <TargetBanner service={service} onBuy={openModal} />
            <FinalCTA service={service} onBuy={openModal} />
          </>
        )}
      </main>

      <PurchaseModal service={service} isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}