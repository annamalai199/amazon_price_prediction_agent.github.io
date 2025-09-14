import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsSection = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "AI Chat Assistant",
      description: "Get personalized dress recommendations and shopping advice",
      icon: "MessageCircle",
      color: "from-blue-500 to-blue-600",
      action: () => navigate('/ai-chatbot-interface'),
      buttonText: "Start Chat",
      features: ["Smart Recommendations", "Price Alerts", "Style Advice"]
    },
    {
      id: 2,
      title: "Price Tracker",
      description: "Track multiple products and get notified of price drops",
      icon: "TrendingDown",
      color: "from-green-500 to-green-600",
      action: () => console.log('Price tracker clicked'),
      buttonText: "Track Prices",
      features: ["Real-time Monitoring", "Price History", "Drop Alerts"]
    },
    {
      id: 3,
      title: "Deal Finder",
      description: "Discover the best deals and discounts on dresses",
      icon: "Percent",
      color: "from-purple-500 to-purple-600",
      action: () => console.log('Deal finder clicked'),
      buttonText: "Find Deals",
      features: ["Daily Deals", "Flash Sales", "Coupon Codes"]
    }
  ];

  const statsData = [
    {
      label: "Searches Today",
      value: "12",
      icon: "Search",
      change: "+3 from yesterday"
    },
    {
      label: "Money Saved",
      value: "$247",
      icon: "DollarSign",
      change: "This month"
    },
    {
      label: "Price Alerts",
      value: "8",
      icon: "Bell",
      change: "Active tracking"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsData?.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-modal transition-smooth"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat?.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat?.change}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={stat?.icon} size={20} className="text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Access your most-used features instantly</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {quickActions?.map((action) => (
            <div
              key={action?.id}
              className="border border-border rounded-lg p-6 hover:shadow-modal transition-smooth group cursor-pointer"
              onClick={action?.action}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={action?.icon} size={24} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {action?.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {action?.description}
              </p>

              <div className="space-y-2 mb-4">
                {action?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth"
              >
                {action?.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={20} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-blue-800 mb-3">
              Set up price alerts for dresses you're interested in. Our AI will notify you when prices drop or when similar items go on sale!
            </p>
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;