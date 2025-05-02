import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items based on authentication status
  const getNavItems = () => {
    const items = [
      { path: '/', label: 'Home' }
    ];

    if (isAuthenticated) {
      items.push(
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/business-plan', label: 'Business Plan' },
        { path: '/ai-mentor', label: 'AI Mentor' },
        { path: '/feedback', label: 'Feedback' }
      );
    } else {
      // When not logged in, show features page instead of redirecting to login
      items.push(
        { path: '/features', label: 'Features' }
      );
    }

    return items;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-slate-900/90 backdrop-blur-lg shadow-lg' : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30 transition-transform group-hover:scale-105">
              <span className="text-xl font-bold bg-clip-text text-white">SG</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-indigo-400 transition-colors group-hover:from-blue-300 group-hover:to-indigo-300">
              Startup Genie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {getNavItems().map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(item.path) 
                    ? 'text-blue-400 bg-blue-900/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center mr-2">
                  <span className="text-sm text-slate-300 mr-2">
                    {user?.firstName || 'User'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.firstName?.[0] || 'U'}
                    </span>
                  </div>
                </div>
                <Button outline small onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button outline small>Login</Button>
                </Link>
                <Link to="/register">
                  <Button primary small>Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[${isScrolled ? '61px' : '77px'}] bg-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <div className="container mx-auto p-4">
          <div className="flex flex-col space-y-1">
            {getNavItems().map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(item.path) 
                    ? 'text-white bg-blue-600/20 border-l-4 border-blue-600 pl-3' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 mt-2 border-t border-white/10 grid grid-cols-2 gap-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center col-span-2 mb-2 px-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-white">
                        {user?.firstName?.[0] || 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-slate-300">
                      {user?.firstName || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="col-span-2 flex justify-center items-center px-4 py-3 rounded-lg font-medium bg-white/5 text-white hover:bg-white/10 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex justify-center items-center px-4 py-3 rounded-lg font-medium bg-white/5 text-white hover:bg-white/10 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex justify-center items-center px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 