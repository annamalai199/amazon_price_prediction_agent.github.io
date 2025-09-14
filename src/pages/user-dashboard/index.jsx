import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import WelcomeSection from './components/WelcomeSection';
import ProductSearchForm from './components/ProductSearchForm';
import PastSearchesSection from './components/PastSearchesSection';
import RecommendedDealsSection from './components/RecommendedDealsSection';
import UpcomingSalesSection from './components/UpcomingSalesSection';
import QuickActionsSection from './components/QuickActionsSection';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pastSearches, setPastSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    joinDate: "2024-01-15",
    preferences: {
      budget: 100,
      sizes: ["M", "L"],
      favoriteCategories: ["casual", "formal", "party"]
    }
  };

  // Mock past searches data
  const mockPastSearches = [
    {
      id: 1,
      amazonId: "B08N5WRWNW",
      budget: 75.00,
      dressType: "casual",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      predictedPrice: 52.99,
      currentPrice: 59.99,
      recommendation: "wait"
    },
    {
      id: 2,
      amazonId: "B09ABCDEF2",
      budget: 120.00,
      dressType: "formal",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      predictedPrice: 89.99,
      currentPrice: 95.99,
      recommendation: "buy"
    },
    {
      id: 3,
      amazonId: "B07GHIJKL3",
      budget: 60.00,
      dressType: "party",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      predictedPrice: 45.99,
      currentPrice: 48.99,
      recommendation: "buy"
    },
    {
      id: 4,
      amazonId: "B08MNOPQR4",
      budget: 90.00,
      dressType: "maxi",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      predictedPrice: 67.99,
      currentPrice: 72.99,
      recommendation: "wait"
    },
    {
      id: 5,
      amazonId: "B09STUVWX5",
      budget: 150.00,
      dressType: "cocktail",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      predictedPrice: 119.99,
      currentPrice: 129.99,
      recommendation: "buy"
    }
  ];

  useEffect(() => {
    // Simulate loading user data and past searches
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user is authenticated (in real app, this would check auth token)
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        
        if (!isAuthenticated) {
          navigate('/user-login');
          return;
        }

        // Load user data
        setUser(mockUser);
        setPastSearches(mockPastSearches);
        
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        navigate('/user-login');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/user-login');
  };

  const handleNewSearch = (searchResult) => {
    // Add new search to the beginning of the list
    setPastSearches(prev => [searchResult, ...prev]);
    
    // Show success message (in real app, this might be a toast notification)
    console.log('New search completed:', searchResult);
  };

  const handleViewSearchDetails = (search) => {
    // In real app, this might navigate to a detailed view or open a modal
    console.log('Viewing search details:', search);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigationBar isAuthenticated={false} onLogout={handleLogout} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationBar 
        isAuthenticated={true} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <WelcomeSection user={user} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Search Form and Quick Actions */}
            <div className="lg:col-span-1 space-y-8">
              <ProductSearchForm onSearch={handleNewSearch} />
              <QuickActionsSection />
            </div>

            {/* Right Column - Past Searches and Deals */}
            <div className="lg:col-span-2 space-y-8">
              <PastSearchesSection 
                searches={pastSearches} 
                onViewDetails={handleViewSearchDetails}
              />
              <RecommendedDealsSection />
              <UpcomingSalesSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;