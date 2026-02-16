export interface ServiceConfig {
  slug: string
  serviceCode: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  icon: string
  features: string[]
  deliverables: string[]
  price: number
  currency: string
  duration: string
  methodology: {
    title: string
    steps: string[]
  }
  faqs: Array<{
    question: string
    answer: string
  }>
  meta: {
    title: string
    description: string
    keywords: string[]
  }
}

export const services: ServiceConfig[] = [
  {
    slug: 'fundraising-strategy',
    serviceCode: 'SRV_FUND_001',
    title: 'Fundraising Strategy',
    subtitle: 'Comprehensive fundraising roadmap for growth-stage companies',
    description: 'Develop a tailored fundraising strategy that positions your company for successful capital raising.',
    longDescription: 'Our Fundraising Strategy service provides end-to-end support for companies preparing to raise capital. We analyze your business model, market position, and financial projections to create a compelling narrative that resonates with investors. From deck optimization to investor targeting, we ensure you\'re fully prepared for your fundraising journey.',
    icon: '/images/service-icons/fundraising.svg',
    features: [
      'Investor-ready pitch deck development',
      'Financial model optimization',
      'Investor targeting and outreach strategy',
      'Term sheet negotiation support',
      'Due diligence preparation'
    ],
    deliverables: [
      'Investor Presentation (PDF)',
      'Financial Model (Excel)',
      'Teaser Document',
      'Investor List',
      'Data Room Structure'
    ],
    price: 15000,
    currency: 'USD',
    duration: '4-6 weeks',
    methodology: {
      title: 'Our Approach',
      steps: [
        'Discovery & Current State Assessment',
        'Market Positioning & Narrative Development',
        'Pitch Deck & Materials Creation',
        'Investor Targeting & Outreach Planning',
        'Preparation & Rehearsal'
      ]
    },
    faqs: [
      {
        question: 'What stage companies is this for?',
        answer: 'Our Fundraising Strategy service is designed for Seed to Series B companies looking to raise $1M-$20M.'
      },
      {
        question: 'Do you introduce us to investors?',
        answer: 'Yes, we provide targeted investor lists and can facilitate introductions where appropriate.'
      }
    ],
    meta: {
      title: 'Fundraising Strategy for Growth-Stage Companies | Sarsen Strategy',
      description: 'Expert fundraising strategy consulting for Seed to Series B companies. Pitch deck, financial modeling, and investor targeting.',
      keywords: ['fundraising', 'venture capital', 'pitch deck', 'investor presentation', 'Series A']
    }
  },
  {
    slug: 'pitch-deck-design',
    serviceCode: 'SRV_PITCH_001',
    title: 'Pitch Deck Design',
    subtitle: 'Investor-ready presentations that tell your story',
    description: 'Transform your story into a visually compelling pitch deck that captures investor attention.',
    longDescription: 'Your pitch deck is often the first impression investors have of your company. Our Pitch Deck Design service combines strategic messaging with world-class design to create presentations that stand out. We work with you to distill complex information into clear, impactful slides that communicate your vision and traction effectively.',
    icon: '/images/service-icons/pitch-deck.svg',
    features: [
      'Strategic narrative development',
      'Custom slide design',
      'Data visualization',
      'Investor psychology optimization',
      'Presentation coaching'
    ],
    deliverables: [
      'Complete 15-20 slide deck (PPT + PDF)',
      'One-pager summary',
      'Presentation script',
      'Source files',
      'Revisions (3 rounds)'
    ],
    price: 8000,
    currency: 'USD',
    duration: '2-3 weeks',
    methodology: {
      title: 'Our Process',
      steps: [
        'Content Discovery & Storyboarding',
        'Draft Design & Messaging',
        'Review & Refinement',
        'Final Design & Export',
        'Presentation Coaching'
      ]
    },
    faqs: [
      {
        question: 'Can you work with our existing content?',
        answer: 'Absolutely. We can refine your existing content or help develop new messaging from scratch.'
      },
      {
        question: 'What format do you deliver in?',
        answer: 'We deliver in both PowerPoint (editable) and PDF formats, with all source files included.'
      }
    ],
    meta: {
      title: 'Investor Pitch Deck Design Services | Sarsen Strategy',
      description: 'Professional pitch deck design for startups. Strategic storytelling + world-class design to win investors.',
      keywords: ['pitch deck', 'investor presentation', 'startup pitch', 'deck design', 'venture capital']
    }
  },
  {
    slug: 'gtm-strategy',
    serviceCode: 'SRV_GTM_001',
    title: 'GTM Strategy',
    subtitle: 'Launch and scale with a proven go-to-market plan',
    description: 'Develop a comprehensive go-to-market strategy that drives customer acquisition and revenue growth.',
    longDescription: 'A successful product launch requires more than just a great product. Our GTM Strategy service helps you define your target market, positioning, pricing, and channels to ensure a successful market entry. We create actionable plans that align your sales, marketing, and product teams around a unified strategy.',
    icon: '/images/service-icons/gtm.svg',
    features: [
      'Market segmentation and targeting',
      'Competitive positioning',
      'Pricing strategy',
      'Channel strategy',
      'Launch roadmap'
    ],
    deliverables: [
      'GTM Strategy Document',
      'Competitive Analysis Matrix',
      'Pricing Model',
      'Launch Timeline',
      'Sales Playbook'
    ],
    price: 12000,
    currency: 'USD',
    duration: '3-4 weeks',
    methodology: {
      title: 'Our Framework',
      steps: [
        'Market Analysis & Segmentation',
        'Positioning & Messaging',
        'Pricing & Packaging',
        'Channel & Partnership Strategy',
        'Launch Planning'
      ]
    },
    faqs: [
      {
        question: 'Do you help with execution?',
        answer: 'Yes, we can provide ongoing advisory support during your first 30-60 days of execution.'
      },
      {
        question: 'Is this for B2B or B2C?',
        answer: 'We specialize in B2B GTM strategies, but our framework adapts to B2C as well.'
      }
    ],
    meta: {
      title: 'Go-to-Market Strategy Consulting | Sarsen Strategy',
      description: 'Expert GTM strategy for B2B startups. Market segmentation, positioning, pricing, and launch planning.',
      keywords: ['GTM strategy', 'go to market', 'product launch', 'market entry', 'startup strategy']
    }
  }
]

export const getServiceBySlug = (slug: string): ServiceConfig | undefined => {
  return services.find(service => service.slug === slug)
}

export const getAllServices = (): ServiceConfig[] => {
  return services
}

export const serviceSlugs = services.map(s => s.slug)