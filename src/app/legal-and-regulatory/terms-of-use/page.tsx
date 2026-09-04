// app/terms-of-use/page.tsx
//
// ============================================================================
// LAYOUT NOTES (read before editing):
// - Container matches Header.tsx / Footer.tsx: max-w-[1400px] + px-4 md:px-8.
//   Footer uses this exact pair. Header uses "px-4 lg:px-8" (no md step), so
//   between md and lg the header sits 16px narrower — that gap already
//   exists in your codebase, not introduced here. From lg upward, the logo's
//   left edge and this page's left text edge line up exactly.
// - All clause content below is unchanged from the version you provided —
//   only the headings, spacing, and container were reworked. No legal
//   wording was rewritten, trimmed, or added.
// - Headings are deliberately abstract rather than literal ("Where the Line
//   Is Drawn" instead of "Limitation of Liability"), so a skim of the page
//   doesn't hand someone a partial legal picture — full detail requires
//   actually reading the paragraph underneath.
// - This assumes <Header /> and <Footer /> are rendered by a parent
//   layout.tsx. If not, import and place them at the top/bottom of return.
// ============================================================================

'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsOfUsePage() {
  return (
    <main className="bg-white text-gray-900">
      {/* ====================================================================
          PAGE HEADER
          Restored to the original gradient banner — full-bleed background,
          content constrained to the same max-w-[1400px] container as
          Header.tsx / Footer.tsx (previously this was max-w-4xl).
      ==================================================================== */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Terms & Conditions
          </h1>
          <p className="text-lg text-blue-100 md:text-xl">
            Last Updated: September 3, 2026
          </p>
        </div>
      </div>

      {/* ====================================================================
          BODY
          Full container width — no inner max-w cap, so body copy runs the
          same width as the head section above it (mx-auto max-w-[1400px]
          px-4 md:px-8, matching Header.tsx / Footer.tsx). mt-10/mt-14 gives
          the head section room to breathe before the body starts.
      ==================================================================== */}
      <div className="mx-auto mt-10 max-w-[1400px] px-4 pb-14 md:mt-14 md:px-8 md:pb-20">
        <article className="space-y-14">

          <Section title="Who We're Referring To">
            <P>
              These Terms of Use, referred to as these “Terms,” govern the
              relationship between you, referred to as the “Client,” “you,”
              or “your,” and Sarsen Strategy Partners, referred to as
              “Sarsen,” “the Company,” “we,” “us,” or “our,” in connection
              with the website and the strategy consulting, advisory,
              diagnostic, and related services made available by Sarsen.
            </P>
            <P>
              Sarsen may use the names Sarsen Strategy Partners, Sarsen Partners,
              or Sarsen Strategic Partners in connection with its activities.
              References to Sarsen in these Terms are intended to refer to the
              business providing the relevant Services to you.
            </P>
          </Section>

          <Section title="Before You Continue">
            <P>
              By accessing our website, purchasing our Services, submitting
              information for an engagement, making a payment, or otherwise
              engaging with Sarsen in connection with the Services, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms, together with the Privacy Policy and Refund &
              Cancellation Policy applicable to your engagement.
            </P>
            <P>
              <strong>
                If you do not agree to these Terms, you must not access, use,
                or purchase the Services.
              </strong>
            </P>
          </Section>

          <Section title="What We Do Together" prominent>
            <P>
              Sarsen provides strategy consulting, advisory, business
              diagnostic, analytical, and related professional services to
              businesses, founders, startups, and other organisations. Services
              may include, without limitation, strategic analysis, growth
              strategy, business model analysis, market positioning, financial
              planning, operations-related analysis, and diagnostic engagements.
            </P>
            <P>
              The specific scope, deliverables, timelines, fees, and other
              engagement-specific terms are determined by the applicable
              package description, proposal, Statement of Work, referred to
              as an “SOW,” Service Agreement, or other written engagement
              documentation.
            </P>
            <P>
              Sarsen determines the personnel responsible for performing an
              engagement based on the nature of the work, expertise, availability,
              and internal allocation of resources. No particular individual is
              guaranteed to perform an engagement unless expressly confirmed in
              writing.
            </P>
          </Section>

          <Section title="Your Part in This" prominent>
            <P>
              The quality, accuracy, and usefulness of an engagement depend in
              part on the information, cooperation, access, and decisions
              provided by the Client. The Client agrees to:
            </P>

            <List>
              <li>
                Provide truthful, accurate, complete, and reasonably current
                information about its business, operations, financial position,
                objectives, circumstances, and other matters relevant to the
                engagement.
              </li>
              <li>
                Provide information, documents, data, access, and other
                materials reasonably required by Sarsen to perform the agreed
                Services.
              </li>
              <li>
                Respond to reasonable information requests and communications
                within the timelines agreed for the engagement.
              </li>
              <li>
                Designate an appropriate point of contact capable of providing
                relevant information, coordinating with Sarsen, and facilitating
                necessary decisions or approvals.
              </li>
              <li>
                Make relevant personnel, systems, documents, and other resources
                reasonably available where required for the agreed Services.
              </li>
              <li>
                Exercise independent judgment regarding whether and how to
                implement any Recommendation provided by Sarsen.
              </li>
            </List>

            <P>
              Sarsen is entitled to rely on information supplied by the Client
              unless the applicable engagement expressly provides otherwise.
              Sarsen is not responsible for inaccuracies, omissions, delays, or
              conclusions materially affected by information that is inaccurate,
              incomplete, misleading, outdated, or not supplied in a timely
              manner.
            </P>

            <P>
              <strong>
                Failure to provide required information, access, cooperation, or
                decisions may affect the scope, quality, timing, or feasibility
                of the Services and deliverables.
              </strong>
            </P>
          </Section>

          <Section title="What We Can and Cannot Promise" prominent>
            <P>
              Sarsen provides strategic analysis, professional judgment,
              recommendations, frameworks, and other deliverables based on the
              information available to it at the relevant time. However,
              <strong>
                {' '}Sarsen does not guarantee any specific business outcome,
                financial return, funding outcome, valuation, revenue level,
                growth rate, commercial result, or success of any strategy or
                Recommendation.
              </strong>
            </P>
            <P>
              Business outcomes depend on numerous factors, including the
              Client's execution, market conditions, competitive dynamics,
              capital availability, management decisions, external events, and
              other circumstances outside Sarsen's control. A well-designed
              strategy may not produce the result anticipated by the Client if
              execution is incomplete, delayed, altered, or unsuccessful, or if
              external conditions change.
            </P>
          </Section>

          <Section title="The Practical Arrangements">
            <P>
              Fees are stated in the applicable package description, proposal,
              SOW, Service Agreement, invoice, or other applicable engagement
              documentation. Fees may be stated as inclusive or exclusive of
              applicable taxes, as specified at the time of invoicing.
            </P>
            <P>
              Payment must be made in accordance with the applicable payment
              schedule. For certain engagements, milestone or staged payments
              may be required. Sarsen may pause or suspend Services where an
              undisputed payment remains overdue.
            </P>
            <P>
              Late payments may accrue interest at 1.5% per month or the maximum
              rate permitted by applicable law, whichever is lower.
            </P>
          </Section>

          <Section title="How We Might Step Away">
            <P>
              Sarsen may terminate or suspend an engagement where circumstances
              materially prevent or interfere with the proper provision of the
              Services, including the following circumstances:
            </P>

            <List>
              <li>
                <strong>Misconduct:</strong> If the Client or its representatives
                engage in inappropriate, threatening, harassing, abusive,
                unlawful, or otherwise materially unprofessional conduct toward
                Sarsen personnel, contractors, or representatives.
              </li>
              <li>
                <strong>Failure to Cooperate:</strong> If the Client repeatedly
                fails to provide information, respond to communications, attend
                agreed meetings, or otherwise meet material obligations required
                for the engagement.
              </li>
              <li>
                <strong>Non-Provision of Required Information:</strong> If the
                Client does not provide essential information, documents, access,
                financial data, operational information, or access to relevant
                personnel reasonably required to perform the Services.
              </li>
              <li>
                <strong>Breach of Terms:</strong> If the Client materially
                breaches these Terms, the applicable SOW, or applicable law.
              </li>
            </List>

            <P>
              Where an engagement is terminated because of a Client breach,
              misconduct, non-payment, or material failure to cooperate, fees
              already earned for work performed and any outstanding amounts
              remain payable. Refunds, where applicable, are governed by the
              Refund & Cancellation Policy.
            </P>
          </Section>

          <Section title="How You Might Step Away">
            <P>
              The Client may request termination of an engagement in writing.
              Any refund or payment consequences arising from termination shall
              be determined in accordance with the applicable Refund &
              Cancellation Policy, SOW, Service Agreement, or other applicable
              engagement terms. Fees for Services already performed or otherwise
              earned remain payable.
            </P>
          </Section>

          <Section title="What Belongs to Whom">
            <P>
              Sarsen retains its intellectual property rights in its proprietary
              methodologies, frameworks, models, templates, tools, processes,
              know-how, and other materials developed or owned by Sarsen,
              whether created before or during an engagement, together
              referred to as “Sarsen IP.”
            </P>
            <P>
              Upon full payment of the applicable fees, the Client receives a
              non-exclusive, non-transferable right to use deliverables
              specifically prepared for the Client for its own internal business
              purposes, subject to the applicable engagement terms.
            </P>
            <P>
              The Client may not resell, sublicense, commercially exploit,
              reproduce, publish, distribute, or otherwise make Sarsen's
              proprietary methodologies, frameworks, tools, or other Sarsen IP
              available to third parties without Sarsen's prior written consent,
              except where reasonably necessary for the Client's own internal or
              investor-facing purposes.
            </P>
          </Section>

          <Section title="What Stays Between Us">
            <P>
              Each party agrees to protect the other party's confidential
              business information using reasonable care and to use such
              information only for purposes connected with the relevant
              engagement. Confidential information may be disclosed where
              required by applicable law or where reasonably necessary to
              perform the engagement.
            </P>
            <P>
              Unless otherwise agreed in writing, confidentiality obligations
              under these Terms survive termination of the relevant engagement
              for a period of five years.
            </P>
          </Section>

          <Section title="Where the Line Is Drawn" prominent>
            <P>To the maximum extent permitted by applicable law:</P>

            <List>
              <li>
                Sarsen's total aggregate liability arising out of or relating
                to a particular engagement, whether in contract, tort,
                negligence, or otherwise, shall not exceed the total fees
                actually paid by the Client for that specific engagement during
                the six months preceding the event giving rise to the claim.
              </li>
              <li>
                Sarsen shall not be liable for indirect, incidental,
                consequential, special, exemplary, or punitive damages,
                including loss of profits, revenue, business opportunity,
                goodwill, or data.
              </li>
              <li>
                Sarsen is not liable for outcomes resulting from the Client's
                business decisions, implementation or non-implementation of
                Recommendations, third-party actions, market conditions,
                changes in law or regulation, or events beyond Sarsen's
                reasonable control.
              </li>
              <li>
                Sarsen is not responsible for consequences materially arising
                from inaccurate, incomplete, misleading, or delayed information
                supplied by the Client.
              </li>
            </List>

            <P>
              Nothing in these Terms is intended to exclude or limit liability
              to the extent that such exclusion or limitation is not permitted
              under applicable law.
            </P>
          </Section>

          <Section title="Carrying Our Own Weight">
            <P>
              To the maximum extent permitted by applicable law, the Client
              agrees to indemnify and hold harmless Sarsen and its partners,
              employees, consultants, contractors, and representatives from
              claims, losses, damages, liabilities, costs, and reasonable
              expenses arising out of or relating to:
            </P>

            <List>
              <li>The Client's breach of these Terms or applicable law;</li>
              <li>
                Misconduct or unlawful conduct by the Client or its
                representatives;
              </li>
              <li>
                Inaccurate, incomplete, misleading, or materially incorrect
                information supplied by the Client;
              </li>
              <li>
                The Client's implementation, non-implementation, or use of
                Recommendations or deliverables; or
              </li>
              <li>
                The Client's business operations, decisions, contracts, or
                dealings with third parties.
              </li>
            </List>
          </Section>

          <Section title="If We Ever Disagree" prominent>
            <P>These Terms shall be governed by the laws of India.</P>
            <P>
              The parties shall first seek to resolve any dispute arising out
              of or relating to these Terms or the Services through good-faith
              communication and negotiation.
            </P>
            <P>
              Where a dispute cannot be resolved through good-faith
              negotiation, it may be referred to arbitration in accordance with
              the Arbitration and Conciliation Act, 1996, subject to the
              applicable engagement documentation and applicable law. The
              language of the proceedings shall be English unless otherwise
              agreed.
            </P>
          </Section>

          <Section title="This Is Not Fixed in Stone">
            <P>
              Sarsen may update these Terms from time to time. Updated Terms
              will be published on the website with a revised “Last Updated”
              date. Where appropriate, material changes may also be communicated
              through available contact channels. Continued use of the website
              or Services following publication of updated Terms may constitute
              acceptance of the revised Terms to the extent permitted by
              applicable law.
            </P>
          </Section>

          <Section title="If Something Feels Off">
            <P>
              Sarsen encourages Clients to bring any concern, complaint,
              suspected issue, service-related difficulty, or other matter
              concerning an engagement to Sarsen's attention directly so that
              the matter can be reviewed and addressed appropriately.
            </P>
            <P>
              Where permitted by applicable law and the circumstances of the
              matter, Clients should provide Sarsen with a reasonable
              opportunity to review and address a concern before pursuing
              external escalation.
            </P>
            <P>
              Nothing in these Terms is intended to restrict any right that
              cannot lawfully be restricted, including any right to approach a
              competent authority where applicable law permits or requires it.
            </P>

            <div className="rounded-md border border-gray-200 bg-gray-50 p-6">
              <p className="mb-2 font-medium text-gray-800">
                Sarsen Strategy Partners
              </p>
              <p className="text-gray-600">
                Email: contact@sarsenpartners.com
              </p>
              <p className="mt-3 text-sm text-gray-500">
                You may contact our team through the email address above. We
                review and address concerns based on their nature and
                circumstances. Responses may take up to 45 days depending on
                the nature, seriousness, complexity, and volume of matters
                being handled.
              </p>
            </div>
          </Section>

          <Section title="How Formal Word Reaches Us">
            <P>
              Formal notices and other communications relating to an engagement
              may be submitted in writing through the contact details provided
              by Sarsen or otherwise specified in the applicable SOW, Service
              Agreement, or engagement documentation.
            </P>
          </Section>

          <Section title="The Remaining Pieces">
            <P>
              <strong>Entire Agreement:</strong> These Terms, together with
              the applicable SOW, Service Agreement, package description,
              invoice, and referenced policies, constitute the applicable
              agreement between the parties regarding the relevant Services
              and supersede prior discussions or representations to the extent
              inconsistent with the written agreement.
            </P>
            <P>
              <strong>Severability:</strong> If any provision of these Terms
              is determined to be invalid or unenforceable, the remaining
              provisions shall continue to the extent permitted by applicable
              law.
            </P>
            <P>
              <strong>No Waiver:</strong> A failure or delay by Sarsen in
              enforcing any provision shall not constitute a waiver of its
              right to enforce that provision later.
            </P>
            <P>
              <strong>Assignment:</strong> The Client may not assign or
              transfer its rights or obligations under an engagement without
              Sarsen's prior written consent, except where permitted by
              applicable law. Sarsen may assign its rights or obligations in
              connection with a restructuring, merger, acquisition, or
              transfer of substantially all relevant business assets, subject
              to applicable law.
            </P>
            <P>
              <strong>Independent Relationship:</strong> Nothing in these
              Terms creates an employment, agency, partnership, or joint
              venture relationship between the Client and any Sarsen
              personnel, consultant, or representative.
            </P>
            <P>
              <strong>Anti-Bribery and Lawful Conduct:</strong> Each party
              agrees to conduct its activities in connection with the
              engagement in accordance with applicable anti-bribery,
              anti-corruption, and other applicable laws.
            </P>
          </Section>

          {/* ==================================================================
              ACKNOWLEDGMENT
              Kept as a distinct closing callout, restyled in the site's navy
              rather than the original blue gradient card, so it reads as
              part of this site rather than a dropped-in template block.
          ================================================================== */}
          <section className="rounded-md border border-[#002855]/15 bg-[#002855]/[0.03] p-6 md:p-8">
            <h2 className="mb-3 text-xl font-semibold text-[#002855] md:text-2xl">
              One Last Thing
            </h2>
            <P>
              By using the Services, submitting an engagement request, or
              making a payment, you acknowledge that you have had an
              opportunity to review these Terms and agree to be bound by them,
              together with the other policies and engagement-specific terms
              applicable to your Services.
            </P>
          </section>

        </article>

        {/* Back to Home */}
        {/* <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-block rounded-md bg-[#002855] px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#0A1E3D]"
          >
            Back to Home
          </Link>
        </div> */}
      </div>
    </main>
  );
}

// ============================================================================
// SECTION COMPONENT
// Every heading carries the same solid semibold weight — hierarchy is
// signaled through size instead, so "prominent" sections (scope of
// services, no-guarantee, liability, disputes) simply read larger rather
// than heavier.
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
  const sizeClass = prominent
    ? 'text-2xl md:text-3xl'
    : 'text-xl md:text-2xl';

  return (
    <section>
      <h2 className={`mb-4 font-semibold text-[#002855] ${sizeClass}`}>{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

// ============================================================================
// PARAGRAPH — justified, hyphenated body copy. Hyphenation keeps justified
// text from producing ragged word-gaps on narrow (mobile) columns.
// ============================================================================
function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-justify text-[15px] leading-snug text-gray-700 md:text-base"
      style={{ hyphens: 'auto', WebkitHyphens: 'auto' }}
    >
      {children}
    </p>
  );
}

// ============================================================================
// LIST — same justified/hyphenated treatment as paragraphs, for consistency
// with the surrounding prose.
// ============================================================================
function List({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="ml-4 list-disc space-y-1.5 text-justify text-[15px] leading-snug text-gray-700 md:text-base"
      style={{ hyphens: 'auto', WebkitHyphens: 'auto' }}
    >
      {children}
    </ul>
  );
}