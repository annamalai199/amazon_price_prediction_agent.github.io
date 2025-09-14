import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ChatInputForm = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');
  const [dressType, setDressType] = useState('');
  const [size, setSize] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const dressTypeOptions = [
    { value: '', label: 'Any dress type' },
    { value: 'casual', label: 'Casual Dress' },
    { value: 'formal', label: 'Formal Dress' },
    { value: 'party', label: 'Party Dress' },
    { value: 'maxi', label: 'Maxi Dress' },
    { value: 'midi', label: 'Midi Dress' },
    { value: 'mini', label: 'Mini Dress' },
    { value: 'cocktail', label: 'Cocktail Dress' },
    { value: 'evening', label: 'Evening Dress' },
    { value: 'summer', label: 'Summer Dress' },
    { value: 'winter', label: 'Winter Dress' }
  ];

  const sizeOptions = [
    { value: '', label: 'Any size' },
    { value: 'S', label: 'Small (S)' },
    { value: 'M', label: 'Medium (M)' },
    { value: 'L', label: 'Large (L)' },
    { value: 'XL', label: 'Extra Large (XL)' },
    { value: 'XXL', label: 'Double XL (XXL)' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!message?.trim() && !budget && !dressType && !size) {
      return;
    }

    let fullMessage = message?.trim();
    
    // Add structured data to message if provided
    const preferences = [];
    if (budget) preferences?.push(`Budget: $${budget}`);
    if (dressType) preferences?.push(`Type: ${dressType}`);
    if (size) preferences?.push(`Size: ${size}`);
    
    if (preferences?.length > 0) {
      if (fullMessage) {
        fullMessage += `\n\nPreferences: ${preferences?.join(', ')}`;
      } else {
        fullMessage = `Find dresses with: ${preferences?.join(', ')}`;
      }
    }

    onSendMessage(fullMessage);
    
    // Reset form
    setMessage('');
    setBudget('');
    setDressType('');
    setSize('');
    setShowAdvanced(false);
  };

  const handleQuickMessage = (quickMessage) => {
    onSendMessage(quickMessage);
  };

  const quickMessages = [
    "Show me today\'s best dress deals",
    "Find dresses under $30",
    "What are the trending dress styles?",
    "Show me formal dresses on sale"
  ];

  return (
    <div className="bg-card border-t border-border p-4">
      {/* Quick Messages */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {quickMessages?.map((quickMsg, index) => (
            <button
              key={index}
              onClick={() => handleQuickMessage(quickMsg)}
              disabled={isLoading}
              className="text-xs bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1 rounded-full transition-smooth disabled:opacity-50"
            >
              {quickMsg}
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Message Input */}
        <div>
          <Input
            type="text"
            placeholder="Ask me about dresses, prices, or deals..."
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Advanced Options Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-primary hover:text-secondary transition-smooth flex items-center space-x-1"
          >
            <span>{showAdvanced ? 'Hide' : 'Show'} preferences</span>
            <svg
              className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <Input
              type="number"
              label="Max Budget ($)"
              placeholder="50"
              value={budget}
              onChange={(e) => setBudget(e?.target?.value)}
              min="1"
              max="1000"
            />
            
            <Select
              label="Dress Type"
              options={dressTypeOptions}
              value={dressType}
              onChange={setDressType}
              placeholder="Select type"
            />
            
            <Select
              label="Size"
              options={sizeOptions}
              value={size}
              onChange={setSize}
              placeholder="Select size"
            />
          </div>
        )}

        {/* Send Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            disabled={!message?.trim() && !budget && !dressType && !size}
            iconName="Send"
            iconPosition="right"
            iconSize={16}
            className="min-w-[120px]"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInputForm;