import React from 'react';
import Navbar from '../components/Navbar';
import BackgroundGrid from '../components/ui/BackgroundGrid';
import { FiTarget, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';

const AboutCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

const TeamMember = ({ name, role, image }) => {
  return (
    <div className="text-center">
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400 dark:text-gray-500">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{role}</p>
    </div>
  );
};

const About = () => {
  return (
    <div className="relative min-h-screen">
      <BackgroundGrid />
      <Navbar />
      
      <div className="py-10 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
              About Startup Genie
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              We're on a mission to help entrepreneurs and innovators transform their ideas into successful businesses with the power of AI.
            </p>
          </div>
          
          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <AboutCard 
              icon={<FiTarget className="w-6 h-6 text-blue-600 dark:text-blue-400" />} 
              title="Our Mission" 
              description="To democratize entrepreneurship by making business planning accessible to everyone with innovative ideas."
            />
            <AboutCard 
              icon={<FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />} 
              title="Customer Focus" 
              description="We put our users first, creating tools that address real entrepreneurial challenges and pain points."
            />
            <AboutCard 
              icon={<FiTrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />} 
              title="Innovation" 
              description="We continuously push the boundaries of AI to deliver smarter insights and better business outcomes."
            />
            <AboutCard 
              icon={<FiAward className="w-6 h-6 text-blue-600 dark:text-blue-400" />} 
              title="Excellence" 
              description="We're committed to quality in everything we do, from our technology to our customer service."
            />
          </div>
          
          {/* Our Story */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Startup Genie was born from a simple observation: too many brilliant business ideas never make it past the ideation stage due to lack of guidance, resources, or confidence.
              </p>
              <p>
                Our founders, entrepreneurs themselves, experienced firsthand the challenges of turning concepts into viable businesses. They recognized that while creativity and passion are abundant, structured business planning and expert guidance are often inaccessible to early-stage entrepreneurs.
              </p>
              <p>
                In 2023, they set out to change this by creating an AI-powered platform that combines the strategic thinking of business experts with the accessibility of modern technology. Startup Genie was created to be the partner entrepreneurs wish they had when starting out.
              </p>
              <p>
                Today, we're proud to help thousands of entrepreneurs across the globe validate their ideas, refine their business models, and confidently pursue their entrepreneurial dreams.
              </p>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <TeamMember name="Alex Morgan" role="CEO & Co-Founder" />
              <TeamMember name="Samantha Lee" role="CTO & Co-Founder" />
              <TeamMember name="David Chen" role="Head of AI" />
              <TeamMember name="Maria Rodriguez" role="Lead Designer" />
              <TeamMember name="James Wilson" role="Business Development" />
              <TeamMember name="Priya Patel" role="Customer Success" />
              <TeamMember name="Michael Zhang" role="Senior Developer" />
              <TeamMember name="Olivia Johnson" role="Marketing Lead" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 