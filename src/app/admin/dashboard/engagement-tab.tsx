'use client';

import React, { useState } from 'react';
import {
  ServiceBooking,
  Engagement,
  SharedResource,
  ResourceType,
  Questionnaire,
  QuestionnaireQuestion,
  Message,
} from './types';

// -----------------------------------------------------
// EngagementOverview (subcomponent) - UNCHANGED
// -----------------------------------------------------
function EngagementOverview({
  engagement,
  booking,
}: {
  engagement: Engagement;
  booking: ServiceBooking;
}) {
  return (
    <div className="space-y-6">
      {/* Client Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Client Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Name</p>
            <p className="text-sm font-medium text-gray-800">{booking.clientName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-800">{booking.clientEmail}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Phone</p>
            <p className="text-sm font-medium text-gray-800">{booking.clientPhone}</p>
          </div>
          {booking.companyName && (
            <div>
              <p className="text-xs text-gray-600 mb-1">Company</p>
              <p className="text-sm font-medium text-gray-800">{booking.companyName}</p>
            </div>
          )}
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Service Details</h4>
        <p className="text-lg font-medium text-blue-800 mb-3">{booking.serviceType}</p>
        <div className="space-y-2">
          {Object.entries(booking.formData).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
              </span>
              <span className="font-medium text-gray-800">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-light text-gray-800">{engagement.resources.length}</p>
              <p className="text-xs text-gray-600">Resources Shared</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-light text-gray-800">{engagement.questionnaires.length}</p>
              <p className="text-xs text-gray-600">Questionnaires</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-light text-gray-800">{engagement.messages.length}</p>
              <p className="text-xs text-gray-600">Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {[...engagement.resources, ...engagement.questionnaires, ...engagement.messages]
            .sort((a, b) => {
              const dateA = 'sharedAt' in a ? a.sharedAt : 'sentAt' in a ? a.sentAt : '';
              const dateB = 'sharedAt' in b ? b.sharedAt : 'sentAt' in b ? b.sentAt : '';
              return new Date(dateB).getTime() - new Date(dateA).getTime();
            })
            .slice(0, 5)
            .map((item, index) => {
              const isResource = 'type' in item && 'url' in item;
              const isQuestionnaire = 'questions' in item;
              const isMessage = 'content' in item && 'sentBy' in item;

              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`p-2 rounded-lg ${
                      isResource ? 'bg-green-100' : isQuestionnaire ? 'bg-purple-100' : 'bg-blue-100'
                    }`}
                  >
                    {isResource && (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    )}
                    {isQuestionnaire && (
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    )}
                    {isMessage && (
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {isResource && `Resource: ${(item as SharedResource).name}`}
                      {isQuestionnaire && `Questionnaire: ${(item as Questionnaire).title}`}
                      {isMessage && 'New Message'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {'sharedAt' in item && new Date(item.sharedAt).toLocaleString()}
                      {'sentAt' in item && new Date(item.sentAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// ResourcesManagement (subcomponent) - UNCHANGED
// -----------------------------------------------------
function ResourcesManagement({
  engagement,
  setEngagements,
}: {
  engagement: Engagement;
  setEngagements: React.Dispatch<React.SetStateAction<Engagement[]>>;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'pdf' as ResourceType,
    description: '',
  });

  const resourceTypes: { value: ResourceType; label: string }[] = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'ppt', label: 'PowerPoint Presentation' },
    { value: 'google-sheet', label: 'Google Sheets' },
    { value: 'google-doc', label: 'Google Docs' },
    { value: 'google-slides', label: 'Google Slides' },
    { value: 'website', label: 'Website/Link' },
    { value: 'notion', label: 'Notion Page' },
    { value: 'figma', label: 'Figma Design' },
    { value: 'other', label: 'Other' },
  ];

  const handleAddResource = () => {
    if (!formData.name || !formData.url || !formData.type) {
      alert('Please fill in all required fields');
      return;
    }

    const newResource: SharedResource = {
      id: Date.now().toString(),
      name: formData.name,
      url: formData.url,
      type: formData.type,
      description: formData.description,
      sharedAt: new Date().toISOString(),
      sharedBy: 'Admin',
    };

    setEngagements((prev) =>
      prev.map((e) => (e.id === engagement.id ? { ...e, resources: [...e.resources, newResource] } : e))
    );

    setFormData({ name: '', url: '', type: 'pdf', description: '' });
    setIsAdding(false);
  };

  const handleDeleteResource = (resourceId: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setEngagements((prev) =>
        prev.map((e) =>
          e.id === engagement.id ? { ...e, resources: e.resources.filter((r) => r.id !== resourceId) } : e
        )
      );
    }
  };

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case 'pdf':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        );
      case 'excel':
      case 'google-sheet':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        );
      case 'ppt':
      case 'google-slides':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
        );
      case 'google-doc':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case 'website':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        );
      case 'notion':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case 'figma':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        );
    }
  };

  const getResourceColor = (type: ResourceType) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-700';
      case 'excel':
        return 'bg-green-100 text-green-700';
      case 'ppt':
        return 'bg-orange-100 text-orange-700';
      case 'google-sheet':
        return 'bg-emerald-100 text-emerald-700';
      case 'google-doc':
        return 'bg-blue-100 text-blue-700';
      case 'google-slides':
        return 'bg-yellow-100 text-yellow-700';
      case 'website':
        return 'bg-purple-100 text-purple-700';
      case 'notion':
        return 'bg-gray-100 text-gray-700';
      case 'figma':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Resource Button */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-gray-800">Shared Resources</h4>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Resource
        </button>
      </div>

      {/* Add Resource Form */}
      {isAdding && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-medium text-gray-800">Add New Resource</h5>
            <button
              onClick={() => {
                setIsAdding(false);
                setFormData({ name: '', url: '', type: 'pdf', description: '' });
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Q4 Strategy Document"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ResourceType })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {resourceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of this resource..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddResource}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Add Resource
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setFormData({ name: '', url: '', type: 'pdf', description: '' });
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resources List */}
      <div className="space-y-3">
        {engagement.resources.length > 0 ? (
          engagement.resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getResourceColor(resource.type)}`}>{getResourceIcon(resource.type)}</div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 mb-1">{resource.name}</h5>
                    {resource.description && <p className="text-sm text-gray-600 mb-2">{resource.description}</p>}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded-full ${getResourceColor(resource.type)}`}>
                        {resourceTypes.find((t) => t.value === resource.type)?.label}
                      </span>
                      <span>Shared {new Date(resource.sharedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-start">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Open Resource"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <button
                    onClick={() => handleDeleteResource(resource.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Resource"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg">
            No resources shared yet. Click "Add Resource" to share resources with the client.
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// QuestionnairesManagement (subcomponent) - UNCHANGED
// -----------------------------------------------------
function QuestionnairesManagement({
  engagement,
  setEngagements,
}: {
  engagement: Engagement;
  setEngagements: React.Dispatch<React.SetStateAction<Engagement[]>>;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [] as QuestionnaireQuestion[],
  });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'text' as QuestionnaireQuestion['type'],
    options: '',
    required: true,
  });

  const handleAddQuestion = () => {
    if (!newQuestion.question) {
      alert('Please enter a question');
      return;
    }

    const question: QuestionnaireQuestion = {
      id: Date.now().toString(),
      question: newQuestion.question,
      type: newQuestion.type,
      options: newQuestion.options ? newQuestion.options.split(',').map((o) => o.trim()) : undefined,
      required: newQuestion.required,
    };

    setFormData({
      ...formData,
      questions: [...formData.questions, question],
    });

    setNewQuestion({
      question: '',
      type: 'text',
      options: '',
      required: true,
    });
  };

  const handleRemoveQuestion = (questionId: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((q) => q.id !== questionId),
    });
  };

  const handleCreateQuestionnaire = () => {
    if (!formData.title || formData.questions.length === 0) {
      alert('Please add a title and at least one question');
      return;
    }

    const newQuestionnaire: Questionnaire = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      questions: formData.questions,
      sentAt: new Date().toISOString(),
      status: 'sent',
    };

    setEngagements((prev) =>
      prev.map((e) => (e.id === engagement.id ? { ...e, questionnaires: [...e.questionnaires, newQuestionnaire] } : e))
    );

    setFormData({ title: '', description: '', questions: [] });
    setIsCreating(false);
  };

  const handleDeleteQuestionnaire = (questionnaireId: string) => {
    if (confirm('Are you sure you want to delete this questionnaire?')) {
      setEngagements((prev) =>
        prev.map((e) =>
          e.id === engagement.id
            ? { ...e, questionnaires: e.questionnaires.filter((q) => q.id !== questionnaireId) }
            : e
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Questionnaire Button */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-gray-800">Questionnaires</h4>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Questionnaire
        </button>
      </div>

      {/* Create Questionnaire Form */}
      {isCreating && (
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-medium text-gray-800">Create New Questionnaire</h5>
            <button
              onClick={() => {
                setIsCreating(false);
                setFormData({ title: '', description: '', questions: [] });
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Questionnaire Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Initial Discovery Questions"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Brief description of this questionnaire..."
              />
            </div>

            {/* Questions List */}
            {formData.questions.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Questions Added:</label>
                {formData.questions.map((q, index) => (
                  <div key={q.id} className="bg-white rounded-lg p-3 border border-gray-200 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-purple-600">Q{index + 1}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{q.type}</span>
                        {q.required && <span className="text-xs text-red-500">*</span>}
                      </div>
                      <p className="text-sm font-medium text-gray-800">{q.question}</p>
                      {q.options && <p className="text-xs text-gray-600 mt-1">Options: {q.options.join(', ')}</p>}
                    </div>
                    <button onClick={() => handleRemoveQuestion(q.id)} className="text-red-600 hover:text-red-700 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Question Form */}
            <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
              <h6 className="text-sm font-medium text-gray-700 mb-3">Add Question</h6>

              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Enter your question..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <select
                      value={newQuestion.type}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, type: e.target.value as QuestionnaireQuestion['type'] })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    >
                      <option value="text">Short Text</option>
                      <option value="textarea">Long Text</option>
                      <option value="select">Dropdown</option>
                      <option value="multiselect">Multiple Choice</option>
                      <option value="radio">Radio Buttons</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="required"
                      checked={newQuestion.required}
                      onChange={(e) => setNewQuestion({ ...newQuestion, required: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="required" className="text-sm text-gray-700">
                      Required
                    </label>
                  </div>
                </div>

                {['select', 'multiselect', 'radio'].includes(newQuestion.type) && (
                  <div>
                    <input
                      type="text"
                      value={newQuestion.options}
                      onChange={(e) => setNewQuestion({ ...newQuestion, options: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="Options (comma-separated): Option 1, Option 2, Option 3"
                    />
                  </div>
                )}

                <button
                  onClick={handleAddQuestion}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Add Question
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleCreateQuestionnaire}
                disabled={formData.questions.length === 0}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Send Questionnaire to Client
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setFormData({ title: '', description: '', questions: [] });
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questionnaires List */}
      <div className="space-y-3">
        {engagement.questionnaires.length > 0 ? (
          engagement.questionnaires.map((questionnaire) => (
            <div key={questionnaire.id} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-lg font-medium text-gray-800">{questionnaire.title}</h5>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        questionnaire.status === 'sent' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {questionnaire.status}
                    </span>
                  </div>
                  {questionnaire.description && <p className="text-sm text-gray-600 mb-3">{questionnaire.description}</p>}
                  <p className="text-xs text-gray-500">
                    Sent {new Date(questionnaire.sentAt).toLocaleString()} • {questionnaire.questions.length} questions
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteQuestionnaire(questionnaire.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Questionnaire"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Questions Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h6 className="text-sm font-medium text-gray-700 mb-3">Questions:</h6>
                <div className="space-y-2">
                  {questionnaire.questions.map((q, index) => (
                    <div key={q.id} className="flex items-start gap-2">
                      <span className="text-xs font-medium text-purple-600 mt-0.5">Q{index + 1}.</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">
                          {q.question}
                          {q.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-600">{q.type}</span>
                          {q.options && <span className="text-xs text-gray-500">{q.options.length} options</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Section */}
              {questionnaire.response && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                  <h6 className="text-sm font-medium text-green-800 mb-3">Client Response:</h6>
                  <div className="space-y-2">
                    {Object.entries(questionnaire.response).map(([questionId, answer]) => {
                      const question = questionnaire.questions.find((q) => q.id === questionId);
                      return (
                        <div key={questionId} className="bg-white rounded p-3">
                          <p className="text-xs text-gray-600 mb-1">{question?.question}</p>
                          <p className="text-sm font-medium text-gray-800">{String(answer)}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg">
            No questionnaires sent yet. Click "Create Questionnaire" to send questions to the client.
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// MessagesManagement (subcomponent) - UNCHANGED
// -----------------------------------------------------
function MessagesManagement({
  engagement,
  setEngagements,
}: {
  engagement: Engagement;
  setEngagements: React.Dispatch<React.SetStateAction<Engagement[]>>;
}) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [engagement.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sentAt: new Date().toISOString(),
      sentBy: 'admin',
      read: false,
    };

    setEngagements((prev) =>
      prev.map((e) => (e.id === engagement.id ? { ...e, messages: [...e.messages, message] } : e))
    );

    setNewMessage('');
  };

  const handleDeleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setEngagements((prev) =>
        prev.map((e) =>
          e.id === engagement.id ? { ...e, messages: e.messages.filter((m) => m.id !== messageId) } : e
        )
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Messages Container */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 h-[500px] flex flex-col">
        {/* Messages Header */}
        <div className="p-4 border-b border-gray-200 bg-white rounded-t-xl">
          <h4 className="text-lg font-medium text-gray-800">Conversation</h4>
          <p className="text-sm text-gray-600">
            {engagement.messages.length} message{engagement.messages.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {engagement.messages.length > 0 ? (
            <>
              {engagement.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sentBy === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.sentBy === 'admin'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      {message.sentBy === 'admin' && (
                        <button onClick={() => handleDeleteMessage(message.id)} className="text-white/80 hover:text-white flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div
                      className={`flex items-center gap-2 mt-2 text-xs ${
                        message.sentBy === 'admin' ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      <span>{new Date(message.sentAt).toLocaleString()}</span>
                      {message.sentBy === 'admin' && (
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="text-sm">No messages yet</p>
                <p className="text-xs text-gray-400 mt-1">Start the conversation below</p>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={2}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:w-auto w-full"
            >
              <span className="hidden sm:inline">Send</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Messages will be visible to the client in their dashboard</p>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Messages</p>
          <p className="text-2xl font-light text-gray-800">{engagement.messages.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">From Admin</p>
          <p className="text-2xl font-light text-gray-800">{engagement.messages.filter((m) => m.sentBy === 'admin').length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">From Client</p>
          <p className="text-2xl font-light text-gray-800">{engagement.messages.filter((m) => m.sentBy === 'client').length}</p>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// Main EngagementWorkspaceTab Component - MODIFIED (full‑screen detail)
// -----------------------------------------------------
export function EngagementWorkspaceTab({
  serviceBookings,
  setServiceBookings,
  engagements,
  setEngagements,
}: {
  serviceBookings: ServiceBooking[];
  setServiceBookings: React.Dispatch<React.SetStateAction<ServiceBooking[]>>;
  engagements: Engagement[];
  setEngagements: React.Dispatch<React.SetStateAction<Engagement[]>>;
}) {
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'resources' | 'questionnaires' | 'messages'>('overview');
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  const getOrCreateEngagement = (bookingId: string) => {
    let engagement = engagements.find((e) => e.bookingId === bookingId);

    if (!engagement) {
      const booking = serviceBookings.find((b) => b.id === bookingId);
      if (booking) {
        engagement = {
          id: Date.now().toString(),
          bookingId: booking.id,
          clientName: booking.clientName,
          serviceType: booking.serviceType,
          resources: [],
          questionnaires: [],
          messages: [],
          createdAt: new Date().toISOString(),
        };
        setEngagements((prev) => [...prev, engagement!]);
      }
    }

    return engagement;
  };

  const handleSelectBooking = (booking: ServiceBooking) => {
    const engagement = getOrCreateEngagement(booking.id);
    setSelectedEngagement(engagement || null);
    setActiveSubTab('overview');
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setSelectedEngagement(null);
    setViewMode('list');
  };

  return (
    <div className="space-y-6">
      {viewMode === 'list' ? (
        // ---------- LIST VIEW (full width) ----------
        <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
          <h3 className="text-lg font-medium text-gray-800 sticky top-0 bg-gray-100 py-2">Active Engagements</h3>
          {serviceBookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => handleSelectBooking(booking)}
              className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition-all ${
                selectedEngagement?.bookingId === booking.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{booking.clientName}</h4>
                  <p className="text-xs text-gray-600">{booking.companyName || booking.clientEmail}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    booking.status === 'pending'
                      ? 'bg-orange-100 text-orange-700'
                      : booking.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-700'
                      : booking.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="bg-blue-50 rounded-lg p-2 mb-2">
                <p className="text-xs font-medium text-blue-800">{booking.serviceType}</p>
              </div>

              {/* Engagement Stats */}
              {engagements.find((e) => e.bookingId === booking.id) && (
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {engagements.find((e) => e.bookingId === booking.id)?.resources.length || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    {engagements.find((e) => e.bookingId === booking.id)?.questionnaires.length || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {engagements.find((e) => e.bookingId === booking.id)?.messages.length || 0}
                  </span>
                </div>
              )}
            </div>
          ))}

          {serviceBookings.length === 0 && (
            <div className="text-center text-gray-500 py-10 bg-white rounded-xl">No active engagements</div>
          )}
        </div>
      ) : (
        // ---------- DETAIL VIEW (full width with back button) ----------
        selectedEngagement && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Back button */}
            <div className="p-6 border-b border-gray-200">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to engagements
              </button>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-gray-800">{selectedEngagement.clientName}</h3>
                  <p className="text-gray-600">{selectedEngagement.serviceType}</p>
                </div>
                <button
                  onClick={() => {
                    const booking = serviceBookings.find((b) => b.id === selectedEngagement.bookingId);
                    if (booking) {
                      const newStatus =
                        booking.status === 'pending' ? 'in-progress' : booking.status === 'in-progress' ? 'completed' : 'completed';
                      setServiceBookings((prev) => prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b)));
                    }
                  }}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors self-start"
                >
                  Update Status
                </button>
              </div>

              {/* Sub-tabs */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setActiveSubTab('overview')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSubTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveSubTab('resources')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSubTab === 'resources' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Resources ({selectedEngagement.resources.length})
                </button>
                <button
                  onClick={() => setActiveSubTab('questionnaires')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSubTab === 'questionnaires' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Questionnaires ({selectedEngagement.questionnaires.length})
                </button>
                <button
                  onClick={() => setActiveSubTab('messages')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSubTab === 'messages' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Messages ({selectedEngagement.messages.length})
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeSubTab === 'overview' && (
                <EngagementOverview
                  engagement={selectedEngagement}
                  booking={serviceBookings.find((b) => b.id === selectedEngagement.bookingId)!}
                />
              )}
              {activeSubTab === 'resources' && (
                <ResourcesManagement engagement={selectedEngagement} setEngagements={setEngagements} />
              )}
              {activeSubTab === 'questionnaires' && (
                <QuestionnairesManagement engagement={selectedEngagement} setEngagements={setEngagements} />
              )}
              {activeSubTab === 'messages' && (
                <MessagesManagement engagement={selectedEngagement} setEngagements={setEngagements} />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}