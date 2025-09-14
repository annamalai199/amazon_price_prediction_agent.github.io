import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-card animation-bounce-gentle">
          <Icon name="TrendingUp" size={28} color="white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Welcome Back
      </h1>
      
      <p className="text-muted-foreground text-base">
        Sign in to access your personalized price tracking dashboard
      </p>
      
      <div className="mt-4 flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <span className="text-sm text-muted-foreground font-medium">
          Amazon Price Predictor
        </span>
        <div className="w-2 h-2 bg-accent rounded-full"></div>
      </div>
    </div>
  );
};

export default LoginHeader;