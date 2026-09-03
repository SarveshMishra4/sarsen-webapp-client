'use client';

import React from 'react';
import Link from 'next/link';

export default function RefundCancellationPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">
            Refund & Cancellation Policy
          </h1>

          <p className="text-xl text-blue-100">
            Last Updated: September 3, 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">

          {/* Company Identification */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              1. Company Identification
            </h2>

            <p className="text-gray-600 mb-4">
              This Refund & Cancellation Policy is issued by Sarsen Strategy
              Partners. References to “Sarsen”, “we”, “us”, or “our” in this
              policy refer to Sarsen Strategy Partners.
            </p>

            <p className="text-gray-600 mb-4">
              This policy forms part of the legal framework governing your use
              of our website and services, including our{' '}
              <Link
                href="/terms-of-use"
                className="text-blue-600 hover:underline"
              >
                Terms of Use
              </Link>
              ,{' '}
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
              , and{' '}
              <Link
                href="/disclaimer"
                className="text-blue-600 hover:underline"
              >
                Disclaimer
              </Link>
              . These documents should be read together where applicable.
            </p>

            <p className="text-gray-600">
              By purchasing a service package, you acknowledge that you have
              reviewed and agreed to the terms applicable to your purchase,
              including this Refund & Cancellation Policy.
            </p>
          </section>

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              2. Introduction
            </h2>

            <p className="text-gray-600 mb-4">
              This Refund & Cancellation Policy explains the circumstances in
              which payments for Sarsen Strategy Partners services may be
              refunded, cancelled, postponed, or otherwise adjusted.
            </p>

            <p className="text-gray-600">
              Please review this policy before purchasing a service. The
              applicable terms may also depend on the specific scope,
              milestones, deliverables, and payment arrangements agreed for
              your engagement.
            </p>
          </section>

          {/* 24-Hour Refund Window */}
          <section className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              3. 24-Hour Refund Window
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              3.1 Eligibility Period
            </h3>

            <p className="text-gray-600 mb-4">
              We provide a{' '}
              <strong className="text-orange-700">
                24-hour refund window
              </strong>{' '}
              beginning immediately after payment, provided that the engagement
              has not commenced.
            </p>

            <p className="text-gray-600 mb-4">
              A refund request must be received within this 24-hour period in
              order to be considered under the refund window.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              3.2 Calculation of the 24-Hour Period
            </h3>

            <p className="text-gray-600 mb-4">
              The refund period is calculated from the recorded time of
              payment:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                <strong>Start Time:</strong> The time at which payment is
                successfully completed
              </li>
              <li>
                <strong>End Time:</strong> Exactly 24 hours after payment
              </li>
              <li>
                <strong>Condition:</strong> The engagement must not have
                commenced
              </li>
            </ul>

            <div className="bg-white rounded-lg p-4 border border-orange-200 mb-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Example:</strong>
              </p>

              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>
                  Payment completed: March 26, 2026, at 2:30 PM
                </li>
                <li>
                  Refund window closes: March 27, 2026, at 2:30 PM
                </li>
                <li>
                  Request received after the 24-hour period:
                  <span className="text-red-600 font-medium">
                    {' '}
                    Not eligible under the 24-hour refund window
                  </span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              3.3 Commencement of the Engagement
            </h3>

            <p className="text-gray-600">
              The 24-hour refund window does not apply once the engagement has
              commenced. Commencement may include the initiation of agreed
              consulting work, preparation, meetings, analysis, research,
              development of customized materials, or other substantive work
              performed for the engagement.
            </p>
          </section>

          {/* Refund Request Process */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              4. Refund Request Process
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              4.1 How to Request a Refund
            </h3>

            <p className="text-gray-600 mb-4">
              To request a refund under the applicable refund window, you must
              submit a written request by email to:
            </p>

            <p className="mb-6">
              <a
                href="mailto:contact@sarsenpartners.com"
                className="text-blue-600 hover:underline font-medium"
              >
                contact@sarsenpartners.com
              </a>
            </p>

            <p className="text-gray-600 mb-4">
              To help us verify the request, please include:
            </p>

            <ol className="list-decimal list-inside text-gray-600 space-y-3 ml-4 mb-6">
              <li>
                <strong>Your full name</strong> and relevant contact
                information
              </li>

              <li>
                <strong>The service package</strong> purchased and, where
                available, the relevant order or invoice number
              </li>

              <li>
                <strong>The date and time of payment</strong>
              </li>

              <li>
                <strong>The reason for the request</strong>, if you wish to
                provide one
              </li>
            </ol>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              4.2 Verification and Processing
            </h3>

            <p className="text-gray-600 mb-4">
              Upon receiving a refund request, we may verify the payment
              details, timing of the request, commencement status of the
              engagement, and other information necessary to determine
              eligibility.
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
              <li>
                Eligible refunds will be processed to the original payment
                method where reasonably practicable.
              </li>
              <li>
                Approved refunds are generally processed within{' '}
                <strong>7–14 business days</strong>.
              </li>
              <li>
                The time taken by the relevant payment provider or financial
                institution to credit the refunded amount may vary.
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              4.3 Refund Amount
            </h3>

            <p className="text-gray-600">
              Where a refund is approved under the applicable refund
              provisions, the refund will generally cover the amount paid for
              the applicable service. Any payment-processing charges that are
              non-refundable or retained by a third-party payment provider may
              be excluded where applicable.
            </p>
          </section>

          {/* After 24 Hours */}
          <section className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              5. After 24 Hours or Commencement: Non-Refundable
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              5.1 General Rule
            </h3>

            <p className="text-gray-600 mb-4">
              Subject to any rights or remedies that cannot lawfully be
              excluded, payments become non-refundable after the earlier of:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                the expiry of the applicable 24-hour refund window; or
              </li>
              <li>
                commencement of the engagement.
              </li>
            </ul>

            <p className="text-gray-600 mb-4">
              This applies regardless of subsequent changes in business
              circumstances, priorities, budgets, or preferences.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              5.2 Examples
            </h3>

            <div className="bg-white rounded-lg p-4 border border-red-200">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  • Request made after the 24-hour refund window has expired
                </li>
                <li>
                  • Request made after substantive work has commenced
                </li>
                <li>
                  • Request made after customized analysis or preparation has
                  begun
                </li>
                <li>
                  • Request arising from a change in business priorities
                </li>
                <li>
                  • Request arising from a change in budget or business
                  circumstances
                </li>
                <li>
                  • Request made after agreed deliverables or work have
                  commenced
                </li>
              </ul>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              6. Cancellation Policy
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              6.1 Client-Initiated Cancellation
            </h3>

            <p className="text-gray-600 mb-4">
              If you wish to cancel an engagement after the applicable refund
              window has closed or after the engagement has commenced, amounts
              already paid are generally non-refundable.
            </p>

            <p className="text-gray-600 mb-4">
              Depending on the engagement and circumstances, you may contact us
              to request one of the following:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
              <li>
                A pause or postponement of the engagement, subject to
                availability
              </li>
              <li>
                A restructuring or adjustment of deliverables within the
                agreed scope and value
              </li>
              <li>
                A transfer or credit toward another service, subject to
                approval and applicable commercial terms
              </li>
            </ul>

            <p className="text-gray-600">
              Any such accommodation is discretionary and does not constitute
              an automatic entitlement to a refund or credit.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">
              6.2 Sarsen-Initiated Cancellation
            </h3>

            <p className="text-gray-600 mb-4">
              Sarsen may suspend or terminate an engagement where permitted
              under the applicable Terms of Use or engagement agreement,
              including circumstances involving material breach, unlawful
              conduct, serious misconduct, non-payment, or failure to provide
              information reasonably required to perform the engagement.
            </p>

            <p className="text-gray-600 mb-4">
              Where termination results from circumstances attributable to the
              client, amounts already paid may remain non-refundable and
              outstanding amounts may become due in accordance with the
              applicable agreement.
            </p>

            <p className="text-gray-600">
              Where Sarsen terminates an engagement for reasons unrelated to a
              client breach, Sarsen may, where appropriate, determine a
              prorated refund or credit for services that have not been
              delivered.
            </p>
          </section>

          {/* Rescheduling */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              7. Rescheduling and Postponement
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              7.1 Diagnostic Session Rescheduling
            </h3>

            <p className="text-gray-600 mb-4">
              If your engagement includes a scheduled diagnostic session, you
              may contact us to request rescheduling. Rescheduling is subject
              to consultant availability and the circumstances of the
              engagement.
            </p>

            <p className="text-gray-600 mb-4">
              A rescheduled session does not, by itself, create a new refund
              entitlement or restart an applicable refund period.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              7.2 Engagement Postponement
            </h3>

            <p className="text-gray-600">
              You may request to postpone or pause an engagement where
              circumstances require it. Any postponement is subject to
              Sarsen's availability, the terms of the engagement, and any
              applicable deadlines. Postponement does not automatically create
              a refund entitlement.
            </p>
          </section>

          {/* Exceptions */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              8. Exceptions and Special Circumstances
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              8.1 Force Majeure
            </h3>

            <p className="text-gray-600 mb-4">
              Where circumstances beyond reasonable control materially affect
              service delivery, including natural disasters, government
              actions, war, widespread disruptions, or other force majeure
              events, we may work with the client to:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                Postpone or reschedule the affected portion of the engagement
              </li>
              <li>
                Deliver services remotely where reasonably feasible
              </li>
              <li>
                Restructure affected deliverables where appropriate
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">
              8.2 Service Delivery Issues
            </h3>

            <p className="text-gray-600 mb-4">
              If Sarsen is unable to deliver an agreed service due to a
              material failure attributable to Sarsen, we will make reasonable
              efforts to remedy the issue.
            </p>

            <p className="text-gray-600">
              Depending on the circumstances and the nature of the engagement,
              this may include additional work, revised delivery arrangements,
              credit, or a prorated refund for an undelivered portion of the
              engagement where appropriate.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              9. Payment Terms and Milestones
            </h2>

            <p className="text-gray-600 mb-4">
              For engagements involving milestone-based or staged payments:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                The applicable refund provisions apply to each payment as
                determined by the agreed engagement structure.
              </li>
              <li>
                Subsequent milestone payments are due according to the agreed
                payment schedule.
              </li>
              <li>
                Failure to make a required payment may result in suspension or
                termination of the engagement.
              </li>
              <li>
                Payments relating to work that has commenced are generally
                non-refundable, subject to applicable law and the engagement
                agreement.
              </li>
            </ul>
          </section>

          {/* Concerns and Disputes */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              10. Concerns and Dispute Resolution
            </h2>

            <p className="text-gray-600 mb-4">
              If you have a concern about a service, cancellation, or refund
              decision, we encourage you to contact Sarsen first and provide us
              with an opportunity to understand and address the matter where
              permitted by applicable law.
            </p>

            <p className="text-gray-600 mb-4">
              Please send your concern to:
            </p>

            <p className="mb-6">
              <a
                href="mailto:contact@sarsenpartners.com"
                className="text-blue-600 hover:underline font-medium"
              >
                contact@sarsenpartners.com
              </a>
            </p>

            <p className="text-gray-600 mb-4">
              We will review concerns based on their nature and circumstances.
              Depending on the seriousness, complexity, and volume of the
              matter, a response may take up to 45 days.
            </p>

            <p className="text-gray-600">
              Nothing in this policy prevents you from exercising any
              non-waivable rights or pursuing any remedy available to you
              under applicable law.
            </p>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              11. Changes to This Policy
            </h2>

            <p className="text-gray-600">
              We may update this Refund & Cancellation Policy from time to
              time. The updated version will be published on this page with a
              revised “Last Updated” date. Unless otherwise required by
              applicable law, the policy applicable to a purchase will be the
              version in effect at the time of that purchase.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              12. Contact Information
            </h2>

            <p className="text-gray-600 mb-4">
              For questions regarding this policy, cancellations, or refund
              requests, please contact the Sarsen team by email:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">
                Sarsen Strategy Partners
              </p>

              <p className="text-gray-600">
                Email:{' '}
                <a
                  href="mailto:contact@sarsenpartners.com"
                  className="text-blue-600 hover:underline"
                >
                  contact@sarsenpartners.com
                </a>
              </p>

              <p className="text-gray-500 text-sm mt-4">
                Refund and cancellation matters are reviewed based on their
                nature and circumstances. Depending on the seriousness,
                complexity, and volume of the matter, a response may take up to
                45 days.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Acknowledgment
            </h2>

            <p className="text-gray-600 mb-3">
              By purchasing a service package from Sarsen Strategy Partners,
              you acknowledge that:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                You have read and understood this Refund & Cancellation Policy.
              </li>

              <li>
                You understand that the applicable refund window is limited
                and subject to the conditions described in this policy.
              </li>

              <li>
                You understand that payments generally become non-refundable
                after the applicable refund window expires or once the
                engagement has commenced, whichever occurs earlier.
              </li>

              <li>
                You understand that any postponement, restructuring, credit, or
                other accommodation is subject to the applicable engagement
                terms and Sarsen's approval.
              </li>

              <li>
                You understand that this policy should be read together with
                the other applicable legal documents governing your engagement.
              </li>
            </ul>
          </section>

        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}