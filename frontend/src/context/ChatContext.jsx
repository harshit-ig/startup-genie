import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  // Get chat history
  const getChatHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/ai/history`);
      if (response.data.success) {
        setChatHistory(response.data.data);
      }
    } catch (err) {
      setError('Failed to load chat history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load chat history when component mounts
  useEffect(() => {
    getChatHistory();
  }, []);

  // Send message to AI mentor
  const sendMessage = async (message) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add user message to chat
      const userMessage = { role: 'user', content: message };
      setMessages((prev) => [...prev, userMessage]);
      
      // Send message to API
      const response = await axios.post(`${API_URL}/ai/chat`, { message });
      
      if (response.data.success) {
        // Add AI response to chat
        const aiResponse = { role: 'assistant', content: response.data.data.response };
        setMessages((prev) => [...prev, aiResponse]);
        return aiResponse;
      }
    } catch (err) {
      setError('Failed to get response from AI mentor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Clear current chat
  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        error,
        chatHistory,
        sendMessage,
        clearChat,
        getChatHistory
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

export default ChatContext; 