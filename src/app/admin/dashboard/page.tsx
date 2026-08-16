'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getAdminToken } from '@/services/cookies';
import { apiRequest } from '@/services/api';
import { OverviewTab } from './overview-tab';
import { ContactsTab } from './contacts-tab';
import { EngagementWorkspaceTab } from './engagement-tab';
import { BlogsTab } from './blogs-tab';
import { SubscribersTab } from './subscribers-tab';
import { CohortsTab } from './cohorts-tab';
import { CouponsTab } from './coupons-tab';
import { LeadsTab } from './leads-tab';
import { AdminNotificationBell } from './AdminNotificationBell';

// ─── API Shape Types ──────────────────────────────────────────────────────────

export interface ApiEngagement {
  _id: string;
  status: 'active' | 'delivered';
  progressPercent: number;
  canDeliver: boolean;
  serviceId: { _id: string; title: string };
  userId: { _id: string; email: string };
  createdAt: string;
  engagementChecklist: {
    stepId: string;
    title: string;
    order: number;
    isCompleted: boolean;
  }[];
}

export interface ApiContact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'ignored';
  notes: { note: string; addedBy: string; addedAt: string }[];
  createdAt: string;
}

export interface ApiSubscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export interface ApiCoupon {
  _id: string;
  code: string;
  price: number;
  serviceId: { _id: string; title: string } | null;
  isActive: boolean;
  expiryDate?: string;
  createdAt: string;
}

export interface ApiService {
  _id: string;
  title: string;
  price: number;
  isActive: boolean;
}

