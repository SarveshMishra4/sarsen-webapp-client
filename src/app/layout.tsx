import type { Metadata } from "next";
import "./globals.css";
import Header from "../../src/ui/components/Header";
import Footer from "../../src/ui/components/Footer";
import { Ropa_Sans } from 'next/font/google';
import { ToastProvider } from "@/ui/primitives/Toast";


const ropaSans = Ropa_Sans({
  weight: ['400'], // Ropa Sans only comes in 400 (regular) and 400 italic
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ropa-sans', // this CSS variable will hold the font
});

export const metadata: Metadata = {
  title: "Sarsen Strategy Consulting | Quantitative Strategy for Indian Startups",
  description: "Productized strategy consulting for early-stage startups. Data-driven insights, clear deliverables, measurable outcomes.",
};

/**
 * RootLayout – wraps all pages with the global header and footer.
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
    <html lang="en" className={`${ropaSans.variable} font-sans`}> {/* Apply Ropa Sans font globally */}
      <body className="antialiased"> {/* Adds font smoothing */}
        {/* Global Toast System */}
        <ToastProvider>
        <Header />
        {/* Main content area – ensures footer stays at bottom if content is short */}
        <main className="min-h-[calc(100vh-80px-400px)]">{children}</main>
        <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}