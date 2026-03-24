'use client';

import React, { useState } from 'react';
import { Questionnaire } from './types';

export const QuestionnaireModal = ({ questionnaire, onClose, onSubmit }: {
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
      <div className="bg-white rounded-md max-w-3xl w-full my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E5A8E] to-[#2B7AB8] px-8 py-6 rounded-t-md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl  text-white mb-2">{questionnaire.title}</h2>
              <p className="text-blue-100 text-sm">{questionnaire.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-md transition-colors"
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
              <div key={question.id} className="bg-gray-50 rounded-md p-6 border border-gray-200">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {question.type === 'number' && (
                  <input
                    type="number"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {question.type === 'textarea' && (
                  <textarea
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {question.type === 'select' && (
                  <select
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <label key={option} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100 rounded-md transition-colors">
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
                      <label key={option} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100 rounded-md transition-colors">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 rounded-b-md">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
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
                className="px-6 py-3 bg-[#0A1E3D] text-white rounded-md hover:bg-[#132B47] transition-colors font-medium"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuestionnaire}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
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