export interface ApiNotification {
  _id: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiFeedback {
  _id: string;
  rating: number;
  comments?: string;
  userId: { email: string };
  engagementId: string;
  createdAt: string;
}

// ── NEW: Blog type — replaces the old local-state-only mock BlogPost ──────
export interface ApiBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tag: string;
  keywords: string[];
  coverImageUrl: string;
  authorName: string;
  authorTitle?: string;
  authorImageUrl?: string;
  authorBio?: string;
  relatedPosts?: { _id: string; title: string; slug: string }[];
  status: 'draft' | 'published';
  publishedAt?: string;
  readTimeMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: string;
  canonicalUrl?: string;
  images: { url: string; altText?: string; order: number }[];
  report?: {
    mockupImageUrl: string;
    name: string;
    description: string;
    authors: string[];
    releaseDate: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ── NEW: Lead types — mirror leadmagnet.service.ts's AdminLeadListItem
// and the ILeadMagnetSubmission shape from leadmagnet.model.ts ────────────
export interface ApiLead {
  clientId: string;
  email: string;
  isViewed: boolean;
  viewedAt?: string;
  lastActivityAt: string;
  submissionCount: number;
  leadMagnetTypes: string[];
  latestSubmission: {
    leadMagnet: string;
    founderName: string;
    companyName: string;
    createdAt: string;
  } | null;
}

export interface ApiLeadSubmission {
  _id: string;
  clientId: string;
  leadMagnet: string;
  founderName: string;
  companyName: string;
  industry: string;
  answers: Record<string, number>;
  result: unknown;
  clientStatusAtSubmission: 'new' | 'existing';
  createdAt: string;
  updatedAt: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const { admin, logoutAdmin, isAuthReady, isAdminLoggedIn } = useAuth();
  const token = getAdminToken();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'contacts' | 'engagements' | 'blogs' | 'subscribers' | 'cohorts' | 'coupons' | 'leads'
  >('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Data state ────────────────────────────────────────────────────────────
  const [engagements, setEngagements] = useState<ApiEngagement[]>([]);
  const [contacts, setContacts] = useState<ApiContact[]>([]);
  const [subscribers, setSubscribers] = useState<ApiSubscriber[]>([]);
  const [coupons, setCoupons] = useState<ApiCoupon[]>([]);
  const [services, setServices] = useState<ApiService[]>([]);
  const [notifications, setNotifications] = useState<ApiNotification[]>([]);
  const [feedback, setFeedback] = useState<ApiFeedback[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  // NEW: blogs state, same pattern as every other module above
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  // NEW: leads badge count only — LeadsTab manages its own full dataset
  // (see leads-tab.tsx) since it needs live server-side search/pagination,
  // unlike the other tabs which get their full list from fetchAll below.
  const [newLeadsCount, setNewLeadsCount] = useState(0);

  // ── Loading / error state ─────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ── Auth guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) router.push('/admin/login');
  }, [token, router]);

  // ── Initial data fetch ────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const [engData, contactData, subData, couponData, serviceData, feedbackData, blogData] =
        await Promise.all([
          apiRequest<{ engagements: ApiEngagement[] }>('GET', '/engagements/admin', { token }),
          apiRequest<{ submissions: ApiContact[] }>('GET', '/contact/admin', { token }),
          apiRequest<{ subscribers: ApiSubscriber[] }>('GET', '/newsletter/admin/subscribers', { token }),
          apiRequest<{ coupons: ApiCoupon[] }>('GET', '/coupons/admin', { token }),
          apiRequest<{ services: ApiService[] }>('GET', '/services', { token }),
          apiRequest<{ feedback: ApiFeedback[] }>('GET', '/feedback/admin', { token }),
          // NEW: fetch blogs alongside everything else
          apiRequest<{ blogs: ApiBlog[] }>('GET', '/blogs/admin', { token }),
        ]);
      setEngagements(engData.engagements ?? []);
      setContacts(contactData.submissions ?? []);
      setSubscribers(subData.subscribers ?? []);
      setCoupons(couponData.coupons ?? []);
      setServices(serviceData.services ?? []);
      setFeedback(feedbackData.feedback ?? []);
      // NEW
      setBlogs(blogData.blogs ?? []);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── NEW: Leads badge count ────────────────────────────────────────────────
  // Lightweight, separate from fetchAll — only fetches `total` for
  // status=new (limit=1 so the payload is tiny), just to drive the sidebar
  // badge. LeadsTab fetches the real list itself when the tab is opened.
  const fetchNewLeadsCount = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiRequest<{ total: number }>(
        'GET', '/leadmagnets/admin?status=new&limit=1', { token }
      );
      setNewLeadsCount(data.total ?? 0);
    } catch { }
  }, [token]);

  useEffect(() => {
    fetchNewLeadsCount();
    const interval = setInterval(fetchNewLeadsCount, 60000);
    return () => clearInterval(interval);
  }, [fetchNewLeadsCount]);

  // ── Notifications ─────────────────────────────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiRequest<{ notifications: ApiNotification[]; unread: number }>(
        'GET', '/notifications/admin', { token }
      );
      setNotifications(data.notifications ?? []);
      setUnreadCount(data.unread ?? 0);
    } catch { }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleMarkNotificationRead = async (id: string) => {
    try {
      await apiRequest('PATCH', `/notifications/${id}/read`, { token: token ?? undefined });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch { }
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  // ── Sidebar badge counts ──────────────────────────────────────────────────
  const newContactCount = contacts.filter(c => c.status === 'new').length;
  const activeEngCount = engagements.filter(e => e.status === 'active').length;
  const activeCouponCount = coupons?.filter(c => c?.isActive)?.length ?? 0;
  // ─────────────────────────────────────────────────────────────────────────
  // AUTH GUARD
  // Wait for the cookie-read to complete before making any routing decision.
  // Without isAuthReady, the redirect fires on the first render when admin is
  // still null (cookies not read yet), logging the admin out on every refresh.
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isAuthReady) return;
    if (!isAdminLoggedIn) router.replace('/admin/login');
  }, [isAuthReady, isAdminLoggedIn, router]);

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <svg className="animate-spin w-8 h-8 text-[#0A1E3D]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (!isAdminLoggedIn) return null;

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside
        className={`bg-[#0A1E3D] text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'
          } flex-shrink-0 flex flex-col h-screen sticky top-0`}
      >
        <div className="p-6 flex items-center justify-between flex-shrink-0">
          {sidebarOpen && <h1 className="text-xl font-semibold truncate">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-900/30 rounded-md transition-colors ml-auto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {sidebarOpen && admin?.email && (
          <div className="px-6 pb-4 -mt-2">
            <p className="text-xs text-blue-300 truncate">{admin.email}</p>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {[
            {
              id: 'overview' as const,
              label: 'Overview',
              badge: null,
              badgeColor: '',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
            },
            {
              id: 'leads' as const,
              label: 'Leads',
              badge: newLeadsCount || null,
              badgeColor: 'bg-green-500',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M9 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
            },
            {
              id: 'contacts' as const,
              label: 'Contact Messages',
              badge: newContactCount || null,
              badgeColor: 'bg-red-500',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
            },
            {
              id: 'engagements' as const,
              label: 'Engagement Workspace',
              badge: activeEngCount || null,
              badgeColor: 'bg-orange-500',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
            },
            {
              id: 'subscribers' as const,
              label: 'Subscribers',
              badge: null,
              badgeColor: '',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
            },
            {
              id: 'coupons' as const,
              label: 'Coupons',
              badge: activeCouponCount || null,
              badgeColor: 'bg-yellow-500',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />,
            },
            {
              id: 'blogs' as const,
              label: 'Blog Posts',
              badge: null,
              badgeColor: '',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
            },
            {
              id: 'cohorts' as const,
              label: 'Cohorts',
              badge: null,
              badgeColor: '',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
            },
          ].map(({ id, label, badge, badgeColor, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === id ? 'bg-blue-600' : 'hover:bg-blue-900/30'
                }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icon}
              </svg>
              {sidebarOpen && (
                <div className="flex items-center justify-between w-full">
                  <span className="truncate">{label}</span>
                  {badge !== null && (
                    <span className={`${badgeColor} text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-1`}>
                      {badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-900/30 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600/20 rounded-md transition-colors text-red-400"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span className="truncate">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar with admin info and bell */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Optional: logo or title */}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{admin?.email}</span>
            <AdminNotificationBell
              notifications={notifications}
              unreadCount={unreadCount}
              onMarkAsRead={handleMarkNotificationRead}
            />
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <svg className="animate-spin w-8 h-8 text-[#0A1E3D]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-8 text-center">
              <p className="text-red-700 mb-4">{error}</p>
              <button onClick={fetchAll} className="px-4 py-2 bg-[#0A1E3D] text-white rounded-md">
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl  text-gray-800 mb-2">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'leads' && 'Leads'}
                  {activeTab === 'contacts' && 'Contact Messages'}
                  {activeTab === 'engagements' && 'Engagement Workspace'}
                  {activeTab === 'blogs' && 'Blog Management'}
                  {activeTab === 'subscribers' && 'Email Subscribers'}
                  {activeTab === 'cohorts' && 'Cohorts Management'}
                  {activeTab === 'coupons' && 'Coupon Management'}
                </h2>
                <p className="text-gray-600">
                  {activeTab === 'overview' && "Welcome back. Here's what's happening today."}
                  {activeTab === 'leads' && 'Browse and triage leads captured across all lead magnets.'}
                  {activeTab === 'contacts' && 'Manage all contact form submissions.'}
                  {activeTab === 'engagements' && 'Manage client engagements, checklist, files, questionnaires, and messages.'}
                  {activeTab === 'blogs' && 'Create, edit, and publish blog posts.'}
                  {activeTab === 'subscribers' && 'View your newsletter subscriber list.'}
                  {activeTab === 'cohorts' && 'View and manage cohorts.'}
                  {activeTab === 'coupons' && 'Create and manage discount coupons.'}
                </p>
              </div>

              {activeTab === 'overview' && (
                <OverviewTab
                  engagements={engagements}
                  contacts={contacts}
                  feedback={feedback}
                  subscribers={subscribers}
                />
              )}
              {activeTab === 'leads' && (
                <LeadsTab
                  token={token ?? ''}
                  onLeadMarkedViewed={() => setNewLeadsCount((c) => Math.max(0, c - 1))}
                />
              )}
              {activeTab === 'contacts' && (
                <ContactsTab
                  contacts={contacts}
                  setContacts={setContacts}
                  token={token ?? ''}
                />
              )}
              {activeTab === 'engagements' && (
                <EngagementWorkspaceTab
                  engagements={engagements}
                  setEngagements={setEngagements}
                  token={token ?? ''}
                  onRefresh={fetchAll}
                />
              )}
              {activeTab === 'subscribers' && (
                <SubscribersTab
                  subscribers={subscribers}
                  setSubscribers={setSubscribers}
                  token={token ?? ''}
                />
              )}
              {activeTab === 'coupons' && (
                <CouponsTab
                  coupons={coupons}
                  setCoupons={setCoupons}
                  services={services}
                  token={token ?? ''}
                />
              )}
              {/* CHANGED: BlogsTab now receives real props instead of rendering with none */}
              {activeTab === 'blogs' && (
                <BlogsTab blogs={blogs} setBlogs={setBlogs} token={token ?? ''} />
              )}
              {activeTab === 'cohorts' && <CohortsTab />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}