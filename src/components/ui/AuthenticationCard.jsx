import React from 'react';

const AuthenticationCard = ({ 
  children, 
  title, 
  subtitle, 
  className = "",
  showLogo = true 
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {showLogo && (
          <div className="text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-card">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-foreground">
              Amazon Price Predictor
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Smart shopping with AI-powered price predictions
            </p>
          </div>
        )}

        <div className={`bg-card shadow-modal rounded-lg border border-border p-8 ${className}`}>
          {title && (
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          {children}
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Amazon Price Predictor. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCard;