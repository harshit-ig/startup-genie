import axios from 'axios';

// Get the API URL from environment variables
const apiUrl = import.meta.env.VITE_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      console.log('Authentication error: 401 Unauthorized');
      // Only clear token on auth errors, not other API errors
      localStorage.removeItem('authToken');
      
      // Don't redirect automatically - let the auth context handle it
      // window.location.href = '/login';
    } else if (response) {
      // Log other error responses
      console.error(`API Error: ${response.status} - ${response.data?.message || 'Unknown error'}`);
    } else {
      // Network errors or other issues
      console.error('API Error: Network error or request cancelled');
    }
    
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      try {
        const response = await api.post('/auth/login', { email, password, rememberMe });
        if (response.data.token) {
          if (rememberMe) {
            localStorage.setItem('authToken', response.data.token);
          } else {
            sessionStorage.setItem('authToken', response.data.token);
          }
          return { success: true, data: response.data };
        }
        return { success: false, error: 'Invalid credentials' };
      } catch (error: any) {
        // If API endpoint doesn't exist (404), create mock login for development
        if (error.response && error.response.status === 404) {
          console.warn('API endpoint /auth/login not found. Using mock data for development.');
          
          // Create mock token and store it
          const mockToken = `mock_token_${Date.now()}_${email}`;
          if (rememberMe) {
            localStorage.setItem('authToken', mockToken);
          } else {
            sessionStorage.setItem('authToken', mockToken);
          }
          
          return { 
            success: true, 
            data: { 
              token: mockToken,
              user: {
                name: email.split('@')[0],
                email: email
              }
            } 
          };
        }
        
        // Handle specific error cases
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data?.message || 'An error occurred';
          
          switch (status) {
            case 401:
              return { success: false, error: 'Invalid email or password' };
            case 403:
              return { success: false, error: 'Your account has been locked' };
            case 422:
              return { success: false, error: 'Please check your email and password' };
            default:
              return { success: false, error: message };
          }
        }
        
        console.error('Login API error:', error);
        return { success: false, error: 'Network error. Please try again.' };
      }
    } catch (outerError: any) {
      console.error('Unexpected error in login:', outerError);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },
  
  register: async (name: string, email: string, password: string) => {
    try {
      try {
        const response = await api.post('/auth/register', { name, email, password });
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          return { success: true, data: response.data };
        }
        return { success: false, error: 'No token returned' };
      } catch (error: any) {
        // If API endpoint doesn't exist (404), create mock register for development
        if (error.response && error.response.status === 404) {
          console.warn('API endpoint /auth/register not found. Using mock data for development.');
          
          // Create mock token and store it
          const mockToken = `mock_token_${Date.now()}_${email}`;
          localStorage.setItem('authToken', mockToken);
          
          return { 
            success: true, 
            data: { 
              token: mockToken,
              user: {
                name: name,
                email: email
              }
            } 
          };
        }
        
        console.error('Register API error:', error);
        return { success: false, error };
      }
    } catch (outerError: any) {
      console.error('Unexpected error in register:', outerError);
      return { success: false, error: outerError };
    }
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    return { success: true };
  },
  
  getCurrentUser: async () => {
    try {
      // DEVELOPMENT MODE: Create mock user if API endpoint doesn't exist
      try {
        const response = await api.get('/auth/me');
        console.log('getCurrentUser raw response:', response);
        
        if (!response.data) {
          console.error('Empty response from getCurrentUser');
          return { success: false, error: 'Empty response' };
        }
        
        // Handle different response formats
        if (response.data.success && response.data.data) {
          // Standard API response format with success and data properties
          return { success: true, data: response.data.data };
        } else if (response.data.user) {
          // Some APIs return a user property directly
          return { success: true, data: response.data.user };
        } else if (response.data._id || response.data.email) {
          // Assume this is the user object directly
          return { success: true, data: response.data };
        } else {
          console.error('Invalid response format from getCurrentUser:', response.data);
          return { success: false, error: 'Invalid response format' };
        }
      } catch (error: any) {
        // If API endpoint doesn't exist (404), create mock user for development
        if (error.response && error.response.status === 404) {
          console.warn('API endpoint /auth/me not found. Using mock data for development.');
          
          // Get token details to maintain some state
          const token = localStorage.getItem('authToken');
          if (!token) {
            return { success: false, error: 'No auth token' };
          }
          
          // Create mock user from token or fixed data
          const mockUser = {
            _id: '123456789',
            name: 'Demo User',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@example.com'
          };
          
          return { success: true, data: mockUser };
        }
        
        // For other errors, log and return error
        console.error('getCurrentUser API error:', error);
        return { success: false, error };
      }
    } catch (outerError: any) {
      console.error('Unexpected error in getCurrentUser:', outerError);
      return { success: false, error: outerError };
    }
  },
  
  forgotPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return { success: false, error };
    }
  },
  
  resetPassword: async (token: string, password: string) => {
    try {
      const response = await api.put(`/auth/reset-password/${token}`, { password });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, error };
    }
  },
  
  updateProfile: async (userData: any) => {
    try {
      try {
        const response = await api.put('/auth/updateprofile', userData);
        return { success: true, data: response.data };
      } catch (error: any) {
        // If API endpoint doesn't exist (404), create mock update for development
        if (error.response && error.response.status === 404) {
          console.warn('API endpoint /auth/updateprofile not found. Using mock data for development.');
          
          // Return the same user data that was passed in
          return { success: true, data: userData };
        }
        
        console.error('Error updating profile:', error);
        return { success: false, error };
      }
    } catch (outerError: any) {
      console.error('Unexpected error in updateProfile:', outerError);
      return { success: false, error: outerError };
    }
  }
};


export default api; 