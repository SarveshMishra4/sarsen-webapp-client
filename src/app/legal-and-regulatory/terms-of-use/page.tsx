// app/terms-of-use/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Terms & Conditions</h1>
          <p className="text-xl text-blue-100">
            Last Updated: September 3, 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">

          {/* 1. Identification of the Company */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              1. Company Identification
            </h2>
            <p className="text-gray-600 mb-4">
              These Terms of Use (“Terms”) govern the relationship between you
              (“Client”, “you”, “your”) and Sarsen Strategy Partners (“Sarsen”,
              “Company”, “we”, “us”, “our”) in connection with the website and
              the strategy consulting, advisory, diagnostic, and related
              services made available by Sarsen.
            </p>
            <p className="text-gray-600">
              Sarsen may use the names Sarsen Strategy Partners, Sarsen Partners,
              or Sarsen Strategic Partners in connection with its activities.
              References to Sarsen in these Terms are intended to refer to the
              business providing the relevant Services to you.
            </p>
          </section>

          {/* 2. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              2. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-4">
              By accessing our website, purchasing our Services, submitting
              information for an engagement, making a payment, or otherwise
              engaging with Sarsen in connection with the Services, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms, together with the Privacy Policy and Refund &
              Cancellation Policy applicable to your engagement.
            </p>
            <p className="text-gray-600">
              <strong>
                If you do not agree to these Terms, you must not access, use,
                or purchase the Services.
              </strong>
            </p>
          </section>

          {/* 3. Services Description */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              3. Services Description
            </h2>
            <p className="text-gray-600 mb-4">
              Sarsen provides strategy consulting, advisory, business
              diagnostic, analytical, and related professional services to
              businesses, founders, startups, and other organisations. Services
              may include, without limitation, strategic analysis, growth
              strategy, business model analysis, market positioning, financial
              planning, operations-related analysis, and diagnostic engagements.
            </p>
            <p className="text-gray-600 mb-4">
              The specific scope, deliverables, timelines, fees, and other
              engagement-specific terms are determined by the applicable
              package description, proposal, Statement of Work (“SOW”), Service
              Agreement, or other written engagement documentation.
            </p>
            <p className="text-gray-600">
              Sarsen determines the personnel responsible for performing an
              engagement based on the nature of the work, expertise, availability,
              and internal allocation of resources. No particular individual is
              guaranteed to perform an engagement unless expressly confirmed in
              writing.
            </p>
          </section>

          {/* 4. Client Responsibilities and Cooperation */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              4. Client Responsibilities and Cooperation
            </h2>
            <p className="text-gray-600 mb-4">
              The quality, accuracy, and usefulness of an engagement depend in
              part on the information, cooperation, access, and decisions
              provided by the Client. The Client agrees to:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
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
            </ul>

            <p className="text-gray-600 mb-4">
              Sarsen is entitled to rely on information supplied by the Client
              unless the applicable engagement expressly provides otherwise.
              Sarsen is not responsible for inaccuracies, omissions, delays, or
              conclusions materially affected by information that is inaccurate,
              incomplete, misleading, outdated, or not supplied in a timely
              manner.
            </p>

            <p className="text-gray-600">
              <strong>
                Failure to provide required information, access, cooperation, or
                decisions may affect the scope, quality, timing, or feasibility
                of the Services and deliverables.
              </strong>
            </p>
          </section>

          {/* 5. No Guarantee of Outcomes */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              5. No Guarantee of Outcomes
            </h2>
            <p className="text-gray-600 mb-4">
              Sarsen provides strategic analysis, professional judgment,
              recommendations, frameworks, and other deliverables based on the
              information available to it at the relevant time. However,
              <strong>
                {' '}Sarsen does not guarantee any specific business outcome,
                financial return, funding outcome, valuation, revenue level,
                growth rate, commercial result, or success of any strategy or
                Recommendation.
              </strong>
            </p>
            <p className="text-gray-600">
              Business outcomes depend on numerous factors, including the
              Client’s execution, market conditions, competitive dynamics,
              capital availability, management decisions, external events, and
              other circumstances outside Sarsen’s control. A well-designed
              strategy may not produce the result anticipated by the Client if
              execution is incomplete, delayed, altered, or unsuccessful, or if
              external conditions change.
            </p>
          </section>

          {/* 6. Payment Terms */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              6. Payment Terms
            </h2>
            <p className="text-gray-600 mb-4">
              Fees are stated in the applicable package description, proposal,
              SOW, Service Agreement, invoice, or other applicable engagement
              documentation. Fees may be stated as inclusive or exclusive of
              applicable taxes, as specified at the time of invoicing.
            </p>
            <p className="text-gray-600 mb-4">
              Payment must be made in accordance with the applicable payment
              schedule. For certain engagements, milestone or staged payments
              may be required. Sarsen may pause or suspend Services where an
              undisputed payment remains overdue.
            </p>
            <p className="text-gray-600">
              Late payments may accrue interest at 1.5% per month or the maximum
              rate permitted by applicable law, whichever is lower.
            </p>
          </section>

          {/* 7. Termination by Company */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              7. Termination by Company
            </h2>
            <p className="text-gray-600 mb-4">
              Sarsen may terminate or suspend an engagement where circumstances
              materially prevent or interfere with the proper provision of the
              Services, including the following circumstances:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
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
            </ul>

            <p className="text-gray-600">
              Where an engagement is terminated because of a Client breach,
              misconduct, non-payment, or material failure to cooperate, fees
              already earned for work performed and any outstanding amounts
              remain payable. Refunds, where applicable, are governed by the
              Refund & Cancellation Policy.
            </p>
          </section>

          {/* 8. Termination by Client */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              8. Termination by Client
            </h2>
            <p className="text-gray-600">
              The Client may request termination of an engagement in writing.
              Any refund or payment consequences arising from termination shall
              be determined in accordance with the applicable Refund &
              Cancellation Policy, SOW, Service Agreement, or other applicable
              engagement terms. Fees for Services already performed or otherwise
              earned remain payable.
            </p>
          </section>

          {/* 9. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              9. Intellectual Property
            </h2>
            <p className="text-gray-600 mb-4">
              Sarsen retains its intellectual property rights in its proprietary
              methodologies, frameworks, models, templates, tools, processes,
              know-how, and other materials developed or owned by Sarsen,
              whether created before or during an engagement (“Sarsen IP”).
            </p>
            <p className="text-gray-600 mb-4">
              Upon full payment of the applicable fees, the Client receives a
              non-exclusive, non-transferable right to use deliverables
              specifically prepared for the Client for its own internal business
              purposes, subject to the applicable engagement terms.
            </p>
            <p className="text-gray-600">
              The Client may not resell, sublicense, commercially exploit,
              reproduce, publish, distribute, or otherwise make Sarsen’s
              proprietary methodologies, frameworks, tools, or other Sarsen IP
              available to third parties without Sarsen’s prior written consent,
              except where reasonably necessary for the Client’s own internal or
              investor-facing purposes.
            </p>
          </section>

          {/* 10. Confidentiality */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              10. Confidentiality
            </h2>
            <p className="text-gray-600">
              Each party agrees to protect the other party’s confidential
              business information using reasonable care and to use such
              information only for purposes connected with the relevant
              engagement. Confidential information may be disclosed where
              required by applicable law or where reasonably necessary to
              perform the engagement.
            </p>
            <p className="text-gray-600 mt-4">
              Unless otherwise agreed in writing, confidentiality obligations
              under these Terms survive termination of the relevant engagement
              for five (5) years.
            </p>
          </section>

          {/* 11. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              11. Limitation of Liability
            </h2>

            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by applicable law:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                Sarsen’s total aggregate liability arising out of or relating
                to a particular engagement, whether in contract, tort,
                negligence, or otherwise, shall not exceed the total fees
                actually paid by the Client for that specific engagement during
                the six (6) months preceding the event giving rise to the claim.
              </li>
              <li>
                Sarsen shall not be liable for indirect, incidental,
                consequential, special, exemplary, or punitive damages,
                including loss of profits, revenue, business opportunity,
                goodwill, or data.
              </li>
              <li>
                Sarsen is not liable for outcomes resulting from the Client’s
                business decisions, implementation or non-implementation of
                Recommendations, third-party actions, market conditions,
                changes in law or regulation, or events beyond Sarsen’s
                reasonable control.
              </li>
              <li>
                Sarsen is not responsible for consequences materially arising
                from inaccurate, incomplete, misleading, or delayed information
                supplied by the Client.
              </li>
            </ul>

            <p className="text-gray-600">
              Nothing in these Terms is intended to exclude or limit liability
              to the extent that such exclusion or limitation is not permitted
              under applicable law.
            </p>
          </section>

          {/* 12. Indemnification */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              12. Indemnification
            </h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by applicable law, the Client
              agrees to indemnify and hold harmless Sarsen and its partners,
              employees, consultants, contractors, and representatives from
              claims, losses, damages, liabilities, costs, and reasonable
              expenses arising out of or relating to:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                The Client’s breach of these Terms or applicable law;
              </li>
              <li>
                Misconduct or unlawful conduct by the Client or its
                representatives;
              </li>
              <li>
                Inaccurate, incomplete, misleading, or materially incorrect
                information supplied by the Client;
              </li>
              <li>
                The Client’s implementation, non-implementation, or use of
                Recommendations or deliverables; or
              </li>
              <li>
                The Client’s business operations, decisions, contracts, or
                dealings with third parties.
              </li>
            </ul>
          </section>

          {/* 13. Dispute Resolution & Governing Law */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              13. Dispute Resolution & Governing Law
            </h2>
            <p className="text-gray-600 mb-4">
              These Terms shall be governed by the laws of India.
            </p>
            <p className="text-gray-600 mb-4">
              The parties shall first seek to resolve any dispute arising out
              of or relating to these Terms or the Services through good-faith
              communication and negotiation.
            </p>
            <p className="text-gray-600">
              Where a dispute cannot be resolved through good-faith
              negotiation, it may be referred to arbitration in accordance with
              the Arbitration and Conciliation Act, 1996, subject to the
              applicable engagement documentation and applicable law. The
              language of the proceedings shall be English unless otherwise
              agreed.
            </p>
          </section>

          {/* 14. Amendments */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              14. Amendments
            </h2>
            <p className="text-gray-600">
              Sarsen may update these Terms from time to time. Updated Terms
              will be published on the website with a revised “Last Updated”
              date. Where appropriate, material changes may also be communicated
              through available contact channels. Continued use of the website
              or Services following publication of updated Terms may constitute
              acceptance of the revised Terms to the extent permitted by
              applicable law.
            </p>
          </section>

          {/* 15. Client Concerns and Contact */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              15. Client Concerns and Contact
            </h2>

            <p className="text-gray-600 mb-4">
              Sarsen encourages Clients to bring any concern, complaint,
              suspected issue, service-related difficulty, or other matter
              concerning an engagement to Sarsen’s attention directly so that
              the matter can be reviewed and addressed appropriately.
            </p>

            <p className="text-gray-600 mb-4">
              Where permitted by applicable law and the circumstances of the
              matter, Clients should provide Sarsen with a reasonable
              opportunity to review and address a concern before pursuing
              external escalation.
            </p>

            <p className="text-gray-600 mb-4">
              Nothing in these Terms is intended to restrict any right that
              cannot lawfully be restricted, including any right to approach a
              competent authority where applicable law permits or requires it.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">
                Sarsen Strategy Partners
              </p>
              <p className="text-gray-600">
                Email: contact@sarsenpartners.com
              </p>
              <p className="text-gray-500 text-sm mt-3">
                You may contact our team through the email address above. We
                review and address concerns based on their nature and
                circumstances. Responses may take up to 45 days depending on
                the nature, seriousness, complexity, and volume of matters
                being handled.
              </p>
            </div>
          </section>

          {/* 16. Notices */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              16. Notices
            </h2>
            <p className="text-gray-600">
              Formal notices and other communications relating to an engagement
              may be submitted in writing through the contact details provided
              by Sarsen or otherwise specified in the applicable SOW, Service
              Agreement, or engagement documentation.
            </p>
          </section>

          {/* 17. Miscellaneous */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              17. Miscellaneous
            </h2>

            <div className="space-y-4 text-gray-600">
              <p>
                <strong>Entire Agreement:</strong> These Terms, together with
                the applicable SOW, Service Agreement, package description,
                invoice, and referenced policies, constitute the applicable
                agreement between the parties regarding the relevant Services
                and supersede prior discussions or representations to the extent
                inconsistent with the written agreement.
              </p>

              <p>
                <strong>Severability:</strong> If any provision of these Terms
                is determined to be invalid or unenforceable, the remaining
                provisions shall continue to the extent permitted by applicable
                law.
              </p>

              <p>
                <strong>No Waiver:</strong> A failure or delay by Sarsen in
                enforcing any provision shall not constitute a waiver of its
                right to enforce that provision later.
              </p>

              <p>
                <strong>Assignment:</strong> The Client may not assign or
                transfer its rights or obligations under an engagement without
                Sarsen’s prior written consent, except where permitted by
                applicable law. Sarsen may assign its rights or obligations in
                connection with a restructuring, merger, acquisition, or
                transfer of substantially all relevant business assets, subject
                to applicable law.
              </p>

              <p>
                <strong>Independent Relationship:</strong> Nothing in these
                Terms creates an employment, agency, partnership, or joint
                venture relationship between the Client and any Sarsen
                personnel, consultant, or representative.
              </p>

              <p>
                <strong>Anti-Bribery and Lawful Conduct:</strong> Each party
                agrees to conduct its activities in connection with the
                engagement in accordance with applicable anti-bribery,
                anti-corruption, and other applicable laws.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Acknowledgment
            </h2>
            <p className="text-gray-600">
              By using the Services, submitting an engagement request, or
              making a payment, you acknowledge that you have had an
              opportunity to review these Terms and agree to be bound by them,
              together with the other policies and engagement-specific terms
              applicable to your Services.
            </p>
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