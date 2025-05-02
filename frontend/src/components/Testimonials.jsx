import React from 'react';
import Card from './ui/Card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      quote: "Startup Genie transformed my business planning process. The AI-generated insights helped us secure first-round funding in just 3 weeks.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "David Chen",
      role: "Founder, EcoVenture",
      quote: "The financial forecasting tool saved us countless hours. The accuracy of the projections impressed our investors and gave us confidence.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Emma Wright",
      role: "COO, HealthInnovate",
      quote: "As a non-technical founder, the AI advisor was like having a seasoned business partner guiding me through complex decisions.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-slate-900 to-indigo-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4 backdrop-blur-md border border-blue-800">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Trusted by Forward-Thinking Entrepreneurs
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join hundreds of founders who have accelerated their business growth with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} hover={false}>
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 opacity-30">
                    <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
                    <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
                  </svg>
                </div>
                <p className="text-slate-300 italic mb-6 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center mt-auto">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500" />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-blue-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 