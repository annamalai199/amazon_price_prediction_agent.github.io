import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'Lock',
      text: 'Secure Authentication',
      description: 'Industry-standard security protocols'
    },
    {
      icon: 'Eye',
      text: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  return (
    <div className="mt-6 pt-4 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
            title={feature?.description}
          >
            <div className="flex-shrink-0">
              <Icon 
                name={feature?.icon} 
                size={16} 
                color="var(--color-success)" 
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {feature?.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;