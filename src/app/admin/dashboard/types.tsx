// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
  status: 'unread' | 'read' | 'responded';
}

export interface ServiceBooking {
  id: string;
  serviceType: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName?: string;
  formData: Record<string, any>;
  submittedAt: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'scheduled';
  views: number;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  source: string;
}

export type ResourceType = 'pdf' | 'excel' | 'ppt' | 'google-sheet' | 'google-doc' | 'google-slides' | 'website' | 'notion' | 'figma' | 'other';

export interface SharedResource {
  id: string;
  name: string;
  url: string;
  type: ResourceType;
  description?: string;
  sharedAt: string;
  sharedBy: string;
}

export interface QuestionnaireQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio';
  options?: string[];
  required: boolean;
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  questions: QuestionnaireQuestion[];
  sentAt: string;
  status: 'sent' | 'completed';
  response?: Record<string, any>;
}

export interface Message {
  id: string;
  content: string;
  sentAt: string;
  sentBy: 'admin' | 'client';
  read: boolean;
}

export interface Engagement {
  id: string;
  bookingId: string;
  clientName: string;
  serviceType: string;
  resources: SharedResource[];
  questionnaires: Questionnaire[];
  messages: Message[];
  createdAt: string;
}

// Cohort types
export interface Cohort {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  price: number;
  maxSeats: number;
  enrolledCount: number;
  enrolledEmails: string[]; // emails of enrolled participants
  status: 'upcoming' | 'active' | 'ended';
  description?: string;
}

// Coupon types
export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  applicableServices: string[]; // e.g., ['Growth & Revenue Strategy', 'Workshop']
  expiryDate: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
}