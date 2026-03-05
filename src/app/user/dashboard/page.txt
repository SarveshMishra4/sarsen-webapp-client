// app/user-dashboard/page.tsx - PART 1 OF 3
// User Dashboard with exact Reports page design language
'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, Questionnaire, Resource, Notification } from '../lib/user-types';
// import { getFileIcon, getFileColor, getFileTypeName } from '../lib/file-icons';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// =====================================================
// TYPES AND INTERFACES
// =====================================================
type ResourceType = 'pdf' | 'excel' | 'ppt' | 'google-sheet' | 'google-doc' | 'google-slides' | 'website' | 'notion' | 'figma' | 'other';

interface User {
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

interface Notification {
  id: string;
  type: 'questionnaire' | 'resource' | 'message' | 'general';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}

interface QuestionnaireQuestion {
  id: string;
  question: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'date';
  options?: string[];
  required: boolean;
  placeholder?: string;
  helpText?: string;
}

interface Questionnaire {
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

interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  url: string;
  description?: string;
  sharedBy: string;
  sharedAt: string;
  size?: string;
}

interface Message {
  id: string;
  content: string;
  sentAt: string;
  sentBy: 'admin' | 'client';
  read: boolean;
}

// =====================================================
// HELPER FUNCTIONS FOR FILE ICONS
// =====================================================
const getFileIcon = (type: ResourceType) => {
  switch (type) {
    case 'pdf':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
        </svg>
      );
    case 'excel':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-3.06 16L8 13.53 5.06 18H3.5l3.78-5.5L3.75 7h1.56l2.43 3.89L10.13 7h1.56l-3.53 5.5L11.94 18h-1.5z"/>
        </svg>
      );
    case 'ppt':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm1 11h-4v5H9v-5H5v-2h4V6h2v5h4v2z"/>
        </svg>
      );
    case 'google-sheet':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"/>
        </svg>
      );
    case 'google-doc':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 18v-2h8v2H8zm0-4v-2h8v2H8zm0-4V8h5v2H8z"/>
        </svg>
      );
    case 'google-slides':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-1l5-3-5-3v6z"/>
        </svg>
      );
    case 'website':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      );
    case 'notion':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
        </svg>
      );
    case 'figma':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 2h8v8H8V2zm0 10h8v8H8v-8zM2 12h4v8H2v-8zm12 0h8v8h-8v-8z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
        </svg>
      );
  }
};

const getFileColor = (type: ResourceType): string => {
  switch (type) {
    case 'pdf': return 'from-red-500 to-red-600';
    case 'excel': return 'from-green-500 to-green-600';
    case 'ppt': return 'from-orange-500 to-orange-600';
    case 'google-sheet': return 'from-emerald-500 to-emerald-600';
    case 'google-doc': return 'from-blue-500 to-blue-600';
    case 'google-slides': return 'from-yellow-500 to-yellow-600';
    case 'website': return 'from-purple-500 to-purple-600';
    case 'notion': return 'from-gray-500 to-gray-600';
    case 'figma': return 'from-pink-500 to-pink-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

const getFileTypeName = (type: ResourceType): string => {
  switch (type) {
    case 'pdf': return 'PDF Document';
    case 'excel': return 'Excel Spreadsheet';
    case 'ppt': return 'PowerPoint';
    case 'google-sheet': return 'Google Sheets';
    case 'google-doc': return 'Google Docs';
    case 'google-slides': return 'Google Slides';
    case 'website': return 'Website';
    case 'notion': return 'Notion Page';
    case 'figma': return 'Figma Design';
    case 'other': return 'File';
    default: return 'File';
  }
};

// =====================================================
// SAMPLE DATA - Replace with API calls
// =====================================================
const SAMPLE_USER: User = {
  id: 'user-1',
  email: 'demo@company.com',
  name: 'Demo User',
  phone: '+91 98765 43210',
  companyName: 'Demo Company Pvt Ltd',
  packagePurchased: 'Growth & Revenue Strategy Package',
  purchaseDate: '2024-12-15T10:00:00',
  status: 'active',
  lastLogin: new Date().toISOString()
};

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'questionnaire',
    title: 'New Questionnaire Available',
    message: 'Business Diagnostic Questionnaire has been sent to you',
    createdAt: '2024-12-29T10:00:00',
    read: false,
    actionUrl: '#questionnaires'
  },
  {
    id: 'n2',
    type: 'resource',
    title: 'New Resource Shared',
    message: 'Financial Planning Template.xlsx has been shared with you',
    createdAt: '2024-12-28T15:30:00',
    read: false,
    actionUrl: '#resources'
  },
  {
    id: 'n3',
    type: 'message',
    title: 'Message from Consultant',
    message: 'Your strategy session is scheduled for Jan 5, 2025',
    createdAt: '2024-12-27T09:00:00',
    read: true
  }
];

