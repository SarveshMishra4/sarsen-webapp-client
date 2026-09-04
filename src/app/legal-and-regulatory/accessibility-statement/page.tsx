// app/accessibility-statement/page.tsx
//
// ============================================================================
// LAYOUT NOTES (same system as Terms of Use / Privacy Choices / Refund /
// Disclaimer):
// - Container matches Header.tsx / Footer.tsx: max-w-[1400px] + px-4 md:px-8.
// - Navy gradient header banner, full-bleed background, content constrained
//   to the shared container.
// - White card wrapper (bg-white rounded-xl shadow-sm border p-8 md:p-12)
//   removed — sections sit directly on the page.
// - Blue "Our Commitment" closing box recolored to the same navy
//   acknowledgment box used to close every other legal page. No new accent
//   colors introduced.
// - Numbered section headings (1. Company Identification, 2. Our Commitment
//   to Accessibility, ...) reworked into the same conversational/abstract
//   heading style used across the other legal pages; no legal wording inside
//   any paragraph or list was rewritten, trimmed, or added.
// - Blue links (text-blue-600) swapped for the site's navy palette
//   (#002855 / hover #0A1E3D), matching every other legal page.
// - Numbered sub-headings (4.1–4.5, 9.1–9.2) became SubSection components,
//   same pattern as the Refund and Disclaimer pages.
// ============================================================================

'use client';

import React from 'react';
import Link from 'next/link';

