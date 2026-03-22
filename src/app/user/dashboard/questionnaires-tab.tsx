'use client';

import React from 'react';
import { Questionnaire } from './types';

export const QuestionnairesTab = ({
  questionnaires,
  onStartQuestionnaire,
}: {
  questionnaires: Questionnaire[];
  onStartQuestionnaire: (questionnaire: Questionnaire) => void;
}) => {
  return (
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
            className="bg-white rounded-md p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all"
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
                className="w-full bg-green-100 text-green-700 py-3 px-4 rounded-md font-medium cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span>Completed</span>
              </button>
            ) : (
              <button
                onClick={() => onStartQuestionnaire(questionnaire)}
                className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 group"
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
        <div className="bg-white rounded-md p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600">No questionnaires available yet</p>
        </div>
      )}
    </section>
  );
};