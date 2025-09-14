import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatHeader = ({ onClearChat, messageCount = 0 }) => {
  return (
    <div className="bg-card border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
          <Icon name="Bot" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Shopping Assistant</h2>
          <p className="text-sm text-muted-foreground">
            {messageCount > 0 ? `${messageCount} messages` : 'Ready to help you find the best deals'}
          </p>
        </div>
      </div>
      
      <button
        onClick={onClearChat}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        title="Clear chat history"
      >
        <Icon name="Trash2" size={18} />
      </button>
    </div>
  );
};

export default ChatHeader;