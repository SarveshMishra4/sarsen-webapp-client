'use client';

// =============================================================
// src/app/cohorts/[slug]/CohortApplicationModal.tsx
//
// Reusable multi-step application modal.
// Used by both:
//   - app/cohorts/page.tsx            (hub — card click)
//   - app/cohorts/[slug]/page.tsx     (individual page — Apply button)
//
// Flow:
//   Step 1…N  → cohort-specific questionnaire
//   Step N+1  → coupon code + price review
//   Step N+2  → Razorpay opens → success screen
//
// Add Razorpay script to your root layout:
//   <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
// =============================================================

import React, {
  useState,
  useEffect,
  FC,
  MouseEvent,
  ChangeEvent,
} from 'react';
import type { Cohort, ApplicationField, ApplicationStep } from './data';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface CohortApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cohort: Cohort;
}

type FormAnswers = Record<string, string | string[]>;

type ModalPhase =
  | { kind: 'questions'; stepIndex: number }
  | { kind: 'coupon' }
  | { kind: 'success' };

// ─────────────────────────────────────────────────────────────
// VALID COUPONS — replace with your API call in production
// ─────────────────────────────────────────────────────────────

const VALID_COUPONS: Record<string, number> = {
  SARSEN10:  10,
  EARLY20:   20,
  FOUNDER15: 15,
  PARTNER25: 25,
};

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function formatINR(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

// ─────────────────────────────────────────────────────────────
// SHARED STYLE CONSTANTS (blue palette)
// ─────────────────────────────────────────────────────────────

const INPUT =
  'w-full px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors bg-[#132B47] border border-blue-800/30 text-white placeholder-gray-500';
const LABEL =
  'block text-sm font-medium mb-1.5 text-blue-200';
const HELP =
  'text-xs mt-1 text-gray-400';

// ─────────────────────────────────────────────────────────────
// FIELD COMPONENTS
// ─────────────────────────────────────────────────────────────

interface FieldProps {
  field: ApplicationField;
  value: string | string[];
  onChange: (id: string, value: string | string[]) => void;
  error?: string;
}

const TextField: FC<FieldProps> = ({ field, value, onChange, error }) => (
  <div>
    <label className={LABEL} htmlFor={field.id}>
      {field.label}
      {field.required && <span className="text-blue-400 ml-1">*</span>}
    </label>
    <input
      id={field.id}
      type={
        field.type === 'number' ? 'number' :
        field.type === 'url'    ? 'url'    : 'text'
      }
      value={(value as string) || ''}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field.id, e.target.value)}
      placeholder={field.placeholder}
      className={`${INPUT} ${error ? 'border-red-500/50' : ''}`}
    />
    {field.helpText && <p className={HELP}>{field.helpText}</p>}
    {error && <p className="text-xs mt-1 text-red-400">{error}</p>}
  </div>
);

const TextareaField: FC<FieldProps> = ({ field, value, onChange, error }) => (
  <div>
    <label className={LABEL} htmlFor={field.id}>
      {field.label}
      {field.required && <span className="text-blue-400 ml-1">*</span>}
    </label>
    <textarea
      id={field.id}
      value={(value as string) || ''}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(field.id, e.target.value)}
      placeholder={field.placeholder}
      rows={4}
      className={`${INPUT} resize-none ${error ? 'border-red-500/50' : ''}`}
    />
    {field.helpText && <p className={HELP}>{field.helpText}</p>}
    {error && <p className="text-xs mt-1 text-red-400">{error}</p>}
  </div>
);

const SelectField: FC<FieldProps> = ({ field, value, onChange, error }) => (
  <div>
    <label className={LABEL} htmlFor={field.id}>
      {field.label}
      {field.required && <span className="text-blue-400 ml-1">*</span>}
    </label>
    <select
      id={field.id}
      value={(value as string) || ''}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(field.id, e.target.value)}
      className={`${INPUT} appearance-none cursor-pointer ${error ? 'border-red-500/50' : ''}`}
    >
      <option value="" disabled>Select an option…</option>
      {field.options?.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {field.helpText && <p className={HELP}>{field.helpText}</p>}
    {error && <p className="text-xs mt-1 text-red-400">{error}</p>}
  </div>
);

