'use client';

import React from 'react';
import { Resource } from './types';
import { ResourceCard } from './resource-card';

export const ResourcesTab = ({ resources }: { resources: Resource[] }) => {
  return (
    <section id="resources">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl  text-gray-800">Shared Resources</h2>
        <span className="text-sm text-gray-600">{resources.length} files</span>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {resources.length === 0 && (
        <div className="bg-white rounded-md p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-600">No resources shared yet</p>
        </div>
      )}
    </section>
  );
};