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
          <h1 className="text-4xl md:text-5xl font-light mb-4">Terms of Use</h1>
          <p className="text-xl text-blue-100">
            Last Updated: February 10, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to Sarsen Strategy Partners ("Company," "we," "our," or "us"). These Terms of Use ("Terms") constitute a legally binding agreement between you ("Client," "you," or "your") and Sarsen Strategy Partners governing your access to and use of our website, services, and related offerings.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing our website at www.sarsenstrategy.com, purchasing our services, or engaging with us in any capacity, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy and Refund & Cancellation Policy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>If you do not agree to these Terms, you must not access or use our services.</strong>
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">2. Eligibility</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
              <li>Have the legal authority to enter into binding contracts</li>
              <li>Represent a legitimate business or organization (for business services)</li>
              <li>Provide accurate, complete, and truthful information during registration and throughout the engagement</li>
              <li>Comply with all applicable laws and regulations in your jurisdiction</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              By using our services, you represent and warrant that you meet all eligibility requirements. If you are accepting these Terms on behalf of a company or organization, you represent that you have the authority to bind that entity to these Terms.
            </p>
          </section>

          {/* Services Description */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">3. Services Description</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Consulting Services</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sarsen Strategy Partners provides strategic business consulting services to startups and early-stage businesses. Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Growth and revenue strategy development</li>
              <li>Financial planning and capital raising advisory</li>
              <li>Operations and efficiency optimization</li>
              <li>Strategic planning and market positioning</li>
              <li>Product and innovation strategy</li>
              <li>Marketing and brand development</li>
              <li>People and culture consulting</li>
              <li>Business diagnostics and assessments</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Service Packages</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We offer pre-designed service packages and custom engagements. Each package includes specific deliverables, timelines, and pricing as outlined in the service description and purchase agreement. Service details may be modified by mutual written agreement.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Diagnostic Session</h3>
            <p className="text-gray-600 leading-relaxed">
              All engagements begin with a diagnostic session—a comprehensive consultation where we assess your business, challenges, and objectives. This session is integral to our service delivery and forms the basis for our strategic recommendations.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">4. Client Responsibilities</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Information Accuracy</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Provide accurate, complete, and truthful information about your business, financials, operations, and challenges</li>
              <li>Update us promptly if any provided information changes or becomes inaccurate</li>
              <li>Respond to information requests and questionnaires in a timely manner</li>
              <li>Grant necessary access to data, systems, or personnel required for our analysis</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Cooperation and Communication</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Successful consulting engagements require active collaboration. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Participate actively in scheduled sessions, meetings, and check-ins</li>
              <li>Respond to communications within reasonable timeframes (typically 3-5 business days)</li>
              <li>Designate key personnel or decision-makers to work with our consultants</li>
              <li>Implement recommendations in good faith (while ultimate decisions remain yours)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Account Security</h3>
            <p className="text-gray-600 leading-relaxed">
              If you create an account on our platform, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized access or security breaches.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">5. Payment Terms</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Fees and Pricing</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              All fees are stated in Indian Rupees (INR) unless otherwise specified. Prices are subject to change, but changes will not affect purchases already made. Fees include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Service package fees as displayed at the time of purchase</li>
              <li>Any applicable taxes, levies, or government charges</li>
              <li>Payment processing fees (if not absorbed by us)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Payment Methods</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We accept payment via credit cards, debit cards, net banking, UPI, and bank transfers. For enterprise engagements, we may accept payment via purchase order or invoice with credit terms (subject to approval).
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Payment Schedule</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Payment terms vary by engagement:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Full Payment:</strong> Due at the time of purchase for packages under ₹2,00,000</li>
              <li><strong>Milestone Payments:</strong> Typically structured as 30% upfront, 40% at midpoint, 30% at completion</li>
              <li><strong>Monthly Installments:</strong> Available for long-term engagements (6+ months)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">5.4 Late Payments</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If milestone or installment payments are not received by the due date:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>We may suspend services until payment is received</li>
              <li>Late fees of 1.5% per month (or maximum allowed by law) may be charged on overdue amounts</li>
              <li>Continued non-payment may result in engagement termination and legal action</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">6. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Our Intellectual Property</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content, materials, frameworks, methodologies, templates, tools, software, logos, branding, and other intellectual property provided by Sarsen Strategy Partners remain our exclusive property. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Proprietary frameworks and strategic methodologies</li>
              <li>Templates, worksheets, and analytical tools</li>
              <li>Website content, design, and functionality</li>
              <li>Training materials and presentations</li>
              <li>Software, code, and technology platforms</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may not copy, reproduce, distribute, modify, reverse engineer, or create derivative works from our intellectual property without explicit written permission.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 License to Use Deliverables</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Upon full payment, you receive a non-exclusive, non-transferable license to use the specific deliverables created for your engagement (such as strategic plans, reports, and recommendations) for your internal business purposes. You may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Resell, distribute, or commercialize our deliverables</li>
              <li>Share our methodologies or frameworks with third parties</li>
              <li>Use our work to provide consulting services to others</li>
              <li>Remove our branding or attribution from deliverables</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-4">6.3 Your Intellectual Property</h3>
            <p className="text-gray-600 leading-relaxed">
              You retain all rights to your proprietary business information, data, and intellectual property shared with us. We will not claim ownership of your IP, though you grant us a limited license to use it solely for the purpose of delivering our services.
            </p>
          </section>

          {/* Confidentiality */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">7. Confidentiality</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Mutual Confidentiality</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Both parties agree to maintain the confidentiality of all proprietary and confidential information disclosed during the engagement, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Business strategies, plans, and financial information</li>
              <li>Customer data, pricing, and operational details</li>
              <li>Proprietary methodologies and frameworks</li>
              <li>Trade secrets and competitive intelligence</li>
              <li>Any information marked or designated as confidential</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Exceptions</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Confidentiality obligations do not apply to information that:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Is or becomes publicly available through no breach of this agreement</li>
              <li>Was already known to the receiving party without obligation of confidentiality</li>
              <li>Is independently developed without use of confidential information</li>
              <li>Must be disclosed by law, court order, or regulatory requirement</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">7.3 Duration</h3>
            <p className="text-gray-600 leading-relaxed">
              Confidentiality obligations survive the termination of the engagement and remain in effect for five (5) years from the date of disclosure, or indefinitely for trade secrets.
            </p>
          </section>

          {/* Disclaimers and Warranties */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">8. Disclaimers and Warranties</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">8.1 No Guarantees of Results</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we are committed to delivering high-quality strategic consulting services, <strong>we do not guarantee specific business outcomes or results.</strong> Business success depends on numerous factors including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Your implementation of our recommendations</li>
              <li>Market conditions and competitive dynamics</li>
              <li>Economic factors beyond our control</li>
              <li>Your team's capabilities and execution</li>
              <li>Timing and resource availability</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">8.2 Professional Judgment</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our recommendations are based on the information you provide and our professional judgment at the time of engagement. We warrant that services will be performed with reasonable care and skill consistent with industry standards.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">8.3 As-Is Basis</h3>
            <p className="text-gray-600 leading-relaxed">
              Our website and platform are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Our total liability for any claims arising from or related to our services shall not exceed the total fees paid by you for the specific engagement giving rise to the claim</li>
              <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost revenue, lost data, or business interruption</li>
              <li>We are not liable for damages resulting from your failure to implement recommendations, third-party actions, or circumstances beyond our reasonable control</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Some jurisdictions do not allow limitation of liability for certain types of damages, so these limitations may not apply to you.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">10. Indemnification</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless Sarsen Strategy Partners, its officers, directors, employees, consultants, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Your breach of these Terms or applicable laws</li>
              <li>Your misuse of our services or intellectual property</li>
              <li>Inaccurate or misleading information you provide</li>
              <li>Your implementation (or failure to implement) our recommendations</li>
              <li>Third-party claims related to your business operations</li>
              <li>Your violation of any third-party rights</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">11. Termination</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">11.1 Termination by Client</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may terminate your engagement subject to our Refund & Cancellation Policy. Termination after the 24-hour refund window does not entitle you to a refund of fees paid.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">11.2 Termination by Company</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may terminate or suspend your access to services immediately, without prior notice, if:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>You breach these Terms or our policies</li>
              <li>You fail to make required payments</li>
              <li>You engage in fraudulent, illegal, or unethical conduct</li>
              <li>You are unresponsive or non-cooperative for extended periods</li>
              <li>Continuing the engagement would violate laws or regulations</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">11.3 Effect of Termination</h3>
            <p className="text-gray-600 leading-relaxed">
              Upon termination, you must immediately cease using our services and intellectual property. Provisions regarding confidentiality, intellectual property, payment obligations, and limitation of liability survive termination.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">12. Dispute Resolution</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">12.1 Informal Resolution</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              In the event of any dispute, claim, or controversy, both parties agree to first attempt to resolve the matter through good-faith negotiations. Contact our support team at disputes@sarsenstrategy.com to initiate this process.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">12.2 Mediation</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If informal resolution fails within 30 days, the parties agree to attempt mediation before pursuing formal legal action. Mediation shall be conducted by a mutually agreed-upon mediator.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">12.3 Arbitration</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If mediation is unsuccessful, disputes shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996. Arbitration shall be conducted in [Your City], India, and proceedings shall be in English.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">12.4 Governing Law</h3>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any legal action must be brought in the courts of [Your City], India.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">13. Modifications to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website with an updated "Last Updated" date. Material changes will be communicated via email to registered users.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Your continued use of our services after changes are posted constitutes acceptance of the modified Terms. If you do not agree to the changes, you must discontinue use of our services.
            </p>
          </section>

          {/* General Provisions */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">14. General Provisions</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">14.1 Entire Agreement</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms, together with our Privacy Policy, Refund & Cancellation Policy, and any written service agreements, constitute the entire agreement between you and Sarsen Strategy Partners regarding our services.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">14.2 Severability</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">14.3 Waiver</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">14.4 Assignment</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">14.5 Force Majeure</h3>
            <p className="text-gray-600 leading-relaxed">
              Neither party shall be liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, wars, pandemics, government actions, or infrastructure failures.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">15. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For questions about these Terms of Use or our services:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">Sarsen Strategy Partners</p>
              <p className="text-gray-600">Email: legal@sarsenstrategy.com</p>
              <p className="text-gray-600">Phone: +91 [Your Phone Number]</p>
              <p className="text-gray-600">Address: [Your Business Address]</p>
              <p className="text-gray-600 mt-3 text-sm">
                <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-medium text-gray-800 mb-3">Acknowledgment and Acceptance</h2>
            <p className="text-gray-600 leading-relaxed">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT ACCESS OR USE OUR SERVICES.
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