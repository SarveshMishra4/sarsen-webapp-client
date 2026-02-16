import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Section background="primary" spacing="md">
        <Container>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl text-center">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-600 text-center">
            Last updated: January 1, 2024
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container maxWidth="lg">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Sarsen Strategy Partners ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Register for an account</li>
              <li>Express interest in obtaining information about us or our services</li>
              <li>Participate in activities on our website</li>
              <li>Contact us</li>
            </ul>
            <p>The personal information we collect may include:</p>
            <ul>
              <li>Name and contact information (email, phone number, company)</li>
              <li>Payment information (processed securely through Razorpay)</li>
              <li>Engagement and project-related information</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Communicate with you about services, updates, and support</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
            <ul>
              <li>Service providers who assist in operating our website and conducting our business</li>
              <li>Payment processors (Razorpay) to complete transactions</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal 
              information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict processing of your information</li>
            </ul>

            <h2>7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@sarsenstrategy.com
              <br />
              Address: 123 Business Ave, Suite 100, San Francisco, CA 94105
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}