import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingSalesSection = () => {
  const upcomingSales = [
    {
      id: 1,
      eventName: "Black Friday Mega Sale",
      startDate: new Date('2024-11-29'),
      endDate: new Date('2024-12-02'),
      expectedDiscount: "Up to 70%",
      categories: ["Formal Dresses", "Party Wear", "Casual Dresses"],
      description: "The biggest sale event of the year with massive discounts on designer dresses",
      isHighlighted: true,
      color: "from-purple-600 to-purple-700"
    },
    {
      id: 2,
      eventName: "Holiday Fashion Week",
      startDate: new Date('2024-12-15'),
      endDate: new Date('2024-12-22'),
      expectedDiscount: "Up to 50%",
      categories: ["Evening Dresses", "Cocktail Dresses"],
      description: "Perfect timing for holiday party outfits and New Year celebrations",
      isHighlighted: false,
      color: "from-red-600 to-red-700"
    },
    {
      id: 3,
      eventName: "New Year Style Reset",
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-07'),
      expectedDiscount: "Up to 40%",
      categories: ["Casual Dresses", "Work Wear", "Spring Collection"],
      description: "Start the new year with fresh styles and wardrobe essentials",
      isHighlighted: false,
      color: "from-blue-600 to-blue-700"
    },
    {
      id: 4,
      eventName: "Valentine\'s Day Special",
      startDate: new Date('2025-02-10'),
      endDate: new Date('2025-02-16'),
      expectedDiscount: "Up to 35%",
      categories: ["Romantic Dresses", "Date Night Outfits"],
      description: "Special collection for romantic occasions and date nights",
      isHighlighted: false,
      color: "from-pink-600 to-pink-700"
    }
  ];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    })?.format(date);
  };

  const getDaysUntilSale = (startDate) => {
    const now = new Date();
    const diffTime = startDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Started";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  const getSaleStatus = (startDate, endDate) => {
    const now = new Date();
    if (now < startDate) return "upcoming";
    if (now >= startDate && now <= endDate) return "active";
    return "ended";
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Upcoming Sales</h2>
            <p className="text-sm text-muted-foreground">Never miss a great deal again</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="Bell">
          Set Alerts
        </Button>
      </div>
      <div className="space-y-4">
        {upcomingSales?.map((sale) => {
          const status = getSaleStatus(sale?.startDate, sale?.endDate);
          const daysUntil = getDaysUntilSale(sale?.startDate);
          
          return (
            <div
              key={sale?.id}
              className={`relative overflow-hidden rounded-lg border transition-smooth hover:shadow-modal ${
                sale?.isHighlighted 
                  ? 'border-primary bg-gradient-to-r from-primary/5 to-secondary/5' :'border-border bg-card hover:bg-muted'
              }`}
            >
              {sale?.isHighlighted && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs font-medium">
                  <Icon name="Star" size={12} className="inline mr-1" />
                  Featured
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground">{sale?.eventName}</h3>
                      {status === 'active' && (
                        <span className="px-2 py-1 bg-success text-success-foreground rounded-full text-xs font-medium">
                          Live Now
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {sale?.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {sale?.categories?.map((category, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Starts</p>
                      <p className="font-medium text-foreground">{formatDate(sale?.startDate)}</p>
                    </div>
                    <div className="w-8 h-px bg-border"></div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Ends</p>
                      <p className="font-medium text-foreground">{formatDate(sale?.endDate)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Discount</p>
                      <p className="font-medium text-success">{sale?.expectedDiscount}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {status === 'upcoming' && (
                      <div className="text-right mr-3">
                        <p className="text-xs text-muted-foreground">Starts in</p>
                        <p className="font-medium text-primary">{daysUntil}</p>
                      </div>
                    )}
                    <Button
                      variant={status === 'active' ? 'default' : 'outline'}
                      size="sm"
                      iconName={status === 'active' ? 'ShoppingBag' : 'Bell'}
                      iconPosition="left"
                    >
                      {status === 'active' ? 'Shop Now' : 'Remind Me'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-warning" />
            <span className="text-sm text-muted-foreground">
              Get notified about flash sales and exclusive deals
            </span>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Manage Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSalesSection;