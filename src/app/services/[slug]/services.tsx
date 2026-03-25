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
  backendId: string;    // MongoDB _id — used for all API calls
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

export { };

declare global {
  interface Window {
    Razorpay: any | (new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (res: Record<string, unknown>) => void) => void;
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
// PURCHASE MODAL
// ════════════════════════════════════════════════════════════════

type ModalStep = 'questions' | 'summary' | 'processing' | 'success' | 'failure';

interface PurchaseModalProps {
  service: ServiceData;
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: FC<PurchaseModalProps> = ({ service, isOpen, onClose }) => {
  // ── Dedicated Email State ──────────────────────────────────────
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { user } = useAuth();
  // ── Form answers keyed by question id ─────────────────────────
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [step, setStep] = useState<ModalStep>('questions');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Coupon state ───────────────────────────────────────────────
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    label: string;
    finalPrice: number;
    finalPriceDisplay: string;
  } | null>(null);

  // ── Payment failure details ────────────────────────────────────
  const [failureReason, setFailureReason] = useState('');

  // ── Post-payment verification state ───────────────────────────
  // plainPassword: the generated password returned from POST /payments/verify.
  //   Only exists for NEW users — null for returning customers.
  //   This is the only moment the plain password exists — shown once, never stored.
  // verifyLoading: true while we are calling /payments/verify after Razorpay fires.
  //   Shows a "Confirming your payment..." message instead of the success screen
  //   while the server creates the user and engagement.
  const [plainPassword, setPlainPassword] = useState<string | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset everything when modal closes
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
      setPlainPassword(null);   // Clear generated password when modal closes
      setVerifyLoading(false);  // Clear verify loading state when modal closes
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
      if (max && current.length >= max) return;
      setAnswer(questionId, [...current, optionValue]);
    }
    if (errors[questionId]) setErrors((prev) => ({ ...prev, [questionId]: '' }));
  };

  // ── Validation ─────────────────────────────────────────────────

  const validateQuestions = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // 1. Validate hardcoded email
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('A valid email address is required.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // 2. Validate dynamic questions
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

  // ── Coupon application ─────────────────────────────────────────
  // Hits POST /coupons/validate
  // serviceId is the MongoDB backendId, not the numeric frontend id

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      // Backend returns { finalPrice: number (paise), couponId: string }
      // A successful response means valid. Errors thrown as ApiError with exact message.
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

  // ── Payment ────────────────────────────────────────────────────
  //
  // FULL FLOW (4 steps):
  //
  // Step 1: POST /payments/create-order
  //   Sends serviceId, userEmail, optional couponCode, purchaseAnswers.
  //   Backend creates a Razorpay order and a PENDING Payment record in MongoDB.
  //   Returns { orderId, amount, currency, keyId }.
  //
  // Step 2: Open Razorpay modal
  //   The Razorpay SDK opens a payment UI using orderId and keyId.
  //   The user completes payment inside Razorpay's modal.
  //
  // Step 3: Razorpay handler fires
  //   After the user pays, Razorpay calls our handler function with:
  //     razorpay_order_id, razorpay_payment_id, razorpay_signature
  //   We do NOT show success here yet — we must verify first.
  //
  // Step 4: POST /payments/verify
  //   We send the three Razorpay values to our backend.
  //   Backend verifies the HMAC signature, creates the user account,
  //   generates a password (new users only), creates the Engagement,
  //   and returns { plainPassword, isNewUser, engagementId }.
  //   NOW we show the success screen with the password.
  //
  // WHY Step 4 instead of just showing success on Step 3?
  //   The webhook (which does the same work) cannot reach localhost.
  //   Step 4 is the localhost-safe equivalent — it also works in production
  //   as a fast, user-facing path. The webhook is a production backup.

  const initiatePayment = async () => {
    setStep('processing');

    // Build the purchaseAnswers array from the form state.
    // Every question gets an entry — unanswered optional questions get an empty string.
    const purchaseAnswers = service.questions.map((q) => ({
      questionId:   q.id    || 'unknown_id',
      questionText: q.label || 'Unknown Question',
      answer: Array.isArray(answers[q.id])
        ? (answers[q.id] as string[]).join(', ')   // multiselect: join array to CSV string
        : (answers[q.id] as string) || '',          // single value: use as-is, or empty string
    }));

    try {
      // ── Step 1: Create the Razorpay order on our backend ──────────
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

      // ── Step 2 & 3: Open Razorpay modal ───────────────────────────
      const rzp = new window.Razorpay({
        key:         orderData.keyId ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      orderData.amount,
        currency:    orderData.currency ?? 'INR',
        name:        'Sarsen & Company',
        description: service.title,
        order_id:    orderData.orderId,
        theme:       { color: service.accentColor },

        modal: {
          ondismiss: () => {
            // User closed the Razorpay modal without paying
            setFailureReason('Payment was cancelled. No amount has been charged.');
            setStep('failure');
          },
        },

        // ── Step 4: This fires after the user pays successfully ──────
        // paymentResponse contains the three Razorpay identifiers.
        // We send them to POST /payments/verify which:
        //   - Verifies the HMAC signature (proves Razorpay processed it)
        //   - Creates the user account and generates a password
        //   - Creates the Engagement with checklist
        //   - Returns the plainPassword (new users only)
        handler: async (paymentResponse: Record<string, string>) => {
          setVerifyLoading(true); // Show "Confirming your payment..." while backend works

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

            // Store the password in state so renderSuccessStep can display it.
            // This is the only moment the plain password exists.
            setPlainPassword(verifyData.plainPassword);
            setStep('success');

          } catch (verifyErr: any) {
            // Verification failed — payment may have gone through but our
            // backend could not process it. Show support contact.
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

  // ── Backdrop click ─────────────────────────────────────────────

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (step === 'processing') return; // block close during payment
    if (e.target === e.currentTarget) onClose();
  };

  // ── Price display ──────────────────────────────────────────────

  const displayPrice = appliedCoupon ? appliedCoupon.finalPriceDisplay : service.priceDisplay;
  const isDiscounted = !!appliedCoupon;
  const originalPrice = service.priceDisplay;

  // ── Flexible services max (for multiselect guard) ──────────────

  const getFlexMax = (questionId: string): number | null => {
    if (questionId === 'flexible_services') return service.maxFlexibleSelections ?? null;
    return null;
  };

  // ════════════════════════════════════════════════════════════════
  // RENDER HELPERS
  // ════════════════════════════════════════════════════════════════

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
                      border: checked
                        ? `1px solid #0A1E3D`                // <-- changed: use #0A1E3D for border
                        : '1px solid #E2E8F0',
                      background: checked
                        ? `rgba(${accentRgb},0.06)`          // keep existing background
                        : '#F8FAFC',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: checked ? '#0A1E3D' : '#CBD5E1',  // <-- changed
                        background: checked ? '#0A1E3D' : 'transparent', // <-- changed
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
                      border: checked
                        ? `1px solid #0A1E3D`                // <-- changed: use #0A1E3D for border
                        : '1px solid #E2E8F0',
                      background: checked
                        ? `rgba(${accentRgb},0.06)`          // keep existing background
                        : '#F8FAFC',
                      opacity: disabled ? 0.4 : 1,
                      transition: 'all 0.15s',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border-2"
                      style={{
                        borderColor: checked ? '#0A1E3D' : '#CBD5E1',  // <-- changed
                        background: checked ? '#0A1E3D' : 'transparent', // <-- changed
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
  // STEP RENDERERS
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

      <div ref={scrollRef} style={{ padding: '28px 32px', overflowY: 'auto', maxHeight: '60vh' }}>

        {/* ── NEW HARDCODED EMAIL FIELD ── */}
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

        {/* ── DYNAMIC QUESTIONS ── */}
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

          <p style={{ color: '#94A3B8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            Order Summary
          </p>
          <h2 style={{ color: '#EEF2FF', fontWeight: 300, fontSize: '1.35rem', lineHeight: 1.3 }}>
            {service.title}
          </h2>
        </div>

        <div ref={scrollRef} style={{ padding: '24px 32px', overflowY: 'auto', maxHeight: '60vh' }}>
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

          {/* ── Coupon section ── */}
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '10px',
              padding: '16px 18px',
              border: '1px solid #E2E8F0',
              marginBottom: '20px', // increased margin to separate from terms
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

          {/* ── TERMS AND CONDITIONS NOTICE ── */}
          <div
            style={{
              marginTop: '16px',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '0.7rem', color: '#64748B' }}>
              By proceeding ahead in the process you agree to the{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0A1E3D', textDecoration: 'underline', fontWeight: 500 }}
              >
                standard terms and conditions
              </a>{' '}
              of Sarsen & Company.
            </p>
          </div>
        </div>

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

  const renderProcessingStep = () => (
    // This screen shows in two situations:
    // 1. verifyLoading = false → Razorpay modal is opening / user is paying
    // 2. verifyLoading = true  → User paid, we are calling POST /payments/verify
    //    to verify the signature, create the user account, and generate the password
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
    // SUCCESS SCREEN
    //
    // Two cases:
    // 1. plainPassword is set → new user. Show the password box prominently.
    //    This is the ONLY time the password will ever be visible.
    //    After the user closes this modal, the plain text password is gone forever.
    //    Only the bcrypt hash remains in the database.
    //
    // 2. plainPassword is null → returning customer. Show a welcome-back message.
    //    No password is generated or shown — they already have one.
    <div style={{ padding: '48px 32px', textAlign: 'center' }}>

      {/* ── Success icon ── */}
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

      {/* ── PASSWORD BOX — new users only ── */}
      {/* plainPassword is only non-null when the backend created a new user account */}
      {plainPassword && (
        <div style={{
          background: '#F0FDF4',
          border: '1.5px solid #86EFAC',
          borderRadius: '10px',
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

          {/* The password itself — displayed in monospace for clarity */}
          <div style={{
            background: '#DCFCE7',
            borderRadius: '7px',
            padding: '10px 14px',
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#14532D',
            letterSpacing: '0.12em',
            textAlign: 'center',
            border: '1px solid #86EFAC',
            userSelect: 'all', // Lets the user select all text with one click
          }}>
            {plainPassword}
          </div>

          <p style={{ fontSize: '0.68rem', color: '#16A34A', marginTop: '8px', textAlign: 'center' }}>
            Account email: <strong>{email}</strong>
          </p>
        </div>
      )}

      {/* ── Returning customer message — no password ── */}
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
            borderRadius: '16px',           // <-- changed: now all corners are rounded
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          }}
          // className="sm:rounded-md"      // <-- removed
        >
          {step === 'questions' && renderQuestionsStep()}
          {step === 'summary' && renderSummaryStep()}
          {step === 'processing' && renderProcessingStep()}
          {step === 'success' && renderSuccessStep()}
          {step === 'failure' && renderFailureStep()}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// PAGE SECTIONS (unchanged — no UI changes)
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
      style={{ backgroundColor: '#0A1E3D', minHeight: '480px' }}
    >
      {/* Dot grid */}
      

      <div className="max-w-7xl mx-auto relative">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <a href="/services" className="text-blue-300 hover:text-white transition-colors text-xs">
            Services
          </a>
          <span className="text-blue-800">/</span>
          <span className="text-blue-300 text-xs">{service.packageNumber}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className="inline-flex items-center gap-2 rounded-md px-4 py-1.5"
                  style={{
                    backgroundColor: `rgba(${rgb},0.08)`,
                    border: `1px solid rgba(${rgb},0.18)`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.accentColor }} />
                  <span className="text-xs font-medium st uppercase" style={{ color: service.accentColor }}>
                    {service.tag}
                  </span>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: `rgba(${rgb},0.08)`, color: service.accentColor, border: `1px solid rgba(${rgb},0.14)` }}
                >
                  {service.packageNumber}
                </span>
              </div>

              <p className="text-xs sttext-blue-300/70">
                {service.tagline}
              </p>

              <h1
                className="   text-white"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                {service.title}
              </h1>

              <p className="text-base   max-w-lg text-gray-400">
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
                  <p className="text-xs stmb-0.5 text-gray-500">
                    {m.label}
                  </p>
                  <p className="text-sm text-blue-300">{m.value}</p>
                </div>
              ))}
            </div>

            {/* CTA — UPDATED: white background, dark blue text, subtle hover shadow */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={onBuy}
                className="group bg-white text-[#002855] hover:shadow-md transition-shadow"
                style={{
                  padding: '14px 32px',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  letterSpacing: '0.01em',
                }}
              >
                Get Started — {service.priceDisplay}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="text-xs text-gray-500">
                Secure payment via Razorpay
              </p>
            </div>
          </div>

          {/* Right column — decorative */}
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

// ─── Core Services Section ────────────────────────────────────────

const CoreServicesSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ backgroundColor: '#0A1E3D' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs stmb-3 text-blue-300/70">
              Core Services — Always Included
            </p>
            <h2
              className=" mb-6 text-white"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              What we do<br />
              <span style={{ color: service.accentColor }}>in every engagement.</span>
            </h2>
            <p className="text-sm  text-gray-400">
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
                  backgroundColor: '#132B47',
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
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-blue-300 ">{cs}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Flexible Services Section ────────────────────────────────────

const FlexibleServicesSection: FC<{ service: ServiceData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  if (!service.flexibleServices) return null;

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16"
      style={{ backgroundColor: '#0A1E3D', borderTop: `1px solid rgba(${rgb},0.06)` }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs stmb-3 text-blue-300/70">
          Flexible Services — Choose up to {service.maxFlexibleSelections}
        </p>
        <h2
          className=" mb-2 text-white"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          Customise your<br />
          <span style={{ color: service.accentColor }}>engagement.</span>
        </h2>
        <p className="text-sm  mb-10 max-w-lg text-gray-400">
          Select up to {service.maxFlexibleSelections} of the following services when you complete your intake form.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.flexibleServices.map((fs, i) => (
            <div
              key={fs.id}
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                backgroundColor: '#132B47',
                border: `1px solid rgba(${rgb},0.08)`,
                animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 50}ms both`,
              }}
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center mb-3"
                style={{ background: `rgba(${rgb},0.10)`, border: `1px solid rgba(${rgb},0.16)` }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm font-medium mb-1 text-blue-300">{fs.label}</p>
              <p className="text-xs  text-gray-400">{fs.description}</p>
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
      style={{ backgroundColor: '#0A1E3D', borderTop: `1px solid rgba(${rgb},0.06)` }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs stmb-3 text-blue-300/70">
          Customer Service Roadmap
        </p>
        <h2
          className=" mb-10 text-white"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          How we work<br />
          <span style={{ color: service.accentColor }}>together.</span>
        </h2>

        <div className="relative">
          <div
            className="absolute left-5 top-6 bottom-6 w-px hidden sm:block"
            style={{ background: `linear-gradient(to bottom, rgba(${rgb},0.30), rgba(${rgb},0.05))` }}
          />

          <div className="space-y-6">
            {service.customerServiceRoadmap.map((step, i) => (
              <div key={step.step} className="flex gap-5 relative">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{
                    backgroundColor: '#132B47',
                    border: `1.5px solid rgba(${rgb},0.30)`,
                    animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both`,
                  }}
                >
                  <span style={{ color: service.accentColor, fontSize: '0.8rem', fontWeight: 700 }}>
                    {step.step}
                  </span>
                </div>
                <div
                  className="flex-1 pb-6"
                  style={{
                    borderBottom: i < service.customerServiceRoadmap.length - 1
                      ? `1px solid rgba(${rgb},0.06)` : 'none',
                    animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both`,
                  }}
                >
                  <p className="text-sm font-medium mb-1 text-blue-300">{step.title}</p>
                  <p className="text-sm  text-gray-400">{step.description}</p>
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
      style={{ backgroundColor: '#0A1E3D', borderTop: `1px solid rgba(${rgb},0.06)` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          <div
            className="sm:col-span-2 rounded-md p-8"
            style={{ backgroundColor: '#132B47', border: `1px solid rgba(${rgb},0.10)` }}
          >
            <p className="text-xs stmb-3 text-blue-300/70">
              Targeted for
            </p>
            <p className="text-lg   text-white">
              {service.targetedFor}
            </p>
          </div>

          <div
            className="rounded-md p-8 flex flex-col justify-between"
            style={{
              background: `linear-gradient(145deg, rgba(${rgb},0.12) 0%, rgba(${rgb},0.04) 100%)`,
              border: `1px solid rgba(${rgb},0.18)`,
            }}
          >
            <div>
              <p className="text-xs stmb-3 text-blue-300/70">
                Investment
              </p>
              <p className="text-3xl  mb-1 text-white">
                {service.priceDisplay}
              </p>
              <p className="text-xs mb-6 text-gray-400">
                + GST · {service.duration}
              </p>
            </div>
            {/* CTA — UPDATED: white background, dark blue text, subtle hover shadow */}
            <button
              onClick={onBuy}
              className="bg-white text-[#002855] hover:shadow-md transition-shadow w-full flex items-center justify-center gap-1.5"
              style={{
                padding: '12px',
                borderRadius: '9px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
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
            <CoreServicesSection service={service} />
            {service.flexibleServices && <FlexibleServicesSection service={service} />}
            <RoadmapSection service={service} />
            <TargetBanner service={service} onBuy={openModal} />
          </>
        )}
      </main>

      <PurchaseModal service={service} isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}