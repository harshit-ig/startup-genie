import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { aiService } from '../services/aiService';
import { toast } from 'react-toastify';
import BackgroundGrid from '../components/ui/BackgroundGrid';

const AiMentor = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    { role: 'ai', message: 'Hello! I\'m your AI business mentor. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryingMessage, setRetryingMessage] = useState(null);
  
  // Create a ref to store the abort controller for cancelling requests
  const abortControllerRef = useRef(null);
  
  // Create a ref for the conversation container to auto-scroll
  const conversationRef = useRef(null);
  
  // Auto-scroll to the bottom of the conversation
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation]);
  
  // Clean up abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    await sendMessage(message.trim());
  };

  // Separated the message sending logic for reusability
  const sendMessage = async (userMessage, isRetry = false) => {
    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller
    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    setError(null);
    
    // If it's a retry, we don't add the user message again
    if (!isRetry) {
      // Add user message to conversation
      const newConversation = [...conversation, { role: 'user', message: userMessage }];
      setConversation(newConversation);
      setMessage('');
    }
    
    try {
      // Create a placeholder for the AI response
      const placeholderIndex = isRetry ? conversation.length : conversation.length + 1;
      setConversation(prev => {
        if (isRetry) {
          // In retry mode, we replace the error message
          return prev;
        } else {
          // Normal mode, add the new AI message placeholder
          return [...prev, { role: 'ai', message: '', isStreaming: true }];
        }
      });
      
      // Format the user message with the mentorship template
      const formattedPrompt = `[MENTOR REQUEST]
${userMessage}


IMPORTANT: Provide concrete, actionable advice that the user can implement right away.`;
      
      // Send the prompt to the server
      const { success, promptId, error } = await aiService.createPrompt(formattedPrompt);
      
      if (!success) {
        throw new Error(error || 'Failed to create AI prompt');
      }
      
      // Initialize accumulated response
      let accumulatedResponse = '';
      
      // Stream the response
      await aiService.streamResponse(promptId, {
        difficulty: 'intermediate', // You can make this configurable
        onToken: (tokens) => {
          // Update the accumulated response
          accumulatedResponse += tokens.join('');
          
          // Update the conversation with the current accumulated response
          setConversation(prevConversation => {
            const updatedConversation = [...prevConversation];
            updatedConversation[placeholderIndex] = { 
              role: 'ai', 
              message: accumulatedResponse,
              isStreaming: true
            };
            return updatedConversation;
          });
        },
        onComplete: () => {
          // Mark the response as complete
          setConversation(prevConversation => {
            const updatedConversation = [...prevConversation];
            updatedConversation[placeholderIndex] = { 
              role: 'ai', 
              message: accumulatedResponse,
              isStreaming: false
            };
            return updatedConversation;
          });
          setIsLoading(false);
          setRetryingMessage(null);
        },
        onError: (err) => {
          console.error('Error streaming response:', err);
          const errorMessage = err.message || 'An error occurred while getting the AI response.';
          setError(errorMessage);
          
          // Add the error message to the conversation
          setConversation(prevConversation => {
            const updatedConversation = [...prevConversation];
            updatedConversation[placeholderIndex] = { 
              role: 'ai', 
              message: 'Sorry, I encountered an error. Please try again.',
              isError: true
            };
            return updatedConversation;
          });
          
          // Remember the message we were trying to send for retry functionality
          setRetryingMessage(userMessage);
          setIsLoading(false);
          toast.error('Failed to get AI response. Please try again.');
        },
        abortSignal: abortControllerRef.current.signal
      });
    } catch (err) {
      console.error('Error in AI conversation:', err);
      setError(err.message || 'An error occurred. Please try again.');
      setIsLoading(false);
      
      // Remember the message we were trying to send for retry functionality
      setRetryingMessage(userMessage);
      toast.error('Could not connect to AI service. Please check your internet connection.');
    }
  };
  
  // Function to retry a failed message
  const handleRetry = () => {
    if (!retryingMessage) return;
    
    // Remove the error message
    setConversation(prev => {
      // Remove the last message if it was an error
      if (prev[prev.length - 1]?.isError) {
        return prev.slice(0, prev.length - 1);
      }
      return prev;
    });
    
    // Try sending the message again
    sendMessage(retryingMessage, true);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundGrid />
      <Navbar />
      
      <div className="py-10 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4 backdrop-blur-md border border-blue-800">
              24/7 Guidance
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Your AI Business Mentor
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get personalized business advice, strategy recommendations, and answers to your questions anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <h3 className="text-xl font-bold mb-4">Conversation Topics</h3>
                <ul className="space-y-2">
                  {['Business Strategy', 'Market Research', 'Financial Planning', 'Marketing', 'Operations', 'Fundraising'].map((topic, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => setMessage(`I need advice on ${topic.toLowerCase()}`)}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors text-slate-300 hover:text-white"
                        disabled={isLoading}
                      >
                        {topic}
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card>
                <div className="flex flex-col h-[500px]">
                  <div ref={conversationRef} className="flex-1 overflow-y-auto mb-4 space-y-4 p-2 scroll-smooth">
                    {conversation.map((item, index) => (
                      <div key={index} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          item.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : item.isError 
                              ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                              : 'bg-white/10 border border-white/10'
                        }`}>
                          {item.message}
                          {item.isStreaming && (
                            <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse"></span>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {error && retryingMessage && (
                      <div className="flex justify-center">
                        <button 
                          onClick={handleRetry}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Retry
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleSubmit} className="mt-auto">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder="Ask your business question..."
                        disabled={isLoading}
                      />
                      <Button primary type="submit" disabled={isLoading || !message.trim()}>
                        {isLoading ? (
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMentor; 