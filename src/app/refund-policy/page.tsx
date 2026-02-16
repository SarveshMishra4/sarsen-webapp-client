import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export default function RefundPolicyPage() {
  return (
    <>
      <Section background="primary" spacing="md">
        <Container>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl text-center">
            Refund Policy
          </h1>
          <p className="mt-4 text-xl text-gray-600 text-center">
            Last updated: January 1, 2024
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container maxWidth="lg">
          <div className="prose prose-lg max-w-none">
            <h2>1. Overview</h2>
            <p>
              At Sarsen Strategy Partners, we are committed to delivering high-quality consulting services. 
              This Refund Policy outlines the terms under which refunds may be issued for our services.
            </p>

            <h2>2. Engagement-Based Services</h2>
            <p>
              Our services are engagement-based, meaning each purchase creates a dedicated workspace with 
              access to our consulting team, resources, and tools. Refund eligibility depends on the stage 
              of the Engagement:
            </p>

            <h3>2.1 Before Engagement Start</h3>
            <p>
              If you request a refund before the Engagement has started (before any work has been performed 
              or resources delivered), you are eligible for a full refund minus any payment processing fees.
            </p>

            <h3>2.2 During Active Engagement</h3>
            <p>
              Once an Engagement has started, refunds are handled as follows:
            </p>
            <ul>
              <li>
                <strong>Within first 7 days:</strong> 75% refund of the Engagement value
              </li>
              <li>
                <strong>Days 8-14:</strong> 50% refund of the Engagement value
              </li>
              <li>
                <strong>After 14 days:</strong> No refund available
              </li>
            </ul>

            <h3>2.3 After Engagement Completion</h3>
            <p>
              Once an Engagement is marked as completed (progress = 100%) and feedback has been submitted, 
              no refunds will be issued.
            </p>

            <h2>3. How to Request a Refund</h2>
            <p>
              To request a refund, please contact us at refunds@sarsenstrategy.com with:
            </p>
            <ul>
              <li>Your full name and company name</li>
              <li>Engagement ID (if available)</li>
              <li>Date of purchase</li>
              <li>Reason for refund request</li>
            </ul>

            <h2>4. Refund Processing</h2>
            <p>
              Approved refunds will be processed within 5-10 business days and credited to the original 
              payment method. The timing of the credit depends on your financial institution.
            </p>

            <h2>5. Exceptions</h2>
            <p>
              Refund requests outside the above policy may be considered in exceptional circumstances, 
              such as:
            </p>
            <ul>
              <li>Technical issues preventing service delivery</li>
              <li>Incorrect service purchase</li>
              <li>Duplicate charges</li>
            </ul>
            <p>
              These are reviewed on a case-by-case basis at our discretion.
            </p>

            <h2>6. Chargebacks</h2>
            <p>
              If you dispute a charge through your financial institution, we will provide all relevant 
              documentation to support the validity of the charge. Chargebacks may result in immediate 
              suspension of your Engagement access.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              For any questions about this Refund Policy, please contact:
              <br />
              Email: refunds@sarsenstrategy.com
              <br />
              Phone: {process.env.NEXT_PUBLIC_COMPANY_PHONE || '+1 (415) 555-0123'}
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}