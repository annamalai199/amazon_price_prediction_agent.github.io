import React from 'react';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <button className="hover:text-foreground transition-smooth">
          Privacy Policy
        </button>
        <span className="text-border">|</span>
        <button className="hover:text-foreground transition-smooth">
          Terms of Service
        </button>
        <span className="text-border">|</span>
        <button className="hover:text-foreground transition-smooth">
          Help Center
        </button>
      </div>
      
      <p className="text-xs text-muted-foreground">
        © {currentYear} Amazon Price Predictor. All rights reserved.
      </p>
      
      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <span>🔒 SSL Secured</span>
        <span>•</span>
        <span>🛡️ Privacy Protected</span>
        <span>•</span>
        <span>⚡ Fast & Reliable</span>
      </div>
    </div>
  );
};

export default LoginFooter;