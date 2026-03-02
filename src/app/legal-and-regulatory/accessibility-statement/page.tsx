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
          <h1 className="text-4xl md:text-5xl font-light mb-4">Accessibility Statement</h1>
          <p className="text-xl text-blue-100">
            Last Updated: February 10, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
          
          {/* Our Commitment */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">1. Our Commitment to Accessibility</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sarsen Strategy Partners is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure our website and services are accessible to all users.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe that everyone, regardless of ability or technology, should be able to access our strategic consulting services, resources, and information. Accessibility is an ongoing effort, and we are dedicated to making our digital presence inclusive and user-friendly.
            </p>
          </section>

          {/* Standards and Guidelines */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">2. Accessibility Standards</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website strives to conform to the following accessibility standards:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>WCAG 2.1 (Web Content Accessibility Guidelines):</strong> We aim to meet Level AA conformance with WCAG 2.1, an internationally recognized standard for web accessibility</li>
              <li><strong>Section 508:</strong> We work toward compliance with Section 508 of the U.S. Rehabilitation Act</li>
              <li><strong>Rights of Persons with Disabilities Act, 2016 (India):</strong> We align with accessibility principles outlined in Indian disability rights legislation</li>
              <li><strong>Best Practices:</strong> We follow modern web development best practices for accessible design and user experience</li>
            </ul>
          </section>

          {/* Accessibility Features */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">3. Accessibility Features</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website includes the following accessibility features:
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Visual Accessibility</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Color Contrast:</strong> Sufficient color contrast between text and backgrounds to ensure readability</li>
              <li><strong>Resizable Text:</strong> Text can be resized up to 200% without loss of content or functionality</li>
              <li><strong>Clear Typography:</strong> Readable fonts with appropriate sizing and spacing</li>
              <li><strong>Visual Indicators:</strong> Clear visual focus indicators for keyboard navigation</li>
              <li><strong>Alternative Text:</strong> Descriptive alt text for images and graphics</li>
              <li><strong>Non-Color Identification:</strong> Information is not conveyed by color alone</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Keyboard Navigation</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Full Keyboard Access:</strong> All website functions are accessible via keyboard</li>
              <li><strong>Logical Tab Order:</strong> Content follows a logical reading and navigation sequence</li>
              <li><strong>Skip Navigation Links:</strong> Quick access to main content areas</li>
              <li><strong>Focus Visibility:</strong> Clear visual indication of keyboard focus position</li>
              <li><strong>No Keyboard Traps:</strong> Users can navigate away from all interactive elements using only the keyboard</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Screen Reader Compatibility</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Semantic HTML:</strong> Proper HTML structure and semantic elements for screen reader interpretation</li>
              <li><strong>ARIA Labels:</strong> Appropriate ARIA (Accessible Rich Internet Applications) labels and roles</li>
              <li><strong>Heading Structure:</strong> Logical heading hierarchy for easy navigation</li>
              <li><strong>Descriptive Links:</strong> Link text clearly describes destination or purpose</li>
              <li><strong>Form Labels:</strong> All form fields have associated labels</li>
              <li><strong>Error Identification:</strong> Clear error messages and instructions for form submissions</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.4 Content and Media</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Plain Language:</strong> Content written in clear, straightforward language</li>
              <li><strong>Organized Structure:</strong> Content organized with clear headings and lists</li>
              <li><strong>Responsive Design:</strong> Website adapts to different screen sizes and devices</li>
              <li><strong>Video Captions:</strong> Captions or transcripts provided for video content (where applicable)</li>
              <li><strong>Audio Alternatives:</strong> Text alternatives for audio-only content</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.5 Interactive Elements</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Accessible Forms:</strong> Forms designed with clear labels, instructions, and error handling</li>
              <li><strong>Clickable Areas:</strong> Adequate size for clickable elements (minimum 44x44 pixels)</li>
              <li><strong>Timeout Warnings:</strong> Users are warned before session timeouts with option to extend</li>
              <li><strong>No Auto-Play:</strong> Media does not auto-play with sound</li>
              <li><strong>Pause/Stop Controls:</strong> Controls provided for moving, blinking, or auto-updating content</li>
            </ul>
          </section>

          {/* Assistive Technologies */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">4. Compatible Assistive Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Screen Readers</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>JAWS (Job Access With Speech)</li>
              <li>NVDA (NonVisual Desktop Access)</li>
              <li>VoiceOver (macOS and iOS)</li>
              <li>TalkBack (Android)</li>
              <li>Narrator (Windows)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Browser and Platform Support</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Latest versions of Chrome, Firefox, Safari, and Edge</li>
              <li>Windows, macOS, iOS, and Android operating systems</li>
              <li>Desktop, tablet, and mobile devices</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Additional Tools</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Alternative input devices</li>
              <li>Browser accessibility extensions and plugins</li>
            </ul>
          </section>

          {/* Known Limitations */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">5. Known Limitations</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Despite our best efforts, some limitations may exist:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Third-Party Content:</strong> Some third-party embedded content (such as videos, maps, or widgets) may not be fully accessible. We are working with providers to improve accessibility.</li>
              <li><strong>PDF Documents:</strong> Some legacy PDF documents may not be fully accessible. We are in the process of remediating these documents or providing accessible alternatives.</li>
              <li><strong>Historical Content:</strong> Older content may not meet current accessibility standards. We are progressively updating this content.</li>
              <li><strong>Complex Interactive Features:</strong> Some advanced interactive features may have accessibility limitations. We are actively working to improve these.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              If you encounter accessibility barriers with any of our content, please contact us so we can provide an alternative or work toward a solution.
            </p>
          </section>

          {/* Ongoing Efforts */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">6. Ongoing Accessibility Efforts</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are continuously working to enhance the accessibility of our website through:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Regular Audits:</strong> Conducting periodic accessibility audits and testing</li>
              <li><strong>User Testing:</strong> Testing with users who rely on assistive technologies</li>
              <li><strong>Team Training:</strong> Training our development and content teams on accessibility best practices</li>
              <li><strong>Code Reviews:</strong> Incorporating accessibility checks into our development workflow</li>
              <li><strong>Automated Testing:</strong> Using automated tools to identify and fix accessibility issues</li>
              <li><strong>Continuous Improvement:</strong> Regularly updating content and features to meet evolving accessibility standards</li>
            </ul>
          </section>

          {/* Alternative Access */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">7. Alternative Access to Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you experience difficulty accessing any content or using any features on our website, we offer alternative ways to access our services:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Phone Support:</strong> Contact us at +91 [Your Phone Number] for assistance</li>
              <li><strong>Email Support:</strong> Email accessibility@sarsenstrategy.com with your needs</li>
              <li><strong>Video Consultations:</strong> Schedule accessible video consultations via phone or email</li>
              <li><strong>Alternative Formats:</strong> Request documents in alternative formats (large print, audio, braille, etc.)</li>
              <li><strong>Personalized Assistance:</strong> Work with our team to find accessible solutions for your specific needs</li>
            </ul>
          </section>

          {/* Feedback and Reporting */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">8. Feedback and Accessibility Issues</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We welcome your feedback on the accessibility of our website and services. If you encounter accessibility barriers, please let us know:
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">8.1 How to Report Issues</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              When reporting accessibility issues, please provide:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>The specific page or feature where you encountered the issue</li>
              <li>A description of the problem and how it affects your access</li>
              <li>The assistive technology you are using (if applicable)</li>
              <li>Your browser and operating system information</li>
              <li>Any suggestions for improvement</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">8.2 Response Timeline</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are committed to addressing accessibility issues promptly:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Acknowledgment:</strong> Within 2 business days of receiving your report</li>
              <li><strong>Assessment:</strong> Within 5 business days, we will assess the issue and provide an estimated timeline</li>
              <li><strong>Resolution:</strong> Critical issues will be prioritized and addressed as quickly as possible. Complex issues may take longer, but we will keep you informed of progress.</li>
            </ul>
          </section>

          {/* Legal Compliance */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">9. Legal and Regulatory Compliance</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sarsen Strategy Partners complies with applicable accessibility laws and regulations, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>The Rights of Persons with Disabilities Act, 2016 (India)</li>
              <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
              <li>Section 508 of the Rehabilitation Act (for U.S. clients)</li>
              <li>EN 301 549 (European accessibility standard, for EU clients)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              We recognize that accessibility is not just a legal requirement but a moral imperative and business opportunity. We are committed to going beyond minimum compliance to create truly inclusive digital experiences.
            </p>
          </section>

          {/* Third-Party Content */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">10. Third-Party Services and Content</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website may integrate third-party services such as:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Payment processors</li>
              <li>Video hosting platforms</li>
              <li>Calendar and scheduling tools</li>
              <li>Analytics and tracking services</li>
              <li>Social media platforms</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              While we strive to select accessible third-party services, we cannot control their accessibility features. If you experience issues with third-party content, please contact us, and we will work with you to find an accessible alternative or solution.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">11. Contact Our Accessibility Team</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For accessibility-related questions, feedback, or to request assistance:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-4">Accessibility Coordinator</p>
              <p className="text-gray-600 mb-2"><strong>Email:</strong> accessibility@sarsenstrategy.com</p>
              <p className="text-gray-600 mb-2"><strong>Phone:</strong> +91 [Your Phone Number]</p>
              <p className="text-gray-600 mb-2"><strong>Address:</strong> [Your Business Address]</p>
              <p className="text-gray-600 mt-4 text-sm">
                <strong>Response Time:</strong> We aim to respond to accessibility inquiries within 2 business days
              </p>
            </div>
          </section>

          {/* Updates to Statement */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">12. Updates to This Statement</h2>
            <p className="text-gray-600 leading-relaxed">
              This Accessibility Statement was last updated on February 10, 2025. We review and update this statement regularly to reflect our ongoing accessibility improvements and changes to applicable standards. Please check back periodically for updates.
            </p>
          </section>

          {/* Formal Complaints */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">13. Formal Complaints Process</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you are not satisfied with our response to an accessibility issue:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-3 ml-4 mb-4">
              <li className="leading-relaxed">
                <strong>Internal Escalation:</strong> Request escalation to our senior management team
              </li>
              <li className="leading-relaxed">
                <strong>Written Complaint:</strong> Submit a formal written complaint detailing the issue and resolution sought
              </li>
              <li className="leading-relaxed">
                <strong>External Resources:</strong> You may also contact relevant accessibility advocacy organizations or regulatory bodies in your jurisdiction
              </li>
            </ol>
            <p className="text-gray-600 leading-relaxed">
              We are committed to working constructively with you to resolve any accessibility concerns.
            </p>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-medium text-gray-800 mb-3">Our Commitment</h2>
            <p className="text-gray-600 leading-relaxed">
              Sarsen Strategy Partners is committed to ensuring equal access to our services for all individuals. Accessibility is an ongoing journey, not a destination. We are dedicated to continuous improvement and welcome your partnership in making our digital presence truly inclusive.
            </p>
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