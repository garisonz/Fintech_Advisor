import { useState, useEffect } from "react";
import axios from "axios";

interface Message {
  id?: number;
  message: string;
  is_bot: boolean;
  timestamp?: string;
}

interface ChatbotProps {
  sessionId: string;
  token: string;
}

export default function Chatbot({ sessionId, token }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchChatHistory() {
      try {
        const response = await axios.get(
          `http://localhost:8000/chat/history/${sessionId}/`,
          { headers: { Authorization: `Token ${token}` } }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }
    fetchChatHistory();
  }, [sessionId, token]);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessage: Message = { message: input, is_bot: false };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setInput("");

    try {
      const response = await axios.post(
        `http://localhost:8000/chat/send/${sessionId}/`,
        { message: input },
        { headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" } }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { message: input, is_bot: false },
        response.data.bot_response
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.is_bot ? "bot-msg" : "user-msg"}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <style jsx>{`
        .chat-container {
          width: 300px;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
        }
        .chat-box {
          height: 300px;
          overflow-y: auto;
          padding: 10px;
          background: #f9f9f9;
        }
        .user-msg {
          text-align: right;
          color: white;
          background: blue;
          padding: 5px;
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .bot-msg {
          text-align: left;
          color: black;
          background: lightgray;
          padding: 5px;
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .input-container {
          display: flex;
          margin-top: 10px;
        }
        input {
          flex: 1;
          padding: 5px;
        }
        button {
          padding: 5px;
          background: green;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
