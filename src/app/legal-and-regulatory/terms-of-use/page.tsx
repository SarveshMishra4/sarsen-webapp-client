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
          <h1 className="text-4xl md:text-5xl  mb-4">Terms & Conditions</h1>
          <p className="text-xl text-blue-100">
            Last Updated: March 26, 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
          
          {/* 1. Identification of the Company */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">1. Company Identification</h2>
            <p className="text-gray-600  mb-4">
              These Terms of Use (“Terms”) are entered into between you (“Client”, “you”, “your”) and Sarsen & Company, which may also operate under the trade names Sarsen Strategy Partners, Sarsen Partners, or Sarsen Strategic Partners (collectively “Company”, “we”, “us”, “our”). All such names refer to the same legal entity and the rights and obligations set forth herein apply equally irrespective of which trade name is used in any particular communication or engagement.
            </p>
            <p className="text-gray-600 ">
              References to “Company” in these Terms include all affiliated entities, employees, consultants, and agents acting on behalf of the Company.
            </p>
          </section>

          {/* 2. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-600  mb-4">
              By accessing our website, purchasing our services, or engaging with us in any capacity, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy and Refund & Cancellation Policy.
            </p>
            <p className="text-gray-600 ">
              <strong>If you do not agree to these Terms, you must not access or use our services.</strong>
            </p>
          </section>

          {/* 3. Services Description */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">3. Services Description</h2>
            <p className="text-gray-600  mb-4">
              The Company provides strategic business consulting services, including but not limited to growth strategy, financial planning, operations optimization, market positioning, and diagnostic sessions. The specific scope of each engagement shall be defined in a separate Statement of Work or Service Agreement.
            </p>
            <p className="text-gray-600 ">
              All services are performed by the Company or its designated personnel. The Company reserves the right to assign any employee, consultant, or subcontractor to perform services under these Terms.
            </p>
          </section>

          {/* 4. Client Responsibilities and Cooperation */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">4. Client Responsibilities and Cooperation</h2>
            <p className="text-gray-600  mb-4">
              The Client acknowledges that the success of the engagement depends heavily on timely, accurate, and complete cooperation. The Client agrees to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Provide truthful, accurate, and complete information about its business, operations, financials, and any other data reasonably requested by the Company.</li>
              <li>Respond to questionnaires, information requests, and meeting invitations within the deadlines specified (typically 3–5 business days).</li>
              <li>Designate a primary point of contact with decision‑making authority to facilitate communication.</li>
              <li>Make available all necessary personnel, systems, and documents required for the Company to perform the services.</li>
              <li>Implement recommendations in good faith, understanding that ultimate responsibility for execution rests with the Client.</li>
            </ul>
            <p className="text-gray-600 ">
              <strong>Failure to comply with these responsibilities may affect the quality, timeliness, or feasibility of the deliverables.</strong>
            </p>
          </section>

          {/* 5. No Guarantee of Outcomes */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">5. No Guarantee of Outcomes</h2>
            <p className="text-gray-600  mb-4">
              The Company provides strategic advice and deliverables based on the information provided and professional judgment. However, <strong>the Company does not guarantee any specific business outcome, financial return, or success of any strategy.</strong> The quality and utility of the deliverables are contingent upon the Client’s full cooperation, timely data provision, and accurate information. If the Client fails to provide complete or accurate data, or fails to meet deadlines for cooperation, the Company may not be able to deliver the expected quality of outcome, and in such circumstances, the Company shall have no liability whatsoever.
            </p>
          </section>

          {/* 6. Payment Terms */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">6. Payment Terms</h2>
            <p className="text-gray-600  mb-4">
              Fees are quoted in Indian Rupees (INR) and are due as specified in the engagement agreement. Payment methods accepted: credit/debit cards, net banking, UPI, and bank transfers. For custom engagements, milestone payments may be required. All fees are non‑refundable except as expressly provided in the Refund & Cancellation Policy.
            </p>
            <p className="text-gray-600 ">
              Late payments shall accrue interest at the rate of 1.5% per month (or the maximum permitted by law) until paid in full. The Company reserves the right to suspend services if any payment is overdue.
            </p>
          </section>

          {/* 7. Termination by Company (with No Refund) */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">7. Termination by Company (with No Refund)</h2>
            <p className="text-gray-600  mb-4">
              The Company may terminate any engagement immediately, without prior notice, and without any obligation to refund any fees already paid, in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Misconduct:</strong> If the Client or any of its representatives engages in inappropriate, disrespectful, threatening, harassing, or otherwise unprofessional conduct toward any Company personnel, agents, or contractors.</li>
              <li><strong>Failure to Meet Deadlines:</strong> If the Client fails to provide requested information, respond to communications, or otherwise meet agreed deadlines on two (2) separate occasions after written notice, and such failure materially impedes the progress of the engagement.</li>
              <li><strong>Non‑Provision of Data:</strong> If the Client does not provide any of the essential data or information required to perform the services (including but not limited to financial data, operational metrics, or access to key personnel) within the timeframes set by the Company, and such failure continues beyond a written warning of 5 business days.</li>
              <li><strong>Breach of Terms:</strong> If the Client breaches any material provision of these Terms or any applicable law.</li>
            </ul>
            <p className="text-gray-600 ">
              In the event of termination under this section, the Client shall not be entitled to any refund, and any outstanding fees shall become immediately due and payable. The Company’s decision to terminate is final and binding.
            </p>
          </section>

          {/* 8. Termination by Client */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">8. Termination by Client</h2>
            <p className="text-gray-600  mb-4">
              The Client may terminate an engagement at any time by providing written notice. If termination occurs after the refund period specified in the Refund & Cancellation Policy, no refund of fees paid shall be provided. Any outstanding fees for services already rendered or expenses incurred shall remain payable.
            </p>
          </section>

          {/* 9. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-600  mb-4">
              All intellectual property created by the Company, including methodologies, frameworks, templates, reports, and tools, remains the sole and exclusive property of the Company. Upon full payment, the Client receives a non‑exclusive, non‑transferable license to use the deliverables solely for internal business purposes. The Client may not resell, distribute, or commercialize the deliverables or any Company intellectual property.
            </p>
          </section>

          {/* 10. Confidentiality */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">10. Confidentiality</h2>
            <p className="text-gray-600  mb-4">
              Both parties agree to protect each other’s confidential information using reasonable care. Confidential information shall not be disclosed to third parties except as required by law or as necessary to perform the engagement. This obligation survives termination of these Terms for a period of five (5) years.
            </p>
          </section>

          {/* 11. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-600  mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>The Company’s total liability for any claim arising from or related to the services shall not exceed the total fees paid by the Client for the specific engagement giving rise to the claim.</li>
              <li>The Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost revenue, lost data, or business interruption.</li>
              <li>The Company is not liable for any outcome resulting from the Client’s failure to provide accurate information, meet deadlines, or implement recommendations.</li>
            </ul>
          </section>

          {/* 12. Indemnification */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">12. Indemnification</h2>
            <p className="text-gray-600  mb-4">
              The Client agrees to indemnify and hold harmless the Company and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys’ fees) arising out of or related to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>The Client’s breach of these Terms or applicable laws;</li>
              <li>Misconduct by the Client or its representatives;</li>
              <li>Any inaccuracies in information provided by the Client;</li>
              <li>The Client’s use of deliverables or implementation (or non‑implementation) of recommendations.</li>
            </ul>
          </section>

          {/* 13. Dispute Resolution & Governing Law */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">13. Dispute Resolution & Governing Law</h2>
            <p className="text-gray-600  mb-4">
              These Terms shall be governed by the laws of India. Any dispute arising out of or relating to these Terms or the services shall first be attempted to be resolved through good‑faith negotiations. If the dispute is not resolved within 30 days, it shall be referred to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, to be conducted in English in Bangalore, India. The arbitrator’s award shall be final and binding.
            </p>
          </section>

          {/* 14. Amendments */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">14. Amendments</h2>
            <p className="text-gray-600  mb-4">
              The Company reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website, with a new “Last Updated” date. Material changes will be communicated by email to registered users. Continued use of the services after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* 15. Contact Information */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">15. Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">Sarsen & Company</p>
              <p className="text-gray-600">Email: contact@sarsenpartners.com</p>
              <p className="text-gray-600 mt-3 text-sm">
                <strong>Business Hours:</strong> Monday - Friday, 11:00 AM - 8:00 PM Gulf Standard Time
              </p>
              <p className="text-gray-500 text-sm mt-2">
                *For legal notices only. All correspondence should be sent via email.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-medium text-gray-800 mb-3">Acknowledgment</h2>
            <p className="text-gray-600 ">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms, including the Company’s right to terminate without refund for misconduct, missed deadlines, or non‑provision of data.
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