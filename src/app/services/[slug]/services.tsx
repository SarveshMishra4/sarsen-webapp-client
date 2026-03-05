'use client';

/**
 * ServicePage.jsx
 * ─────────────────────────────────────────────────────────────────
 * THE MOULD — individual service page layout.
 * Reads one ServiceData object (resolved by slug before render)
 * and renders the full page + purchase modal.
 *
 * USAGE (Next.js App Router example):
 *   // app/services/[slug]/page.tsx
 *   import { getServiceBySlug } from '@/data/services.data';
 *   import ServicePage from '@/components/ServicePage';
 *   export default function Page({ params }) {
 *     const service = getServiceBySlug(params.slug);
 *     if (!service) notFound();
 *     return <ServicePage service={service} />;
 *   }
 *
 * RAZORPAY NOTE:
 *   Add the Razorpay script to your _document / layout:
 *   <Script src="https://checkout.razorpay.com/v1/checkout.js" />
 *
 * COUPON NOTE:
 *   Coupon validation hits your API at POST /api/coupons/validate
 *   Expected request:  { code: string, serviceId: number }
 *   Expected response: { valid: boolean, discountedPrice: number,
 *                        discountLabel: string, message?: string }
 *   Discount % is NEVER in the frontend — only the final price.
 *
 * PAYMENT FLOW:
 *   1. User fills form → clicks Buy
 *   2. POST /api/orders/create → returns { orderId, amount, currency }
 *   3. Razorpay modal opens with those values
 *   4. On payment success → POST /api/orders/confirm with
 *      { razorpay_payment_id, razorpay_order_id, razorpay_signature,
 *        formAnswers, serviceId, couponCode? }
 *   5. Backend verifies signature → sends confirmation email → stores data
 *   6. Frontend shows success state
 *   On payment failure → show failure message with support email
 * ─────────────────────────────────────────────────────────────────
 */

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  FC,
  MouseEvent,
  ChangeEvent,
  FormEvent,
} from 'react';

// ─── Types (mirror services.data.ts — import in real project) ────

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

// ─── Constants ────────────────────────────────────────────────────

const SUPPORT_EMAIL = 'support@sarsenandcompany.com';

// ─── Razorpay global type shim ────────────────────────────────────

export {};

declare global {
  interface Window {
    Razorpay:
      | any
      | (new (options: Record<string, unknown>) => {
          open: () => void;
          on: (
            event: string,
            handler: (res: Record<string, unknown>) => void
          ) => void;
        });
  }
}

// ════════════════════════════════════════════════════════════════
// COUPON BADGE — inline display inside modal price area
// ════════════════════════════════════════════════════════════════

interface CouponBadgeProps {
  label: string;
  onRemove: () => void;
  accentRgb: string;
}

