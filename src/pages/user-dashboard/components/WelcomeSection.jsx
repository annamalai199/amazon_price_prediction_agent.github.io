import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {getCurrentGreeting()}, {user?.name || 'User'}!
          </h1>
          <p className="text-blue-100 text-lg">
            Ready to find the best dress deals on Amazon?
          </p>
          <p className="text-blue-200 text-sm mt-1">
            Track prices, get predictions, and never miss a great deal
          </p>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={32} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;