'use client';

import React, { useState } from 'react';
import {
  ContactMessage,
  ServiceBooking,
  BlogPost,
  Subscriber,
  Engagement,
  Cohort,
  Coupon,
} from './types';
import { OverviewTab } from './overview-tab';
import { ContactsTab } from './contacts-tab';
import { EngagementWorkspaceTab } from './engagement-tab';
import { BlogsTab } from './blogs-tab';
import { SubscribersTab } from './subscribers-tab';
import { CohortsTab } from './cohorts-tab';
import { CouponsTab } from './coupons-tab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'bookings' | 'blogs' | 'subscribers' | 'cohorts' | 'coupons'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample data - Replace with actual API calls
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      message: 'I need help with my startup strategy...',
      submittedAt: '2024-12-29T10:30:00',
      status: 'unread',
    },
  ]);

  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>([
    {
      id: '1',
      serviceType: 'Growth & Revenue Strategy',
      clientName: 'Jane Smith',
      clientEmail: 'jane@company.com',
      clientPhone: '+91 98765 43211',
      companyName: 'TechStartup Inc.',
      formData: {
        currentRevenue: '50L-1Cr',
        targetRevenue: '5Cr+',
        timeline: '12 months',
        challenges: 'Customer acquisition cost too high',
      },
      submittedAt: '2024-12-29T09:15:00',
      status: 'pending',
    },
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Sample Blog Post',
      slug: 'sample-blog-post',
      content: '',
      excerpt: 'This is a sample blog post',
      author: 'Admin',
      category: 'Strategy',
      tags: ['startup', 'strategy'],
      publishedAt: '2024-12-29T12:00:00',
      status: 'draft',
      views: 0,
    },
  ]);

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: '1',
      email: 'subscriber@example.com',
      subscribedAt: '2024-12-20T14:30:00',
      status: 'active',
      source: 'Homepage',
    },
  ]);

  // Engagement data
  const [engagements, setEngagements] = useState<Engagement[]>([
    {
      id: '1',
      bookingId: '1',
      clientName: 'Jane Smith',
      serviceType: 'Growth & Revenue Strategy',
      resources: [],
      questionnaires: [],
      messages: [],
      createdAt: '2024-12-29T09:15:00',
    },
  ]);

  // Cohorts data
  const [cohorts, setCohorts] = useState<Cohort[]>([
    {
      id: '1',
      name: 'Growth Strategy Q2',
      startDate: '2025-04-01',
      endDate: '2025-06-30',
      price: 4999,
      maxSeats: 20,
      enrolledCount: 12,
      enrolledEmails: ['alice@example.com', 'bob@example.com', 'charlie@example.com'],
      status: 'upcoming',
      description: 'Intensive 3-month program on growth strategies.',
    },
    {
      id: '2',
      name: 'Revenue Acceleration',
      startDate: '2025-05-15',
      endDate: '2025-08-15',
      price: 5999,
      maxSeats: 15,
      enrolledCount: 5,
      enrolledEmails: ['david@example.com', 'eve@example.com'],
      status: 'upcoming',
      description: 'Focus on revenue operations and scaling.',
    },
  ]);

  // Coupons data
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      code: 'EARLY10',
      discountPercentage: 10,
      applicableServices: ['Growth & Revenue Strategy', 'Workshop'],
      expiryDate: '2025-12-31',
      maxUses: 50,
      currentUses: 12,
      isActive: true,
    },
    {
      id: '2',
      code: 'FLAT20',
      discountPercentage: 20,
      applicableServices: ['ALL'],
      expiryDate: '2025-06-30',
      maxUses: 100,
      currentUses: 35,
      isActive: true,
    },
  ]);

  // List of available service names for coupon filtering
  const availableServices = Array.from(new Set(serviceBookings.map(b => b.serviceType)));

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside
        className={`bg-[#0A1E3D] text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex-shrink-0 flex flex-col h-screen sticky top-0`}
      >
        {/* Logo and Toggle */}
        <div className="p-6 flex items-center justify-between flex-shrink-0">
          {sidebarOpen && <h1 className="text-xl font-semibold truncate">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-900/30 rounded-lg transition-colors ml-auto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation - scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-blue-600' : 'hover:bg-blue-900/30'
            }`}
            title={!sidebarOpen ? 'Overview' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {sidebarOpen && <span className="truncate">Overview</span>}
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'contacts' ? 'bg-blue-600' : 'hover:bg-blue-900/30'
            }`}
            title={!sidebarOpen ? 'Contact Messages' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <span className="truncate">Contact Messages</span>
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-1">
                  {contactMessages.filter((m) => m.status === 'unread').length}
                </span>
              </div>
            )}
            {!sidebarOpen && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full absolute left-12 top-1/2 -translate-y-1/2">
                {contactMessages.filter((m) => m.status === 'unread').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'bookings' ? 'bg-blue-600' : 'hover:bg-blue-900/30'
            }`}
            title={!sidebarOpen ? 'Engagement Workspace' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <span className="truncate">Engagement Workspace</span>
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-1">
                  {serviceBookings.filter((b) => b.status === 'pending').length}
                </span>
              </div>
            )}
            {!sidebarOpen && (
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full absolute left-12 top-1/2 -translate-y-1/2">
                {serviceBookings.filter((b) => b.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'blogs' ? 'bg-blue-600' : 'hover:bg-blue-900/30'
            }`}
            title={!sidebarOpen ? 'Blog Posts' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            {sidebarOpen && <span className="truncate">Blog Posts</span>}
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'subscribers' ? 'bg-blue-600' : 'hover:bg-blue-900/30'
            }`}
            title={!sidebarOpen ? 'Subscribers' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {sidebarOpen && <span className="truncate">Subscribers</span>}
          </button>

          {/* Cohorts Button */}
          <button
            onClick={() => setActiveTab('cohorts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'cohorts' ? 'bg-blue-600' : 'hover:bg-blue-900/30'
            }`}
            title={!sidebarOpen ? 'Cohorts' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <span className="truncate">Cohorts</span>
                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-1">
                  {cohorts.filter(c => c.status === 'upcoming').length}
                </span>
              </div>
            )}
            {!sidebarOpen && (
              <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full absolute left-12 top-1/2 -translate-y-1/2">
                {cohorts.filter(c => c.status === 'upcoming').length}
              </span>
            )}
          </button>

          {/* Coupons Button */}
          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'coupons' ? 'bg-blue-600' : 'hover:bg-blue-900/30'
            }`}
            title={!sidebarOpen ? 'Coupons' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <span className="truncate">Coupons</span>
                <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-1">
                  {coupons.filter(c => c.isActive).length}
                </span>
              </div>
            )}
            {!sidebarOpen && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full absolute left-12 top-1/2 -translate-y-1/2">
                {coupons.filter(c => c.isActive).length}
              </span>
            )}
          </button>
        </nav>

        {/* Logout Button - fixed at bottom */}
        <div className="p-4 border-t border-blue-900/30 flex-shrink-0">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600/20 rounded-lg transition-colors text-red-400">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {sidebarOpen && <span className="truncate">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-light text-gray-800 mb-2">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'contacts' && 'Contact Messages'}
            {activeTab === 'bookings' && 'Engagement Workspace'}
            {activeTab === 'blogs' && 'Blog Management'}
            {activeTab === 'subscribers' && 'Email Subscribers'}
            {activeTab === 'cohorts' && 'Cohorts Management'}
            {activeTab === 'coupons' && 'Coupon Management'}
          </h2>
          <p className="text-gray-600">
            {activeTab === 'overview' && "Welcome back! Here's what's happening with your business today."}
            {activeTab === 'contacts' && 'Manage all contact form submissions from your website.'}
            {activeTab === 'bookings' && 'Manage client engagements, send resources, questionnaires, and messages.'}
            {activeTab === 'blogs' && 'Create, edit, and publish blog posts for your website.'}
            {activeTab === 'subscribers' && 'Manage your email newsletter subscriber list.'}
            {activeTab === 'cohorts' && 'View and edit upcoming cohorts and enrollees.'}
            {activeTab === 'coupons' && 'Create and manage discount coupons.'}
          </p>
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'overview' && (
          <OverviewTab
            contactMessages={contactMessages}
            serviceBookings={serviceBookings}
            blogPosts={blogPosts}
            subscribers={subscribers}
          />
        )}
        {activeTab === 'contacts' && <ContactsTab contactMessages={contactMessages} setContactMessages={setContactMessages} />}
        {activeTab === 'bookings' && (
          <EngagementWorkspaceTab
            serviceBookings={serviceBookings}
            setServiceBookings={setServiceBookings}
            engagements={engagements}
            setEngagements={setEngagements}
          />
        )}
        {activeTab === 'blogs' && <BlogsTab blogPosts={blogPosts} setBlogPosts={setBlogPosts} />}
        {activeTab === 'subscribers' && <SubscribersTab subscribers={subscribers} setSubscribers={setSubscribers} />}
        {activeTab === 'cohorts' && <CohortsTab cohorts={cohorts} setCohorts={setCohorts} />}
        {activeTab === 'coupons' && (
          <CouponsTab
            coupons={coupons}
            setCoupons={setCoupons}
            availableServices={availableServices}
          />
        )}
      </main>
    </div>
  );
}