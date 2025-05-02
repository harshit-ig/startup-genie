import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import BackgroundGrid from '../components/ui/BackgroundGrid';

const FeaturesPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBusinessPlanClick = () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to access the Business Plan generator');
      navigate('/login', { state: { from: '/business-plan' } });
    } else {
      navigate('/business-plan');
    }
  };

  const features = [
    {
      title: "Smart Business Planning",
      description: "Our AI-powered business plan generator analyzes market trends, competitive landscapes, and your specific goals to create comprehensive, investor-ready business plans in minutes. Each plan includes executive summaries, market analysis, financial projections, and actionable implementation strategies.",
      icon: "📊",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Financial Forecasting",
      description: "Get accurate financial projections with our advanced algorithms that analyze industry benchmarks and economic indicators. Generate revenue projections, expense forecasts, cash flow analysis, and break-even calculations that will impress investors and guide your business decisions.",
      icon: "💰",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "AI Business Advisor",
      description: "Access personalized business advice 24/7 with our AI mentor. Ask questions, get strategic recommendations, solve challenges, and receive guidance on everything from marketing strategies to operational efficiency improvements based on your specific business context.",
      icon: "🤖",
      color: "from-violet-500 to-purple-600"
    },
    {
      title: "Competitive Analysis",
      description: "Stay ahead of the competition with our comprehensive competitive analysis tools. Identify market gaps, analyze competitor strengths and weaknesses, and discover untapped opportunities. Our AI continuously monitors the market to keep your strategy up-to-date.",
      icon: "🔍",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Interactive Dashboard",
      description: "Track your business performance with our intuitive dashboard that visualizes key metrics, milestones, and growth indicators. Monitor revenue trends, customer acquisition costs, market penetration, and other critical KPIs to make data-driven decisions.",
      icon: "📈",
      color: "from-rose-500 to-pink-600"
    },
    {
      title: "Document Generation",
      description: "Create professional business documents with our customizable templates. From pitch decks and investor presentations to marketing plans and executive summaries, our tool helps you generate polished documents that communicate your vision effectively.",
      icon: "📄",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <div className="py-28 px-4 relative">
      <BackgroundGrid />
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4 backdrop-blur-md border border-blue-800">
            Platform Features
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Powerful Tools for Your Business Success
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive suite of AI-powered tools gives you everything needed to launch, grow, and scale your business effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Ready to Experience These Features?</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button primary>
                Create Free Account
              </Button>
            </Link>
            <Button outline onClick={handleBusinessPlanClick}>
              Try Business Plan Generator
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage; 