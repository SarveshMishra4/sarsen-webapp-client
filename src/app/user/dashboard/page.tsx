'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/services/api';
import { getUserToken } from '@/services/cookies';
import { useAuth } from '../../context/AuthContext';
import { NotificationBell } from './notification-bell';
import { QuestionnaireModal } from './questionnaire-modal';
import { OverviewTab } from './overview-tab';
import { QuestionnairesTab } from './questionnaires-tab';
import { ResourcesTab } from './resources-tab';
import { MessagesTab } from './messages-tab';

// ─── Backend Shape Types ──────────────────────────────────────────────────────
// These interfaces define the expected structure of data returned from your API.

interface EngagementSummary {
  _id: string;
  status: 'active' | 'delivered';
  progressPercent: number;
  canDeliver: boolean;
  serviceId: {
    title: string;
    type: string;
  };
  createdAt: string;
}

interface ChecklistStep {
  stepId: string;
  title: string;
  order: number;
  isCompleted: boolean;
}

interface EngagementDetail {
  _id: string;
  status: 'active' | 'delivered';
  progressPercent: number;
  canDeliver: boolean;
  engagementChecklist: ChecklistStep[];
  serviceId: { title: string };
  createdAt: string;
}

interface ApiMessage {
  _id: string;
  content: string;
  senderRole: 'admin' | 'user';
  createdAt: string;
}

interface ApiFile {
  _id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
}

interface ApiQuestionnaire {
  _id: string;
  title: string;
  deadline?: string;
  isSubmitted: boolean;
  questions: { _id: string; text: string; order: number }[];
  answers: { questionId: string; answerText: string }[];
}

