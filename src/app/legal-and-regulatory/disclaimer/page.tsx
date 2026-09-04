// app/disclaimer/page.tsx
//
// ============================================================================
// LAYOUT NOTES (same system as Terms of Use / Privacy Choices / Refund):
// - Container matches Header.tsx / Footer.tsx: max-w-[1400px] + px-4 md:px-8.
// - Navy gradient header banner, full-bleed background, content constrained
//   to the shared container.
// - White card wrapper (bg-white rounded-xl shadow-sm border p-8 md:p-12)
//   removed — sections sit directly on the page.
// - Yellow "Important Notice" box and red "Final Acknowledgment" box
//   recolored to the same plain neutral gray-bordered box style used
//   elsewhere in the reference pages (Refund page's clause boxes). No new
//   accent colors introduced.
// - Numbered section headings reworked into the same conversational/abstract
//   style used on the Terms of Use page; no legal wording inside any
//   paragraph, list, or box was rewritten, trimmed, or added.
// - Blue links (text-blue-600) swapped for the site's navy palette
//   (#002855 / hover #0A1E3D), matching every other legal page.
// ============================================================================

'use client';

import React from 'react';
import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* ====================================================================
          PAGE HEADER
      ==================================================================== */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Disclaimer
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

          {/* ==================================================================
              IMPORTANT NOTICE — was yellow, now the same plain neutral box
              used for clause callouts elsewhere.
          ================================================================== */}
          <section className="rounded-lg border border-gray-300 bg-gray-50 p-6 md:p-8">
            <h2 className="mb-3 text-xl font-semibold text-[#002855] md:text-2xl">
              Before You Read Any Further
            </h2>
            <P>
              Please read this Disclaimer carefully before using the
              website or engaging the services of Sarsen Strategy
              Partners. This Disclaimer explains the nature and limitations
              of the information, recommendations, strategies, case
              studies, frameworks, and other materials made available by
              Sarsen Strategy Partners.
            </P>
          </section>

          <Section title="The Short Version" prominent>
            <P>
              The information, recommendations, strategies, analyses,
              frameworks, materials, and other content provided by Sarsen
              Strategy Partners collectively referred to as &quot;Content&quot; are
              provided for informational, strategic, and educational purposes.
            </P>
            <P>
              The Content is not intended to constitute, and should not be
              construed as, legal, financial, tax, accounting, investment, or
              other regulated professional advice.
            </P>
            <P>
              While we make reasonable efforts to provide useful and accurate
              information, we do not represent or warrant that the Content is
              complete, accurate, current, suitable, or reliable for every
              particular purpose or circumstance.
            </P>
            <P>
              <strong>
                Your use of the website, Content, and our services, and your
                reliance on any recommendations or information provided by us,
                is undertaken at your own discretion and risk.
              </strong>
            </P>
          </Section>

          <Section title="No Promises About What Happens Next" prominent>
            <SubSection title="No Guaranteed Outcome">
              <P>
                Sarsen Strategy Partners does not guarantee any particular
                business, financial, operational, strategic, fundraising,
                revenue, growth, market-share, cost-saving, or other outcome
                from the use or implementation of our recommendations,
                strategies, analyses, or other services.
              </P>
              <P>
                Business outcomes depend on circumstances and factors that may
                be outside our control, including the Client&apos;s decisions,
                implementation, resources, timing, market conditions,
                competition, economic conditions, industry developments,
                regulatory changes, and other external circumstances.
              </P>
            </SubSection>

            <SubSection title="Projected Outcomes">
              <P>
                Any projections, estimates, scenarios, targets, forecasts, or
                potential outcomes discussed during an engagement are based on
                information and assumptions available at the relevant time.
                They are not promises, warranties, or guarantees of future
                performance.
              </P>
            </SubSection>

            <SubSection title="Past Results">
              <P>
                Past performance, previous engagements, examples, case studies,
                or other historical outcomes should not be interpreted as an
                indication or guarantee of future results for any Client.
              </P>
            </SubSection>
          </Section>

          <Section title="What This Isn't" prominent>
            <SubSection title="Legal Matters">
              <P>
                Sarsen Strategy Partners provides strategy consulting services
                and does not provide legal advice. Information relating to
                contracts, intellectual property, regulatory matters, legal
                structures, compliance, or other legal subjects is provided only
                as general business or strategic information.
              </P>
              <P>
                You should obtain advice from appropriately qualified legal
                professionals before making decisions that require legal
                analysis or advice.
              </P>
            </SubSection>

            <SubSection title="Financial and Investment Matters">
              <P>
                Sarsen Strategy Partners does not provide personalized
                investment advice or recommend specific securities or investment
                products. Discussions concerning financial planning, capital
                raising, business finance, valuation, or investment strategy are
                provided in the context of strategic business consulting and
                should not be treated as individualized investment advice.
              </P>
              <P>
                You should consult an appropriately qualified financial,
                investment, or other professional before making decisions
                requiring specialized financial or investment advice.
              </P>
            </SubSection>

            <SubSection title="Tax and Accounting Matters">
              <P>
                Sarsen Strategy Partners does not provide tax or professional
                accounting advice. Any discussion of financial metrics,
                accounting concepts, tax considerations, or related business
                matters is general in nature and should not be treated as
                professional tax or accounting advice.
              </P>
              <P>
                You should consult appropriately qualified tax and accounting
                professionals regarding matters specific to your business,
                circumstances, or jurisdiction.
              </P>
            </SubSection>
          </Section>

          <Section title="What Strategic Consulting Actually Involves">
            <P>
              Sarsen Strategy Partners provides strategic, analytical, and
              business consulting services. Our recommendations are developed
              based on the information, assumptions, objectives, constraints,
              and circumstances communicated to us or otherwise available to us
              during an engagement.
            </P>
            <P>
              The Client remains responsible for evaluating recommendations,
              making business decisions, obtaining any required specialist
              advice, and determining whether or how recommendations should be
              implemented.
            </P>
          </Section>

          <Section title="About Those Testimonials and Case Studies">
            <P>
              Testimonials, reviews, case studies, examples, references, and
              descriptions of previous work or outcomes appearing on our
              website, in proposals, presentations, or other materials reflect
              the particular circumstances of the individuals or entities
              referenced.
            </P>
            <P>
              Such material is provided for illustrative and informational
              purposes and should not be understood as representing typical,
              expected, or guaranteed results for every Client.
            </P>
            <P>
              <strong>
                Results vary according to the circumstances of each business,
                including its industry, market, resources, decisions,
                implementation, timing, and other relevant factors.
              </strong>
            </P>
          </Section>

          <Section title="When We Point You Elsewhere">
            <P>
              Our website, materials, and recommendations may contain links or
              references to third-party websites, platforms, tools, resources,
              products, or services.
            </P>
            <P>
              Such links and references are provided for convenience or
              informational purposes and do not constitute an endorsement,
              sponsorship, partnership, approval, or guarantee by Sarsen
              Strategy Partners.
            </P>
            <P>
              Sarsen Strategy Partners is not responsible for the content,
              accuracy, availability, security, privacy practices, products,
              services, transactions, or practices of third-party websites or
              services.
            </P>
            <P>
              <strong>
                You access and use third-party websites, tools, resources, and
                services at your own discretion and risk.
              </strong>
            </P>
          </Section>

          <Section title="When We're Relying on What You Tell Us">
            <P>
              Our analysis and recommendations may depend upon information,
              documents, assumptions, data, forecasts, representations, and
              other materials provided by the Client or obtained from sources
              identified during an engagement.
            </P>
            <P>
              We do not independently verify every item of information
              supplied to us. The Client is responsible for the completeness
              and accuracy of information it provides and should promptly
              identify material changes or corrections that may affect the
              engagement.
            </P>
          </Section>

          <Section title="Where Your Industry Has Its Own Rules">
            <P>
              Strategic consulting may involve businesses operating in
              industries or jurisdictions with specialized legal, regulatory,
              technical, safety, licensing, accounting, tax, or operational
              requirements.
            </P>
            <P>
              Unless expressly included within a written Statement of Work,
              our services should not be understood as a substitute for
              specialized professional or technical advice concerning such
              requirements.
            </P>
            <P>
              <strong>
                The Client remains responsible for identifying and complying
                with laws, regulations, licensing requirements, industry
                standards, and other obligations applicable to its business.
              </strong>
            </P>
          </Section>

          <Section title="About the Website Itself">
            <SubSection title="Accuracy">
              <P>
                We make reasonable efforts to maintain useful and accurate
                information on our website. However, website content may contain
                errors, omissions, outdated information, or inaccuracies.
              </P>
            </SubSection>

            <SubSection title="Availability">
              <P>
                We do not guarantee that the website or any particular feature,
                resource, or Content will always be available, uninterrupted,
                secure, timely, or error-free.
              </P>
            </SubSection>

            <SubSection title="Changes">
              <P>
                We may update, modify, replace, or remove website Content,
                service descriptions, pricing, resources, or other information
                from time to time. You should not rely upon outdated website
                information where more recent information is available.
              </P>
            </SubSection>
          </Section>

          <Section title="No Warranties, Stated Plainly">
            <P>
              To the fullest extent permitted by applicable law, the website,
              Content, and services are provided on an &quot;as is&quot; and
              &quot;as available&quot; basis.
            </P>
            <P>
              We do not make warranties or representations, express or
              implied, regarding the accuracy, completeness, suitability,
              availability, reliability, or fitness of the Content or services
              for any particular purpose.
            </P>
            <P>
              Nothing in this Disclaimer excludes or limits any warranty,
              right, or protection that cannot lawfully be excluded or limited
              under applicable law.
            </P>
          </Section>

          <Section title="Where the Line Is Drawn" prominent>
            <P>
              The limitation of liability applicable to paid consulting
              engagements is governed by the Terms &amp; Conditions and any
              applicable Statement of Work.
            </P>
            <P>
              To the fullest extent permitted by applicable law, Sarsen
              Strategy Partners shall not be responsible for indirect,
              incidental, special, consequential, punitive, or similar losses,
              including loss of profits, revenue, data, business opportunities,
              or business interruption arising from the use of our website,
              Content, recommendations, or services.
            </P>
            <P>
              The specific liability limitations, exclusions, and applicable
              cap are set out in the Terms &amp; Conditions and form part of
              the contractual framework governing paid engagements.
            </P>
          </Section>

          <Section title="The Decisions Are Still Yours">
            <P>
              Strategic recommendations are intended to support business
              decision-making. They do not transfer responsibility for business
              decisions from the Client to Sarsen Strategy Partners.
            </P>
            <P>
              The Client is responsible for determining whether a
              recommendation is appropriate for its circumstances and for the
              consequences of decisions it makes and actions it takes,
              including the implementation of recommendations.
            </P>
          </Section>

          <Section title="What Actually Creates an Engagement">
            <P>
              General information made available through our website, blog,
              social media, public resources, or other general communications
              does not by itself create a consulting engagement.
            </P>
            <P>
              The rights and obligations applicable to a paid consulting
              engagement are established through the applicable contractual
              documents, including the Terms &amp; Conditions and, where
              applicable, a Statement of Work.
            </P>
          </Section>

          <Section title="When We Mention Other Names">
            <P>
              References to organizations, companies, brands, individuals,
              products, platforms, or other third parties may appear on our
              website or in our materials for illustrative, educational,
              analytical, or informational purposes.
            </P>
            <P>
              Unless expressly stated otherwise, such references should not be
              interpreted as an endorsement, sponsorship, partnership,
              affiliation, or other formal association with Sarsen Strategy
              Partners.
            </P>
          </Section>

          <Section title="This Is Not Fixed in Stone">
            <P>
              We may update this Disclaimer from time to time. Any revised
              version will be published on this page with an updated
              &quot;Last Updated&quot; date. The revised Disclaimer will apply
              prospectively to website use and to matters to the extent
              permitted by applicable law and any existing contractual
              arrangements.
            </P>
          </Section>

          <Section title="How This Fits With Our Other Policies">
            <P>
              This Disclaimer forms part of the broader legal framework
              governing the website and, where applicable, the services of
              Sarsen Strategy Partners. Other applicable documents may include
              our{' '}
              <Link
                href="/terms-of-use"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Terms of Use
              </Link>
              ,{' '}
              <Link
                href="/privacy-policy"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Privacy Policy
              </Link>
              , and{' '}
              <Link
                href="/refund-cancellation-policy"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Refund &amp; Cancellation Policy
              </Link>
              .
            </P>
            <P>
              These documents address different subject matters. In the event
              of a conflict, the document or contractual provision specifically
              governing the subject matter in question will prevail to the
              extent applicable. For example, refund and cancellation matters
              are governed by the applicable Refund &amp; Cancellation Policy
              and contractual terms.
            </P>
          </Section>

          <Section title="If Something Feels Off">
            <P>
              If you have a question, concern, or believe that information on
              our website or in our materials may be inaccurate or may create
              a misunderstanding, we encourage you to contact the Sarsen team
              directly and give us an opportunity to review and address the
              matter where permitted by applicable law.
            </P>
            <P>
              Please contact us by email with sufficient information for us to
              understand the concern. Depending on the nature, seriousness,
              complexity, and volume of matters being handled, a response may
              take from a few hours up to 45 days.
            </P>
            <P>
              Nothing in this section is intended to restrict any right or
              remedy that cannot lawfully be restricted, including any right to
              approach a competent authority where applicable.
            </P>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <p className="mb-2 font-medium text-gray-800">
                Sarsen Strategy Partners
              </p>
              <p className="text-gray-600">
                Email:{' '}
                <a
                  href="mailto:contact@sarsenpartners.com"
                  className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
                >
                  contact@sarsenpartners.com
                </a>
              </p>
            </div>
          </Section>

          {/* ==================================================================
              FINAL ACKNOWLEDGMENT — was red, now the same navy acknowledgment
              box style used to close every other legal page.
          ================================================================== */}
          <section className="rounded-lg border border-[#002855]/15 bg-[#002855]/[0.03] p-6 md:p-8">
            <h2 className="mb-3 text-xl font-semibold text-[#002855] md:text-2xl">
              One Last Thing
            </h2>

            <P>
              <strong>
                By using our website or engaging our services, you acknowledge
                that:
              </strong>
            </P>

            <List>
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
            </List>
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
// SECTION COMPONENT — identical pattern to the other legal pages. Every
// heading is font-semibold; hierarchy is size-driven via the `prominent` prop.
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
// SUB-SECTION COMPONENT — one tier down from Section, matching the Refund
// & Cancellation page's pattern.
// ============================================================================
function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-[#002855]">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ============================================================================
// PARAGRAPH — justified, tight leading, matching every other legal page.
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