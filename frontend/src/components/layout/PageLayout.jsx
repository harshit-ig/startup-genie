import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import BackgroundGrid from '../ui/BackgroundGrid';

// This component will ensure proper spacing for all pages
const PageLayout = ({ children, className = "" }) => {
  return (
    <div className="flex flex-col min-h-screen relative text-white">
      <BackgroundGrid />
      <Navbar />
      {/* Add padding top to create space for the fixed navbar */}
      <main className={`flex-grow pt-24 md:pt-28 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout; 