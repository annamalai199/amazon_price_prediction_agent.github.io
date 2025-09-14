import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginRedirect = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/user-login');
  };

  return (
    <div className="text-center pt-4 border-t border-border">
      <p className="text-sm text-muted-foreground mb-3">
        Already have an account?
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLoginRedirect}
        iconName="LogIn"
        iconPosition="left"
        iconSize={16}
      >
        Sign in
      </Button>
    </div>
  );
};

export default LoginRedirect;