const CouponBadge: FC<CouponBadgeProps> = ({ label, onRemove, accentRgb }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
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
// PURCHASE MODAL
// Steps:  [questions] → [coupon + summary] → [processing] → [done/fail]
// ════════════════════════════════════════════════════════════════

type ModalStep = 'questions' | 'summary' | 'processing' | 'success' | 'failure';

interface PurchaseModalProps {
  service: ServiceData;
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: FC<PurchaseModalProps> = ({ service, isOpen, onClose }) => {
  // ── Form answers keyed by question id ─────────────────────────
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [step, setStep]       = useState<ModalStep>('questions');
  const [errors, setErrors]   = useState<Record<string, string>>({});

  // ── Coupon state ───────────────────────────────────────────────
  const [couponInput, setCouponInput]       = useState('');
  const [couponLoading, setCouponLoading]   = useState(false);
  const [couponError, setCouponError]       = useState('');
  const [appliedCoupon, setAppliedCoupon]   = useState<{
    code: string;
    label: string;
    finalPrice: number;
    finalPriceDisplay: string;
  } | null>(null);

  // ── Payment failure details ────────────────────────────────────
  const [failureReason, setFailureReason] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset everything when modal closes
  useEffect(() => {
    if (!isOpen) {
      setAnswers({});
      setStep('questions');
      setErrors({});
      setCouponInput('');
      setCouponLoading(false);
      setCouponError('');
      setAppliedCoupon(null);
      setFailureReason('');
    }
  }, [isOpen]);

  // Scroll modal body to top on step change
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [step]);

  if (!isOpen) return null;

  const accentRgb = service.accentColorRgb;

  // ── Answer helpers ─────────────────────────────────────────────

  const setAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const toggleMultiselect = (questionId: string, optionValue: string, max?: number | null) => {
    const current = (answers[questionId] as string[]) ?? [];
    if (current.includes(optionValue)) {
      setAnswer(questionId, current.filter((v) => v !== optionValue));
    } else {
      if (max && current.length >= max) return; // enforce max selections
      setAnswer(questionId, [...current, optionValue]);
    }
    if (errors[questionId]) setErrors((prev) => ({ ...prev, [questionId]: '' }));
  };

  // ── Validation ─────────────────────────────────────────────────

  const validateQuestions = (): boolean => {
    const newErrors: Record<string, string> = {};
    service.questions.forEach((q) => {
      if (!q.required) return;
      const val = answers[q.id];
      if (!val || (Array.isArray(val) ? val.length === 0 : val.trim() === '')) {
        newErrors[q.id] = 'This field is required.';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Coupon application ─────────────────────────────────────────

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput.trim().toUpperCase(), serviceId: service.id }),
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({
          code: couponInput.trim().toUpperCase(),
          label: data.discountLabel,       // e.g. "20% off"
          finalPrice: data.discountedPrice, // in paise
          finalPriceDisplay: data.discountedPriceDisplay, // e.g. "₹39,200"
        });
        setCouponInput('');
      } else {
        setCouponError(data.message ?? 'This coupon code is not valid for this package.');
      }
    } catch {
      setCouponError('Could not verify coupon. Please check your connection and try again.');
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  // ── Payment ────────────────────────────────────────────────────

  const initiatePayment = async () => {
    setStep('processing');

    const finalAmount = appliedCoupon ? appliedCoupon.finalPrice : service.price;

    try {
      // 1. Create order on backend
      const orderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          amount: finalAmount,
          couponCode: appliedCoupon?.code ?? null,
        }),
      });
      const orderData = await orderRes.json();

      if (!orderData.orderId) throw new Error('Order creation failed.');

      // 2. Open Razorpay modal
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalAmount,
        currency: 'INR',
        name: 'Sarsen & Company',
        description: service.title,
        order_id: orderData.orderId,
        theme: { color: service.accentColor },
        modal: {
          ondismiss: () => {
            // User closed Razorpay without paying
            setFailureReason('Payment was cancelled. No amount has been charged.');
            setStep('failure');
          },
        },
        handler: async (paymentResponse: Record<string, string>) => {
          // 3. Confirm payment on backend
          try {
            const confirmRes = await fetch('/api/orders/confirm', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id:   paymentResponse.razorpay_order_id,
                razorpay_signature:  paymentResponse.razorpay_signature,
                serviceId:   service.id,
                formAnswers: answers,
                couponCode:  appliedCoupon?.code ?? null,
              }),
            });
            const confirmData = await confirmRes.json();
            if (confirmData.success) {
              setStep('success');
            } else {
              setFailureReason('Payment was received but confirmation failed. Please contact our support team immediately.');
              setStep('failure');
            }
          } catch {
            setFailureReason('Payment was received but we could not confirm your order. Please contact support immediately.');
            setStep('failure');
          }
        },
      });

      rzp.on('payment.failed', (response: Record<string, Record<string, string>>) => {
        const reason = response?.error?.description ?? 'Payment was declined by your bank or card provider.';
        setFailureReason(reason);
        setStep('failure');
      });

      rzp.open();

    } catch {
      setFailureReason('We could not initiate the payment. Please try again or contact support.');
      setStep('failure');
    }
  };

  // ── Backdrop click ─────────────────────────────────────────────

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (step === 'processing') return; // block close during payment
    if (e.target === e.currentTarget) onClose();
  };

  // ── Price display ──────────────────────────────────────────────

  const displayPrice     = appliedCoupon ? appliedCoupon.finalPriceDisplay : service.priceDisplay;
  const isDiscounted     = !!appliedCoupon;
  const originalPrice    = service.priceDisplay;

  // ── Flexible services max (for multiselect guard) ──────────────

  const getFlexMax = (questionId: string): number | null => {
    if (questionId === 'flexible_services') return service.maxFlexibleSelections ?? null;
    return null;
  };

  // ════════════════════════════════════════════════════════════════
  // RENDER HELPERS
  // ════════════════════════════════════════════════════════════════

  const renderQuestion = (q: ServiceQuestion) => {
    const error   = errors[q.id];
    const val     = answers[q.id];
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
                      border: checked
                        ? `1px solid rgba(${accentRgb},0.40)`
                        : '1px solid #E2E8F0',
                      background: checked
                        ? `rgba(${accentRgb},0.06)`
                        : '#F8FAFC',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: checked ? service.accentColor : '#CBD5E1',
                        background: checked ? service.accentColor : 'transparent',
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
          const atMax    = flexMax !== null && selected.length >= flexMax;
          return (
            <div className="space-y-2 mt-1">
              {flexMax && (
                <p style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '4px' }}>
                  {selected.length} / {flexMax} selected
                </p>
              )}
              {q.options?.map((o) => {
                const checked  = selected.includes(o.value);
                const disabled = !checked && (atMax ?? false);
                return (
                  <label
                    key={o.value}
                    className="flex items-center gap-3 cursor-pointer"
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: checked
                        ? `1px solid rgba(${accentRgb},0.40)`
                        : '1px solid #E2E8F0',
                      background: checked
                        ? `rgba(${accentRgb},0.06)`
                        : '#F8FAFC',
                      opacity: disabled ? 0.4 : 1,
                      transition: 'all 0.15s',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border-2"
                      style={{
                        borderColor: checked ? service.accentColor : '#CBD5E1',
                        background: checked ? service.accentColor : 'transparent',
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

  // ════════════════════════════════════════════════════════════════
  // STEP: QUESTIONS
  // ════════════════════════════════════════════════════════════════

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
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: `rgba(${accentRgb},0.15)`, color: service.accentColor }}
          >
            {service.tag}
          </span>
          <span className="text-xs text-blue-300 opacity-70">{service.packageNumber}</span>
        </div>

        <h2 style={{ color: '#EEF2FF', fontFamily: 'Georgia, serif', fontWeight: 300, fontSize: '1.35rem', lineHeight: 1.3, marginBottom: '6px' }}>
          {service.title}
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
          Before we proceed — a few questions to make your engagement as precise as possible.
        </p>
      </div>

      <div ref={scrollRef} style={{ padding: '28px 32px', overflowY: 'auto', maxHeight: '60vh' }}>
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
            background: `rgba(${accentRgb},1)`,
            color: '#fff',
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

  // ════════════════════════════════════════════════════════════════
  // STEP: SUMMARY + COUPON + BUY
  // ════════════════════════════════════════════════════════════════

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

          <p style={{ color: '#94A3B8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            Order Summary
          </p>
          <h2 style={{ color: '#EEF2FF', fontFamily: 'Georgia, serif', fontWeight: 300, fontSize: '1.35rem', lineHeight: 1.3 }}>
            {service.title}
          </h2>
        </div>

        <div ref={scrollRef} style={{ padding: '24px 32px', overflowY: 'auto', maxHeight: '60vh' }}>

          {/* Package details */}
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '10px',
              padding: '16px 18px',
              marginBottom: '20px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '2px' }}>{service.packageNumber}</p>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', fontFamily: 'Georgia, serif' }}>
                  {service.title}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                {isDiscounted && (
                  <p style={{ fontSize: '0.78rem', color: '#94A3B8', textDecoration: 'line-through', marginBottom: '1px' }}>
                    {originalPrice}
                  </p>
                )}
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Georgia, serif' }}>
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
                { icon: '◷', label: service.duration },
                { icon: '◈', label: service.deliveryFormat },
                { icon: '⬛', label: `${service.coreServices.length} core services` },
              ].map((item) => (
                <span
                  key={item.label}
                  style={{
                    fontSize: '0.72rem',
                    color: '#64748B',
                    background: '#EFF6FF',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Selected flexible services */}
          {selectedFlexItems.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
                Additional Services Selected
              </p>
              <div className="space-y-2">
                {selectedFlexItems.map((f) => (
                  <div
                    key={f.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      padding: '8px 10px',
                      borderRadius: '7px',
                      background: `rgba(${accentRgb},0.05)`,
                      border: `1px solid rgba(${accentRgb},0.12)`,
                    }}
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p style={{ fontSize: '0.8rem', color: '#334155' }}>{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
              You will receive
            </p>
            <div className="space-y-1.5">
              {service.deliverables.map((d) => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p style={{ fontSize: '0.82rem', color: '#475569' }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coupon input */}
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '10px',
              padding: '16px 18px',
              border: '1px solid #E2E8F0',
              marginBottom: '4px',
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
                    placeholder="e.g. SARSEN20"
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      borderRadius: '7px',
                      border: couponError ? '1px solid #EF4444' : '1px solid #CBD5E1',
                      fontSize: '0.83rem',
                      color: '#0F172A',
                      background: '#fff',
                      outline: 'none',
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                    }}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    style={{
                      padding: '9px 16px',
                      borderRadius: '7px',
                      background: couponLoading || !couponInput.trim()
                        ? '#E2E8F0'
                        : `rgba(${accentRgb},1)`,
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

        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 32px 24px',
            borderTop: '1px solid #F1F5F9',
            background: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '2px' }}>Total amount</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Georgia, serif' }}>
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
                background: `rgba(${accentRgb},1)`,
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                letterSpacing: '0.01em',
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

  // ════════════════════════════════════════════════════════════════
  // STEP: PROCESSING
  // ════════════════════════════════════════════════════════════════

  const renderProcessingStep = () => (
    <div style={{ padding: '64px 32px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <svg className="w-10 h-10 animate-spin mx-auto" fill="none" viewBox="0 0 24 24" style={{ color: service.accentColor }}>
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
      <p style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginBottom: '6px', fontFamily: 'Georgia, serif' }}>
        Opening Razorpay…
      </p>
      <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
        Please do not close this window. Complete the payment in the Razorpay window.
      </p>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // STEP: SUCCESS
  // ════════════════════════════════════════════════════════════════

  const renderSuccessStep = () => (
    <div style={{ padding: '56px 32px', textAlign: 'center' }}>
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: `rgba(${accentRgb},0.10)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: `1.5px solid rgba(${accentRgb},0.25)`,
        }}
      >
        <svg className="w-7 h-7" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0F172A', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>
        Payment Confirmed
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '6px', maxWidth: '340px', margin: '0 auto 8px' }}>
        Your purchase of <strong>{service.title}</strong> is confirmed.
      </p>
      <p style={{ fontSize: '0.82rem', color: '#64748B', maxWidth: '340px', margin: '0 auto 24px' }}>
        You will receive a confirmation email shortly. Our team will reach out within 24 hours to schedule your first session.
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

  // ════════════════════════════════════════════════════════════════
  // STEP: FAILURE
  // ════════════════════════════════════════════════════════════════

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
      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>
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

  // ════════════════════════════════════════════════════════════════
  // MODAL WRAPPER
  // ════════════════════════════════════════════════════════════════

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4"
      style={{ backgroundColor: 'rgba(2, 8, 22, 0.80)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full sm:max-w-lg"
        style={{ animation: 'modalSlideIn 0.32s cubic-bezier(0.22,1,0.36,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px 16px 0 0',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          }}
          className="sm:rounded-2xl"
        >
          {step === 'questions'   && renderQuestionsStep()}
          {step === 'summary'     && renderSummaryStep()}
          {step === 'processing'  && renderProcessingStep()}
          {step === 'success'     && renderSuccessStep()}
          {step === 'failure'     && renderFailureStep()}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// PAGE SECTIONS
// ════════════════════════════════════════════════════════════════

// ─── Hero ────────────────────────────────────────────────────────

interface PageHeroProps {
  service: ServiceData;
  onBuy: () => void;
}

const PageHero: FC<PageHeroProps> = ({ service, onBuy }) => {
  const rgb = service.accentColorRgb;

  return (
    <section
      className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#020814', minHeight: '480px' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
          <defs>
            <pattern id="sp-dots" patternUnits="userSpaceOnUse" width="24" height="24">
              <circle cx="2" cy="2" r="1" fill={service.accentColor} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sp-dots)" />
        </svg>
        <div
          className="absolute -top-32 right-0 w-[700px] h-[600px]"
          style={{ background: `radial-gradient(ellipse at top right, rgba(${rgb},0.14) 0%, transparent 60%)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[400px]"
          style={{ background: `radial-gradient(ellipse at bottom left, rgba(${rgb},0.07) 0%, transparent 65%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <a href="/services" style={{ color: `rgba(${rgb},0.60)`, fontSize: '0.78rem', textDecoration: 'none' }}
            className="hover:opacity-100 transition-opacity">
            Services
          </a>
          <span style={{ color: `rgba(${rgb},0.30)`, fontSize: '0.78rem' }}>/</span>
          <span style={{ color: `rgba(${rgb},0.70)`, fontSize: '0.78rem' }}>{service.packageNumber}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                  style={{
                    backgroundColor: `rgba(${rgb},0.06)`,
                    border: `1px solid rgba(${rgb},0.16)`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.accentColor }} />
                  <span className="text-xs font-medium tracking-widest uppercase" style={{ color: service.accentColor }}>
                    {service.tag}
                  </span>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `rgba(${rgb},0.08)`, color: service.accentColor, border: `1px solid rgba(${rgb},0.14)` }}
                >
                  {service.packageNumber}
                </span>
              </div>

              <p className="text-xs tracking-widest uppercase" style={{ color: `rgba(${rgb},0.50)` }}>
                {service.tagline}
              </p>

              <h1
                className="font-light leading-tight tracking-tight"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  color: '#EEF2FF',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {service.title}
              </h1>

              <p
                className="text-base leading-relaxed font-light max-w-lg"
                style={{ color: `rgba(${rgb},0.45)` }}
              >
                {service.problemStatement}
              </p>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-5">
              {[
                { label: 'Duration', value: service.duration },
                { label: 'Format', value: service.deliveryFormat },
                { label: 'Outcome', value: service.outcome },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: `rgba(${rgb},0.35)` }}>
                    {m.label}
                  </p>
                  <p className="text-sm" style={{ color: '#C7D2FE' }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={onBuy}
                className="group"
                style={{
                  padding: '14px 32px',
                  borderRadius: '10px',
                  background: `rgba(${rgb},1)`,
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  letterSpacing: '0.01em',
                  boxShadow: `0 8px 24px rgba(${rgb},0.30)`,
                  transition: 'all 0.2s',
                }}
              >
                Get Started — {service.priceDisplay}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="text-xs" style={{ color: `rgba(${rgb},0.35)` }}>
                Secure payment via Razorpay
              </p>
            </div>
          </div>

          {/* Right — deliverables & impact preview */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#060C24', border: `1px solid rgba(${rgb},0.12)` }}
          >
            {/* Header band */}
            <div
              className="px-6 py-4"
              style={{ background: `linear-gradient(135deg, rgba(${rgb},0.18) 0%, rgba(${rgb},0.04) 100%)` }}
            >
              <p className="text-xs tracking-widest uppercase" style={{ color: `rgba(${rgb},0.70)` }}>
                What you receive
              </p>
            </div>
            <div className="px-6 py-5 space-y-3">
              {service.deliverables.map((d) => (
                <div key={d} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `rgba(${rgb},0.10)`, border: `1px solid rgba(${rgb},0.20)` }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: '#C7D2FE' }}>{d}</p>
                </div>
              ))}
            </div>
            <div
              className="px-6 py-4 mx-5 mb-5 rounded-xl"
              style={{ background: `rgba(${rgb},0.06)`, border: `1px solid rgba(${rgb},0.10)` }}
            >
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: `rgba(${rgb},0.50)` }}>
                Impact tracked by
              </p>
              {service.impactIndices.map((idx) => (
                <p key={idx} className="text-sm font-medium" style={{ color: service.accentColor }}>
                  ✦ {idx}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Core Services Section ────────────────────────────────────────

const CoreServicesSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ backgroundColor: '#020814' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: `rgba(${rgb},0.45)` }}>
              Core Services — Always Included
            </p>
            <h2
              className="font-light mb-6"
              style={{ color: '#EEF2FF', fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              What we do<br />
              <span style={{ color: service.accentColor }}>in every engagement.</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: `rgba(${rgb},0.40)` }}>
              These {service.coreServices.length} services are mandatory and non-negotiable. Every client receives them in full, in the defined sequence.
            </p>
          </div>

          <div className="space-y-3">
            {service.coreServices.map((cs, i) => (
              <div
                key={cs}
                className="flex items-start gap-4"
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: '#060C24',
                  border: `1px solid rgba(${rgb},0.07)`,
                  animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms both`,
                }}
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `rgba(${rgb},0.10)`,
                    border: `1px solid rgba(${rgb},0.18)`,
                    color: service.accentColor,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-sm" style={{ color: '#A5B4FC', lineHeight: 1.5 }}>{cs}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Flexible Services Section ───────────────────────────────────

const FlexibleServicesSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  if (!service.flexibleServices) return null;

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16"
      style={{ backgroundColor: '#030B1A', borderTop: `1px solid rgba(${rgb},0.06)` }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: `rgba(${rgb},0.45)` }}>
          Flexible Services — Choose up to {service.maxFlexibleSelections}
        </p>
        <h2
          className="font-light mb-2"
          style={{ color: '#EEF2FF', fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          Customise your<br />
          <span style={{ color: service.accentColor }}>engagement.</span>
        </h2>
        <p className="text-sm leading-relaxed mb-10 max-w-lg" style={{ color: `rgba(${rgb},0.40)` }}>
          Select up to {service.maxFlexibleSelections} of the following services when you complete your intake form.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.flexibleServices.map((fs, i) => (
            <div
              key={fs.id}
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                background: '#060C24',
                border: `1px solid rgba(${rgb},0.08)`,
                animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 50}ms both`,
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `rgba(${rgb},0.10)`, border: `1px solid rgba(${rgb},0.16)` }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: '#C7D2FE', fontFamily: 'Georgia, serif' }}>{fs.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: `rgba(${rgb},0.40)` }}>{fs.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Customer Service Roadmap Section ────────────────────────────

const RoadmapSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16"
      style={{ backgroundColor: '#020814', borderTop: `1px solid rgba(${rgb},0.06)` }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: `rgba(${rgb},0.45)` }}>
          Customer Service Roadmap
        </p>
        <h2
          className="font-light mb-10"
          style={{ color: '#EEF2FF', fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          How we work<br />
          <span style={{ color: service.accentColor }}>together.</span>
        </h2>

        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-5 top-6 bottom-6 w-px hidden sm:block"
            style={{ background: `linear-gradient(to bottom, rgba(${rgb},0.30), rgba(${rgb},0.05))` }}
          />

          <div className="space-y-6">
            {service.customerServiceRoadmap.map((step, i) => (
              <div key={step.step} className="flex gap-5 relative">
                {/* Step circle */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: '#020814',
                    border: `1.5px solid rgba(${rgb},0.30)`,
                    animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both`,
                  }}
                >
                  <span
                    style={{ color: service.accentColor, fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Georgia, serif' }}
                  >
                    {step.step}
                  </span>
                </div>
                {/* Content */}
                <div
                  className="flex-1 pb-6"
                  style={{
                    borderBottom: i < service.customerServiceRoadmap.length - 1
                      ? `1px solid rgba(${rgb},0.06)` : 'none',
                    animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both`,
                  }}
                >
                  <p className="text-sm font-medium mb-1" style={{ color: '#C7D2FE', fontFamily: 'Georgia, serif' }}>
                    {step.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: `rgba(${rgb},0.40)` }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Targeted For + Outcome Banner ───────────────────────────────

const TargetBanner: FC<{ service: ServiceData; onBuy: () => void }> = ({ service, onBuy }) => {
  const rgb = service.accentColorRgb;

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16"
      style={{ backgroundColor: '#030B1A', borderTop: `1px solid rgba(${rgb},0.06)` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          {/* Who it's for */}
          <div
            className="sm:col-span-2 rounded-2xl p-8"
            style={{ background: '#060C24', border: `1px solid rgba(${rgb},0.10)` }}
          >
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: `rgba(${rgb},0.45)` }}>
              Targeted for
            </p>
            <p
              className="text-lg leading-relaxed font-light"
              style={{ color: '#EEF2FF', fontFamily: 'Georgia, serif' }}
            >
              {service.targetedFor}
            </p>
          </div>

          {/* CTA card */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between"
            style={{
              background: `linear-gradient(145deg, rgba(${rgb},0.12) 0%, rgba(${rgb},0.04) 100%)`,
              border: `1px solid rgba(${rgb},0.18)`,
            }}
          >
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: `rgba(${rgb},0.55)` }}>
                Investment
              </p>
              <p
                className="text-3xl font-light mb-1"
                style={{ color: '#EEF2FF', fontFamily: 'Georgia, serif' }}
              >
                {service.priceDisplay}
              </p>
              <p className="text-xs mb-6" style={{ color: `rgba(${rgb},0.40)` }}>
                + GST · {service.duration}
              </p>
            </div>
            <button
              onClick={onBuy}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '9px',
                background: `rgba(${rgb},1)`,
                color: '#fff',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// PAGE ROOT — THE MOULD
// ════════════════════════════════════════════════════════════════

interface ServicePageProps {
  service: ServiceData;
}

export default function ServicePage({ service }: ServicePageProps): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal  = useCallback(() => setModalOpen(true),  []);
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

     <main style={{ backgroundColor: "#020814", minHeight: "100vh" }}>
  {service && (
    <>
      <PageHero service={service} onBuy={openModal} />

      <CoreServicesSection service={service} />

      {service.flexibleServices && (
        <FlexibleServicesSection service={service} />
      )}

      <RoadmapSection service={service} />

      <TargetBanner service={service} onBuy={openModal} />
    </>
  )}
</main>

      <PurchaseModal
        service={service}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  );
}