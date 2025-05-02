import React from 'react';
import Navbar from '../components/Navbar';
import BackgroundGrid from '../components/ui/BackgroundGrid';
import Card from '../components/ui/Card';

const Terms = () => {
  return (
    <div className="relative min-h-screen">
      <BackgroundGrid />
      <Navbar />
      
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <Card className="prose prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Startup Genie. These Terms of Service govern your use of our website, products, and services.
              By accessing or using Startup Genie, you agree to be bound by these Terms. If you disagree with any part of the terms, 
              you may not access the service.
            </p>
            
            <h2>2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and up-to-date information. 
              You are responsible for safeguarding the password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2>3. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of 
              Startup Genie and its licensors. The Service is protected by copyright, trademark, and other laws.
              Our trademarks and trade dress may not be used in connection with any product or service without 
              the prior written consent of Startup Genie.
            </p>
            
            <h2>4. User Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, 
              videos, or other material. You are responsible for the content that you post on or through the Service, 
              including its legality, reliability, and appropriateness.
            </p>
            
            <h2>5. Subscription and Payment</h2>
            <p>
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and 
              periodic basis, depending on the type of subscription plan you select. At the end of each period, your subscription 
              will automatically renew under the same conditions unless you cancel it or Startup Genie cancels it.
            </p>
            
            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall Startup Genie, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
              inability to access or use the Service.
            </p>
            
            <h2>7. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              What constitutes a material change will be determined at our sole discretion.
              By continuing to access or use our Service after those revisions become effective, 
              you agree to be bound by the revised terms.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@startupgenie.com.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms; 