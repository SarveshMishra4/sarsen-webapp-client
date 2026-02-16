import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export default function TermsPage() {
  return (
    <>
      <Section background="primary" spacing="md">
        <Container>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl text-center">
            Terms of Service
          </h1>
          <p className="mt-4 text-xl text-gray-600 text-center">
            Last updated: January 1, 2024
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container maxWidth="lg">
          <div className="prose prose-lg max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using our services, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access our services.
            </p>

            <h2>2. Definitions</h2>
            <ul>
              <li>"Service" refers to the consulting services provided by Sarsen Strategy Partners</li>
              <li>"Client" refers to the individual or entity purchasing our services</li>
              <li>"Engagement" refers to a specific service instance purchased by a Client</li>
              <li>"Dashboard" refers to the client portal where Engagement details are managed</li>
            </ul>

            <h2>3. Service Purchase and Payment</h2>
            <p>
              All payments are processed securely through Razorpay. By purchasing a service, you agree to:
            </p>
            <ul>
              <li>Provide accurate and complete payment information</li>
              <li>Pay all charges at the prices then in effect</li>
              <li>Authorize us to charge your chosen payment method</li>
            </ul>

            <h2>4. Engagement Terms</h2>
            <p>
              Each purchased service creates an Engagement with the following characteristics:
            </p>
            <ul>
              <li>Access to the client dashboard is provided upon payment confirmation</li>
              <li>Progress is tracked through predefined milestones</li>
              <li>Messaging is available until Engagement completion</li>
              <li>Feedback is mandatory upon completion</li>
            </ul>

            <h2>5. Client Responsibilities</h2>
            <p>As a Client, you agree to:</p>
            <ul>
              <li>Maintain the confidentiality of your dashboard credentials</li>
              <li>Provide accurate and timely information for the Engagement</li>
              <li>Complete required questionnaires and provide feedback</li>
              <li>Not share Engagement content with unauthorized parties</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <p>
              All materials provided as part of the Engagement are for your internal business use only. 
              You may not distribute, modify, or create derivative works without our written consent.
            </p>

            <h2>7. Cancellation and Refunds</h2>
            <p>
              Refund requests are handled according to our Refund Policy. Engagement cancellation 
              may result in loss of access to dashboard content.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Sarsen Strategy Partners shall not be liable for 
              any indirect, incidental, special, consequential, or punitive damages.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify you of any changes 
              by posting the new terms on this page.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              For questions about these Terms, please contact:
              <br />
              Email: legal@sarsenstrategy.com
              <br />
              Address: 123 Business Ave, Suite 100, San Francisco, CA 94105
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}