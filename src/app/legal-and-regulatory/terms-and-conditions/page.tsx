// app/terms-and-conditions/page.tsx
//
// Single, consolidated legal page. Replaces: privacy-choices, cookie-preferences,
// refund-cancellation-policy, disclaimer, accessibility-statement (and any
// separate privacy-policy page). All of their operative content now lives here.
//
// Editing: every clause is a plain string in SECTIONS below. Clause numbers
// (1.1, 1.2 ...) are generated automatically, so reordering is safe.
// Styling is intentionally plain: black text, white background, no colour.

import React from 'react';

const LAST_UPDATED = 'November 26, 2026';
const CONTACT_EMAIL = 'contact@sarsenpartners.com';

interface SectionData {
  title: string;
  clauses: string[];
}

const SECTIONS: SectionData[] = [
  {
    title: 'Parties and Interpretation',
    clauses: [
      'These Terms and Conditions govern the relationship between Sarsen Strategy Partners, also referred to as Sarsen Partners or Sarsen Strategic Partners (“Sarsen”, “we”, “us”, “our”), and any person who accesses the website, purchases a service, submits information for an engagement, or makes a payment (the “Client”, “you”, “your”).',
      '“Services” means the strategy consulting, advisory, diagnostic, analytical and related professional services offered by Sarsen. “Engagement” means a defined set of Services purchased by the Client. “Partner” means the person designated by Sarsen to lead an Engagement. “Statement of Work” means the document or documents setting out the scope, deliverables, timelines, fees and other terms of an Engagement, as provided in Section 4. “Recommendation” means any strategy, analysis, advice, framework or deliverable provided by Sarsen. “Solution” means the complete set of Recommendations delivered under an Engagement.',
      'Headings are for reference only and do not affect interpretation. The words “including” and “includes” are to be read without limitation.',
    ],
  },
  {
    title: 'Acceptance and Governing Framework',
    clauses: [
      'By accessing the website, purchasing the Services, submitting information, or making a payment, the Client agrees to be bound by these Terms and Conditions. A Client who does not agree must not access the website or purchase the Services.',
      'These Terms and Conditions are the sole general legal document of Sarsen. Sections 9 (Refunds), 13 (Information, Analytics and Cookies), 14 (Requests Concerning Personal Information) and 15 (Disclaimers) are operative parts of these Terms and Conditions and are not separate policies. No other policy, notice, statement or web page of Sarsen, whether now or previously published, modifies these Terms and Conditions unless expressly incorporated in writing.',
      'These Terms and Conditions are to be read as a whole. Each Section supplements the others, and no Section is to be read in isolation. A Statement of Work prevails over these Terms and Conditions only to the extent it expressly states that it does so and only in respect of the Engagement to which it relates.',
    ],
  },
  {
    title: 'Services and Engagement',
    clauses: [
      'Sarsen provides strategy consulting, advisory, diagnostic and related Services to businesses, founders, startups and other organisations. The scope, deliverables, timelines, fees and engagement-specific terms are set out in the applicable Statement of Work, as provided in Section 4.',
      'Sarsen determines the Partner and other personnel assigned to an Engagement on the basis of expertise, availability and internal allocation of resources. No individual is guaranteed to perform an Engagement unless confirmed in writing.',
      'Information made available on the website, blog, social media or in general communications does not create an Engagement. An Engagement is created only by payment for, and acceptance of, a defined Service.',
      'Sarsen provides strategy, process design and execution support. Execution of any Recommendation remains the responsibility of the Client.',
    ],
  },
  {
    title: 'Statement of Work',
    clauses: [
      'Every Engagement is governed by a Statement of Work. Where Sarsen has issued a separate written Statement of Work for an Engagement, that document is the Statement of Work for the Engagement.',
      'Where no separate written Statement of Work has been issued or signed, the following together constitute the Statement of Work for the Engagement: the package description and price displayed on the website at the time of purchase; the order and payment confirmation generated through the website; and any invoice issued by Sarsen. By completing the purchase, the Client accepts that Statement of Work.',
      'Unless the package description or a written confirmation from Sarsen states otherwise, a Statement of Work constituted under Section 4.2 provides as follows: (a) scope: the Services described in the purchased package and no others; (b) deliverables: the analyses, Recommendations and documents described in the package; (c) timeline: dates are communicated by Sarsen in writing after purchase and are estimates and not guarantees; (d) fees: the price paid at purchase, payable in full at purchase unless the package provides for staged payments; (e) personnel: the Partner and other personnel assigned by Sarsen under Section 3.2; (f) acceptance: deliverables are deemed accepted on delivery unless the Client notifies Sarsen in writing of a material departure from the scope within seven (7) days of delivery; and (g) changes: any additional work or change of scope requires written agreement between the parties and additional fees.',
      'These Terms and Conditions apply to every purchase made through the website, whether or not a separate Statement of Work is issued, because the purchase and acceptance are effected through the website. A separate Statement of Work supplements these Terms and Conditions and does not displace them.',
    ],
  },
  {
    title: 'Client Obligations',
    clauses: [
      'The Client shall provide truthful, accurate, complete and current information concerning its business, operations, finances, objectives and circumstances; supply the documents, data, access and personnel reasonably required for the Services; respond to requests and attend agreed meetings within agreed timelines; designate a competent point of contact; and exercise independent judgment as to whether and how to implement any Recommendation.',
      'Sarsen is entitled to rely on information supplied by the Client without independent verification. Sarsen is not responsible for inaccuracies, omissions, delay or conclusions affected by information that is inaccurate, incomplete, misleading, outdated or untimely.',
      'Failure to provide required information, access, cooperation or decisions may affect the scope, quality, timing or feasibility of the Services and deliverables, and does not extend any entitlement under Section 9.',
    ],
  },
  {
    title: 'No Guarantee of Outcomes',
    clauses: [
      'Sarsen does not guarantee any business, financial, operational, funding, valuation, revenue, growth, market-share, cost or other commercial outcome, or the success of any strategy or Recommendation. Projections, estimates, forecasts, scenarios and targets are based on information and assumptions available at the relevant time and are not warranties of future performance. Past results, testimonials and case studies are not indicative of future results.',
      'Outcomes depend on the Client’s execution, management decisions, resources, timing, market and competitive conditions, capital availability, regulatory change and other circumstances beyond Sarsen’s control. A sound strategy may fail to produce an anticipated result where execution is incomplete, delayed, altered or unsuccessful.',
    ],
  },
  {
    title: 'Ethical Standards',
    clauses: [
      'Sarsen will not assist any Client in misleading, deceiving or defrauding customers, investors, lenders, regulators or any other person, whether by misrepresentation, concealment, fabricated or manipulated data, or otherwise. Sarsen may decline, suspend or terminate any Engagement, or any part of it, where it reasonably considers that this standard is or may be breached, and the Client shall have no claim to a refund in that event.',
      'Each party shall comply with applicable anti-bribery, anti-corruption and other laws in connection with the Engagement.',
    ],
  },
  {
    title: 'Fees and Payment',
    clauses: [
      'Fees are stated in the applicable package description, Statement of Work or invoice, and may be stated inclusive or exclusive of applicable taxes as specified at invoicing. Payment shall be made in accordance with the applicable payment schedule, which may provide for milestone or staged payments.',
      'Sarsen may pause or suspend Services where an undisputed payment is overdue. Late payments accrue interest at one and one-half percent (1.5%) per month or the maximum rate permitted by applicable law, whichever is lower.',
      'Where payment is made in stages, each payment is subject to Section 9 as determined by the agreed Engagement structure, and subsequent payments fall due on the agreed schedule irrespective of any dissatisfaction not established under Section 9.',
    ],
  },
  {
    title: 'Refunds',
    clauses: [
      'A refund is available only in the circumstances and on the conditions stated in this Section. Each condition in Sections 9.2 to 9.4 is independent and cumulative. Failure to satisfy any one of them renders the Client ineligible for a refund, irrespective of whether every other condition is satisfied.',
      'Pricing condition: a refund is available only where the Engagement was purchased at full price. A Client who used any coupon code, discount code, promotional offer or reduced price of any kind is not eligible for a refund.',
      'Time condition: a refund may be requested only within the first twelve (12) hours following the recorded time of successful payment, and in any event only before the first meeting between the Client and the Partner or any Sarsen personnel in relation to the Engagement has taken place. The earlier of these two events closes the refund period. Upon the occurrence of the first meeting, no refund is payable, because resources have been allocated, a Partner has been assigned and the Partner’s fees have been paid. A rescheduled meeting does not restart or extend the refund period.',
      'Conduct condition: a Client who, at any stage, acts disrespectfully toward the Partner, any Sarsen personnel, or any third party involved in the Engagement is not eligible for a refund. Disrespect includes abusive, threatening, harassing, demeaning or otherwise unprofessional conduct.',
      'Completed Engagements: once the Solution has been delivered, no refund is available unless each of the following is established: (a) the Client has implemented the complete Solution without omission or material alteration; (b) the implementation did not deliver significant results for the Client; and (c) the absence of results is attributable to a failure of the Solution itself and not to a failure of execution. Where the cause is a failure of execution, including incomplete, delayed, altered or defective implementation by the Client or its agents, Sarsen bears no responsibility and no refund is payable.',
      'A claim under Section 9.5 is not processed instantly. It is subject to an audit of the process followed in the Engagement and of the Client’s implementation, the duration of which depends on the complexity of the matter and the cooperation of the Client. The Client shall furnish the records, data and access reasonably required for the audit. Sarsen is liable for a refund only where the audit establishes, on evidence, that the process followed in the Engagement lacked evidence and rationality and that the shortfall in results arises from that failure of process. Evidence and rationality having been maintained in the process, no refund is payable.',
      'Requests shall be made in writing by electronic mail to the address in Section 21, stating the Client’s full name, the Service purchased, the order or invoice reference if available, and the date and time of payment. Sarsen may verify the payment, the timing of the request, the status of the Engagement and any other matter relevant to eligibility.',
      'Approved refunds are made to the original payment method where reasonably practicable and are generally processed within seven (7) to fourteen (14) business days of approval. The time taken by a payment provider or financial institution to credit the amount is outside Sarsen’s control. Non-refundable charges retained by a payment provider may be deducted.',
      'A change in the Client’s business priorities, budget, circumstances or preferences does not create an entitlement to a refund. Any postponement, pause, restructuring, credit or transfer to another Service is at Sarsen’s sole discretion and does not constitute an entitlement to a refund.',
      'Where Sarsen is unable to deliver an agreed Service owing to a material failure attributable to Sarsen, Sarsen shall make reasonable efforts to remedy the failure, which may include additional work, revised delivery, credit, or a pro rata refund for the undelivered portion, as Sarsen determines. This Section does not limit any right that cannot lawfully be excluded.',
    ],
  },
  {
    title: 'Suspension and Termination',
    clauses: [
      'Sarsen may suspend or terminate an Engagement where: (a) the Client or its representatives engage in inappropriate, threatening, harassing, abusive, unlawful or unprofessional conduct; (b) the Client repeatedly fails to provide information, respond to communications, attend agreed meetings or meet material obligations; (c) the Client does not provide essential information, documents, data or access reasonably required; (d) the Client is in material breach of these Terms and Conditions, the Statement of Work or applicable law; or (e) payment is overdue.',
      'The Client may request termination of an Engagement in writing. Termination does not entitle the Client to a refund except in accordance with Section 9. Fees for Services performed or otherwise earned, and outstanding amounts, remain payable. Where termination results from Client breach, misconduct, non-payment or failure to cooperate, amounts paid are not refundable.',
      'Sarsen may refuse access to the website, remove content, or restrict access to any user, with or without notice, where it considers that these Terms and Conditions or applicable law have been or may be breached.',
    ],
  },
  {
    title: 'Intellectual Property',
    clauses: [
      'Sarsen retains all rights in its methodologies, frameworks, models, templates, tools, processes, know-how, website content, text, graphics, logos and other materials, whether created before or during an Engagement (“Sarsen IP”). No Sarsen IP is assigned to the Client.',
      'Upon full payment of applicable fees, the Client receives a non-exclusive, non-transferable right to use deliverables prepared specifically for it for its own internal business purposes and, where reasonably necessary, for communications with its investors, lenders and advisers.',
      'The Client shall not resell, sublicense, reproduce, publish, distribute, reverse engineer, or otherwise make Sarsen IP available to any third party, or scrape, copy or mirror the website, without Sarsen’s prior written consent. Content of the website shall not be used to train, fine-tune or ground any machine learning or artificial intelligence system without Sarsen’s prior written consent.',
      'The Client shall not refer to Sarsen in any public medium, or use Sarsen’s name or marks, in a manner that implies endorsement, relationship or attribution without Sarsen’s prior written consent.',
    ],
  },
  {
    title: 'Confidentiality',
    clauses: [
      'Each party shall protect the other’s confidential business information with reasonable care and use it only for purposes connected with the Engagement. Confidential information may be disclosed where required by law, by a competent authority, or where reasonably necessary to perform the Engagement.',
      'Confidentiality obligations survive termination or completion of the Engagement for five (5) years unless otherwise agreed in writing.',
    ],
  },
  {
    title: 'Information, Analytics and Cookies',
    clauses: [
      'Sarsen uses Google Analytics to measure website traffic and usage, including pages viewed and the source through which a visitor arrived, such as an advertising campaign. This measurement is used to understand and improve the website and the Services.',
      'Sarsen does not intentionally share individually identifiable information obtained through analytics with any third party for advertising, profiling or resale, and does not sell personal information. Information is disclosed to service providers only to the extent necessary to process payments, communicate with the Client, host the website, and deliver the Services, and to authorities where required by law.',
      'Notwithstanding the above, the use of third-party tools means that collection or disclosure of information to a third party may occur unintentionally. Sarsen does not represent that such an occurrence is impossible. Improvement of its data practices is a continuing effort that Sarsen undertakes as it grows.',
      'Sarsen does not use cookies to track visitors. Cookies are used only to maintain authenticated sessions for logged-in users. Third-party tools, including Google Analytics, operate under their own terms and privacy policies and may use their own cookies or similar identifiers, which Sarsen does not control.',
      'The website does not provide cookie preference controls. A user may block or delete cookies through browser settings; doing so may impair login and other functionality. Browser “Do Not Track” signals are not consistently supported and are not guaranteed to disable any form of measurement.',
      'Information supplied by a Client for an Engagement is used to perform the Services, to administer payments, and to meet legal, audit and dispute-resolution requirements, and is retained for as long as reasonably necessary for those purposes. The Client is responsible for ensuring that it has authority to supply any personal information of third parties that it provides to Sarsen.',
    ],
  },
  {
    title: 'Requests Concerning Personal Information',
    clauses: [
      'A person may request access to, correction of, or deletion of personal information held by Sarsen, or raise a concern about its use, by written request to the address in Section 21. Requests are considered in accordance with applicable law, and may be declined or limited where retention or disclosure is required or permitted by law or is necessary for Sarsen’s legitimate business purposes, including the establishment, exercise or defence of legal claims.',
      'Sarsen will respond within a period that depends on the nature, seriousness, complexity and volume of the matter, and in any event within forty-five (45) days. Nothing in these Terms and Conditions creates any right beyond those available under applicable law or limits any right that cannot lawfully be limited.',
    ],
  },
  {
    title: 'Disclaimers',
    clauses: [
      'The website, its content and the Services are provided on an “as is” and “as available” basis. To the fullest extent permitted by law, Sarsen disclaims all warranties, express or implied, including those of merchantability, fitness for a particular purpose, accuracy, completeness, availability and non-infringement. Sarsen does not warrant that the website will be uninterrupted, secure, timely or error-free, and may modify or remove content, pricing and service descriptions at any time.',
      'Nothing provided by Sarsen constitutes legal, tax, accounting, investment or other regulated professional advice. Discussion of contracts, regulation, compliance, valuation, capital raising or financial planning is general business information. The Client shall obtain specialist professional advice where required and remains responsible for identifying and complying with all laws, licences and standards applicable to its business.',
      'Links to third-party websites and references to third-party names, brands or services are provided for convenience or illustration, do not imply endorsement or affiliation, and are accessed at the user’s own risk. Sarsen is not responsible for third-party content, practices or services.',
      'Sarsen makes continuing efforts to improve the accessibility of the website with reference to recognised practices, including Web Content Accessibility Guidelines, but does not represent that the website conforms to any standard or has been certified. Accessibility barriers may be reported to the address in Section 21, and Sarsen will consider reasonable alternative means of access where feasible.',
      'The Client remains solely responsible for its business decisions, for evaluating Recommendations, and for the consequences of implementing or not implementing them.',
    ],
  },
  {
    title: 'Limitation of Liability',
    clauses: [
      'To the maximum extent permitted by law, Sarsen’s total aggregate liability arising out of or relating to an Engagement, whether in contract, tort, negligence or otherwise, shall not exceed the fees actually paid by the Client for that Engagement during the six (6) months preceding the event giving rise to the claim.',
      'Sarsen is not liable for indirect, incidental, consequential, special, exemplary or punitive loss, including loss of profit, revenue, business opportunity, goodwill or data, or for outcomes resulting from the Client’s decisions, implementation or non-implementation of Recommendations, inaccurate or delayed Client information, third-party acts, market conditions, changes in law, or events beyond Sarsen’s reasonable control.',
      'Sarsen is not liable for the use of or inability to use the website, for unauthorised access to or alteration of transmissions or data, or for the acts or omissions of other users. No partner, officer or employee of Sarsen is personally liable in connection with the website or the Services.',
      'Nothing in these Terms and Conditions excludes or limits liability to the extent that exclusion or limitation is not permitted by applicable law.',
    ],
  },
  {
    title: 'Indemnification',
    clauses: [
      'To the maximum extent permitted by law, the Client shall indemnify and hold harmless Sarsen and its partners, officers, employees, consultants, contractors and representatives against claims, losses, damages, liabilities, costs and reasonable expenses arising out of: (a) the Client’s breach of these Terms and Conditions or applicable law; (b) misconduct or unlawful conduct of the Client or its representatives; (c) inaccurate, incomplete or misleading information supplied by the Client; (d) the Client’s implementation, non-implementation or use of Recommendations or deliverables; or (e) the Client’s business operations, decisions, contracts or dealings with third parties.',
    ],
  },
  {
    title: 'Force Majeure',
    clauses: [
      'Sarsen is not responsible for delay or failure in performance arising from events beyond its reasonable control, including natural disaster, epidemic, war, governmental action, labour disruption, and failure of utilities, networks or third-party platforms. Affected Services may be postponed, rescheduled, delivered remotely or restructured.',
    ],
  },
  {
    title: 'Governing Law and Dispute Resolution',
    clauses: [
      'These Terms and Conditions are governed by the laws of India, without reference to conflict of laws principles.',
      'The parties shall first attempt to resolve any dispute arising out of or relating to these Terms and Conditions or the Services by good-faith negotiation. A dispute not so resolved shall be finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, as amended, before a sole arbitrator jointly appointed by the parties. The language of the proceedings and award shall be English. The award shall be final and binding. The costs of arbitration shall be borne equally by the parties, subject to the arbitrator’s award on costs.',
      'Subject to the foregoing, the courts of India have jurisdiction in aid of arbitration and for interim relief.',
    ],
  },
  {
    title: 'Amendment',
    clauses: [
      'Sarsen may amend these Terms and Conditions at any time. Amended Terms and Conditions take effect on publication on this page with a revised “Last Updated” date. Unless otherwise required by law, the Terms and Conditions applicable to a purchase are those in effect at the time of that purchase, and continued use of the website after publication constitutes acceptance of the amended Terms and Conditions.',
    ],
  },
  {
    title: 'Concerns, Notices and Contact',
    clauses: [
      `Concerns, complaints, refund requests, accessibility reports, personal information requests, and formal notices shall be sent in writing to ${CONTACT_EMAIL}. Notices to the Client may be sent to the contact details provided by the Client at purchase. A response may take up to forty-five (45) days depending on the nature, seriousness, complexity and volume of matters being handled.`,
      'Where permitted by law, the Client shall give Sarsen a reasonable opportunity to review and address a concern before pursuing external escalation. Nothing in these Terms and Conditions restricts any right to approach a competent authority where law permits or requires.',
    ],
  },
  {
    title: 'General Provisions',
    clauses: [
      'Entire agreement: these Terms and Conditions, together with the applicable Statement of Work, constitute the entire agreement between the parties on the relevant subject matter and supersede prior discussions and representations.',
      'Severability: if any provision is held invalid or unenforceable, the remaining provisions continue in effect to the extent permitted by law.',
      'No waiver: failure or delay by Sarsen in enforcing any provision is not a waiver of its right to enforce it later. A waiver is effective only if in writing and signed by Sarsen.',
      'Assignment: the Client may not assign or transfer its rights or obligations without Sarsen’s prior written consent. Sarsen may assign its rights and obligations in connection with a restructuring, merger, acquisition or transfer of substantially all relevant assets.',
      'Relationship: nothing in these Terms and Conditions creates an employment, agency, partnership or joint venture between the Client and Sarsen or any of its personnel.',
      'Electronic record: this document is an electronic record under the Information Technology Act, 2000 and rules made thereunder, and requires no physical or digital signature.',
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white text-black">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-16">
        <h1 className="text-2xl font-bold md:text-3xl">Terms and Conditions</h1>
        <p className="mt-2 text-sm">Last Updated: {LAST_UPDATED}</p>

        <article className="mt-10 space-y-8">
          {SECTIONS.map((section, sIdx) => (
            <section key={section.title}>
              <h2 className="mb-3 text-base font-bold md:text-lg">
                {sIdx + 1}. {section.title}
              </h2>
              <div className="space-y-2">
                {section.clauses.map((clause, cIdx) => (
                  <p
                    key={cIdx}
                    className="grid grid-cols-[2.75rem_1fr] text-justify text-[15px] leading-snug md:text-base"
                  >
                    <span>
                      {sIdx + 1}.{cIdx + 1}
                    </span>
                    <span>{clause}</span>
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}