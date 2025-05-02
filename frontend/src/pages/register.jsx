import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/ui/AuthLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const { register, isLoading, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
      terms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Combine first and last name for the backend
        const name = `${values.firstName} ${values.lastName}`;
        const { email, password } = values;
        
        await register(name, email, password);
        navigate('/dashboard');
      } catch (err) {
        console.error('Registration error:', err);
        toast.error('Registration failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    // Basic password strength calculation
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(formik.values.password);

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <AuthLayout 
      title="Create Your Account" 
      subtitle="Join Startup Genie and start building your business"
    >
      <div className="p-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              placeholder="John"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && formik.errors.firstName}
              autoComplete="given-name"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              }
            />
            
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && formik.errors.lastName}
              autoComplete="family-name"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              }
            />
          </div>
          
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
                className="w-full py-3 pl-10 pr-10 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
              
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            
            {formik.values.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-slate-400">{getStrengthLabel()}</span>
                </div>
                <p className="text-xs text-slate-400">Use 8+ characters with a mix of letters, numbers & symbols</p>
              </div>
            )}
            
            {formik.touched.password && formik.errors.password && 
              <p className="mt-1 text-red-400 text-sm">{formik.errors.password}</p>
            }
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-slate-300">Confirm Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="••••••••"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
                className="w-full py-3 pl-10 pr-10 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
              
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && 
              <p className="mt-1 text-red-400 text-sm">{formik.errors.confirmPassword}</p>
            }
          </div>
          
          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white/10"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-slate-300">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors no-underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors no-underline">Privacy Policy</Link>
                </label>
                {formik.touched.terms && formik.errors.terms && 
                  <p className="mt-1 text-red-400">{formik.errors.terms}</p>
                }
              </div>
            </div>
          </div>
          
          <Button 
            primary 
            type="submit" 
            className="w-full mb-4"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : 'Create Account'}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors no-underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register; 