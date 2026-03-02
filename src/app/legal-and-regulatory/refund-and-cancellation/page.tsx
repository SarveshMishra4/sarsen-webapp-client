// app/refund-cancellation-policy/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function RefundCancellationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Refund & Cancellation Policy</h1>
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
            <h2 className="text-2xl font-medium text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Sarsen Strategy Partners, we are committed to delivering exceptional strategic consulting services. We understand that selecting the right consulting partner is a critical decision for your business. This Refund & Cancellation Policy outlines the terms and conditions under which refunds and cancellations are processed.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Please read this policy carefully before purchasing any of our service packages. By making a purchase, you acknowledge and agree to the terms outlined in this policy.
            </p>
          </section>

          {/* 24-Hour Refund Window */}
          <section className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">2. 24-Hour Refund Window</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Eligibility Period</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We offer a <strong className="text-orange-700">strict 24-hour refund window</strong> that begins immediately after the completion of your diagnostic session. This window provides you with sufficient time to evaluate our methodology, expertise, and the value proposition of our services based on your direct experience during the diagnostic session.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Calculation of the 24-Hour Period</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The 24-hour refund window is calculated as follows:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Start Time:</strong> The exact moment your diagnostic session concludes</li>
              <li><strong>End Time:</strong> Exactly 24 hours (1,440 minutes) from the start time</li>
              <li><strong>Precision:</strong> The window closes at 24 hours, 0 minutes, and 0 seconds</li>
            </ul>
            <div className="bg-white rounded-lg p-4 border border-orange-200 mb-4">
              <p className="text-sm text-gray-700 mb-2"><strong>Example:</strong></p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>Diagnostic session ends: February 10, 2025, at 2:30 PM</li>
                <li>Refund window closes: February 11, 2025, at 2:30 PM</li>
                <li>Request at 2:30:01 PM on February 11: <span className="text-red-600 font-medium">NOT ELIGIBLE</span></li>
              </ul>
            </div>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Decision Based on Diagnostic Session</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-orange-700">IMPORTANT:</strong> Your refund decision must be based solely on your experience during the diagnostic session itself, NOT on the diagnostic report or any subsequent deliverables.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The diagnostic session is designed to provide you with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Direct insight into our consulting approach and methodology</li>
              <li>Assessment of our expertise and understanding of your business</li>
              <li>Clarity on how we will address your specific challenges</li>
              <li>Evaluation of our communication style and compatibility</li>
              <li>Understanding of the value we will deliver throughout the engagement</li>
            </ul>
          </section>

          {/* Refund Request Process */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">3. Refund Request Process</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 How to Request a Refund</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              To request a refund within the 24-hour window, you must:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-3 ml-4 mb-4">
              <li className="leading-relaxed">
                <strong>Submit a written request</strong> via email to refunds@sarsenstrategy.com
              </li>
              <li className="leading-relaxed">
                <strong>Include the following information:</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Your full name and contact information</li>
                  <li>Service package purchased and order/invoice number</li>
                  <li>Date and time your diagnostic session concluded</li>
                  <li>Brief explanation for your refund request (optional but appreciated)</li>
                </ul>
              </li>
              <li className="leading-relaxed">
                <strong>Ensure your request is received</strong> before the 24-hour window expires
              </li>
            </ol>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Verification and Processing</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Upon receiving your refund request:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>We will verify the timestamp of your request against the 24-hour window</li>
              <li>We will confirm your purchase details and payment information</li>
              <li>If eligible, we will process your refund within 5-7 business days</li>
              <li>Refunds will be issued to the original payment method used for purchase</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Refund Amount</h3>
            <p className="text-gray-600 leading-relaxed">
              If your refund request is approved, you will receive a <strong>100% refund</strong> of the amount paid for the service package. Payment processing fees (if any) charged by payment gateways are non-refundable and may be deducted from the refund amount.
            </p>
          </section>

          {/* After 24 Hours - No Refunds */}
          <section className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">4. After 24 Hours: No Refunds Policy</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Strict Enforcement</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-red-700">Once the 24-hour refund window has closed, all sales are final and non-refundable.</strong> This policy is strictly enforced without exception, regardless of:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>The stage of the engagement or deliverables received</li>
              <li>Change in business circumstances or priorities</li>
              <li>Dissatisfaction with diagnostic report or subsequent work</li>
              <li>Financial constraints or budget changes</li>
              <li>Third-party recommendations or opinions</li>
              <li>Any other reason or circumstance</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Rationale for This Policy</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our strict no-refund policy after 24 hours exists because:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Resource Allocation:</strong> We immediately allocate senior consultants and resources to your engagement</li>
              <li><strong>Customized Strategy:</strong> We begin developing tailored strategies and frameworks specific to your business</li>
              <li><strong>Opportunity Cost:</strong> Accepting your engagement means declining other potential clients</li>
              <li><strong>Intellectual Property:</strong> Strategic insights and methodologies are shared from day one</li>
              <li><strong>Time Investment:</strong> Significant consultant time is invested in preparing for and executing your engagement</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Timing Examples - NOT ELIGIBLE for Refund</h3>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✗ Request made 24 hours and 1 second after diagnostic session</li>
                <li>✗ Request made after receiving the diagnostic report</li>
                <li>✗ Request made during or after the engagement has commenced</li>
                <li>✗ Request made due to change in business priorities</li>
                <li>✗ Request made after receiving any deliverables or strategic work</li>
              </ul>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">5. Cancellation Policy</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Client-Initiated Cancellation</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you wish to cancel your engagement after the 24-hour refund window:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>No refund will be provided</strong> for any amount already paid</li>
              <li>You may request to <strong>pause the engagement</strong> for up to 60 days (subject to consultant availability)</li>
              <li>You may request to <strong>restructure deliverables</strong> or modify the scope within the same package value</li>
              <li>You may request to <strong>transfer credit</strong> to a different service package of equal or greater value (subject to approval)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Company-Initiated Cancellation</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              In rare circumstances, we reserve the right to cancel an engagement if:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>There is a fundamental conflict of interest discovered after engagement commencement</li>
              <li>The client engages in unethical, illegal, or fraudulent activities</li>
              <li>The client is unresponsive or fails to provide necessary information for 30+ days</li>
              <li>There is abusive behavior toward our consultants or staff</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              In such cases, we will provide a <strong>prorated refund</strong> based on the work completed and deliverables provided up to the cancellation date.
            </p>
          </section>

          {/* Rescheduling */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">6. Rescheduling and Postponement</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Diagnostic Session Rescheduling</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may reschedule your diagnostic session:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Up to 48 hours before</strong> the scheduled session: Free rescheduling</li>
              <li><strong>24-48 hours before:</strong> One-time free rescheduling; subsequent changes may incur fees</li>
              <li><strong>Less than 24 hours or no-show:</strong> Session considered completed; 24-hour refund window begins</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Engagement Postponement</h3>
            <p className="text-gray-600 leading-relaxed">
              After the refund window closes, you may request to pause your engagement for up to 60 days due to business circumstances. This is granted at our discretion based on consultant availability and scheduling. Payments remain non-refundable during postponement.
            </p>
          </section>

          {/* Exceptions */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">7. Exceptions and Special Circumstances</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Force Majeure</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              In cases of force majeure events (natural disasters, pandemics, government actions, wars, or other unforeseeable circumstances beyond reasonable control), we will work with you to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Postpone the engagement until circumstances normalize</li>
              <li>Deliver services remotely if feasible</li>
              <li>Restructure deliverables to accommodate changed circumstances</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-4">7.2 Service Delivery Failures</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If we fail to deliver services as promised in your service package agreement due to our fault or negligence, we will:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Make reasonable efforts to remedy the situation and deliver as agreed</li>
              <li>Provide additional consulting time or resources at no extra cost</li>
              <li>In cases of material breach, consider a prorated refund or credit for undelivered portions</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">8. Payment Terms and Milestones</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For engagements with milestone-based payments:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>The 24-hour refund window applies to the initial payment only</li>
              <li>Subsequent milestone payments are due as per the agreed schedule</li>
              <li>Failure to pay milestone payments may result in engagement suspension</li>
              <li>No refunds are provided for milestone payments after work for that milestone has commenced</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">9. Dispute Resolution</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have concerns about our services or wish to dispute a refund decision:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-3 ml-4 mb-4">
              <li className="leading-relaxed">
                <strong>Contact our support team</strong> at support@sarsenstrategy.com to discuss your concerns
              </li>
              <li className="leading-relaxed">
                <strong>Escalate to senior management</strong> if the issue remains unresolved
              </li>
              <li className="leading-relaxed">
                <strong>Formal dispute resolution:</strong> As a last resort, disputes may be resolved through mediation or arbitration as per our Terms of Service
              </li>
            </ol>
            <p className="text-gray-600 leading-relaxed">
              We are committed to addressing concerns fairly and promptly, but refund eligibility remains strictly governed by the 24-hour window policy.
            </p>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify this Refund & Cancellation Policy at any time. Changes will be effective immediately upon posting to our website with an updated "Last Updated" date. The policy in effect at the time of your purchase governs your transaction. We encourage you to review this policy before making a purchase.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">11. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For questions about this Refund & Cancellation Policy or to submit a refund request:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">Sarsen Strategy Partners</p>
              <p className="text-gray-600">Refund Requests: refunds@sarsenstrategy.com</p>
              <p className="text-gray-600">General Support: support@sarsenstrategy.com</p>
              <p className="text-gray-600">Phone: +91 [Your Phone Number]</p>
              <p className="text-gray-600 mt-3 text-sm">
                <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-medium text-gray-800 mb-3">Acknowledgment</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              By purchasing any service package from Sarsen Strategy Partners, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>You have read and understood this Refund & Cancellation Policy</li>
              <li>You agree to the strict 24-hour refund window based on the diagnostic session</li>
              <li>You understand that refunds are not available after the 24-hour window closes</li>
              <li>You accept the terms and conditions outlined in this policy</li>
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