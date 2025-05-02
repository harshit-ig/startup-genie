import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthLayout from '../components/ui/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import BackgroundGrid from '../components/ui/BackgroundGrid';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { email });
      
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <BackgroundGrid />
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <FiArrowLeft className="mr-2" />
                  Back to login
                </Link>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-white">
                Reset Password
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                Enter your email address and we'll send you a link to reset your password
              </p>
              
              {success ? (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded mb-6">
                  <p>
                    If an account exists with the email <strong>{email}</strong>, you will receive password reset instructions.
                  </p>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<FiMail className="text-gray-500" />}
                        required
                      />
                      
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send reset link'}
                      </Button>
                    </div>
                  </form>
                </>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Remember your password?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default ResetPassword; 