const SAMPLE_QUESTIONNAIRES: Questionnaire[] = [
  {
    id: 'q1',
    title: 'Business Diagnostic Questionnaire',
    description: 'Comprehensive assessment to understand your business fundamentals and identify key opportunities',
    sentBy: 'Sarah Johnson - Senior Consultant',
    sentAt: '2024-12-29T10:00:00',
    dueDate: '2025-01-05T23:59:59',
    status: 'pending',
    questions: [
      {
        id: 'q1-1',
        type: 'text',
        question: 'What is your current monthly revenue?',
        required: true,
        placeholder: 'e.g., ₹10,00,000'
      },
      {
        id: 'q1-2',
        type: 'textarea',
        question: 'Describe your core business model',
        required: true,
        placeholder: 'Explain how you create and deliver value...'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Market Research Assessment',
    description: 'Deep dive into your market understanding and customer insights',
    sentBy: 'Sarah Johnson - Senior Consultant',
    sentAt: '2024-12-20T14:00:00',
    status: 'completed',
    questions: []
  }
];

const SAMPLE_RESOURCES: Resource[] = [
  {
    id: 'r1',
    name: 'Financial Planning Template',
    type: 'excel',
    url: 'https://docs.google.com/spreadsheets/d/example',
    sharedBy: 'Sarah Johnson',
    sharedAt: '2024-12-28T15:30:00',
    description: 'Use this template to plan your financial projections',
    size: '2.4 MB'
  },
  {
    id: 'r2',
    name: 'Strategy Framework Document',
    type: 'pdf',
    url: 'https://example.com/strategy-framework.pdf',
    sharedBy: 'Sarah Johnson',
    sharedAt: '2024-12-25T10:00:00',
    description: 'Framework for developing your strategic roadmap'
  },
  {
    id: 'r3',
    name: 'Market Analysis Report',
    type: 'ppt',
    url: 'https://example.com/market-analysis.pptx',
    sharedBy: 'Sarah Johnson',
    sharedAt: '2024-12-22T11:00:00',
    description: 'Detailed analysis of your target market'
  },
  {
    id: 'r4',
    name: 'Competitor Tracking Sheet',
    type: 'google-sheet',
    url: 'https://docs.google.com/spreadsheets/d/competitor-tracking',
    sharedBy: 'Sarah Johnson',
    sharedAt: '2024-12-20T09:00:00',
    description: 'Track and analyze your competitors'
  },
  {
    id: 'r5',
    name: 'Industry Insights Blog',
    type: 'website',
    url: 'https://example.com/insights',
    sharedBy: 'Sarah Johnson',
    sharedAt: '2024-12-18T16:00:00',
    description: 'Latest trends and insights in your industry'
  }
];

const SAMPLE_MESSAGES: Message[] = [
  {
    id: 'm1',
    content: 'Welcome to your engagement workspace! I\'ll be your primary consultant. Feel free to reach out with any questions.',
    sentAt: '2024-12-27T09:00:00',
    sentBy: 'admin',
    read: true
  },
  {
    id: 'm2',
    content: 'Thank you! Looking forward to working together.',
    sentAt: '2024-12-27T10:30:00',
    sentBy: 'client',
    read: true
  },
  {
    id: 'm3',
    content: 'I\'ve shared some initial resources with you. Please review the Financial Planning Template and we can discuss it in our next session.',
    sentAt: '2024-12-28T15:30:00',
    sentBy: 'admin',
    read: false
  }
];

// =====================================================
// NOTIFICATION BELL COMPONENT
// =====================================================
const NotificationBell = ({ notifications, onMarkAsRead }: {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[32rem] overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-gray-600">{unreadCount} unread</span>
                )}
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => {
                        onMarkAsRead(notification.id);
                        if (notification.actionUrl) {
                          window.location.hash = notification.actionUrl;
                          setIsOpen(false);
                        }
                      }}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          notification.type === 'questionnaire' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'resource' ? 'bg-green-100 text-green-600' :
                          notification.type === 'message' ? 'bg-purple-100 text-purple-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {notification.type === 'questionnaire' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                          )}
                          {notification.type === 'resource' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                            </svg>
                          )}
                          {notification.type === 'message' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 mb-1">{notification.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  notifications.forEach(n => onMarkAsRead(n.id));
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all as read
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

// CONTINUE TO PART 2...
// app/user-dashboard/page.tsx - PART 2 OF 3
// This continues directly from Part 1

// =====================================================
// QUESTIONNAIRE MODAL COMPONENT
// =====================================================
const QuestionnaireModal = ({ questionnaire, onClose, onSubmit }: {
  questionnaire: Questionnaire;
  onClose: () => void;
  onSubmit: (responses: any) => void;
}) => {
  const [responses, setResponses] = useState<{ [key: string]: any }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 5;
  
  const totalPages = Math.ceil(questionnaire.questions.length / questionsPerPage);
  const currentQuestions = questionnaire.questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultiSelectChange = (questionId: string, option: string) => {
    const currentValues = responses[questionId] || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((v: string) => v !== option)
      : [...currentValues, option];
    setResponses(prev => ({ ...prev, [questionId]: newValues }));
  };

  const handleSubmitQuestionnaire = () => {
    // Validate required fields
    const unanswered = questionnaire.questions.filter(q => 
      q.required && !responses[q.id]
    );

    if (unanswered.length > 0) {
      alert(`Please answer all required questions. ${unanswered.length} remaining.`);
      return;
    }

    onSubmit(responses);
    onClose();
  };

  const completedQuestions = questionnaire.questions.filter(q => responses[q.id]).length;
  const progressPercentage = (completedQuestions / questionnaire.questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E5A8E] to-[#2B7AB8] px-8 py-6 rounded-t-2xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-light text-white mb-2">{questionnaire.title}</h2>
              <p className="text-blue-100 text-sm">{questionnaire.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-white text-sm mb-2">
              <span>Progress: {completedQuestions}/{questionnaire.questions.length} questions</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {currentQuestions.map((question, idx) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <label className="block text-sm font-medium text-gray-800 mb-3">
                  {currentPage * questionsPerPage + idx + 1}. {question.question}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {question.helpText && (
                  <p className="text-xs text-gray-600 mb-3">{question.helpText}</p>
                )}

                {question.type === 'text' && (
                  <input
                    type="text"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {question.type === 'number' && (
                  <input
                    type="number"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {question.type === 'textarea' && (
                  <textarea
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {question.type === 'select' && (
                  <select
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select an option...</option>
                    {question.options?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}

                {question.type === 'radio' && (
                  <div className="space-y-2">
                    {question.options?.map(option => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100 rounded-lg transition-colors">
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={responses[question.id] === option}
                          onChange={(e) => handleResponseChange(question.id, e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'multiselect' && (
                  <div className="space-y-2">
                    {question.options?.map(option => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={(responses[question.id] || []).includes(option)}
                          onChange={() => handleMultiSelectChange(question.id, option)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'date' && (
                  <input
                    type="date"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentPage === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>

            {currentPage < totalPages - 1 ? (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-6 py-3 bg-[#0A1E3D] text-white rounded-lg hover:bg-[#132B47] transition-colors font-medium"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuestionnaire}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Submit Questionnaire
              </button>
            )}
          </div>

          {questionnaire.dueDate && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Due: {new Date(questionnaire.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

// =====================================================
// RESOURCE CARD COMPONENT
// =====================================================
const ResourceCard = ({ resource }: { resource: Resource }) => {
  const handleClick = () => {
    window.open(resource.url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
    >
      <div className="flex flex-col items-center text-center">
        
        {/* Icon */}
        <div className={`w-20 h-20 bg-gradient-to-br ${getFileColor(resource.type)} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {getFileIcon(resource.type)}
        </div>

        {/* Name */}
        <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2">
          {resource.name}
        </h3>

        {/* Type Badge */}
        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full mb-3">
          {getFileTypeName(resource.type)}
        </span>

        {/* Description */}
        {resource.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {resource.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="w-full pt-3 border-t border-gray-200 space-y-1">
          <p className="text-xs text-gray-500">
            Shared by {resource.sharedBy}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(resource.sharedAt).toLocaleDateString()}
          </p>
          {resource.size && (
            <p className="text-xs text-gray-500">{resource.size}</p>
          )}
        </div>

        {/* Action Button */}
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
          <span>Open</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// =====================================================
// MESSAGES SECTION COMPONENT
// =====================================================
const MessagesSection = ({ messages, onSendMessage }: {
  messages: Message[];
  onSendMessage: (content: string) => void;
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage.trim());
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <h3 className="text-lg font-medium text-gray-800">Messages</h3>
        <p className="text-sm text-gray-600">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length > 0 ? (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sentBy === 'client' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.sentBy === 'client'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <div className={`flex items-center gap-2 mt-2 text-xs ${
                    message.sentBy === 'client' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span>{new Date(message.sentAt).toLocaleString()}</span>
                    {message.sentBy === 'client' && (
                      <>
                        <span>•</span>
                        <span>{message.read ? 'Read' : 'Sent'}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">No messages yet</p>
              <p className="text-xs text-gray-400 mt-1">Start the conversation below</p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="flex gap-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={2}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="hidden sm:inline">Send</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>

    </div>
  );
};

// CONTINUE TO PART 3...
// app/user-dashboard/page.tsx - PART 3 OF 3 (FINAL ASSEMBLY)
// This continues directly from Part 2

// =====================================================
// MAIN USER DASHBOARD COMPONENT
// =====================================================
// export default function UserDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<User>(SAMPLE_USER);
//   const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
//   const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>(SAMPLE_QUESTIONNAIRES);
//   const [resources, setResources] = useState<Resource[]>(SAMPLE_RESOURCES);
//   const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);

//   // Check authentication
//   useEffect(() => {
//     const session = localStorage.getItem('userSession');
//     if (!session) {
//       router.push('/login');
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('userSession');
//     router.push('/login');
//   };

//   const handleMarkNotificationAsRead = (id: string) => {
//     setNotifications(prev =>
//       prev.map(n => n.id === id ? { ...n, read: true } : n)
//     );
//   };

//   const handleQuestionnaireSubmit = (questionnaireId: string, responses: any) => {
//     setQuestionnaires(prev =>
//       prev.map(q => q.id === questionnaireId ? {
//         ...q,
//         status: 'completed' as const,
//         responses: {
//           questionnaireId,
//           userId: user.id,
//           responses,
//           submittedAt: new Date().toISOString(),
//           completedPercentage: 100
//         }
//       } : q)
//     );
//     alert('Questionnaire submitted successfully!');
//   };

//   return (
//     <div className="min-h-screen bg-[#d4dce5]">
      
//       {/* HEADER */}
//       <header className="bg-[#0A1E3D] text-white shadow-lg sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
            
//             {/* Logo & User Info */}
//             <div className="flex items-center gap-6">
//               <h1 className="text-2xl font-light">Sarsen Strategy Partners</h1>
//               <div className="hidden md:block h-8 w-px bg-white/20"></div>
//               <div className="hidden md:block">
//                 <p className="text-sm text-blue-200">Welcome back,</p>
//                 <p className="font-medium">{user.name}</p>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-4">
//               <NotificationBell 
//                 notifications={notifications}
//                 onMarkAsRead={handleMarkNotificationAsRead}
//               />
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Welcome Section */}
//         <div className="bg-gradient-to-r from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 mb-8 text-white">
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h2 className="text-3xl font-light mb-4">Welcome to Your Dashboard</h2>
//               <p className="text-blue-100 mb-6">
//                 Track your progress, complete questionnaires, and access all shared resources in one place.
//               </p>
//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
//                   </svg>
//                   <span>Package: {user.packagePurchased}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
//                   </svg>
//                   <span>Started: {new Date(user.purchaseDate).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
//                   </svg>
//                   <span>Status: Active</span>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                 <p className="text-3xl font-light mb-1">
//                   {questionnaires.filter(q => q.status === 'completed').length}
//                 </p>
//                 <p className="text-sm text-blue-100">Completed</p>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                 <p className="text-3xl font-light mb-1">
//                   {questionnaires.filter(q => q.status === 'pending').length}
//                 </p>
//                 <p className="text-sm text-blue-100">Pending</p>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                 <p className="text-3xl font-light mb-1">{resources.length}</p>
//                 <p className="text-sm text-blue-100">Resources</p>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                 <p className="text-3xl font-light mb-1">
//                   {notifications.filter(n => !n.read).length}
//                 </p>
//                 <p className="text-sm text-blue-100">New Updates</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Questionnaires Section */}
//         <section id="questionnaires" className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-light text-gray-800">Your Questionnaires</h2>
//             <span className="text-sm text-gray-600">
//               {questionnaires.filter(q => q.status === 'pending').length} pending
//             </span>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {questionnaires.map((questionnaire) => (
//               <div
//                 key={questionnaire.id}
//                 className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <h3 className="text-lg font-medium text-gray-800 mb-2">
//                       {questionnaire.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 mb-3">
//                       {questionnaire.description}
//                     </p>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     questionnaire.status === 'completed' ? 'bg-green-100 text-green-700' :
//                     questionnaire.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
//                     'bg-orange-100 text-orange-700'
//                   }`}>
//                     {questionnaire.status === 'in-progress' ? 'In Progress' :
//                      questionnaire.status.charAt(0).toUpperCase() + questionnaire.status.slice(1)}
//                   </span>
//                 </div>

//                 <div className="space-y-2 mb-4 text-sm text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z"/>
//                     </svg>
//                     <span>Sent by {questionnaire.sentBy}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
//                     </svg>
//                     <span>Sent {new Date(questionnaire.sentAt).toLocaleDateString()}</span>
//                   </div>
//                   {questionnaire.dueDate && (
//                     <div className="flex items-center gap-2">
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
//                       </svg>
//                       <span>Due {new Date(questionnaire.dueDate).toLocaleDateString()}</span>
//                     </div>
//                   )}
//                 </div>

//                 {questionnaire.status === 'completed' ? (
//                   <button
//                     disabled
//                     className="w-full bg-green-100 text-green-700 py-3 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
//                     </svg>
//                     <span>Completed</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => setSelectedQuestionnaire(questionnaire)}
//                     className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group"
//                   >
//                     <span>{questionnaire.status === 'in-progress' ? 'Continue' : 'Start'} Questionnaire</span>
//                     <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           {questionnaires.length === 0 && (
//             <div className="bg-white rounded-xl p-12 text-center">
//               <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <p className="text-gray-600">No questionnaires available yet</p>
//             </div>
//           )}
//         </section>

//         {/* Resources Section */}
//         <section id="resources">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-light text-gray-800">Shared Resources</h2>
//             <span className="text-sm text-gray-600">{resources.length} files</span>
//           </div>

//           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {resources.map((resource) => (
//               <ResourceCard key={resource.id} resource={resource} />
//             ))}
//           </div>

//           {resources.length === 0 && (
//             <div className="bg-white rounded-xl p-12 text-center">
//               <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//               <p className="text-gray-600">No resources shared yet</p>
//             </div>
//           )}
//         </section>

//       </main>

//       {/* Questionnaire Modal */}
//       {selectedQuestionnaire && (
//         <QuestionnaireModal
//           questionnaire={selectedQuestionnaire}
//           onClose={() => setSelectedQuestionnaire(null)}
//           onSubmit={(responses) => handleQuestionnaireSubmit(selectedQuestionnaire.id, responses)}
//         />
//       )}

//     </div>
//   );
// }
// app/user-dashboard/page.tsx - PART 3 OF 3 (FINAL ASSEMBLY)
// This continues directly from Part 2

// =====================================================
// MAIN USER DASHBOARD COMPONENT
// =====================================================
export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User>(SAMPLE_USER);
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>(SAMPLE_QUESTIONNAIRES);
  const [resources, setResources] = useState<Resource[]>(SAMPLE_RESOURCES);
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'questionnaires' | 'resources' | 'messages'>('overview');

  // Check authentication
  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    router.push('/login');
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleQuestionnaireSubmit = (questionnaireId: string, responses: any) => {
    setQuestionnaires(prev =>
      prev.map(q => q.id === questionnaireId ? {
        ...q,
        status: 'completed' as const,
        response: responses
      } : q)
    );
    
    // Add notification
    setNotifications(prev => [{
      id: `n-${Date.now()}`,
      type: 'general',
      title: 'Questionnaire Submitted',
      message: `Your response to "${questionnaires.find(q => q.id === questionnaireId)?.title}" has been submitted successfully.`,
      createdAt: new Date().toISOString(),
      read: false
    }, ...prev]);

    alert('Questionnaire submitted successfully!');
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      content,
      sentAt: new Date().toISOString(),
      sentBy: 'client',
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const unreadMessages = messages.filter(m => m.sentBy === 'admin' && !m.read).length;

  return (
    <div className="min-h-screen bg-[#d4dce5]">
      
      {/* HEADER */}
      <header className="bg-[#0A1E3D] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo & User Info */}
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-light">Sarsen Strategy Partners</h1>
              <div className="hidden md:block h-8 w-px bg-white/20"></div>
              <div className="hidden md:block">
                <p className="text-sm text-blue-200">Welcome back,</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <NotificationBell 
                notifications={notifications}
                onMarkAsRead={handleMarkNotificationAsRead}
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 mb-8 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-light mb-4">Welcome to Your Dashboard</h2>
              <p className="text-blue-100 mb-6">
                Track your progress, complete questionnaires, access shared resources, and communicate with your consultant.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <span>Package: {user.packagePurchased}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <span>Started: {new Date(user.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <span>Status: Active</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-light mb-1">
                  {questionnaires.filter(q => q.status === 'completed').length}
                </p>
                <p className="text-sm text-blue-100">Completed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-light mb-1">
                  {questionnaires.filter(q => q.status === 'pending').length}
                </p>
                <p className="text-sm text-blue-100">Pending</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-light mb-1">{resources.length}</p>
                <p className="text-sm text-blue-100">Resources</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-light mb-1">{unreadMessages}</p>
                <p className="text-sm text-blue-100">New Messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#0A1E3D] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('questionnaires')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors relative ${
                activeTab === 'questionnaires'
                  ? 'bg-[#0A1E3D] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Questionnaires
              {questionnaires.filter(q => q.status === 'pending').length > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {questionnaires.filter(q => q.status === 'pending').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'resources'
                  ? 'bg-[#0A1E3D] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors relative ${
                activeTab === 'messages'
                  ? 'bg-[#0A1E3D] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Messages
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-gray-800">{questionnaires.length}</p>
                    <p className="text-sm text-gray-600">Total Questionnaires</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-gray-800">{resources.length}</p>
                    <p className="text-sm text-gray-600">Shared Resources</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-gray-800">{messages.length}</p>
                    <p className="text-sm text-gray-600">Messages Exchanged</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Pending Questionnaires */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Pending Questionnaires</h3>
                <div className="space-y-3">
                  {questionnaires.filter(q => q.status === 'pending').slice(0, 3).map((q) => (
                    <div key={q.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-gray-800 mb-1">{q.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">{q.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {q.dueDate && `Due: ${new Date(q.dueDate).toLocaleDateString()}`}
                        </span>
                        <button
                          onClick={() => setSelectedQuestionnaire(q)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Start →
                        </button>
                      </div>
                    </div>
                  ))}
                  {questionnaires.filter(q => q.status === 'pending').length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No pending questionnaires</p>
                  )}
                </div>
              </div>

              {/* Recent Resources */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Resources</h3>
                <div className="space-y-3">
                  {resources.slice(0, 3).map((r) => (
                    <div 
                      key={r.id} 
                      onClick={() => window.open(r.url, '_blank')}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${getFileColor(r.type)} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                          <div className="scale-50">
                            {getFileIcon(r.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">{r.name}</h4>
                          <p className="text-xs text-gray-500">{getFileTypeName(r.type)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {resources.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No resources shared yet</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* QUESTIONNAIRES TAB */}
        {activeTab === 'questionnaires' && (
          <section id="questionnaires">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-gray-800">Your Questionnaires</h2>
              <span className="text-sm text-gray-600">
                {questionnaires.filter(q => q.status === 'pending').length} pending
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {questionnaires.map((questionnaire) => (
                <div
                  key={questionnaire.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {questionnaire.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {questionnaire.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      questionnaire.status === 'completed' ? 'bg-green-100 text-green-700' :
                      questionnaire.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {questionnaire.status === 'in-progress' ? 'In Progress' :
                       questionnaire.status.charAt(0).toUpperCase() + questionnaire.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    {questionnaire.sentBy && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z"/>
                        </svg>
                        <span>Sent by {questionnaire.sentBy}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <span>Sent {new Date(questionnaire.sentAt).toLocaleDateString()}</span>
                    </div>
                    {questionnaire.dueDate && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                        </svg>
                        <span>Due {new Date(questionnaire.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {questionnaire.status === 'completed' ? (
                    <button
                      disabled
                      className="w-full bg-green-100 text-green-700 py-3 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <span>Completed</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedQuestionnaire(questionnaire)}
                      className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group"
                    >
                      <span>{questionnaire.status === 'in-progress' ? 'Continue' : 'Start'} Questionnaire</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {questionnaires.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600">No questionnaires available yet</p>
              </div>
            )}
          </section>
        )}

        {/* RESOURCES TAB */}
        {activeTab === 'resources' && (
          <section id="resources">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-gray-800">Shared Resources</h2>
              <span className="text-sm text-gray-600">{resources.length} files</span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {resources.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600">No resources shared yet</p>
              </div>
            )}
          </section>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <section id="messages">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-gray-800">Messages</h2>
              <span className="text-sm text-gray-600">
                {unreadMessages} unread
              </span>
            </div>

            <MessagesSection 
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </section>
        )}

      </main>

      {/* Questionnaire Modal */}
      {selectedQuestionnaire && (
        <QuestionnaireModal
          questionnaire={selectedQuestionnaire}
          onClose={() => setSelectedQuestionnaire(null)}
          onSubmit={(responses) => handleQuestionnaireSubmit(selectedQuestionnaire.id, responses)}
        />
      )}

    </div>
  );
}