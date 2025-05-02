import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import BackgroundGrid from '../components/ui/BackgroundGrid';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    category: '',
    feedback: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundGrid />
      <Navbar />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4 backdrop-blur-md border border-blue-800">
              Your Opinion Matters
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Share Your Feedback
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Help us improve Startup Genie by sharing your experience and suggestions.
            </p>
          </div>
          
          <Card>
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                <p className="text-slate-300 mb-6">
                  Your feedback has been submitted successfully. We appreciate your time and insights.
                </p>
                <Button 
                  primary
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Response
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">How would you rate your experience?</label>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        type="button"
                        key={rating}
                        onClick={() => setFormData({...formData, rating})}
                        className={`w-12 h-12 rounded-full ${
                          formData.rating >= rating 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white/10 text-slate-400'
                        } flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Feedback Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="ui">User Interface</option>
                    <option value="features">Feature Suggestions</option>
                    <option value="bugs">Bug Reports</option>
                    <option value="pricing">Pricing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Feedback</label>
                  <textarea 
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Share your thoughts, suggestions, or issues..."
                    rows={5}
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button primary type="submit">
                    Submit Feedback
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 