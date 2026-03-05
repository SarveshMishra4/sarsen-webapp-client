import { ResourceType } from './types';

export const getFileIcon = (type: ResourceType) => {
  switch (type) {
    case 'pdf':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
        </svg>
      );
    case 'excel':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-3.06 16L8 13.53 5.06 18H3.5l3.78-5.5L3.75 7h1.56l2.43 3.89L10.13 7h1.56l-3.53 5.5L11.94 18h-1.5z"/>
        </svg>
      );
    case 'ppt':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm1 11h-4v5H9v-5H5v-2h4V6h2v5h4v2z"/>
        </svg>
      );
    case 'google-sheet':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"/>
        </svg>
      );
    case 'google-doc':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 18v-2h8v2H8zm0-4v-2h8v2H8zm0-4V8h5v2H8z"/>
        </svg>
      );
    case 'google-slides':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-1l5-3-5-3v6z"/>
        </svg>
      );
    case 'website':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      );
    case 'notion':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
        </svg>
      );
    case 'figma':
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 2h8v8H8V2zm0 10h8v8H8v-8zM2 12h4v8H2v-8zm12 0h8v8h-8v-8z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
        </svg>
      );
  }
};

export const getFileColor = (type: ResourceType): string => {
  switch (type) {
    case 'pdf': return 'from-red-500 to-red-600';
    case 'excel': return 'from-green-500 to-green-600';
    case 'ppt': return 'from-orange-500 to-orange-600';
    case 'google-sheet': return 'from-emerald-500 to-emerald-600';
    case 'google-doc': return 'from-blue-500 to-blue-600';
    case 'google-slides': return 'from-yellow-500 to-yellow-600';
    case 'website': return 'from-purple-500 to-purple-600';
    case 'notion': return 'from-gray-500 to-gray-600';
    case 'figma': return 'from-pink-500 to-pink-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

export const getFileTypeName = (type: ResourceType): string => {
  switch (type) {
    case 'pdf': return 'PDF Document';
    case 'excel': return 'Excel Spreadsheet';
    case 'ppt': return 'PowerPoint';
    case 'google-sheet': return 'Google Sheets';
    case 'google-doc': return 'Google Docs';
    case 'google-slides': return 'Google Slides';
    case 'website': return 'Website';
    case 'notion': return 'Notion Page';
    case 'figma': return 'Figma Design';
    case 'other': return 'File';
    default: return 'File';
  }
};