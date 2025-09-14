import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ProductSearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    amazonId: '',
    budget: '',
    dressType: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dressTypeOptions = [
    { value: 'casual', label: 'Casual Dress' },
    { value: 'formal', label: 'Formal Dress' },
    { value: 'party', label: 'Party Dress' },
    { value: 'maxi', label: 'Maxi Dress' },
    { value: 'mini', label: 'Mini Dress' },
    { value: 'midi', label: 'Midi Dress' },
    { value: 'cocktail', label: 'Cocktail Dress' },
    { value: 'evening', label: 'Evening Dress' },
    { value: 'summer', label: 'Summer Dress' },
    { value: 'winter', label: 'Winter Dress' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.amazonId?.trim()) {
      newErrors.amazonId = 'Amazon Product ID is required';
    } else if (!/^[A-Z0-9]{10}$/?.test(formData?.amazonId?.trim())) {
      newErrors.amazonId = 'Please enter a valid 10-character Amazon ASIN (e.g., B08N5WRWNW)';
    }

    if (!formData?.budget?.trim()) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(formData?.budget) || parseFloat(formData?.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
    } else if (parseFloat(formData?.budget) > 10000) {
      newErrors.budget = 'Budget cannot exceed $10,000';
    }

    if (!formData?.dressType) {
      newErrors.dressType = 'Please select a dress type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const searchResult = {
        id: Date.now(),
        amazonId: formData?.amazonId,
        budget: parseFloat(formData?.budget),
        dressType: formData?.dressType,
        timestamp: new Date(),
        predictedPrice: Math.max(10, parseFloat(formData?.budget) * (0.7 + Math.random() * 0.4)),
        currentPrice: Math.max(15, parseFloat(formData?.budget) * (0.8 + Math.random() * 0.5)),
        recommendation: Math.random() > 0.5 ? 'buy' : 'wait'
      };

      if (onSearch) {
        onSearch(searchResult);
      }

      // Reset form
      setFormData({
        amazonId: '',
        budget: '',
        dressType: ''
      });
      
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
          <Icon name="Search" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Find Your Perfect Dress</h2>
          <p className="text-sm text-muted-foreground">Enter product details to get price predictions</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Amazon Product ID (ASIN)"
          type="text"
          placeholder="e.g., B08N5WRWNW"
          value={formData?.amazonId}
          onChange={(e) => handleInputChange('amazonId', e?.target?.value?.toUpperCase())}
          error={errors?.amazonId}
          description="Find this in the product URL or product details section"
          required
        />

        <Input
          label="Your Budget"
          type="number"
          placeholder="Enter your maximum budget"
          value={formData?.budget}
          onChange={(e) => handleInputChange('budget', e?.target?.value)}
          error={errors?.budget}
          description="Maximum amount you're willing to spend (USD)"
          min="1"
          max="10000"
          step="0.01"
          required
        />

        <Select
          label="Dress Type"
          placeholder="Select dress category"
          options={dressTypeOptions}
          value={formData?.dressType}
          onChange={(value) => handleInputChange('dressType', value)}
          error={errors?.dressType}
          description="Choose the type of dress you're looking for"
          searchable
          required
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          iconName="TrendingUp"
          iconPosition="left"
          fullWidth
          className="mt-6"
        >
          {isLoading ? 'Analyzing Prices...' : 'Get Price Prediction'}
        </Button>
      </form>
    </div>
  );
};

export default ProductSearchForm;