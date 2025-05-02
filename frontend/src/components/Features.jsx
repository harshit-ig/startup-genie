import React from 'react';
import Card from './ui/Card';

const Features = () => {
  const features = [
    {
      title: "Smart Business Planning",
      description: "Generate comprehensive business plans tailored to your industry and goals in minutes.",
      icon: "📊"
    },
    {
      title: "Financial Forecasting",
      description: "Get accurate financial projections with AI-powered analytics to secure funding confidently.",
      icon: "💰"
    },
    {
      title: "AI Business Advisor",
      description: "Receive personalized strategic advice and market insights from our advanced AI system.",
      icon: "🤖"
    },
    {
      title: "Competitive Analysis",
      description: "Understand your market position with detailed competitor insights and opportunity mapping.",
      icon: "🔍"
    }
  ];

  return (
    <div id="features-section" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4 backdrop-blur-md border border-blue-800">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Our comprehensive suite of tools gives you everything needed to launch, grow, and scale your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 