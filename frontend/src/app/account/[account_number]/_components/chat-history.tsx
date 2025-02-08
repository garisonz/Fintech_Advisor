"use client";
import { useState, useEffect } from 'react';
import { fetchChatSessions, type ChatSession } from '@/services/api';

const ChatHistory = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchChatSessions();
        setSessions(data);
      } catch (error) {
        console.error('Error loading sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="border p-4">
      <h2>Chat History</h2>
      {sessions.map((session) => (
        <div key={session.id} className="border-b p-2">
          <div>Session ID: {session.session_id}</div>
          <div>Started: {new Date(session.started_at).toLocaleString()}</div>
          <div className="ml-4">
            {session.messages.map((message, index) => (
              <div 
                key={index}
                className={`p-1 ${message.is_bot ? 'bg-gray-100' : 'bg-blue-100'}`}
              >
                {message.message}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;