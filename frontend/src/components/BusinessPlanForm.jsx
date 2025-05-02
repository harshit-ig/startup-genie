import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusinessPlan } from '../context/BusinessPlanContext';
import Button from './ui/Button';
import Input from './ui/Input';

const BusinessPlanForm = ({ existingPlan = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    industry: '',
    description: '',
    problem: '',
    solution: '',
    targetMarket: '',
    competitors: '',
    monetization: '',
    fundingNeeded: ''
  });
  
  const [errors, setErrors] = useState({});
  const { createBusinessPlan, updateBusinessPlan, loading, error } = useBusinessPlan();
  const navigate = useNavigate();
  
  // If editing, populate form with existing data
  useEffect(() => {
    if (existingPlan) {
      setFormData({
        title: existingPlan.title || '',
        industry: existingPlan.industry || '',
        description: existingPlan.description || '',
        problem: existingPlan.problem || '',
        solution: existingPlan.solution || '',
        targetMarket: existingPlan.targetMarket || '',
        competitors: existingPlan.competitors || '',
        monetization: existingPlan.monetization || '',
        fundingNeeded: existingPlan.fundingNeeded || ''
      });
    }
  }, [existingPlan]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.problem.trim()) newErrors.problem = 'Problem statement is required';
    if (!formData.solution.trim()) newErrors.solution = 'Solution is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (existingPlan) {
        await updateBusinessPlan(existingPlan._id, formData);
      } else {
        await createBusinessPlan(formData);
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving business plan:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Business Name/Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Your business name or idea title"
            required
          />
        </div>
        
        <div>
          <Input
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            error={errors.industry}
            placeholder="e.g. Technology, Healthcare, E-commerce"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Business Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of your business idea"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.description 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
          required
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Problem Statement
        </label>
        <textarea
          name="problem"
          rows={3}
          value={formData.problem}
          onChange={handleChange}
          placeholder="What problem does your business solve?"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.problem 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
          required
        ></textarea>
        {errors.problem && (
          <p className="mt-1 text-sm text-red-600">{errors.problem}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Solution
        </label>
        <textarea
          name="solution"
          rows={3}
          value={formData.solution}
          onChange={handleChange}
          placeholder="How does your business solve this problem?"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.solution 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
          required
        ></textarea>
        {errors.solution && (
          <p className="mt-1 text-sm text-red-600">{errors.solution}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Target Market
        </label>
        <textarea
          name="targetMarket"
          rows={2}
          value={formData.targetMarket}
          onChange={handleChange}
          placeholder="Who are your potential customers?"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Competitors
        </label>
        <textarea
          name="competitors"
          rows={2}
          value={formData.competitors}
          onChange={handleChange}
          placeholder="Who are your main competitors?"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Revenue Model
        </label>
        <textarea
          name="monetization"
          rows={2}
          value={formData.monetization}
          onChange={handleChange}
          placeholder="How will your business make money?"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div>
        <Input
          label="Funding Needed"
          name="fundingNeeded"
          type="text"
          value={formData.fundingNeeded}
          onChange={handleChange}
          placeholder="e.g. $50,000"
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/dashboard')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : existingPlan ? 'Update Plan' : 'Create Plan'}
        </Button>
      </div>
    </form>
  );
};

export default BusinessPlanForm; 