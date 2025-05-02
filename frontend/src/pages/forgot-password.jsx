import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/ui/AuthLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BackgroundGrid from '../components/ui/BackgroundGrid';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <BackgroundGrid />
      <AuthLayout>
        <div className="py-16 px-4">
          <div className="container mx-auto max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Reset Your Password</h1>
              <p className="text-slate-400">We'll send you a link to reset your password</p>
            </div>
            
            <Card className="mb-6">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
                  <p className="text-slate-400 mb-6">
                    We've sent a password reset link to {email}
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500">
                      Didn't receive the email? Check your spam folder or try again.
                    </p>
                    <Button outline onClick={() => setIsSubmitted(false)}>
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="youremail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    autoComplete="email"
                  />
                  
                  <Button 
                    primary 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Reset Link'}
                  </Button>
                </form>
              )}
              
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-slate-400">
                  Remember your password?{' '}
                  <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
                    Back to login
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default ForgotPassword; 