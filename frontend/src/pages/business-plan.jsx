import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { aiService } from '../services/aiService';
import { toast } from 'react-toastify';
import BackgroundGrid from '../components/ui/BackgroundGrid';

const BusinessPlan = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const abortControllerRef = useRef(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Business Information
    businessName: '',
    industry: '',
    businessDescription: '',
    vision: '',
    
    // Step 2: Target Market
    targetCustomers: '',
    marketSize: '',
    customerPains: '',
    
    // Step 3: Competition & Strategy
    competitors: '',
    uniqueSellingProposition: '',
    goToMarketStrategy: '',
    
    // Step 4: Financial Projections
    initialInvestment: '',
    revenueStreams: '',
    projectedGrowth: '',
    breakEvenEstimate: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle moving to next step with improved validation
  const handleNextStep = () => {
    // Reset form errors
    setFormErrors({});
    let hasErrors = false;
    const errors = {};
    
    // Simple validation - ensure required fields are filled
    if (currentStep === 1) {
      if (!formData.businessName) {
        errors.businessName = 'Business name is required';
        hasErrors = true;
      }
      if (!formData.industry) {
        errors.industry = 'Please select an industry';
        hasErrors = true;
      }
      if (!formData.businessDescription) {
        errors.businessDescription = 'Business description is required';
        hasErrors = true;
      }
    } else if (currentStep === 2) {
      if (!formData.targetCustomers) {
        errors.targetCustomers = 'Target customers information is required';
        hasErrors = true;
      }
      if (!formData.marketSize) {
        errors.marketSize = 'Market size information is required';
        hasErrors = true;
      }
    } else if (currentStep === 3) {
      if (!formData.competitors) {
        errors.competitors = 'Competitor information is required';
        hasErrors = true;
      }
      if (!formData.uniqueSellingProposition) {
        errors.uniqueSellingProposition = 'Unique selling proposition is required';
        hasErrors = true;
      }
    }
    
    // If validation fails, set errors and show toast
    if (hasErrors) {
      setFormErrors(errors);
      toast.error('Please fill in all required fields');
      return;
    }
    
    // If validation passes, move to next step
    setCurrentStep(currentStep + 1);
    
    // If it's the final step, generate business plan
    if (currentStep === 4) {
      generateBusinessPlan();
    }
  };

  // Handle moving to previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Generate business plan using AI
  const generateBusinessPlan = async () => {
    setIsGenerating(true);
    setGenerationProgress('');
    
    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller
    abortControllerRef.current = new AbortController();
    
    try {
      // Craft a detailed prompt for the AI
      const prompt = `[BUSINESS PLAN REQUEST]
Generate a comprehensive business plan for ${formData.businessName} in the ${formData.industry} industry with the following details:

Business Description: ${formData.businessDescription}
Vision: ${formData.vision}
Target Customers: ${formData.targetCustomers}
Market Size: ${formData.marketSize}
Customer Pain Points: ${formData.customerPains}
Competitors: ${formData.competitors}
Unique Selling Proposition: ${formData.uniqueSellingProposition}
Go-to-Market Strategy: ${formData.goToMarketStrategy}
Initial Investment: ${formData.initialInvestment}
Revenue Streams: ${formData.revenueStreams}
Projected Growth: ${formData.projectedGrowth}
Break-even Estimate: ${formData.breakEvenEstimate}

Format the business plan with the following sections:
1. Executive Summary
2. Company Description
3. Market Analysis
4. Competitive Analysis
5. Product/Service Line
6. Marketing and Sales Strategy
7. Financial Projections
8. Implementation Timeline

IMPORTANT: For dashboard data extraction, include a clearly formatted "Dashboard Metrics" section at the end with the following EXACT format:

## Dashboard Metrics
Revenue: $[number] (e.g., $100,000)
Expenses: $[number] (e.g., $40,000)
Profit Margin: [number]% (e.g., 60%)
Customer Growth: [number] (e.g., 1200)
Market Growth Rate: [number]% (e.g., 15%)
Customer Acquisition Cost: $[number] (e.g., $150)
Customer Lifetime Value: $[number] (e.g., $5,000)

## Monthly Revenue Projections
January: $[number]
February: $[number]
March: $[number]
April: $[number]
May: $[number]
June: $[number]
July: $[number]
August: $[number]
September: $[number]
October: $[number]
November: $[number]
December: $[number]

Always use exact dollar signs ($) with all financial figures and percentage signs (%) with all percentages.`;

      // Send the prompt to the AI service
      const { success, promptId, error } = await aiService.createPrompt(prompt);
      
      if (!success) {
        throw new Error(error || 'Failed to generate business plan');
      }
      
      // Initialize accumulated response
      let accumulatedResponse = '';
      
      // Stream the response
      await aiService.streamResponse(promptId, {
        difficulty: 'expert', // Use expert difficulty for business plans
        onToken: (tokens) => {
          // Update the accumulated response
          accumulatedResponse += tokens.join('');
          setGenerationProgress(accumulatedResponse);
        },
        onComplete: () => {
          // Store the complete business plan in local storage
          localStorage.setItem('businessPlan', accumulatedResponse);
          
          // Parse the dashboard metrics from the response
          try {
            // Extract monthly revenue data if possible
            const monthlyRevenue = extractMonthlyRevenue(accumulatedResponse);
            
            // Extract dashboard data with improved patterns
            const businessPlanData = {
              name: formData.businessName,
              industry: formData.industry,
              revenue: extractMetric(accumulatedResponse, 'revenue', '$100,000'),
              expenses: extractMetric(accumulatedResponse, 'expenses', '$40,000'),
              profitMargin: extractMetric(accumulatedResponse, 'profit margin', '60%'),
              customerGrowth: extractMetric(accumulatedResponse, 'customer growth|customers|user base', '500'),
              marketAnalysisProgress: 100,
              financialProjectionsProgress: 100,
              marketingStrategyProgress: 100,
              businessOverviewProgress: 100,
              monthlyRevenue: monthlyRevenue
            };
            
            // Save to localStorage for dashboard to use
            localStorage.setItem('businessPlanData', JSON.stringify(businessPlanData));
            
            // Navigate to dashboard
            setIsGenerating(false);
            toast.success('Business plan generated successfully!');
            navigate('/dashboard');
          } catch (err) {
            console.error('Error parsing AI response:', err);
            
            // Still save basic data even if parsing fails
            const fallbackData = {
              name: formData.businessName,
              industry: formData.industry,
              revenue: '$100,000',
              expenses: '$40,000', 
              profitMargin: '60%',
              customerGrowth: '500',
              marketAnalysisProgress: 100,
              financialProjectionsProgress: 100,
              marketingStrategyProgress: 100,
              businessOverviewProgress: 100
            };
            
            localStorage.setItem('businessPlanData', JSON.stringify(fallbackData));
            
            toast.warning('Generated plan may have formatting issues, but we saved it anyway!');
            setIsGenerating(false);
            navigate('/dashboard');
          }
        },
        onError: (err) => {
          console.error('Error streaming business plan:', err);
          toast.error('Error generating business plan. Please try again.');
          setIsGenerating(false);
        },
        abortSignal: abortControllerRef.current.signal
      });
    } catch (err) {
      console.error('Error in business plan generation:', err);
      toast.error('Something went wrong. Please try again.');
      setIsGenerating(false);
    }
  };
  
  // Helper function to extract metrics from AI response
  const extractMetric = (text, metricName, defaultValue) => {
    try {
      // Look for Dashboard Metrics section first
      const dashboardSection = text.match(/##\s*Dashboard\s*Metrics([\s\S]*?)(?=##|$)/i);
      const searchText = dashboardSection ? dashboardSection[1] : text;
      
      // More advanced extraction patterns
      const patterns = [
        // Look for the exact format we specified in the prompt
        new RegExp(`${metricName}\\s*:\\s*([$€£]?[0-9,.]+%?)`, 'i'),
        // Try to find metrics in the format "Metric Name: $100,000"
        new RegExp(`${metricName}[:\\s]+([$€£]?[0-9,.]+%?)`, 'i'),
        // Try to find metrics in the format "The metric name is $100,000"
        new RegExp(`${metricName}\\s+(?:is|will be|of)\\s+([$€£]?[0-9,.]+%?)`, 'i'),
        // Try to find metrics in the format "$100,000 for metric name"
        new RegExp(`([$€£]?[0-9,.]+%?)\\s+(?:for|as|in)\\s+${metricName}`, 'i')
      ];
      
      // Try each pattern until we find a match
      for (const pattern of patterns) {
        const match = searchText.match(pattern);
        if (match && match[1]) {
          return match[1].trim();
        }
      }
      
      // If no match is found, search for numbers near the metric name
      const nearPattern = new RegExp(`(?:${metricName}.{0,30}([$€£]?[0-9,.]+%?))|([$€£]?[0-9,.]+%?).{0,30}${metricName}`, 'i');
      const nearMatch = searchText.match(nearPattern);
      if (nearMatch && (nearMatch[1] || nearMatch[2])) {
        return (nearMatch[1] || nearMatch[2]).trim();
      }
      
      return defaultValue;
    } catch (e) {
      console.error(`Error extracting ${metricName}:`, e);
      return defaultValue;
    }
  };

  // Extract monthly revenue data for charts
  const extractMonthlyRevenue = (text) => {
    try {
      // Look for Monthly Revenue Projections section
      const monthlySection = text.match(/##\s*Monthly\s*Revenue\s*Projections([\s\S]*?)(?=##|$)/i);
      const searchText = monthlySection ? monthlySection[1] : text;
      
      // Month names to search for
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December',
                          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Create an array to store the monthly values
      const monthlyValues = Array(12).fill(0);
      let foundAny = false;
      
      // Look for each month with a value
      monthNames.forEach((month, index) => {
        const actualIndex = index % 12; // Convert to 0-11 range
        
        // Try to find the month with an associated value
        const monthPattern = new RegExp(`${month}[\\s\\-:]*([\\$€£]?[0-9,.]+)`, 'i');
        const match = searchText.match(monthPattern);
        
        if (match && match[1]) {
          // Clean and convert the value
          const valueStr = match[1].replace(/[$€£,]/g, '');
          const value = parseFloat(valueStr);
          if (!isNaN(value)) {
            monthlyValues[actualIndex] = value;
            foundAny = true;
          }
        }
      });
      
      if (foundAny) {
        return monthlyValues;
      }
      
      return null; // Use default if no monthly data found
    } catch (e) {
      console.error('Error extracting monthly revenue:', e);
      return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundGrid />
      <Navbar />
      
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm font-medium mb-4 backdrop-blur-md border border-blue-800">
              AI-Powered
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Create Your Business Plan
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Generate a comprehensive, investor-ready business plan in minutes with our advanced AI technology.
            </p>
          </div>
          
          <Card>
            {isGenerating ? (
              <div className="py-10 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30 text-blue-400 mb-4">
                    <svg className="animate-spin w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Generating Your Business Plan</h2>
                  <p className="text-slate-400">Our AI is crafting a customized business plan based on your inputs...</p>
                </div>
                
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
                
                <div className="max-w-3xl mx-auto mt-8 text-left bg-white/5 rounded-xl p-6">
                  <p className="text-slate-300 whitespace-pre-wrap">{generationProgress}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 border-r border-white/10 pr-8">
                  <h3 className="text-xl font-bold mb-4">Steps to Follow</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-500' : 'bg-white/20'} text-white flex items-center justify-center mr-3 shrink-0`}>1</div>
                      <div>
                        <h4 className="font-medium">Business Information</h4>
                        <p className="text-slate-400 text-sm">Tell us about your business concept and goals</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-500' : 'bg-white/20'} text-white flex items-center justify-center mr-3 shrink-0`}>2</div>
                      <div>
                        <h4 className="font-medium">Target Market</h4>
                        <p className="text-slate-400 text-sm">Define your audience and market opportunity</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-500' : 'bg-white/20'} text-white flex items-center justify-center mr-3 shrink-0`}>3</div>
                      <div>
                        <h4 className="font-medium">Competition & Strategy</h4>
                        <p className="text-slate-400 text-sm">Analyze competitors and define your advantage</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-blue-500' : 'bg-white/20'} text-white flex items-center justify-center mr-3 shrink-0`}>4</div>
                      <div>
                        <h4 className="font-medium">Financial Projections</h4>
                        <p className="text-slate-400 text-sm">Forecast revenues, costs, and growth</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="md:col-span-2">
                  {/* Step 1: Business Information */}
                  {currentStep === 1 && (
                    <>
                      <h3 className="text-xl font-bold mb-6">Business Information</h3>
                      
                      <form className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Business Name*</label>
                          <input 
                            type="text" 
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${formErrors.businessName ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter your business name"
                            required
                          />
                          {formErrors.businessName && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.businessName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Industry*</label>
                          <select 
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="" className="bg-gray-800 text-white">Select Industry</option>
                            <option value="Technology" className="bg-gray-800 text-white">Technology</option>
                            <option value="Healthcare" className="bg-gray-800 text-white">Healthcare</option>
                            <option value="Finance" className="bg-gray-800 text-white">Finance</option>
                            <option value="Retail" className="bg-gray-800 text-white">Retail</option>
                            <option value="Manufacturing" className="bg-gray-800 text-white">Manufacturing</option>
                            <option value="Education" className="bg-gray-800 text-white">Education</option>
                            <option value="Entertainment" className="bg-gray-800 text-white">Entertainment</option>
                            <option value="Food & Beverage" className="bg-gray-800 text-white">Food & Beverage</option>
                            <option value="Real Estate" className="bg-gray-800 text-white">Real Estate</option>
                            <option value="Other" className="bg-gray-800 text-white">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Business Description*</label>
                          <textarea 
                            name="businessDescription"
                            value={formData.businessDescription}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your business concept, products/services offered, and how it solves a problem"
                            rows={4}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Vision & Mission</label>
                          <textarea 
                            name="vision"
                            value={formData.vision}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="What is your long-term vision for the company? What impact do you want to make?"
                            rows={3}
                          />
                        </div>
                      </form>
                    </>
                  )}
                  
                  {/* Step 2: Target Market */}
                  {currentStep === 2 && (
                    <>
                      <h3 className="text-xl font-bold mb-6">Target Market</h3>
                      
                      <form className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Target Customers*</label>
                          <textarea 
                            name="targetCustomers"
                            value={formData.targetCustomers}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your ideal customers - demographics, behaviors, needs, etc."
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Market Size & Potential*</label>
                          <textarea 
                            name="marketSize"
                            value={formData.marketSize}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe the size of your target market, growth potential, and overall market opportunity"
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Customer Pain Points</label>
                          <textarea 
                            name="customerPains"
                            value={formData.customerPains}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="What problems do your customers face that your business will solve?"
                            rows={3}
                          />
                        </div>
                      </form>
                    </>
                  )}
                  
                  {/* Step 3: Competition & Strategy */}
                  {currentStep === 3 && (
                    <>
                      <h3 className="text-xl font-bold mb-6">Competition & Strategy</h3>
                      
                      <form className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Competitors*</label>
                          <textarea 
                            name="competitors"
                            value={formData.competitors}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Who are your main competitors? What are their strengths and weaknesses?"
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Unique Selling Proposition*</label>
                          <textarea 
                            name="uniqueSellingProposition"
                            value={formData.uniqueSellingProposition}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="What makes your business unique? How will you differentiate from competitors?"
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Go-to-Market Strategy</label>
                          <textarea 
                            name="goToMarketStrategy"
                            value={formData.goToMarketStrategy}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How will you launch and grow your business? What channels will you use to reach customers?"
                            rows={3}
                          />
                        </div>
                      </form>
                    </>
                  )}
                  
                  {/* Step 4: Financial Projections */}
                  {currentStep === 4 && (
                    <>
                      <h3 className="text-xl font-bold mb-6">Financial Projections</h3>
                      
                      <form className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Initial Investment</label>
                          <input 
                            type="text" 
                            name="initialInvestment"
                            value={formData.initialInvestment}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How much funding do you need to start (e.g., $50,000)?"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Revenue Streams</label>
                          <textarea 
                            name="revenueStreams"
                            value={formData.revenueStreams}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How will your business make money? Describe your pricing model and revenue sources."
                            rows={3}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Projected Growth</label>
                          <textarea 
                            name="projectedGrowth"
                            value={formData.projectedGrowth}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="What are your growth projections for the first 1-3 years?"
                            rows={2}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Break-even Estimate</label>
                          <input 
                            type="text" 
                            name="breakEvenEstimate"
                            value={formData.breakEvenEstimate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="When do you expect to break even (e.g., 18 months)?"
                          />
                        </div>
                      </form>
                    </>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 && (
                      <Button
                        onClick={handlePrevStep}
                        className="bg-white/10 hover:bg-white/20"
                      >
                        Back
                      </Button>
                    )}
                    <div className="flex-1"></div>
                    <Button
                      primary
                      onClick={handleNextStep}
                    >
                      {currentStep < 4 ? 'Continue' : 'Generate Business Plan'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlan; 