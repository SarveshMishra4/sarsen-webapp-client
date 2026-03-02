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
          <h1 className="text-4xl md:text-5xl font-light mb-4">Disclaimer</h1>
          <p className="text-xl text-blue-100">
            Last Updated: February 10, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
          
          {/* Important Notice */}
          <section className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z"/>
              </svg>
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">Important Notice</h2>
                <p className="text-gray-700 leading-relaxed">
                  Please read this disclaimer carefully before using the services of Sarsen Strategy Partners. By accessing our website, engaging our services, or using any materials provided by us, you acknowledge and accept the terms of this disclaimer.
                </p>
              </div>
            </div>
          </section>

          {/* General Disclaimer */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">1. General Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The information, advice, recommendations, strategies, and materials provided by Sarsen Strategy Partners (collectively "Content") are for general informational and educational purposes only. This Content is not intended to be, and should not be construed as, professional financial, legal, tax, or investment advice.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we strive to provide accurate, current, and reliable information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Content for any particular purpose.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Your use of our services and reliance on any Content is solely at your own risk.</strong>
            </p>
          </section>

          {/* No Guarantee of Results */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">2. No Guarantee of Business Results</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Performance Disclaimer</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sarsen Strategy Partners does not guarantee, warrant, or make any representations regarding the results you may achieve by implementing our recommendations, strategies, or advice. Business outcomes depend on numerous factors including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Your level of commitment, effort, and execution capability</li>
              <li>Market conditions, economic factors, and competitive dynamics</li>
              <li>Industry trends and regulatory changes</li>
              <li>Quality of your team and organizational resources</li>
              <li>Timing, budget constraints, and resource availability</li>
              <li>External factors beyond anyone's reasonable control</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Past Performance</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Any case studies, testimonials, examples, or references to past results mentioned on our website or in our materials are provided for illustrative purposes only. <strong>Past performance is not indicative of future results.</strong> Every business is unique, and results will vary based on individual circumstances.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Revenue and Growth Claims</h3>
            <p className="text-gray-600 leading-relaxed">
              We do not promise or guarantee any specific revenue increases, cost savings, funding success, market share gains, or other quantifiable business outcomes. Any projected outcomes discussed during our engagements are estimates based on available information and assumptions, not guarantees.
            </p>
          </section>

          {/* Professional Advice Disclaimer */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">3. Not Professional Advice</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Legal Advice</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sarsen Strategy Partners is not a law firm and does not provide legal advice. Any information related to legal matters, contracts, compliance, intellectual property, or regulatory issues is for general informational purposes only and should not be relied upon as legal advice.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>You should consult with a qualified attorney licensed in your jurisdiction for legal advice specific to your situation.</strong>
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Financial and Investment Advice</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are not registered investment advisors, financial planners, or securities brokers. We do not provide investment advice, recommend specific securities or investment products, or make decisions about buying, selling, or holding investments.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Any discussion of financial planning, capital raising, or investment strategy is general business consulting advice, not personalized investment recommendations.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>You should consult with a licensed financial advisor, CPA, or investment professional before making investment decisions.</strong>
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Tax Advice</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are not tax professionals, certified public accountants, or tax attorneys. We do not provide tax advice, prepare tax returns, or make representations about the tax implications of business decisions.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>You should consult with a qualified tax professional regarding tax matters specific to your business and jurisdiction.</strong>
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.4 Accounting Advice</h3>
            <p className="text-gray-600 leading-relaxed">
              While we may discuss financial metrics, bookkeeping practices, or accounting principles as part of our strategic consulting, we are not certified accountants and do not provide professional accounting services or advice. <strong>Consult with a licensed accountant for accounting-specific guidance.</strong>
            </p>
          </section>

          {/* No Client-Advisor Relationship */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">4. Relationship Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The general information provided on our website, blog, social media, or in free resources does not create a consultant-client relationship between you and Sarsen Strategy Partners. A formal consulting relationship is only established upon:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Purchase of a service package</li>
              <li>Execution of a written consulting agreement</li>
              <li>Commencement of paid services</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Until a formal engagement begins, any communication, content, or preliminary discussions are not confidential and do not create any obligations on our part.
            </p>
          </section>

          {/* Website Content Disclaimer */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">5. Website and Content Disclaimer</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Accuracy of Information</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we make reasonable efforts to ensure the information on our website is accurate and up-to-date, we make no warranties or representations about:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>The accuracy, completeness, or timeliness of website content</li>
              <li>The availability or reliability of our website or platform</li>
              <li>The absence of errors, bugs, or technical issues</li>
              <li>The suitability of content for your specific needs</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Content Changes</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We reserve the right to modify, update, or remove content from our website at any time without notice. Pricing, service descriptions, and other details may change, and your use of outdated information is at your own risk.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Typographical Errors</h3>
            <p className="text-gray-600 leading-relaxed">
              Despite our efforts, our website may contain typographical errors, inaccuracies, or omissions. We reserve the right to correct errors, update information, or change service offerings without prior notice.
            </p>
          </section>

          {/* Third-Party Links and Resources */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">6. Third-Party Links and Resources</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website, materials, and recommendations may include links to third-party websites, tools, resources, or services. These links are provided for convenience only and do not constitute endorsement, approval, or responsibility for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>The content, accuracy, or reliability of third-party sites</li>
              <li>The privacy practices or security of external websites</li>
              <li>The products or services offered by third parties</li>
              <li>Any transactions or interactions with third parties</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              <strong>You access third-party links at your own risk.</strong> We encourage you to review the terms and privacy policies of any third-party websites you visit.
            </p>
          </section>

          {/* Testimonials and Case Studies */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">7. Testimonials and Case Studies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Testimonials, reviews, and case studies featured on our website or marketing materials represent the experiences of specific clients under specific circumstances. These are provided for illustrative purposes only and should not be considered typical or guaranteed results.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Client results vary based on numerous factors including industry, market conditions, client commitment, implementation quality, and circumstances unique to each business.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Individual results may be better, worse, or different from those described in testimonials.</strong>
            </p>
          </section>

          {/* No Warranties */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">8. No Warranties</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website, services, and content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties of non-infringement or title</li>
              <li>Warranties regarding accuracy, reliability, or completeness</li>
              <li>Warranties that services will be uninterrupted, timely, secure, or error-free</li>
              <li>Warranties regarding the results or outcomes of using our services</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Some jurisdictions do not allow exclusion of implied warranties, so some of the above exclusions may not apply to you.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To the fullest extent permitted by applicable law, Sarsen Strategy Partners, its officers, directors, employees, consultants, and affiliates shall not be liable for any:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Direct, indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Business interruption or reputational harm</li>
              <li>Damages arising from your use of (or inability to use) our services</li>
              <li>Damages resulting from errors, omissions, or inaccuracies in content</li>
              <li>Damages from unauthorized access to your data or systems</li>
              <li>Damages from third-party actions or services</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              This limitation applies whether based on warranty, contract, tort, negligence, strict liability, or any other legal theory, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">10. Indemnification</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless Sarsen Strategy Partners from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services, violation of these terms, or implementation of our recommendations. This indemnification survives termination of your engagement with us.
            </p>
          </section>

          {/* Consultation Recommendation */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">11. Recommendation to Seek Professional Advice</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We strongly recommend that you:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Consult with qualified legal counsel before entering into contracts, agreements, or making legal decisions</li>
              <li>Work with licensed financial advisors, CPAs, or tax professionals for financial, investment, and tax matters</li>
              <li>Engage industry-specific experts for specialized technical or regulatory guidance</li>
              <li>Conduct your own due diligence and research before making business decisions</li>
              <li>Verify all information and adapt our recommendations to your specific circumstances</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              <strong>Our strategic consulting should complement, not replace, advice from licensed professionals in specialized fields.</strong>
            </p>
          </section>

          {/* Industry-Specific Considerations */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">12. Industry-Specific Considerations</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we work across various industries, we are not experts in all regulatory, technical, or operational aspects of every sector. Our advice is strategic in nature and may not account for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Industry-specific regulations, licensing requirements, or compliance obligations</li>
              <li>Technical standards, certifications, or quality control protocols</li>
              <li>Specialized operational procedures or safety requirements</li>
              <li>Unique risks or challenges specific to your industry or jurisdiction</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              <strong>You remain responsible for ensuring compliance with all applicable laws, regulations, and industry standards.</strong>
            </p>
          </section>

          {/* Changes to Disclaimer */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">13. Changes to This Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting with an updated "Last Updated" date. Your continued use of our website or services after changes constitutes acceptance of the modified disclaimer.
            </p>
          </section>

          {/* Jurisdiction */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">14. Governing Law and Jurisdiction</h2>
            <p className="text-gray-600 leading-relaxed">
              This disclaimer is governed by the laws of India. Any disputes arising from or relating to this disclaimer shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">15. Questions About This Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions or concerns about this disclaimer:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">Sarsen Strategy Partners</p>
              <p className="text-gray-600">Email: legal@sarsenstrategy.com</p>
              <p className="text-gray-600">Phone: +91 [Your Phone Number]</p>
              <p className="text-gray-600">Address: [Your Business Address]</p>
            </div>
          </section>

          {/* Final Acknowledgment */}
          <section className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
            <h2 className="text-xl font-medium text-gray-800 mb-3">Final Acknowledgment</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>BY USING OUR WEBSITE OR SERVICES, YOU ACKNOWLEDGE THAT:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>You have read and understood this disclaimer in its entirety</li>
              <li>You accept and agree to all terms outlined in this disclaimer</li>
              <li>You understand that we do not guarantee business results or outcomes</li>
              <li>You will seek appropriate professional advice for legal, financial, tax, and specialized matters</li>
              <li>You use our services at your own risk and are responsible for your business decisions</li>
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