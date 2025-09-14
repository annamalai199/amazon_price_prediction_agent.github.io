import React, { useEffect, useRef } from 'react';
import ChatMessageBubble from '../../../components/ui/ChatMessageBubble';
import Icon from '../../../components/AppIcon';


const ChatMessageArea = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (messages?.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageCircle" size={24} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Welcome to AI Shopping Assistant
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            I'm here to help you find the best Amazon dress deals! Tell me your budget, preferred style, and size, and I'll recommend the perfect options for you.
          </p>
          <div className="mt-6 space-y-2">
            <div className="bg-muted rounded-lg p-3 text-left">
              <p className="text-sm text-foreground font-medium">Try asking:</p>
              <p className="text-xs text-muted-foreground mt-1">
                "Find me casual dresses under $50 in size M"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((message, index) => (
        <ChatMessageBubble
          key={index}
          message={message?.content}
          sender={message?.sender}
          timestamp={message?.timestamp}
        />
      ))}
      {isTyping && (
        <ChatMessageBubble
          message=""
          timestamp={new Date().toISOString()}
          isTyping={true}
          sender="bot"
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageArea;