// data/case-studies.data.ts

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;           // e.g., "Driving operational excellence in manufacturing"
  client: string;
  industry: string;
  services: string[];          // e.g., ["Operations", "Strategy"]
  challenge: string;           // multi-paragraph
  approach: string;            // multi-paragraph
  solution: string;            // multi-paragraph
  results: string[];           // bullet points with metrics
  testimonial?: {
    quote: string;
    author: string;
    authorTitle: string;
  };
  relatedInsights?: string[];  // slugs of blog posts or other case studies
  featuredImagePlaceholder: string;
  publishedDate: string;       // for ordering
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'global-manufacturing-efficiency',
    title: 'From Waste to Wealth',
    subtitle: 'Driving 23% efficiency gain in global manufacturing operations',
    client: 'A leading industrial components manufacturer',
    industry: 'Manufacturing',
    services: ['Operations', 'Digital Transformation'],
    challenge: `
      The client, a multinational manufacturer with plants across three continents, faced declining margins due to aging equipment, inconsistent processes, and rising energy costs. Despite previous lean initiatives, waste remained high—up to 18% in some facilities—and production bottlenecks were chronic. Management had attempted digital upgrades piecemeal, but without an overarching strategy, investments failed to deliver ROI. They needed a holistic transformation that could be deployed globally while respecting local nuances.
    `,
    approach: `
      Our team conducted a deep diagnostic across five representative plants, combining IoT sensor data with operator interviews. We identified three root causes: (1) lack of real-time visibility into machine performance, (2) variability in shift handovers, and (3) underutilized predictive maintenance capabilities. We then designed a scalable operating model that included:

      - A centralized "control tower" with dashboards for real-time OEE tracking.
      - Standardized shift protocols and training programs.
      - A predictive maintenance pilot using machine learning on vibration data.
      
      The approach was phased: a pilot in one plant, then rapid scaling with local adaptation teams.
    `,
    solution: `
      Over 12 months, we implemented the following:

      1. **IoT Integration**: Deployed sensors on 200+ critical machines, feeding data into a cloud-based analytics platform.
      2. **Control Tower**: Established a global operations center staffed 24/7 to monitor performance and dispatch alerts.
      3. **Standardized Work**: Created digital work instructions accessible via tablets on the shop floor, reducing variability.
      4. **Predictive Maintenance**: The ML model predicted bearing failures with 85% accuracy, reducing unplanned downtime by 40%.
      5. **Change Management**: Trained 500+ operators and supervisors through a "lean digital" curriculum, emphasizing local ownership.
    `,
    results: [
      '23% increase in overall equipment effectiveness (OEE) across all plants',
      '17% reduction in energy consumption per unit',
      '40% decrease in unplanned downtime',
      '€12M annualized savings achieved within 18 months',
      'Employee engagement scores rose by 32%'
    ],
    testimonial: {
      quote: "Sarsen & Company didn't just give us a report—they worked alongside our teams to make change happen. The results speak for themselves, but the capability they built in our people will last for years.",
      author: 'Hans Müller',
      authorTitle: 'Chief Operating Officer'
    },
    relatedInsights: ['digital-transformation-human-element', 'strategy-in-uncertain-times'],
    featuredImagePlaceholder: 'SBG Visual – Manufacturing Case Study',
    publishedDate: '2025-02-10'
  },
  {
    slug: 'fintech-market-entry',
    title: 'Breaking into Southeast Asia',
    subtitle: 'How a European fintech gained 15% market share in two years',
    client: 'A fast-growing digital payments platform',
    industry: 'Financial Services / Fintech',
    services: ['Strategy', 'M&A', 'Partnerships'],
    challenge: `
      The client, a successful European fintech, wanted to expand into Southeast Asia—a fragmented market with diverse regulations, payment preferences, and incumbent competitors. Previous attempts via distributors had stalled. They needed a coherent entry strategy that could adapt to local conditions while leveraging their core technology.
    `,
    approach: `
      We began with a market prioritization framework, scoring six countries on market size, regulatory openness, partnership potential, and competitive intensity. Indonesia and Vietnam emerged as top targets. For each, we:

      - Mapped the regulatory landscape and engaged local legal counsel.
      - Identified potential local partners (banks, telcos, e‑commerce platforms).
      - Conducted customer research to tailor the value proposition.
      
      The strategy was to enter via a joint venture in Indonesia (fastest route) and a direct license in Vietnam (more control).
    `,
    solution: `
      In Indonesia, we structured a JV with a major telecom that brought 50M existing users. We co‑designed a "super app" integration that allowed instant payments. In Vietnam, we obtained a license and built a local team of 30, focusing on merchant acquisition in high‑traffic urban areas.

      Key elements included:

      - A modular tech platform that could integrate with local payment gateways.
      - Localized marketing campaigns featuring regional influencers.
      - A compliance framework that met both EU and local data laws.
    `,
    results: [
      '15% market share in Indonesia within 24 months (by transaction volume)',
      '8% share in Vietnam after 18 months',
      'JV partner saw 22% increase in customer engagement',
      'Successfully replicated the model to the Philippines in year three',
      'Overall revenue from SEA reached €45M annually'
    ],
    testimonial: {
      quote: "Sarsen's local knowledge and structured approach gave us the confidence to move fast. They didn't just advise—they helped us execute, from partner negotiations to hiring the first country manager.",
      author: 'Clara van den Berg',
      authorTitle: 'Chief Strategy Officer'
    },
    relatedInsights: ['strategy-in-uncertain-times'],
    featuredImagePlaceholder: 'SBG Visual – Fintech Case Study',
    publishedDate: '2024-11-20'
  },
  {
    slug: 'healthcare-provider-turnaround',
    title: 'Reviving a Community Hospital',
    subtitle: 'From deficit to 8% margin in 18 months',
    client: 'A 200‑bed regional hospital',
    industry: 'Healthcare',
    services: ['Operations', 'Turnaround', 'Leadership'],
    challenge: `
      The hospital had accumulated operating losses for three consecutive years, with a negative margin of 6%. Clinical quality scores were below average, and physician morale was low. The board considered a sale, but wanted one last attempt at recovery. Key issues included inefficient scheduling, high supply costs, and a disjointed electronic health record (EHR) implementation.
    `,
    approach: `
      We deployed a small team of healthcare operations experts and worked alongside hospital leadership. Our approach combined rapid cost reduction with revenue cycle improvements, while ensuring patient care remained paramount.

      - **Clinical Operations**: Analyzed OR utilization and staffing ratios, implemented block scheduling, reduced overtime.
      - **Supply Chain**: Renegotiated vendor contracts and standardized implants and devices.
      - **Revenue Cycle**: Identified coding gaps and denial patterns, retrained staff, and implemented new software.
      - **Physician Engagement**: Formed a clinical council to give doctors a voice in decisions.
    `,
    solution: `
      Over 18 months, we:

      - Reduced length of stay by 1.2 days through care coordination.
      - Cut supply costs by 14% via group purchasing and formulary changes.
      - Improved net revenue by 9% through better coding and denial management.
      - Launched a telehealth service that captured new outpatient volume.
      - Replaced the EHR with a more user‑friendly system after a competitive RFP.
    `,
    results: [
      'Turnaround to 8% operating margin',
      'Patient satisfaction scores rose from 62nd to 89th percentile',
      'Physician turnover dropped from 18% to 6%',
      'New outpatient clinics opened in two underserved neighborhoods',
      'Received "Top Performer" recognition from state quality organization'
    ],
    testimonial: {
      quote: "They didn't come in with a cookie‑cutter plan. They listened, then tailored solutions that our staff could own. The cultural shift was as important as the financial recovery.",
      author: 'Dr. Susan Lee',
      authorTitle: 'Chief of Staff'
    },
    relatedInsights: ['merger-integration-lessons', 'digital-transformation-human-element'],
    featuredImagePlaceholder: 'SBG Visual – Healthcare Case Study',
    publishedDate: '2024-09-05'
  }
];

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug);
}