import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecommendedDealsSection = () => {
  const recommendedDeals = [
    {
      id: 1,
      title: "Summer Floral Maxi Dress",
      brand: "Amazon Essentials",
      currentPrice: 29.99,
      originalPrice: 49.99,
      discount: 40,
      rating: 4.5,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      amazonId: "B08XYZABC1",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Pink", "White"],
      isLimitedTime: true,
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
    },
    {
      id: 2,
      title: "Elegant Black Cocktail Dress",
      brand: "Lark & Ro",
      currentPrice: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.7,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1566479179817-c0b7b0b5b7b0?w=300&h=400&fit=crop",
      amazonId: "B09ABCDEF2",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Black", "Navy"],
      isLimitedTime: false
    },
    {
      id: 3,
      title: "Casual Midi Wrap Dress",
      brand: "Daily Ritual",
      currentPrice: 34.99,
      originalPrice: 54.99,
      discount: 36,
      rating: 4.3,
      reviews: 2156,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop",
      amazonId: "B07GHIJKL3",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Red", "Green", "Blue", "Black"],
      isLimitedTime: true,
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const diff = endTime - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h left`;
    }
    return `${hours}h left`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="Star" size={14} className="text-yellow-400 fill-current opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Recommended Deals</h2>
            <p className="text-sm text-muted-foreground">Handpicked deals based on your preferences</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedDeals?.map((deal) => (
          <div
            key={deal?.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-modal transition-smooth group"
          >
            <div className="relative overflow-hidden">
              <Image
                src={deal?.image}
                alt={deal?.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {deal?.isLimitedTime && (
                <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
                  <Icon name="Clock" size={12} className="inline mr-1" />
                  {formatTimeRemaining(deal?.endTime)}
                </div>
              )}
              
              <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-bold">
                -{deal?.discount}%
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <p className="text-xs text-muted-foreground font-medium">{deal?.brand}</p>
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                  {deal?.title}
                </h3>
              </div>

              <div className="flex items-center space-x-1 mb-2">
                {renderStars(deal?.rating)}
                <span className="text-sm text-muted-foreground ml-2">
                  ({deal?.reviews?.toLocaleString()})
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg font-bold text-foreground">
                  {formatPrice(deal?.currentPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(deal?.originalPrice)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Sizes:</span>
                  <span className="font-medium">{deal?.sizes?.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Colors:</span>
                  <span className="font-medium">{deal?.colors?.length} options</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="flex-1"
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="TrendingUp"
                  className="px-3"
                  title="Track Price"
                >
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border text-center">
        <Button variant="outline" iconName="ArrowRight" iconPosition="right">
          View More Deals
        </Button>
      </div>
    </div>
  );
};

export default RecommendedDealsSection;