'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';

export const MessagesSection = ({ 
  messages, 
  onSendMessage,
  isLocked // 1. Extract isLocked from props
}: {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLocked?: boolean; // 2. Add it to the TypeScript definition
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    // 3. Prevent sending if locked
    if (!newMessage.trim() || isLocked) return; 
    onSendMessage(newMessage.trim());
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // 4. Prevent Enter key from triggering send if locked
      if (!isLocked) {
        handleSend();
      }
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 h-[600px] flex flex-col">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-md">
        <h3 className="text-lg font-medium text-gray-800">Messages</h3>
        <p className="text-sm text-gray-600">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length > 0 ? (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sentBy === 'client' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-md p-4 ${
                    message.sentBy === 'client'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <div className={`flex items-center gap-2 mt-2 text-xs ${
                    message.sentBy === 'client' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span>{new Date(message.sentAt).toLocaleString()}</span>
                    {message.sentBy === 'client' && (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">No messages yet</p>
              <p className="text-xs text-gray-400 mt-1">Start the conversation below</p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-md">
        <div className="flex gap-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={2}
            disabled={isLocked} // 5. Disable textarea when locked
            className={`flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              isLocked ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'bg-white'
            }`}
            placeholder={
              isLocked 
                ? "This engagement has been delivered and is locked." 
                : "Type your message... (Press Enter to send, Shift+Enter for new line)"
            }
          />
          <button
            onClick={handleSend}
            disabled={isLocked || !newMessage.trim()} // 6. Disable button when locked
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="hidden sm:inline">Send</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {isLocked 
            ? "Messages are read-only for delivered projects." 
            : "Press Enter to send, Shift+Enter for new line"}
        </p>
      </div>

    </div>
  );
};