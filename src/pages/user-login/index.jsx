import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationCard from '../../components/ui/AuthenticationCard';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';
import LoginFooter from './components/LoginFooter';

const UserLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (isAuthenticated === 'true' && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        navigate('/user-dashboard');
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="relative z-10">
        <AuthenticationCard showLogo={false} title="Welcome Back" subtitle="Sign in to your account">
          <LoginHeader />
          <LoginForm onLogin={handleLogin} />
        </AuthenticationCard>
        
        <div className="max-w-md mx-auto px-4 pb-8">
          <LoginFooter />
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default UserLogin;