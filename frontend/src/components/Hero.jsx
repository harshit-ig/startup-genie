import React from 'react';
import Button from './ui/Button';

const Hero = () => {
  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="py-20 px-4 relative">
      <div className="absolute top-40 right-0 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-20 left-10 w-60 h-60 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-6 backdrop-blur-md border border-blue-800">
          AI-Powered Business Solutions
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          Transform Your Vision Into Business Success
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-slate-300 leading-relaxed">
          Launch and scale your startup with confidence using our AI-powered business planning tools and expert guidance.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button primary to="/business-plan">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Start Your Journey
          </Button>
          <Button outline onClick={scrollToFeatures}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            See How It Works
          </Button>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <img src="https://placehold.co/100x40/blue/white?text=Forbes" alt="Forbes" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/100x40/blue/white?text=TechCrunch" alt="TechCrunch" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/100x40/blue/white?text=Wired" alt="Wired" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/100x40/blue/white?text=Bloomberg" alt="Bloomberg" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
        </div>
      </div>
    </div>
  );
};

export default Hero; 