export default function AccessibilityStatementPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* ====================================================================
          PAGE HEADER
      ==================================================================== */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Accessibility Statement
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

          <Section title="Who This Statement Covers">
            <P>
              This Accessibility Statement is issued by Sarsen Strategy Partners
              “Sarsen”, “we”, “us”, or “our”.
            </P>
            <P>
              This statement addresses accessibility of our website and digital
              content. It should be read together with our other applicable
              website policies, including our Terms of Use, Privacy Policy,
              Refund & Cancellation Policy, Cookie Policy, and Disclaimer.
            </P>
            <P>
              Where there is any inconsistency between this statement and a
              specific contractual agreement or Statement of Work, the applicable
              contractual terms will govern to the extent permitted by law.
            </P>
          </Section>

          <Section title="Why This Matters to Us" prominent>
            <P>
              Sarsen is committed to making its website and digital presence
              usable and accessible to as many people as reasonably possible,
              including people who use assistive technologies.
            </P>
            <P>
              Accessibility is an ongoing effort. We seek to improve the
              usability, clarity, navigation, and accessibility of our digital
              content as our website, technology, and content develop.
            </P>
            <P>
              We recognize that accessibility may be affected by technological
              limitations, third-party services, external content, browser or
              device configurations, and other factors outside our reasonable
              control. Accordingly, we do not represent that every page,
              feature, document, or third-party component will be accessible in
              every circumstance.
            </P>
          </Section>

          <Section title="The Standards We Look To" prominent>
            <P>
              In developing and improving our website, we seek to apply
              recognized accessibility principles and modern web development
              practices where reasonably feasible.
            </P>

            <List>
              <li>
                <strong>WCAG:</strong> We use the Web Content Accessibility
                Guidelines or WCAG as a reference point for accessibility
                improvements and aim, where reasonably feasible, to work toward
                WCAG 2.1 Level AA principles.
              </li>
              <li>
                <strong>Indian Accessibility Principles:</strong> We seek to
                take accessibility principles under applicable Indian
                legislation and standards into account where relevant.
              </li>
              <li>
                <strong>International Accessibility Practices:</strong> Where
                services are provided to clients in other jurisdictions, we may
                consider relevant accessibility principles applicable to those
                digital services.
              </li>
              <li>
                <strong>Best Practices:</strong> We seek to incorporate
                generally recognized accessible design and development practices
                into the continued development of our website.
              </li>
            </List>

            <P>
              These references describe our accessibility objectives and
              development approach. They should not be interpreted as a
              representation that the website currently or continuously
              conforms in full to any particular accessibility standard.
            </P>
          </Section>

          <Section title="What We Actually Build In" prominent>
            <P>
              Depending on the page, feature, and content involved, our
              accessibility efforts may include the following considerations:
            </P>

            <SubSection title="Visual Accessibility">
              <List>
                <li>Clear and readable typography and spacing.</li>
                <li>Consideration of text and background contrast.</li>
                <li>
                  Use of visual indicators in addition to color where reasonably
                  feasible.
                </li>
                <li>
                  Appropriate alternative text for relevant images and graphics
                  where applicable.
                </li>
                <li>
                  Responsive layouts intended to remain usable across different
                  screen sizes.
                </li>
              </List>
            </SubSection>

            <SubSection title="Keyboard and Navigation">
              <List>
                <li>Logical navigation and content structure.</li>
                <li>Keyboard accessibility for applicable interactive elements.</li>
                <li>Visible focus indicators where supported by the interface.</li>
                <li>Avoidance of unnecessary keyboard traps.</li>
              </List>
            </SubSection>

            <SubSection title="Screen Reader and Assistive Technology Considerations">
              <List>
                <li>Use of semantic HTML where reasonably appropriate.</li>
                <li>Logical heading structures.</li>
                <li>Descriptive link and control labels where applicable.</li>
                <li>Appropriate form labels and instructions.</li>
                <li>
                  Accessibility considerations for dynamic or interactive
                  components.
                </li>
              </List>
            </SubSection>

            <SubSection title="Content and Media">
              <List>
                <li>Clear organization using headings, paragraphs, and lists.</li>
                <li>Plain and understandable language where appropriate.</li>
                <li>Responsive presentation across supported devices.</li>
                <li>
                  Captions, transcripts, or text alternatives for applicable
                  media where reasonably feasible.
                </li>
              </List>
            </SubSection>

            <SubSection title="Forms and Interactive Elements">
              <List>
                <li>Clear labels and instructions for applicable forms.</li>
                <li>
                  Identification of relevant input or validation errors where
                  reasonably feasible.
                </li>
                <li>
                  Interactive controls designed with usability and accessibility
                  in mind.
                </li>
                <li>
                  Avoidance of unnecessary automatic movement or interaction
                  where reasonably feasible.
                </li>
              </List>
            </SubSection>
          </Section>

          <Section title="Devices and Tools We Aim to Support">
            <P>
              Our website is intended to function across commonly used modern
              browsers, devices, and assistive technologies. Actual
              compatibility may vary depending on the specific browser,
              operating system, assistive technology, website feature, and
              version being used.
            </P>
            <P>
              Examples of assistive technologies that users may employ to access
              web content include:
            </P>
            <List>
              <li>Screen readers</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Alternative input devices</li>
              <li>Browser accessibility features and extensions</li>
            </List>
            <P>
              We do not guarantee compatibility with every assistive technology,
              browser, operating system, or device configuration.
            </P>
          </Section>

          <Section title="Where We May Still Fall Short">
            <P>
              Accessibility limitations may arise from the nature of particular
              content or technology. These may include:
            </P>
            <List>
              <li>
                <strong>Third-Party Content:</strong> Embedded or linked
                third-party content may not fully support accessibility
                requirements and may be outside our direct control.
              </li>
              <li>
                <strong>Documents:</strong> Certain documents or historical
                materials may require additional accessibility work or may not
                be optimized for every assistive technology.
              </li>
              <li>
                <strong>Historical Content:</strong> Older content may not
                reflect the accessibility practices applied to newer content.
              </li>
              <li>
                <strong>Interactive Features:</strong> Certain complex or
                dynamically generated features may present accessibility
                limitations depending on the user's technology or configuration.
              </li>
            </List>
            <P>
              Where we become aware of an accessibility barrier, we will
              consider reasonable ways to address the issue or provide an
              alternative means of accessing the relevant information or
              service, where reasonably feasible.
            </P>
          </Section>

          <Section title="Where We Go From Here">
            <P>
              Accessibility is an ongoing process rather than a one-time
              exercise. Our efforts may include:
            </P>
            <List>
              <li>
                Reviewing website usability and accessibility issues as they are
                identified.
              </li>
              <li>
                Improving website structure, navigation, and content where
                appropriate.
              </li>
              <li>
                Incorporating accessibility considerations into website
                development and content updates.
              </li>
              <li>
                Using available development and testing tools to identify
                potential accessibility issues.
              </li>
              <li>
                Considering user feedback when prioritizing accessibility
                improvements.
              </li>
              <li>
                Updating accessibility practices as technology and recognized
                standards evolve.
              </li>
            </List>
          </Section>

          <Section title="If Something Isn't Working for You">
            <P>
              If you experience difficulty accessing information, content, or a
              service through our website, please contact the Sarsen team at{' '}
              <a
                href="mailto:contact@sarsenpartners.com"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                contact@sarsenpartners.com
              </a>
              .
            </P>
            <P>
              Depending on the nature of the request, we may consider reasonable
              alternative means of providing access to information or
              facilitating communication, such as:
            </P>
            <List>
              <li>
                Providing information through an alternative communication
                method.
              </li>
              <li>Providing an alternative format where reasonably feasible.</li>
              <li>Assisting with access to relevant information or services.</li>
              <li>
                Working with the user to identify a practical alternative where
                a particular digital feature presents a barrier.
              </li>
            </List>
            <P>
              The availability of a particular alternative may depend on the
              nature of the request, the relevant content or service, and
              technical feasibility.
            </P>
          </Section>

          <Section title="Telling Us When Something's Broken" prominent>
            <P>
              We welcome feedback regarding the accessibility and usability of
              our website and digital services. If you encounter an accessibility
              barrier, we encourage you to contact us directly so that we have
              an opportunity to understand and address the issue.
            </P>

            <SubSection title="How to Report an Issue">
              <P>Where possible, please include information such as:</P>
              <List>
                <li>The page, document, or feature where the issue occurred.</li>
                <li>A description of the accessibility barrier.</li>
                <li>
                  The effect the issue had on your ability to access the content
                  or service.
                </li>
                <li>
                  The assistive technology, browser, or device being used, if
                  relevant.
                </li>
                <li>
                  Any alternative access method or solution that may be helpful.
                </li>
              </List>
            </SubSection>

            <SubSection title="Response and Review">
              <P>
                Accessibility concerns are reviewed according to their nature,
                seriousness, complexity, and the circumstances involved. Some
                matters may be addressed quickly, while others may require
                additional investigation or technical work.
              </P>
              <P>
                Depending on the nature and seriousness of the concern, responses
                may take up to 45 days. Where a matter requires more substantial
                investigation or coordination, the time required may depend on the
                circumstances and third-party dependencies involved.
              </P>
            </SubSection>
          </Section>

          <Section title="Where the Law Comes In">
            <P>
              Accessibility requirements may vary depending on the jurisdiction,
              nature of the service, type of content, and circumstances in which
              a service is provided.
            </P>
            <P>
              We seek to take applicable accessibility principles and legal
              requirements into account where relevant. However, this statement
              is not intended to represent that Sarsen has obtained any
              accessibility certification or that its website has been
              independently certified as compliant with a particular
              accessibility standard.
            </P>
            <P>
              Nothing in this statement limits any rights that cannot lawfully be
              waived or excluded under applicable law.
            </P>
          </Section>

          <Section title="When Other Platforms Are Involved">
            <P>
              Our website may use or link to third-party services and content,
              which may include payment services, video or media services,
              scheduling tools, analytics technologies, social media services,
              or other external platforms.
            </P>
            <P>
              Third-party services are operated by their respective providers
              and may have their own accessibility features, limitations, and
              policies. Sarsen does not control the accessibility of third-party
              platforms.
            </P>
            <P>
              If a third-party component creates an accessibility barrier,
              please let us know. Where reasonably feasible, we will consider
              whether an alternative method of accessing the relevant information
              or service can be provided.
            </P>
          </Section>

          <Section title="Reaching Us">
            <P>
              For accessibility-related questions, feedback, requests for
              assistance, or reports of accessibility barriers, please contact
              the Sarsen team by email:
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
              <p className="mt-4 text-sm text-gray-500">
                Please provide sufficient information for the team to understand
                the accessibility concern and, where relevant, the page,
                feature, document, device, browser, or assistive technology
                involved.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Depending on the nature, seriousness, complexity, and volume of
                concerns being handled, a response may take up to 45 days.
              </p>
            </div>
          </Section>

          <Section title="This Is Not Fixed in Stone">
            <P>
              This Accessibility Statement was last updated on September 3,
              2026. We may update this statement from time to time to reflect
              changes to our website, digital services, accessibility practices,
              or applicable requirements. The updated version will be published
              on this page with a revised effective or update date where
              appropriate.
            </P>
          </Section>

          <Section title="If a Concern Isn't Resolved">
            <P>
              We encourage users to contact the Sarsen team first when they
              encounter an accessibility concern so that we have an opportunity
              to understand the issue and, where reasonably possible, address or
              provide an alternative to it.
            </P>
            <P>
              If a concern remains unresolved, users may consider any further
              rights or remedies available to them under applicable law,
              including contacting an appropriate authority or accessibility
              organization where applicable.
            </P>
            <P>
              Nothing in this statement is intended to prevent or restrict a
              person from exercising a right that cannot lawfully be limited or
              waived.
            </P>
          </Section>

          {/* ==================================================================
              CLOSING ACKNOWLEDGMENT — was blue, now the same navy
              acknowledgment box style used to close every other legal page.
          ================================================================== */}
          <section className="rounded-lg border border-[#002855]/15 bg-[#002855]/[0.03] p-6 md:p-8">
            <h2 className="mb-3 text-xl font-semibold text-[#002855] md:text-2xl">
              Our Commitment
            </h2>
            <P>
              Sarsen Strategy Partners is committed to continuing its efforts to
              improve the accessibility and usability of its digital presence.
              We welcome feedback from users and encourage anyone experiencing
              an accessibility barrier to contact us so that the concern can be
              reviewed and, where reasonably feasible, addressed.
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
// & Disclaimer pages' pattern.
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