import axios from 'axios';

// Create axios instance with default config
const aiApi = axios.create({
  baseURL: '/api/ai',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to include auth token
aiApi.interceptors.request.use(
  (config) => {
    // Try localStorage first, then sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// AI services
export const aiService = {
  createPrompt: async (message: string) => {
    try {
      const response = await aiApi.post('/prompt', { message });
      return { success: true, promptId: response.data.promptId };
    } catch (error: any) {
      console.error('Error creating prompt:', error);
      
      // Check for specific error types
      if (error.response) {
        // Server responded with an error status
        const status = error.response.status;
        const errorMessage = error.response.data?.error || 'Unknown server error';
        
        if (status === 401) {
          return { success: false, error: 'Authentication required' };
        } else if (status === 503) {
          return { success: false, error: 'AI service unavailable' };
        } else {
          return { success: false, error: `Server error: ${errorMessage}` };
        }
      } else if (error.request) {
        // Request was made but no response received
        return { success: false, error: 'No response from server. Please check your connection.' };
      } else {
        // Error setting up the request
        return { success: false, error: 'Failed to create prompt request.' };
      }
    }
  },
  
  // Function to get auth token for EventSource which doesn't support headers
  getAuthToken: () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '';
  },

  streamResponse: async (promptId: string, options: {
    difficulty?: string;
    onToken?: (tokens: string[]) => void;
    onComplete?: () => void;
    onError?: (error: any) => void;
    abortSignal?: AbortSignal;
  }) => {
    return new Promise<void>((resolve, reject) => {
      const { difficulty = 'intermediate', onToken, onComplete, onError, abortSignal } = options;
      let eventSource: EventSource | null = null;

      try {
        // Build the URL with the difficulty parameter and auth token
        const token = aiService.getAuthToken();
        const streamUrl = `/api/ai/stream/${promptId}?difficulty=${difficulty}&token=${encodeURIComponent(token)}`;
        console.log(`Connecting to stream: ${streamUrl}`);
        
        // Create the EventSource
        eventSource = new EventSource(streamUrl);
        let responseComplete = false;

        // Safe close function to prevent null reference errors
        const safeCloseEventSource = () => {
          if (eventSource) {
            try {
              eventSource.close();
            } catch (err) {
              console.error('Error closing event source:', err);
            }
          }
        };

        // If an abort signal is provided, listen for abort
        if (abortSignal) {
          abortSignal.addEventListener('abort', () => {
            safeCloseEventSource();
            reject(new Error('Stream aborted'));
          });
        }

        if (eventSource) {
          eventSource.onopen = (event) => {
            console.log('EventSource connection opened');
          };
          
          eventSource.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              
              // Check for error messages
              if (data.error) {
                console.error('Error from SSE:', data.tokens.join(''));
                onError?.(data.tokens.join(''));
                safeCloseEventSource();
                resolve();
                return;
              }
              
              // Handle explicit completion message
              if (data.complete === true) {
                console.log('Received explicit completion message');
                responseComplete = true;
                onComplete?.();
                safeCloseEventSource();
                resolve();
                return;
              }
              
              // Process tokens
              if (data.tokens && data.tokens.length > 0) {
                onToken?.(data.tokens);
              }
              
              // Check for completion based on token count
              if (!data.partial && data.totalTokens > 0 && 
                  data.tokens && data.tokens.length > 0 && 
                  data.receivedTokenCount >= data.totalTokens) {
                console.log('Stream complete and all tokens received');
                responseComplete = true;
                onComplete?.();
                safeCloseEventSource();
                resolve();
              }
            } catch (error) {
              console.error('Error processing SSE message:', error);
              onError?.(error);
              safeCloseEventSource();
              reject(error);
            }
          };
          
          eventSource.onerror = (error) => {
            // Check if we've already received a completion message
            if (responseComplete) {
              console.log('Stream closed after completion');
              safeCloseEventSource();
              return;
            }
            
            // Otherwise, this is an actual error
            console.error('EventSource error:', error);
            onError?.(error);
            safeCloseEventSource();
            reject(error);
          };
        }
        
        // Timeout failsafe in case stream doesn't end properly
        setTimeout(() => {
          if (eventSource && eventSource.readyState !== 2) { // 2 is CLOSED
            console.warn('Stream timeout reached after 5 minutes, closing connection');
            responseComplete = true;
            onComplete?.();
            safeCloseEventSource();
            resolve();
          }
        }, 300000); // 5 minutes timeout
      } catch (error) {
        console.error('Error setting up stream:', error);
        onError?.(error);
        if (eventSource) {
          try {
            eventSource.close();
          } catch (err) {
            console.error('Error closing event source on catch block:', err);
          }
        }
        reject(error);
      }
    });
  }
};

export default aiService; 