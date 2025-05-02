import React from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for early-stage startups and solo entrepreneurs.",
      features: [
        "AI Business Plan Generator",
        "Basic Financial Forecasting",
        "5 AI Advisor Sessions/month",
        "Standard Templates",
        "Email Support"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Growth",
      price: "$99",
      period: "/month",
      description: "Ideal for growing startups seeking funding and scaling.",
      features: [
        "Everything in Starter, plus:",
        "Advanced Financial Modeling",
        "Unlimited AI Advisor Sessions",
        "Competitor Analysis",
        "Market Trend Reports",
        "Priority Support"
      ],
      cta: "Choose Growth",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "$249",
      period: "/month",
      description: "For established businesses and high-growth startups.",
      features: [
        "Everything in Growth, plus:",
        "Custom Business Intelligence",
        "Dedicated Success Manager",
        "API Access",
        "White-labeled Reports",
        "24/7 Phone Support"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div id="pricing-section" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4 backdrop-blur-md border border-blue-800">
            Pricing Plans
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Choose the Right Plan for Your Business
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Flexible pricing options designed to support your business at every stage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="relative h-full">
              {plan.highlight && (
                <div className="absolute -top-5 left-0 right-0 mx-auto text-center">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <Card hover={false} className={`h-full flex flex-col ${plan.highlight ? 'border-blue-500 shadow-xl shadow-blue-500/10' : ''}`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-slate-400 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-slate-300 mt-3">{plan.description}</p>
                </div>
                
                <ul className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button primary={plan.highlight} outline={!plan.highlight} className="w-full mt-auto">
                  {plan.cta}
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 