interface ApiNotification {
  _id: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// ─── Engagement Card Component ────────────────────────────────────────────────
// Renders individual engagement summaries in the main list view.

function EngagementCard({
  engagement,
  onClick,
}: {
  engagement: EngagementSummary;
  onClick: () => void;
}) {
  const isDelivered = engagement.status === 'delivered';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
    >
      {/* Title and Status Badge */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-medium text-gray-800">
          {engagement.serviceId?.title ?? 'Engagement'}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isDelivered
              ? 'bg-gray-100 text-gray-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {isDelivered ? 'Delivered' : 'Active'}
        </span>
      </div>

      {/* Date and Progress Bar */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
          </svg>
          <span>
            Started: {new Date(engagement.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Progress</span>
            <span>{Math.round(engagement.progressPercent)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#0A1E3D] rounded-full h-2 transition-all"
              style={{ width: `${engagement.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Indicator */}
      <div className="flex items-center justify-end text-blue-600 gap-1 group-hover:gap-2 transition-all">
        <span className="text-sm font-medium">
          {isDelivered ? 'View' : 'Continue'}
        </span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Dashboard Component ─────────────────────────────────────────────────

export default function UserDashboard() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  // ── List View State ──
  const [engagements,     setEngagements]     = useState<EngagementSummary[]>([]);
  const [listLoading,     setListLoading]     = useState(true);
  const [listError,       setListError]       = useState('');

  // ── Detail View State ──
  const [selected,        setSelected]        = useState<EngagementDetail | null>(null);
  const [detailLoading,   setDetailLoading]   = useState(false);
  const [activeTab,       setActiveTab]       = useState<'overview' | 'questionnaires' | 'resources' | 'messages'>('overview');

  // ── Tab Data State ──
  const [messages,        setMessages]        = useState<ApiMessage[]>([]);
  const [files,           setFiles]           = useState<ApiFile[]>([]);
  const [questionnaires,  setQuestionnaires]  = useState<ApiQuestionnaire[]>([]);
  const [notifications,   setNotifications]   = useState<ApiNotification[]>([]);
  const [unreadCount,     setUnreadCount]     = useState(0);

  // ── Questionnaire Modal State ──
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<ApiQuestionnaire | null>(null);

  const token = getUserToken();

  // ── Fetch Engagement List ─────────────────────────────────────────────────
  const fetchEngagements = useCallback(async () => {
    setListLoading(true);
    setListError('');
    try {
      const data = await apiRequest<{ engagements: EngagementSummary[] }>(
        'GET', '/engagements', { token: token ?? undefined }
      );
      setEngagements(data.engagements ?? []);
    } catch (err: any) {
      setListError(err.message ?? 'Failed to load engagements.');
    } finally {
      setListLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchEngagements();
  }, [fetchEngagements]);

  // ── Fetch Notifications ───────────────────────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    try {
      const data = await apiRequest<{ notifications: ApiNotification[]; unread: number }>(
        'GET', '/notifications', { token: token ?? undefined }
      );
      setNotifications(data.notifications ?? []);
      setUnreadCount(data.unread ?? 0);
    } catch {}
  }, [token]);

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // ── Open Engagement Detail ────────────────────────────────────────────────
  // Fetches comprehensive data for a single engagement when clicked.
  const openEngagement = async (id: string) => {
    setDetailLoading(true);
    setSelected(null);
    setActiveTab('overview');
    try {
      const [detail, msgData, fileData, qData] = await Promise.all([
        apiRequest<EngagementDetail>('GET', `/engagements/${id}`, { token: token ?? undefined }),
        apiRequest<{ messages: ApiMessage[] }>('GET', `/engagements/${id}/messages`, { token: token ?? undefined }),
        apiRequest<{ files: ApiFile[] }>('GET', `/engagements/${id}/files`, { token: token ?? undefined }),
        apiRequest<{ questionnaires: ApiQuestionnaire[] }>('GET', `/engagements/${id}/questionnaires`, { token: token ?? undefined }),
      ]);
      setSelected(detail);
      setMessages(msgData.messages ?? []);
      setFiles(fileData.files ?? []);
      setQuestionnaires(qData.questionnaires ?? []);
    } catch (err: any) {
      setListError(err.message ?? 'Failed to load engagement.');
    } finally {
      setDetailLoading(false);
    }
  };

  // ── Send Message ──────────────────────────────────────────────────────────
  const handleSendMessage = async (content: string) => {
    if (!selected) return;
    try {
      await apiRequest('POST', `/engagements/${selected._id}/messages`, {
        body: { content },
        token: token ?? undefined,
      });
      // Refresh messages list after successfully sending
      const data = await apiRequest<{ messages: ApiMessage[] }>(
        'GET', `/engagements/${selected._id}/messages`, { token: token ?? undefined }
      );
      setMessages(data.messages ?? []);
    } catch (err: any) {
      alert(err.message ?? 'Failed to send message.');
    }
  };

  // ── Submit Questionnaire ──────────────────────────────────────────────────
  const handleQuestionnaireSubmit = async (
    questionnaireId: string,
    answers: { questionId: string; answerText: string }[]
  ) => {
    try {
      await apiRequest('POST', `/questionnaires/${questionnaireId}/submit`, {
        body: { answers },
        token: token ?? undefined,
      });
      
      // Refresh questionnaires list after submission
      if (selected) {
        const data = await apiRequest<{ questionnaires: ApiQuestionnaire[] }>(
          'GET', `/engagements/${selected._id}/questionnaires`, { token: token ?? undefined }
        );
        setQuestionnaires(data.questionnaires ?? []);
      }
      setSelectedQuestionnaire(null); // Close modal
    } catch (err: any) {
      alert(err.message ?? 'Failed to submit questionnaire.');
    }
  };

  // ── Mark Notification as Read ─────────────────────────────────────────────
  const handleMarkNotificationRead = async (id: string) => {
    try {
      await apiRequest('PATCH', `/notifications/${id}/read`, {
        token: token ?? undefined,
      });
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch {}
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    logoutUser();
    router.push('/login'); // Fixed redirect to point to generic /login or /user/login as per your route structure
  };

  // ── Back to List ──────────────────────────────────────────────────────────
  const handleBack = () => {
    setSelected(null);
    setMessages([]);
    setFiles([]);
    setQuestionnaires([]);
    fetchEngagements(); // Refresh in case progress changed while viewing
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#d4dce5]">

      {/* HEADER */}
      <header className="bg-[#0A1E3D] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-light">Sarsen Strategy Partners</h1>
              <div className="hidden md:block h-8 w-px bg-white/20" />
              <div className="hidden md:block">
                <p className="text-sm text-blue-200">Welcome back,</p>
                <p className="font-medium">{user?.email ?? ''}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <NotificationBell
                notifications={notifications.map(n => ({
                  id:        n._id,
                  type:      n.type as any,
                  title:     n.type,
                  message:   n.message,
                  createdAt: n.createdAt,
                  read:      n.isRead,
                }))}
                onMarkAsRead={handleMarkNotificationRead}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── LIST VIEW ── */}
        {!selected && !detailLoading && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-800 mb-2">Your Engagements</h2>
              <p className="text-gray-600">Select an engagement to view details and continue working.</p>
            </div>

            {listLoading ? (
              <div className="flex items-center justify-center py-24">
                <svg className="animate-spin w-8 h-8 text-[#0A1E3D]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            ) : listError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <p className="text-red-700 mb-4">{listError}</p>
                <button
                  onClick={fetchEngagements}
                  className="px-4 py-2 bg-[#0A1E3D] text-white rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : engagements.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-600">No engagements found. Please contact support.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {engagements.map(eng => (
                  <EngagementCard
                    key={eng._id}
                    engagement={eng}
                    onClick={() => openEngagement(eng._id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── LOADING DETAIL ── */}
        {detailLoading && (
          <div className="flex items-center justify-center py-24">
            <svg className="animate-spin w-8 h-8 text-[#0A1E3D]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}

        {/* ── DETAIL VIEW ── */}
        {selected && !detailLoading && (
          <>
            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to engagements
            </button>

            {/* Welcome / Status Banner */}
            <div className="bg-gradient-to-r from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 mb-8 text-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-light mb-2">
                    {selected.serviceId?.title}
                  </h2>
                  {selected.status === 'delivered' && (
                    <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-lg px-3 py-1 mb-4">
                      <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <span className="text-green-300 text-sm font-medium">Project Delivered</span>
                    </div>
                  )}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-sm text-blue-200 mb-1">
                      <span>Overall Progress</span>
                      <span>{Math.round(selected.progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all"
                        style={{ width: `${selected.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-3xl font-light mb-1">
                      {questionnaires.filter(q => q.isSubmitted).length}
                    </p>
                    <p className="text-sm text-blue-100">Questionnaires Done</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-3xl font-light mb-1">
                      {questionnaires.filter(q => !q.isSubmitted).length}
                    </p>
                    <p className="text-sm text-blue-100">Pending</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-3xl font-light mb-1">{files.length}</p>
                    <p className="text-sm text-blue-100">Files Shared</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-3xl font-light mb-1">
                      {messages.filter(m => m.senderRole === 'admin').length}
                    </p>
                    <p className="text-sm text-blue-100">Messages</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
              <div className="flex gap-2 flex-wrap">
                {(['overview', 'questionnaires', 'resources', 'messages'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors relative capitalize ${
                      activeTab === tab
                        ? 'bg-[#0A1E3D] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                    {tab === 'questionnaires' && questionnaires.filter(q => !q.isSubmitted).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {questionnaires.filter(q => !q.isSubmitted).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <OverviewTab
                user={{ 
                  id: user?._id ?? '',
                  email: user?.email ?? '',
                  name: user?.email ?? '',
                  packagePurchased: selected.serviceId?.title ?? '',
                  purchaseDate: selected.createdAt,
                  // FIXED: Changed 'completed' to 'inactive' to match the expected interface
                  status: selected.status === 'delivered' ? 'inactive' : 'active',
                  lastLogin: new Date().toISOString(),
                }}
                questionnaires={questionnaires.map(q => ({
                  id: q._id,
                  title: q.title,
                  description: '',
                  sentBy: 'Consultant',
                  sentAt: '',
                  status: q.isSubmitted ? 'completed' : 'pending',
                  questions: q.questions.map(qn => ({
                    id: qn._id,
                    type: 'textarea' as const,
                    question: qn.text,
                    required: true,
                  })),
                }))}
                resources={files.map(f => ({
                  id: f._id,
                  name: f.fileName,
                  type: f.fileType as any,
                  url: f.fileUrl,
                  sharedBy: 'Consultant',
                  sharedAt: f.createdAt,
                }))}
                messages={messages.map(m => ({
                  id: m._id,
                  content: m.content,
                  sentAt: m.createdAt,
                  sentBy: m.senderRole === 'admin' ? 'admin' : 'client',
                  read: true,
                }))}
                onStartQuestionnaire={(q: any) => {
                  const match = questionnaires.find(aq => aq._id === q.id);
                  if (match) setSelectedQuestionnaire(match);
                }}
              />
            )}

            {activeTab === 'questionnaires' && (
              <QuestionnairesTab
                questionnaires={questionnaires.map(q => ({
                  id: q._id,
                  title: q.title,
                  description: q.deadline ? `Due: ${new Date(q.deadline).toLocaleDateString()}` : '',
                  sentBy: 'Consultant',
                  sentAt: '',
                  dueDate: q.deadline,
                  status: q.isSubmitted ? 'completed' : 'pending',
                  questions: q.questions.map(qn => ({
                    id: qn._id,
                    type: 'textarea' as const,
                    question: qn.text,
                    required: true,
                  })),
                }))}
                onStartQuestionnaire={(q: any) => {
                  const match = questionnaires.find(aq => aq._id === q.id);
                  if (match) setSelectedQuestionnaire(match);
                }}
              />
            )}

            {activeTab === 'resources' && (
              <ResourcesTab
                resources={files.map(f => ({
                  id: f._id,
                  name: f.fileName,
                  type: f.fileType as any,
                  url: f.fileUrl,
                  sharedBy: 'Consultant',
                  sharedAt: f.createdAt,
                }))}
              />
            )}

            {activeTab === 'messages' && (
              <MessagesTab
                messages={messages.map(m => ({
                  id: m._id,
                  content: m.content,
                  sentAt: m.createdAt,
                  sentBy: m.senderRole === 'admin' ? 'admin' : 'client',
                  read: true,
                }))}
                onSendMessage={handleSendMessage}
                // FIXED: Property included. Remember to add `isLocked?: boolean` to MessagesTabProps in your messages-tab.tsx file!
                isLocked={selected.status === 'delivered'} 
              />
            )}
          </>
        )}
      </main>

      {/* Questionnaire Form Modal */}
      {selectedQuestionnaire && (
        <QuestionnaireModal
          questionnaire={{
            id: selectedQuestionnaire._id,
            title: selectedQuestionnaire.title,
            description: selectedQuestionnaire.deadline
              ? `Due: ${new Date(selectedQuestionnaire.deadline).toLocaleDateString()}`
              : '',
            sentBy: 'Consultant',
            sentAt: '',
            status: selectedQuestionnaire.isSubmitted ? 'completed' : 'pending',
            questions: selectedQuestionnaire.questions.map(q => ({
              id: q._id,
              type: 'textarea' as const,
              question: q.text,
              required: true,
            })),
          }}
          onClose={() => setSelectedQuestionnaire(null)}
          onSubmit={(responses: any) => {
            const answers = selectedQuestionnaire.questions.map(q => ({
              questionId:  q._id,
              answerText:  responses[q._id] ?? '',
            }));
            handleQuestionnaireSubmit(selectedQuestionnaire._id, answers);
          }}
        />
      )}
    </div>
  );
}