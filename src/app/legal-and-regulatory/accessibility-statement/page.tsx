// app/accessibility-statement/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function AccessibilityStatementPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">
            Accessibility Statement
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
              This Accessibility Statement is issued by Sarsen Strategy Partners
              (“Sarsen”, “we”, “us”, or “our”).
            </p>

            <p className="text-gray-600 mb-4">
              This statement addresses accessibility of our website and digital
              content. It should be read together with our other applicable
              website policies, including our Terms of Use, Privacy Policy,
              Refund & Cancellation Policy, Cookie Policy, and Disclaimer.
            </p>

            <p className="text-gray-600">
              Where there is any inconsistency between this statement and a
              specific contractual agreement or Statement of Work, the applicable
              contractual terms will govern to the extent permitted by law.
            </p>
          </section>

          {/* Commitment */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              2. Our Commitment to Accessibility
            </h2>

            <p className="text-gray-600 mb-4">
              Sarsen is committed to making its website and digital presence
              usable and accessible to as many people as reasonably possible,
              including people who use assistive technologies.
            </p>

            <p className="text-gray-600 mb-4">
              Accessibility is an ongoing effort. We seek to improve the
              usability, clarity, navigation, and accessibility of our digital
              content as our website, technology, and content develop.
            </p>

            <p className="text-gray-600">
              We recognize that accessibility may be affected by technological
              limitations, third-party services, external content, browser or
              device configurations, and other factors outside our reasonable
              control. Accordingly, we do not represent that every page,
              feature, document, or third-party component will be accessible in
              every circumstance.
            </p>
          </section>

          {/* Accessibility Standards */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              3. Accessibility Standards and Guidelines
            </h2>

            <p className="text-gray-600 mb-4">
              In developing and improving our website, we seek to apply
              recognized accessibility principles and modern web development
              practices where reasonably feasible.
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                <strong>WCAG:</strong> We use the Web Content Accessibility
                Guidelines (WCAG) as a reference point for accessibility
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
            </ul>

            <p className="text-gray-600">
              These references describe our accessibility objectives and
              development approach. They should not be interpreted as a
              representation that the website currently or continuously
              conforms in full to any particular accessibility standard.
            </p>
          </section>

          {/* Accessibility Features */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              4. Accessibility Features and Design Considerations
            </h2>

            <p className="text-gray-600 mb-4">
              Depending on the page, feature, and content involved, our
              accessibility efforts may include the following considerations:
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              4.1 Visual Accessibility
            </h3>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                Clear and readable typography and spacing.
              </li>
              <li>
                Consideration of text and background contrast.
              </li>
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
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              4.2 Keyboard and Navigation
            </h3>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                Logical navigation and content structure.
              </li>
              <li>
                Keyboard accessibility for applicable interactive elements.
              </li>
              <li>
                Visible focus indicators where supported by the interface.
              </li>
              <li>
                Avoidance of unnecessary keyboard traps.
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              4.3 Screen Reader and Assistive Technology Considerations
            </h3>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                Use of semantic HTML where reasonably appropriate.
              </li>
              <li>
                Logical heading structures.
              </li>
              <li>
                Descriptive link and control labels where applicable.
              </li>
              <li>
                Appropriate form labels and instructions.
              </li>
              <li>
                Accessibility considerations for dynamic or interactive
                components.
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              4.4 Content and Media
            </h3>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                Clear organization using headings, paragraphs, and lists.
              </li>
              <li>
                Plain and understandable language where appropriate.
              </li>
              <li>
                Responsive presentation across supported devices.
              </li>
              <li>
                Captions, transcripts, or text alternatives for applicable
                media where reasonably feasible.
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              4.5 Forms and Interactive Elements
            </h3>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                Clear labels and instructions for applicable forms.
              </li>
              <li>
                Identification of relevant input or validation errors where
                reasonably feasible.
              </li>
              <li>
                Interactive controls designed with usability and accessibility
                in mind.
              </li>
              <li>
                Avoidance of unnecessary automatic movement or interaction where
                reasonably feasible.
              </li>
            </ul>
          </section>

          {/* Assistive Technologies */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              5. Assistive Technologies and Platforms
            </h2>

            <p className="text-gray-600 mb-4">
              Our website is intended to function across commonly used modern
              browsers, devices, and assistive technologies. Actual
              compatibility may vary depending on the specific browser,
              operating system, assistive technology, website feature, and
              version being used.
            </p>

            <p className="text-gray-600 mb-4">
              Examples of assistive technologies that users may employ to access
              web content include:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Screen readers</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Alternative input devices</li>
              <li>Browser accessibility features and extensions</li>
            </ul>

            <p className="text-gray-600">
              We do not guarantee compatibility with every assistive technology,
              browser, operating system, or device configuration.
            </p>
          </section>

          {/* Known Limitations */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              6. Known and Potential Limitations
            </h2>

            <p className="text-gray-600 mb-4">
              Accessibility limitations may arise from the nature of particular
              content or technology. These may include:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
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
            </ul>

            <p className="text-gray-600">
              Where we become aware of an accessibility barrier, we will
              consider reasonable ways to address the issue or provide an
              alternative means of accessing the relevant information or
              service, where reasonably feasible.
            </p>
          </section>

          {/* Ongoing Efforts */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              7. Ongoing Accessibility Efforts
            </h2>

            <p className="text-gray-600 mb-4">
              Accessibility is an ongoing process rather than a one-time
              exercise. Our efforts may include:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
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
            </ul>
          </section>

          {/* Alternative Access */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              8. Alternative Access to Services
            </h2>

            <p className="text-gray-600 mb-4">
              If you experience difficulty accessing information, content, or a
              service through our website, please contact the Sarsen team at
              <a
                href="mailto:contact@sarsenpartners.com"
                className="text-blue-600 hover:text-blue-700 ml-1"
              >
                contact@sarsenpartners.com
              </a>.
            </p>

            <p className="text-gray-600 mb-4">
              Depending on the nature of the request, we may consider reasonable
              alternative means of providing access to information or
              facilitating communication, such as:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                Providing information through an alternative communication
                method.
              </li>
              <li>
                Providing an alternative format where reasonably feasible.
              </li>
              <li>
                Assisting with access to relevant information or services.
              </li>
              <li>
                Working with the user to identify a practical alternative where
                a particular digital feature presents a barrier.
              </li>
            </ul>

            <p className="text-gray-600">
              The availability of a particular alternative may depend on the
              nature of the request, the relevant content or service, and
              technical feasibility.
            </p>
          </section>

          {/* Feedback */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              9. Feedback and Accessibility Issues
            </h2>

            <p className="text-gray-600 mb-4">
              We welcome feedback regarding the accessibility and usability of
              our website and digital services. If you encounter an accessibility
              barrier, we encourage you to contact us directly so that we have
              an opportunity to understand and address the issue.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              9.1 How to Report an Issue
            </h3>

            <p className="text-gray-600 mb-4">
              Where possible, please include information such as:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>
                The page, document, or feature where the issue occurred.
              </li>
              <li>
                A description of the accessibility barrier.
              </li>
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
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">
              9.2 Response and Review
            </h3>

            <p className="text-gray-600 mb-4">
              Accessibility concerns are reviewed according to their nature,
              seriousness, complexity, and the circumstances involved. Some
              matters may be addressed quickly, while others may require
              additional investigation or technical work.
            </p>

            <p className="text-gray-600">
              Depending on the nature and seriousness of the concern, responses
              may take up to 45 days. Where a matter requires more substantial
              investigation or coordination, the time required may depend on the
              circumstances and third-party dependencies involved.
            </p>
          </section>

          {/* Legal and Regulatory Context */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              10. Accessibility and Applicable Requirements
            </h2>

            <p className="text-gray-600 mb-4">
              Accessibility requirements may vary depending on the jurisdiction,
              nature of the service, type of content, and circumstances in which
              a service is provided.
            </p>

            <p className="text-gray-600 mb-4">
              We seek to take applicable accessibility principles and legal
              requirements into account where relevant. However, this statement
              is not intended to represent that Sarsen has obtained any
              accessibility certification or that its website has been
              independently certified as compliant with a particular
              accessibility standard.
            </p>

            <p className="text-gray-600">
              Nothing in this statement limits any rights that cannot lawfully be
              waived or excluded under applicable law.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              11. Third-Party Services and Content
            </h2>

            <p className="text-gray-600 mb-4">
              Our website may use or link to third-party services and content,
              which may include payment services, video or media services,
              scheduling tools, analytics technologies, social media services,
              or other external platforms.
            </p>

            <p className="text-gray-600 mb-4">
              Third-party services are operated by their respective providers
              and may have their own accessibility features, limitations, and
              policies. Sarsen does not control the accessibility of third-party
              platforms.
            </p>

            <p className="text-gray-600">
              If a third-party component creates an accessibility barrier,
              please let us know. Where reasonably feasible, we will consider
              whether an alternative method of accessing the relevant information
              or service can be provided.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              12. Contact the Sarsen Team
            </h2>

            <p className="text-gray-600 mb-4">
              For accessibility-related questions, feedback, requests for
              assistance, or reports of accessibility barriers, please contact
              the Sarsen team by email:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">
                Sarsen Strategy Partners
              </p>

              <p className="text-gray-600">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:contact@sarsenpartners.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  contact@sarsenpartners.com
                </a>
              </p>

              <p className="text-gray-600 mt-4 text-sm">
                Please provide sufficient information for the team to understand
                the accessibility concern and, where relevant, the page,
                feature, document, device, browser, or assistive technology
                involved.
              </p>

              <p className="text-gray-600 mt-3 text-sm">
                Depending on the nature, seriousness, complexity, and volume of
                concerns being handled, a response may take up to 45 days.
              </p>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              13. Updates to This Statement
            </h2>

            <p className="text-gray-600">
              This Accessibility Statement was last updated on September 3,
              2026. We may update this statement from time to time to reflect
              changes to our website, digital services, accessibility practices,
              or applicable requirements. The updated version will be published
              on this page with a revised effective or update date where
              appropriate.
            </p>
          </section>

          {/* Concerns and Escalation */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              14. Concerns and Further Action
            </h2>

            <p className="text-gray-600 mb-4">
              We encourage users to contact the Sarsen team first when they
              encounter an accessibility concern so that we have an opportunity
              to understand the issue and, where reasonably possible, address or
              provide an alternative to it.
            </p>

            <p className="text-gray-600 mb-4">
              If a concern remains unresolved, users may consider any further
              rights or remedies available to them under applicable law,
              including contacting an appropriate authority or accessibility
              organization where applicable.
            </p>

            <p className="text-gray-600">
              Nothing in this statement is intended to prevent or restrict a
              person from exercising a right that cannot lawfully be limited or
              waived.
            </p>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Our Commitment
            </h2>

            <p className="text-gray-600">
              Sarsen Strategy Partners is committed to continuing its efforts to
              improve the accessibility and usability of its digital presence.
              We welcome feedback from users and encourage anyone experiencing
              an accessibility barrier to contact us so that the concern can be
              reviewed and, where reasonably feasible, addressed.
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