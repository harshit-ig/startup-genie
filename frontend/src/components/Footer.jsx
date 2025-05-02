import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  // Footer Navigation Links
  const footerLinks = {
    product: [
      { label: 'Features', path: '/features' },
      { label: 'Pricing', path: '/#pricing-section' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Documentation', path: '/documentation' },
      { label: 'API', path: '/api' }
    ],
    company: [
      { label: 'About', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Blog', path: '/blog' },
      { label: 'Press', path: '/press' },
      { label: 'Partners', path: '/partners' }
    ],
    resources: [
      { label: 'Support', path: '/support' },
      { label: 'Help Center', path: '/help' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Status', path: '/status' },
      { label: 'Privacy Policy', path: '/privacy' }
    ]
  };
  
  // Handle scroll to section for links with hash
  const handleLinkClick = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const sectionId = path.split('#')[1];
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Social Media Icons
  const socialLinks = [
    { 
      name: 'Twitter', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>,
      hoverClass: 'hover:bg-blue-500' 
    },
    { 
      name: 'Facebook', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
      hoverClass: 'hover:bg-blue-700' 
    },
    { 
      name: 'LinkedIn', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
      hoverClass: 'hover:bg-blue-800' 
    },
    { 
      name: 'Instagram', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
      hoverClass: 'hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700' 
    },
    { 
      name: 'GitHub', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
      hoverClass: 'hover:bg-gray-800' 
    }
  ];
  
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-6 no-underline">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <span className="text-xl font-bold bg-clip-text text-white">SG</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-indigo-400">
                Startup Genie
              </span>
            </Link>
            
            <p className="text-slate-400 mb-8 max-w-md">
              Startup Genie is your AI-powered companion for building successful businesses. 
              We provide cutting-edge tools for entrepreneurs at every stage of their journey.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  aria-label={social.name}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-white/80 bg-white/5 transition-all no-underline ${social.hoverClass}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="text-slate-400 hover:text-blue-400 transition-colors inline-block no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-slate-400 hover:text-blue-400 transition-colors inline-block no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-slate-400 hover:text-blue-400 transition-colors inline-block no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2 text-white">Stay Updated</h3>
              <p className="text-slate-400">
                Subscribe to our newsletter for the latest updates, tips, and special offers.
              </p>
            </div>
            <div>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <button 
                  type="button"
                  className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-r-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-500 text-sm">
              © {year} Startup Genie. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/terms" className="text-slate-500 hover:text-blue-400 text-sm transition-colors no-underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-slate-500 hover:text-blue-400 text-sm transition-colors no-underline">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-slate-500 hover:text-blue-400 text-sm transition-colors no-underline">
              Cookie Policy
            </Link>
            <Link to="/sitemap" className="text-slate-500 hover:text-blue-400 text-sm transition-colors no-underline">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 