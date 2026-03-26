import type { Metadata } from "next";
import "./globals.css";
import Header from "../../src/ui/components/Header";
import Footer from "../../src/ui/components/Footer";
import { Ropa_Sans } from 'next/font/google';
import { ToastProvider } from "@/ui/primitives/Toast";
import { AuthProvider } from "../app/context/AuthContext";
import Script from "next/script";

// ─── Font ─────────────────────────────────────────────────────────────────────

const ropaSans = Ropa_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ropa-sans',
});

// ─── Site-wide SEO defaults ───────────────────────────────────────────────────
// Any page that exports its own `metadata` or `generateMetadata()` will
// override these fields automatically. Pages with no metadata export
// inherit everything below.

const BASE_URL = 'https://www.sarsenpartners.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`;
// ↑ Create a 1200×630px image and place it at:
//   client/public/assets/brand/og-default.png

export const metadata: Metadata = {

  // ── Base URL (required for relative OG image paths to resolve) ────────────
  metadataBase: new URL(BASE_URL),

  // ── Title ─────────────────────────────────────────────────────────────────
  // Pages that set title: 'About Us' will render:
  // "About Us | Sarsen Strategy Partners"
  title: {
    default: 'Sarsen Strategy Partners | Strategy & Advisory',
    template: '%s | Sarsen Strategy Partners',
  },

  // ── Description ───────────────────────────────────────────────────────────
  description:
    'Sarsen Strategy Partners delivers quantitative strategy consulting for early-stage startups and growth businesses. Data-driven insights, clear deliverables, measurable outcomes.',

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    'strategy consulting',
    'startup advisory',
    'growth strategy',
    'business consulting India',
    'quantitative strategy',
    'Sarsen Strategy Partners',
  ],

  // ── Authorship ────────────────────────────────────────────────────────────
  authors: [{ name: 'Sarsen Strategy Partners', url: BASE_URL }],
  creator: 'Sarsen Strategy Partners',
  publisher: 'Sarsen Strategy Partners',

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Sarsen Strategy Partners',
    title: 'Sarsen Strategy Partners | Strategy & Advisory',
    description:
      'Quantitative strategy consulting for early-stage startups and growth businesses. Data-driven insights, clear deliverables, measurable outcomes.',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Sarsen Strategy Partners | Strategy & Advisory',
    description:
      'Quantitative strategy consulting for early-stage startups and growth businesses.',
    images: [DEFAULT_OG_IMAGE],
    // Uncomment when you have a Twitter/X handle:
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },

  // ── Google Search Console verification ───────────────────────────────────
  // Uncomment and paste your token after connecting Search Console:
  // verification: {
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_TOKEN',
  // },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

/**
 * RootLayout – wraps all pages with the global header and footer.
 *
 * AuthProvider  — must be outermost so every page and component
 *                 can call useAuth() to read who is logged in.
 * ToastProvider — inside AuthProvider so toasts can reference auth
 *                 state if needed in future.
 *
 * @param children - The page content to render between Header and Footer.
 * @returns The complete HTML document with header, main content, and footer.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ropaSans.variable} font-sans`}>
      <body className="antialiased">

        {/* ── Razorpay ───────────────────────────────────────────────────── */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        {/* ── Google Analytics ───────────────────────────────────────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P74Z4ZQ44K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P74Z4ZQ44K');
          `}
        </Script>

        {/* ── App ────────────────────────────────────────────────────────── */}
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-[calc(100vh-80px-400px)]">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>

      </body>
    </html>
  );
}