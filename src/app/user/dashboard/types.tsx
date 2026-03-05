export type ResourceType = 'pdf' | 'excel' | 'ppt' | 'google-sheet' | 'google-doc' | 'google-slides' | 'website' | 'notion' | 'figma' | 'other';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  companyName?: string;
  packagePurchased: string;
  purchaseDate: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface Notification {
  id: string;
  type: 'questionnaire' | 'resource' | 'message' | 'general';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}

export interface QuestionnaireQuestion {
  id: string;
  question: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'date';
  options?: string[];
  required: boolean;
  placeholder?: string;
  helpText?: string;
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  questions: QuestionnaireQuestion[];
  sentAt: string;
  sentBy?: string;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'completed';
  response?: Record<string, any>;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  url: string;
  description?: string;
  sharedBy: string;
  sharedAt: string;
  size?: string;
}

export interface Message {
  id: string;
  content: string;
  sentAt: string;
  sentBy: 'admin' | 'client';
  read: boolean;
}