const RadioField: FC<FieldProps> = ({ field, value, onChange, error }) => (
  <div>
    <p className={LABEL}>
      {field.label}
      {field.required && <span className="text-blue-400 ml-1">*</span>}
    </p>
    {field.helpText && <p className={`${HELP} mb-2`}>{field.helpText}</p>}
    <div className="space-y-2">
      {field.options?.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onChange(field.id, opt.value)}
          >
            <span
              className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
              style={{
                borderColor: checked ? '#3B82F6' : 'rgba(59,130,246,0.25)',
                backgroundColor: checked ? 'rgba(59,130,246,0.15)' : 'transparent',
              }}
            >
              {checked && (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </span>
            <span
              className="text-sm transition-colors"
              style={{ color: checked ? '#93C5FD' : '#9CA3AF' }}
            >
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
    {error && <p className="text-xs mt-2 text-red-400">{error}</p>}
  </div>
);

const MultiSelectField: FC<FieldProps> = ({ field, value, onChange, error }) => {
  const selected = Array.isArray(value) ? value : [];
  const toggle = (v: string) => {
    const next = selected.includes(v)
      ? selected.filter((s) => s !== v)
      : [...selected, v];
    onChange(field.id, next);
  };
  return (
    <div>
      <p className={LABEL}>
        {field.label}
        {field.required && <span className="text-blue-400 ml-1">*</span>}
      </p>
      <p className={`${HELP} mb-2`}>Select all that apply.</p>
      <div className="flex flex-wrap gap-2">
        {field.options?.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{
                backgroundColor: active ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.05)',
                color: active ? '#93C5FD' : '#9CA3AF',
                border: `1px solid ${active ? 'rgba(59,130,246,0.40)' : 'rgba(59,130,246,0.12)'}`,
              }}
            >
              {active && '✓ '}{opt.label}
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs mt-2 text-red-400">{error}</p>}
    </div>
  );
};

// Dispatcher
const FormField: FC<FieldProps> = (props) => {
  switch (props.field.type) {
    case 'textarea':    return <TextareaField    {...props} />;
    case 'select':      return <SelectField      {...props} />;
    case 'radio':       return <RadioField       {...props} />;
    case 'multiselect': return <MultiSelectField {...props} />;
    default:            return <TextField        {...props} />;
  }
};

// ─────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────

const ProgressBar: FC<{ current: number; total: number }> = ({ current, total }) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="px-8 pt-4 pb-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-blue-400">
          Step {current} of {total}
        </span>
        <span className="text-xs text-gray-500">{pct}% complete</span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '3px', backgroundColor: 'rgba(59,130,246,0.10)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 bg-blue-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// COUPON + PRICE STEP (blue theme)
// ─────────────────────────────────────────────────────────────

interface CouponStepProps {
  cohort: Cohort;
  couponCode: string;
  setCouponCode: (v: string) => void;
  couponState: 'idle' | 'valid' | 'invalid' | 'checking';
  discountPct: number;
  finalPricePaise: number;
  onApplyCoupon: () => void;
  onPay: () => void;
  onBack: () => void;
  paying: boolean;
}

const CouponStep: FC<CouponStepProps> = ({
  cohort, couponCode, setCouponCode, couponState,
  discountPct, finalPricePaise, onApplyCoupon, onPay, onBack, paying,
}) => {
  const savings    = cohort.price - finalPricePaise;
  const hasDiscount = discountPct > 0;

  return (
    <div className="px-8 py-6 space-y-6">

      {/* Order summary */}
      <div
        className="rounded-md p-5 space-y-3"
        style={{ backgroundColor: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.12)' }}
      >
        <p className="text-xs font-medium sttext-gray-500">
          Order Summary
        </p>
        <p
          className="font-medium  text-white"
          style={{ fontSize: '0.95rem' }}
        >
          {cohort.title}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">{cohort.cohortNumber} · {cohort.startDate}</span>
          <span className="text-blue-300">{cohort.duration}</span>
        </div>

        {/* Price breakdown */}
        <div className="pt-3 space-y-1.5" style={{ borderTop: '1px solid rgba(59,130,246,0.08)' }}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Programme Fee</span>
            <span className={`text-blue-300 ${hasDiscount ? 'line-through opacity-50' : ''}`}>
              {formatINR(cohort.price)}
            </span>
          </div>
          {hasDiscount && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-400">Coupon ({discountPct}% off)</span>
              <span className="text-emerald-400">−{formatINR(savings)}</span>
            </div>
          )}
          <div
            className="flex items-center justify-between pt-2 font-semibold"
            style={{ borderTop: '1px solid rgba(59,130,246,0.08)' }}
          >
            <span className="text-white">Total Due</span>
            <span className="text-blue-300 text-lg">
              {formatINR(finalPricePaise)}
            </span>
          </div>
        </div>
      </div>

      {/* Coupon input */}
      <div>
        <label className={LABEL}>
          Coupon Code{' '}
          <span className="text-gray-500 font-normal">(optional)</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCouponCode(e.target.value.toUpperCase().trim())
            }
            placeholder="e.g. SARSEN10"
            className={`${INPUT} flex-1`}
            disabled={couponState === 'valid'}
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            disabled={!couponCode || couponState === 'valid' || couponState === 'checking'}
            className="px-4 py-3 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'rgba(59,130,246,0.14)',
              color: '#93C5FD',
              border: '1px solid rgba(59,130,246,0.25)',
            }}
          >
            {couponState === 'checking' ? '…' : couponState === 'valid' ? '✓' : 'Apply'}
          </button>
        </div>
        {couponState === 'valid' && (
          <p className="text-xs mt-1.5 font-medium text-emerald-400">
            ✓ Coupon applied — {discountPct}% discount
          </p>
        )}
        {couponState === 'invalid' && (
          <p className="text-xs mt-1.5 text-red-400">
            Invalid coupon code. Please check and try again.
          </p>
        )}
      </div>

      {/* Security note */}
      <div
        className="flex items-start gap-3 rounded-md p-3"
        style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(59,130,246,0.08)' }}
      >
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-xs text-gray-500">
          Payment is processed securely via Razorpay. Your application is saved — if payment
          fails you can return and retry.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-3 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            backgroundColor: 'rgba(59,130,246,0.06)',
            color: '#9CA3AF',
            border: '1px solid rgba(59,130,246,0.10)',
          }}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onPay}
          disabled={paying}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-semibold transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ backgroundColor: paying ? '#1D4ED8' : '#2563EB', color: '#ffffff' }}
        >
          {paying ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Opening Razorpay…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Pay {formatINR(finalPricePaise)} →
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// SUCCESS STEP
// ─────────────────────────────────────────────────────────────

const SuccessStep: FC<{ cohort: Cohort; onClose: () => void }> = ({ cohort, onClose }) => (
  <div className="px-8 py-10 text-center">
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
      style={{
        backgroundColor: 'rgba(59,130,246,0.12)',
        border: '1px solid rgba(59,130,246,0.25)',
      }}
    >
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h3
      className="text-xl  mb-2 text-white"
      style={{  }}
    >
      Application Confirmed
    </h3>
    <p className="text-sm  mb-2 text-gray-400">
      Your application and payment for{' '}
      <span className="font-medium text-blue-400">{cohort.cohortNumber}</span>{' '}
      of the{' '}
      <span className="font-medium text-blue-300">{cohort.title}</span>{' '}
      have been received.
    </p>
    <p className="text-sm text-gray-500">
      We will reach out within 48 hours with onboarding details.
      Starting <span className="text-blue-400">{cohort.startDate}</span>.
    </p>
    <button
      type="button"
      onClick={onClose}
      className="mt-8 px-6 py-3 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{
        backgroundColor: 'rgba(59,130,246,0.10)',
        color: '#93C5FD',
        border: '1px solid rgba(59,130,246,0.20)',
      }}
    >
      Close
    </button>
  </div>
);

