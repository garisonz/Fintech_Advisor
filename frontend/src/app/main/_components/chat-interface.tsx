"use client";
import { useState, useEffect } from 'react';
import { createChatSession, sendMessage, type ChatSession } from '@/services/api';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await createChatSession();
        setSessionId(session.id);
      } catch (error) {
        console.error('Error creating session:', error);
      }
    };

    initSession();
  }, []);

  const handleSend = async () => {
    if (!message.trim() || !sessionId) return;

    try {
      const response = await sendMessage(sessionId, message);
      setMessages(prev => [...prev, 
        { message: message, is_bot: false },
        response.bot_response
      ]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="border p-4">
      <div className="h-96 overflow-y-auto mb-4 border">
        {messages.map((msg, index) => (
          <div key={index} className={msg.is_bot ? 'text-left' : 'text-right'}>
            <div className={`inline-block p-2 m-1 rounded ${msg.is_bot ? 'bg-gray-200' : 'bg-blue-200'}`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="border p-2 flex-1"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;