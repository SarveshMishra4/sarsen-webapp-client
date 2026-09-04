'use client';

// ============================================================================
// LAYOUT NOTES:
// - Container matches Header.tsx / Footer.tsx: max-w-[1400px] + px-4 md:px-8.
// - Navy gradient header, navy heading/link color (#002855 / hover #0A1E3D)
//   RESTORED exactly as in the Terms of Use / Privacy Choices reference
//   pages — that palette was fine and was never the problem.
// - The ONLY color change in this pass: the two clause boxes ("The Window
//   That Opens at the Start" / "Once That Window Closes") no longer use
//   orange/red borders, backgrounds, or accent text. They're now plain
//   gray-bordered boxes, matching the neutral box style used elsewhere on
//   this page (the "Example" box, the "In Practice" box, the contact box).
//   Emphasis inside them now comes from <strong> weight, not color.
// - No forced hyphenation on justified text (kept from the earlier fix).
// ============================================================================

import React from 'react';
import Link from 'next/link';

export default function RefundCancellationPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* ====================================================================
          PAGE HEADER — navy gradient, restored.
      ==================================================================== */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Refund & Cancellation Policy
          </h1>
          <p className="text-lg text-blue-100 md:text-xl">
            Last Updated: September 3, 2026
          </p>
        </div>
      </div>

      {/* ====================================================================
          BODY
      ==================================================================== */}
      <div className="mx-auto mt-10 max-w-[1400px] px-4 pb-14 md:mt-14 md:px-8 md:pb-20">
        <article className="space-y-14">

          <Section title="Who Issues This Policy">
            <P>
              This Refund & Cancellation Policy is issued by Sarsen Strategy
              Partners. References to “Sarsen,” “we,” “us,” or “our” in this
              policy refer to Sarsen Strategy Partners.
            </P>
            <P>
              This policy forms part of the legal framework governing your use
              of our website and services, including our{' '}
              <Link href="/terms-of-use" className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]">
                Terms of Use
              </Link>
              ,{' '}
              <Link href="/privacy-policy" className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]">
                Privacy Policy
              </Link>
              , and{' '}
              <Link href="/disclaimer" className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]">
                Disclaimer
              </Link>
              . These documents should be read together where applicable.
            </P>
            <P>
              By purchasing a service package, you acknowledge that you have
              reviewed and agreed to the terms applicable to your purchase,
              including this Refund & Cancellation Policy.
            </P>
          </Section>

          <Section title="What This Policy Covers">
            <P>
              This Refund & Cancellation Policy explains the circumstances in
              which payments for Sarsen Strategy Partners services may be
              refunded, cancelled, postponed, or otherwise adjusted.
            </P>
            <P>
              Please review this policy before purchasing a service. The
              applicable terms may also depend on the specific scope,
              milestones, deliverables, and payment arrangements agreed for
              your engagement.
            </P>
          </Section>

          {/* ==================================================================
              THE 24-HOUR WINDOW — was orange, now a plain neutral box.
          ================================================================== */}
          <section className="rounded-lg border border-gray-300 p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-[#002855] md:text-3xl">
              The Window That Opens at the Start
            </h2>

            <div className="space-y-8">
              <SubSection title="How Much Time You Have">
                <P>
                  We provide a <strong>24-hour refund window</strong> beginning
                  immediately after payment, provided that the engagement has
                  not commenced.
                </P>
                <P>
                  A refund request must be received within this 24-hour period
                  in order to be considered under the refund window.
                </P>
              </SubSection>

              <SubSection title="How the Clock Runs">
                <P>The refund period is calculated from the recorded time of payment:</P>
                <List>
                  <li><strong>Start Time:</strong> The time at which payment is successfully completed</li>
                  <li><strong>End Time:</strong> Exactly 24 hours after payment</li>
                  <li><strong>Condition:</strong> The engagement must not have commenced</li>
                </List>

                <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-gray-800">Example:</p>
                  <ul className="ml-4 space-y-1 text-sm leading-snug text-gray-600">
                    <li>Payment completed: March 26, 2026, at 2:30 PM</li>
                    <li>Refund window closes: March 27, 2026, at 2:30 PM</li>
                    <li>
                      Request received after the 24-hour period:{' '}
                      <strong>Not eligible under the 24-hour refund window</strong>
                    </li>
                  </ul>
                </div>
              </SubSection>

              <SubSection title="When the Clock Stops Mattering">
                <P>
                  The 24-hour refund window does not apply once the engagement
                  has commenced. Commencement may include the initiation of
                  agreed consulting work, preparation, meetings, analysis,
                  research, development of customized materials, or other
                  substantive work performed for the engagement.
                </P>
              </SubSection>
            </div>
          </section>

          <Section title="How to Actually Ask">
            <SubSection title="Where to Send the Request">
              <P>
                To request a refund under the applicable refund window, you
                must submit a written request by email to:
              </P>
              <p>
                <a
                  href="mailto:contact@sarsenpartners.com"
                  className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
                >
                  contact@sarsenpartners.com
                </a>
              </p>
              <P>To help us verify the request, please include:</P>
              <ol className="ml-4 list-decimal space-y-2 text-justify text-[15px] leading-snug text-gray-700 md:text-base">
                <li><strong>Your full name</strong> and relevant contact information</li>
                <li><strong>The service package</strong> purchased and, where available, the relevant order or invoice number</li>
                <li><strong>The date and time of payment</strong></li>
                <li><strong>The reason for the request</strong>, if you wish to provide one</li>
              </ol>
            </SubSection>

            <SubSection title="What Happens After You Ask">
              <P>
                Upon receiving a refund request, we may verify the payment
                details, timing of the request, commencement status of the
                engagement, and other information necessary to determine
                eligibility.
              </P>
              <List>
                <li>Eligible refunds will be processed to the original payment method where reasonably practicable.</li>
                <li>Approved refunds are generally processed within <strong>7–14 business days</strong>.</li>
                <li>The time taken by the relevant payment provider or financial institution to credit the refunded amount may vary.</li>
              </List>
            </SubSection>

            <SubSection title="What Comes Back">
              <P>
                Where a refund is approved under the applicable refund
                provisions, the refund will generally cover the amount paid
                for the applicable service. Any payment-processing charges
                that are non-refundable or retained by a third-party payment
                provider may be excluded where applicable.
              </P>
            </SubSection>
          </Section>

          {/* ==================================================================
              AFTER 24 HOURS — was red, now the same plain neutral box.
          ================================================================== */}
          <section className="rounded-lg border border-gray-300 p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-[#002855] md:text-3xl">
              Once That Window Closes
            </h2>

            <div className="space-y-8">
              <SubSection title="The Rule Itself">
                <P>
                  Subject to any rights or remedies that cannot lawfully be
                  excluded, payments become non-refundable after the earlier
                  of:
                </P>
                <List>
                  <li>the expiry of the applicable 24-hour refund window; or</li>
                  <li>commencement of the engagement.</li>
                </List>
                <P>
                  This applies regardless of subsequent changes in business
                  circumstances, priorities, budgets, or preferences.
                </P>
              </SubSection>

              <SubSection title="In Practice">
                <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                  <ul className="space-y-2 text-sm leading-snug text-gray-600">
                    <li>• Request made after the 24-hour refund window has expired</li>
                    <li>• Request made after substantive work has commenced</li>
                    <li>• Request made after customized analysis or preparation has begun</li>
                    <li>• Request arising from a change in business priorities</li>
                    <li>• Request arising from a change in budget or business circumstances</li>
                    <li>• Request made after agreed deliverables or work have commenced</li>
                  </ul>
                </div>
              </SubSection>
            </div>
          </section>

          <Section title="Stepping Away From an Engagement">
            <SubSection title="If You're the One Stepping Away">
              <P>
                If you wish to cancel an engagement after the applicable
                refund window has closed or after the engagement has
                commenced, amounts already paid are generally non-refundable.
              </P>
              <P>
                Depending on the engagement and circumstances, you may
                contact us to request one of the following:
              </P>
              <List>
                <li>A pause or postponement of the engagement, subject to availability</li>
                <li>A restructuring or adjustment of deliverables within the agreed scope and value</li>
                <li>A transfer or credit toward another service, subject to approval and applicable commercial terms</li>
              </List>
              <P>
                Any such accommodation is discretionary and does not
                constitute an automatic entitlement to a refund or credit.
              </P>
            </SubSection>

            <SubSection title="If We're the One Stepping Away">
              <P>
                Sarsen may suspend or terminate an engagement where permitted
                under the applicable Terms of Use or engagement agreement,
                including circumstances involving material breach, unlawful
                conduct, serious misconduct, non-payment, or failure to
                provide information reasonably required to perform the
                engagement.
              </P>
              <P>
                Where termination results from circumstances attributable to
                the client, amounts already paid may remain non-refundable
                and outstanding amounts may become due in accordance with the
                applicable agreement.
              </P>
              <P>
                Where Sarsen terminates an engagement for reasons unrelated
                to a client breach, Sarsen may, where appropriate, determine
                a prorated refund or credit for services that have not been
                delivered.
              </P>
            </SubSection>
          </Section>

          <Section title="Moving Things Around">
            <SubSection title="Shifting a Scheduled Session">
              <P>
                If your engagement includes a scheduled diagnostic session,
                you may contact us to request rescheduling. Rescheduling is
                subject to consultant availability and the circumstances of
                the engagement.
              </P>
              <P>
                A rescheduled session does not, by itself, create a new
                refund entitlement or restart an applicable refund period.
              </P>
            </SubSection>

            <SubSection title="Pausing the Larger Engagement">
              <P>
                You may request to postpone or pause an engagement where
                circumstances require it. Any postponement is subject to
                Sarsen's availability, the terms of the engagement, and any
                applicable deadlines. Postponement does not automatically
                create a refund entitlement.
              </P>
            </SubSection>
          </Section>

          <Section title="When the Usual Rules Bend">
            <SubSection title="When It's Truly Out of Anyone's Hands">
              <P>
                Where circumstances beyond reasonable control materially
                affect service delivery, including natural disasters,
                government actions, war, widespread disruptions, or other
                force majeure events, we may work with the client to:
              </P>
              <List>
                <li>Postpone or reschedule the affected portion of the engagement</li>
                <li>Deliver services remotely where reasonably feasible</li>
                <li>Restructure affected deliverables where appropriate</li>
              </List>
            </SubSection>

            <SubSection title="When the Shortfall Is Ours">
              <P>
                If Sarsen is unable to deliver an agreed service due to a
                material failure attributable to Sarsen, we will make
                reasonable efforts to remedy the issue.
              </P>
              <P>
                Depending on the circumstances and the nature of the
                engagement, this may include additional work, revised
                delivery arrangements, credit, or a prorated refund for an
                undelivered portion of the engagement where appropriate.
              </P>
            </SubSection>
          </Section>

          <Section title="How Staged Payments Work">
            <P>For engagements involving milestone-based or staged payments:</P>
            <List>
              <li>The applicable refund provisions apply to each payment as determined by the agreed engagement structure.</li>
              <li>Subsequent milestone payments are due according to the agreed payment schedule.</li>
              <li>Failure to make a required payment may result in suspension or termination of the engagement.</li>
              <li>Payments relating to work that has commenced are generally non-refundable, subject to applicable law and the engagement agreement.</li>
            </List>
          </Section>

          <Section title="If Something Feels Off">
            <P>
              If you have a concern about a service, cancellation, or refund
              decision, we encourage you to contact Sarsen first and provide
              us with an opportunity to understand and address the matter
              where permitted by applicable law.
            </P>
            <P>Please send your concern to:</P>
            <p>
              <a
                href="mailto:contact@sarsenpartners.com"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                contact@sarsenpartners.com
              </a>
            </p>
            <P>
              We will review concerns based on their nature and
              circumstances. Depending on the seriousness, complexity, and
              volume of the matter, a response may take up to 45 days.
            </P>
            <P>
              Nothing in this policy prevents you from exercising any
              non-waivable rights or pursuing any remedy available to you
              under applicable law.
            </P>
          </Section>

          <Section title="This Is Not Fixed in Stone">
            <P>
              We may update this Refund & Cancellation Policy from time to
              time. The updated version will be published on this page with
              a revised “Last Updated” date. Unless otherwise required by
              applicable law, the policy applicable to a purchase will be the
              version in effect at the time of that purchase.
            </P>
          </Section>

          <Section title="Reaching Us">
            <P>
              For questions regarding this policy, cancellations, or refund
              requests, please contact the Sarsen team by email:
            </P>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <p className="mb-2 font-medium text-gray-800">Sarsen Strategy Partners</p>
              <p className="text-gray-600">
                Email:{' '}
                <a
                  href="mailto:contact@sarsenpartners.com"
                  className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
                >
                  contact@sarsenpartners.com
                </a>
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Refund and cancellation matters are reviewed based on their
                nature and circumstances. Depending on the seriousness,
                complexity, and volume of the matter, a response may take up
                to 45 days.
              </p>
            </div>
          </Section>

          {/* ==================================================================
              ACKNOWLEDGMENT
          ================================================================== */}
          <section className="rounded-lg border border-[#002855]/15 bg-[#002855]/[0.03] p-6 md:p-8">
            <h2 className="mb-3 text-xl font-semibold text-[#002855] md:text-2xl">
              One Last Thing
            </h2>
            <P>
              By purchasing a service package from Sarsen Strategy Partners,
              you acknowledge that:
            </P>
            <List>
              <li>You have read and understood this Refund & Cancellation Policy.</li>
              <li>You understand that the applicable refund window is limited and subject to the conditions described in this policy.</li>
              <li>You understand that payments generally become non-refundable after the applicable refund window expires or once the engagement has commenced, whichever occurs earlier.</li>
              <li>You understand that any postponement, restructuring, credit, or other accommodation is subject to the applicable engagement terms and Sarsen's approval.</li>
              <li>You understand that this policy should be read together with the other applicable legal documents governing your engagement.</li>
            </List>
          </section>

        </article>

        {/* Back to Home */}
        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-block rounded-md bg-[#002855] px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#0A1E3D]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

// ============================================================================
// SECTION COMPONENT — same pattern as app/terms-of-use/page.tsx. Every
// heading is font-semibold; hierarchy is size-driven via `prominent`.
// ============================================================================
function Section({
  title,
  prominent = false,
  children,
}: {
  title: string;
  prominent?: boolean;
  children: React.ReactNode;
}) {
  const sizeClass = prominent ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';

  return (
    <section>
      <h2 className={`mb-4 font-semibold text-[#002855] ${sizeClass}`}>{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

// ============================================================================
// SUB-SECTION COMPONENT — one tier down from Section.
// ============================================================================
function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-[#002855]">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ============================================================================
// PARAGRAPH — justified body copy, no forced hyphenation.
// ============================================================================
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-justify text-[15px] leading-snug text-gray-700 md:text-base">
      {children}
    </p>
  );
}

// ============================================================================
// LIST — same justified treatment as paragraphs.
// ============================================================================
function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-4 list-disc space-y-1.5 text-justify text-[15px] leading-snug text-gray-700 md:text-base">
      {children}
    </ul>
  );
}