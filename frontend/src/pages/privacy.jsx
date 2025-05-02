import React from 'react';
import Navbar from '../components/Navbar';
import BackgroundGrid from '../components/ui/BackgroundGrid';
import Card from '../components/ui/Card';

const Privacy = () => {
  return (
    <div className="relative min-h-screen">
      <BackgroundGrid />
      <Navbar />
      
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <Card className="prose prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, use our services, 
              or communicate with us. This information may include your name, email address, business information, 
              and any other information you choose to provide.
            </p>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, such as to process transactions, 
              send you related information, and provide customer support. We may also use the information to send you 
              technical notices, updates, security alerts, and support and administrative messages.
            </p>
            
            <h2>3. Sharing of Information</h2>
            <p>
              We may share information about you in the following ways:
            </p>
            <ul>
              <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
              <li>In response to a request for information if we believe disclosure is in accordance with applicable law</li>
              <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Startup Genie or others</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, 
              disclosure, alteration, and destruction. However, no security system is impenetrable and we cannot guarantee the 
              security of our systems with 100% certainty.
            </p>
            
            <h2>5. Your Choices</h2>
            <p>
              You can access and update certain information about yourself from within your account settings. 
              You may also request that we delete your account entirely, and we will do so within a reasonable time frame, 
              although some information may remain in archived/backup copies for our records.
            </p>
            
            <h2>6. Cookies and Tracking Technologies</h2>
            <p>
              We and our third-party providers use cookies, web beacons, and other tracking technologies to track information 
              about your use of our services. We may combine this information with other information we collect about you. 
              You can modify your browser settings to decline cookies, but this may affect the functionality of our services.
            </p>
            
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 16, and we do not knowingly collect personal information from 
              children under 16. If we learn that we have collected personal information of a child under 16, we will take steps 
              to delete such information from our files as soon as possible.
            </p>
            
            <h2>8. Changes to this Policy</h2>
            <p>
              We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date 
              at the top of the policy and, in some cases, we may provide you with additional notice. We encourage you to review 
              the Privacy Policy whenever you access our services.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@startupgenie.com.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 