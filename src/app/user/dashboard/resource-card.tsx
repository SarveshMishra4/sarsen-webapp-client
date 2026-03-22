'use client';

import React from 'react';
import { Resource } from './types';
import { getFileIcon, getFileColor, getFileTypeName } from './file-icons';

export const ResourceCard = ({ resource }: { resource: Resource }) => {
  const handleClick = () => {
    window.open(resource.url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-md p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
    >
      <div className="flex flex-col items-center text-center">
        
        {/* Icon */}
        <div className={`w-20 h-20 bg-gradient-to-br ${getFileColor(resource.type)} rounded-md flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
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
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
          <span>Open</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>
  );
};