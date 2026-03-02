/* ============================================
   PRODUCT DATA SOURCE
   ============================================ */

export interface Product {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;

  price: string;
  duration: string;

  features: string[];
  deliverables: string[];

  idealFor: string[];
  industries: string[];

  consultant: {
    name: string;
    experience: string;
  };

  lastUpdated: string;
}

/* ============================================
   PRODUCTS DATABASE (STATIC)
   ============================================ */

export const products: Product[] = [
  {
    slug: "market-expansion-report",

    title: "Market Expansion Strategy Report",

    tagline:
      "Data-backed roadmap for entering new markets with confidence",

    description:
      "A comprehensive consulting engagement focused on identifying, validating, and executing new market opportunities.",

    longDescription:
      "This engagement provides founders and leadership teams with a detailed market entry and expansion blueprint. It combines quantitative research, competitor benchmarking, customer segmentation, and regulatory analysis to minimize risk and maximize growth velocity.",

    price: "₹1,50,000",

    duration: "4–6 Weeks",

    features: [
      "Market sizing analysis",
      "Competitor benchmarking",
      "Customer persona modeling",
      "Regulatory & compliance mapping",
      "Go-to-market strategy",
      "Pricing optimization",
    ],

    deliverables: [
      "50+ page strategy report",
      "Market data dashboards",
      "Competitive landscape matrix",
      "Expansion roadmap",
      "Risk assessment document",
      "Implementation checklist",
    ],

    idealFor: [
      "Early-stage startups",
      "Growth-stage founders",
      "VC-backed companies",
      "International expansion teams",
    ],

    industries: [
      "SaaS",
      "FinTech",
      "EdTech",
      "HealthTech",
      "E-commerce",
    ],

    consultant: {
      name: "Senior Strategy Partner",
      experience: "12+ Years in Market Strategy",
    },

    lastUpdated: "January 2026",
  },
];