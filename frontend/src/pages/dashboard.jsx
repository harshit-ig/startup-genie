import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import BackgroundGrid from '../components/ui/BackgroundGrid';

const Dashboard = () => {
  // State for business plan data from localStorage
  const [businessPlanData, setBusinessPlanData] = useState(null);
  const [timeframe, setTimeframe] = useState('last30');
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [fullBusinessPlan, setFullBusinessPlan] = useState('');
  
  // Default data for charts
  const defaultRevenueData = [10, 25, 30, 40, 50, 60, 70, 75, 80, 85, 90, 95];
  const [revenueData, setRevenueData] = useState(defaultRevenueData);
  const [actualRevenueData, setActualRevenueData] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Default metrics data for when parsing fails
  const defaultMetrics = {
    name: 'Your Business',
    industry: 'Technology',
    revenue: '$125,000',
    expenses: '$50,000',
    profitMargin: '60%',
    customerGrowth: '1,500',
    marketAnalysisProgress: 100,
    financialProjectionsProgress: 100,
    marketingStrategyProgress: 100,
    businessOverviewProgress: 100,
    monthlyRevenue: [850, 920, 1050, 980, 1200, 1350, 1250, 1500, 1650, 1600, 1800, 2100]
  };
  
  // Helper function to generate random growth percentage (for visual appeal)
  const getRandomGrowth = (min = 2, max = 20) => {
    return `+${(Math.random() * (max - min) + min).toFixed(1)}%`;
  };
  
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete business description", status: "pending" },
    { id: 2, title: "Define target market", status: "pending" },
    { id: 3, title: "Research competitors", status: "pending" },
    { id: 4, title: "Create financial projections", status: "pending" },
    { id: 5, title: "Develop marketing strategy", status: "pending" }
  ]);

  // Load business plan data from localStorage
  useEffect(() => {
    try {
      // Load business plan data
      const savedData = localStorage.getItem('businessPlanData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Apply default values for any missing fields
        const processedData = {
          ...defaultMetrics,
          ...parsedData
        };
        
        setBusinessPlanData(processedData);
        
        // Update tasks based on business plan data
        setTasks(prevTasks => {
          const updatedTasks = [...prevTasks];
          updatedTasks[0].status = processedData.businessOverviewProgress === 100 ? "completed" : "in-progress";
          updatedTasks[1].status = processedData.marketAnalysisProgress === 100 ? "completed" : "in-progress";
          updatedTasks[3].status = processedData.financialProjectionsProgress === 100 ? "completed" : "in-progress";
          updatedTasks[4].status = processedData.marketingStrategyProgress === 100 ? "completed" : "in-progress";
          return updatedTasks;
        });
        
        // Generate revenue data from the AI output
        if (processedData.monthlyRevenue && Array.isArray(processedData.monthlyRevenue)) {
          // Store the actual revenue values
          setActualRevenueData(processedData.monthlyRevenue);
          
          // If the AI successfully extracted monthly data, use it
          const maxValue = Math.max(...processedData.monthlyRevenue);
          const normalizedData = processedData.monthlyRevenue.map(value => 
            maxValue > 0 ? Math.round((value / maxValue) * 100) : 0
          );
          setRevenueData(normalizedData);
        } else {
          // Fall back to simulated data based on the revenue value
          const baseRevenue = parseInt(processedData.revenue.replace(/[$,]/g, '')) || 10000;
          
          // Create monthly values with natural variations
          const baseMonthly = baseRevenue / 12;
          const monthlyValues = [
            Math.round(baseMonthly * 0.85),
            Math.round(baseMonthly * 0.92),
            Math.round(baseMonthly * 1.05),
            Math.round(baseMonthly * 0.98),
            Math.round(baseMonthly * 1.2),
            Math.round(baseMonthly * 1.35),
            Math.round(baseMonthly * 1.25),
            Math.round(baseMonthly * 1.5),
            Math.round(baseMonthly * 1.65),
            Math.round(baseMonthly * 1.6),
            Math.round(baseMonthly * 1.8),
            Math.round(baseMonthly * 2.1)
          ];
          
          // Store the actual revenue values
          setActualRevenueData(monthlyValues);
          
          // Normalize to percentages for the chart (0-100)
          const maxValue = Math.max(...monthlyValues);
          const normalizedData = monthlyValues.map(value => Math.round((value / maxValue) * 100));
          setRevenueData(normalizedData);
        }

        // Also load the full business plan text
        const fullPlan = localStorage.getItem('businessPlan');
        if (fullPlan) {
          setFullBusinessPlan(fullPlan);
        }
      } else {
        // No saved data, use default metrics
        setBusinessPlanData(defaultMetrics);
        
        // Set the default actual revenue data
        setActualRevenueData(defaultMetrics.monthlyRevenue);
        
        // Update tasks to show in-progress
        setTasks(prevTasks => {
          const updatedTasks = [...prevTasks];
          updatedTasks.forEach(task => {
            task.status = "pending";
          });
          return updatedTasks;
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fall back to default data on error
      setBusinessPlanData(defaultMetrics);
      setActualRevenueData(defaultMetrics.monthlyRevenue);
    }
  }, []);

  // Calculate overall completion
  const getOverallCompletion = () => {
    if (!businessPlanData) return 40; // Default value
    
    const { 
      businessOverviewProgress = 0, 
      marketAnalysisProgress = 0,
      financialProjectionsProgress = 0,
      marketingStrategyProgress = 0
    } = businessPlanData;
    
    return Math.round((businessOverviewProgress + marketAnalysisProgress + 
                      financialProjectionsProgress + marketingStrategyProgress) / 4);
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundGrid />
      <Navbar />
      
      <div className="py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {businessPlanData ? `${businessPlanData.name} Dashboard` : 'Business Dashboard'}
              </h1>
              <p className="text-slate-400">
                {businessPlanData ? `${businessPlanData.industry} Industry` : 'Track your progress and business metrics'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
              <select 
                className="bg-white/10 text-white border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="last30">Last 30 days</option>
                <option value="last90">Last 90 days</option>
                <option value="last6m">Last 6 months</option>
                <option value="lastyear">Last year</option>
                <option value="alltime">All time</option>
              </select>
              
              {!businessPlanData && (
                <Link to="/business-plan">
                  <Button primary>Create Business Plan</Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-medium">Revenue Forecast</h3>
                <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{businessPlanData?.revenue || '$24,500'}</span>
                <span className="text-green-400 text-sm font-medium">{getRandomGrowth()}</span>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-medium">Expenses</h3>
                <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{businessPlanData?.expenses || '$9,280'}</span>
                <span className="text-red-400 text-sm font-medium">{getRandomGrowth()}</span>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-medium">Profit Margin</h3>
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{businessPlanData?.profitMargin || '62.1%'}</span>
                <span className="text-green-400 text-sm font-medium">{getRandomGrowth()}</span>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-medium">Customer Growth</h3>
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{businessPlanData?.customerGrowth || '1,245'}</span>
                <span className="text-green-400 text-sm font-medium">{getRandomGrowth()}</span>
              </div>
            </Card>
          </div>
          
          {/* Revenue Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Revenue Performance</h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs text-slate-400">Revenue</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-xs text-slate-400">Projected</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-1 grid-rows-4">
                  <div className="border-t border-white/10"></div>
                  <div className="border-t border-white/10"></div>
                  <div className="border-t border-white/10"></div>
                  <div className="border-t border-white/10"></div>
                </div>
                
                {/* Month labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-slate-500">
                  {months.map((month, i) => (
                    <div key={i}>{month}</div>
                  ))}
                </div>
                
                {/* Line Chart */}
                <div className="absolute inset-0 mt-4 mb-6">
                  {/* Actual revenue line */}
                  <svg className="w-full h-full" viewBox="0 0 1100 300" preserveAspectRatio="none">
                    <polyline
                      points={actualRevenueData.map((value, index) => {
                        const x = (index / (actualRevenueData.length - 1)) * 1100;
                        const maxValue = Math.max(...actualRevenueData);
                        const y = 300 - ((value / maxValue) * 280);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Points with values */}
                    {actualRevenueData.map((value, index) => {
                      const x = (index / (actualRevenueData.length - 1)) * 1100;
                      const maxValue = Math.max(...actualRevenueData);
                      const y = 300 - ((value / maxValue) * 280);
                      return (
                        <g key={index} className="group">
                          <circle
                            cx={x}
                            cy={y}
                            r="6"
                            fill="#4ade80"
                            stroke="#0f172a"
                            strokeWidth="2"
                            className="cursor-pointer"
                          />
                          <g className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <rect
                              x={x - 35}
                              y={y - 35}
                              width="70"
                              height="25"
                              rx="4"
                              fill="white"
                            />
                            <text
                              x={x}
                              y={y - 18}
                              textAnchor="middle"
                              fontSize="12"
                              fontWeight="bold"
                              fill="#1e293b"
                            >
                              ${value}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-bold mb-6">Task Completion</h3>
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      task.status === 'completed' ? 'bg-green-500' : 
                      task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-slate-500'
                    }`}></div>
                    <span className={`${
                      task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'
                    }`}>{task.title}</span>
                    <span className="text-xs ml-auto">
                      {task.status === 'completed' ? 'Done' : 
                       task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-slate-400 text-sm mb-2">Overall Completion</p>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" 
                         style={{ width: `${getOverallCompletion()}%` }}></div>
                  </div>
                  <p className="text-lg font-bold mt-2">{getOverallCompletion()}%</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Business Plan Progress */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Business Plan Progress</h3>
              {businessPlanData ? (
                <div className="flex gap-2">
                  <Button primary small onClick={() => {
                    const businessPlan = localStorage.getItem('businessPlan');
                    if (businessPlan) {
                      // Create a blob and download link for the business plan
                      const blob = new Blob([businessPlan], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${businessPlanData.name.replace(/\s+/g, '_')}_Business_Plan.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }
                  }}>
                    Download Plan
                  </Button>
                  <Button small onClick={() => {
                    // Open modal or navigate to view plan
                    setShowPlanModal(true);
                  }}>
                    View Plan
                  </Button>
                </div>
              ) : (
                <Link to="/business-plan">
                  <button className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                    Create Plan
                  </button>
                </Link>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <div className="mb-3 flex justify-between items-center">
                  <h4 className="text-sm font-medium">Business Overview</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    businessPlanData?.businessOverviewProgress === 100 
                      ? 'bg-green-500/20 text-green-400' 
                      : businessPlanData?.businessOverviewProgress > 0
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {businessPlanData?.businessOverviewProgress === 100 
                      ? 'Complete' 
                      : businessPlanData?.businessOverviewProgress > 0
                        ? 'In Progress'
                        : 'Pending'}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" 
                       style={{ width: `${businessPlanData?.businessOverviewProgress || 0}%` }}></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="mb-3 flex justify-between items-center">
                  <h4 className="text-sm font-medium">Market Analysis</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    businessPlanData?.marketAnalysisProgress === 100 
                      ? 'bg-green-500/20 text-green-400' 
                      : businessPlanData?.marketAnalysisProgress > 0
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {businessPlanData?.marketAnalysisProgress === 100 
                      ? 'Complete' 
                      : businessPlanData?.marketAnalysisProgress > 0
                        ? 'In Progress'
                        : 'Pending'}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" 
                       style={{ width: `${businessPlanData?.marketAnalysisProgress || 0}%` }}></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="mb-3 flex justify-between items-center">
                  <h4 className="text-sm font-medium">Financial Projections</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    businessPlanData?.financialProjectionsProgress === 100 
                      ? 'bg-green-500/20 text-green-400' 
                      : businessPlanData?.financialProjectionsProgress > 0
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {businessPlanData?.financialProjectionsProgress === 100 
                      ? 'Complete' 
                      : businessPlanData?.financialProjectionsProgress > 0
                        ? 'In Progress'
                        : 'Pending'}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" 
                       style={{ width: `${businessPlanData?.financialProjectionsProgress || 0}%` }}></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="mb-3 flex justify-between items-center">
                  <h4 className="text-sm font-medium">Marketing Strategy</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    businessPlanData?.marketingStrategyProgress === 100 
                      ? 'bg-green-500/20 text-green-400' 
                      : businessPlanData?.marketingStrategyProgress > 0
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {businessPlanData?.marketingStrategyProgress === 100 
                      ? 'Complete' 
                      : businessPlanData?.marketingStrategyProgress > 0
                        ? 'In Progress'
                        : 'Pending'}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" 
                       style={{ width: `${businessPlanData?.marketingStrategyProgress || 0}%` }}></div>
                </div>
              </div>
            </div>
            
            {!businessPlanData && (
              <div className="mt-8 text-center">
                <p className="text-slate-400 mb-4">You haven't created a business plan yet.</p>
                <Link to="/business-plan">
                  <Button primary>Create Your Business Plan</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
      
      {/* Full Business Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">{businessPlanData?.name} Business Plan</h3>
              <button 
                onClick={() => setShowPlanModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="whitespace-pre-wrap text-white">{fullBusinessPlan}</div>
            </div>
            <div className="p-4 border-t border-gray-800 flex justify-end">
              <Button 
                primary 
                onClick={() => {
                  // Download functionality
                  const blob = new Blob([fullBusinessPlan], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${businessPlanData?.name.replace(/\s+/g, '_')}_Business_Plan.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                Download
              </Button>
              <Button 
                className="ml-2"
                onClick={() => setShowPlanModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 