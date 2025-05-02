import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BackgroundGrid from '../components/ui/BackgroundGrid';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundGrid />
      <Navbar />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Have questions about our platform? Want to learn more about how we can help your business succeed? 
              Reach out to our team and we'll get back to you soon.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Email</h4>
                      <p className="text-slate-400">support@startupgenie.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Phone</h4>
                      <p className="text-slate-400">+1 (123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Office</h4>
                      <p className="text-slate-400">
                        123 Business Avenue<br />
                        Tech District<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-lg font-medium mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-white/10 hover:bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-blue-400 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-purple-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-blue-700 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                    <p className="text-slate-400 mb-6 max-w-md mx-auto">
                      Thank you for reaching out to us. We've received your message and will get back to you shortly.
                    </p>
                    <Button outline onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Input
                        label="Your Name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                      
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="youremail@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                    </div>
                    
                    <Input
                      label="Subject"
                      type="text"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      className="mb-6"
                    />
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-slate-300">Message</label>
                      <textarea
                        name="message"
                        rows="5"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Tell us what you need help with..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && <p className="mt-1 text-red-400 text-sm">{errors.message}</p>}
                    </div>
                    
                    <Button primary type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 