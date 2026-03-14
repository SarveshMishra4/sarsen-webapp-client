import type { Metadata } from "next";
import "./globals.css";
import Header from "../../src/ui/components/Header";
import Footer from "../../src/ui/components/Footer";
import { Ropa_Sans } from 'next/font/google';
import { ToastProvider } from "@/ui/primitives/Toast";
import { AuthProvider } from "../app/context/AuthContext";
import Script from "next/script";

const ropaSans = Ropa_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ropa-sans',
});

export const metadata: Metadata = {
  title: "Sarsen Strategy Consulting | Quantitative Strategy for Indian Startups",
  description: "Productized strategy consulting for early-stage startups. Data-driven insights, clear deliverables, measurable outcomes.",
};

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
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
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