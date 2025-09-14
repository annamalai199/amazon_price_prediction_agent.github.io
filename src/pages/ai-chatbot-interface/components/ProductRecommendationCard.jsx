import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProductRecommendationCard = ({ product }) => {
  const handleBuyNow = () => {
    window.open(product?.amazonUrl, '_blank');
  };

  const handleAddToWishlist = () => {
    // Mock wishlist functionality
    console.log('Added to wishlist:', product?.name);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">
            {product?.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {product?.brand}
          </p>
          
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-lg font-bold text-primary">
              ${product?.currentPrice}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.currentPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product?.originalPrice}
              </span>
            )}
            {product?.discount && (
              <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                {product?.discount}% OFF
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-xs text-muted-foreground">
                {product?.rating} ({product?.reviews})
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Truck" size={14} className="text-success" />
              <span className="text-xs text-success">
                {product?.shipping}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-3">
            <Button
              size="xs"
              variant="default"
              onClick={handleBuyNow}
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={12}
              className="flex-1"
            >
              Buy Now
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={handleAddToWishlist}
              iconName="Heart"
              iconSize={12}
            >
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendationCard;