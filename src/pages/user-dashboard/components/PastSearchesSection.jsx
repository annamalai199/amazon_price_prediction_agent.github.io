import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PastSearchesSection = ({ searches = [], onViewDetails }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'buy':
        return 'text-success bg-green-50 border-green-200';
      case 'wait':
        return 'text-warning bg-amber-50 border-amber-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation) {
      case 'buy':
        return 'ShoppingCart';
      case 'wait':
        return 'Clock';
      default:
        return 'TrendingUp';
    }
  };

  if (searches?.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 shadow-card text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Searches Yet</h3>
        <p className="text-muted-foreground mb-4">
          Start by searching for your first dress to see price predictions and recommendations.
        </p>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Start Your First Search
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Recent Searches</h2>
            <p className="text-sm text-muted-foreground">Your latest price tracking history</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {searches?.slice(0, 5)?.map((search) => (
          <div
            key={search?.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-smooth cursor-pointer"
            onClick={() => onViewDetails && onViewDetails(search)}
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <Icon name="Package" size={20} className="text-blue-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-foreground truncate">
                    {search?.dressType?.charAt(0)?.toUpperCase() + search?.dressType?.slice(1)} Dress
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(search?.recommendation)}`}>
                    <Icon name={getRecommendationIcon(search?.recommendation)} size={12} className="inline mr-1" />
                    {search?.recommendation === 'buy' ? 'Buy Now' : 'Wait'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  ASIN: {search?.amazonId} • Budget: {formatPrice(search?.budget)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(search?.timestamp)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {formatPrice(search?.predictedPrice)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Current: {formatPrice(search?.currentPrice)}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {searches?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" fullWidth iconName="ArrowRight" iconPosition="right">
            View All {searches?.length} Searches
          </Button>
        </div>
      )}
    </div>
  );
};

export default PastSearchesSection;