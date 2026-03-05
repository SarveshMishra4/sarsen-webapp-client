'use client';

import React from 'react';
import { User, Questionnaire, Resource, Message } from './types';
import { getFileIcon, getFileColor, getFileTypeName } from './file-icons';

export const OverviewTab = ({
  user,
  questionnaires,
  resources,
  messages,
  onStartQuestionnaire,
}: {
  user: User;
  questionnaires: Questionnaire[];
  resources: Resource[];
  messages: Message[];
  onStartQuestionnaire: (questionnaire: Questionnaire) => void;
}) => {
  const pendingQuestionnaires = questionnaires.filter(q => q.status === 'pending');
  const unreadMessages = messages.filter(m => m.sentBy === 'admin' && !m.read).length;

  return (
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
            {pendingQuestionnaires.slice(0, 3).map((q) => (
              <div key={q.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-gray-800 mb-1">{q.title}</h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">{q.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {q.dueDate && `Due: ${new Date(q.dueDate).toLocaleDateString()}`}
                  </span>
                  <button
                    onClick={() => onStartQuestionnaire(q)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Start →
                  </button>
                </div>
              </div>
            ))}
            {pendingQuestionnaires.length === 0 && (
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
  );
};