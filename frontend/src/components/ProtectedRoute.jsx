import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

// Component to protect routes that require authentication
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.info('Please sign in to access this page');
    }
  }, [isLoading, isAuthenticated]);

  // While checking authentication status, show nothing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
        <div className="text-center">
          <div className="inline-block">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-4 text-white">Authenticating...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

// Component to prevent authenticated users from accessing login/register pages
export const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // While checking authentication status, show nothing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
        <div className="text-center">
          <div className="inline-block">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, render the login/register component
  return children;
}; 