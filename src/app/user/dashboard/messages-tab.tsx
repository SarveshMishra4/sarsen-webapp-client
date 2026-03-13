'use client';

import React from 'react';
import { Message } from './types';
import { MessagesSection } from './messages-section';

interface MessagesTabProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLocked?: boolean;
}

export const MessagesTab = ({ messages, onSendMessage, isLocked }: MessagesTabProps) => {
  const unreadMessages = messages.filter(m => m.sentBy === 'admin' && !m.read).length;

  return (
    <section id="messages">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-gray-800">Messages</h2>
        <span className="text-sm text-gray-600">
          {unreadMessages} unread
        </span>
      </div>

      <MessagesSection 
        messages={messages}
        onSendMessage={onSendMessage}
        isLocked={isLocked} 
      />
    </section>
  );
};