import React from 'react';
import AuthenticationCard from '../../components/ui/AuthenticationCard';
import RegistrationForm from './components/RegistrationForm';
import LoginRedirect from './components/LoginRedirect';
import SecurityBadges from './components/SecurityBadges';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AuthenticationCard
        title="Create Your Account"
        subtitle="Join thousands of smart shoppers who save money with AI-powered price predictions"
        className="relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-success/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <RegistrationForm />
          <LoginRedirect />
          <SecurityBadges />
        </div>
      </AuthenticationCard>
    </div>
  );
};

export default UserRegistration;