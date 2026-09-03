// app/disclaimer/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Disclaimer</h1>
          <p className="text-xl text-blue-100">
            Last Updated: September 3, 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">

          {/* Important Notice */}
          <section className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z" />
              </svg>

              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">
                  Important Notice
                </h2>
                <p className="text-gray-700">
                  Please read this Disclaimer carefully before using the
                  website or engaging the services of Sarsen Strategy
                  Partners. This Disclaimer explains the nature and limitations
                  of the information, recommendations, strategies, case
                  studies, frameworks, and other materials made available by
                  Sarsen Strategy Partners.
                </p>
              </div>
            </div>
          </section>

          {/* 1. General Disclaimer */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              1. General Disclaimer
            </h2>

            <p className="text-gray-600 mb-4">
              The information, recommendations, strategies, analyses,
              frameworks, materials, and other content provided by Sarsen
              Strategy Partners (collectively, &quot;Content&quot;) are
              provided for informational, strategic, and educational purposes.
            </p>

            <p className="text-gray-600 mb-4">
              The Content is not intended to constitute, and should not be
              construed as, legal, financial, tax, accounting, investment, or
              other regulated professional advice.
            </p>

            <p className="text-gray-600 mb-4">
              While we make reasonable efforts to provide useful and accurate
              information, we do not represent or warrant that the Content is
              complete, accurate, current, suitable, or reliable for every
              particular purpose or circumstance.
            </p>

            <p className="text-gray-600">
              <strong>
                Your use of the website, Content, and our services, and your
                reliance on any recommendations or information provided by us,
                is undertaken at your own discretion and risk.
              </strong>
            </p>
          </section>

          {/* 2. No Guarantee of Results */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              2. No Guarantee of Business Results
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              2.1 No Guaranteed Outcome
            </h3>

            <p className="text-gray-600 mb-4">
              Sarsen Strategy Partners does not guarantee any particular
              business, financial, operational, strategic, fundraising,
              revenue, growth, market-share, cost-saving, or other outcome
              from the use or implementation of our recommendations,
              strategies, analyses, or other services.
            </p>

            <p className="text-gray-600 mb-4">
              Business outcomes depend on circumstances and factors that may
              be outside our control, including the Client&apos;s decisions,
              implementation, resources, timing, market conditions,
              competition, economic conditions, industry developments,
              regulatory changes, and other external circumstances.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              2.2 Projected Outcomes
            </h3>

            <p className="text-gray-600 mb-4">
              Any projections, estimates, scenarios, targets, forecasts, or
              potential outcomes discussed during an engagement are based on
              information and assumptions available at the relevant time.
              They are not promises, warranties, or guarantees of future
              performance.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              2.3 Past Results
            </h3>

            <p className="text-gray-600">
              Past performance, previous engagements, examples, case studies,
              or other historical outcomes should not be interpreted as an
              indication or guarantee of future results for any Client.
            </p>
          </section>

          {/* 3. Not Professional Advice */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              3. Not Professional Advice
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              3.1 Legal Matters
            </h3>

            <p className="text-gray-600 mb-4">
              Sarsen Strategy Partners provides strategy consulting services
              and does not provide legal advice. Information relating to
              contracts, intellectual property, regulatory matters, legal
              structures, compliance, or other legal subjects is provided only
              as general business or strategic information.
            </p>

            <p className="text-gray-600 mb-6">
              You should obtain advice from appropriately qualified legal
              professionals before making decisions that require legal
              analysis or advice.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              3.2 Financial and Investment Matters
            </h3>

            <p className="text-gray-600 mb-4">
              Sarsen Strategy Partners does not provide personalized
              investment advice or recommend specific securities or investment
              products. Discussions concerning financial planning, capital
              raising, business finance, valuation, or investment strategy are
              provided in the context of strategic business consulting and
              should not be treated as individualized investment advice.
            </p>

            <p className="text-gray-600 mb-6">
              You should consult an appropriately qualified financial,
              investment, or other professional before making decisions
              requiring specialized financial or investment advice.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              3.3 Tax and Accounting Matters
            </h3>

            <p className="text-gray-600 mb-4">
              Sarsen Strategy Partners does not provide tax or professional
              accounting advice. Any discussion of financial metrics,
              accounting concepts, tax considerations, or related business
              matters is general in nature and should not be treated as
              professional tax or accounting advice.
            </p>

            <p className="text-gray-600">
              You should consult appropriately qualified tax and accounting
              professionals regarding matters specific to your business,
              circumstances, or jurisdiction.
            </p>
          </section>

          {/* 4. Nature of Strategic Consulting */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              4. Nature of Strategic Consulting
            </h2>

            <p className="text-gray-600 mb-4">
              Sarsen Strategy Partners provides strategic, analytical, and
              business consulting services. Our recommendations are developed
              based on the information, assumptions, objectives, constraints,
              and circumstances communicated to us or otherwise available to us
              during an engagement.
            </p>

            <p className="text-gray-600">
              The Client remains responsible for evaluating recommendations,
              making business decisions, obtaining any required specialist
              advice, and determining whether or how recommendations should be
              implemented.
            </p>
          </section>

          {/* 5. Testimonials and Case Studies */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              5. Testimonials and Case Studies
            </h2>

            <p className="text-gray-600 mb-4">
              Testimonials, reviews, case studies, examples, references, and
              descriptions of previous work or outcomes appearing on our
              website, in proposals, presentations, or other materials reflect
              the particular circumstances of the individuals or entities
              referenced.
            </p>

            <p className="text-gray-600 mb-4">
              Such material is provided for illustrative and informational
              purposes and should not be understood as representing typical,
              expected, or guaranteed results for every Client.
            </p>

            <p className="text-gray-600">
              <strong>
                Results vary according to the circumstances of each business,
                including its industry, market, resources, decisions,
                implementation, timing, and other relevant factors.
              </strong>
            </p>
          </section>

          {/* 6. Third-Party Links */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              6. Third-Party Links and Resources
            </h2>

            <p className="text-gray-600 mb-4">
              Our website, materials, and recommendations may contain links or
              references to third-party websites, platforms, tools, resources,
              products, or services.
            </p>

            <p className="text-gray-600 mb-4">
              Such links and references are provided for convenience or
              informational purposes and do not constitute an endorsement,
              sponsorship, partnership, approval, or guarantee by Sarsen
              Strategy Partners.
            </p>

            <p className="text-gray-600 mb-4">
              Sarsen Strategy Partners is not responsible for the content,
              accuracy, availability, security, privacy practices, products,
              services, transactions, or practices of third-party websites or
              services.
            </p>

            <p className="text-gray-600">
              <strong>
                You access and use third-party websites, tools, resources, and
                services at your own discretion and risk.
              </strong>
            </p>
          </section>

          {/* 7. Information Provided by Clients */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              7. Reliance on Client Information
            </h2>

            <p className="text-gray-600 mb-4">
              Our analysis and recommendations may depend upon information,
              documents, assumptions, data, forecasts, representations, and
              other materials provided by the Client or obtained from sources
              identified during an engagement.
            </p>

            <p className="text-gray-600">
              We do not independently verify every item of information
              supplied to us. The Client is responsible for the completeness
              and accuracy of information it provides and should promptly
              identify material changes or corrections that may affect the
              engagement.
            </p>
          </section>

          {/* 8. Industry and Regulatory Considerations */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              8. Industry-Specific Considerations
            </h2>

            <p className="text-gray-600 mb-4">
              Strategic consulting may involve businesses operating in
              industries or jurisdictions with specialized legal, regulatory,
              technical, safety, licensing, accounting, tax, or operational
              requirements.
            </p>

            <p className="text-gray-600 mb-4">
              Unless expressly included within a written Statement of Work,
              our services should not be understood as a substitute for
              specialized professional or technical advice concerning such
              requirements.
            </p>

            <p className="text-gray-600">
              <strong>
                The Client remains responsible for identifying and complying
                with laws, regulations, licensing requirements, industry
                standards, and other obligations applicable to its business.
              </strong>
            </p>
          </section>

          {/* 9. Website Availability and Content */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              9. Website and Content
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              9.1 Accuracy
            </h3>

            <p className="text-gray-600 mb-4">
              We make reasonable efforts to maintain useful and accurate
              information on our website. However, website content may contain
              errors, omissions, outdated information, or inaccuracies.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              9.2 Availability
            </h3>

            <p className="text-gray-600 mb-4">
              We do not guarantee that the website or any particular feature,
              resource, or Content will always be available, uninterrupted,
              secure, timely, or error-free.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              9.3 Changes
            </h3>

            <p className="text-gray-600">
              We may update, modify, replace, or remove website Content,
              service descriptions, pricing, resources, or other information
              from time to time. You should not rely upon outdated website
              information where more recent information is available.
            </p>
          </section>

          {/* 10. No Warranties */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              10. No Warranties
            </h2>

            <p className="text-gray-600 mb-4">
              To the fullest extent permitted by applicable law, the website,
              Content, and services are provided on an &quot;as is&quot; and
              &quot;as available&quot; basis.
            </p>

            <p className="text-gray-600 mb-4">
              We do not make warranties or representations, express or
              implied, regarding the accuracy, completeness, suitability,
              availability, reliability, or fitness of the Content or services
              for any particular purpose.
            </p>

            <p className="text-gray-600">
              Nothing in this Disclaimer excludes or limits any warranty,
              right, or protection that cannot lawfully be excluded or limited
              under applicable law.
            </p>
          </section>

          {/* 11. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              11. Limitation of Liability
            </h2>

            <p className="text-gray-600 mb-4">
              The limitation of liability applicable to paid consulting
              engagements is governed by the Terms &amp; Conditions and any
              applicable Statement of Work.
            </p>

            <p className="text-gray-600 mb-4">
              To the fullest extent permitted by applicable law, Sarsen
              Strategy Partners shall not be responsible for indirect,
              incidental, special, consequential, punitive, or similar losses,
              including loss of profits, revenue, data, business opportunities,
              or business interruption arising from the use of our website,
              Content, recommendations, or services.
            </p>

            <p className="text-gray-600">
              The specific liability limitations, exclusions, and applicable
              cap are set out in the Terms &amp; Conditions and form part of
              the contractual framework governing paid engagements.
            </p>
          </section>

          {/* 12. Client Responsibility */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              12. Client Responsibility for Decisions
            </h2>

            <p className="text-gray-600 mb-4">
              Strategic recommendations are intended to support business
              decision-making. They do not transfer responsibility for business
              decisions from the Client to Sarsen Strategy Partners.
            </p>

            <p className="text-gray-600">
              The Client is responsible for determining whether a
              recommendation is appropriate for its circumstances and for the
              consequences of decisions it makes and actions it takes,
              including the implementation of recommendations.
            </p>
          </section>

          {/* 13. Relationship Disclaimer */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              13. Relationship Disclaimer
            </h2>

            <p className="text-gray-600 mb-4">
              General information made available through our website, blog,
              social media, public resources, or other general communications
              does not by itself create a consulting engagement.
            </p>

            <p className="text-gray-600">
              The rights and obligations applicable to a paid consulting
              engagement are established through the applicable contractual
              documents, including the Terms &amp; Conditions and, where
              applicable, a Statement of Work.
            </p>
          </section>

          {/* 14. Association and References */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              14. Third-Party Names and References
            </h2>

            <p className="text-gray-600 mb-4">
              References to organizations, companies, brands, individuals,
              products, platforms, or other third parties may appear on our
              website or in our materials for illustrative, educational,
              analytical, or informational purposes.
            </p>

            <p className="text-gray-600">
              Unless expressly stated otherwise, such references should not be
              interpreted as an endorsement, sponsorship, partnership,
              affiliation, or other formal association with Sarsen Strategy
              Partners.
            </p>
          </section>

          {/* 15. Changes */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              15. Changes to This Disclaimer
            </h2>

            <p className="text-gray-600">
              We may update this Disclaimer from time to time. Any revised
              version will be published on this page with an updated
              &quot;Last Updated&quot; date. The revised Disclaimer will apply
              prospectively to website use and to matters to the extent
              permitted by applicable law and any existing contractual
              arrangements.
            </p>
          </section>

          {/* 16. Relationship with Other Legal Documents */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              16. Relationship with Other Legal Documents
            </h2>

            <p className="text-gray-600 mb-4">
              This Disclaimer forms part of the broader legal framework
              governing the website and, where applicable, the services of
              Sarsen Strategy Partners. Other applicable documents may include
              our{' '}
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
                href="/refund-cancellation-policy"
                className="text-blue-600 hover:underline"
              >
                Refund &amp; Cancellation Policy
              </Link>
              .
            </p>

            <p className="text-gray-600">
              These documents address different subject matters. In the event
              of a conflict, the document or contractual provision specifically
              governing the subject matter in question will prevail to the
              extent applicable. For example, refund and cancellation matters
              are governed by the applicable Refund &amp; Cancellation Policy
              and contractual terms.
            </p>
          </section>

          {/* 17. Questions and Concerns */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              17. Questions and Concerns
            </h2>

            <p className="text-gray-600 mb-4">
              If you have a question, concern, or believe that information on
              our website or in our materials may be inaccurate or may create
              a misunderstanding, we encourage you to contact the Sarsen team
              directly and give us an opportunity to review and address the
              matter where permitted by applicable law.
            </p>

            <p className="text-gray-600 mb-4">
              Please contact us by email with sufficient information for us to
              understand the concern. Depending on the nature, seriousness,
              complexity, and volume of matters being handled, a response may
              take from a few hours up to 45 days.
            </p>

            <p className="text-gray-600 mb-6">
              Nothing in this section is intended to restrict any right or
              remedy that cannot lawfully be restricted, including any right to
              approach a competent authority where applicable.
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
            </div>
          </section>

          {/* Final Acknowledgment */}
          <section className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Final Acknowledgment
            </h2>

            <p className="text-gray-700 mb-3">
              <strong>
                By using our website or engaging our services, you acknowledge
                that:
              </strong>
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>
                Sarsen Strategy Partners does not guarantee particular business
                or financial results.
              </li>
              <li>
                Strategic consulting recommendations are not a substitute for
                specialized legal, financial, tax, accounting, investment, or
                technical professional advice.
              </li>
              <li>
                You remain responsible for your business decisions and the
                implementation of recommendations.
              </li>
              <li>
                Testimonials, case studies, examples, and projected outcomes
                are not guarantees of future results.
              </li>
              <li>
                Third-party links and references do not necessarily constitute
                endorsement or affiliation.
              </li>
              <li>
                The applicable Terms &amp; Conditions and other contractual
                documents govern the relevant rights and obligations of a paid
                engagement.
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
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}