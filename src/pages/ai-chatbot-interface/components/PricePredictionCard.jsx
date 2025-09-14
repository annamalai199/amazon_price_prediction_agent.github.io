import React from 'react';
import Icon from '../../../components/AppIcon';

const PricePredictionCard = ({ prediction }) => {
  const getRecommendationColor = (action) => {
    switch (action) {
      case 'buy':
        return 'text-success bg-success/10 border-success/20';
      case 'wait':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRecommendationIcon = (action) => {
    switch (action) {
      case 'buy':
        return 'TrendingUp';
      case 'wait':
        return 'Clock';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="TrendingUp" size={18} className="text-primary" />
        <h4 className="font-medium text-foreground">Price Prediction</h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Current Price</p>
          <p className="text-lg font-bold text-foreground">${prediction?.currentPrice}</p>
        </div>
        
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Predicted Price</p>
          <p className="text-lg font-bold text-primary">${prediction?.predictedPrice}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Potential Savings:</span>
          <span className="text-sm font-medium text-success">
            ${prediction?.potentialSavings} ({prediction?.savingsPercentage}%)
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Best Time to Buy:</span>
          <span className="text-sm font-medium text-foreground">
            {prediction?.bestTimeToBuy}
          </span>
        </div>
      </div>
      <div className={`p-3 rounded-lg border ${getRecommendationColor(prediction?.recommendation)}`}>
        <div className="flex items-center space-x-2 mb-2">
          <Icon 
            name={getRecommendationIcon(prediction?.recommendation)} 
            size={16} 
          />
          <span className="font-medium text-sm">
            {prediction?.recommendation === 'buy' ? 'Buy Now' : 'Wait for Better Deal'}
          </span>
        </div>
        <p className="text-xs leading-relaxed">
          {prediction?.reason}
        </p>
      </div>
      {prediction?.upcomingSales && prediction?.upcomingSales?.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-foreground">Upcoming Sales:</h5>
          {prediction?.upcomingSales?.map((sale, index) => (
            <div key={index} className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">{sale?.event}</span>
              <span className="text-foreground">{sale?.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PricePredictionCard;