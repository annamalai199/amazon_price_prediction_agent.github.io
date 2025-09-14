import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import ChatHeader from './components/ChatHeader';
import ChatMessageArea from './components/ChatMessageArea';
import ChatInputForm from './components/ChatInputForm';
import ProductRecommendationCard from './components/ProductRecommendationCard';
import PricePredictionCard from './components/PricePredictionCard';

const AIChatbotInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com"
  });

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Floral Summer Midi Dress",
      brand: "Amazon Essentials",
      currentPrice: 29.99,
      originalPrice: 45.99,
      discount: 35,
      rating: 4.3,
      reviews: "1,247",
      shipping: "Free delivery",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      amazonUrl: "https://amazon.com/product/1"
    },
    {
      id: 2,
      name: "Elegant Black Cocktail Dress",
      brand: "Daily Ritual",
      currentPrice: 42.50,
      originalPrice: 59.99,
      discount: 29,
      rating: 4.5,
      reviews: "892",
      shipping: "Free delivery",
      image: "https://images.unsplash.com/photo-1566479179817-c0b8b1b5b8b8?w=400&h=400&fit=crop",
      amazonUrl: "https://amazon.com/product/2"
    },
    {
      id: 3,
      name: "Casual Denim Shirt Dress",
      brand: "Goodthreads",
      currentPrice: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.2,
      reviews: "654",
      shipping: "Free delivery",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      amazonUrl: "https://amazon.com/product/3"
    }
  ];

  const mockPrediction = {
    currentPrice: 45.99,
    predictedPrice: 32.99,
    potentialSavings: 13.00,
    savingsPercentage: 28,
    bestTimeToBuy: "Next week",
    recommendation: "wait",
    reason: "Based on historical data, this dress typically goes on sale during mid-month promotions. Wait 5-7 days for better pricing.",
    upcomingSales: [
      { event: "Mid-Month Sale", date: "Sep 20-22" },
      { event: "Fall Fashion Week", date: "Sep 28-30" }
    ]
  };

  useEffect(() => {
    // Add welcome message
    const welcomeMessage = {
      content: `Hi ${user?.name}! I'm your AI shopping assistant. I can help you find the best Amazon dress deals based on your budget, style preferences, and size requirements. What are you looking for today?`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [user?.name]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    // Check for budget mentions
    const budgetMatch = userMessage?.match(/\$?(\d+)/);
    const budget = budgetMatch ? parseInt(budgetMatch?.[1]) : null;
    
    // Check for size mentions
    const sizeMatch = userMessage?.match(/\b(S|M|L|XL|XXL|small|medium|large|extra large)\b/i);
    const size = sizeMatch ? sizeMatch?.[1]?.toUpperCase() : null;
    
    // Check for dress type mentions
    const dressTypes = ['casual', 'formal', 'party', 'maxi', 'midi', 'mini', 'cocktail', 'evening', 'summer', 'winter'];
    const mentionedType = dressTypes?.find(type => lowerMessage?.includes(type));

    if (lowerMessage?.includes('deal') || lowerMessage?.includes('sale') || lowerMessage?.includes('best')) {
      return {
        content: `Great! I found some amazing deals for you. Here are the top dress recommendations based on current promotions:`,
        sender: 'bot',
        timestamp: new Date(),
        products: mockProducts?.slice(0, 2),
        showPrediction: true
      };
    }
    
    if (budget || size || mentionedType) {
      let response = "Perfect! Based on your preferences, here are my top recommendations:\n\n";
      if (budget) response += `• Budget: Under $${budget}\n`;
      if (size) response += `• Size: ${size}\n`;
      if (mentionedType) response += `• Style: ${mentionedType} dress\n`;
      
      return {
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        products: mockProducts?.filter(p => !budget || p?.currentPrice <= budget),
        showPrediction: Math.random() > 0.5
      };
    }
    
    if (lowerMessage?.includes('price') || lowerMessage?.includes('predict')) {
      return {
        content: "I've analyzed the pricing trends for similar dresses. Here's what I found:",
        sender: 'bot',
        timestamp: new Date(),
        showPrediction: true,
        products: [mockProducts?.[0]]
      };
    }
    
    if (lowerMessage?.includes('trending') || lowerMessage?.includes('popular')) {
      return {
        content: "Here are the most popular dress styles trending right now on Amazon:",
        sender: 'bot',
        timestamp: new Date(),
        products: mockProducts
      };
    }
    
    // Default response
    return {
      content: `I'd be happy to help you find the perfect dress! I can search by budget, style, size, or specific occasions. Here are some current popular options:`,
      sender: 'bot',
      timestamp: new Date(),
      products: mockProducts?.slice(0, 2)
    };
  };

  const handleSendMessage = async (message) => {
    if (!message?.trim()) return;

    // Add user message
    const userMessage = {
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleClearChat = () => {
    const welcomeMessage = {
      content: `Hi ${user?.name}! I'm your AI shopping assistant. I can help you find the best Amazon dress deals based on your budget, style preferences, and size requirements. What are you looking for today?`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleLogout = () => {
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <TopNavigationBar 
        isAuthenticated={true}
        user={user}
        onLogout={handleLogout}
      />
      <div className="pt-16 h-screen flex flex-col">
        <ChatHeader 
          onClearChat={handleClearChat}
          messageCount={messages?.length}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ChatMessageArea 
              messages={messages?.map(msg => ({
                ...msg,
                content: (
                  <div>
                    <p className="whitespace-pre-wrap">{msg?.content}</p>
                    
                    {msg?.products && msg?.products?.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {msg?.products?.map(product => (
                          <ProductRecommendationCard 
                            key={product?.id}
                            product={product}
                          />
                        ))}
                      </div>
                    )}
                    
                    {msg?.showPrediction && (
                      <div className="mt-4">
                        <PricePredictionCard prediction={mockPrediction} />
                      </div>
                    )}
                  </div>
                )
              }))}
              isTyping={isTyping}
            />
          </div>
          
          <ChatInputForm 
            onSendMessage={handleSendMessage}
            isLoading={isTyping}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChatbotInterface;