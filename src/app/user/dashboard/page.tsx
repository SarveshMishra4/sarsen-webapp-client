'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Notification,
  Questionnaire,
  Resource,
  Message,
} from './types';
import { NotificationBell } from './notification-bell';
import { QuestionnaireModal } from './questionnaire-modal';
import { OverviewTab } from './overview-tab';
import { QuestionnairesTab } from './questionnaires-tab';
import { ResourcesTab } from './resources-tab';
import { MessagesTab } from './messages-tab';

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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab
            user={user}
            questionnaires={questionnaires}
            resources={resources}
            messages={messages}
            onStartQuestionnaire={setSelectedQuestionnaire}
          />
        )}
        {activeTab === 'questionnaires' && (
          <QuestionnairesTab
            questionnaires={questionnaires}
            onStartQuestionnaire={setSelectedQuestionnaire}
          />
        )}
        {activeTab === 'resources' && (
          <ResourcesTab resources={resources} />
        )}
        {activeTab === 'messages' && (
          <MessagesTab
            messages={messages}
            onSendMessage={handleSendMessage}
          />
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