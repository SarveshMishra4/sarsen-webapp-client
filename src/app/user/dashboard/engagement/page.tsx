'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// =====================================================
// TYPES (could be imported from shared types)
// =====================================================
interface UserEngagement {
  id: string;
  packageName: string;
  purchaseDate: string;
  status: 'active' | 'completed' | 'pending';
  description?: string;
  progress?: number; // percentage
}

// =====================================================
// SAMPLE DATA (replace with API)
// =====================================================
const SAMPLE_ENGAGEMENTS: UserEngagement[] = [
  {
    id: '1',
    packageName: 'Growth & Revenue Strategy',
    purchaseDate: '2024-12-15T10:00:00',
    status: 'active',
    description: 'Comprehensive 12-week program focusing on revenue operations and scaling.',
    progress: 35,
  },
  {
    id: '2',
    packageName: 'Business Diagnostic & Direction',
    purchaseDate: '2024-11-20T14:30:00',
    status: 'completed',
    description: 'Initial diagnostic to identify key opportunities and challenges.',
    progress: 100,
  },
  {
    id: '3',
    packageName: 'Investor Communication Strategy',
    purchaseDate: '2025-01-05T09:00:00',
    status: 'pending',
    description: 'Preparation for Series A fundraising.',
    progress: 0,
  },
];

// =====================================================
// ENGAGEMENT CARD COMPONENT
// =====================================================
const EngagementCard = ({ engagement, onClick }: { engagement: UserEngagement; onClick: () => void }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-700',
    pending: 'bg-orange-100 text-orange-700',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-md p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-medium text-gray-800">{engagement.packageName}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[engagement.status]}`}>
          {engagement.status.charAt(0).toUpperCase() + engagement.status.slice(1)}
        </span>
      </div>

      {engagement.description && (
        <p className="text-sm text-gray-600 mb-4">{engagement.description}</p>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
          </svg>
          <span>Purchased: {new Date(engagement.purchaseDate).toLocaleDateString()}</span>
        </div>

        {engagement.progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress</span>
              <span>{engagement.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#0A1E3D] rounded-full h-2 transition-all"
                style={{ width: `${engagement.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end text-blue-600 group-hover:gap-2 transition-all">
        <span className="text-sm font-medium">Continue</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

// =====================================================
// MAIN PAGE
// =====================================================
export default function SelectEngagementPage() {
  const router = useRouter();
  const [engagements, setEngagements] = useState<UserEngagement[]>(SAMPLE_ENGAGEMENTS);
  const [userName, setUserName] = useState('John Doe');

  // Simulate auth check
  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      router.push('/login');
    } else {
      // Parse session to get user name (demo)
      setUserName('Demo User');
    }
  }, [router]);

  const handleSelectEngagement = (id: string) => {
    // Redirect to the specific engagement dashboard
    router.push(`/dashboard/engagement/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#d4dce5]">
      {/* Header */}
      <header className="bg-[#0A1E3D] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-light">Sarsen Strategy Partners</h1>
              <div className="hidden md:block h-8 w-px bg-white/20"></div>
              <div className="hidden md:block">
                <p className="text-sm text-blue-200">Welcome,</p>
                <p className="font-medium">{userName}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-light text-gray-800 mb-2">Select Your Engagement</h2>
          <p className="text-gray-600">
            You have {engagements.length} active engagement{engagements.length !== 1 ? 's' : ''}. Choose one to continue.
          </p>
        </div>

        {engagements.length === 0 ? (
          <div className="bg-white rounded-md p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-600">No engagements found. Please contact support.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagements.map((engagement) => (
              <EngagementCard
                key={engagement.id}
                engagement={engagement}
                onClick={() => handleSelectEngagement(engagement.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}