// ─────────────────────────────────────────────────────────────
// MAIN MODAL (blue theme)
// ─────────────────────────────────────────────────────────────

const CohortApplicationModal: FC<CohortApplicationModalProps> = ({
  isOpen,
  onClose,
  cohort,
}) => {
  const totalSteps = cohort.applicationSteps.length;

  const [phase, setPhase]               = useState<ModalPhase>({ kind: 'questions', stepIndex: 0 });
  const [answers, setAnswers]           = useState<FormAnswers>({});
  const [errors, setErrors]             = useState<Record<string, string>>({});
  const [couponCode, setCouponCode]     = useState('');
  const [couponState, setCouponState]   = useState<'idle' | 'valid' | 'invalid' | 'checking'>('idle');
  const [discountPct, setDiscountPct]   = useState(0);
  const [paying, setPaying]             = useState(false);

  // Reset when modal opens / cohort changes
  useEffect(() => {
    if (!isOpen) return;
    setPhase({ kind: 'questions', stepIndex: 0 });
    setAnswers({});
    setErrors({});
    setCouponCode('');
    setCouponState('idle');
    setDiscountPct(0);
    setPaying(false);
  }, [isOpen, cohort.id]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const finalPricePaise = Math.round(cohort.price * (1 - discountPct / 100));
  const currentStep: ApplicationStep | null =
    phase.kind === 'questions' ? cohort.applicationSteps[phase.stepIndex] : null;

  // ── Field change ──────────────────────────────────────────
  const handleFieldChange = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  // ── Validate current step ─────────────────────────────────
  const validateStep = (): boolean => {
    if (!currentStep) return true;
    const newErrors: Record<string, string> = {};
    currentStep.fields
      .filter((f) => f.required)
      .forEach((f) => {
        const v = answers[f.id];
        const empty = Array.isArray(v) ? v.length === 0 : !v || String(v).trim() === '';
        if (empty) newErrors[f.id] = 'This field is required.';
      });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Navigation ────────────────────────────────────────────
  const handleNext = () => {
    if (!validateStep()) return;
    if (phase.kind === 'questions') {
      phase.stepIndex < totalSteps - 1
        ? setPhase({ kind: 'questions', stepIndex: phase.stepIndex + 1 })
        : setPhase({ kind: 'coupon' });
    }
  };

  const handleBack = () => {
    if (phase.kind === 'coupon')
      setPhase({ kind: 'questions', stepIndex: totalSteps - 1 });
    else if (phase.kind === 'questions' && phase.stepIndex > 0)
      setPhase({ kind: 'questions', stepIndex: phase.stepIndex - 1 });
  };

  // ── Coupon ────────────────────────────────────────────────
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    setCouponState('checking');
    setTimeout(() => {
      const pct = VALID_COUPONS[couponCode];
      if (pct !== undefined) { setDiscountPct(pct); setCouponState('valid'); }
      else                   { setDiscountPct(0);   setCouponState('invalid'); }
    }, 700);
  };

  // ── Razorpay ──────────────────────────────────────────────
  const handlePay = () => {
    setPaying(true);
    const options: Record<string, unknown> = {
      key:         'rzp_test_XXXXXXXXXX', // ← replace with your Razorpay key
      amount:      finalPricePaise,
      currency:    cohort.currency,
      name:        'Sarsen & Company',
      description: `${cohort.title} — ${cohort.cohortNumber}`,
      // order_id: '<from your backend>', // add in production
      prefill: {
        name:  (answers['full_name'] as string) || '',
        email: (answers['email']     as string) || '',
      },
      notes: {
        cohort_id:   String(cohort.id),
        cohort_slug: cohort.slug,
        coupon_used: couponCode || 'none',
      },
      theme:  { color: '#3B82F6' },
      modal:  { ondismiss: () => setPaying(false) },
      handler: () => { setPaying(false); setPhase({ kind: 'success' }); },
    };

    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      const RazorpayConstructor = (window as any).Razorpay;
      new RazorpayConstructor(options).open();
    } else {
      // Razorpay script not loaded — simulate for local dev
      setTimeout(() => { setPaying(false); setPhase({ kind: 'success' }); }, 1500);
    }
  };

  // ── Derived header text ───────────────────────────────────
  const headerTitle =
    phase.kind === 'success'   ? 'Application Complete' :
    phase.kind === 'coupon'    ? 'Review & Payment'     :
    currentStep?.stepTitle     ?? '';

  const headerSub =
    phase.kind === 'questions' ? currentStep?.stepSubtitle :
    phase.kind === 'coupon'    ? cohort.title :
    undefined;

  // ─────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      style={{ backgroundColor: 'rgba(8,5,0,0.88)' }}
      onClick={(e: MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg flex flex-col"
        style={{
          animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both',
          maxHeight: 'calc(100vh - 3rem)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Shell ─────────────────────────────────────── */}
        <div
          className="rounded-md overflow-hidden flex flex-col"
          style={{
            backgroundColor: '#0A1E3D',
            border: '1px solid rgba(59,130,246,0.14)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
          }}
        >
          {/* ── Header ──────────────────────────────────── */}
          <div
            className="relative px-8 py-6 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #132B47 0%, #0A1E3D 70%)' }}
          >
            {phase.kind !== 'success' && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-opacity opacity-50 hover:opacity-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="#93C5FD" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Tag + cohort pill */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#93C5FD' }}
              >
                {cohort.tag}
              </span>
              <span className="text-xs text-gray-500">
                {cohort.cohortNumber} · {cohort.startDate}
              </span>
            </div>

            <h2
              className="text-xl  pr-8 text-white"
              style={{ }}
            >
              {headerTitle}
            </h2>
            {headerSub && (
              <p className="text-sm mt-0.5 truncate pr-8 text-gray-400">
                {headerSub}
              </p>
            )}
          </div>

          {/* ── Progress bar ────────────────────────────── */}
          {phase.kind === 'questions' && (
            <ProgressBar current={phase.stepIndex + 1} total={totalSteps} />
          )}

          {/* ── Scrollable content ──────────────────────── */}
          <div
            className="overflow-y-auto flex-1"
            style={{ scrollbarWidth: 'none' } as React.CSSProperties}
          >

            {/* QUESTIONS */}
            {phase.kind === 'questions' && currentStep && (
              <div className="px-8 py-6 space-y-5">
                {currentStep.fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={answers[field.id] ?? (field.type === 'multiselect' ? [] : '')}
                    onChange={handleFieldChange}
                    error={errors[field.id]}
                  />
                ))}

                {/* Nav buttons */}
                <div className="flex gap-3 pt-2">
                  {phase.stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-3 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                      style={{
                        backgroundColor: 'rgba(59,130,246,0.06)',
                        color: '#9CA3AF',
                        border: '1px solid rgba(59,130,246,0.10)',
                      }}
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 rounded-md text-sm font-semibold transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    style={{ backgroundColor: '#2563EB', color: '#ffffff' }}
                  >
                    {phase.stepIndex < totalSteps - 1 ? 'Continue →' : 'Review & Pay →'}
                  </button>
                </div>
              </div>
            )}

            {/* COUPON + PAYMENT */}
            {phase.kind === 'coupon' && (
              <CouponStep
                cohort={cohort}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                couponState={couponState}
                discountPct={discountPct}
                finalPricePaise={finalPricePaise}
                onApplyCoupon={handleApplyCoupon}
                onPay={handlePay}
                onBack={handleBack}
                paying={paying}
              />
            )}

            {/* SUCCESS */}
            {phase.kind === 'success' && (
              <SuccessStep cohort={cohort} onClose={onClose} />
            )}

          </div>
        </div>

        {/* Legal note */}
        {phase.kind !== 'success' && (
          <p
            className="text-center text-xs mt-3 px-4 text-gray-600"
          >
            Payments secured by Razorpay. By applying you agree to our Terms of Participation.
          </p>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CohortApplicationModal;