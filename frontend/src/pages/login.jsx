import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/ui/AuthLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  // Get the page user was trying to access before redirect to login
  const from = location.state?.from || '/dashboard';
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  // Use Formik for form validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setLoginError(null);
      
      try {
        const response = await login(values.email, values.password, values.rememberMe);
        if (!response.success) {
          setLoginError(response.error || 'Invalid email or password. Please try again.');
        } else {
          // Redirect to the page they were trying to access
          toast.success('Login successful!');
          navigate(from);
        }
      } catch (err) {
        console.error('Login error:', err);
        setLoginError('An unexpected error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to access your Startup Genie dashboard"
    >
      <div className="p-8">
        <div className="mb-6 flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {loginError}
          </div>
        )}
        
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="youremail@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            autoComplete="email"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          />
          
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            }
          />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-white/10"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-300">
                Remember me
              </label>
            </div>
            
            <Link to="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors no-underline">
              Forgot password?
            </Link>
          </div>
          
          <Button 
            primary 
            type="submit" 
            className="w-full mb-4"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : 'Sign In'}
          </Button>
        </form>
        
        <div className="text-center text-sm mt-8">
          <p className="text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors no-underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login; 