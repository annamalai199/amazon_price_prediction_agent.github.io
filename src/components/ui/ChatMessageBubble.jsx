import React from 'react';
import Icon from '../AppIcon';

const ChatMessageBubble = ({ 
  message, 
  sender = 'user', 
  timestamp, 
  isTyping = false,
  className = "" 
}) => {
  const isUser = sender === 'user';
  const isBot = sender === 'bot' || sender === 'assistant';

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return date?.toLocaleDateString();
  };

  if (isTyping) {
    return (
      <div className={`flex items-start space-x-3 ${className}`}>
        <div className="flex-shrink-0">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
        </div>
        <div className="flex-1 max-w-xs lg:max-w-md">
          <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'items-start space-x-3'} ${className}`}>
      {isBot && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
        </div>
      )}
      
      <div className={`flex-1 ${isUser ? 'flex justify-end' : ''}`}>
        <div className={`max-w-xs lg:max-w-md ${isUser ? 'ml-auto' : ''}`}>
          <div
            className={`px-4 py-3 rounded-2xl transition-smooth ${
              isUser
                ? 'bg-primary text-primary-foreground rounded-tr-md'
                : 'bg-muted text-foreground rounded-tl-md'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message}
            </p>
          </div>
          
          {timestamp && (
            <div className={`mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(timestamp)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessageBubble;